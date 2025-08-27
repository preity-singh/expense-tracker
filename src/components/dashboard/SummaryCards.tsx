'use client';

import React from 'react';
import { useExpenses } from '@/contexts/ExpenseContext';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import { DollarSign, Calendar, TrendingUp, Tag } from 'lucide-react';

const SummaryCards = () => {
  const { getExpenseSummary } = useExpenses();
  const summary = getExpenseSummary();

  const cards = [
    {
      title: 'Total Expenses',
      value: formatCurrency(summary.totalExpenses),
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'This Month',
      value: formatCurrency(summary.monthlyTotal),
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'This Week',
      value: formatCurrency(summary.weeklyTotal),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Top Category',
      value: summary.topCategory.category,
      subtitle: formatCurrency(summary.topCategory.amount),
      icon: Tag,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${card.bgColor} mr-4`}>
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </p>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-gray-900">
                      {card.value}
                    </span>
                    {card.subtitle && (
                      <span className="text-sm text-gray-500">
                        {card.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SummaryCards;