import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from './AuthContext';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchExpenses = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await api.get('/expenses');
      setExpenses(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [user]);

  const addExpense = async (expenseData) => {
    const res = await api.post('/expenses', expenseData);
    setExpenses([res.data, ...expenses]);
  };

  const deleteExpense = async (id) => {
    await api.delete(`/expenses/${id}`);
    setExpenses(expenses.filter((exp) => exp._id !== id));
  };

  const updateExpense = async (id, expenseData) => {
    const res = await api.put(`/expenses/${id}`, expenseData);
    setExpenses(expenses.map((exp) => (exp._id === id ? res.data : exp)));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, loading, addExpense, deleteExpense, updateExpense, fetchExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};
