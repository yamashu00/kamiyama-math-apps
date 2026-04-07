export const STEPS = [
  {
    id: 1, label: '全パターンを数える',
    title: '44人の席替え、何通りの並び方がある？',
    instruction: '右パネルの「全パターン数」を見て。これが44人が44席に並ぶ全通り数（44の階乗）。',
    observation: '44! ≈ 2.66 × 10⁵⁴。宇宙の原子の数（10⁸⁰）より小さいが、それでも天文学的な数。',
    question: '❓ 「44!（44の階乗）」って何？\n1×2×3×…×44 のこと。1秒に1通り調べると、全部調べるのに何年かかる？',
  },
  {
    id: 2, label: '窓側に座る確率',
    title: '特定の1人が窓側（1列目）に座る確率は？',
    instruction: '「条件A: 窓側の席」タブを選んで確率を確認しよう。44席のうち窓側は何席あるか数えてみよう。',
    observation: '1列6席 × 2列（両窓）= 12席。確率 = 12/44 ≈ 27%。',
    question: '❓ なぜ 12/44 になる？\n・分母（44）は全席数 = 自分が座りうるすべての場所\n・分子（12）は条件を満たす席の数\n→ これが「確率 = 場合の数 ÷ 全体の数」の正体',
  },
  {
    id: 3, label: '隣になる確率',
    title: '特定の2人が隣の席になる確率は？',
    instruction: '「条件B: 2人が隣」タブを選んで確率を確認しよう。「隣の席のペア」が何組あるか考えてみよう。',
    observation: '横並びのペアと縦並びのペアがある。席の配置によって確率が変わる。',
    question: '❓ 「隣」の定義は？左右だけ？前後も含む？斜め前は？\n→ 定義が変わると分子（条件を満たす組み合わせ数）が変わる。数学では定義が命。',
  },
  {
    id: 4, label: 'シャッフルして確認',
    title: '「席替え！」ボタンを10回押して、条件が成立した回数を数えよう',
    instruction: '左パネルの「席替え！」ボタンを10回押して。その間に設定した条件が何回成立したか記録しよう。',
    observation: '10回では計算した確率通りにならないことも多い。試行回数を増やすほど確率に近づく。',
    question: '❓ 10回中3回成立したとき、確率は30%？\nヒント：コインを10回投げて表が3回でも「コインは30%の確率で表が出る」とは言えない。\n→ 「大数の法則」：試行回数を増やすほど実際の確率に近づく。',
  },
  {
    id: 5, label: '複数条件',
    title: '「AとBが隣で、かつCが窓側」の確率は？',
    instruction: '条件を組み合わせて確率がどう変わるか試してみよう。',
    observation: '条件が増えると確率は小さくなる（条件を満たすパターンが減る）。',
    question: '❓ 「AとBが隣」かつ「CとDが隣」の確率は、それぞれの確率の掛け算になる？\nヒント：AとBが隣になると、残りの席の配置が変わる。つまり「独立」ではない。\n→ 条件付き確率・独立事象という概念につながる。',
  },
  {
    id: 6, label: 'まとめ',
    title: '確率・組み合わせが使われている場所',
    instruction: 'まとめカードを読もう。',
    observation: null,
    question: '❓ 「公平な席替え」を数学的に実現するアルゴリズムを考えてみよう。\n・完全ランダム？\n・前の席の人と隣にならないという条件を入れる？\n・全員の希望を100%叶えることは可能？\n→ これは「割り当て問題」という組み合わせ最適化の分野。',
  },
];

function QuestionText({ text }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {text.split('\n').filter(Boolean).map((line, i) => {
        if (line.startsWith('❓'))
          return <div key={i} style={{ fontSize: 14, fontWeight: 600, color: '#d0d6e0', lineHeight: 1.5 }}>{line}</div>;
        if (line.startsWith('ヒント') || line.startsWith('・'))
          return <div key={i} style={{ fontSize: 12, color: '#62666d', lineHeight: 1.6, paddingLeft: 4 }}>{line}</div>;
        if (line.startsWith('→'))
          return <div key={i} style={{ fontSize: 13, color: '#828fff', lineHeight: 1.5, fontWeight: 500 }}>{line}</div>;
        return <div key={i} style={{ fontSize: 13, color: '#8a8f98', lineHeight: 1.6 }}>{line}</div>;
      })}
    </div>
  );
}

export function StepGuide({ currentStep, onNext, onPrev }) {
  const step = STEPS[currentStep];
  const total = STEPS.length;
  return (
    <div className="step-guide-card">
      <div className="step-dots">
        {STEPS.map((s, i) => <div key={s.id} className={`step-dot ${i === currentStep ? 'active' : i < currentStep ? 'done' : ''}`} title={s.label} />)}
      </div>
      <div className="step-meta">
        <span className="step-counter">STEP {step.id} / {total}</span>
        <span className="step-label-text">{step.label}</span>
      </div>
      <h2 className="step-title">{step.title}</h2>
      <div className="step-section">
        <div className="step-section-label">やること</div>
        <div className="step-instruction">{step.instruction}</div>
      </div>
      {step.observation && <div className="step-section"><div className="step-section-label">観察ポイント</div><div className="step-observation">{step.observation}</div></div>}
      {step.question && <div className="step-question-box"><QuestionText text={step.question} /></div>}
      <div className="step-nav">
        <button className="btn btn-ghost" onClick={onPrev} disabled={currentStep === 0} style={{ opacity: currentStep === 0 ? 0.3 : 1 }}>← 前</button>
        <div className="step-progress-bar"><div className="step-progress-fill" style={{ width: `${((currentStep + 1) / total) * 100}%` }} /></div>
        {currentStep < total - 1
          ? <button className="btn btn-primary" onClick={onNext}>次 →</button>
          : <button className="btn" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }}>✓ 完了！</button>}
      </div>
    </div>
  );
}
