import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <GraduationCap aria-hidden="true" size={28} />
          <span>Excellence Tutor</span>
        </div>

        <h1>Welcome back</h1>
        <p className="login-description">
          Sign in to access your admin dashboard.
        </p>

        <div className="login-fields">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="admin@example.com"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
          />

          <button type="button">Sign in</button>
        </div>

        <Link className="login-back-link" href="/">
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
