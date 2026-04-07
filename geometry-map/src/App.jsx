import { useState, useEffect } from 'react';
import { CoordinatePlane } from './components/CoordinatePlane';
import { StepGuide, STEPS } from './components/StepGuide';

const HUB_URL = 'https://kamiyama-math-apps-da8y.vercel.app/';

const REAL_WORLD = [
  { icon: '🗺️', title: 'GPS・カーナビ', body: '緯度・経度の差を「a, b」として距離を計算。球面上では「球面三角法」が必要になる（cos/sin が登場）。', math: '三平方の定理 → 球面三角法' },
  { icon: '🎮', title: 'ゲームの当たり判定', body: '2キャラクターの距離を毎フレーム計算。距離 d < 当たり半径 r なら衝突。60fps = 毎秒この計算を60回。', math: 'ユークリッド距離 √(Δx²+Δy²)' },
  { icon: '🤖', title: 'ロボット工学・ドローン', body: '現在地と目的地の座標から距離・方向を計算して動く。障害物との距離も同じ公式で判定。', math: '2次元・3次元ユークリッド距離' },
  { icon: '🏗️', title: '建築・土木設計', body: 'ビルの高さ測定、橋の設計、傾斜の計算に三平方の定理が使われる。CADソフトの根幹。', math: '三平方の定理・ベクトル' },
];

const CAREERS = [
  { icon: '🎮', title: 'ゲームエンジニア', body: '当たり判定・物理演算・経路探索・3Dレンダリングはすべて三平方の定理が基礎。毎秒数億回この計算を走らせるエンジンを設計する。', field: 'ゲーム・VR・メタバース' },
  { icon: '🛰️', title: 'GPSエンジニア / 測量士', body: '衛星から地上の距離を三平方の定理（球面版）で計算し位置を特定。自動運転・ドローン・地図システムの測位も同様。', field: '宇宙・測量・自動運転' },
  { icon: '🤖', title: 'ロボティクスエンジニア', body: '「現在地から目標地点までの距離と方向」を座標と三平方の定理で計算。障害物との距離判定も同じ式で処理する。', field: 'ロボット・AI・製造・物流' },
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
            <span className="app-time-badge">App 6 / 6</span>
            <button className="btn-theme" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
          <h1 className="app-title">📍 図形と距離 <span className="app-title-badge">基礎数学Ⅰ</span></h1>
          <p className="app-subtitle">三平方の定理 — GPS からゲームまで支える2500年前の数学</p>
        </div>
      </header>
      <main className="app-main">
        <StepGuide currentStep={step} onNext={() => setStep(s => Math.min(s+1, STEPS.length-1))} onPrev={() => setStep(s => Math.max(s-1, 0))} />
        <CoordinatePlane />
        {step === STEPS.length - 1 && (
          <>
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
      <footer className="app-footer">神山まるごと高専 — 基礎数学Ⅰ 初回授業 体験アプリ #6 — App 6 of 6</footer>
    </div>
  );
}
