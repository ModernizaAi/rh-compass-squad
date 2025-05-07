
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type EmployeeTrainingProps = {
  employees: {
    id: number;
    employeeName: string;
    position: string;
    department: string;
    coursesCompleted: number;
    coursesInProgress: number;
    lastActivity: string;
    certifications: string[];
  }[];
};

export const EmployeeTrainingTable = ({ employees }: EmployeeTrainingProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-soft overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-semibold">Progresso dos Funcionários</h2>
        <Button variant="outline" size="sm">
          Exportar Relatório
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Funcionário</th>
              <th className="px-6 py-3 text-left">Departamento</th>
              <th className="px-6 py-3 text-center">Cursos Concluídos</th>
              <th className="px-6 py-3 text-center">Em Andamento</th>
              <th className="px-6 py-3 text-left">Última Atividade</th>
              <th className="px-6 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-800">{employee.employeeName}</p>
                    <p className="text-xs text-gray-500">{employee.position}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{employee.department}</td>
                <td className="px-6 py-4 text-center">
                  <span className="font-medium">{employee.coursesCompleted}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-medium">{employee.coursesInProgress}</span>
                </td>
                <td className="px-6 py-4 text-sm">{employee.lastActivity}</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm">
                    Perfil <ArrowRight size={16} className="ml-1" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
