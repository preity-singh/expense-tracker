'use client';

import React, { useState, useMemo } from 'react';
import { useExpenses } from '@/contexts/ExpenseContext';
import { ExpenseFilters, ExpenseCategory, Expense } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Search, Filter, Trash2, Edit, Download } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import EditExpenseForm from '@/components/forms/EditExpenseForm';

const ExpenseList = () => {
  const { expenses, deleteExpense, exportToCsv, getFilteredExpenses } = useExpenses();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | 'All'>('All');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const categories: (ExpenseCategory | 'All')[] = [
    'All',
    'Food',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Bills',
    'Other'
  ];

  const filters: ExpenseFilters = useMemo(() => ({
    category: selectedCategory,
    startDate: dateRange.startDate || undefined,
    endDate: dateRange.endDate || undefined,
    searchQuery: searchQuery || undefined,
  }), [selectedCategory, dateRange, searchQuery]);

  const filteredExpenses = useMemo(() => {
    return getFilteredExpenses(filters);
  }, [getFilteredExpenses, filters]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setDateRange({ startDate: '', endDate: '' });
  };

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

  if (expenses.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="text-gray-500">
            <p className="text-lg mb-2">No expenses yet</p>
            <p>Start tracking your expenses by adding your first expense!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (editingExpense) {
    return (
      <EditExpenseForm
        expense={editingExpense}
        onCancel={() => setEditingExpense(null)}
        onSuccess={() => setEditingExpense(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Expenses</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={exportToCsv}
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {showFilters && (
              <div className="p-4 bg-gray-50 rounded-md space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as ExpenseCategory | 'All')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.startDate}
                      onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.endDate}
                      onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {filteredExpenses.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No expenses match your filters
                </div>
              ) : (
                filteredExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {expense.description}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}
                            >
                              {expense.category}
                            </span>
                            <span className="text-sm text-gray-500">
                              {formatDate(expense.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold text-gray-900">
                        {formatCurrency(expense.amount)}
                      </span>
                      
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingExpense(expense)}
                          className="p-2"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(expense.id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseList;