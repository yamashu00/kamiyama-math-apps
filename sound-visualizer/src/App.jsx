import { useState } from 'react';
import { MicVisualizer } from './components/MicVisualizer';
import { SinSynthesizer } from './components/SinSynthesizer';
import { StepGuide, STEPS } from './components/StepGuide';

const HUB_URL = 'https://kamiyama-math-hub.vercel.app/';

const REAL_WORLD = [
  {
    icon: '📱',
    title: 'MP3 / AAC（音楽ファイル）',
    body: '音声をフーリエ変換して周波数成分に分解 → 人間の耳が聞こえにくい成分を捨てる → 小さいファイルに圧縮。逆変換して再生。',
    math: 'フーリエ変換 (DFT)',
  },
  {
    icon: '📡',
    title: 'Wi-Fi / 4G / 5G',
    body: '電波もsin波の一種。情報を周波数の異なる多数のsin波に乗せて一斉に送る（OFDM方式）。スマホが1秒に数十億回この計算をしている。',
    math: '高速フーリエ変換 (FFT)',
  },
  {
    icon: '🏥',
    title: 'MRI（医療画像）',
    body: '体に電磁波を当てて、各組織から返ってくる「sin波の成分」を記録 → フーリエ逆変換で体の断面図を再構成。切らずに内部を見られる。',
    math: 'フーリエ逆変換 (IDFT)',
  },
  {
    icon: '🌍',
    title: '地震波解析',
    body: '地震計の波形をフーリエ変換して周波数成分を分析 → 地震の規模・震源・地盤の特性を調べる。建物の固有振動数との共鳴も設計に使われる。',
    math: 'スペクトル解析',
  },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const target = STEPS[currentStep].target;

  const handleNext = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  const handlePrev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-header-top">
            <a href={HUB_URL} className="btn-back">← 一覧に戻る</a>
            <span className="app-time-badge">⏱ 約5〜7分</span>
            <span className="app-time-badge">App 4 / 6</span>
          </div>
          <h1 className="app-title">
            🎵 音の数学
            <span className="app-title-badge">基礎数学Ⅰ</span>
          </h1>
          <p className="app-subtitle">
            あなたの声は sin と cos でできている — フーリエ解析への入口
          </p>
        </div>
      </header>

      <main className="app-main">
        {/* Step Guide */}
        <StepGuide
          currentStep={currentStep}
          onNext={handleNext}
          onPrev={handlePrev}
        />

        {/* Two-panel row */}
        <div className="panels-grid">
          <MicVisualizer highlighted={target === 'mic' || target === 'both'} />
          <SinSynthesizer highlighted={target === 'synth' || target === 'both'} />
        </div>

        {/* Connection banner — always visible */}
        <div className="connection-banner">
          <div className="connection-banner-icon">🔗</div>
          <div>
            <div className="connection-banner-title">この2つは実は同じもの</div>
            <div className="connection-banner-body">
              左のマイク波形（複雑な形）も、右の sin 波の足し算（フーリエ解析）で完全に表せる。
              音楽・スマホ・Wi-Fi・医療 MRI まで、あらゆる「波」がこの原理で動いている。
            </div>
          </div>
        </div>

        {/* Real-world panel — highlighted on step 6 */}
        {target === 'summary' && (
          <div className="summary-section">
            <div className="summary-section-title">🌐 フーリエ解析が使われている場所</div>
            <div className="summary-grid">
              {REAL_WORLD.map((item) => (
                <div className="summary-card" key={item.title}>
                  <div className="summary-card-icon">{item.icon}</div>
                  <div className="summary-card-content">
                    <div className="summary-card-title">{item.title}</div>
                    <div className="summary-card-body">{item.body}</div>
                    <div className="summary-card-math">{item.math}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-fourier-box">
              <div className="summary-fourier-label">フーリエ級数展開（無限個の sin を足す式）</div>
              <div className="summary-fourier-formula">
                f(x) = a₀/2 + Σ (aₙ cos nx + bₙ sin nx)
              </div>
              <div className="summary-fourier-note">
                この式1本で、世界中のあらゆる「繰り返す波」を表現できる。
                考案者：ジョゼフ・フーリエ（1807年、熱方程式を解くために発明）
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        神山まるごと高専 — 基礎数学Ⅰ 初回授業 体験アプリ #4 — App 4 of 6
      </footer>
    </div>
  );
}
