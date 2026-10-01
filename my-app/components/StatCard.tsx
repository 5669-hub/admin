interface StatCardProps {
    title: string;
    value: number;
  }
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";export default function StatCard({ title, value }: StatCardProps) {
    return (
      <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
      </CardHeader>
    
      <CardContent>
        <h3 className="text-3xl font-bold text-[#553a11]">
          {value}
        </h3>
      </CardContent>
    </Card>
    );
  }