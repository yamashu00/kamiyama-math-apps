import { useState, useEffect } from 'react';

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

const CASES = [
  {
    id: 1, emoji: '📈', company: 'Renaissance Technologies',
    country: '🇺🇸 アメリカ', category: '金融',
    math: '確率論・統計学・時系列解析',
    tagline: '数学者が作った「最強のヘッジファンド」',
    story: '数学者・暗号解読者のJim Simonsは、1982年に金融の知識ゼロから投資会社を設立。「市場のパターンは数式で予測できる」という仮説を立て、物理学者・数学者のみをチームに集めた。彼らが開発したアルゴリズムは32年間で年平均62%のリターンを達成。これはバフェットの約3倍。',
    impact: '運用資産$600億超。Simons個人資産は$3兆円超（2024年）。',
    color: '#5e6ad2',
    appLink: { num: '01', title: '投資の数学', url: 'https://kamiyama-math-apps-yw3k.vercel.app/' },
  },
  {
    id: 2, emoji: '🤖', company: 'Arithmer（アリスマー）',
    country: '🇯🇵 日本・東大発', category: 'AI',
    math: '偏微分方程式・トポロジー・AI数理',
    tagline: '「数学でビジネスになるの？」への真っ向勝負',
    story: '東大数理科学研究科出身の大田佳宏氏が2015年に創業。「最先端の数学を産業に応用する」をミッションに、浸水予測AI・工場火災の予兆保全AI・自動採寸AIを開発。「100の計算を3ステップに圧縮する」という数学的発想がスマホでのリアルタイム処理を可能にした。日本初の「数学ベンチャー」として注目。',
    impact: '20種類以上のAIソリューションを提供。日本クリエイション大賞2020受賞。',
    color: '#10b981',
    appLink: null,
  },
  {
    id: 3, emoji: '🔍', company: 'Palantir Technologies',
    country: '🇺🇸 アメリカ', category: 'データ分析',
    math: '線形代数・グラフ理論・統計的推論',
    tagline: '「見えないデータをつなぐ」で時価総額$200B超',
    story: '2003年にPeter Thielらが創業。複数のデータソースを統合・分析するプラットフォームを開発。テロ対策・感染症追跡・軍事作戦など「バラバラなデータを数学的に統合すると何が見えるか」を事業にした。名前は指輪物語の「すべてを見通す球体」に由来。',
    impact: '時価総額$200B超（2025年）。米政府・軍・大企業が顧客。',
    color: '#f59e0b',
    appLink: null,
  },
  {
    id: 4, emoji: '🎵', company: 'Spotify',
    country: '🇸🇪 スウェーデン', category: '音楽',
    math: 'フーリエ解析・機械学習・協調フィルタリング',
    tagline: '音楽の「波形」を数学で分解してレコメンド',
    story: '2006年創業。楽曲のレコメンドには2種類の数学が使われる。①フーリエ解析：音の波形を周波数に分解して「この曲は明るい/暗い、速い/遅い」を数値化。②行列分解：「この人が好きな曲を好きな人は何を聴いているか」をビッグデータから計算。授業で体験したsin波が音楽ビジネスの核心にある。',
    impact: 'ユーザー6億人超、有料会員2.5億人。時価総額$1,000億超。',
    color: '#a855f7',
    appLink: { num: '04', title: '音波ビジュアライザー', url: 'https://kamiyama-math-apps.vercel.app/' },
  },
  {
    id: 5, emoji: '🎬', company: 'Netflix',
    country: '🇺🇸 アメリカ', category: '動画',
    math: '行列分解（SVD）・確率モデル・機械学習',
    tagline: '$100万の懸賞金をかけた「数学コンテスト」が起源',
    story: '2006年、Netflixは「レコメンド精度を10%改善したチームに$100万（約1.5億円）を払う」という懸賞を世界に発表。3年間・10万チームが参戦した数学コンテストの末、行列分解（SVD）を組み合わせたアルゴリズムが優勝。「あなたへのおすすめ」はこの数学で動いている。',
    impact: '会員2.7億人。レコメンドで年間$10億のコスト削減と推定。',
    color: '#ec4899',
    appLink: { num: '05', title: '面積パズル', url: 'https://kamiyama-math-apps-iiqk.vercel.app/' },
  },
  {
    id: 6, emoji: '🔍', company: 'Google（広告オークション）',
    country: '🇺🇸 アメリカ', category: '広告',
    math: 'ゲーム理論・オークション理論・最適化',
    tagline: 'ゲーム理論で年間$2,000億の広告収益を設計',
    story: '検索結果の広告枠は「入札」で決まる。ただし最高額を入札した広告主が必ずしも最高額を払うわけではない。Googleは「2位の価格+1円」を払う「ビックリー・オークション」をベースに独自設計。これはノーベル経済学賞受賞のゲーム理論が基礎。「公平に見えながら収益を最大化する」数学的設計がGoogleの基盤。',
    impact: 'Google広告収益は年間$2,380億（2023年）。売上の約77%。',
    color: '#f59e0b',
    appLink: { num: '02', title: '席替えの確率', url: 'https://kamiyama-math-apps-yk38.vercel.app/' },
  },
  {
    id: 7, emoji: '🔐', company: 'RSA Security',
    country: '🇺🇸 アメリカ', category: '暗号',
    math: '素因数分解・数論・剰余算術',
    tagline: '「解けない数学の問題」をそのままビジネスにした',
    story: '1977年、MITの数学者3人（Rivest・Shamir・Adleman）が「巨大な数の素因数分解は現代のコンピュータでは解けない」という数学的事実を暗号に応用。2つの素数を掛けるのは簡単だが、その積から元の数を求めるのは事実上不可能——この非対称性がインターネットセキュリティの基礎になった。現在もHTTPS・銀行取引・パスポートICチップに使われている。',
    impact: 'RSA暗号はインターネット全取引の基盤。世界の電子商取引$6兆を守る。',
    color: '#14b8a6',
    appLink: null,
  },
  {
    id: 8, emoji: '🚚', company: 'UPS（ユナイテッド・パーセル・サービス）',
    country: '🇺🇸 アメリカ', category: '物流',
    math: 'グラフ理論・巡回セールスマン問題・最適化',
    tagline: '「左折禁止ルール」で年$4億節約した数学',
    story: 'UPSは2004年から「ORIONプロジェクト」を開始。1日5,000万件の配達ルートを数学的に最適化するシステムを開発した。発見の一つは「なるべく右折だけで走れ」。左折は対向車を待つ時間が発生し非効率。グラフ理論と最適化で全ルートを再設計した結果、燃料・時間・CO₂を劇的に削減。10年で$4億以上節約。',
    impact: '年間燃料削減1億リットル超、CO₂排出削減10万トン超。',
    color: '#10b981',
    appLink: { num: '06', title: '図形と距離', url: 'https://kamiyama-math-apps-pdc8.vercel.app/' },
  },
  {
    id: 9, emoji: '🦾', company: 'Preferred Networks（PFN）',
    country: '🇯🇵 日本', category: 'ロボット',
    math: 'トポロジー・深層学習・強化学習・微分幾何学',
    tagline: '東大数学科発・日本最強のAIスタートアップ',
    story: '2014年、東大数学科・情報系出身の西川徹氏らが創業。ロボットの動作制御・工場自動化・自動運転に特化した深層学習を開発。トヨタ・ファナックなど日本の製造業大手と提携し、工場ロボットがリアルタイムで学習・最適化するシステムを実現。「数学の抽象性が一番役に立つのは、誰も解いたことがない問題を解くとき」と創業者は語る。',
    impact: '企業価値2,350億円超（2019年時点）。日本最大のAIスタートアップの一つ。',
    color: '#a855f7',
    appLink: null,
  },
];

