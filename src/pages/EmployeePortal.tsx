
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Tab, Tabs, TabList, TabPanel } from "@/components/employee-portal/TabNavigation";
import { EmployeeProfile } from "@/components/employee-portal/EmployeeProfile";
import { MyRequests } from "@/components/employee-portal/MyRequests";
import { MyTrainings } from "@/components/employee-portal/MyTrainings";
import { MyDocuments } from "@/components/employee-portal/MyDocuments";

export default function EmployeePortal() {
  const { profile } = useAuth();
  const [currentTab, setCurrentTab] = useState("profile");

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Portal do Colaborador</h1>
            <p className="text-gray-500 mt-1">
              Bem-vindo, {profile?.first_name} {profile?.last_name}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 shadow-soft overflow-hidden">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="flex flex-col">
            <TabList className="border-b border-gray-200 flex-shrink-0 w-full overflow-x-auto">
              <Tab value="profile">Meu Perfil</Tab>
              <Tab value="requests">Solicitações</Tab>
              <Tab value="trainings">Treinamentos</Tab>
              <Tab value="documents">Documentos</Tab>
            </TabList>
            
            <TabPanel value="profile" currentValue={currentTab} className="flex-grow">
              <EmployeeProfile />
            </TabPanel>
            
            <TabPanel value="requests" currentValue={currentTab} className="flex-grow">
              <MyRequests />
            </TabPanel>
            
            <TabPanel value="trainings" currentValue={currentTab} className="flex-grow">
              <MyTrainings />
            </TabPanel>
            
            <TabPanel value="documents" currentValue={currentTab} className="flex-grow">
              <MyDocuments />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
