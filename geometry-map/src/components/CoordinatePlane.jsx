import { useRef, useEffect, useState, useCallback } from 'react';
import { Formula } from './Formula';

const W = 800, H = 400;
const CX = W / 2, CY = H / 2, SCALE = 40;

function drawGrid(ctx) {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  ctx.fillStyle = isLight ? '#f0f2f5' : '#191a1b';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for (let x = CX % SCALE; x < W; x += SCALE) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = CY % SCALE; y < H; y += SCALE) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.25)';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, CY); ctx.lineTo(W, CY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(CX, 0); ctx.lineTo(CX, H); ctx.stroke();
  const labelColor = isLight ? '#374151' : '#b0b8c8';
  ctx.fillStyle = labelColor; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
  for (let i = -9; i <= 9; i++) {
    if (i === 0) continue;
    ctx.fillText(i, CX + i * SCALE, CY + 14);
    ctx.textAlign = 'right';
    ctx.fillText(-i, CX - 6, CY + i * SCALE + 4);
    ctx.textAlign = 'center';
  }
}

export function CoordinatePlane() {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);

  const draw = useCallback((pts) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    drawGrid(ctx);

    if (pts.length >= 2) {
      const [p1, p2] = pts;
      const px1 = CX + p1.x * SCALE, py1 = CY - p1.y * SCALE;
      const px2 = CX + p2.x * SCALE, py2 = CY - p2.y * SCALE;

      // Right-angle triangle (horizontal then vertical legs)
      ctx.strokeStyle = 'rgba(94,106,210,0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(px1, py1); ctx.lineTo(px2, py1); ctx.lineTo(px2, py2); ctx.stroke();
      ctx.setLineDash([]);

      // Right angle marker
      const sqS = 10 * Math.sign(p2.x - p1.x), sqT = 10 * Math.sign(p2.y - p1.y);
      ctx.strokeStyle = 'rgba(94,106,210,0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px2 - sqS, py1);
      ctx.lineTo(px2 - sqS, py1 + sqT);
      ctx.lineTo(px2, py1 + sqT);
      ctx.stroke();

      // Fill triangle
      ctx.fillStyle = 'rgba(94,106,210,0.07)';
      ctx.beginPath(); ctx.moveTo(px1, py1); ctx.lineTo(px2, py1); ctx.lineTo(px2, py2); ctx.closePath(); ctx.fill();

      // Hypotenuse
      ctx.strokeStyle = '#5e6ad2';
      ctx.lineWidth = 3;
      ctx.shadowColor = 'rgba(94,106,210,0.4)';
      ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.moveTo(px1, py1); ctx.lineTo(px2, py2); ctx.stroke();
      ctx.shadowBlur = 0;

      // Leg labels
      const dx = Math.abs(p2.x - p1.x), dy = Math.abs(p2.y - p1.y);
      const dist = Math.sqrt(dx * dx + dy * dy);
      ctx.fillStyle = '#8a8f98'; ctx.font = '11px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`a = ${dx.toFixed(1)}`, (px1 + px2) / 2, py1 + (p2.y < p1.y ? -10 : 18));
      ctx.textAlign = 'left';
      ctx.fillText(`b = ${dy.toFixed(1)}`, px2 + 6, (py1 + py2) / 2 + 4);

      // Hypotenuse label
      ctx.fillStyle = '#828fff'; ctx.font = 'bold 12px Inter'; ctx.textAlign = 'center';
      const mx = (px1 + px2) / 2, my = (py1 + py2) / 2;
      ctx.fillText(`c = √(${dx.toFixed(1)}² + ${dy.toFixed(1)}²) = ${dist.toFixed(2)}`, mx, my - 14);
    }

    // Draw points
    pts.forEach((p, i) => {
      const px = CX + p.x * SCALE, py = CY - p.y * SCALE;
      ctx.fillStyle = i === 0 ? '#5e6ad2' : '#a855f7';
      ctx.shadowColor = ctx.fillStyle + '88';
      ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#f7f8f8'; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
      ctx.fillText(['P₁', 'P₂'][i], px, py - 13);
      ctx.fillStyle = '#8a8f98'; ctx.font = '10px Inter';
      ctx.fillText(`(${p.x}, ${p.y})`, px, py + 20);
    });
  }, []);

  useEffect(() => { draw(points); }, [points, draw]);

  const handleClick = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width, scaleY = H / rect.height;
    const cx = (e.clientX - rect.left) * scaleX;
    const cy = (e.clientY - rect.top) * scaleY;
    const gx = Math.round((cx - CX) / SCALE);
    const gy = Math.round((CY - cy) / SCALE);
    setPoints(prev => prev.length >= 2 ? [{ x: gx, y: gy }] : [...prev, { x: gx, y: gy }]);
  }, []);

  const p1 = points[0], p2 = points[1];
  const dx = p1 && p2 ? Math.abs(p2.x - p1.x) : 0;
  const dy = p1 && p2 ? Math.abs(p2.y - p1.y) : 0;
  const dist = Math.sqrt(dx * dx + dy * dy);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">📍 座標と距離 — 三平方の定理</div>
        <div className="card-desc">グラフをクリックして2点を置くと、距離が三平方の定理で計算される。</div>
      </div>
      <div className="card-body">
        <div className="canvas-wrap" style={{ cursor: 'crosshair' }}>
          <span className="canvas-label">クリックで点を置く（2点まで）</span>
          <canvas ref={canvasRef} width={W} height={H} onClick={handleClick} />
        </div>

        {p1 && p2 && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10 }}>
              {[
                { label: 'P₁', value: `(${p1.x}, ${p1.y})`, color: '#5e6ad2' },
                { label: 'P₂', value: `(${p2.x}, ${p2.y})`, color: '#a855f7' },
                { label: '水平距離 a', value: dx.toFixed(1), color: 'var(--text-muted)' },
                { label: '垂直距離 b', value: dy.toFixed(1), color: 'var(--text-muted)' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ fontSize: 10, color: 'var(--text-subtle)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color }}>{value}</div>
                </div>
              ))}
            </div>

            <div className="formula-box">
              <div className="formula-label">三平方の定理による計算</div>
              <div className="formula-text" style={{ fontSize: 17 }}>
                <Formula tex={`c = \\sqrt{a^2 + b^2} = \\sqrt{${dx.toFixed(1)}^2 + ${dy.toFixed(1)}^2} = \\sqrt{${(dx*dx+dy*dy).toFixed(2)}} = {\\color{#10b981} ${dist.toFixed(4)}}`} />
              </div>
            </div>
          </>
        )}

        {!p1 && (
          <div className="msg msg-info" style={{ textAlign: 'center', padding: '20px' }}>
            グラフ上をクリックして P₁ を置いてください
          </div>
        )}
        {p1 && !p2 && (
          <div className="msg msg-info" style={{ textAlign: 'center', padding: '20px' }}>
            次に P₂ を置いてください
          </div>
        )}

        {p1 && p2 && (
          <button className="btn btn-ghost" onClick={() => setPoints([])}>リセット</button>
        )}

        <div className="msg msg-info" style={{ fontSize: 12 }}>
          <strong style={{ color: 'var(--text-secondary)' }}>日常との接続：</strong>
          GPS で2地点の距離を計算するとき、緯度と経度の差を「a, b」として同じ計算をしている。
          Google マップ・カーナビ・ドローンの位置制御まで、この1本の式が支えている。
        </div>
      </div>
    </div>
  );
}
