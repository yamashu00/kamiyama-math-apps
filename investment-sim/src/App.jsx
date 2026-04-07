import { useState, useEffect } from 'react';
import { InvestmentChart } from './components/InvestmentChart';
import { StepGuide, STEPS } from './components/StepGuide';

const HUB_URL = 'https://kamiyama-math-apps-da8y.vercel.app/';

const REAL_WORLD = [
  { icon: '🏦', title: '銀行預金・NISA', body: '複利で運用される。20年・30年でつみたてNISA（年利5%想定）の効果を体感できる。', math: '等比数列の和' },
  { icon: '🏠', title: '住宅ローン', body: '同じ複利の仕組みが「借金側」に働く。金利が低くても30年で大きな差になる。', math: '等比数列' },
  { icon: '💹', title: '株式・インデックス投資', body: '歴史的に世界の株価は年平均5〜7%で成長。この複利効果を「長期」で享受する戦略。', math: '指数関数的成長' },
  { icon: '🌍', title: '人口・経済成長', body: '国の経済成長率や人口増加も複利（等比数列）でモデル化される。GDPが「3%成長」の意味。', math: '等比数列' },
];

const CAREERS = [
  { icon: '📐', title: 'アクチュアリー', body: '保険料・年金・リスクを数式で計算する国家資格。「この人が〇歳まで生きる確率」×「支払額」を積分して保険料を設計する。', field: '保険・年金・金融' },
  { icon: '📈', title: 'クォンツ（金融工学者）', body: '株・債券・デリバティブの価格を数理モデルで算出。等比数列の一般化「確率微分方程式」を日常的に扱う。', field: '証券・ヘッジファンド' },
  { icon: '🏦', title: 'ファイナンシャルプランナー', body: '老後・教育・住宅の資産計画を設計。複利計算で「いつ・いくら積み立てるか」を顧客に提案。', field: '資産管理・FP・銀行' },
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
            <span className="app-time-badge">App 1 / 6</span>
            <button className="btn-theme" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
          <h1 className="app-title">💰 投資の数学 <span className="app-title-badge">基礎数学Ⅰ</span></h1>
          <p className="app-subtitle">複利と等比数列 — お金の増え方の仕組みを数学で見る</p>
        </div>
      </header>
      <main className="app-main">
        <StepGuide currentStep={step} onNext={() => setStep(s => Math.min(s+1, STEPS.length-1))} onPrev={() => setStep(s => Math.max(s-1, 0))} />
        <InvestmentChart />
        {step === STEPS.length - 1 && (
          <>
            <div className="summary-section">
              <div className="summary-section-title">🌐 等比数列・複利が使われている場所</div>
              <div className="summary-grid">
                {REAL_WORLD.map(item => (
                  <div className="summary-card" key={item.title}>
                    <div className="summary-card-icon">{item.icon}</div>
                    <div><div className="summary-card-title">{item.title}</div><div className="summary-card-body">{item.body}</div><div className="summary-card-math">{item.math}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="summary-section careers-section">
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
      <footer className="app-footer">神山まるごと高専 — 基礎数学Ⅰ 初回授業 体験アプリ #1 — App 1 of 6</footer>
    </div>
  );
}
