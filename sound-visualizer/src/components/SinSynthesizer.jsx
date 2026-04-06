import { useRef, useState, useEffect, useCallback } from 'react';

const CANVAS_W = 800;
const CANVAS_H = 220;

const HARMONICS = [
  { label: '基本波 (1倍)', freq: 1, color: '#5e6ad2', colorDim: 'rgba(94,106,210,0.25)' },
  { label: '2倍音', freq: 2, color: '#7c4ddc', colorDim: 'rgba(124,77,220,0.25)' },
  { label: '3倍音', freq: 3, color: '#a855f7', colorDim: 'rgba(168,85,247,0.25)' },
  { label: '4倍音', freq: 4, color: '#c084fc', colorDim: 'rgba(192,132,252,0.25)' },
];

// Shared base frequency for playback (A3)
const BASE_FREQ = 220;

export function SinSynthesizer({ highlighted = false }) {
  const canvasRef = useRef(null);
  // amplitudes: 0.0 – 1.0 for each harmonic
  const [amplitudes, setAmplitudes] = useState([1.0, 0.0, 0.0, 0.0]);
  const [playing, setPlaying] = useState(false);

  // Audio refs (not state — we don't want re-renders on change)
  const audioCtxRef = useRef(null);
  const gainNodesRef = useRef([]); // one GainNode per harmonic

  // Draw the composite wave whenever amplitudes change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    ctx.fillStyle = '#191a1b';
    ctx.fillRect(0, 0, W, H);

    // Faint horizontal center line
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, H / 2);
    ctx.lineTo(W, H / 2);
    ctx.stroke();

    // Calculate max amplitude for normalization
    const totalAmp = amplitudes.reduce((s, a) => s + a, 0) || 1;

    // Draw individual harmonics (faint, behind)
    HARMONICS.forEach((h, i) => {
      if (amplitudes[i] === 0) return;
      ctx.strokeStyle = h.colorDim;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const t = (x / W) * Math.PI * 6; // 3 full cycles visible
        const y = H / 2 - (amplitudes[i] / totalAmp) * (H * 0.38) * Math.sin(h.freq * t);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    });

    // Draw composite wave (bright, on top)
    ctx.strokeStyle = '#828fff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(130,143,255,0.35)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    for (let x = 0; x <= W; x++) {
      const t = (x / W) * Math.PI * 6;
      let sum = 0;
      HARMONICS.forEach((h, i) => {
        sum += amplitudes[i] * Math.sin(h.freq * t);
      });
      const y = H / 2 - (sum / totalAmp) * (H * 0.4);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }, [amplitudes]);

  // Update amplitude value, and live-update gain if playing
  const updateAmplitude = useCallback((index, value) => {
    const val = parseFloat(value);
    setAmplitudes((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
    if (gainNodesRef.current[index]) {
      gainNodesRef.current[index].gain.setTargetAtTime(
        val * 0.25,
        audioCtxRef.current.currentTime,
        0.02
      );
    }
  }, []);

  const startAudio = useCallback(() => {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.5;
    masterGain.connect(ctx.destination);

    gainNodesRef.current = HARMONICS.map((h, i) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = BASE_FREQ * h.freq;
      gainNode.gain.value = amplitudes[i] * 0.25;
      osc.connect(gainNode);
      gainNode.connect(masterGain);
      osc.start();
      return gainNode;
    });

    setPlaying(true);
  }, [amplitudes]);

  const stopAudio = useCallback(() => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    gainNodesRef.current = [];
    setPlaying(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => () => stopAudio(), [stopAudio]);

  // Build formula string
  const formulaTerms = HARMONICS.map((h, i) => {
    if (amplitudes[i] === 0) return null;
    const amp = amplitudes[i].toFixed(1);
    const freqStr = h.freq === 1 ? 'x' : `${h.freq}x`;
    return `${amp} sin(${freqStr})`;
  }).filter(Boolean);
  const formula = formulaTerms.length > 0 ? `y = ${formulaTerms.join(' + ')}` : 'y = 0';

  return (
    <div className={`card${highlighted ? ' highlighted' : ''}`}>
      <div className="card-header">
        <div className="card-title">
          🎹 sin 波 合成器
        </div>
        <div className="card-desc">
          スライダーで sin 波を重ねてみよう。あらゆる音の形が作れる。
        </div>
      </div>

      <div className="card-body">
        <div className="canvas-wrap">
          <span className="canvas-label">合成波形</span>
          <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} />
        </div>

        {/* Harmonic sliders */}
        <div className="slider-group">
          {HARMONICS.map((h, i) => (
            <div className="slider-row" key={h.freq}>
              <label className="slider-label">
                <span
                  className="slider-label-dot"
                  style={{ background: h.color }}
                />
                {h.label}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={amplitudes[i]}
                onChange={(e) => updateAmplitude(i, e.target.value)}
                style={{
                  accentColor: h.color,
                }}
              />
              <span className="slider-value">{amplitudes[i].toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Play/Stop button */}
        <div className="row">
          {!playing ? (
            <button className="btn btn-play" onClick={startAudio}>
              ▶ 音を鳴らす
            </button>
          ) : (
            <button className="btn btn-stop" onClick={stopAudio}>
              ■ 停止する
            </button>
          )}
          {playing && (
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              スライダーを動かすとリアルタイムで音が変わる
            </span>
          )}
        </div>

        {/* Dynamic formula display */}
        <div className="formula-box">
          <div className="formula-label">数式</div>
          <div className="formula-text">{formula}</div>
        </div>

        <div className="msg msg-info" style={{ fontSize: 12, lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--text-secondary)' }}>数学への橋渡し：</strong>
          基本波だけ → 純音（笛）。倍音を足す → 複雑な楽器の音色。
          これが「フーリエ級数展開」の原理。どんな波形も sin の足し算で作れる。
        </div>
      </div>
    </div>
  );
}
