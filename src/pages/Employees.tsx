
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EmployeeSearchBar } from "@/components/employees/EmployeeSearchBar";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { EmployeePagination } from "@/components/employees/EmployeePagination";
import { employeesData } from "@/components/employees/EmployeeData";

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
            <Link to="/employees/new">
              <Button className="flex items-center">
                <UserPlus size={16} className="mr-2" />
                Novo Funcionário
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg border border-gray-100 shadow-soft">
          <EmployeeSearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          
          <EmployeeTable employees={currentEmployees} />

          <EmployeePagination
            currentPage={currentPage}
            totalPages={totalPages}
            indexOfFirstEmployee={indexOfFirstEmployee}
            indexOfLastEmployee={indexOfLastEmployee}
            totalEmployees={filteredEmployees.length}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </Layout>
  );
}
