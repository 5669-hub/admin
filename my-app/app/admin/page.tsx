
import ApplicationsChart from "@/components/ApplicationsChart";
import StatCard from "@/components/StatCard";
import RecentActivity from "@/components/RecentActivity";
import StudentGrowthChart from "@/components/StudentGrowthChart";

const applications = [
  {
    id: 1,
    name: "Sara Alemu",
    subject: "Mathematics",
    grade: "Grade 8",
    status: "Pending",
  },
  {
    id: 2,
    name: "Dawit Bekele",
    subject: "Physics",
    grade: "Grade 10",
    status: "Approved",
  },
  {
    id: 3,
    name: "Hana Tesfaye",
    subject: "English",
    grade: "Grade 6",
    status: "Pending",
  },
  {
    id: 4,
    name: "Michael Abebe",
    subject: "Programming",
    grade: "Grade 11",
    status: "Approved",
  },
];

export default function Home() {
  return (
    <main className="content">
      <h2>Welcome to Excellence Tutor</h2>

      <p className="dashboard-subtitle">
        Here's what's happening today.
      </p>

      {/* STAT CARDS */}
      <div className="stats-grid">
        <StatCard title="Students" value={120} />
        <StatCard title="Tutors" value={18} />
        <StatCard title="Applications" value={24} />
        <StatCard title="Classes" value={36} />
      </div>

      {/* APPLICATIONS CHART + RECENT ACTIVITY */}
      <div className="dashboard-widgets">
        <div style={{ minWidth: 0, width: "100%" }}>
          <ApplicationsChart />
        </div>

        <div style={{ minWidth: 0, width: "100%" }}>
          <RecentActivity />
        </div>
      </div>

      {/* STUDENT GROWTH CHART */}
      <div style={{ marginTop: "28px", minWidth: 0 }}>
        <StudentGrowthChart />
      </div>

      {/* RECENT APPLICATIONS TABLE */}
      <section className="applications-section">
        <h2>Recent Applications</h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Subject</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>{application.name}</td>
                  <td>{application.subject}</td>
                  <td>{application.grade}</td>
                  <td>
                    <span
                      className={`status ${application.status.toLowerCase()}`}
                    >
                      {application.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
