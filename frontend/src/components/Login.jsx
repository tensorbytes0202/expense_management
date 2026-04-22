import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to login');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass" 
      style={{ maxWidth: '400px', margin: '4rem auto', padding: '2.5rem' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <LogIn size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
        <p style={{ color: 'var(--text-muted)' }}>Login to manage your expenses</p>
      </div>

      {error && <div style={{ background: 'rgba(248, 113, 113, 0.1)', color: 'var(--accent-red)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center', border: '1px solid rgba(248, 113, 113, 0.2)' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ position: 'relative' }}>
          <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', paddingLeft: '2.75rem' }}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', paddingLeft: '2.75rem' }}
          />
        </div>
        <button type="submit" style={{ background: 'var(--primary)', color: 'white', padding: '1rem', fontSize: '1rem', marginTop: '1rem', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)' }}>
          Sign In
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Register</Link>
      </p>
    </motion.div>
  );
};

export default Login;
