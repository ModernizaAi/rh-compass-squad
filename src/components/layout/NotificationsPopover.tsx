
import React, { useState } from "react";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { NotificationList } from "./notifications/NotificationList";
import { Notification } from "./notifications/NotificationItem";

// Dados iniciais de notificações
const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Nova avaliação de desempenho",
    message: "Você tem uma nova avaliação de desempenho pendente.",
    time: "2 minutos atrás",
    type: "performance",
    read: false,
  },
  {
    id: 2,
    title: "Reunião agendada",
    message: "Reunião de equipe agendada para amanhã às 10:00.",
    time: "1 hora atrás",
    type: "meeting",
    read: false,
  },
  {
    id: 3,
    title: "Novo candidato",
    message: "Um novo candidato se aplicou para a vaga de Desenvolvedor Frontend.",
    time: "3 horas atrás",
    type: "recruitment",
    read: true,
  },
  {
    id: 4,
    title: "Lembrete de treinamento",
    message: "O treinamento de liderança começará em 3 dias.",
    time: "5 horas atrás",
    type: "training",
    read: true,
  }
];

export const NotificationsPopover = () => {
  const [notificationItems, setNotificationItems] = useState<Notification[]>(initialNotifications);
  const unreadCount = notificationItems.filter(item => !item.read).length;

  const markAsRead = (id: number) => {
    setNotificationItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationItems(prev => 
      prev.map(item => ({ ...item, read: true }))
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notificações</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <NotificationList 
          notifications={notificationItems}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
        />
      </PopoverContent>
    </Popover>
  );
};
