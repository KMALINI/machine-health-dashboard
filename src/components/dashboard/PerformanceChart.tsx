import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const data = [
  { date: "Mon", score: 82 },
  { date: "Tue", score: 78 },
  { date: "Wed", score: 65 },
  { date: "Thu", score: 71 },
  { date: "Fri", score: 85 },
  { date: "Sat", score: 90 },
  { date: "Sun", score: 87 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const score = payload[0].value;
  const color = score >= 70 ? "text-success" : score >= 40 ? "text-warning" : "text-danger";
  return (
    <div className="industrial-card !p-3 !rounded-xl">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-lg font-bold font-mono ${color}`}>{score}%</p>
    </div>
  );
};

export function PerformanceChart() {
  return (
    <div className="industrial-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">7-Day Performance Trend</h3>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(152, 60%, 48%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(152, 60%, 48%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 20%)" />
          <XAxis dataKey="date" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="score" stroke="hsl(152, 60%, 48%)" strokeWidth={2.5} fill="url(#healthGradient)" dot={{ r: 4, fill: "hsl(152, 60%, 48%)", strokeWidth: 0 }} activeDot={{ r: 6, fill: "hsl(152, 60%, 48%)", stroke: "hsl(220, 20%, 10%)", strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
