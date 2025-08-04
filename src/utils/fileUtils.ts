import dayjs from 'dayjs';
import type { ShoppingItem } from '../types';

export type ExportFormat = 'csv' | 'json';

interface ExportOptions {
  filename?: string;
  includeHeaders?: boolean;
}

/**
 * Downloads data as a file
 */
const downloadFile = (content: string, filename: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  setTimeout(() => URL.revokeObjectURL(url), 100);
};

/**
 * Converts shopping items to CSV format
 */
const convertToCSV = (items: ShoppingItem[], options: ExportOptions = {}): string => {
  const { includeHeaders = true } = options;
  
  const headers = ['ID', 'Name', 'Category', 'Sub Category', 'Quantity', 'Price', 'Total', 'Date'];
  const csvRows: string[] = [];
  
  if (includeHeaders) {
    csvRows.push(headers.join(','));
  }
  
  items.forEach(item => {
    const row = [
      `"${item.id}"`,
      `"${item.name.replace(/"/g, '""')}"`, // Escape quotes
      `"${item.category}"`,
      `"${item.subCategory}"`,
      item.quantity.toString(),
      item.price.toFixed(2),
      item.total.toFixed(2),
      `"${item.date}"`
    ];
    csvRows.push(row.join(','));
  });
  
  return csvRows.join('\n');
};

/**
 * Converts shopping items to JSON format
 */
const convertToJSON = (items: ShoppingItem[]): string => {
  const cleanItems = items.map(({ isNew, ...item }) => item);
  return JSON.stringify(cleanItems, null, 2);
};

/**
 * Exports shopping items to specified format
 */
export const exportShoppingItems = (
  items: ShoppingItem[],
  format: ExportFormat,
  options: ExportOptions = {}
): void => {
  const timestamp = dayjs().format('YYYY-MM-DD');
  const defaultFilename = `shopping-list-${timestamp}`;
  const { filename = defaultFilename } = options;
  
  switch (format) {
    case 'csv': {
      const csvContent = convertToCSV(items, options);
      downloadFile(csvContent, `${filename}.csv`, 'text/csv');
      break;
    }
    case 'json': {
      const jsonContent = convertToJSON(items);
      downloadFile(jsonContent, `${filename}.json`, 'application/json');
      break;
    }
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
};

