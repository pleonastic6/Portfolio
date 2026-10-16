"""Pixel-derived matte, contours and ASCII. Source never modified."""
import sys
sys.path.insert(0, str(__import__('pathlib').Path(__file__).parent / '.python313'))
from PIL import Image, ImageFilter
import numpy as np
from pathlib import Path
from collections import deque
import html, hashlib, json
root=Path(__file__).parent; out=root/'assets'; out.mkdir(exist_ok=True)
source=Path('/root/.hermes/cache/images/img_802af627f8c1.png')
im=Image.open(source).convert('RGB'); im.thumbnail((1456,816)); a=np.asarray(im).astype(float); h,w=a.shape[:2]
# Smooth away the brushed-metal microtexture before extracting structural edges.
s=np.asarray(im.filter(ImageFilter.GaussianBlur(1.1))).astype(float)
gx=np.max(abs(s[:,2:]-s[:,:-2]),axis=2); gy=np.max(abs(s[2:]-s[:-2]),axis=2)
g=np.zeros((h,w));g[:,1:-1]=gx;g[1:-1]=np.maximum(g[1:-1],gy)
barrier=g>7
# Connected background regions, including visible openings between the ribbons.
visited=np.zeros((h,w),bool); q=deque([(0,0),(700,340),(493,416),(813,429),(930,526),(780,205)])
while q:
 x,y=q.popleft()
 if not(0<=x<w and 0<=y<h) or visited[y,x] or barrier[y,x]:continue
 visited[y,x]=True
 q.extend(((x-1,y),(x+1,y),(x,y-1),(x,y+1)))
mask=(~visited).astype('uint8')*255
# Limit to the object: exclude the floor/shadow and unrelated background noise.
mask[:103]=0;mask[660:]=0;mask[:,:426]=0;mask[:,1080:]=0
# Hand-traced silhouette/openings from the actual source: gradient flood leaked
# through the low-contrast silver ribbons. Keep the original material intact.
from PIL import ImageDraw
m=Image.new('L',(w,h),0)
draw=ImageDraw.Draw(m)
outer=[(431,352),(438,329),(454,301),(483,278),(519,254),(555,235),(593,220),(600,196),(613,171),(635,148),(659,131),(689,118),(720,110),(750,107),(786,111),(822,122),(852,137),(882,157),(908,181),(928,209),(943,242),(974,237),(1001,236),(1017,243),(1034,272),(1054,303),(1073,327),(1076,342),(1067,370),(1051,397),(1027,423),(1001,447),(1013,482),(1023,518),(1024,546),(1016,572),(998,605),(980,627),(956,645),(930,654),(901,657),(872,653),(843,646),(807,635),(780,643),(752,649),(728,648),(700,638),(673,625),(652,613),(628,613),(611,607),(600,591),(583,566),(553,562),(525,553),(495,538),(472,520),(455,498),(442,472),(434,449),(431,415)]
draw.polygon(outer,fill=255)
openings=[[(607,213),(626,193),(651,181),(680,174),(710,173),(742,179),(776,190),(809,206),(842,226),(868,247),(895,255),(866,266),(842,277),(821,258),(792,241),(756,227),(717,217),(675,212),(638,212)],[(603,303),(635,296),(673,291),(707,290),(747,293),(782,299),(758,312),(730,330),(701,349),(674,367),(648,387),(633,363),(619,337)],[(445,408),(457,385),(476,365),(501,347),(528,332),(553,321),(555,353),(560,384),(570,413),(583,437),(567,456),(554,478),(528,470),(500,458),(478,443),(459,426)],[(730,479),(759,456),(794,433),(831,412),(867,393),(893,380),(906,396),(890,419),(874,440),(849,458),(821,470),(790,480),(755,487)],[(889,566),(909,544),(927,520),(941,493),(950,468),(961,489),(971,516),(980,545),(983,571),(982,587),(958,589),(933,583),(909,575)],[(615,577),(641,579),(669,588),(701,598),(724,599),(704,605),(677,608),(652,606),(629,601)]]
for opening in openings: draw.polygon(opening,fill=0)
m=m.filter(ImageFilter.GaussianBlur(.7))
# Neutralise warm bounce light while preserving the source blue metal.
b=a[:,:,2];r=a[:,:,0]; blue=np.clip((b-r)/45,0,1)[...,None]
lum=(a*[.2126,.7152,.0722]).sum(2)[...,None]
neutral=np.concatenate([lum*.97,lum*.99,np.minimum(lum*1.025,255)],2)
cool=neutral*(1-blue)+a*blue
rgba=Image.fromarray(np.uint8(np.clip(cool,0,255))).convert('RGBA');rgba.putalpha(m)
# All assets share exactly the same crop and registration.
box=(400,80,1110,685); rgba=rgba.crop(box);rgba.save(out/'material.png')
m=m.crop(box); gray=Image.fromarray(np.uint8(lum[:,:,0])).crop(box)
# Structural contour pixels (not an invented wireframe).
edge=(g>9).astype('uint8')*255
ed=Image.fromarray(edge).crop(box)
edgea=np.asarray(ed); ma=np.asarray(m);edgea=np.where(ma>110,edgea,0).astype('uint8')
# Include silhouette gradient so silver/white boundaries remain continuous.
mx=np.asarray(m.filter(ImageFilter.MaxFilter(3))).astype(int); mn=np.asarray(m.filter(ImageFilter.MinFilter(3))).astype(int)
edgea=np.maximum(edgea,np.uint8(np.clip(mx-mn,0,255)))
cont=Image.new('RGBA',rgba.size,(22,27,37,0));cont.putalpha(Image.fromarray(edgea).filter(ImageFilter.GaussianBlur(.35)));cont.save(out/'contour.png')
# Character grid sampled from source luminance and source blue channel.
cols=132; rows=75
small=np.asarray(rgba.resize((cols,rows),Image.Resampling.LANCZOS)); ramp=' .,:;i+*%#@'
lines=[]; svg=[]
for y in range(rows):
 line=''
 for x in range(cols):
  R,G,B,A=map(int,small[y,x]); char=' '
  if A>110:
   light=(R*.2126+G*.7152+B*.0722)/255
   char=ramp[max(2,min(10,int((1-light)*10)+2))]
   color='#304FFE' if B>R+20 else '#16191f'
   svg.append(f'<text x="{x*6}" y="{y*9+8}" fill="{color}">{html.escape(char)}</text>')
  line+=char
 lines.append(line)
(out/'ascii.txt').write_text('\n'.join(lines))
(out/'ascii.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 792 675"><g font-family="monospace" font-size="9" font-weight="500">'+''.join(svg)+'</g></svg>')
(root/'source-manifest.json').write_text(json.dumps({'source':str(source),'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'source_size':list(im.size),'crop':box,'ascii_grid':[cols,rows],'method':'gradient-barrier flood matte with opening seeds; neutralised warm tones; actual gradient contours; sampled luminance ASCII'},indent=2))
print('Generated assets',rgba.size,'mask coverage',round(float((np.asarray(m)>128).mean()),3))
