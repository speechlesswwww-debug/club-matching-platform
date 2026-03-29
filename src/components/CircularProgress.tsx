import { useEffect, useState } from "react";

interface CircularProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function CircularProgress({ score, size = 80, strokeWidth = 7 }: CircularProgressProps) {
  const [displayed, setDisplayed] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayed / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setDisplayed(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-orange-100 dark:text-orange-900/30"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-orange-500 transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-sm font-bold text-orange-500">{displayed}%</span>
    </div>
  );
}
