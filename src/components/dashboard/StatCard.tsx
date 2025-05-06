
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("bg-white rounded-lg p-5 border border-gray-100 shadow-soft", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
          
          {trend && (
            <div className="mt-1 flex items-center">
              <div 
                className={cn(
                  "text-xs font-medium flex items-center",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                <span className="mr-1">
                  {trend.isPositive ? "↑" : "↓"} 
                </span>
                {Math.abs(trend.value)}%
              </div>
              <span className="ml-1.5 text-xs text-gray-500">vs. mês anterior</span>
            </div>
          )}
        </div>
        
        <div className="p-2 bg-primary/10 rounded-md text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
}
