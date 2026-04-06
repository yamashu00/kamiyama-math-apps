export const STEPS = [
  {
    id: 1, label: '積み立ての開始',
    title: '毎月1,000円を積み立てると何年後いくら？',
    instruction: '左グラフを見て。今は毎月1,000円・年利0%の状態。「1年後」「5年後」「10年後」の金額を確認しよう。',
    observation: '利率0%だと、ただの足し算。10年で120,000円。当然の結果。',
    question: null,
  },
  {
    id: 2, label: '利率を動かす',
    title: '年利スライダーを1%・3%・5%に動かしてみよう',
    instruction: '右パネルの「年利」スライダーをゆっくり上げて。グラフの形がどう変わるか見て。',
    observation: '利率を上げると、グラフが「まっすぐ」から「曲線（上に膨らむ）」に変わる。',
    question: '❓ 利率1%と5%では、30年後の差はいくら？\n予想してからスライダーで確認してみよう。',
  },
  {
    id: 3, label: '複利の魔法',
    title: '「単利」と「複利」のグラフを比べよう',
    instruction: '画面の2本のラインを見て。青が「複利」（利息にも利息がつく）、グレーが「単利」（毎年同じ額の利息）。',
    observation: '最初はほぼ同じだが、年数が経つほど「複利」が急激に大きくなる。',
    question: '❓ なぜ複利のグラフは「まっすぐ」ではなく「曲線」になる？\nヒント：毎年の利息が「前の年の元本+利息」の何%かを考えよう。',
  },
  {
    id: 4, label: '数列との接続',
    title: 'この計算の仕組みを数式で表すと？',
    instruction: '下の「数式」欄を見て。n年後の資産が数列で表されている。a₁（初項）、r（公比）という言葉を確認しよう。',
    observation: '複利の計算 = 等比数列。「前の項 × 公比」を繰り返す構造。',
    question: '❓ 公比 r とは何を表している？\n・r = 1.03 のとき、年利は何%？\n・毎月積み立てでなく、最初に10万円入れたら？',
  },
  {
    id: 5, label: '期間の効果',
    title: '「早く始める」と何が違う？',
    instruction: '積立期間スライダーを10年・20年・30年・40年と変えてみよう。最後10年間の増え方に注目。',
    observation: '30年目〜40年目の増加量が、最初の10年間の何倍にもなる。',
    question: '❓ 20歳から積み立てた人と、30歳から積み立てた人の60歳時点での差はいくら？\n→ これが「時間が資産」と言われる理由。',
  },
  {
    id: 6, label: 'まとめ',
    title: '等比数列が現実の経済を動かしている',
    instruction: 'まとめカードを読もう。複利・等比数列が使われている場面を確認して。',
    observation: null,
    question: '❓ 逆に「複利の恐ろしさ」もある。借金（ローン・クレジット）が増え続けるのはなぜ？\n・住宅ローン30年・年利2%で5,000万円借りると、返済総額はいくら？\n→ 複利は「資産を増やす」にも「借金を増やす」にも同じように働く。',
  },
];

export function StepGuide({ currentStep, onNext, onPrev }) {
  const step = STEPS[currentStep];
  const total = STEPS.length;
  return (
    <div className="step-guide-card">
      <div className="step-dots">
        {STEPS.map((s, i) => (
          <div key={s.id} className={`step-dot ${i === currentStep ? 'active' : i < currentStep ? 'done' : ''}`} title={s.label} />
        ))}
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
      {step.observation && (
        <div className="step-section">
          <div className="step-section-label">観察ポイント</div>
          <div className="step-observation">{step.observation}</div>
        </div>
      )}
      {step.question && (
        <div className="step-question-box">
          <div className="step-question-text">{step.question}</div>
        </div>
      )}
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
