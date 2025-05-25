import Link from 'next/link';
import { useRouter } from 'next/router';

function Layout({ children }) {
  const router = useRouter();

  const navItems = [
    { href: '/', label: 'Домашка', icon: '📚' },
    { href: '/schedule', label: 'Расписание', icon: '📅' },
    { href: '/ai', label: 'AI', icon: '🤖' },
    { href: '/duty', label: 'Дежурные', icon: '👥' },
  ];

  return (
    <div id="app">
      <div className="main-app">
        <header className="user-header">
          <div className="user-info">
            <div className="user-avatar" id="user-avatar"></div>
            <div className="user-details">
              <div className="username" id="username"></div>
              <div className="user-stats" id="user-stats"></div>
            </div>
          </div>
        </header>
        <div className="content">{children}</div>
        <nav className="bottom-nav">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <button className={`nav-item ${router.pathname === item.href ? 'active' : ''}`}>
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Layout;
