
interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export const CircularProgress = ({ 
  percentage, 
  size = 80, 
  strokeWidth = 8, 
  color = "#ffffff" 
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-white/20"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 1s ease-in-out",
          }}
          strokeLinecap="round"
        />
      </svg>

      <span className="absolute text-xs font-bold text-white">
        {percentage}%
      </span>
    </div>
  );
};