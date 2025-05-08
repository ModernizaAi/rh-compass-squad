
import React from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { NotificationItem } from "./NotificationItem";
import { Notification } from "@/services/notificationService";
import { Skeleton } from "@/components/ui/skeleton";

type NotificationListProps = {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
  isLoading: boolean;
};

export const NotificationList = ({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead,
  isLoading
}: NotificationListProps) => {
  const unreadCount = notifications.filter(item => !item.read).length;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="p-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (notifications.length === 0) {
      return (
        <div className="p-6 text-center text-gray-500">
          <Bell className="mx-auto h-8 w-8 mb-2 opacity-50" />
          <p>Não há novas notificações</p>
        </div>
      );
    }

    return (
      <div>
        {notifications.map((notification) => (
          <NotificationItem 
            key={notification.id}
            notification={notification} 
            onMarkAsRead={onMarkAsRead} 
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="p-3 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-medium">Notificações</h3>
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onMarkAllAsRead}
            className="h-auto py-1 text-xs"
          >
            Marcar todas como lidas
          </Button>
        )}
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {renderContent()}
      </div>
      <div className="p-2 border-t border-gray-100 text-center">
        <Button variant="ghost" size="sm" className="w-full text-primary">
          Ver todas as notificações
        </Button>
      </div>
    </>
  );
};
