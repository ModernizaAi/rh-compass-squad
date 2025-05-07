
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeSelector } from "@/components/settings/ThemeSelector";

export default function Settings() {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-gray-500 mt-1">
          Personalize o sistema de acordo com suas preferências
        </p>

        <div className="mt-8">
          <Tabs defaultValue="appearance">
            <TabsList className="mb-6">
              <TabsTrigger value="appearance">Aparência</TabsTrigger>
              <TabsTrigger value="account">Conta</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
              <TabsTrigger value="system">Sistema</TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="space-y-6">
              <ThemeSelector />
              
              <div className="bg-white rounded-lg border p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Mais configurações de aparência</h3>
                <p className="text-gray-500">
                  Configurações adicionais de aparência estarão disponíveis em breve.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="account">
              <div className="bg-white rounded-lg border p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Configurações da Conta</h3>
                <p className="text-gray-500">
                  Esta funcionalidade está em desenvolvimento e estará disponível em breve.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <div className="bg-white rounded-lg border p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Configurações de Notificações</h3>
                <p className="text-gray-500">
                  Esta funcionalidade está em desenvolvimento e estará disponível em breve.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="system">
              <div className="bg-white rounded-lg border p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Configurações do Sistema</h3>
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
