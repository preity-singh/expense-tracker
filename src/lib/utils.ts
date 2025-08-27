import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { Expense, ExpenseCategory } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy');
  } catch {
    return dateString;
  }
};

export const formatDateForInput = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'yyyy-MM-dd');
  } catch {
    return '';
  }
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

export const getMonthlyTotal = (expenses: Expense[]): number => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  return expenses
    .filter(expense => {
      const expenseDate = parseISO(expense.date);
      return isWithinInterval(expenseDate, { start: monthStart, end: monthEnd });
    })
    .reduce((total, expense) => total + expense.amount, 0);
};

export const getWeeklyTotal = (expenses: Expense[]): number => {
  const now = new Date();
  const weekStart = startOfWeek(now);
  const weekEnd = endOfWeek(now);

  return expenses
    .filter(expense => {
      const expenseDate = parseISO(expense.date);
      return isWithinInterval(expenseDate, { start: weekStart, end: weekEnd });
    })
    .reduce((total, expense) => total + expense.amount, 0);
};

export const getCategoryTotals = (expenses: Expense[]): Record<ExpenseCategory, number> => {
  const categories: ExpenseCategory[] = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other'];
  
  return categories.reduce((totals, category) => {
    totals[category] = expenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
    return totals;
  }, {} as Record<ExpenseCategory, number>);
};

export const getTopCategory = (expenses: Expense[]): { category: ExpenseCategory; amount: number } => {
  const categoryTotals = getCategoryTotals(expenses);
  const topEntry = Object.entries(categoryTotals).reduce(
    (max, [category, amount]) => (amount > max.amount ? { category: category as ExpenseCategory, amount } : max),
    { category: 'Other' as ExpenseCategory, amount: 0 }
  );

  return { category: topEntry.category, amount: topEntry.amount };
};

export const exportToCsv = (expenses: Expense[]): void => {
  const headers = ['Date', 'Description', 'Category', 'Amount'];
  const csvContent = [
    headers.join(','),
    ...expenses.map(expense => [
      formatDate(expense.date),
      `"${expense.description.replace(/"/g, '""')}"`,
      expense.category,
      expense.amount.toFixed(2)
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `expenses-${format(new Date(), 'yyyy-MM-dd')}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};