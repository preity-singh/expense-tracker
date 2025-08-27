'use client';

import React from 'react';
import { useExpenses } from '@/contexts/ExpenseContext';
import { formatCurrency } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { ExpenseCategory } from '@/types';

const CategoryBreakdown = () => {
  const { getExpenseSummary } = useExpenses();
  const summary = getExpenseSummary();

  const getCategoryColor = (category: ExpenseCategory) => {
    const colors = {
      Food: 'bg-green-500',
      Transportation: 'bg-blue-500',
      Entertainment: 'bg-purple-500',
      Shopping: 'bg-pink-500',
      Bills: 'bg-red-500',
      Other: 'bg-gray-500',
    };
    return colors[category];
  };

  const totalAmount = Object.values(summary.categoryTotals).reduce((sum, amount) => sum + amount, 0);

  const categoryData = Object.entries(summary.categoryTotals)
    .filter(([, amount]) => amount > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([category, amount]) => ({
      category: category as ExpenseCategory,
      amount,
      percentage: totalAmount > 0 ? (amount / totalAmount) * 100 : 0,
    }));

  if (categoryData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            No expenses to display
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categoryData.map(({ category, amount, percentage }) => (
            <div key={category} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{category}</span>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900">
                    {formatCurrency(amount)}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getCategoryColor(category)}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;