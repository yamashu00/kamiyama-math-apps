import { useState, useCallback } from 'react';

// 44 seats: 4 rows × 11 cols
const ROWS = 4, COLS = 11, N = ROWS * COLS;

function makeSeat(i) {
  return { id: i, row: Math.floor(i / COLS), col: i % COLS };
}
const SEATS = Array.from({ length: N }, (_, i) => makeSeat(i));

// Window seats = col 0 or col 10
const windowSeats = new Set(SEATS.filter(s => s.col === 0 || s.col === COLS - 1).map(s => s.id));

function isAdjacentPair(a, b, assignment) {
  const posA = assignment.indexOf(a), posB = assignment.indexOf(b);
  const sA = SEATS[posA], sB = SEATS[posB];
  return (sA.row === sB.row && Math.abs(sA.col - sB.col) === 1) ||
    (sA.col === sB.col && Math.abs(sA.row - sB.row) === 1);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Highlight colors for special students
const COLORS = ['#5e6ad2', '#a855f7', '#10b981', '#f59e0b'];

export function SeatShuffle() {
  // assignment[seatIndex] = studentId (0..43)
  const [assignment, setAssignment] = useState(() => shuffle(Array.from({ length: N }, (_, i) => i)));
  const [history, setHistory] = useState({ trials: 0, hits: 0 });
  const [condition, setCondition] = useState('window'); // 'window' | 'adjacent' | 'both'

  // Students 0,1,2,3 are "highlighted"
  const specialStudents = [0, 1, 2, 3];

  const checkCondition = useCallback((asgn) => {
    const pos0 = asgn.indexOf(0);
    const windowOk = windowSeats.has(pos0);
    const adjOk = isAdjacentPair(0, 1, asgn);
    if (condition === 'window') return windowOk;
    if (condition === 'adjacent') return adjOk;
    return windowOk && adjOk;
  }, [condition]);

  const doShuffle = useCallback(() => {
    const newAsgn = shuffle(Array.from({ length: N }, (_, i) => i));
    setAssignment(newAsgn);
    const hit = checkCondition(newAsgn);
    setHistory(h => ({ trials: h.trials + 1, hits: h.hits + (hit ? 1 : 0) }));
  }, [checkCondition]);

  const doShuffleN = useCallback((n) => {
    let lastAsgn;
    let hits = 0;
    for (let i = 0; i < n; i++) {
      const newAsgn = shuffle(Array.from({ length: N }, (_, j) => j));
      if (checkCondition(newAsgn)) hits++;
      lastAsgn = newAsgn;
    }
    setAssignment(lastAsgn);
    setHistory(h => ({ trials: h.trials + n, hits: h.hits + hits }));
  }, [checkCondition]);

  const resetHistory = () => setHistory({ trials: 0, hits: 0 });

  // Theoretical probabilities
  const theoryProb = condition === 'window' ? windowSeats.size / N
    : condition === 'adjacent' ? (2 * ROWS * (COLS - 1) + 2 * COLS * (ROWS - 1)) / (N * (N - 1))
    : (windowSeats.size / N) * ((2 * ROWS * (COLS - 1) + 2 * COLS * (ROWS - 1)) / (N - 1));

  const conditionMet = checkCondition(assignment);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">🪑 席替えシミュレーター</div>
        <div className="card-desc">44人・44席のランダム席替えで確率を体験しよう。</div>
      </div>
      <div className="card-body">
        {/* Seat grid */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: 14, overflowX: 'auto' }}>
          <div style={{ fontSize: 10, color: 'var(--text-subtle)', marginBottom: 8, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            黒板 ▲
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 1fr)`, gap: 4, minWidth: 440 }}>
            {SEATS.map((seat, idx) => {
              const studentId = assignment[idx];
              const isSpecial = specialStudents.includes(studentId);
              const isWindow = windowSeats.has(idx);
              const color = isSpecial ? COLORS[studentId] : null;
              return (
                <div key={seat.id} style={{
                  width: '100%', paddingBottom: '80%', position: 'relative',
                  borderRadius: 4,
                  background: color ? `${color}22` : isWindow ? 'rgba(255,255,255,0.05)' : 'var(--bg-secondary)',
                  border: `1px solid ${color ? color + '66' : isWindow ? 'rgba(255,255,255,0.1)' : 'transparent'}`,
                  transition: 'background 300ms, border-color 300ms',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 8, fontWeight: color ? 700 : 400, color: color || (isWindow ? 'var(--text-muted)' : 'var(--text-subtle)'),
                  }}>
                    {isSpecial ? ['A', 'B', 'C', 'D'][studentId] : studentId + 1}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-subtle)', marginTop: 8 }}>
            🟦A=生徒A（紫=B, 緑=C, 黄=D）　窓側列 = 薄枠
          </div>
        </div>

        {/* Condition selector */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { value: 'window', label: 'AがA窓側の席' },
            { value: 'adjacent', label: 'AとBが隣の席' },
            { value: 'both', label: '両方同時に' },
          ].map(opt => (
            <button key={opt.value} className={`btn ${condition === opt.value ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => { setCondition(opt.value); resetHistory(); }}>
              {opt.label}
            </button>
          ))}
        </div>

        {/* Status */}
        <div style={{
          padding: '12px 16px', borderRadius: 8, border: '1px solid',
          background: conditionMet ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.03)',
          borderColor: conditionMet ? 'rgba(16,185,129,0.4)' : 'var(--border)',
        }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: conditionMet ? '#10b981' : 'var(--text-muted)' }}>
            {conditionMet ? '✓ 条件成立！' : '✗ 条件不成立'}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2 }}>
            理論確率: {(theoryProb * 100).toFixed(2)}%　|
            試行: {history.trials}回　|　成立: {history.hits}回　|
            実験確率: {history.trials > 0 ? (history.hits / history.trials * 100).toFixed(1) : '—'}%
          </div>
        </div>

        <div className="row">
          <button className="btn btn-primary" onClick={doShuffle} style={{ fontSize: 14, padding: '10px 24px' }}>
            🔀 席替え！
          </button>
          <button className="btn btn-ghost" onClick={() => doShuffleN(10)}>
            ×10 連続
          </button>
          <button className="btn btn-ghost" onClick={() => doShuffleN(100)}>
            ×100 連続
          </button>
          <button className="btn btn-ghost" onClick={resetHistory}>リセット</button>
        </div>

        <div className="formula-box">
          <div className="formula-label">確率の基本公式</div>
          <div className="formula-text">P = (条件を満たす場合の数) ÷ (全体の場合の数) = {(theoryProb * 100).toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
}
