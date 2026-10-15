import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  ClipboardList,
  CreditCard,
  House,
  Settings,
  UsersRound,
  GraduationCap,
} from "lucide-react";

interface SidebarProps { isOpen: boolean; }

export default function Sidebar({ isOpen }: SidebarProps) {
  const links = [
    { href: "/", label: "Dashboard", icon: House },
    { href: "/students", label: "Students", icon: UsersRound },
    { href: "/tutors", label: "Tutors", icon: GraduationCap },
    { href: "/applications", label: "Applications", icon: ClipboardList },
    { href: "/classes", label: "Classes", icon: BookOpen },
    { href: "/payments", label: "Payments", icon: CreditCard },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className={`sidebar${isOpen ? "" : " closed"}`}>
      <div className="sidebar-brand">
        <Image
          src="/logoex.jpg"
          alt=""
          aria-hidden="true"
          width={40}
          height={40}
          className="sidebar-brand-logo"
        />
        <span className="sidebar-brand-label">Excellence Tutor</span>
      </div>
      
      <nav>
        {links.map(({ href, label, icon: Icon }) => (
          <Link href={href} key={href} aria-label={label} title={label}>
            <Icon aria-hidden="true" size={20} />
            <span className="sidebar-label">{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}