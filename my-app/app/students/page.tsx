export default function StudentsPage() {
    return (
      <main className="content">
        <h1>Students</h1>
        <p className="dashboard-subtitle">
          Manage all registered students.
        </p>
  
        <div className="page-header">
          <h2>Student List</h2>
          <button className="primary-button">+ Add Student</button>
        </div>
  
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade</th>
                <th>Subject</th>
                <th>Parent Contact</th>
              </tr>
            </thead>
  
            <tbody>
              <tr>
                <td>Samuel Abebe</td>
                <td>Grade 8</td>
                <td>Mathematics</td>
                <td>0911 234 567</td>
              </tr>
  
              <tr>
                <td>Hana Tesfaye</td>
                <td>Grade 6</td>
                <td>English</td>
                <td>0922 345 678</td>
              </tr>
  
              <tr>
                <td>Dawit Bekele</td>
                <td>Grade 10</td>
                <td>Physics</td>
                <td>0933 456 789</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    );
  }