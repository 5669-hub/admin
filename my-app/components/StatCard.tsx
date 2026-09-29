interface StatCardProps {
    title: string;
    value: number;
  }
  
  export default function StatCard({ title, value }: StatCardProps) {
    return (
      <div className="stat-card">
        <p>{title}</p>
        <h3>{value}</h3>
      </div>
    );
  }