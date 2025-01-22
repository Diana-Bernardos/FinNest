// src/components/dashboard/DashboardFilters.jsx
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Filter, Calendar, Tag } from 'lucide-react';

const DashboardFilters = ({ onFilterChange }) => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const handleFilterChange = () => {
    onFilterChange({
      dateRange,
      categories: selectedCategories,
      amount: {
        min: minAmount ? parseFloat(minAmount) : null,
        max: maxAmount ? parseFloat(maxAmount) : null
      }
    });
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      }
      return [...prev, categoryId];
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Filtro de Fechas */}
          <div className="flex gap-2 items-center">
            <Calendar className="w-5 h-5 text-[#7D8B9D]" />
            <div className="flex gap-2">
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                className="input-field"
              />
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          {/* Filtro de Categorías */}
          <div className="flex gap-2 items-center">
            <Tag className="w-5 h-5 text-[#7D8B9D]" />
            <div className="flex flex-wrap gap-2">
              {['Alimentación', 'Vivienda', 'Transporte', 'Ocio'].map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryToggle(index)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategories.includes(index)
                      ? 'bg-[#2F436D] text-white'
                      : 'bg-gray-100 text-[#7D8B9D] hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro de Montos */}
          <div className="flex gap-2 items-center">
            <Filter className="w-5 h-5 text-[#7D8B9D]" />
            <div className="flex gap-2">
              <input
                type="number"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                placeholder="Monto mínimo"
                className="input-field"
              />
              <input
                type="number"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                placeholder="Monto máximo"
                className="input-field"
              />
            </div>
          </div>

          {/* Botón de Aplicar Filtros */}
          <button
            onClick={handleFilterChange}
            className="w-full btn-primary"
          >
            Aplicar Filtros
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardFilters;