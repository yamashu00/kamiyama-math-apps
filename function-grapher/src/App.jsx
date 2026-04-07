import { useState, useEffect } from 'react';
import { FunctionGraph } from './components/FunctionGraph';
import { StepGuide, STEPS } from './components/StepGuide';

const HUB_URL = 'https://kamiyama-math-apps-da8y.vercel.app/';

const REAL_WORLD = [
  { icon: '🚗', title: 'カーナビ・自動運転', body: '速度（一次）、加速度（二次）、位置の予測まですべて関数でモデル化。自動ブレーキは「このまま進むと衝突するか？」を関数で計算する。', math: '一次・二次関数' },
  { icon: '💡', title: '電力・電気回路', body: '電流・電圧・電力の関係 P = V²/R は冪関数。LEDの明るさ調整も関数で制御される。', math: '冪関数 y = ax²' },
  { icon: '🎮', title: 'ゲームの物理エンジン', body: 'キャラクターの放物線ジャンプは y = -x² + bx + c。重力加速度を二次関数でシミュレーション。', math: '二次関数' },
  { icon: '📈', title: 'SNSの拡散・感染症モデル', body: '最初は急成長（指数関数的）→ 頭打ち（S字カーブ）。COVID-19の感染者数予測にも関数モデルが使われた。', math: '指数関数・ロジスティック関数' },
];

const CAREERS = [
  { icon: '🤖', title: '機械学習エンジニア', body: '「損失関数（誤差）を最小化する」のがAI学習の本質。二次関数の最小値を求める操作がまさにこれ。ChatGPTも関数の最適化で動いている。', field: 'AI・機械学習・ソフトウェア' },
  { icon: '🔭', title: '物理学者 / 物理エンジニア', body: '運動・電磁気・熱など自然現象はすべて関数で記述される。実験データを関数でフィッティングして法則を発見する仕事。', field: '研究・宇宙・素粒子' },
  { icon: '📊', title: '経済学者 / エコノミスト', body: '需要・供給・効用はすべて関数でモデル化される。「価格が上がると需要はどう変わるか」を関数の傾き（微分）で分析。', field: '経済・シンクタンク・政策' },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-header-top">
            <a href={HUB_URL} className="btn-back">← 一覧に戻る</a>
            <span className="app-time-badge">⏱ 約5〜7分</span>
            <span className="app-time-badge">App 3 / 6</span>
            <button className="btn-theme" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
          <h1 className="app-title">📐 関数グラフ <span className="app-title-badge">基礎数学Ⅰ</span></h1>
          <p className="app-subtitle">関数 — 変化の形を式で読み書きする</p>
        </div>
      </header>
      <main className="app-main">
        <StepGuide currentStep={step} onNext={() => setStep(s => Math.min(s+1, STEPS.length-1))} onPrev={() => setStep(s => Math.max(s-1, 0))} />
        <FunctionGraph />
        {step === STEPS.length - 1 && (
          <>
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
            <div className="summary-section">
              <div className="summary-section-title">🎯 この数学から広がる仕事</div>
              <div className="summary-grid">
                {CAREERS.map(item => (
                  <div className="summary-card" key={item.title}>
                    <div className="summary-card-icon">{item.icon}</div>
                    <div><div className="summary-card-title">{item.title}</div><div className="summary-card-body">{item.body}</div><div className="summary-card-math">{item.field}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
      <footer className="app-footer">神山まるごと高専 — 基礎数学Ⅰ 初回授業 体験アプリ #3 — App 3 of 6</footer>
    </div>
  );
}
