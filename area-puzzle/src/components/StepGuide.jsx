export const STEPS = [
  { id:1, label:'長方形で面積を測る', title:'曲線の下の面積をどうやって求める？', instruction:'y = x² のグラフを選んで、長方形の数を 4 本に設定しよう。青い長方形の合計面積と「真の面積」を比べてみよう。', observation:'長方形が曲線からはみ出したり、届かなかったりして誤差が出る。', question:'❓ 小学生のとき「面積 = 縦 × 横」を習った。\n曲線の下の面積は、なぜ同じ式で求められない？\nどうすれば正確な面積に近づける？' },
  { id:2, label:'長方形を増やす', title:'長方形を 4 → 20 → 100 → 200 本に増やそう', instruction:'スライダーをゆっくり右に動かしながら、誤差の数字を見て。何本くらいで誤差が 0.01 以下になる？', observation:'長方形が増えるほど誤差が小さくなる。200本でほぼ「真の面積」と一致する。', question:'❓ 長方形を「無限に」細かくしたら誤差はどうなる？\n→ これが「積分」の定義の正体。\n「無限に細かい長方形を足し算する」という操作を記号で書くと ∫ になる。' },
  { id:3, label:'sin の面積', title:'y = sin(πx) に切り替えてみよう', instruction:'「sin(πx)」を選んで同じ操作をしよう。真の面積が 2/π ≈ 0.637 になることを確認しよう。', observation:'三角関数の面積も、同じ長方形の足し算で求められる。', question:'❓ sin 波の面積が「2/π」という値になるのは偶然ではない。\nフーリエ解析（App #4）でもこの積分を使う。\n→ 数学は離れた分野が突然つながることがある！' },
  { id:4, label:'微分との関係', title:'積分の「逆」が微分', instruction:'右の式を見よう。∫₀¹ x² dx = 1/3。逆に x² を積分すると x³/3 になる。x³/3 を微分すると x² に戻る。', observation:'「積分 → 微分 → 元に戻る」という不思議な逆関係がある。', question:'❓ 車のスピードメーターと距離計の関係は？\n・速度を時間で積分 → 移動距離\n・移動距離を時間で微分 → 速度\n→ これが微分・積分が「逆演算」という意味！' },
  { id:5, label:'現実への接続', title:'積分はどこに使われている？', instruction:'面積だけじゃなく、体積・仕事量・確率まで「足し算の極限」で計算できることを確認しよう。', observation:'積分 = 「細かく分けて足し合わせる」という考え方のことを指す。', question:'❓ 医療の CT スキャンはどうやって体の断面画像を作る？\nヒント：たくさんの方向から X 線を当てて、その「透過量の積分」から逆算する（逆ラドン変換）。\n→ 積分なしには現代医療は成立しない！' },
  { id:6, label:'まとめ', title:'微分・積分が使われている場所', instruction:'まとめカードを読もう。', observation:null, question:'❓ 小学生の「長方形の面積」→ 中学の「三角形・台形」→ 高校の「積分」→ 大学の「重積分・偏微分」。\nこれは全部「同じ考え方の拡張」。\n数学は積み重ねてできている。今学ぶ基礎が、10年後につながる。' },
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
  const step = STEPS[currentStep], total = STEPS.length;
  return (
    <div className="step-guide-card">
      <div className="step-dots">{STEPS.map((s,i) => <div key={s.id} className={`step-dot ${i===currentStep?'active':i<currentStep?'done':''}`} title={s.label} />)}</div>
      <div className="step-meta"><span className="step-counter">STEP {step.id} / {total}</span><span className="step-label-text">{step.label}</span></div>
      <h2 className="step-title">{step.title}</h2>
      <div className="step-section"><div className="step-section-label">やること</div><div className="step-instruction">{step.instruction}</div></div>
      {step.observation && <div className="step-section"><div className="step-section-label">観察ポイント</div><div className="step-observation">{step.observation}</div></div>}
      {step.question && <div className="step-question-box"><QuestionText text={step.question} /></div>}
      <div className="step-nav">
        <button className="btn btn-ghost" onClick={onPrev} disabled={currentStep===0} style={{opacity:currentStep===0?0.3:1}}>← 前</button>
        <div className="step-progress-bar"><div className="step-progress-fill" style={{width:`${((currentStep+1)/total)*100}%`}} /></div>
        {currentStep<total-1?<button className="btn btn-primary" onClick={onNext}>次 →</button>:<button className="btn" style={{background:'rgba(16,185,129,0.12)',color:'#10b981',border:'1px solid rgba(16,185,129,0.3)'}}>✓ 完了！</button>}
      </div>
    </div>
  );
}
