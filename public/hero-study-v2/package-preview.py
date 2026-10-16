from pathlib import Path
import base64
p=Path(__file__).parent
s=(p/'index.html').read_text().replace('<link rel="stylesheet" href="style.css">','<style>'+(p/'style.css').read_text()+'</style>').replace('<script src="app.js"></script>','<script>'+(p/'app.js').read_text()+'</script>')
for name,mime in [('material.png','image/png'),('contour.png','image/png'),('ascii.svg','image/svg+xml')]:
 s=s.replace('assets/'+name,'data:'+mime+';base64,'+base64.b64encode((p/'assets'/name).read_bytes()).decode())
f=p/'ADDD-Hero-Prototyp.html'
f.write_text(s)
print(f, f.stat().st_size)
