export const STEPS = [
  { id:1, label:'一次関数を動かす', title:'y = ax + b のグラフを動かしてみよう', instruction:'一次関数を選んで、a（傾き）スライダーをゆっくり動かして。a = 0, 1, -1, 2 で何が変わるか観察しよう。', observation:'a が大きいほど急な傾き。a = 0 で水平線。a がマイナスで右下がりになる。', question:'❓ 「傾き」とは何？\n坂道を歩くとき「x が1増えると y がいくつ増えるか」が傾き。\n坂の角度と傾きの違いは？（tan θ = 傾き）' },
  { id:2, label:'切片を動かす', title:'b（切片）スライダーを動かしてみよう', instruction:'a = 1 のまま b を -3 → 0 → 3 と動かして。グラフがどう動くか観察しよう。', observation:'グラフが上下に平行移動する。形は変わらない。', question:'❓ なぜ「切片」という名前？\ny 軸と交わる点の y 座標だから。x = 0 のとき y = b。\n日常で「切片」が意味を持つ例は？（タクシーの初乗り料金、基本料金）' },
  { id:3, label:'二次関数', title:'二次関数 y = ax² + bx + c に切り替えよう', instruction:'「二次関数」を選んで a, b, c を色々変えて。特に a の符号（正負）を変えると何が起こる？', observation:'a > 0 で下に凸（笑顔型）、a < 0 で上に凸（悲しみ型）。頂点の位置が変わる。', question:'❓ ボールを投げたときの軌跡が放物線（二次関数）になるのはなぜ？\nヒント：重力加速度は一定。距離 = 速度 × 時間 + ½at²。\n→ 物理の運動方程式と二次関数がつながっている！' },
  { id:4, label:'冪関数', title:'冪関数 y = axⁿ の n を変えてみよう', instruction:'「冪関数」を選んで n = 1, 2, 3, 4 と変えて。グラフの形の変化を観察しよう。', observation:'n が偶数 → 左右対称（U字）。n が奇数 → 原点対称（S字）。n が大きいほど急に立ち上がる。', question:'❓ プログラムの「計算量」の話。\n・n 個のデータを処理するとき、ループ1つ = O(n)、ループ2重 = O(n²)。\n・n = 1000 のとき、O(n) は1000回、O(n²) は100万回。\n→ この違いが「プログラムが遅くなる」原因。' },
  { id:5, label:'無理関数', title:'√x のグラフを見てみよう', instruction:'「無理関数」を選んで。x < 0 の部分は点線（実数の値がない）。a を変えてグラフの広がりを確認しよう。', observation:'x が大きくなるほど y の増加が遅くなる。「逓減する増加」。', question:'❓ 振り子の周期 T = 2π√(L/g)（L=ひもの長さ）。\n・L が4倍になると T は何倍になる？\n・振り子を2倍遅くするには L を何倍にすればいい？\n→ √ の性質がそのまま物理の答えになる！' },
  { id:6, label:'まとめ', title:'関数は「変化のパターン」を分類する道具', instruction:'まとめカードを読もう。関数の種類と日常の対応を確認して。', observation:null, question:'❓ あなたの日常の「変化」を1つ選んで、それが一次・二次・冪・無理関数のどれに近いか考えよう。\n例：SNSのフォロワー増加、体の成長、スマホの充電残量、etc.' },
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
