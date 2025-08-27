import React from 'react';
import SummaryCards from '@/components/dashboard/SummaryCards';
import CategoryBreakdown from '@/components/dashboard/CategoryBreakdown';
import SpendingChart from '@/components/dashboard/SpendingChart';
import RecentExpenses from '@/components/dashboard/RecentExpenses';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your spending habits and recent expenses</p>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SpendingChart />
        <CategoryBreakdown />
      </div>

      <RecentExpenses />
    </div>
  );
}
