// pages/api/export_excel.js
import { NextApiRequest, NextApiResponse } from 'next';

import { exportJsonToExcel } from '@/lib/exportJsonToExcel';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const jsonData = req.body.data;
      const sheetName = req.body.sheetName || 'Sheet1';
      const fileName = req.body.fileName || 'export.xlsx';

      const buffer = exportJsonToExcel(jsonData, sheetName);

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
      res.status(200).send(buffer);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred while exporting the data to Excel' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
