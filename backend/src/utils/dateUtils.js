// src/utils/dateUtils.js
const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  module.exports={formatDate};