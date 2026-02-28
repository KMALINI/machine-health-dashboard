import { motion } from "framer-motion";
import { Activity, Heart, AlertTriangle, FileText } from "lucide-react";
import { HealthGauge } from "../components/dashboard/HealthGauge";
import { RiskIndicator } from "../components/dashboard/RiskIndicator";
import { PerformanceChart } from "../components/dashboard/PerformanceChart";

const cards = [
  { title: "Active Machines", value: "24", icon: Activity, accent: "text-accent" },
  { title: "Health Score", value: "87%", icon: Heart, accent: "text-success" },
  { title: "Fault Risk Level", value: "Low", icon: AlertTriangle, accent: "text-warning" },
  { title: "Analyses Today", value: "156", icon: FileText, accent: "text-accent" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const Dashboard = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <motion.div key={card.title} variants={item} whileHover={{ scale: 1.02, y: -2 }} className="industrial-card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center ${card.accent}`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{card.title}</p>
              <p className={`text-2xl font-bold font-mono ${card.accent}`}>{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gauge + Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="industrial-card flex flex-col items-center justify-center lg:col-span-1">
          <h3 className="text-lg font-semibold text-foreground mb-4">Machine Health</h3>
          <HealthGauge score={87} />
        </motion.div>

        <motion.div variants={item} className="industrial-card lg:col-span-1 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-foreground mb-6">Risk Status</h3>
          <RiskIndicator level="healthy" />
          <div className="mt-6 grid grid-cols-3 gap-4 w-full text-center">
            <div>
              <p className="text-xl font-bold font-mono text-success">18</p>
              <p className="text-xs text-muted-foreground">Healthy</p>
            </div>
            <div>
              <p className="text-xl font-bold font-mono text-warning">4</p>
              <p className="text-xs text-muted-foreground">Warning</p>
            </div>
            <div>
              <p className="text-xl font-bold font-mono text-danger">2</p>
              <p className="text-xs text-muted-foreground">Critical</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-1 industrial-card">
          <h3 className="text-lg font-semibold text-foreground mb-3">Recent Alerts</h3>
          <div className="space-y-3">
            {[
              { msg: "Machine #12 - Bearing anomaly detected", level: "critical" as const, time: "2m ago" },
              { msg: "Machine #07 - Vibration spike warning", level: "warning" as const, time: "15m ago" },
              { msg: "Machine #03 - Returned to healthy", level: "healthy" as const, time: "1h ago" },
            ].map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  alert.level === "critical" ? "bg-danger" : alert.level === "warning" ? "bg-warning" : "bg-success"
                }`} />
                <div className="min-w-0">
                  <p className="text-sm text-foreground truncate">{alert.msg}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div variants={item}>
        <PerformanceChart />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
