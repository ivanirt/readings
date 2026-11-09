import { NavLink, Outlet, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Book Reading" },
  { to: "/awos", label: "Awos" },
  { to: "/schedule", label: "Weekly Schedule" },
  { to: "/portal", label: "Awo Portal" },
];

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="shell">
      <header className="topbar">
        <div className="topbar-inner">
          <NavLink to="/" className="brand">
            <span className="brand-mark" aria-hidden />
            <span>
              Awo Ifá
              <small>Consecrated Oracle</small>
            </span>
          </NavLink>
          <nav className="nav">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive || (link.to === "/" && pathname === "/")
                    ? "nav-link is-active"
                    : "nav-link"
                }
                end={link.to === "/"}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="topbar-end">
            <span className="locale">EN · USD</span>
            <NavLink to="/" className="btn btn-dark">
              Schedule Session
            </NavLink>
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="site-footer">
        <div className="footer-inner">
          <p>© 2026 Awo Ifá Sanctuary. Canonical lineage Ifá. All rights reserved.</p>
          <div className="footer-links">
            <span>Canonical Protocol</span>
            <span>Privacy & Non-recording</span>
            <span>Sacred Offering</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
