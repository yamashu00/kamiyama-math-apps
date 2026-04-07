import { useState } from 'react';

const APPS = [
  {
    num: '01', emoji: '💰', title: '投資の数学',
    theme: '毎月1,000円を積み立てると、10年後いくら？',
    tags: ['数列', '複利', '等比数列'],
    url: 'https://kamiyama-math-apps-yw3k.vercel.app/',
    color: '#5e6ad2', gradient: 'linear-gradient(135deg, #5e6ad2, #7c4ddc)',
    teacherNote: {
      point: '「等比数列の和」= 複利計算。年利5%・30年で元本の約4.3倍になることを体感させる。',
      steps: ['利率0% → 直線（足し算だけ）と確認', '利率を上げると曲線になることを観察', '「なぜ曲線？」→ 毎年の利息が増えていくから = 等比数列の核心'],
      question: '「10年と20年でなぜこんなに差が開くのか？」が核心の問い。',
      math: '複利の式：S = m((1+r)ⁿ-1)/r　→ 高校数列「等比数列の和」',
    },
  },
  {
    num: '02', emoji: '🪑', title: '席替えの確率',
    theme: '好きな人の隣になる確率は何%？',
    tags: ['確率', '組み合わせ', '順列'],
    url: 'https://kamiyama-math-apps-yk38.vercel.app/',
    color: '#a855f7', gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
    teacherNote: {
      point: '「44! ≈ 2.66×10⁵⁴ 通り」という天文学的数と、日常的な確率計算の橋渡し。',
      steps: ['全パターン数の大きさに驚かせる', '「窓側の席」から P = (条件数)/(全体数) の基本式へ', '×100連続ボタンで「大数の法則」を実感させる'],
      question: '「なぜ10回では理論値通りにならないのか？」→ 大数の法則の導入に最適。',
      math: '確率の基本式：P = n(A)/n(U)　→ 高校「場合の数と確率」',
    },
  },
  {
    num: '03', emoji: '📐', title: '関数グラフ',
    theme: 'スライダーでグラフの形を動かして変化を感じよう',
    tags: ['一次関数', '二次関数', '冪関数'],
    url: 'https://kamiyama-math-apps-bn5d.vercel.app/',
    color: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #059669)',
    teacherNote: {
      point: 'パラメータを「動かす」体験が重要。式とグラフの双方向の読み書きを体感させる。',
      steps: ['一次関数：a の正負で傾きの方向が変わることを確認', '二次関数：a の正負で「笑顔/悲しみ型」が変わる', '「ボールの軌跡 = 二次関数」の写真と見比べる'],
      question: '「a = 0 にすると何が起きる？なぜ？」→ 係数の意味を深掘りできる。',
      math: 'y = ax + b、y = ax² + bx + c　→ 基礎数学Ⅰ前期の核心',
    },
  },
  {
    num: '04', emoji: '🎵', title: '音波ビジュアライザー',
    theme: 'あなたの声は sin と cos でできている',
    tags: ['三角関数', 'フーリエ解析', '波'],
    url: 'https://kamiyama-math-apps.vercel.app/',
    color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    teacherNote: {
      point: 'マイク入力が強力な「つかみ」になる。自分の声が波形として見える体験は記憶に残る。',
      steps: ['マイクをオンにして「あー」と声を出させる', '2倍音スライダーで音色が変わる体験', 'スマホ/Wi-Fi/MRI への接続で「これが数学の射程だ」と示す'],
      question: '「ピアノとギターが同じ音でも音色が違う理由」= 倍音の構成。音楽と数学がつながる瞬間。',
      math: 'y = sin(x)、倍音の重ね合わせ　→ 後期「三角関数」への伏線',
    },
  },
  {
    num: '05', emoji: '∫', title: '面積パズル',
    theme: '長方形を増やすと曲線の面積が求まる — これが積分',
    tags: ['積分', '極限', '微積分'],
    url: 'https://kamiyama-math-apps-iiqk.vercel.app/',
    color: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
    teacherNote: {
      point: '「長方形を無限に細かくする」という操作が積分の定義そのもの。小学生の面積と積分をつなぐ。',
      steps: ['4本 → 誤差が大きいことを確認', '200本 → 誤差がほぼゼロになることを確認', '「∞本にした極限 = 積分」という概念の導入'],
      question: '「小学生の面積と積分の違いは何か？」→ 曲線か直線かの違いだけ、という気づきが重要。',
      math: '∫₀¹ f(x)dx = limΣf(xᵢ)Δx　→ 微積分の先取り体験',
    },
  },
  {
    num: '06', emoji: '📍', title: '図形と距離',
    theme: 'GPS からゲームまで支える2500年前の定理',
    tags: ['三平方の定理', '座標', 'ベクトル'],
    url: 'https://kamiyama-math-apps-pdc8.vercel.app/',
    color: '#14b8a6', gradient: 'linear-gradient(135deg, #14b8a6, #0891b2)',
    teacherNote: {
      point: '中学で習った三平方の定理が、座標を使うと「あらゆる2点間の距離」になる。GPSへの接続が強い。',
      steps: ['(3,0)と(0,4)で c=5 を確認（3-4-5の三角形）', '色々な点でも同じ式で求まることを確認', '「Google マップも同じ計算」という事実で締める'],
      question: '「なぜ直角三角形を使うのか？→ 斜めの距離を測れる量に変換する」が核心。',
      math: 'c=√(a²+b²)　→ 座標平面 → ベクトルへの接続',
    },
  },
];

