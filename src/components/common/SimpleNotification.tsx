import React from "react";

interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose?: () => void;
}

export const SimpleNotification: React.FC<NotificationProps> = ({
  message,
  type = "info",
  onClose,
}) => {
  const colors = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
  };

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  React.useEffect(() => {
    if (onClose) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg border-2 shadow-lg z-50 max-w-sm ${colors[type]}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{icons[type]}</span>
        <span className="flex-1">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-lg hover:opacity-70 transition-opacity"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

// Simple notification manager
class NotificationManager {
  private notifications: Array<{
    id: string;
    message: string;
    type: "success" | "error" | "info" | "warning";
  }> = [];
  private listeners: Array<() => void> = [];

  show(
    message: string,
    type: "success" | "error" | "info" | "warning" = "info",
  ) {
    const notification = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
    };

    this.notifications.push(notification);
    this.notifyListeners();

    // Auto remove after 5 seconds
    setTimeout(() => {
      this.remove(notification.id);
    }, 5000);

    // Also log to console for debugging
    console.log(`📢 ${type.toUpperCase()}: ${message}`);
  }

  remove(id: string) {
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.notifyListeners();
  }

  getNotifications() {
    return this.notifications;
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }
}

export const notificationManager = new NotificationManager();

// Hook to use notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = React.useState(
    notificationManager.getNotifications(),
  );

  React.useEffect(() => {
    const unsubscribe = notificationManager.subscribe(() => {
      setNotifications([...notificationManager.getNotifications()]);
    });

    return unsubscribe;
  }, []);

  return {
    notifications,
    show: notificationManager.show.bind(notificationManager),
    remove: notificationManager.remove.bind(notificationManager),
  };
};

// Simple toast replacement
export const toast = {
  success: (message: string) => notificationManager.show(message, "success"),
  error: (message: string) => notificationManager.show(message, "error"),
  info: (message: string) => notificationManager.show(message, "info"),
  warning: (message: string) => notificationManager.show(message, "warning"),
};
