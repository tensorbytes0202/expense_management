import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Wallet, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'white' }}>
        <Wallet size={32} color="var(--primary)" />
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(to right, var(--primary), var(--accent-pink))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Expensy
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {user ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <UserIcon size={20} />
              <span>{user.name}</span>
            </div>
            <button onClick={handleLogout} className="glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(248, 113, 113, 0.1)', color: 'var(--accent-red)', border: '1px solid rgba(248, 113, 113, 0.2)' }}>
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/login" style={{ textDecoration: 'none', color: 'var(--text-muted)' }}>Login</Link>
            <Link to="/register" className="glass" style={{ textDecoration: 'none', color: 'white', padding: '0.5rem 1.5rem', background: 'var(--primary)' }}>Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
