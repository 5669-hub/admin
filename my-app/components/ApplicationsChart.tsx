
"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { subject: "Mathematics", applications: 8 },
  { subject: "Physics", applications: 6 },
  { subject: "English", applications: 5 },
  { subject: "Programming", applications: 5 },
];

export default function ApplicationsChart() {
  return (
    <Card className="w-full min-w-0 gap-0 rounded-xl border border-gray-200 bg-white py-0 shadow-sm">
      <CardHeader className="applications-chart-header">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Applications by Subject
        </CardTitle>
        <p className="text-sm text-gray-500">
          Application distribution across subjects
        </p>
      </CardHeader>

      <CardContent className="applications-chart-content">
        <div className="applications-chart-plot w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 8, right: 8, bottom: 0, left: -12 }}
              barCategoryGap={0}
            >
              <CartesianGrid
                vertical={false}
                stroke="#eeeeee"
                strokeDasharray="3 3"
              />

              <XAxis
                 dataKey="subject"
                 padding={{ left: 70, right: 70 }}
                 tickLine={false}
                 axisLine={false}
                 tick={{ fontSize: 11, fill: "#6b7280" }}
                 interval={0}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#6b7280" }}
                allowDecimals={false}
                width={32}
              />

              <Tooltip />

              <Bar
                dataKey="applications"
                fill="#553a11"
                radius={[5, 5, 0, 0]}
                maxBarSize={38}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
