import { NavLink, Outlet } from 'react-router';

export default function Layout() {
  const setActiveStyle = ({ isActive }) => ({
    color: isActive ? '#0056b3' : '#333',
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: 'none',
    borderBottom: isActive ? '2px solid #0056b3' : 'none',
    paddingBottom: '4px'
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <header>
        <nav style={{ display: 'flex', gap: '20px', padding: '10px 0', borderBottom: '1px solid #eee' }}>
          <NavLink to="/" style={setActiveStyle}>Головна</NavLink>
          <NavLink to="/about" style={setActiveStyle}>Про Iveco Eco</NavLink>
          <NavLink to="/contact" style={setActiveStyle}>Тест-драйв</NavLink>
        </nav>
      </header>
      <main style={{ padding: '20px 0' }}>
        <Outlet />
      </main>
    </div>
  );
}
