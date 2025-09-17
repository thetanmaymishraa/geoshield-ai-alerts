import { TrendingUp, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";
import { motion } from "framer-motion";

const mockData = [
  { time: "00:00", risk: 15, alerts: 2 },
  { time: "06:00", risk: 22, alerts: 3 },
  { time: "12:00", risk: 45, alerts: 7 },
  { time: "18:00", risk: 38, alerts: 5 },
  { time: "24:00", risk: 28, alerts: 4 },
];

export function RiskChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span>Risk Trends (24h)</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Chart */}
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                    fontSize: '12px'
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area
                  type="monotone"
                  dataKey="risk"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#riskGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center space-y-1">
              <div className="text-lg font-bold text-primary">45</div>
              <div className="text-xs text-muted-foreground">Peak Risk</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-lg font-bold text-success">21</div>
              <div className="text-xs text-muted-foreground">Avg Risk</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-lg font-bold text-warning">21</div>
              <div className="text-xs text-muted-foreground">Total Alerts</div>
            </div>
          </div>

          {/* Trend Indicator */}
          <div className="flex items-center justify-center space-x-2 pt-2 border-t">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-sm text-muted-foreground">
              Risk levels are decreasing
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}