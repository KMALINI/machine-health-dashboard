import { motion } from "framer-motion";
import { FileBarChart, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PerformanceChart } from "../components/dashboard/PerformanceChart";

const reports = [
  { title: "Weekly Health Summary", date: "Feb 24 – Feb 28, 2026", type: "Weekly" },
  { title: "Machine #12 Fault Report", date: "Feb 27, 2026", type: "Incident" },
  { title: "Monthly Performance Overview", date: "January 2026", type: "Monthly" },
  { title: "Quarterly Maintenance Report", date: "Q4 2025", type: "Quarterly" },
];

const ReportsPage = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Reports</h2>
        <p className="text-sm text-muted-foreground mt-1">View and download system reports</p>
      </div>

      <PerformanceChart />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="industrial-card flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                <FileBarChart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{report.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{report.date}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{report.type}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Download className="w-4 h-4" />
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ReportsPage;
