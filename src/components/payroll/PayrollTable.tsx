
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Eye } from "lucide-react";

type PayrollRecord = {
  id: number;
  employeeName: string;
  position: string;
  department: string;
  baseSalary: number;
  benefits: number;
  taxes: number;
  netSalary: number;
  status: "Pago" | "Pendente" | "Processando";
  paymentDate: string;
};

type PayrollTableProps = {
  payrollData: PayrollRecord[];
};

export const PayrollTable = ({ payrollData }: PayrollTableProps) => {
  // Formatar moeda em reais
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-soft overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-semibold">Folha de Pagamento Atual</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm">
            Processar Pagamentos
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Funcionário</th>
              <th className="px-6 py-3 text-left">Departamento</th>
              <th className="px-6 py-3 text-right">Salário Base</th>
              <th className="px-6 py-3 text-right">Benefícios</th>
              <th className="px-6 py-3 text-right">Impostos</th>
              <th className="px-6 py-3 text-right">Líquido</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payrollData.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-800">{record.employeeName}</p>
                    <p className="text-xs text-gray-500">{record.position}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{record.department}</td>
                <td className="px-6 py-4 text-right">{formatCurrency(record.baseSalary)}</td>
                <td className="px-6 py-4 text-right">{formatCurrency(record.benefits)}</td>
                <td className="px-6 py-4 text-right">{formatCurrency(record.taxes)}</td>
                <td className="px-6 py-4 text-right font-medium">{formatCurrency(record.netSalary)}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.status === "Pago"
                          ? "bg-green-100 text-green-800"
                          : record.status === "Processando"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {record.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <Button size="icon" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      Detalhes <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