const CASE_CATEGORIES = ['すべて', '金融', 'AI', 'データ分析', '音楽', '動画', '広告', '暗号', '物流', 'ロボット'];

function CaseModal({ c, onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, overflowY: 'auto',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--panel)',
        border: `1px solid ${c.color}44`,
        borderRadius: 18,
        padding: '28px 32px',
        maxWidth: 560, width: '100%',
        position: 'relative',
      }} onClick={e => e.stopPropagation()}>
        {/* top bar */}
        <div style={{ height: 3, background: c.color, borderRadius: '18px 18px 0 0', position: 'absolute', top: 0, left: 0, right: 0 }} />

        {/* header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
          <div style={{ fontSize: 40, lineHeight: 1 }}>{c.emoji}</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.7px', textTransform: 'uppercase', color: c.color, marginBottom: 4 }}>{c.country} · {c.category}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.3px', lineHeight: 1.2 }}>{c.company}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{c.tagline}</div>
          </div>
        </div>

        {/* math badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${c.color}18`, border: `1px solid ${c.color}33`, borderRadius: 9999, padding: '4px 12px', marginBottom: 16 }}>
          <span style={{ fontSize: 11 }}>🧮</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: c.color }}>{c.math}</span>
        </div>

        {/* story */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 8 }}>ストーリー</div>
          <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.8 }}>{c.story}</div>
        </div>

        {/* impact */}
        <div style={{ background: `${c.color}10`, border: `1px solid ${c.color}25`, borderRadius: 10, padding: '12px 16px', marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 4 }}>インパクト</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: c.color }}>{c.impact}</div>
        </div>

        {/* app link */}
        {c.appLink && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 8 }}>この授業で体験できる数学</div>
            <a href={c.appLink.url} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(94,106,210,0.1)', border: '1px solid rgba(94,106,210,0.25)',
              borderRadius: 8, padding: '8px 14px', textDecoration: 'none',
              color: '#828fff', fontSize: 13, fontWeight: 500,
            }}>
              → App {c.appLink.num}: {c.appLink.title}で体験する
            </a>
          </div>
        )}

        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 6, padding: '8px 20px', color: 'var(--text-muted)',
          fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
        }}>閉じる</button>
      </div>
    </div>
  );
}

