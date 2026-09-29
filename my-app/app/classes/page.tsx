export default function ClassesPage() {
    return (
      <main className="content">
        <h1>Classes</h1>
  
        <p className="dashboard-subtitle">
          Manage scheduled tutoring classes.
        </p>
  
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Tutor</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
  
            <tbody>
              <tr>
                <td>Samuel Abebe</td>
                <td>Abel Mekonnen</td>
                <td>Mathematics</td>
                <td>Monday</td>
                <td>4:00 PM</td>
              </tr>
  
              <tr>
                <td>Hana Tesfaye</td>
                <td>Meron Alemu</td>
                <td>English</td>
                <td>Tuesday</td>
                <td>5:00 PM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    );
  }