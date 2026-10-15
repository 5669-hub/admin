import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <Card className="dashboard-stat-card rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <CardHeader className="dashboard-stat-card-header">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="dashboard-stat-card-content">
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-semibold leading-none tracking-tight text-[#553a11]">
            {value}
          </h3>

          <div className="flex items-center gap-2">
            <svg
              aria-hidden="true"
              className="h-7 w-7"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" fill="#553a11" />
              <path d="M12 12V2a10 10 0 0 1 5.88 1.91L12 12Z" fill="#f3f4f6" />
            </svg>
            <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
              +12%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}