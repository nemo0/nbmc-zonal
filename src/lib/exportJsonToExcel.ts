import XLSX from 'xlsx';

const exportJsonToExcel = (jsonData: any, sheetName = 'Sheet1') => {
  // Create a new workbook.
  const workbook = XLSX.utils.book_new();

  // Convert JSON data to worksheet.
  const worksheet = XLSX.utils.json_to_sheet(jsonData);

  // Append the worksheet to the workbook.
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Write the workbook to a buffer.
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  return buffer;
};

export { exportJsonToExcel };
