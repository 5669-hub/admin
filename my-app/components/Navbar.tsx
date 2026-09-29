
interface NavbarProps { onMenuClick: () => void; }

export default function Navbar({onMenuClick}: NavbarProps) {
    return (
      <header className="navbar">
        <button className="menu-button" onClick={onMenuClick}>
          ☰
        </button>
        <h1>Dashboard</h1>
  
        <div className="admin-info">
          <span>Admin</span>
          <span>👤</span>
        </div>
      </header>
    );
  }