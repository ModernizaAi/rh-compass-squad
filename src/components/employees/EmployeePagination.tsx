
import React from "react";
import { Button } from "@/components/ui/button";

interface EmployeePaginationProps {
  currentPage: number;
  totalPages: number;
  indexOfFirstEmployee: number;
  indexOfLastEmployee: number;
  totalEmployees: number;
  setCurrentPage: (page: number) => void;
}

export function EmployeePagination({
  currentPage,
  totalPages,
  indexOfFirstEmployee,
  indexOfLastEmployee,
  totalEmployees,
  setCurrentPage,
}: EmployeePaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="px-6 py-3 flex justify-between items-center border-t border-gray-100">
      <p className="text-sm text-gray-500">
        Mostrando {indexOfFirstEmployee + 1}-{Math.min(indexOfLastEmployee, totalEmployees)} de {totalEmployees} funcionários
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
