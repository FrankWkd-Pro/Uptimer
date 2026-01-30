import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import type { MonitorAnalyticsDayPoint } from '../api/types';

interface DailyLatencyChartProps {
  points: MonitorAnalyticsDayPoint[];
  height?: number;
}

function formatDay(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString([], { month: '2-digit', day: '2-digit' });
}

export function DailyLatencyChart({ points, height = 220 }: DailyLatencyChartProps) {
  const data = points
    .filter((p) => typeof p.p95_latency_ms === 'number')
    .map((p) => ({
      day: p.day_start_at,
      p95_latency_ms: p.p95_latency_ms,
      p50_latency_ms: p.p50_latency_ms,
    }));

  if (data.length === 0) {
    return <div className="flex items-center justify-center h-[220px] text-gray-500">No latency data</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <XAxis dataKey="day" tickFormatter={formatDay} tick={{ fontSize: 12 }} stroke="#9ca3af" />
        <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={(v) => `${v}ms`} />
        <Tooltip
          labelFormatter={(v) => new Date(Number(v) * 1000).toLocaleDateString()}
          formatter={(v: number, name) => [`${v}ms`, name === 'p50_latency_ms' ? 'P50' : 'P95']}
        />
        <Line type="monotone" dataKey="p95_latency_ms" stroke="#0ea5e9" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="p50_latency_ms" stroke="#94a3b8" strokeWidth={1} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

