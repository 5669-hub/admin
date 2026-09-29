export default function TutorsPage() {
    return (
      <main className="content">
        <h1>Tutors</h1>
  
        <p className="dashboard-subtitle">
          Manage tutors working with Excellence Tutor.
        </p>
  
        <div className="page-header">
          <h2>Tutor List</h2>
          <button className="primary-button">+ Add Tutor</button>
        </div>
  
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Experience</th>
                <th>Status</th>
              </tr>
            </thead>
  
            <tbody>
              <tr>
                <td>Abel Mekonnen</td>
                <td>Mathematics</td>
                <td>4 years</td>
                <td>
                  <span className="status approved">Active</span>
                </td>
              </tr>
  
              <tr>
                <td>Meron Alemu</td>
                <td>English</td>
                <td>3 years</td>
                <td>
                  <span className="status approved">Active</span>
                </td>
              </tr>
  
              <tr>
                <td>Daniel Girma</td>
                <td>Physics</td>
                <td>5 years</td>
                <td>
                  <span className="status pending">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    );
  }