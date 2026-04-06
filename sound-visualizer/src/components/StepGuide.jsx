export const STEPS = [
  {
    id: 1,
    label: '声を見る',
    target: 'mic',
    title: 'まず、自分の声を「見て」みよう',
    instruction:
      '左パネルの「▶ マイクをオンにする」を押して、「あー」と声を出してみよう。声の高さや大きさを変えながら観察して。',
    observation:
      '波形がぐちゃぐちゃに揺れている。大きな声 → 振れが大きく、高い声 → 波が細かい。これが「音の正体」。',
    question: null,
  },
  {
    id: 2,
    label: 'sin 波とは',
    target: 'synth',
    title: '世界一シンプルな波 — sin(x) を見てみよう',
    instruction:
      '右パネルを見て。今は「基本波（1倍）= 1.0」、他はすべて 0 の状態になっている。この波形が sin(x) のグラフ。',
    observation:
      'なめらかで規則正しい曲線が1本だけ見える。どこを切り取っても同じ形の繰り返し。',
    question:
      '❓ この形、日常のどこかで見たことある？\nヒント：ブランコの動き・海の波・心電図の「正常な波形」…',
  },
  {
    id: 3,
    label: '2倍音を足す',
    target: 'synth',
    title: '2倍音スライダーを 0.5 にしてみよう',
    instruction:
      '右パネルの「2倍音」スライダーをゆっくり 0.5 まで動かして。「▶ 音を鳴らす」ボタンで音も聴いてみよう。スライダーを動かしながら、音も変えてみて。',
    observation:
      '波形の形が歪んだ。音の高さは変わらないが、「質感（音色）」が変わった。',
    question:
      '❓ 2倍音 = 振動数が2倍の sin 波を足した。\n・波形はどう変わった？\n・音の「高さ」は変わった？「質感」は？\n・振動数が2倍ということは、音楽の言葉で何という？（ヒント：ピアノで1つ右の「ド」）',
  },
  {
    id: 4,
    label: '倍音を重ねる',
    target: 'synth',
    title: '3倍・4倍音も足して、楽器の音色を作ってみよう',
    instruction:
      '3倍音・4倍音のスライダーも色々動かしてみよう。すべてのスライダーを組み合わせて、「笛っぽい音」「ガサガサした音」など色々試して。',
    observation:
      '倍音を増やすほど波形が複雑になり、音の「質感（音色）」が変わる。基本波だけ → 笛のような純音。倍音を足す → バイオリン・ギターに近づく。',
    question:
      '❓ ピアノとギターが同じ「ド」を弾いても、音色が全然違う。なぜ？\nヒント：どちらも同じ基本周波数だが、倍音の「混ざり方」が違う。\n→ これが「音色 = 倍音の構成」という意味！',
  },
  {
    id: 5,
    label: '声と比較',
    target: 'both',
    title: '左の声の波形と、右の合成波形を見比べよう',
    instruction:
      'マイクをオンにして声を出しながら、左（マイク波形）と右（合成波形）を並べて見てみよう。色々な倍音の組み合わせで、自分の声に近い形を作れるか試してみよう。',
    observation:
      '声の波形（複雑）も、sin の足し算で作った波形（複雑）も、同じような「うねうねした形」をしている。',
    question:
      '❓ あなたの声も「sin 波の足し算」でできている、と言える。\nでは…\n・スマホで音楽を聴くとき（MP3・AACという形式）、この原理はどう使われている？\n・Wi-Fi や 4G の「電波」は何でできている？\n・MRI（病院の検査機器）が体の断面図を作るのに、なぜ数学が必要？',
  },
  {
    id: 6,
    label: 'まとめ',
    target: 'summary',
    title: 'この数学は200年間、世界中を支え続けている',
    instruction:
      '下のまとめカードを読もう。フーリエ解析がどこに使われているか確認して。',
    observation: null,
    question:
      '❓ フーリエ解析を発明したのは誰？いつ？どんな問題を解こうとしていた？\nヒント：19世紀初頭のフランス人数学者。地球内部の「熱の伝わり方」を数式で書こうとしていた。\n→ 音とは全く関係ない問題を解いたら、音・電波・医療まで全部つながった。これが数学の力。',
  },
];

export function StepGuide({ currentStep, onNext, onPrev }) {
  const step = STEPS[currentStep];
  const total = STEPS.length;
  const isFirst = currentStep === 0;
  const isLast = currentStep === total - 1;

  return (
    <div className="step-guide-card">
      {/* Progress dots */}
      <div className="step-dots">
        {STEPS.map((s, i) => (
          <div
            key={s.id}
            className={`step-dot ${i === currentStep ? 'active' : i < currentStep ? 'done' : ''}`}
            title={s.label}
          />
        ))}
      </div>

      {/* Step counter */}
      <div className="step-meta">
        <span className="step-counter">STEP {step.id} / {total}</span>
        <span className="step-label-text">{step.label}</span>
      </div>

      {/* Title */}
      <h2 className="step-title">{step.title}</h2>

      {/* Instruction */}
      <div className="step-section">
        <div className="step-section-label">やること</div>
        <div className="step-instruction">{step.instruction}</div>
      </div>

      {/* Observation */}
      {step.observation && (
        <div className="step-section">
          <div className="step-section-label">観察ポイント</div>
          <div className="step-observation">{step.observation}</div>
        </div>
      )}

      {/* Question */}
      {step.question && (
        <div className="step-question-box">
          <div className="step-question-text">{step.question}</div>
        </div>
      )}

      {/* Navigation */}
      <div className="step-nav">
        <button
          className="btn btn-ghost"
          onClick={onPrev}
          disabled={isFirst}
          style={{ opacity: isFirst ? 0.3 : 1 }}
        >
          ← 前のステップ
        </button>
        <div className="step-progress-bar">
          <div
            className="step-progress-fill"
            style={{ width: `${((currentStep + 1) / total) * 100}%` }}
          />
        </div>
        {!isLast ? (
          <button className="btn btn-primary" onClick={onNext}>
            次のステップ →
          </button>
        ) : (
          <button
            className="btn"
            style={{
              background: 'rgba(16,185,129,0.12)',
              color: '#10b981',
              border: '1px solid rgba(16,185,129,0.3)',
            }}
            onClick={() => {}}
          >
            ✓ 完了！
          </button>
        )}
      </div>
    </div>
  );
}
