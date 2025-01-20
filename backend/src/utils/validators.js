// src/utils/validators.js
const validator = {
  validateExpense(data) {
      const errors = [];

      // Validar amount
      if (!data.amount || isNaN(data.amount) || data.amount <= 0) {
          errors.push('La cantidad debe ser un número válido mayor que 0');
      }

      // Validar category_id
      if (!data.category_id || isNaN(data.category_id)) {
          errors.push('La categoría es requerida');
      }

      // Validar date
      if (!data.date || isNaN(new Date(data.date).getTime())) {
          errors.push('La fecha debe ser válida');
      }

      // Validar description (opcional pero con límite)
      if (data.description && data.description.length > 255) {
          errors.push('La descripción no puede exceder los 255 caracteres');
      }

      return errors.length > 0 ? errors : null;
  },

  validateDateRange(startDate, endDate) {
      const errors = [];

      if (startDate && isNaN(new Date(startDate).getTime())) {
          errors.push('La fecha inicial no es válida');
      }

      if (endDate && isNaN(new Date(endDate).getTime())) {
          errors.push('La fecha final no es válida');
      }

      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
          errors.push('La fecha inicial no puede ser posterior a la fecha final');
      }

      return errors.length > 0 ? errors : null;
  },

  validateAmount(amount) {
      if (!amount || isNaN(amount) || amount <= 0) {
          return 'La cantidad debe ser un número válido mayor que 0';
      }
      return null;
  },

  validateCategory(categoryId) {
      if (!categoryId || isNaN(categoryId)) {
          return 'La categoría es requerida';
      }
      return null;
  }
};

module.exports = validator;