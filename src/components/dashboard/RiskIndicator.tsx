import { motion } from "framer-motion";

interface RiskIndicatorProps {
  level: "healthy" | "warning" | "critical";
  label?: string;
}

const config = {
  healthy: { color: "bg-success", glow: "glow-green", label: "Healthy" },
  warning: { color: "bg-warning", glow: "glow-yellow", label: "Warning" },
  critical: { color: "bg-danger", glow: "glow-red", label: "Critical" },
};

export function RiskIndicator({ level, label }: RiskIndicatorProps) {
  const c = config[level];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        {(["critical", "warning", "healthy"] as const).map((l) => (
          <motion.div
            key={l}
            className={`w-5 h-5 rounded-full ${l === level ? config[l].color : "bg-secondary"} ${l === level ? config[l].glow : ""}`}
            animate={l === level ? { scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        ))}
      </div>
      <span className={`text-xs font-semibold ${
        level === "healthy" ? "text-success" : level === "warning" ? "text-warning" : "text-danger"
      }`}>
        {label || c.label}
      </span>
    </div>
  );
}
