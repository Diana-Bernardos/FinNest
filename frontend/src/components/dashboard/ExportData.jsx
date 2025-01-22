// src/components/dashboard/ExportData.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FileDown, FileSpreadsheet, FilePdf } from 'lucide-react';
import axios from 'axios';

const ExportData = () => {
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState(null);

  const handleExport = async (format) => {
    setExporting(true);
    setError(null);

    try {
      const response = await axios(`http://localhost:3001/api/analysis/export?format=${format}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Error al exportar datos');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reporte-financiero.${format.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al exportar los datos');
    } finally {
      setExporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileDown className="w-5 h-5" />
          Exportar Datos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <button
            onClick={() => handleExport('EXCEL')}
            disabled={exporting}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-[#B6BECD] hover:bg-gray-50 transition-colors"
          >
            <FileSpreadsheet className="w-5 h-5 text-green-600" />
            <span>Exportar a Excel</span>
          </button>

          <button
            onClick={() => handleExport('PDF')}
            disabled={exporting}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-[#B6BECD] hover:bg-gray-50 transition-colors"
          >
            <FilePdf className="w-5 h-5 text-red-600" />
            <span>Exportar a PDF</span>
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          {exporting && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#2F436D]"></div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportData;