import { Expense } from '@/types';

const STORAGE_KEY = 'expense-tracker-data';

export const storage = {
  getExpenses: (): Expense[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading expenses from localStorage:', error);
      return [];
    }
  },

  saveExpenses: (expenses: Expense[]): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expenses to localStorage:', error);
    }
  },

  addExpense: (expense: Expense): void => {
    const expenses = storage.getExpenses();
    const updatedExpenses = [...expenses, expense];
    storage.saveExpenses(updatedExpenses);
  },

  updateExpense: (id: string, updatedExpense: Partial<Expense>): void => {
    const expenses = storage.getExpenses();
    const updatedExpenses = expenses.map(expense =>
      expense.id === id 
        ? { ...expense, ...updatedExpense, updatedAt: new Date().toISOString() }
        : expense
    );
    storage.saveExpenses(updatedExpenses);
  },

  deleteExpense: (id: string): void => {
    const expenses = storage.getExpenses();
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    storage.saveExpenses(updatedExpenses);
  },

  clearAllExpenses: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }
};