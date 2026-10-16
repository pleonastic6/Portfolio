const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const layers = [...document.querySelectorAll('.layer')];
const buttons = [...document.querySelectorAll('[data-stage]')];
const labels = ['01 — Material', '02 — Kontur', '03 — ASCII'];
const notes = [
  'Eine Form. Drei Perspektiven.',
  'Auf das Wesentliche reduziert.',
  'Ein anderer Blick. Derselbe Kern.'
];
let scheduled = false;

const clamp = x => Math.max(0, Math.min(1, x));
const smooth = x => { x = clamp(x); return x * x * (3 - 2 * x); };

// Three clearly separated stages with softer, more deliberate transitions.
const STAGE_0_END = 0.32;
const TRANS_0_1_END = 0.48;
const STAGE_1_END = 0.68;
const TRANS_1_2_END = 0.84;

function stageOpacities(p) {
  const t0 = smooth((p - STAGE_0_END) / (TRANS_0_1_END - STAGE_0_END));
  const t1 = smooth((p - STAGE_1_END) / (TRANS_1_2_END - STAGE_1_END));
  return [
    1 - t0,               // material
    t0 * (1 - t1),        // contour
    t1                    // ascii
  ];
}

function render(p) {
  p = clamp(p);
  const op = stageOpacities(p);

  // Layer opacity
  layers.forEach((el, i) => el.style.opacity = op[i]);

  // Subtle transforms that reinforce the narrative (disabled for reduced motion).
  if (!reduce.matches) {
    // Material breathes out slightly as the contour takes over.
    const materialScale = 1 - 0.04 * smooth((p - STAGE_0_END) / (TRANS_0_1_END - STAGE_0_END));
    layers[0].style.transform = `scale(${clamp(materialScale)})`;

    // Contour grows in from a slightly smaller state while revealing top-to-bottom.
    const contourReveal = smooth((p - STAGE_0_END) / (TRANS_0_1_END - STAGE_0_END));
    const contourScale = 0.98 + 0.02 * contourReveal;
    layers[1].style.transform = `scale(${contourScale})`;
    layers[1].style.clipPath = `inset(0 0 ${(1 - contourReveal) * 100}% 0)`;

    // ASCII settles in with a small scale pop.
    const asciiReveal = smooth((p - STAGE_1_END) / (TRANS_1_2_END - STAGE_1_END));
    const asciiScale = 0.98 + 0.02 * asciiReveal;
    layers[2].style.transform = `scale(${asciiScale})`;
  }

  // Active stage follows the dominant layer.
  const active = op.indexOf(Math.max(...op));
  buttons.forEach((el, i) => el.setAttribute('aria-pressed', String(i === active)));
  document.querySelector('#stage-label').textContent = labels[active];
  document.querySelector('#stage-note').textContent = notes[active];
  document.querySelector('.progress i').style.transform = `scaleX(${p})`;
  document.body.dataset.stage = String(active);
  document.body.dataset.progress = p.toFixed(3);
}

function scrollState() {
  if (!reduce.matches) {
    render(clamp(scrollY / (document.querySelector('#study').offsetHeight - innerHeight)));
  }
  scheduled = false;
}

addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(scrollState);
  }
}, { passive: true });

addEventListener('resize', scrollState);

const stageProgress = [0, TRANS_0_1_END, TRANS_1_2_END];

buttons.forEach((button, i) => button.addEventListener('click', () => {
  const p = stageProgress[i];
  if (reduce.matches) {
    render(p);
  } else {
    scrollTo({
      top: p * (document.querySelector('#study').offsetHeight - innerHeight),
      behavior: 'instant'
    });
    render(p);
  }
}));

reduce.addEventListener('change', () => {
  scrollTo(0, 0);
  // Reset motion-specific transforms/clips when reduced motion is toggled on.
  layers.forEach(el => { el.style.transform = ''; el.style.clipPath = ''; });
  render(0);
});

render(0);
