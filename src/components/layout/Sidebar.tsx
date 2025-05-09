
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Calendar,
  BarChart2,
  Settings,
  FileText,
  BookOpen,
  TrendingUp,
  DollarSign,
  User,
  Bell,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth, UserRole } from "@/contexts/AuthContext";

type SidebarItem = {
  name: string;
  icon: React.ReactNode;
  href: string;
  current?: boolean;
  requiredRole: UserRole;
};

export function Sidebar() {
  const location = useLocation();
  const { profile, user, hasPermission } = useAuth();
  
  // Determinar se o usuário é administrador baseado no profile.role ou email específico
  const isAdmin = React.useMemo(() => {
    // Verificar email específico como admin (compatibilidade com o sistema anterior)
    if (user?.email === "maurosergio.superque@gmail.com") {
      return true;
    }
    
    // Verificar role no profile
    if (profile) {
      return profile.role === 'admin';
    }
    
    return false;
  }, [user, profile]);

  // Determinar se o usuário é gestor baseado no profile.role ou cargo/departamento
  const isManager = React.useMemo(() => {
    // Verificação baseada em role
    if (profile) {
      if (profile.role === 'admin' || profile.role === 'manager') {
        return true;
      }
      
      // Verificação anterior baseada em cargo/departamento (compatibilidade)
      return (
        profile.position?.toLowerCase().includes("diretor") || 
        profile.position?.toLowerCase().includes("gerente") || 
        profile.department?.toLowerCase().includes("rh")
      );
    }
    
    return false;
  }, [profile]);
  
  const userRole: UserRole = isAdmin ? 'admin' : (isManager ? 'manager' : 'basic');

  const allNavigation: SidebarItem[] = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/", requiredRole: 'basic' },
    { name: "Funcionários", icon: <Users size={20} />, href: "/employees", requiredRole: 'manager' },
    { name: "Recrutamento", icon: <UserPlus size={20} />, href: "/recruitment", requiredRole: 'manager' },
    { name: "Desempenho", icon: <TrendingUp size={20} />, href: "/performance", requiredRole: 'manager' },
    { name: "Treinamentos", icon: <BookOpen size={20} />, href: "/training", requiredRole: 'basic' },
    { name: "Folha de Pagamento", icon: <DollarSign size={20} />, href: "/payroll", requiredRole: 'manager' },
    { name: "Documentos", icon: <FileText size={20} />, href: "/documents", requiredRole: 'basic' },
    { name: "Calendário", icon: <Calendar size={20} />, href: "/calendar", requiredRole: 'basic' },
    { name: "Relatórios", icon: <BarChart2 size={20} />, href: "/reports", requiredRole: 'manager' },
    { name: "Notificações", icon: <Bell size={20} />, href: "/notifications", requiredRole: 'basic' },
    { name: "Portal do Colaborador", icon: <User size={20} />, href: "/employee-portal", requiredRole: 'basic' },
    { name: "Gerenciar Usuários", icon: <Shield size={20} />, href: "/user-management", requiredRole: 'admin' },
    { name: "Configurações", icon: <Settings size={20} />, href: "/settings", requiredRole: 'basic' },
  ];

  // Filtrar itens de navegação com base no nível de acesso do usuário
  const navigation = allNavigation.filter(item => hasPermission(item.requiredRole));

  // Definir o item atual com base na URL atual
  const currentNavigation = navigation.map(item => ({
    ...item,
    current: location.pathname === item.href
  }));

  const [isOpen, setIsOpen] = useState(true);
  
  // Add event listener for sidebar toggle from Header component
  useEffect(() => {
    const handleToggleSidebar = () => {
      setIsOpen(prev => !prev);
    };
    
    window.addEventListener("toggle-sidebar", handleToggleSidebar);
    
    return () => {
      window.removeEventListener("toggle-sidebar", handleToggleSidebar);
    };
  }, []);

  // Dispatch a custom event when sidebar width changes
  useEffect(() => {
    const event = new CustomEvent("sidebar-width-change", { 
      detail: { isOpen } 
    });
    window.dispatchEvent(event);
  }, [isOpen]);

  const sidebarWidth = isOpen ? '256px' : '64px';

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-10 flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
      style={{ width: sidebarWidth }}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div
          className={cn(
            "font-semibold text-lg transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
          )}
        >
          RH Manager
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-md hover:bg-gray-100"
          aria-label={isOpen ? "Recolher menu" : "Expandir menu"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transform transition-transform ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <nav className="flex-1 px-2 pt-4 pb-4 space-y-1 overflow-y-auto">
        {currentNavigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center p-2 rounded-md hover:bg-gray-100 group",
              item.current ? "bg-gray-100" : ""
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 text-gray-500 group-hover:text-primary",
                item.current ? "text-primary" : ""
              )}
            >
              {item.icon}
            </div>
            <span
              className={cn(
                "ml-3 text-sm font-medium text-gray-700 group-hover:text-primary transition-all duration-300",
                item.current ? "text-primary" : "",
                isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
              )}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
