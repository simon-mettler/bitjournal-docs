import React, {useState, type ReactNode} from 'react';
import styles from './styles.module.css';

// Final opacity of each cell of the 4x5 grid (0 = idle/off).
const FINALS = [
  [0, 0.4, 0.7, 0.95],
  [0, 0.5, 0.85, 0.65],
  [0, 0, 0, 0.9],
  [0, 0.45, 0.7, 0],
  [0, 0, 0, 1],
];
const CELL = 63;
const STEP = 79;
const ORIGIN_X = 83;
const ORIGIN_Y = 58;

function buildCells() {
  return FINALS.flatMap((row, r) =>
    row.map((opacity, c) => {
      const duration = 1.2 + Math.random() * 0.3;
      const end = 1.5 + Math.random() * 0.7;
      return {
        key: `${r}-${c}`,
        x: ORIGIN_X + c * STEP,
        y: ORIGIN_Y + r * STEP,
        style: {
          '--o': opacity || 'var(--logo-idle)',
          '--t': `${duration.toFixed(2)}s`,
          '--d': `${(end - duration).toFixed(2)}s`,
        } as React.CSSProperties,
      };
    }),
  );
}

export default function AnimatedLogo({className}: {className?: string}): ReactNode {
  // Random delays are generated on the client only to avoid SSR hydration mismatch.
  const [cells, setCells] = useState(buildCells);
  const [run, setRun] = useState(0);

  return (
    <svg
      key={run}
      className={`${styles.logo} ${className ?? ''}`}
      viewBox="0 0 1890 510"
      role="img"
      aria-label="BitJournal"
      onMouseEnter={() => {
        setCells(buildCells());
        setRun((n) => n + 1);
      }}>
      {cells.map((cell) => (
        <rect
          key={cell.key}
          className={styles.cell}
          x={cell.x}
          y={cell.y}
          width={CELL}
          height={CELL}
          rx={14}
          style={cell.style}
        />
      ))}
      <text className={styles.word} x={515} y={352}>
        bitjournal
      </text>
    </svg>
  );
}
