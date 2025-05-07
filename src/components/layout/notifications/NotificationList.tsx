
import React from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { NotificationItem, Notification } from "./NotificationItem";

type NotificationListProps = {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
};

export const NotificationList = ({ notifications, onMarkAsRead, onMarkAllAsRead }: NotificationListProps) => {
  const unreadCount = notifications.filter(item => !item.read).length;

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
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Bell className="mx-auto h-8 w-8 mb-2 opacity-50" />
            <p>Não há novas notificações</p>
          </div>
        ) : (
          <div>
            {notifications.map((notification) => (
              <NotificationItem 
                key={notification.id}
                notification={notification} 
                onMarkAsRead={onMarkAsRead} 
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-2 border-t border-gray-100 text-center">
        <Button variant="ghost" size="sm" className="w-full text-primary">
          Ver todas as notificações
        </Button>
      </div>
    </>
  );
};
