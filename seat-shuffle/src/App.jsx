import { useState, useEffect } from 'react';
import { SeatShuffle } from './components/SeatShuffle';
import { StepGuide, STEPS } from './components/StepGuide';

const HUB_URL = 'https://kamiyama-math-apps-da8y.vercel.app/';

const REAL_WORLD = [
  { icon: '🎰', title: 'パチンコ・宝くじの仕組み', body: '1等が当たる確率は1/数百万。確率の計算で「期待値」を求めると、参加者は平均的に損することがわかる。', math: '期待値 = 確率 × 賞金' },
  { icon: '🧬', title: 'DNA検査・裁判の証拠', body: 'DNA鑑定の一致確率は1/数億。「一致した」だけで有罪とは言えない理由も確率で説明できる。', math: '条件付き確率（ベイズ定理）' },
  { icon: '🤖', title: 'AI・機械学習', body: '「このメールはスパムである確率は98%」のような判定も、確率論（ベイズ分類）が基礎。', math: 'ナイーブベイズ分類' },
  { icon: '📊', title: '統計・世論調査', body: '1000人にアンケートを取ると日本全体の傾向がわかる。なぜ？「標本抽出」と「確率分布」の理論。', math: '標本分布・中心極限定理' },
];

const CAREERS = [
  { icon: '📐', title: 'アクチュアリー', body: '「この事故が起きる確率は？」を計算し保険料を設計する国家資格。確率論・統計学が主な道具で、金融・保険業界の最高峰職。', field: '保険・年金・リスク管理' },
  { icon: '🤖', title: 'AIエンジニア / データサイエンティスト', body: '機械学習の根底は確率論。スパム判定・レコメンドエンジン・画像認識もベイズ確率と組み合わせ論が基礎。', field: 'IT・AI・データ分析' },
  { icon: '🎮', title: 'ゲームデザイナー（確率設計）', body: 'ガチャの排出率・ドロップ確率・マップ生成アルゴリズムを設計。「公平感」と「中毒性」のバランスを数学で調整する。', field: 'ゲーム・エンタメ' },
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
            <span className="app-time-badge">App 2 / 6</span>
            <button className="btn-theme" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
          <h1 className="app-title">🪑 席替えの確率 <span className="app-title-badge">基礎数学Ⅰ</span></h1>
          <p className="app-subtitle">確率・組み合わせ — 「公平な席替え」を数学で考える</p>
        </div>
      </header>
      <main className="app-main">
        <StepGuide currentStep={step} onNext={() => setStep(s => Math.min(s+1, STEPS.length-1))} onPrev={() => setStep(s => Math.max(s-1, 0))} />
        <SeatShuffle />
        {step === STEPS.length - 1 && (
          <>
            <div className="summary-section">
              <div className="summary-section-title">🌐 確率・組み合わせが使われている場所</div>
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
      <footer className="app-footer">神山まるごと高専 — 基礎数学Ⅰ 初回授業 体験アプリ #2 — App 2 of 6</footer>
    </div>
  );
}
