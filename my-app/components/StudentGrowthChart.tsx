
"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { month: "Apr", students: 65, tutors: 12 },
  { month: "May", students: 78, tutors: 15 },
  { month: "Jun", students: 82, tutors: 18 },
  { month: "Jul", students: 96, tutors: 20 },
  { month: "Aug", students: 108, tutors: 24 },
  { month: "Sep", students: 120, tutors: 28 },
];

export default function StudentGrowthChart() {
  return (
    <Card className="gap-0 border border-gray-200 bg-white py-0 shadow-sm">
      <CardHeader className="gap-3 px-6 pb-4 pt-6">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Applications Overview
        </CardTitle>

        <p className="text-sm text-gray-500">
          Student and tutor applications over the last 6 months
        </p>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -15,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="studentColor"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#553a11"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="100%"
                    stopColor="#553a11"
                    stopOpacity={0.03}
                  />
                </linearGradient>

                <linearGradient
                  id="tutorColor"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#16a34a"
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="100%"
                    stopColor="#16a34a"
                    stopOpacity={0.03}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#e5e7eb"
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                width={40}
              />

              <Tooltip />

              <Legend />

              <Area
                type="monotone"
                dataKey="students"
                name="Students Applied"
                stroke="#553a11"
                strokeWidth={3}
                fill="url(#studentColor)"
                activeDot={{ r: 5 }}
              />

              <Area
                type="monotone"
                dataKey="tutors"
                name="Tutors Applied"
                stroke="#16a34a"
                strokeWidth={3}
                fill="url(#tutorColor)"
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
