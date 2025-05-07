
import React from "react";
import { X, Calendar, User, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

type NotificationType = "meeting" | "recruitment" | "performance" | "training" | string;

export type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  read: boolean;
};

type NotificationItemProps = {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
};

export const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'meeting':
      return <Calendar className="h-5 w-5 text-blue-500" />;
    case 'recruitment':
      return <User className="h-5 w-5 text-green-500" />;
    case 'performance':
      return <FileText className="h-5 w-5 text-yellow-500" />;
    default:
      return <MessageSquare className="h-5 w-5 text-gray-500" />;
  }
};

export const NotificationItem = ({ notification, onMarkAsRead }: NotificationItemProps) => {
  return (
    <div 
      key={notification.id}
      className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${
        !notification.read ? 'bg-blue-50/50' : ''
      }`}
    >
      <div className="flex">
        <div className="mt-0.5 mr-3">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <p className="font-medium text-sm">{notification.title}</p>
            {!notification.read && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => onMarkAsRead(notification.id)}
              >
                <X size={14} />
                <span className="sr-only">Marcar como lido</span>
              </Button>
            )}
          </div>
          <p className="text-gray-600 text-sm mt-0.5">{notification.message}</p>
          <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
        </div>
      </div>
    </div>
  );
};
