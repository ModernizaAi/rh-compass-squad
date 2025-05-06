
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  avatar?: string;
}

interface EmployeeListCardProps {
  title: string;
  employees: Employee[];
}

export function EmployeeListCard({ title, employees }: EmployeeListCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-soft overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="text-lg font-medium">{title}</h3>
        <Link 
          to="/employees" 
          className="text-primary text-sm font-medium hover:underline"
        >
          Ver todos
        </Link>
      </div>
      
      <div>
        {employees.map((employee) => (
          <Link
            key={employee.id}
            to={`/employees/${employee.id}`}
            className="flex items-center px-5 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
          >
            <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
              {employee.avatar ? (
                <img src={employee.avatar} alt={employee.name} className="h-full w-full object-cover" />
              ) : (
                <span className="font-medium text-gray-600">
                  {employee.name.charAt(0)}
                </span>
              )}
            </div>
            
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{employee.name}</p>
              <p className="text-xs text-gray-500">{employee.position} • {employee.department}</p>
            </div>
            
            <ChevronRight size={16} className="text-gray-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}
