import { useState } from 'react';
import { SeatShuffle } from './components/SeatShuffle';
import { StepGuide, STEPS } from './components/StepGuide';

const REAL_WORLD = [
  { icon: '🎰', title: 'パチンコ・宝くじの仕組み', body: '1等が当たる確率は1/数百万。確率の計算で「期待値」を求めると、参加者は平均的に損することがわかる。', math: '期待値 = 確率 × 賞金' },
  { icon: '🧬', title: 'DNA検査・裁判の証拠', body: 'DNA鑑定の一致確率は1/数億。「一致した」だけで有罪とは言えない理由も確率で説明できる。', math: '条件付き確率（ベイズ定理）' },
  { icon: '🤖', title: 'AI・機械学習', body: '「このメールはスパムである確率は98%」のような判定も、確率論（ベイズ分類）が基礎。', math: 'ナイーブベイズ分類' },
  { icon: '📊', title: '統計・世論調査', body: '1000人にアンケートを取ると日本全体の傾向がわかる。なぜ？「標本抽出」と「確率分布」の理論。', math: '標本分布・中心極限定理' },
];

export default function App() {
  const [step, setStep] = useState(0);
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <h1 className="app-title">🪑 席替えの確率 <span className="app-title-badge">基礎数学Ⅰ</span></h1>
          <p className="app-subtitle">確率・組み合わせ — 「公平な席替え」を数学で考える</p>
        </div>
      </header>
      <main className="app-main">
        <StepGuide currentStep={step} onNext={() => setStep(s => Math.min(s+1, STEPS.length-1))} onPrev={() => setStep(s => Math.max(s-1, 0))} />
        <SeatShuffle />
        {step === STEPS.length - 1 && (
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
        )}
      </main>
      <footer className="app-footer">神山まるごと高専 — 基礎数学Ⅰ 初回授業 体験アプリ #2 — App 2 of 6</footer>
    </div>
  );
}
