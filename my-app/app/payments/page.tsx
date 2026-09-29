export default function PaymentsPage() {
    return (
      <main className="content">
        <h1>Payments</h1>
  
        <p className="dashboard-subtitle">
          Track tutoring payments and transactions.
        </p>
  
        <div className="stats-grid">
          <div className="stat-card">
            <p>Total Revenue</p>
            <h3>45,000 ETB</h3>
          </div>
  
          <div className="stat-card">
            <p>Pending Payments</p>
            <h3>8</h3>
          </div>
        </div>
      </main>
    );
  }