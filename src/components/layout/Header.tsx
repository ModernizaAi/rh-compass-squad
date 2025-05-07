
import React, { useState } from "react";
import { Bell, Menu, Settings, User, LogOut, X, MessageSquare, Calendar, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample notifications
const notifications = [
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

export function Header() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const [notificationItems, setNotificationItems] = useState(notifications);
  
  const toggleSidebar = () => {
    const event = new CustomEvent("toggle-sidebar");
    window.dispatchEvent(event);
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  const getNotificationIcon = (type: string) => {
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

  return (
    <header className="bg-white border-b border-gray-100 py-2.5 px-4 h-16 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={toggleSidebar}
          >
            <Menu />
            <span className="sr-only">Toggle menu</span>
          </Button>
        )}
        <div className="hidden md:block">
          <h1 className="text-lg font-medium">CompassHR</h1>
        </div>
      </div>

      <div className="flex items-center space-x-2">
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
            <div className="p-3 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-medium">Notificações</h3>
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="h-auto py-1 text-xs"
                >
                  Marcar todas como lidas
                </Button>
              )}
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {notificationItems.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Bell className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>Não há novas notificações</p>
                </div>
              ) : (
                <div>
                  {notificationItems.map((notification) => (
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
                                onClick={() => markAsRead(notification.id)}
                              >
                                <X size={14} />
                                <span className="sr-only">Mark as read</span>
                              </Button>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mt-0.5">{notification.message}</p>
                          <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-2 border-t border-gray-100 text-center">
              <Button variant="ghost" size="sm" className="w-full text-primary">
                Ver todas as notificações
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User size={20} />
              <span className="sr-only">Perfil</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2">
              <p className="font-medium">
                {profile ? `${profile.first_name} ${profile.last_name}` : user?.email}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="w-full cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Meu Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="w-full cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
