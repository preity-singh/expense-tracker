'use client';

import React from 'react';
import Link from 'next/link';
import { useExpenses } from '@/contexts/ExpenseContext';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { ArrowRight } from 'lucide-react';
import { ExpenseCategory } from '@/types';

const RecentExpenses = () => {
  const { expenses } = useExpenses();

  const recentExpenses = expenses.slice(0, 5);

  const getCategoryColor = (category: ExpenseCategory) => {
    const colors = {
      Food: 'bg-green-100 text-green-800',
      Transportation: 'bg-blue-100 text-blue-800',
      Entertainment: 'bg-purple-100 text-purple-800',
      Shopping: 'bg-pink-100 text-pink-800',
      Bills: 'bg-red-100 text-red-800',
      Other: 'bg-gray-100 text-gray-800',
    };
    return colors[category];
  };

  if (recentExpenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No expenses yet</p>
            <Link
              href="/add-expense"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add your first expense
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Expenses</CardTitle>
          <Link
            href="/expenses"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
          >
            View all
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {expense.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}
                      >
                        {expense.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(expense.date)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(expense.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentExpenses;