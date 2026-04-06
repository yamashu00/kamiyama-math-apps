import { useState } from 'react';
import { CoordinatePlane } from './components/CoordinatePlane';
import { StepGuide, STEPS } from './components/StepGuide';

const REAL_WORLD = [
  { icon: '🗺️', title: 'GPS・カーナビ', body: '緯度・経度の差を「a, b」として距離を計算。球面上では「球面三角法」が必要になる（cos/sin が登場）。', math: '三平方の定理 → 球面三角法' },
  { icon: '🎮', title: 'ゲームの当たり判定', body: '2キャラクターの距離を毎フレーム計算。距離 d < 当たり半径 r なら衝突。60fps = 毎秒この計算を60回。', math: 'ユークリッド距離 √(Δx²+Δy²)' },
  { icon: '🤖', title: 'ロボット工学・ドローン', body: '現在地と目的地の座標から距離・方向を計算して動く。障害物との距離も同じ公式で判定。', math: '2次元・3次元ユークリッド距離' },
  { icon: '🏗️', title: '建築・土木設計', body: 'ビルの高さ測定、橋の設計、傾斜の計算に三平方の定理が使われる。CADソフトの根幹。', math: '三平方の定理・ベクトル' },
];

export default function App() {
  const [step, setStep] = useState(0);
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <h1 className="app-title">📍 図形と距離 <span className="app-title-badge">基礎数学Ⅰ</span></h1>
          <p className="app-subtitle">三平方の定理 — GPS からゲームまで支える2500年前の数学</p>
        </div>
      </header>
      <main className="app-main">
        <StepGuide currentStep={step} onNext={() => setStep(s => Math.min(s+1, STEPS.length-1))} onPrev={() => setStep(s => Math.max(s-1, 0))} />
        <CoordinatePlane />
        {step === STEPS.length - 1 && (
          <div className="summary-section">
            <div className="summary-section-title">🌐 三平方の定理が使われている場所</div>
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
      <footer className="app-footer">神山まるごと高専 — 基礎数学Ⅰ 初回授業 体験アプリ #6 — App 6 of 6</footer>
    </div>
  );
}
