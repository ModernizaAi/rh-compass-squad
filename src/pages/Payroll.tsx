
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PayrollStats } from "@/components/payroll/PayrollStats";
import { PayrollTable } from "@/components/payroll/PayrollTable";
import { payrollData } from "@/components/payroll/data";

export default function Payroll() {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold">Folha de Pagamento</h1>
        <p className="text-gray-500 mt-1">
          Gerencie salários, benefícios e pagamentos dos funcionários
        </p>

        <PayrollStats />

        <div className="mt-8">
          <Tabs defaultValue="current">
            <TabsList className="mb-6">
              <TabsTrigger value="current">Folha Atual</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current">
              <PayrollTable payrollData={payrollData} />
            </TabsContent>
            
            <TabsContent value="history">
              <div className="bg-white rounded-lg border p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Histórico de Folhas de Pagamento</h3>
                <p className="text-gray-500">
                  Esta funcionalidade está em desenvolvimento e estará disponível em breve.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="bg-white rounded-lg border p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Configurações da Folha de Pagamento</h3>
                <p className="text-gray-500">
                  Esta funcionalidade está em desenvolvimento e estará disponível em breve.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
