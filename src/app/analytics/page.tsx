import React from 'react';
import SummaryCards from '@/components/dashboard/SummaryCards';
import CategoryChart from '@/components/dashboard/CategoryChart';
import SpendingChart from '@/components/dashboard/SpendingChart';
import CategoryBreakdown from '@/components/dashboard/CategoryBreakdown';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">Analyze your spending patterns and financial insights</p>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SpendingChart />
        <CategoryChart />
      </div>

      <CategoryBreakdown />
    </div>
  );
}