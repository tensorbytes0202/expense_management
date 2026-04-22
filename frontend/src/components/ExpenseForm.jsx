import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { PlusCircle, DollarSign, Tag, Calendar } from 'lucide-react';

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });
  const { addExpense } = useContext(ExpenseContext);

  const { title, amount, category, date } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await addExpense(formData);
    setFormData({ title: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <PlusCircle size={24} color="var(--primary)" />
        Add New Expense
      </h3>
      <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Title</label>
          <input type="text" name="title" value={title} onChange={onChange} placeholder="What did you spend on?" required />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Amount</label>
          <div style={{ position: 'relative' }}>
            <DollarSign size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="number" name="amount" value={amount} onChange={onChange} placeholder="0.00" required style={{ paddingLeft: '2rem', width: '100%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Category</label>
          <select name="category" value={category} onChange={onChange} style={{ width: '100%' }}>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Date</label>
          <input type="date" name="date" value={date} onChange={onChange} required style={{ width: '100%' }} />
        </div>
        <button type="submit" style={{ background: 'var(--primary)', color: 'white', padding: '0.75rem', height: '45px' }}>
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
