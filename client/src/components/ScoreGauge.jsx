export default function ScoreGauge({ score, label, size = 160 }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius * 0.75; // 3/4 arc
  const filled = (score / 100) * circumference;

  const color = score >= 75 ? "#2F6F4E" : score >= 50 ? "#C98A2C" : "#B8463A";

  const ticks = Array.from({ length: 11 }, (_, i) => i * 10);

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 160 160"
        width={size}
        height={size}
        className="-rotate-[135deg]"
      >
        {/* track */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#D8D3C7"
          strokeWidth="10"
          strokeDasharray={`${circumference} ${2 * Math.PI * radius}`}
          strokeLinecap="round"
        />
        {/* fill */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${circumference} ${2 * Math.PI * radius}`}
          strokeDashoffset={circumference - filled}
          strokeLinecap="round"
          className="gauge-arc"
          style={{
            transition: "stroke-dashoffset 1s ease-out, stroke 0.4s",
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-3xl font-bold text-ink">{score}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-inkfade">
          / 100
        </span>
      </div>
      <span className="mt-2 font-mono text-xs uppercase tracking-widest text-inkfade">
        {label}
      </span>
    </div>
  );
}
