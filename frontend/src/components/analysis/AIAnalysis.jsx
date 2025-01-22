import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle } from '@/components/ui/alert';

const API_URL = 'http://localhost:3001/api';

const AIAnalysis = () => {
  const [analysis, setAnalysis] = useState({
    currentMonth: null,
    history: [],
    loading: true,
    error: null
  });

  // Cargar análisis
  const loadAnalysis = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/analysis/current`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Error al cargar el análisis');

      const data = await response.json();
      console.log('Análisis cargado:', data);
      setAnalysis({
        currentMonth: data.current,
        history: data.history,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error:', error);
      setAnalysis(prev => ({
        ...prev,
        loading: false,
        error: 'Error al cargar el análisis'
      }));
    }
  };

  useEffect(() => {
    loadAnalysis();
  }, []);

  if (analysis.loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Análisis y Recomendaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (analysis.error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Análisis y Recomendaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>{analysis.error}</AlertTitle>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis y Recomendaciones</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Análisis del Mes */}
        {analysis.currentMonth && (
          <>
            <div>
              <h3 className="font-medium mb-2">Análisis del Mes</h3>
              <p className="text-[#7D8B9D]">{analysis.currentMonth.analysis_text}</p>
            </div>

            {/* Recomendaciones de Ahorro */}
            <div>
              <h3 className="font-medium mb-2">Recomendaciones de Ahorro</h3>
              <p className="text-[#7D8B9D]">{analysis.currentMonth.savings_recommendation}</p>
            </div>

            {/* Áreas de Riesgo */}
            {analysis.currentMonth.risk_areas && (
              <div>
                <h3 className="font-medium mb-2">Áreas de Atención</h3>
                <p className="text-[#7D8B9D]">{analysis.currentMonth.risk_areas}</p>
              </div>
            )}

            {/* Oportunidades */}
            {analysis.currentMonth.opportunities && (
              <div>
                <h3 className="font-medium mb-2">Oportunidades</h3>
                <p className="text-[#7D8B9D]">{analysis.currentMonth.opportunities}</p>
              </div>
            )}
          </>
        )}

        {/* Historial de Análisis */}
        {analysis.history && analysis.history.length > 0 && (
          <div className="mt-8">
            <h3 className="font-medium mb-4">Historial de Análisis</h3>
            <div className="space-y-4">
              {analysis.history.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-[#7D8B9D] mb-2">
                    {new Date(item.month).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </div>
                  <div className="text-[#0E0F17]">{item.summary}</div>
                  {item.recommendations && (
                    <div className="text-[#7D8B9D] mt-2 text-sm">
                      {item.recommendations}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIAnalysis;