import React, { useContext, useMemo, useState } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import ExpenseForm from './ExpenseForm';
import { Trash2, TrendingDown, TrendingUp, PieChart as PieIcon, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Dashboard = () => {
  const { expenses, loading, deleteExpense } = useContext(ExpenseContext);
  const [filter, setFilter] = useState('All');

  const filteredExpenses = useMemo(() => {
    if (filter === 'All') return expenses;
    return expenses.filter(exp => exp.category === filter);
  }, [expenses, filter]);

  const total = useMemo(() => expenses.reduce((acc, curr) => acc + curr.amount, 0), [expenses]);

  const categoryData = useMemo(() => {
    const data = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});
    return Object.keys(data).map(key => ({ name: key, value: data[key] }));
  }, [expenses]);

  const COLORS = ['#6366f1', '#f472b6', '#22d3ee', '#4ade80', '#f87171'];

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading Dashboard...</div>;

  return (
    <div className="animate-fade">
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Overview of your spending habits</p>
        </div>
        <div className="glass" style={{ padding: '1rem 2rem', textAlign: 'right', borderLeft: '4px solid var(--primary)' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Spent</p>
          <h2 style={{ fontSize: '2rem', color: 'var(--accent-pink)' }}>${total.toLocaleString()}</h2>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div className="glass" style={{ padding: '2rem', height: '400px' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PieIcon size={20} color="var(--primary)" />
            By Category
          </h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: 'var(--bg-dark)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                itemStyle={{ color: 'white' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={20} color="var(--primary)" />
            Recent Activity
          </h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            <AnimatePresence>
              {expenses.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No expenses found. Add some!</p>
              ) : (
                expenses.slice(0, 5).map((exp) => (
                  <motion.div 
                    key={exp._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}
                  >
                    <div>
                      <h4 style={{ fontWeight: '600' }}>{exp.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(exp.date).toLocaleDateString()} • {exp.category}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontWeight: '700', color: 'var(--accent-red)' }}>-${exp.amount}</span>
                      <button onClick={() => deleteExpense(exp._id)} style={{ background: 'transparent', color: 'var(--text-muted)' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ExpenseForm />

      <div className="glass" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0 }}>All Transactions</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Filter size={18} color="var(--text-muted)" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
            >
              <option value="All">All Categories</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <th style={{ padding: '1rem' }}>Title</th>
              <th style={{ padding: '1rem' }}>Category</th>
              <th style={{ padding: '1rem' }}>Date</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Amount</th>
              <th style={{ padding: '1rem' }}></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode='popLayout'>
              {filteredExpenses.map((exp) => (
                <motion.tr 
                  layout
                  key={exp._id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ borderTop: '1px solid var(--glass-border)' }}
                >
                  <td style={{ padding: '1rem' }}>{exp.title}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
                      {exp.category}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{new Date(exp.date).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>${exp.amount}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button onClick={() => deleteExpense(exp._id)} style={{ background: 'transparent', color: 'var(--text-muted)' }}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
