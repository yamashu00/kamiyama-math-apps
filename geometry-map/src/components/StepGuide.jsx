export const STEPS = [
  { id:1, label:'2点を置く', title:'グラフ上に2つの点を置いてみよう', instruction:'座標平面をクリックして P₁ と P₂ を置いて。なるべく離れた場所に置こう。', observation:'2点の座標 (x₁,y₁) と (x₂,y₂) が表示される。直線（斜辺）と三角形が描かれる。', question:'❓ 「座標」って何？\n地図の「北緯35度・東経135度」も座標の一種。\n格子状に番号をつけて場所を数字で表す → デカルトが17世紀に発明した考え方。' },
  { id:2, label:'三角形を観察', title:'青い点線の三角形を見てみよう', instruction:'斜線（P₁P₂ を結ぶ線）と、横・縦の点線でできた直角三角形を確認しよう。a（横）、b（縦）、c（斜辺）を読んで。', observation:'必ず「直角三角形」になっている。斜辺 c が P₁P₂ の距離。', question:'❓ なぜ「直角三角形」を使う？\n・斜めの距離は直接測れない\n・でも「横の差」と「縦の差」は簡単に計算できる\n→ 測れない距離を、測れる量から求める = 数学の基本的なアプローチ！' },
  { id:3, label:'計算を確認', title:'c = √(a² + b²) の計算が合っているか確認しよう', instruction:'a と b の値を手計算で二乗して足して、√ を取って。画面の c の値と一致するか確認しよう。', observation:'どんな2点を選んでも、同じ式で距離が求まる。', question:'❓ P₁(3,0) と P₂(0,4) を置くと c = ?（計算してから確認）\nヒント：a=3, b=4 → c=5。これは「3-4-5の直角三角形」で有名。\n→ ピタゴラスの定理を古代エジプトの建築士も使っていた！' },
  { id:4, label:'色々な点で試す', title:'P₁(0,0) から色々な P₂ に変えてみよう', instruction:'P₁ を原点 (0,0) に置いて、P₂ を (3,4), (5,12), (8,15) などに変えてみよう。c の値を確認して。', observation:'a²+b²=c² が常に成り立つ。整数の組み合わせ（ピタゴラス数）が存在する。', question:'❓ なぜ a² + b² = c²（三平方の定理）は成り立つ？\nピタゴラスは 2500 年前に証明した。証明方法は今日でも 370 通り以上ある。\n→ 有名なものを調べてみよう（正方形を使った証明が視覚的にわかりやすい）。' },
  { id:5, label:'GPS・地図との接続', title:'Google マップはこの計算を使っている', instruction:'2地点を「神山（東経134.1度・北緯33.9度）と東京（東経139.7度・北緯35.7度）」に見立てて点を置いてみよう。', observation:'経度差・緯度差が a, b に対応する。実際の距離を√(a²+b²)で概算できる。', question:'❓ 地球は球なので、本当は平面の三平方の定理だけでは正確な距離が出ない。\nでも短距離なら近似として使える。\n・正確な球面距離の計算には何が必要？（球面三角法・sin・cos が登場）\n→ 三角関数 App #4 で学んだ sin/cos がここでも使われる！' },
  { id:6, label:'まとめ', title:'三平方の定理が使われている場所', instruction:'まとめカードを読もう。', observation:null, question:'❓ ゲームの当たり判定はどうやって計算している？\n・2つのキャラクターの座標から距離 d を計算\n・d < r（当たり半径）なら衝突！\n→ 60fps（1秒60回）でこの計算を繰り返しているのがゲームエンジン。三平方の定理が毎秒何億回も実行されている。' },
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
