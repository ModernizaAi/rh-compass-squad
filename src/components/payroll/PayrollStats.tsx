
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Users, Clock, Calendar } from "lucide-react";

export const PayrollStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">R$ 285.450</h3>
          <p className="text-sm text-gray-500">Folha Mensal Total</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold">124</h3>
          <p className="text-sm text-gray-500">Funcionários Ativos</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <Clock className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold">12.450</h3>
          <p className="text-sm text-gray-500">Horas Trabalhadas</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="bg-yellow-100 p-3 rounded-full mb-4">
            <Calendar className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold">10/05</h3>
          <p className="text-sm text-gray-500">Próximo Pagamento</p>
        </CardContent>
      </Card>
    </div>
  );
};
