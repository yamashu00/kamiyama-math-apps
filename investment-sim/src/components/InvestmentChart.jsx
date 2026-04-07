import { useRef, useEffect, useState } from 'react';
import { Formula } from './Formula';

const W = 800, H = 300;
const PAD = { top: 20, right: 20, bottom: 40, left: 60 };

function calcCompound(monthly, rate, years) {
  const r = rate / 100 / 12;
  const n = years * 12;
  if (r === 0) return monthly * n;
  return monthly * ((Math.pow(1 + r, n) - 1) / r);
}

function calcSimple(monthly, rate, years) {
  const n = years * 12;
  const principal = monthly * n;
  return principal + principal * (rate / 100) * years * 0.5;
}

export function InvestmentChart() {
  const canvasRef = useRef(null);
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(3);
  const [years, setYears] = useState(20);

  const finalCompound = calcCompound(monthly, rate, years);
  const finalSimple = calcSimple(monthly, rate, years);
  const totalPaid = monthly * 12 * years;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const bgColor = isLight ? '#f0f2f5' : '#191a1b';
    const labelColor = isLight ? '#374151' : '#b0b8c8';
    const gridColor = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, W, H);

    const gW = W - PAD.left - PAD.right;
    const gH = H - PAD.top - PAD.bottom;

    // Compute all data points
    const compoundData = [];
    const simpleData = [];
    const paidData = [];
    for (let y = 0; y <= years; y++) {
      compoundData.push(calcCompound(monthly, rate, y));
      simpleData.push(calcSimple(monthly, rate, y));
      paidData.push(monthly * 12 * y);
    }
    const maxVal = Math.max(...compoundData, 1);

    const toX = (i) => PAD.left + (i / years) * gW;
    const toY = (v) => PAD.top + gH - (v / maxVal) * gH;

    // Grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = PAD.top + (gH / 4) * i;
      ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(W - PAD.right, y); ctx.stroke();
      const val = maxVal * (1 - i / 4);
      ctx.fillStyle = labelColor;
      ctx.font = 'bold 11px Inter';
      ctx.textAlign = 'right';
      ctx.fillText(val >= 10000 ? `${Math.round(val / 10000)}万` : `${Math.round(val)}`, PAD.left - 6, y + 4);
    }

    // X axis labels
    ctx.fillStyle = labelColor;
    ctx.textAlign = 'center';
    ctx.font = 'bold 11px Inter';
    for (let y = 0; y <= years; y += Math.max(1, Math.floor(years / 5))) {
      ctx.fillText(`${y}年`, toX(y), H - PAD.bottom + 16);
    }

    // Paid line (gray dashed)
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    paidData.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
    ctx.stroke();
    ctx.setLineDash([]);

    // Simple interest line (muted)
    ctx.strokeStyle = 'rgba(130,143,255,0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    simpleData.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
    ctx.stroke();

    // Compound line (bright)
    ctx.strokeStyle = '#5e6ad2';
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(94,106,210,0.4)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    compoundData.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Fill under compound
    ctx.fillStyle = 'rgba(94,106,210,0.08)';
    ctx.beginPath();
    compoundData.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
    ctx.lineTo(toX(years), toY(0));
    ctx.lineTo(toX(0), toY(0));
    ctx.closePath();
    ctx.fill();

    // Endpoint dot
    ctx.fillStyle = '#5e6ad2';
    ctx.beginPath();
    ctx.arc(toX(years), toY(compoundData[years]), 5, 0, Math.PI * 2);
    ctx.fill();
  }, [monthly, rate, years]);

  const fmt = (v) => v >= 10000 ? `${(v / 10000).toFixed(1)}万円` : `${Math.round(v).toLocaleString()}円`;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">📈 投資シミュレーター</div>
        <div className="card-desc">スライダーを動かして、お金の増え方のグラフを観察しよう。</div>
      </div>
      <div className="card-body">
        <div className="canvas-wrap">
          <span className="canvas-label">資産の成長グラフ</span>
          <canvas ref={canvasRef} width={W} height={H} />
        </div>

        <div className="slider-group">
          <div className="slider-row">
            <label className="slider-label">毎月積立額</label>
            <input type="range" min="1000" max="50000" step="1000" value={monthly} onChange={e => setMonthly(+e.target.value)} />
            <span className="slider-value">{(monthly / 10000).toFixed(1)}万</span>
          </div>
          <div className="slider-row">
            <label className="slider-label">年利（%）</label>
            <input type="range" min="0" max="10" step="0.1" value={rate} onChange={e => setRate(+e.target.value)} />
            <span className="slider-value">{rate.toFixed(1)}%</span>
          </div>
          <div className="slider-row">
            <label className="slider-label">積立期間</label>
            <input type="range" min="1" max="40" step="1" value={years} onChange={e => setYears(+e.target.value)} />
            <span className="slider-value">{years}年</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { label: '積立総額', value: fmt(totalPaid), color: 'var(--text-muted)' },
            { label: '複利（最終）', value: fmt(finalCompound), color: '#828fff' },
            { label: '利益', value: fmt(finalCompound - totalPaid), color: '#10b981' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ fontSize: 10, color: 'var(--text-subtle)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color }}>{value}</div>
            </div>
          ))}
        </div>

        <div className="formula-box">
          <div className="formula-label">数式（等比数列の和）</div>
          <div className="formula-text" style={{ fontSize: 17 }}>
            <Formula tex={`S = m \\times \\frac{(1 + r)^n - 1}{r}`} />
            <span style={{ fontSize: 11, color: 'var(--text-subtle)', marginLeft: 14 }}>m=毎月額, r=月利, n=月数</span>
          </div>
        </div>

        <div className="msg msg-info" style={{ fontSize: 12 }}>
          <strong style={{ color: 'var(--text-secondary)' }}>凡例：</strong>
          <span style={{ color: '#5e6ad2' }}>━━</span> 複利
          <span style={{ color: 'rgba(130,143,255,0.6)' }}>━━</span> 単利
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>- -</span> 積立総額のみ
        </div>
      </div>
    </div>
  );
}
