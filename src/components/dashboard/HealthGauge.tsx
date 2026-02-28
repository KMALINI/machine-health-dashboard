import { motion } from "framer-motion";

interface HealthGaugeProps {
  score: number;
  size?: number;
}

export function HealthGauge({ score, size = 200 }: HealthGaugeProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const needleAngle = -90 + (clampedScore / 100) * 180;

  const getColor = (s: number) => {
    if (s < 40) return { color: "hsl(0, 72%, 55%)", label: "Critical", class: "text-danger" };
    if (s < 70) return { color: "hsl(42, 95%, 55%)", label: "Warning", class: "text-warning" };
    return { color: "hsl(152, 60%, 48%)", label: "Healthy", class: "text-success" };
  };

  const info = getColor(clampedScore);
  const center = size / 2;
  const radius = size * 0.38;
  const strokeWidth = size * 0.08;

  const createArc = (startAngle: number, endAngle: number) => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const needleLength = radius - strokeWidth;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size * 0.65}`}>
        {/* Background arcs */}
        <path d={createArc(180, 252)} stroke="hsl(0, 72%, 55%)" strokeWidth={strokeWidth} fill="none" opacity={0.25} strokeLinecap="round" />
        <path d={createArc(252, 324)} stroke="hsl(42, 95%, 55%)" strokeWidth={strokeWidth} fill="none" opacity={0.25} strokeLinecap="round" />
        <path d={createArc(324, 360)} stroke="hsl(152, 60%, 48%)" strokeWidth={strokeWidth} fill="none" opacity={0.25} strokeLinecap="round" />

        {/* Active arc */}
        <motion.path
          d={createArc(180, 180 + (clampedScore / 100) * 180)}
          stroke={info.color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          filter={`drop-shadow(0 0 6px ${info.color})`}
        />

        {/* Needle */}
        <motion.line
          x1={center}
          y1={center}
          x2={center}
          y2={center - needleLength}
          stroke={info.color}
          strokeWidth={2.5}
          strokeLinecap="round"
          style={{ transformOrigin: `${center}px ${center}px` }}
          initial={{ rotate: -90 }}
          animate={{ rotate: needleAngle }}
          transition={{ duration: 1.5, ease: "easeOut", type: "spring", stiffness: 60, damping: 15 }}
          filter={`drop-shadow(0 0 4px ${info.color})`}
        />

        {/* Center dot */}
        <circle cx={center} cy={center} r={4} fill={info.color} />

        {/* Labels */}
        <text x={size * 0.12} y={center + 4} textAnchor="middle" className="fill-muted-foreground text-[10px]">0</text>
        <text x={center} y={center - radius - strokeWidth - 4} textAnchor="middle" className="fill-muted-foreground text-[10px]">50</text>
        <text x={size * 0.88} y={center + 4} textAnchor="middle" className="fill-muted-foreground text-[10px]">100</text>
      </svg>

      <div className="text-center -mt-2">
        <motion.p
          className={`text-3xl font-bold font-mono ${info.class}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          {clampedScore}
        </motion.p>
        <p className={`text-sm font-medium ${info.class}`}>{info.label}</p>
      </div>
    </div>
  );
}
