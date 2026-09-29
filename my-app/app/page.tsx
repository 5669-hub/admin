// import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";


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
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <main className="content">
          <h2>Welcome to Excellence Tutor</h2>

          <p className="dashboard-subtitle">
            Here's what's happening today.
          </p>

          <div className="stats-grid">
            <StatCard title="Students" value={120} />
            <StatCard title="Tutors" value={18} />
            <StatCard title="Applications" value={24} />
            <StatCard title="Classes" value={36} />
          </div>
          
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
      </div>
    </div>
  );
}