// src/components/common/Notifications.jsx
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { Bell, X } from 'lucide-react';

const NotificationItem = ({ notification, onDismiss }) => {
  const getAlertStyle = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <Alert className={`mb-2 ${getAlertStyle(notification.type)}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <Bell className="w-4 h-4 mt-1 mr-2" />
          <div>
            <AlertTitle>{notification.title}</AlertTitle>
            <AlertDescription>{notification.message}</AlertDescription>
          </div>
        </div>
        <button
          onClick={() => onDismiss(notification.id)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </Alert>
  );
};

const Notifications = ({ notifications = [], onDismiss }) => {
  if (!notifications.length) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-96 space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};

export default Notifications;