const HOW_STEPS = [
  'チームで1つのアプリを開く（QRコードまたはURLをタップ）',
  '画面上部「STEP 1 / 6」から順番に読み進める',
  '「やること」を実際に操作して「観察ポイント」を確認',
  '「❓ 問い」についてチームで話し合う（正解は不要！）',
  'STEP 6 まで終わったら次のアプリへ移動',
];

function QrModal({ app, onClose }) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(app.url)}&bgcolor=0f1011&color=f7f8f8&qzone=1`;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: '#0f1011',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: '28px 32px',
        maxWidth: 320, width: '100%',
        textAlign: 'center',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>{app.emoji}</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#f7f8f8', marginBottom: 4 }}>{app.title}</div>
        <div style={{ fontSize: 11, color: '#62666d', marginBottom: 20 }}>スマホで読み取ってアプリを開く</div>
        <div style={{
          background: '#191a1b',
          border: `2px solid ${app.color}44`,
          borderRadius: 12,
          padding: 16,
          display: 'inline-block',
          marginBottom: 16,
        }}>
          <img src={qrUrl} alt={`QR: ${app.title}`} width={160} height={160} style={{ display: 'block', borderRadius: 4 }} />
        </div>
        <div style={{ fontSize: 11, color: '#62666d', wordBreak: 'break-all', marginBottom: 20 }}>{app.url}</div>
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 6, padding: '8px 20px',
          color: '#8a8f98', fontSize: 13, cursor: 'pointer',
          fontFamily: 'inherit',
        }}>閉じる</button>
      </div>
    </div>
  );
}

function TeacherPanel() {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const app = APPS[activeIdx];

  return (
    <div style={{ marginTop: 32 }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10, padding: '12px 20px',
        color: '#8a8f98', fontSize: 13, fontWeight: 500,
        cursor: 'pointer', fontFamily: 'inherit', width: '100%',
      }}>
        <span>📚</span>
        <span>教員向け解説メモ</span>
        <span style={{ marginLeft: 'auto', fontSize: 11 }}>{open ? '▲ 閉じる' : '▼ 開く'}</span>
      </button>

      {open && (
        <div style={{
          marginTop: 12,
          background: '#0f1011',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14,
          overflow: 'hidden',
        }}>
          {/* Tab selector */}
          <div style={{
            display: 'flex', overflowX: 'auto',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '8px 12px', gap: 6,
          }}>
            {APPS.map((a, i) => (
              <button key={a.num} onClick={() => setActiveIdx(i)} style={{
                flexShrink: 0,
                background: activeIdx === i ? `${a.color}22` : 'transparent',
                border: `1px solid ${activeIdx === i ? a.color + '55' : 'transparent'}`,
                borderRadius: 8, padding: '6px 12px',
                color: activeIdx === i ? a.color : '#62666d',
                fontSize: 12, fontWeight: 500, cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 150ms',
              }}>
                {a.emoji} {a.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Point */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#62666d', marginBottom: 8 }}>授業のポイント</div>
              <div style={{ fontSize: 13, color: '#d0d6e0', lineHeight: 1.7, padding: '12px 16px', background: `${app.color}0f`, border: `1px solid ${app.color}25`, borderRadius: 8 }}>
                {app.teacherNote.point}
              </div>
            </div>

            {/* Steps */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#62666d', marginBottom: 8 }}>推奨ファシリテーション手順</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {app.teacherNote.steps.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                    <span style={{
                      flexShrink: 0, width: 20, height: 20, borderRadius: '50%',
                      background: `${app.color}22`, border: `1px solid ${app.color}44`,
                      color: app.color, fontSize: 11, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{i + 1}</span>
                    <span style={{ fontSize: 13, color: '#8a8f98', lineHeight: 1.6 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Question */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#62666d', marginBottom: 8 }}>核心の問い（意図）</div>
              <div style={{ fontSize: 13, color: '#d0d6e0', lineHeight: 1.7, padding: '12px 16px', background: 'rgba(94,106,210,0.06)', border: '1px solid rgba(94,106,210,0.15)', borderRadius: 8 }}>
                {app.teacherNote.question}
              </div>
            </div>

            {/* Math connection */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#62666d', marginBottom: 8 }}>数学との接続</div>
              <div style={{ fontSize: 13, color: app.color, fontFamily: 'Georgia, serif', padding: '10px 14px', background: `${app.color}0c`, border: `1px solid ${app.color}22`, borderRadius: 8 }}>
                {app.teacherNote.math}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [qrApp, setQrApp] = useState(null);

  return (
    <div className="page">
      {qrApp && <QrModal app={qrApp} onClose={() => setQrApp(null)} />}

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
        <div className="section-label">6つのアプリ — タップして開く / QRコードで読み取る</div>
        <div className="cards-grid">
          {APPS.map(app => (
            <div key={app.num} className="app-card">
              <div className="card-bar" style={{ background: app.gradient }} />
              <a href={app.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card-visual" style={{ background: `${app.color}12` }}>
                  <span style={{ fontSize: app.num === '05' ? 44 : 52 }}>{app.emoji}</span>
                </div>
                <div className="card-body">
                  <div className="card-num">App {app.num}</div>
                  <div className="card-title">{app.title}</div>
                  <div className="card-theme">{app.theme}</div>
                  <div className="card-tags">
                    {app.tags.map(t => (
                      <span key={t} className="card-tag" style={{ color: app.color, background: `${app.color}18`, borderColor: `${app.color}30` }}>{t}</span>
                    ))}
                  </div>
                  <div className="card-cta">
                    <span className="card-cta-text" style={{ color: app.color }}>アプリを開く</span>
                    <span className="card-cta-arrow" style={{ color: app.color }}>→</span>
                  </div>
                </div>
              </a>
              {/* QR button */}
              <button className="qr-btn" onClick={() => setQrApp(app)} style={{ borderColor: `${app.color}33` }}>
                <span>📷</span> QR
              </button>
            </div>
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
                  <div className="how-step-text">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Teacher panel */}
        <TeacherPanel />
      </main>

      <footer className="footer">
        神山まるごと高専 — 基礎数学Ⅰ 2026 —{' '}
        <a href="https://github.com/yamashu00/kamiyama-math-apps" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-subtle)', textDecoration: 'none' }}>GitHub</a>
      </footer>
    </div>
  );
}
