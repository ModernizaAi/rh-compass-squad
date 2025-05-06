
import React from "react";
import { cn } from "@/lib/utils";

type StatusProps = {
  status: string;
};

export const getStatusClass = (status: string) => {
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

export function EmployeeStatus({ status }: StatusProps) {
  return (
    <span className={cn("inline-flex px-2 py-1 text-xs font-medium rounded-full", getStatusClass(status))}>
      {status}
    </span>
  );
}
