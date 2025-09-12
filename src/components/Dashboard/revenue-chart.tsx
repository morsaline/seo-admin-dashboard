"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

const chartData = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 800 },
  { month: "Mar", revenue: 1600 },
  { month: "Apr", revenue: 1000 },
  { month: "May", revenue: 1300 },
  { month: "Jun", revenue: 1100 },
  { month: "Jul", revenue: 1200 },
  { month: "Aug", revenue: 900 },
]

export function RevenueChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            tickFormatter={(value) => `${value}`}
          />
          <Bar dataKey="revenue" fill="#60A5FA" radius={[4, 4, 0, 0]} maxBarSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
