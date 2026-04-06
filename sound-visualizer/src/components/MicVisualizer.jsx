import { useRef, useState, useEffect, useCallback } from 'react';

const CANVAS_W = 800;
const CANVAS_H = 180;
const FREQ_H = 120;

function clearCanvas(canvas, color = '#191a1b') {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function MicVisualizer({ highlighted = false }) {
  const waveCanvasRef = useRef(null);
  const freqCanvasRef = useRef(null);
  const rafRef = useRef(null);
  const audioRef = useRef(null); // { ctx, analyser, stream }
  const [active, setActive] = useState(false);
  const [error, setError] = useState(null);

  // Draw idle state on mount
  useEffect(() => {
    if (waveCanvasRef.current) drawIdleWave(waveCanvasRef.current);
    if (freqCanvasRef.current) drawIdleFreq(freqCanvasRef.current);
  }, []);

  const drawIdleWave = (canvas) => {
    clearCanvas(canvas);
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.strokeStyle = 'rgba(94, 106, 210, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x <= W; x++) {
      const y = H / 2 + Math.sin((x / W) * Math.PI * 4) * 20;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    // center line
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, H / 2);
    ctx.lineTo(W, H / 2);
    ctx.stroke();
  };

  const drawIdleFreq = (canvas) => {
    clearCanvas(canvas);
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const bars = 40;
    const barW = Math.floor(W / bars) - 2;
    for (let i = 0; i < bars; i++) {
      const h = (Math.sin(i * 0.4) * 0.3 + 0.35) * H * 0.3;
      ctx.fillStyle = `rgba(94, 106, 210, 0.15)`;
      ctx.beginPath();
      ctx.roundRect(i * (barW + 2), H - h, barW, h, 2);
      ctx.fill();
    }
  };

  const startMic = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      audioRef.current = { ctx: audioCtx, analyser, stream };
      setActive(true);
      draw(analyser);
    } catch (e) {
      setError(
        e.name === 'NotAllowedError'
          ? 'マイクへのアクセスが拒否されました。ブラウザの設定で許可してください。'
          : `マイクに接続できません: ${e.message}`
      );
    }
  }, []);

  const stopMic = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (audioRef.current) {
      audioRef.current.stream.getTracks().forEach((t) => t.stop());
      audioRef.current.ctx.close();
      audioRef.current = null;
    }
    setActive(false);
    if (waveCanvasRef.current) drawIdleWave(waveCanvasRef.current);
    if (freqCanvasRef.current) drawIdleFreq(freqCanvasRef.current);
  }, []);

  const draw = useCallback((analyser) => {
    const bufLen = analyser.frequencyBinCount; // fftSize / 2 = 1024
    const timeData = new Uint8Array(bufLen);
    const freqData = new Uint8Array(bufLen);

    const frame = () => {
      rafRef.current = requestAnimationFrame(frame);

      // --- Waveform ---
      analyser.getByteTimeDomainData(timeData);
      const wCanvas = waveCanvasRef.current;
      if (wCanvas) {
        const ctx = wCanvas.getContext('2d');
        const W = wCanvas.width, H = wCanvas.height;
        ctx.fillStyle = '#191a1b';
        ctx.fillRect(0, 0, W, H);

        // Center line
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, H / 2);
        ctx.lineTo(W, H / 2);
        ctx.stroke();

        // Waveform
        ctx.strokeStyle = '#5e6ad2';
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(94, 106, 210, 0.4)';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        const sliceW = W / bufLen;
        let x = 0;
        for (let i = 0; i < bufLen; i++) {
          const v = timeData[i] / 128.0;
          const y = (v * H) / 2;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          x += sliceW;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // --- Frequency bars ---
      analyser.getByteFrequencyData(freqData);
      const fCanvas = freqCanvasRef.current;
      if (fCanvas) {
        const ctx = fCanvas.getContext('2d');
        const W = fCanvas.width, H = fCanvas.height;
        ctx.fillStyle = '#191a1b';
        ctx.fillRect(0, 0, W, H);

        const numBars = 80;
        const barW = Math.floor(W / numBars) - 1;
        for (let i = 0; i < numBars; i++) {
          const dataIndex = Math.floor((i / numBars) * (bufLen / 4));
          const barH = (freqData[dataIndex] / 255) * H;
          // Color: indigo → violet gradient by position
          const hue = 230 + (i / numBars) * 50;
          const sat = 60 + (freqData[dataIndex] / 255) * 20;
          const lit = 55 + (freqData[dataIndex] / 255) * 15;
          ctx.fillStyle = `hsl(${hue}, ${sat}%, ${lit}%)`;
          ctx.beginPath();
          ctx.roundRect(i * (barW + 1), H - barH, barW, barH, [2, 2, 0, 0]);
          ctx.fill();
        }
      }
    };

    frame();
  }, []);

  // Cleanup on unmount
  useEffect(() => () => stopMic(), [stopMic]);

  return (
    <div className={`card${highlighted ? ' highlighted' : ''}`}>
      <div className="card-header">
        <div className="card-title">
          <span className="status-dot" style={active ? { background: '#10b981', boxShadow: '0 0 6px rgba(16,185,129,0.6)' } : {}} />
          🎙️ マイク波形ビジュアライザー
        </div>
        <div className="card-desc">
          声を出すと、リアルタイムで波形が描かれる。この複雑な形も sin の足し算でできている。
        </div>
      </div>

      <div className="card-body">
        <div className="canvas-wrap">
          <span className="canvas-label">時間波形 — 声の形</span>
          <canvas ref={waveCanvasRef} width={CANVAS_W} height={CANVAS_H} />
        </div>

        <div className="canvas-wrap">
          <span className="canvas-label">周波数スペクトル — 音の成分</span>
          <canvas ref={freqCanvasRef} width={CANVAS_W} height={FREQ_H} />
        </div>

        <div className="row">
          {!active ? (
            <button className="btn btn-primary" onClick={startMic}>
              ▶ マイクをオンにする
            </button>
          ) : (
            <button className="btn btn-stop" onClick={stopMic}>
              ■ 停止する
            </button>
          )}
          {active && (
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              声を出したり、楽器を鳴らしてみよう
            </span>
          )}
        </div>

        {error && <div className="msg msg-error">{error}</div>}

        <div className="msg msg-info" style={{ fontSize: 12, lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--text-secondary)' }}>数学への橋渡し：</strong>
          下のグラフは「周波数スペクトル」。どの高さの sin 波がどれくらい混ざっているかを表している。
          これがフーリエ解析の正体。
        </div>
      </div>
    </div>
  );
}
