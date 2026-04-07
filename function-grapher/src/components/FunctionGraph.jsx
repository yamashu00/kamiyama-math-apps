import { useRef, useEffect, useState } from 'react';
import { Formula } from './Formula';

const W = 800, H = 380;
const CX = W / 2, CY = H / 2;
const SCALE = 40; // pixels per unit

function drawGrid(ctx) {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  ctx.fillStyle = isLight ? '#f0f2f5' : '#191a1b';
  ctx.fillRect(0, 0, W, H);
  // grid lines
  ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for (let x = CX % SCALE; x < W; x += SCALE) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = CY % SCALE; y < H; y += SCALE) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  // axes
  ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.25)';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, CY); ctx.lineTo(W, CY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(CX, 0); ctx.lineTo(CX, H); ctx.stroke();
  // axis labels
  const labelColor = isLight ? '#374151' : '#b0b8c8';
  ctx.fillStyle = labelColor;
  ctx.font = 'bold 11px Inter';
  ctx.textAlign = 'center';
  for (let i = -5; i <= 5; i++) {
    if (i === 0) continue;
    const px = CX + i * SCALE, py = CY + i * SCALE;
    ctx.fillText(i, px, CY + 14);
    ctx.textAlign = 'right';
    ctx.fillText(-i, CX - 6, py + 4);
    ctx.textAlign = 'center';
  }
  ctx.fillStyle = labelColor;
  ctx.fillText('x', W - 8, CY - 8);
  ctx.textAlign = 'right';
  ctx.fillText('y', CX + 14, 10);
}

const FUNCTIONS = {
  linear:    { label: '一次関数', tex: (a, b) => `y = ${a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}`, fn: (a, b) => x => a * x + b, color: '#5e6ad2', example: 'スロープの傾き・速さ×時間' },
  quadratic: { label: '二次関数', tex: (a, b, c) => `y = ${a}x^2 ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)}`, fn: (a, b, c) => x => a * x * x + b * x + c, color: '#a855f7', example: 'ボールの軌跡・橋のアーチ' },
  power:     { label: '冪関数', tex: (a, n) => `y = ${a}x^{${n}}`, fn: (a, n) => x => a * Math.pow(Math.abs(x), n) * Math.sign(x), color: '#10b981', example: 'アルゴリズムの計算量 O(n²)' },
  sqrt:      { label: '無理関数', tex: (a) => `y = ${a}\\sqrt{x}`, fn: (a) => x => x >= 0 ? a * Math.sqrt(x) : NaN, color: '#f59e0b', example: '振り子の周期・ロケットの速度' },
};

export function FunctionGraph() {
  const canvasRef = useRef(null);
  const [type, setType] = useState('linear');
  const [params, setParams] = useState({ a: 1, b: 0, c: 0, n: 2 });

  const def = FUNCTIONS[type];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    drawGrid(ctx);

    const fn = type === 'linear' ? def.fn(params.a, params.b)
      : type === 'quadratic' ? def.fn(params.a, params.b, params.c)
      : type === 'power' ? def.fn(params.a, params.n)
      : def.fn(params.a);

    ctx.strokeStyle = def.color;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = def.color + '66';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    let started = false;
    for (let px = 0; px < W; px++) {
      const x = (px - CX) / SCALE;
      const y = fn(x);
      if (!isFinite(y) || isNaN(y)) { started = false; continue; }
      const py = CY - y * SCALE;
      if (py < -100 || py > H + 100) { started = false; continue; }
      if (!started) { ctx.moveTo(px, py); started = true; }
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }, [type, params, def]);

  const setP = (key, val) => setParams(p => ({ ...p, [key]: parseFloat(val) }));

  const tex = type === 'linear' ? def.tex(params.a, params.b)
    : type === 'quadratic' ? def.tex(params.a, params.b, params.c)
    : type === 'power' ? def.tex(params.a, params.n)
    : def.tex(params.a);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">📐 関数グラフ・アニメーター</div>
        <div className="card-desc">スライダーでグラフの形を動かして、変化の感覚を掴もう。</div>
      </div>
      <div className="card-body">
        {/* Type selector */}
        <div className="row" style={{ flexWrap: 'wrap' }}>
          {Object.entries(FUNCTIONS).map(([k, v]) => (
            <button key={k} className={`btn ${type === k ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => { setType(k); setParams({ a: 1, b: 0, c: 0, n: 2 }); }}>
              {v.label}
            </button>
          ))}
        </div>

        <div className="canvas-wrap">
          <span className="canvas-label">{def.label} — {def.example}</span>
          <canvas ref={canvasRef} width={W} height={H} />
        </div>

        {/* Param sliders */}
        <div className="slider-group">
          <div className="slider-row">
            <label className="slider-label">a（傾き/係数）</label>
            <input type="range" min="-3" max="3" step="0.1" value={params.a} onChange={e => setP('a', e.target.value)} />
            <span className="slider-value">{params.a.toFixed(1)}</span>
          </div>
          {(type === 'linear' || type === 'quadratic') && (
            <div className="slider-row">
              <label className="slider-label">b（切片/係数）</label>
              <input type="range" min="-5" max="5" step="0.5" value={params.b} onChange={e => setP('b', e.target.value)} />
              <span className="slider-value">{params.b.toFixed(1)}</span>
            </div>
          )}
          {type === 'quadratic' && (
            <div className="slider-row">
              <label className="slider-label">c（定数項）</label>
              <input type="range" min="-5" max="5" step="0.5" value={params.c} onChange={e => setP('c', e.target.value)} />
              <span className="slider-value">{params.c.toFixed(1)}</span>
            </div>
          )}
          {type === 'power' && (
            <div className="slider-row">
              <label className="slider-label">n（指数）</label>
              <input type="range" min="0.5" max="4" step="0.5" value={params.n} onChange={e => setP('n', e.target.value)} />
              <span className="slider-value">{params.n.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="formula-box">
          <div className="formula-label">現在の数式</div>
          <div className="formula-text" style={{ color: def.color, fontSize: 18 }}>
            <Formula tex={tex} />
          </div>
        </div>

        <div className="msg msg-info" style={{ fontSize: 12 }}>
          <strong style={{ color: 'var(--text-secondary)' }}>日常との接続：</strong>{def.example}
        </div>
      </div>
    </div>
  );
}
