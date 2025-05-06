
import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";
import { EmployeeStatus } from "./EmployeeStatus";

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  status: string;
  hireDate: string;
  manager: string;
}

interface EmployeeTableProps {
  employees: Employee[];
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <tr>
            <th className="px-6 py-3">
              <div className="flex items-center">
                Nome
                <ArrowUpDown size={14} className="ml-1" />
              </div>
            </th>
            <th className="px-6 py-3">Cargo</th>
            <th className="px-6 py-3">Departamento</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Data de Contratação</th>
            <th className="px-6 py-3">Gestor</th>
            <th className="px-6 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="font-medium text-primary text-sm">
                      {employee.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{employee.name}</p>
                    <p className="text-xs text-gray-500">{employee.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{employee.position}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{employee.department}</td>
              <td className="px-6 py-4">
                <EmployeeStatus status={employee.status} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{employee.hireDate}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{employee.manager}</td>
              <td className="px-6 py-4 text-right">
                <Link to={`/employees/${employee.id}`} className="text-primary hover:underline text-sm font-medium">
                  Ver Detalhes
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
