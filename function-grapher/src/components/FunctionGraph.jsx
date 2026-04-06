import { useRef, useEffect, useState } from 'react';

const W = 800, H = 380;
const CX = W / 2, CY = H / 2;
const SCALE = 40; // pixels per unit

function drawGrid(ctx) {
  ctx.fillStyle = '#191a1b';
  ctx.fillRect(0, 0, W, H);
  // grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for (let x = CX % SCALE; x < W; x += SCALE) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = CY % SCALE; y < H; y += SCALE) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  // axes
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, CY); ctx.lineTo(W, CY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(CX, 0); ctx.lineTo(CX, H); ctx.stroke();
  // axis labels
  ctx.fillStyle = '#62666d';
  ctx.font = '10px Inter';
  ctx.textAlign = 'center';
  for (let i = -5; i <= 5; i++) {
    if (i === 0) continue;
    const px = CX + i * SCALE, py = CY + i * SCALE;
    ctx.fillText(i, px, CY + 14);
    ctx.textAlign = 'right';
    ctx.fillText(-i, CX - 4, py + 4);
    ctx.textAlign = 'center';
  }
  ctx.fillStyle = '#62666d';
  ctx.fillText('x', W - 8, CY - 8);
  ctx.textAlign = 'right';
  ctx.fillText('y', CX + 14, 10);
}

const FUNCTIONS = {
  linear:    { label: '一次関数', formula: (a, b) => `y = ${a}x + ${b}`, fn: (a, b) => x => a * x + b, color: '#5e6ad2', example: 'スロープの傾き・速さ×時間' },
  quadratic: { label: '二次関数', formula: (a, b, c) => `y = ${a}x² + ${b}x + ${c}`, fn: (a, b, c) => x => a * x * x + b * x + c, color: '#a855f7', example: 'ボールの軌跡・橋のアーチ' },
  power:     { label: '冪関数', formula: (a, n) => `y = ${a}x^${n}`, fn: (a, n) => x => a * Math.pow(Math.abs(x), n) * Math.sign(x), color: '#10b981', example: 'アルゴリズムの計算量 O(n²)' },
  sqrt:      { label: '無理関数', formula: (a) => `y = ${a}√x`, fn: (a) => x => x >= 0 ? a * Math.sqrt(x) : NaN, color: '#f59e0b', example: '振り子の周期・ロケットの速度' },
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

  const formula = type === 'linear' ? def.formula(params.a, params.b)
    : type === 'quadratic' ? def.formula(params.a, params.b, params.c)
    : type === 'power' ? def.formula(params.a, params.n)
    : def.formula(params.a);

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
          <div className="formula-text" style={{ color: def.color }}>{formula}</div>
        </div>

        <div className="msg msg-info" style={{ fontSize: 12 }}>
          <strong style={{ color: 'var(--text-secondary)' }}>日常との接続：</strong>{def.example}
        </div>
      </div>
    </div>
  );
}
