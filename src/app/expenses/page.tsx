import React from 'react';
import ExpenseList from '@/components/expenses/ExpenseList';

export default function ExpensesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Expenses</h1>
        <p className="text-gray-600">View, search, and manage your expenses</p>
      </div>

      <ExpenseList />
    </div>
  );
}