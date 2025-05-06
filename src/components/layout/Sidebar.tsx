
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Award, 
  FileText, 
  DollarSign, 
  Settings,
  BarChart4,
  CalendarDays,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  icon: React.ElementType;
  path: string;
};

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Funcionários",
    icon: Users,
    path: "/employees",
  },
  {
    title: "Recrutamento",
    icon: Briefcase,
    path: "/recruitment",
  },
  {
    title: "Desempenho",
    icon: Award,
    path: "/performance",
  },
  {
    title: "Treinamentos",
    icon: GraduationCap,
    path: "/training",
  },
  {
    title: "Folha de Pagamento",
    icon: DollarSign,
    path: "/payroll",
  },
  {
    title: "Documentos",
    icon: FileText,
    path: "/documents",
  },
  {
    title: "Calendário",
    icon: CalendarDays,
    path: "/calendar",
  },
  {
    title: "Relatórios",
    icon: BarChart4,
    path: "/reports",
  },
];

const otherNavItems: NavItem[] = [
  {
    title: "Configurações",
    icon: Settings,
    path: "/settings",
  },
];

const NavItem = ({ item, isActive }: { item: NavItem; isActive: boolean }) => {
  return (
    <Link
      to={item.path}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-gray-700 hover:bg-gray-100"
      )}
    >
      <item.icon size={20} />
      <span>{item.title}</span>
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 h-screen border-r border-gray-200 bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="h-6 w-6 rounded-md bg-primary flex items-center justify-center text-white text-sm font-bold">
            HR
          </span>
          CompassHR
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <NavItem
              key={item.path}
              item={item}
              isActive={location.pathname === item.path}
            />
          ))}
        </nav>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Administração
          </h3>
          <nav className="mt-2 space-y-1">
            {otherNavItems.map((item) => (
              <NavItem
                key={item.path}
                item={item}
                isActive={location.pathname === item.path}
              />
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Admin Demo
            </p>
            <p className="text-xs text-gray-500 truncate">admin@compasshr.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
