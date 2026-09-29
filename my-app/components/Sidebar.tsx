import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Excellence Tutor</h2>

      <nav>
        <Link href="/">Dashboard</Link>
        <Link href="/students">Students</Link>
        <Link href="/tutors">Tutors</Link>
        <Link href="/applications">Applications</Link>
        <Link href="/classes">Classes</Link>
        <Link href="/payments">Payments</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </aside>
  );
}