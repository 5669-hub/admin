export default function ApplicationsPage() {
    return (
      <main className="content">
        <h1>Applications</h1>
  
        <p className="dashboard-subtitle">
          Review student tutoring applications.
        </p>
  
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Subject</th>
                <th>Grade</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
  
            <tbody>
              <tr>
                <td>Sarah Alemu</td>
                <td>Mathematics</td>
                <td>Grade 8</td>
                <td>
                  <span className="status pending">Pending</span>
                </td>
                <td>
                  <button className="small-button">Review</button>
                </td>
              </tr>
  
              <tr>
                <td>Michael Abebe</td>
                <td>Programming</td>
                <td>Grade 11</td>
                <td>
                  <span className="status approved">Approved</span>
                </td>
                <td>
                  <button className="small-button">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    );
  }