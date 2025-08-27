export type ExpenseCategory = 
  | 'Food' 
  | 'Transportation' 
  | 'Entertainment' 
  | 'Shopping' 
  | 'Bills' 
  | 'Other';

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  date: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface ExpenseFormData {
  amount: string;
  description: string;
  category: ExpenseCategory;
  date: string;
}

export interface ExpenseFilters {
  category?: ExpenseCategory | 'All';
  startDate?: string;
  endDate?: string;
  searchQuery?: string;
}

export interface ExpenseSummary {
  totalExpenses: number;
  monthlyTotal: number;
  weeklyTotal: number;
  topCategory: {
    category: ExpenseCategory;
    amount: number;
  };
  categoryTotals: Record<ExpenseCategory, number>;
  monthlyTrend: Array<{
    month: string;
    amount: number;
  }>;
}

export interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  getExpenseSummary: () => ExpenseSummary;
  getFilteredExpenses: (filters: ExpenseFilters) => Expense[];
  exportToCsv: () => void;
}