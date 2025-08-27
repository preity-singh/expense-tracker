'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Expense, 
  ExpenseContextType, 
  ExpenseFilters, 
  ExpenseSummary 
} from '@/types';
import { storage } from '@/lib/storage';
import { 
  generateId, 
  getMonthlyTotal, 
  getWeeklyTotal, 
  getCategoryTotals, 
  getTopCategory, 
  exportToCsv 
} from '@/lib/utils';
import { format, parseISO, startOfMonth, subMonths, isWithinInterval } from 'date-fns';

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

interface ExpenseProviderProps {
  children: React.ReactNode;
}

export const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedExpenses = storage.getExpenses();
      setExpenses(savedExpenses);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      storage.saveExpenses(expenses);
    }
  }, [expenses, isLoaded]);

  const addExpense = useCallback((expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newExpense: Expense = {
      ...expenseData,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };

    setExpenses(prev => [newExpense, ...prev]);
  }, []);

  const updateExpense = useCallback((id: string, updatedData: Partial<Expense>) => {
    setExpenses(prev =>
      prev.map(expense =>
        expense.id === id
          ? { ...expense, ...updatedData, updatedAt: new Date().toISOString() }
          : expense
      )
    );
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  }, []);

  const getFilteredExpenses = useCallback((filters: ExpenseFilters): Expense[] => {
    return expenses.filter(expense => {
      if (filters.category && filters.category !== 'All' && expense.category !== filters.category) {
        return false;
      }

      if (filters.startDate && filters.endDate) {
        const expenseDate = parseISO(expense.date);
        const start = parseISO(filters.startDate);
        const end = parseISO(filters.endDate);
        if (!isWithinInterval(expenseDate, { start, end })) {
          return false;
        }
      }

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          expense.description.toLowerCase().includes(query) ||
          expense.category.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [expenses]);

  const getExpenseSummary = useCallback((): ExpenseSummary => {
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const monthlyTotal = getMonthlyTotal(expenses);
    const weeklyTotal = getWeeklyTotal(expenses);
    const topCategory = getTopCategory(expenses);
    const categoryTotals = getCategoryTotals(expenses);

    const monthlyTrend = [];
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const monthStart = startOfMonth(date);
      const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
      
      const monthlyAmount = expenses
        .filter(expense => {
          const expenseDate = parseISO(expense.date);
          return isWithinInterval(expenseDate, { start: monthStart, end: monthEnd });
        })
        .reduce((total, expense) => total + expense.amount, 0);

      monthlyTrend.push({
        month: format(date, 'MMM yyyy'),
        amount: monthlyAmount,
      });
    }

    return {
      totalExpenses,
      monthlyTotal,
      weeklyTotal,
      topCategory,
      categoryTotals,
      monthlyTrend,
    };
  }, [expenses]);

  const handleExportToCsv = useCallback(() => {
    exportToCsv(expenses);
  }, [expenses]);

  const value: ExpenseContextType = {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenseSummary,
    getFilteredExpenses,
    exportToCsv: handleExportToCsv,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};