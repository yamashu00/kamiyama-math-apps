import { useState } from 'react';
import { AreaVisualizer } from './components/AreaVisualizer';
import { StepGuide, STEPS } from './components/StepGuide';

const HUB_URL = 'https://kamiyama-math-apps-da8y.vercel.app/';

const REAL_WORLD = [
  { icon: '🏥', title: 'CT・MRI（医療）', body: 'X線の透過量を積分→逆変換で体の断面図を再構成。積分なしに現代の医療診断は成立しない。', math: 'ラドン変換（積分）' },
  { icon: '🚀', title: 'ロケット・宇宙工学', body: 'ロケットの燃料消費量と推力の積分が「衝撃量」。どれだけの速度変化が得られるかを計算。', math: '積分（力学的衝撃）' },
  { icon: '💰', title: '金融・リスク管理', body: '株価の確率分布の積分で「ある範囲に収まる確率」を求める。オプション取引の価格計算に使う。', math: '確率密度関数の積分' },
  { icon: '🎵', title: '音楽・信号処理', body: 'フーリエ変換は積分で定義される。音の波形を周波数成分に分解するときに使う。', math: 'フーリエ変換（積分）' },
];

export default function App() {
  const [step, setStep] = useState(0);
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-header-top">
            <a href={HUB_URL} className="btn-back">← 一覧に戻る</a>
            <span className="app-time-badge">⏱ 約5〜7分</span>
            <span className="app-time-badge">App 5 / 6</span>
          </div>
          <h1 className="app-title">∫ 面積パズル <span className="app-title-badge">基礎数学Ⅰ</span></h1>
          <p className="app-subtitle">微積分への入口 — 「細かく分けて足す」という考え方</p>
        </div>
      </header>
      <main className="app-main">
        <StepGuide currentStep={step} onNext={() => setStep(s => Math.min(s+1, STEPS.length-1))} onPrev={() => setStep(s => Math.max(s-1, 0))} />
        <AreaVisualizer />
        {step === STEPS.length - 1 && (
          <div className="summary-section">
            <div className="summary-section-title">🌐 微分・積分が使われている場所</div>
            <div className="summary-grid">
              {REAL_WORLD.map(item => (
                <div className="summary-card" key={item.title}>
                  <div className="summary-card-icon">{item.icon}</div>
                  <div><div className="summary-card-title">{item.title}</div><div className="summary-card-body">{item.body}</div><div className="summary-card-math">{item.math}</div></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <footer className="app-footer">神山まるごと高専 — 基礎数学Ⅰ 初回授業 体験アプリ #5 — App 5 of 6</footer>
    </div>
  );
}
