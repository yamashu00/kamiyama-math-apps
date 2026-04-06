const APPS = [
  {
    num: '01',
    emoji: '💰',
    title: '投資の数学',
    theme: '毎月1,000円を積み立てると、10年後いくら？',
    tags: ['数列', '複利', '等比数列'],
    url: 'https://kamiyama-math-apps-yw3k.vercel.app/',
    color: '#5e6ad2',
    gradient: 'linear-gradient(135deg, #5e6ad2, #7c4ddc)',
  },
  {
    num: '02',
    emoji: '🪑',
    title: '席替えの確率',
    theme: '好きな人の隣になる確率は何%？',
    tags: ['確率', '組み合わせ', '順列'],
    url: 'https://kamiyama-math-apps-yk38.vercel.app/',
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
  },
  {
    num: '03',
    emoji: '📐',
    title: '関数グラフ',
    theme: 'スライダーでグラフの形を動かして変化を感じよう',
    tags: ['一次関数', '二次関数', '冪関数'],
    url: 'https://kamiyama-math-apps-bn5d.vercel.app/',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    num: '04',
    emoji: '🎵',
    title: '音波ビジュアライザー',
    theme: 'あなたの声は sin と cos でできている',
    tags: ['三角関数', 'フーリエ解析', '波'],
    url: 'https://kamiyama-math-apps.vercel.app/',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
  {
    num: '05',
    emoji: '∫',
    title: '面積パズル',
    theme: '長方形を増やすと曲線の面積が求まる — これが積分',
    tags: ['積分', '極限', '微積分'],
    url: 'https://kamiyama-math-apps-iiqk.vercel.app/',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
  },
  {
    num: '06',
    emoji: '📍',
    title: '図形と距離',
    theme: 'GPS からゲームまで支える2500年前の定理',
    tags: ['三平方の定理', '座標', 'ベクトル'],
    url: 'https://kamiyama-math-apps-pdc8.vercel.app/',
    color: '#14b8a6',
    gradient: 'linear-gradient(135deg, #14b8a6, #0891b2)',
  },
];

const HOW_STEPS = [
  { text: 'チームで1つのアプリを開く（QRコードまたはURLを入力）' },
  { text: '画面上部の「STEP 1 / 6」から順番に読み進める' },
  { text: '「やること」を実際に操作して、「観察ポイント」を確認する' },
  { text: '「❓ 問い」についてチームで話し合う（正解は不要！）' },
  { text: 'STEP 6 まで終わったら次のアプリへ移動する' },
];

export default function App() {
  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">🎓 神山まるごと高専 — 基礎数学Ⅰ 初回授業</div>
        <h1 className="hero-title">
          数学の<span>眼鏡</span>で<br />世界を見てみよう
        </h1>
        <p className="hero-sub">
          投資・席替え・音・グラフ・面積・地図…<br />
          身のまわりのあらゆる場所に数学は潜んでいる。<br />
          6つのアプリで、その扉を開けよう。
        </p>
        <div className="hero-steps">
          {['3〜4名チームで体験', '1アプリ約5〜7分', '全6ステーション'].map(t => (
            <span key={t} className="hero-step-pill">{t}</span>
          ))}
        </div>
      </section>

      {/* Cards */}
      <main className="main">
        <div className="section-label">6つのアプリ — クリックして開く</div>
        <div className="cards-grid">
          {APPS.map(app => (
            <a key={app.num} className="app-card" href={app.url} target="_blank" rel="noopener noreferrer">
              {/* Color bar */}
              <div className="card-bar" style={{ background: app.gradient }} />

              {/* Visual area */}
              <div className="card-visual" style={{ background: `${app.color}12` }}>
                <span style={{ fontSize: app.num === '05' ? 44 : 52 }}>{app.emoji}</span>
              </div>

              {/* Body */}
              <div className="card-body">
                <div className="card-num">App {app.num}</div>
                <div className="card-title">{app.title}</div>
                <div className="card-theme">{app.theme}</div>
                <div className="card-tags">
                  {app.tags.map(t => <span key={t} className="card-tag" style={{ color: app.color, background: `${app.color}18`, borderColor: `${app.color}30` }}>{t}</span>)}
                </div>
                <div className="card-cta">
                  <span className="card-cta-text" style={{ color: app.color }}>アプリを開く</span>
                  <span className="card-cta-arrow" style={{ color: app.color }}>→</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* How to use */}
        <div className="how-banner">
          <div className="how-icon">📋</div>
          <div>
            <div className="how-title">使い方</div>
            <div className="how-steps">
              {HOW_STEPS.map((s, i) => (
                <div key={i} className="how-step">
                  <div className="how-step-num">{i + 1}</div>
                  <div className="how-step-text">{s.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        神山まるごと高専 — 基礎数学Ⅰ 2026 — <a href="https://github.com/yamashu00/kamiyama-math-apps" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-subtle)', textDecoration: 'none' }}>GitHub</a>
      </footer>
    </div>
  );
}
