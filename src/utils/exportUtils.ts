import { saveAs } from 'file-saver';
import AsciiTable from 'ascii-table3';

export interface ExportData {
  data: any[];
  filename: string;
  columns?: { key: string; label: string }[];
}

export const exportToCSV = ({ data, filename, columns }: ExportData) => {
  if (!data || data.length === 0) return;

  const headers = columns ? columns.map(col => col.label) : Object.keys(data[0]);
  const keys = columns ? columns.map(col => col.key) : Object.keys(data[0]);

  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      keys.map(key => {
        const value = row[key];
        // Handle values that might contain commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value ?? '';
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}.csv`);
};

export const exportToJSON = ({ data, filename }: ExportData) => {
  if (!data || data.length === 0) return;

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  saveAs(blob, `${filename}.json`);
};

export const exportToASCII = ({ data, filename, columns }: ExportData) => {
  if (!data || data.length === 0) return;

  const table = new AsciiTable();
  
  // Set headers
  const headers = columns ? columns.map(col => col.label) : Object.keys(data[0]);
  const keys = columns ? columns.map(col => col.key) : Object.keys(data[0]);
  
  table.setHeading(...headers);

  // Add rows
  data.forEach(row => {
    const rowData = keys.map(key => {
      const value = row[key];
      if (typeof value === 'number') {
        return value.toFixed(2);
      }
      return value ?? '-';
    });
    table.addRow(...rowData);
  });

  const asciiContent = table.toString();
  const blob = new Blob([asciiContent], { type: 'text/plain;charset=utf-8;' });
  saveAs(blob, `${filename}.txt`);
};

export const exportToNetCDF = async ({ data, filename }: ExportData) => {
  // Note: This is a simplified NetCDF export
  // For full NetCDF support, you'd need a more comprehensive library
  try {
    const netcdfContent = {
      dimensions: {
        time: data.length,
        depth: 100 // example
      },
      variables: {},
      attributes: {
        title: 'Argo Float Data Export',
        institution: 'FloatChat',
        source: 'Argo Global Data Assembly Centre',
        created: new Date().toISOString()
      },
      data: data
    };

    const jsonContent = JSON.stringify(netcdfContent, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    saveAs(blob, `${filename}.nc.json`);
  } catch (error) {
    console.error('NetCDF export error:', error);
    // Fallback to JSON export
    exportToJSON({ data, filename: `${filename}_netcdf_fallback` });
  }
};

export const generateSummaryReport = (data: any[], title: string) => {
  if (!data || data.length === 0) return '';

  const numericColumns = Object.keys(data[0]).filter(key => 
    typeof data[0][key] === 'number'
  );

  let report = `${title}\n`;
  report += '='.repeat(title.length) + '\n\n';
  report += `Total Records: ${data.length}\n`;
  report += `Generated: ${new Date().toLocaleString()}\n\n`;

  if (numericColumns.length > 0) {
    report += 'Statistical Summary:\n';
    report += '-'.repeat(20) + '\n';

    numericColumns.forEach(column => {
      const values = data.map(row => row[column]).filter(val => typeof val === 'number');
      if (values.length > 0) {
        const min = Math.min(...values);
        const max = Math.max(...values);
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        
        report += `${column}:\n`;
        report += `  Min: ${min.toFixed(2)}\n`;
        report += `  Max: ${max.toFixed(2)}\n`;
        report += `  Mean: ${mean.toFixed(2)}\n`;
        report += `  Count: ${values.length}\n\n`;
      }
    });
  }

  return report;
};