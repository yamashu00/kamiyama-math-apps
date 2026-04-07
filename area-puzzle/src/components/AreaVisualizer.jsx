import { useRef, useEffect, useState } from 'react';
import { Formula } from './Formula';

const W = 800, H = 300;
const PAD = { top: 20, right: 20, bottom: 40, left: 50 };

const FUNCTIONS = [
  { label: 'x²', fn: x => x * x, exact: 1 / 3, range: [0, 1], desc: 'ボールの落下・放物線' },
  { label: 'x', fn: x => x, exact: 0.5, range: [0, 1], desc: '一次関数（三角形の面積）' },
  { label: '√x', fn: x => Math.sqrt(x), exact: 2 / 3, range: [0, 1], desc: '無理関数' },
  { label: 'sin(πx)', fn: x => Math.sin(Math.PI * x), exact: 2 / Math.PI, range: [0, 1], desc: '音波・振動' },
];

export function AreaVisualizer() {
  const canvasRef = useRef(null);
  const [bars, setBars] = useState(4);
  const [fnIdx, setFnIdx] = useState(0);

  const { fn, exact, range, label } = FUNCTIONS[fnIdx];
  const [a, b] = range;
  const dx = (b - a) / bars;
  const approx = Array.from({ length: bars }, (_, i) => fn(a + (i + 0.5) * dx) * dx).reduce((s, v) => s + v, 0);
  const error = Math.abs(exact - approx);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const labelColor = isLight ? '#374151' : '#b0b8c8';
    ctx.fillStyle = isLight ? '#f0f2f5' : '#191a1b';
    ctx.fillRect(0, 0, W, H);

    const gW = W - PAD.left - PAD.right;
    const gH = H - PAD.top - PAD.bottom;
    const toX = v => PAD.left + ((v - a) / (b - a)) * gW;
    const toY = v => PAD.top + gH - Math.min(v, 1.2) * gH;

    // Axes
    ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(PAD.left, PAD.top + gH); ctx.lineTo(W - PAD.right, PAD.top + gH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(PAD.left, PAD.top); ctx.lineTo(PAD.left, PAD.top + gH); ctx.stroke();

    // X-axis labels
    ctx.fillStyle = labelColor; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
    for (let i = 0; i <= 4; i++) {
      const v = a + (i / 4) * (b - a);
      ctx.fillText(v.toFixed(2), toX(v), PAD.top + gH + 16);
    }
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const v = i / 4;
      ctx.fillText(v.toFixed(2), PAD.left - 4, toY(v) + 4);
    }

    // Rectangles
    const dx = (b - a) / bars;
    for (let i = 0; i < bars; i++) {
      const xMid = a + (i + 0.5) * dx;
      const h = fn(xMid);
      const rx = toX(a + i * dx);
      const rw = toX(a + (i + 1) * dx) - rx - 1;
      const rh = Math.min(h, 1.2) * gH;
      ctx.fillStyle = 'rgba(94,106,210,0.3)';
      ctx.fillRect(rx, toY(h), rw, rh);
      ctx.strokeStyle = 'rgba(94,106,210,0.6)';
      ctx.lineWidth = 1;
      ctx.strokeRect(rx, toY(h), rw, rh);
    }

    // Curve
    ctx.strokeStyle = '#828fff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(130,143,255,0.4)';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    for (let px = 0; px <= gW; px++) {
      const x = a + (px / gW) * (b - a);
      const y = fn(x);
      const py = toY(y);
      px === 0 ? ctx.moveTo(PAD.left + px, py) : ctx.lineTo(PAD.left + px, py);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }, [bars, fnIdx, fn, a, b]);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">∫ 面積パズル — 積分への入口</div>
        <div className="card-desc">長方形を細かくしていくと、曲線の下の面積がわかる。</div>
      </div>
      <div className="card-body">
        {/* Function selector */}
        <div className="row" style={{ flexWrap: 'wrap' }}>
          {FUNCTIONS.map((f, i) => (
            <button key={f.label} className={`btn ${fnIdx === i ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFnIdx(i)}>
              y = {f.label}
            </button>
          ))}
        </div>

        <div className="canvas-wrap">
          <span className="canvas-label">y = {label} の面積（青い長方形の合計）</span>
          <canvas ref={canvasRef} width={W} height={H} />
        </div>

        <div className="slider-row">
          <label className="slider-label">長方形の数</label>
          <input type="range" min="1" max="200" step="1" value={bars} onChange={e => setBars(+e.target.value)} />
          <span className="slider-value">{bars}本</span>
        </div>

        {/* Result display */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { label: '近似面積', value: approx.toFixed(6), color: '#5e6ad2' },
            { label: '真の面積', value: exact.toFixed(6), color: '#828fff' },
            { label: '誤差', value: error.toFixed(6), color: error < 0.001 ? '#10b981' : '#f59e0b' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ fontSize: 10, color: 'var(--text-subtle)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
            </div>
          ))}
        </div>

        <div className="formula-box">
          <div className="formula-label">積分の定義</div>
          <div className="formula-text" style={{ fontSize: 17 }}>
            <Formula tex={`\\int_0^1 f(x)\\,dx \\approx \\sum_{i=1}^{${bars}} f(x_i) \\cdot \\Delta x`} />
            <span style={{ fontSize: 12, color: 'var(--text-subtle)', marginLeft: 12 }}>長方形の面積の足し算</span>
          </div>
        </div>

        <div className="msg msg-info" style={{ fontSize: 12 }}>
          <strong style={{ color: 'var(--text-secondary)' }}>ポイント：</strong>
          長方形を{bars}本 → 誤差 {error.toFixed(6)}。200本にすると誤差はほぼゼロに。
          「本数を無限大にした極限」が積分の正体。
        </div>
      </div>
    </div>
  );
}
