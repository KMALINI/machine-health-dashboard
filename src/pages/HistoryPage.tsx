import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockHistory = [
  { id: "M-001", date: "2026-02-28 14:22", score: 92, risk: "healthy" as const },
  { id: "M-007", date: "2026-02-28 11:05", score: 58, risk: "warning" as const },
  { id: "M-012", date: "2026-02-27 16:30", score: 34, risk: "critical" as const },
  { id: "M-003", date: "2026-02-27 09:15", score: 88, risk: "healthy" as const },
  { id: "M-019", date: "2026-02-26 13:40", score: 45, risk: "warning" as const },
  { id: "M-005", date: "2026-02-26 10:20", score: 95, risk: "healthy" as const },
  { id: "M-008", date: "2026-02-25 15:55", score: 29, risk: "critical" as const },
  { id: "M-011", date: "2026-02-25 08:10", score: 76, risk: "healthy" as const },
];

const riskBadge = (risk: "healthy" | "warning" | "critical") => {
  const styles = {
    healthy: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    critical: "bg-danger/15 text-danger",
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[risk]}`}>{risk.charAt(0).toUpperCase() + risk.slice(1)}</span>;
};

const HistoryPage = () => {
  const [search, setSearch] = useState("");
  const [filterRisk, setFilterRisk] = useState<string>("all");

  const filtered = mockHistory.filter((r) => {
    const matchSearch = r.id.toLowerCase().includes(search.toLowerCase());
    const matchRisk = filterRisk === "all" || r.risk === filterRisk;
    return matchSearch && matchRisk;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Analysis History</h2>
        <p className="text-sm text-muted-foreground mt-1">View past analysis records and reports</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Machine ID..."
            className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {["all", "healthy", "warning", "critical"].map((r) => (
            <button
              key={r}
              onClick={() => setFilterRisk(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterRisk === r ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="industrial-card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Date</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Machine ID</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Health Score</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Risk Level</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <motion.tr
                  key={row.id + row.date}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{row.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{row.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${row.score >= 70 ? "bg-success" : row.score >= 40 ? "bg-warning" : "bg-danger"}`}
                          style={{ width: `${row.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-mono font-medium text-foreground">{row.score}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{riskBadge(row.risk)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No records found</div>
        )}
      </div>
    </motion.div>
  );
};

export default HistoryPage;
