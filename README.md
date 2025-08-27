
# Stock Tracker App

## Overview
This Angular application allows users to search for stocks, view detailed information, and visualize historical price data using interactive charts. The app integrates with external APIs to fetch stock details and time series data (monthly, weekly, daily).

## Approach & Edge Cases
- **API Response Handling:** The app handles multiple API response formats (e.g., search results vs. global quote) using type guards and conditional rendering. This ensures robustness when the API returns different structures.
- **Chart Rendering:** Chart.js is used for data visualization. To avoid errors with multiple charts, each chart uses a unique canvas ID, and previous chart instances are destroyed before creating new ones.
- **Error Handling:** All API calls include error handling to display errors in the console and prevent UI crashes. The app checks for missing or malformed data before rendering components.
- **Responsive Design:** The charts container uses CSS Grid for a responsive layout, ensuring charts display well on various screen sizes.
- **Performance:** RxJS operators like `debounceTime` and `distinctUntilChanged` are used to optimize search input and reduce unnecessary API calls.

## Technical Details
- **Angular v15**
- **RxJS for reactive programming and API call management**
- **Chart.js for data visualization**
- **TypeScript for type safety and maintainability**
- **SCSS for styling and responsive design**

## Usage
1. Type a stock symbol in the search box to get suggestions.
2. Select a suggestion to view detailed stock info and historical charts.
3. The app displays monthly, weekly, and daily time series data in separate charts.

## Edge Case Examples
- If the API returns an unexpected format, the app will not crash and will log a warning.
- If a user selects a new stock, all charts and details update accordingly.
- If a chart is re-rendered, the previous instance is destroyed to avoid Chart.js canvas errors.

## File Structure
- `src/app/app.component.ts` – Main logic for search, selection, and API calls
- `src/app/app.component.html` – Main template, including charts and details
- `src/app/@components/stock-chart/stock-chart.component.ts` – Chart rendering logic
- `src/app/@components/stock-details/stock-details.component.ts` – Stock details display

## Further Improvements
- Add user-friendly error messages in the UI
- Implement loading indicators for API calls

