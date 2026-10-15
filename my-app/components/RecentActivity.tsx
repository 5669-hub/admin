
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const activities = [
  {
    title: "New student registered",
    description: "Sara Alemu joined the platform",
    time: "10 minutes ago",
  },
  {
    title: "New tutor application",
    description: "Michael Abebe applied as a tutor",
    time: "30 minutes ago",
  },
  {
    title: "Payment received",
    description: "Dawit Bekele paid tuition",
    time: "1 hour ago",
  },
  {
    title: "New class created",
    description: "Grade 8 Mathematics class",
    time: "2 hours ago",
  },
];

export default function RecentActivity() {
  return (
  <Card
  style={{
    gap: 0,
    padding: 0,
    border: "1px solid #e5e7eb",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  }}
  className="flex min-w-0 flex-col rounded-xl bg-white"
>
      <CardHeader className="recent-activity-header flex flex-col gap-1 border-b border-gray-100">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Recent Activity
        </CardTitle>
        <p className="text-sm text-gray-500">
          Latest updates from your platform
        </p>
      </CardHeader>

      <CardContent className="recent-activity-content">
        {activities.map((activity, index) => (
          <div
            key={activity.title}
            className={`recent-activity-item flex gap-3 ${
              index !== activities.length - 1
                ? "border-b border-gray-100"
                : ""
            }`}
          >
            <div className="recent-activity-dot h-2.5 w-2.5 shrink-0 rounded-full bg-[#553a11] ring-4 ring-[#553a11]/10" />

            <div className="recent-activity-copy min-w-0 flex-1">
              <p className="text-sm font-semibold leading-5 text-gray-800">
                {activity.title}
              </p>
              <p className="text-sm leading-5 text-gray-500">
                {activity.description}
              </p>
              <p className="text-xs text-gray-400">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
