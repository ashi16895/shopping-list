# Shopping List Application

A clean, optimized shopping list application built with React, TypeScript, and Ant Design. Designed for simplicity and performance with static data management, advanced filtering, sorting, reporting, and data export capabilities.

## Features

### Core Functionality
- **Add Items**: Clean form to add items with categories, subcategories, quantities, prices, and dates
- **Multi-Currency Support**: USD and INR currency selection with automatic conversion
- **Smart Categories**: Dynamic subcategory selection based on main category
- **Item Management**: View all items in a sortable, filterable table
- **New Item Indicator**: Recently added items display a "New" badge for 5 seconds

### Advanced Features
- **Real-time Search**: Instant search and category-based filtering
- **Sortable Columns**: Click any column header to sort data
- **Data Export**: Export filtered data as CSV or JSON formats
- **Sales Reporting**: Visual analytics with charts and key spending metrics
- **Dark Mode**: Complete theme switching support
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Performance & Optimization
- **Static Data Optimized**: Instant responses with no loading delays
- **Context API**: Efficient global state management
- **Memoized Components**: Optimized re-renders for better performance
- **Simple Error Handling**: Lightweight error management for static operations

## Tech Stack

- **Frontend Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 7.0.4
- **UI Library**: Ant Design 5.26.7
- **Styling**: Tailwind CSS 3.4.1 + Custom CSS
- **State Management**: React Context API (Shopping, Theme, Currency)
- **Charts**: Chart.js with react-chartjs-2
- **Date Handling**: Day.js
- **Unique IDs**: UUID for data management
- **Icons**: Ant Design Icons

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shopping-list
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

##  Usage

### Adding Items
1. Fill out the "Add New Item" form with all required fields
2. Select a category first, then choose from available subcategories
3. Enter quantity and price (with USD/INR currency selection)
4. Select a date (defaults to today)
5. Click "Add Item" to instantly add to your list

### Managing Your List
- **Search**: Use the search bar to find specific items by name
- **Filter**: Select categories and subcategories to narrow down results
- **Sort**: Click column headers to sort by name, price, quantity, or date
- **Export**: Use the "Export Data" button to download as CSV or JSON
- **Currency**: Switch between USD ($) and INR (₹) with automatic conversion

### Viewing Reports
1. Click "View Reports" in the title area
2. View summary metrics: Total Spending, Highest Cost Item, Average Cost
3. Analyze spending patterns with the interactive bar chart by category
4. All values automatically adjust to your selected currency

### Theme Switching
- Use the toggle switch in the header to switch between light and dark modes
- All components adapt seamlessly to the selected theme

## Reporting Features

The application provides comprehensive analytics:

### Summary Cards
- **Total Spending**: Sum of all item totals
- **Highest Cost Item**: Most expensive single item
- **Average Cost**: Average price per item

### Visual Analytics
- **Category Breakdown**: Bar chart showing spending by category
- **Interactive Charts**: Hover for detailed information
- **Responsive Charts**: Adapts to screen size

## Design Philosophy

### User Interface
- **Clean & Modern**: Minimalist design focusing on usability and performance
- **Consistent**: Uniform spacing, typography, and color schemes
- **Full Width Layout**: Components utilize complete available space
- **No Loading States**: Instant responses optimized for static data

### Theme System
- **Light Theme**: Clean whites and grays for daytime use
- **Dark Theme**: Easy-on-the-eyes dark grays for low-light environments
- **CSS Variables**: Consistent theming across all components
- **Smooth Transitions**: 200ms transition effects between themes

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Improved layouts for medium screens
- **Desktop Enhancement**: Full feature access on large screens

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **JavaScript**: ES2018+ features used

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── Header.tsx      # Theme toggle and navigation
│   ├── TitleRow.tsx    # App title and reports button
│   ├── ItemForm.tsx    # Add item form with currency support
│   ├── Filters.tsx     # Search and filter controls
│   ├── ShoppingTable.tsx # Main data table with infinite scroll
│   ├── ExportButton.tsx # Data export functionality
│   ├── ReportModal.tsx  # Analytics modal with charts
│   ├── PriceInput.tsx  # Custom price input with currency
│   └── ErrorBoundary.tsx # Simple error boundary
├── context/            # Global state management
│   ├── ShoppingContext.tsx # Main shopping state
│   ├── ThemeContext.tsx    # Theme management
│   └── CurrencyContext.tsx # Currency conversion
├── constants/          # Configuration and static data
│   ├── index.ts        # App configuration constants
│   └── categories.ts   # Category and subcategory data
├── types/             # TypeScript type definitions
│   └── index.ts
├── hooks/             # Custom hooks
│   └── useErrorHandler.ts # Simplified error handling
├── utils/             # Utility functions
│   └── fileUtils.ts   # Export functionality
├── data/              # Data management
│   ├── dataLoader.ts  # Mock data loader
│   └── mock-data.json # Static shopping data
├── assets/            # Static assets
└── App.tsx           # Main application component
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Dependencies
```json
{
  "react": "^19.1.0",
  "typescript": "^5.6.2",
  "antd": "^5.26.7",
  "tailwindcss": "^3.4.1",
  "chart.js": "latest",
  "react-chartjs-2": "latest",
  "dayjs": "latest",
  "uuid": "latest",
  "vite": "^7.0.6"
}
```

## Features in Detail

### Context API Implementation
- **Shopping Context**: Manages items, filters, and sorting state
- **Theme Context**: Handles light/dark mode switching
- **Currency Context**: Manages USD/INR conversion with live rates
- **Memoized Operations**: All context operations are optimized for performance

### Data Export System
- **CSV Format**: Standard comma-separated values for spreadsheet import
- **JSON Format**: Clean structured data for programmatic use
- **Filtered Export**: Only exports currently visible/filtered items
- **Automatic Download**: Browser-native file download with timestamps

### Currency System
- **Multi-Currency**: USD ($) and INR (₹) support
- **Live Conversion**: Automatic price conversion with exchange rates
- **Persistent Selection**: Currency choice maintained across components
- **Formatted Display**: Proper currency symbols and decimal formatting

### Category System
- **Rich Categories**: Multiple main categories with detailed subcategories
- **Dynamic Loading**: Subcategories update based on main category selection
- **Consistent Data**: Categories align with mock data structure

## Future Enhancements

- **Data Persistence**: Local storage or database integration
- **More Currencies**: Extended currency support beyond USD/INR
- **Item Images**: Photo upload and image management
- **Multiple Lists**: Support for different shopping lists
- **Price History**: Track price changes over time
- **Advanced Filtering**: Date range and price range filters
- **Bulk Operations**: Multi-select for batch actions
- **Keyboard Shortcuts**: Power user productivity features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Architecture Highlights

- **Static Data Optimized**: No loading states or spinners for instant UX
- **Simplified Error Handling**: Lightweight error management without over-engineering  
- **Performance First**: Memoized components and optimized re-renders
- **Type Safety**: 100% TypeScript coverage with strict type checking
- **Clean Code**: Follows React best practices and modern patterns

## Acknowledgments

- **Ant Design** for the comprehensive UI component library
- **Chart.js** for powerful charting capabilities  
- **Tailwind CSS** for utility-first styling
- **React Team** for the amazing framework
- **Vite** for lightning-fast development experience

## Live Demo

Check out the live demo here: [Shopping List App](https://shopping-list-nine-lyart.vercel.app/)

