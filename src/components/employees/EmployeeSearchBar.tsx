
import React from "react";
import { Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmployeeSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function EmployeeSearchBar({ searchTerm, setSearchTerm }: EmployeeSearchBarProps) {
  return (
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
        <Button variant="outline" className="flex items-center text-sm">
          <Filter size={16} className="mr-2" />
          Filtrar
        </Button>
        <Button variant="outline" className="flex items-center text-sm">
          <Download size={16} className="mr-2" />
          Exportar
        </Button>
      </div>
    </div>
  );
}
