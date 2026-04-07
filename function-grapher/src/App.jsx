import { useState } from 'react';
import { FunctionGraph } from './components/FunctionGraph';
import { StepGuide, STEPS } from './components/StepGuide';

const HUB_URL = 'https://kamiyama-math-hub.vercel.app/';

const REAL_WORLD = [
  { icon: '🚗', title: 'カーナビ・自動運転', body: '速度（一次）、加速度（二次）、位置の予測まですべて関数でモデル化。自動ブレーキは「このまま進むと衝突するか？」を関数で計算する。', math: '一次・二次関数' },
  { icon: '💡', title: '電力・電気回路', body: '電流・電圧・電力の関係 P = V²/R は冪関数。LEDの明るさ調整も関数で制御される。', math: '冪関数 y = ax²' },
  { icon: '🎮', title: 'ゲームの物理エンジン', body: 'キャラクターの放物線ジャンプは y = -x² + bx + c。重力加速度を二次関数でシミュレーション。', math: '二次関数' },
  { icon: '📈', title: 'SNSの拡散・感染症モデル', body: '最初は急成長（指数関数的）→ 頭打ち（S字カーブ）。COVID-19の感染者数予測にも関数モデルが使われた。', math: '指数関数・ロジスティック関数' },
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
            <span className="app-time-badge">App 3 / 6</span>
          </div>
          <h1 className="app-title">📐 関数グラフ <span className="app-title-badge">基礎数学Ⅰ</span></h1>
          <p className="app-subtitle">関数 — 変化の形を式で読み書きする</p>
        </div>
      </header>
      <main className="app-main">
        <StepGuide currentStep={step} onNext={() => setStep(s => Math.min(s+1, STEPS.length-1))} onPrev={() => setStep(s => Math.max(s-1, 0))} />
        <FunctionGraph />
        {step === STEPS.length - 1 && (
          <div className="summary-section">
            <div className="summary-section-title">🌐 関数が使われている場所</div>
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
      <footer className="app-footer">神山まるごと高専 — 基礎数学Ⅰ 初回授業 体験アプリ #3 — App 3 of 6</footer>
    </div>
  );
}
