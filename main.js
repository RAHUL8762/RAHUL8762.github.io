// Copy-email button in the contact block.
document.querySelectorAll('.copy').forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = 'Copied';
    } catch {
      button.textContent = 'Press Ctrl+C';
    }
    setTimeout(() => { button.textContent = 'Copy'; }, 1800);
  });
});

// Hover readout for Fig. 1. Points are [snr dB, BER, x, y] in SVG units.
const chart = document.querySelector('#ber-chart');
if (chart) {
  const points = [[0.0,0.07865,70.0,69.7],[0.25,0.07276,84.8,71.2],[0.5,0.06707,99.5,72.8],[0.75,0.06157,114.2,74.5],[1.0,0.05628,129.0,76.2],[1.25,0.05122,143.8,78.1],[1.5,0.0464,158.5,80.0],[1.75,0.04183,173.2,82.0],[2.0,0.03751,188.0,84.2],[2.25,0.03345,202.8,86.4],[2.5,0.02966,217.5,88.8],[2.75,0.02613,232.2,91.2],[3.0,0.02288,247.0,93.8],[3.25,0.01989,261.8,96.6],[3.5,0.01717,276.5,99.4],[3.75,0.01471,291.2,102.5],[4.0,0.0125,306.0,105.6],[4.25,0.01053,320.8,109.0],[4.5,0.008794,335.5,112.5],[4.75,0.007272,350.2,116.2],[5.0,0.005954,365.0,120.1],[5.25,0.004823,379.8,124.3],[5.5,0.003862,394.5,128.6],[5.75,0.003056,409.2,133.2],[6.0,0.002388,424.0,138.0],[6.25,0.001841,438.8,143.1],[6.5,0.0014,453.5,148.4],[6.75,0.001048,468.2,154.1],[7.0,0.0007727,483.0,160.0],[7.25,0.0005601,497.8,166.3],[7.5,0.0003988,512.5,173.0],[7.75,0.0002787,527.2,180.0],[8.0,0.0001909,542.0,187.4],[8.25,0.0001281,556.8,195.2],[8.5,8.4e-05,571.5,203.4],[8.75,5.382e-05,586.2,212.1],[9.0,3.363e-05,601.0,221.3],[9.25,2.046e-05,615.8,231.0],[9.5,1.211e-05,630.5,241.3],[9.75,6.956e-06,645.2,252.1],[10.0,3.872e-06,660.0,263.5]];
  const svg = chart.querySelector('svg');
  const hit = chart.querySelector('.hit');
  const hover = chart.querySelector('.hover');
  const cross = chart.querySelector('.cross');
  const dot = chart.querySelector('.hover circle');
  const tip = chart.querySelector('.tip');

  const show = (event) => {
    const box = svg.getBoundingClientRect();
    const x = (event.clientX - box.left) * (680 / box.width);
    const point = points.reduce((a, b) => (Math.abs(b[2] - x) < Math.abs(a[2] - x) ? b : a));
    const [snr, ber, px, py] = point;
    cross.setAttribute('x1', px);
    cross.setAttribute('x2', px);
    dot.setAttribute('cx', px);
    dot.setAttribute('cy', py);
    hover.removeAttribute('hidden');
    tip.hidden = false;
    tip.textContent = `${snr.toFixed(1)} dB · 1 bit wrong in ${Math.round(1 / ber).toLocaleString('en-US')}`;
    const scale = box.width / 680;
    const left = Math.min(px * scale + 10, box.width - tip.offsetWidth);
    tip.style.transform = `translate(${Math.max(0, left)}px, ${py * scale + 12}px)`;
  };
  const hide = () => { hover.setAttribute('hidden', ''); tip.hidden = true; };

  hit.addEventListener('pointermove', show);
  hit.addEventListener('pointerdown', show);
  hit.addEventListener('pointerleave', hide);
}