function CasesSection() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeCategory, setActiveCategory] = useState('すべて');

  const filtered = activeCategory === 'すべて' ? CASES : CASES.filter(c => c.category === activeCategory);

  return (
    <div className="cases-section">
      {selectedCase && <CaseModal c={selectedCase} onClose={() => setSelectedCase(null)} />}

      <div className="section-label" style={{ marginBottom: 16 }}>
        💡 数学で起業した人たち — カードをクリックしてストーリーを読む
      </div>

      {/* Category tabs */}
      <div className="cases-tabs">
        {CASE_CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`cases-tab${activeCategory === cat ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="cases-grid">
        {filtered.map(c => (
          <div key={c.id} className="case-card" onClick={() => setSelectedCase(c)}>
            <div className="case-card-bar" style={{ background: c.color }} />
            <div className="case-card-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 32 }}>{c.emoji}</span>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.6px', textTransform: 'uppercase', color: c.color, marginBottom: 2 }}>{c.country} · {c.category}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.2px', lineHeight: 1.2 }}>{c.company}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 12 }}>{c.tagline}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: `${c.color}18`, border: `1px solid ${c.color}30`, borderRadius: 9999, padding: '3px 10px' }}>
                <span style={{ fontSize: 10 }}>🧮</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: c.color }}>{c.math}</span>
              </div>
              <div style={{ marginTop: 12, fontSize: 11, color: 'var(--text-subtle)', fontWeight: 500 }}>タップして詳細を読む →</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
        <span>学びのポイント</span>
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

          <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#62666d', marginBottom: 8 }}>授業のポイント</div>
              <div style={{ fontSize: 13, color: '#d0d6e0', lineHeight: 1.7, padding: '12px 16px', background: `${app.color}0f`, border: `1px solid ${app.color}25`, borderRadius: 8 }}>
                {app.teacherNote.point}
              </div>
            </div>
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
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#62666d', marginBottom: 8 }}>核心の問い（意図）</div>
              <div style={{ fontSize: 13, color: '#d0d6e0', lineHeight: 1.7, padding: '12px 16px', background: 'rgba(94,106,210,0.06)', border: '1px solid rgba(94,106,210,0.15)', borderRadius: 8 }}>
                {app.teacherNote.question}
              </div>
            </div>
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
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="page">
      {qrApp && <QrModal app={qrApp} onClose={() => setQrApp(null)} />}

      {/* Theme toggle */}
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 50 }}>
        <button className="btn-theme" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

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
              <a href={app.url} style={{ textDecoration: 'none', color: 'inherit' }}>
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

        {/* Cases section */}
        <CasesSection />

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
