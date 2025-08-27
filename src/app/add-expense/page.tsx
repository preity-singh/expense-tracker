import React from 'react';
import ExpenseForm from '@/components/forms/ExpenseForm';

export default function AddExpensePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Expense</h1>
        <p className="text-gray-600">Track your spending by adding a new expense</p>
      </div>

      <ExpenseForm />
    </div>
  );
}