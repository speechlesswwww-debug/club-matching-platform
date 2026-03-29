interface RadarChartProps {
  data: { label: string; value: number; max?: number }[];
  size?: number;
}

export function RadarChart({ data, size = 200 }: RadarChartProps) {
  const center = size / 2;
  const radius = (size / 2) * 0.7;
  const n = data.length;
  const gradientId = "radar-gradient";
  const glowId = "radar-glow";

  const getPoint = (index: number, r: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const gridLevels = [0.25, 0.5, 0.75, 1];

  const dataPoints = data.map((d, i) => {
    const val = (d.value / (d.max || 10)) * radius;
    return getPoint(i, val);
  });

  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3" />
        </linearGradient>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Grid polygons */}
      {gridLevels.map((level, li) => {
        const gridPoints = data.map((_, i) => getPoint(i, radius * level));
        const path = gridPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
        return (
          <path
            key={li}
            d={path}
            fill="none"
            stroke="rgba(249,115,22,0.15)"
            strokeWidth="1"
          />
        );
      })}

      {/* Axes */}
      {data.map((_, i) => {
        const end = getPoint(i, radius);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={end.x}
            y2={end.y}
            stroke="rgba(249,115,22,0.2)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data area with gradient fill */}
      <path d={dataPath} fill={`url(#${gradientId})`} stroke="#f97316" strokeWidth="2" filter={`url(#${glowId})`} />
      <path d={dataPath} fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6" />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="5" fill="white" stroke="#f97316" strokeWidth="2" />
          <circle cx={p.x} cy={p.y} r="2.5" fill="#f97316" />
        </g>
      ))}

      {/* Labels */}
      {data.map((d, i) => {
        const labelRadius = radius + 22;
        const lp = getPoint(i, labelRadius);
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fill="currentColor"
            fontWeight="500"
            className="text-gray-600 dark:text-gray-400"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}
