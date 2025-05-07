
import React, { useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

type SidebarItem = {
  name: string;
  icon: React.ReactNode;
  href: string;
  current?: boolean;
};

export function Sidebar() {
  const location = useLocation();
  const { profile } = useAuth();
  const isAdmin = profile?.position?.toLowerCase().includes("diretor") || 
                  profile?.position?.toLowerCase().includes("gerente") || 
                  profile?.department?.toLowerCase().includes("rh");

  const adminNavigation: SidebarItem[] = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/" },
    { name: "Funcionários", icon: <Users size={20} />, href: "/employees" },
    { name: "Recrutamento", icon: <UserPlus size={20} />, href: "/recruitment" },
    { name: "Desempenho", icon: <TrendingUp size={20} />, href: "/performance" },
    { name: "Treinamentos", icon: <BookOpen size={20} />, href: "/training" },
    { name: "Folha de Pagamento", icon: <DollarSign size={20} />, href: "/payroll" },
    { name: "Documentos", icon: <FileText size={20} />, href: "/documents" },
    { name: "Calendário", icon: <Calendar size={20} />, href: "/calendar" },
    { name: "Relatórios", icon: <BarChart2 size={20} />, href: "/reports" },
    { name: "Configurações", icon: <Settings size={20} />, href: "/settings" },
  ];

  const userNavigation: SidebarItem[] = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/" },
    { name: "Portal do Colaborador", icon: <User size={20} />, href: "/employee-portal" },
    { name: "Calendário", icon: <Calendar size={20} />, href: "/calendar" },
    { name: "Perfil", icon: <Settings size={20} />, href: "/profile" },
  ];

  // Selecionar qual menu usar baseado no papel do usuário
  const navigation = isAdmin ? adminNavigation : userNavigation;

  // Definir o item atual com base na URL atual
  const currentNavigation = navigation.map(item => ({
    ...item,
    current: location.pathname === item.href
  }));

  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-10 flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div
          className={cn(
            "font-semibold text-lg transition-opacity",
            isOpen ? "opacity-100" : "opacity-0"
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
                "ml-3 text-sm font-medium text-gray-700 group-hover:text-primary transition-opacity",
                item.current ? "text-primary" : "",
                isOpen ? "opacity-100" : "opacity-0"
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
