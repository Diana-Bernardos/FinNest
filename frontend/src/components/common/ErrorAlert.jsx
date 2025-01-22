// src/components/common/ErrorAlert.jsx
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

const ErrorAlert = ({ title, description }) => {
  return (
    <Alert variant="destructive" className="m-4">
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
};

export default ErrorAlert;