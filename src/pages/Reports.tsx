
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  PieChart,
  LineChart,
  Download,
  FileText,
  Users,
  Calendar,
  UserCheck,
  DollarSign,
  Clock,
  Filter,
  PlusCircle
} from "lucide-react";

// For demonstration purposes
const SampleBarChart = () => (
  <div className="border rounded-md p-4 h-[300px] flex items-center justify-center">
    <div className="text-center text-gray-500">
      <BarChart className="mx-auto h-16 w-16 mb-2 opacity-50" />
      <p className="text-sm text-muted-foreground">
        Um gráfico de barras seria exibido aqui mostrando dados reais.
      </p>
    </div>
  </div>
);

const SamplePieChart = () => (
  <div className="border rounded-md p-4 h-[300px] flex items-center justify-center">
    <div className="text-center text-gray-500">
      <PieChart className="mx-auto h-16 w-16 mb-2 opacity-50" />
      <p className="text-sm text-muted-foreground">
        Um gráfico de pizza seria exibido aqui mostrando dados reais.
      </p>
    </div>
  </div>
);

const SampleLineChart = () => (
  <div className="border rounded-md p-4 h-[300px] flex items-center justify-center">
    <div className="text-center text-gray-500">
      <LineChart className="mx-auto h-16 w-16 mb-2 opacity-50" />
      <p className="text-sm text-muted-foreground">
        Um gráfico de linha seria exibido aqui mostrando dados reais.
      </p>
    </div>
  </div>
);

// Sample data for recent reports
const recentReports = [
  {
    id: 1,
    title: "Relatório de Funcionários por Departamento",
    type: "Funcionários",
    date: "07/05/2025",
    user: "Admin Demo",
  },
  {
    id: 2,
    title: "Análise de Treinamentos e Certificações",
    type: "Treinamentos",
    date: "05/05/2025",
    user: "Admin Demo",
  },
  {
    id: 3,
    title: "Relatório de Desempenho Q1 2025",
    type: "Desempenho",
    date: "01/05/2025",
    user: "Admin Demo",
  },
  {
    id: 4,
    title: "Análise de Contratações",
    type: "Recrutamento",
    date: "28/04/2025",
    user: "Admin Demo",
  },
];

// Sample data for report templates
const reportTemplates = [
  {
    id: 1,
    title: "Headcount por Departamento",
    category: "Funcionários",
    description: "Relatório mostrando a distribuição de funcionários por departamento.",
  },
  {
    id: 2,
    title: "Análise de Rotatividade",
    category: "Funcionários",
    description: "Taxa de rotatividade por departamento e cargo.",
  },
  {
    id: 3,
    title: "Resumo de Recrutamento",
    category: "Recrutamento",
    description: "Resumo das atividades de recrutamento, vagas e candidatos.",
  },
  {
    id: 4,
    title: "Análise de Desempenho",
    category: "Desempenho",
    description: "Análise das avaliações de desempenho por departamento.",
  },
  {
    id: 5,
    title: "Relatório de Treinamentos",
    category: "Treinamentos",
    description: "Resumo de participação em treinamentos e certificações obtidas.",
  },
  {
    id: 6,
    title: "Relatório de Folha de Pagamento",
    category: "Financeiro",
    description: "Resumo das despesas com folha de pagamento por departamento.",
  },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <p className="text-gray-500 mt-1">
          Visualize dados e gere relatórios de RH
        </p>

        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            
            <div className="mt-4 sm:mt-0 flex space-x-2">
              {activeTab === "reports" && (
                <Button>
                  <PlusCircle size={16} className="mr-2" />
                  Novo Relatório
                </Button>
              )}
              {activeTab === "dashboard" && (
                <Button variant="outline">
                  <Filter size={16} className="mr-2" />
                  Filtros
                </Button>
              )}
              {activeTab === "dashboard" && (
                <Select defaultValue="month">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Última Semana</SelectItem>
                    <SelectItem value="month">Último Mês</SelectItem>
                    <SelectItem value="quarter">Último Trimestre</SelectItem>
                    <SelectItem value="year">Último Ano</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">128</h3>
                  <p className="text-sm text-gray-500">Total de Funcionários</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="bg-green-100 p-3 rounded-full mb-4">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold">94%</h3>
                  <p className="text-sm text-gray-500">Taxa de Retenção</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold">18</h3>
                  <p className="text-sm text-gray-500">Dias para Contratar</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="bg-yellow-100 p-3 rounded-full mb-4">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold">3.5%</h3>
                  <p className="text-sm text-gray-500">Taxa de Rotatividade</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Funcionários por Departamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <SamplePieChart />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contratações por Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <SampleBarChart />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tendência de Crescimento da Equipe</CardTitle>
                </CardHeader>
                <CardContent>
                  <SampleLineChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Relatórios Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-3">Nome do Relatório</th>
                        <th className="px-6 py-3">Tipo</th>
                        <th className="px-6 py-3">Data</th>
                        <th className="px-6 py-3">Usuário</th>
                        <th className="px-6 py-3 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {recentReports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-gray-400 mr-3" />
                              <span className="font-medium">{report.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="outline">{report.type}</Badge>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{report.date}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{report.user}</td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="ghost" size="sm">
                              <Download size={16} className="mr-1" />
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportTemplates.map((template) => (
                <Card key={template.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start mb-4">
                      <div className="mr-4 p-2 bg-gray-100 rounded-md">
                        <FileText className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">{template.title}</h3>
                        <Badge variant="outline" className="mt-1">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                      {template.description}
                    </p>
                    <Button variant="outline" className="w-full">
                      Gerar Relatório
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
