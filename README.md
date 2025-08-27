# Expense Tracker - Modern Personal Finance Management

A comprehensive, modern expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS. This application helps users manage their personal finances with intuitive expense tracking, categorization, analytics, and visual insights.

## ✨ Features

### Core Functionality
- **Add Expenses**: Easy-to-use form with validation for adding new expenses
- **View & Manage**: Clean, organized list of all expenses with search and filtering
- **Categories**: Pre-defined categories (Food, Transportation, Entertainment, Shopping, Bills, Other)
- **Data Persistence**: Uses localStorage for demo purposes
- **Export**: CSV export functionality for data backup

### Analytics & Insights
- **Dashboard**: Overview with key metrics and recent expenses
- **Summary Cards**: Total expenses, monthly/weekly totals, and top spending category
- **Visual Charts**: 
  - Monthly spending trend line chart
  - Category distribution pie chart
  - Category breakdown with progress bars
- **Filtering**: Filter by date range, category, and search query

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with intuitive navigation
- **Real-time Updates**: Instant updates across all views when data changes
- **Form Validation**: Comprehensive input validation with helpful error messages
- **Visual Feedback**: Loading states, hover effects, and smooth transitions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 14**: React framework with App Router
- **React 18**: Component-based UI library
- **TypeScript**: Type-safe JavaScript

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **Recharts**: Responsive chart library for data visualization

### Development Tools
- **ESLint**: Code linting and quality checks
- **Turbopack**: Fast bundler for development

### Data Management
- **React Context**: State management for expense data
- **localStorage**: Client-side data persistence
- **date-fns**: Date manipulation and formatting

## 📱 Application Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard (home page)
│   ├── add-expense/       # Add new expense page
│   ├── expenses/          # View all expenses page
│   └── analytics/         # Analytics and insights page
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── expenses/          # Expense management components
│   ├── forms/            # Form components
│   ├── layout/           # Layout and navigation
│   └── ui/               # Reusable UI components
├── contexts/             # React Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
└── types/                # TypeScript type definitions
```

## 🎯 Key Components

### Dashboard
- **SummaryCards**: Key financial metrics
- **SpendingChart**: Monthly trend visualization
- **CategoryChart**: Pie chart of spending by category
- **CategoryBreakdown**: Detailed category analysis
- **RecentExpenses**: Latest expense entries

### Expense Management
- **ExpenseForm**: Add new expenses with validation
- **EditExpenseForm**: Modify existing expenses
- **ExpenseList**: View, search, filter, and manage expenses

### Navigation
- **Header**: Main navigation with responsive mobile menu
- **Layout**: Consistent page layout wrapper

## 💾 Data Management

### Expense Data Structure
```typescript
interface Expense {
  id: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  date: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}
```

### Categories
- Food
- Transportation
- Entertainment
- Shopping
- Bills
- Other

### Storage
- Data is stored locally using browser's localStorage
- Automatic save/load on application start
- Data persists between browser sessions

## 🔍 Features Guide

### Adding Expenses
1. Click "Add Expense" in navigation
2. Fill in amount, description, category, and date
3. Form validation ensures data quality
4. Automatically saves to localStorage

### Viewing Expenses
1. Navigate to "Expenses" page
2. Use search bar to find specific expenses
3. Apply filters by category and date range
4. Click edit/delete buttons for expense management

### Analytics Dashboard
1. View summary cards with key metrics
2. Analyze spending trends with interactive charts
3. Understand category distribution
4. Export data as CSV for external analysis

### Data Export
1. Go to Expenses page
2. Click "Export CSV" button
3. Downloads file with all expense data
4. Includes date, description, category, and amount

## 🎨 Design Principles

- **Mobile-First**: Responsive design that works on all devices
- **Accessibility**: Semantic HTML and keyboard navigation
- **Performance**: Optimized components and lazy loading
- **Usability**: Intuitive interface with clear visual hierarchy
- **Consistency**: Unified color scheme and typography

## 🔧 Customization

### Adding New Categories
Update the `ExpenseCategory` type in `src/types/expense.ts`:
```typescript
export type ExpenseCategory = 
  | 'Food' 
  | 'Transportation' 
  | 'Entertainment' 
  | 'Shopping' 
  | 'Bills' 
  | 'Other'
  | 'YourNewCategory'; // Add your category here
```

### Styling Changes
- Modify Tailwind classes in components
- Update color scheme in component files
- Customize charts in dashboard components

### Data Persistence
To use a real database instead of localStorage:
1. Replace storage utilities in `src/lib/storage.ts`
2. Update context methods in `src/contexts/ExpenseContext.tsx`
3. Add API routes for server communication

## 🐛 Troubleshooting

### Common Issues

**Application won't start:**
- Ensure Node.js 18+ is installed
- Run `npm install` to install dependencies
- Check for port conflicts (default: 3000)

**Data not persisting:**
- Check browser localStorage permissions
- Clear browser cache and try again
- Ensure localStorage is supported

**Charts not displaying:**
- Ensure you have expense data
- Check browser console for errors
- Verify Recharts dependency is installed

## 🤝 Testing Instructions

### Manual Testing Steps

1. **Start the Application**
   ```bash
   npm run dev
   ```

2. **Test Dashboard**
   - Open http://localhost:3000
   - Verify dashboard loads with empty state
   - Check responsive design on different screen sizes

3. **Test Adding Expenses**
   - Navigate to "Add Expense"
   - Test form validation (try invalid inputs)
   - Add several expenses with different categories
   - Verify expenses appear in dashboard

4. **Test Expense Management**
   - Go to "Expenses" page
   - Test search functionality
   - Test category and date filters
   - Edit an expense (click edit button)
   - Delete an expense (click delete button)
   - Export expenses to CSV

5. **Test Analytics**
   - Navigate to "Analytics" page
   - Verify charts display expense data
   - Check category breakdown
   - Test mobile responsiveness

6. **Test Data Persistence**
   - Add some expenses
   - Refresh the page
   - Verify data persists
   - Open new browser tab - data should be there

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
