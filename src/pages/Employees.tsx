
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Search, Filter, UserPlus, Download, ArrowUpDown } from "lucide-react";

// Sample employee data
const employeesData = [
  {
    id: "1",
    name: "Carlos Silva",
    email: "carlos.silva@empresa.com",
    position: "Desenvolvedor Full Stack",
    department: "Tecnologia",
    status: "Ativo",
    hireDate: "15/02/2022",
    manager: "Mariana Alves"
  },
  {
    id: "2",
    name: "Ana Ferreira",
    email: "ana.ferreira@empresa.com",
    position: "Designer UX/UI",
    department: "Produto",
    status: "Ativo",
    hireDate: "03/05/2021",
    manager: "Rafael Santos"
  },
  {
    id: "3",
    name: "Roberto Santos",
    email: "roberto.santos@empresa.com",
    position: "Gerente de Marketing",
    department: "Marketing",
    status: "Ativo",
    hireDate: "10/10/2020",
    manager: "Juliana Costa"
  },
  {
    id: "4",
    name: "Juliana Costa",
    email: "juliana.costa@empresa.com",
    position: "Diretora de RH",
    department: "Recursos Humanos",
    status: "Ativo",
    hireDate: "01/03/2019",
    manager: "Ricardo Oliveira"
  },
  {
    id: "5",
    name: "Fernando Oliveira",
    email: "fernando.oliveira@empresa.com",
    position: "Analista de Dados",
    department: "Tecnologia",
    status: "Ativo",
    hireDate: "22/09/2022",
    manager: "Carlos Silva"
  },
  {
    id: "6",
    name: "Mariana Alves",
    email: "mariana.alves@empresa.com",
    position: "CTO",
    department: "Tecnologia",
    status: "Ativo",
    hireDate: "14/01/2018",
    manager: "Ricardo Oliveira"
  },
  {
    id: "7",
    name: "Rafael Santos",
    email: "rafael.santos@empresa.com",
    position: "Diretor de Produto",
    department: "Produto",
    status: "Ativo",
    hireDate: "05/06/2018",
    manager: "Ricardo Oliveira"
  },
  {
    id: "8",
    name: "Camila Lima",
    email: "camila.lima@empresa.com",
    position: "Analista de RH",
    department: "Recursos Humanos",
    status: "Ativo",
    hireDate: "19/04/2021",
    manager: "Juliana Costa"
  },
  {
    id: "9",
    name: "Pedro Souza",
    email: "pedro.souza@empresa.com",
    position: "Desenvolvedor Frontend",
    department: "Tecnologia",
    status: "Licença",
    hireDate: "08/07/2022",
    manager: "Mariana Alves"
  },
  {
    id: "10",
    name: "Bianca Martins",
    email: "bianca.martins@empresa.com",
    position: "Especialista em Marketing",
    department: "Marketing",
    status: "Ativo",
    hireDate: "11/11/2021",
    manager: "Roberto Santos"
  }
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "Ativo":
      return "bg-green-100 text-green-800";
    case "Licença":
      return "bg-amber-100 text-amber-800";
    case "Inativo":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter employees based on search term
  const filteredEmployees = employeesData.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  return (
    <Layout>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Funcionários</h1>
            <p className="text-gray-500 mt-1">Gerencie as informações dos funcionários</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="btn-primary flex items-center">
              <UserPlus size={16} className="mr-2" />
              Novo Funcionário
            </button>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg border border-gray-100 shadow-soft">
          <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100">
            <div className="flex items-center rounded-md border border-gray-200 px-3 py-2 w-full sm:w-auto mb-2 sm:mb-0">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Buscar funcionários..."
                className="border-0 focus:ring-0 p-0 text-sm w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <button className="btn-outline flex items-center text-sm">
                <Filter size={16} className="mr-2" />
                Filtrar
              </button>
              <button className="btn-outline flex items-center text-sm">
                <Download size={16} className="mr-2" />
                Exportar
              </button>
            </div>
          </div>

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
                {currentEmployees.map((employee) => (
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
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{employee.hireDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{employee.manager}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:underline text-sm font-medium">
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-3 flex justify-between items-center border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Mostrando {indexOfFirstEmployee + 1}-{Math.min(indexOfLastEmployee, filteredEmployees.length)} de {filteredEmployees.length} funcionários
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm rounded-md border border-gray-200 disabled:opacity-50"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm rounded-md border border-gray-200 disabled:opacity-50"
                >
                  Próxima
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
