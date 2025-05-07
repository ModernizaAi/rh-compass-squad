
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Download,
  FileText,
  Users,
  DollarSign,
  Clock,
  PieChart,
  ExternalLink,
  ChevronDown,
  Filter
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';

type PayrollPeriod = {
  id: number;
  period: string;
  startDate: string;
  endDate: string;
  status: "processed" | "pending" | "draft";
  totalEmployees: number;
  totalAmount: number;
};

const payrollPeriods: PayrollPeriod[] = [
  {
    id: 1,
    period: "Maio 2025",
    startDate: "01/05/2025",
    endDate: "31/05/2025",
    status: "pending",
    totalEmployees: 45,
    totalAmount: 278500
  },
  {
    id: 2,
    period: "Abril 2025",
    startDate: "01/04/2025",
    endDate: "30/04/2025",
    status: "processed",
    totalEmployees: 43,
    totalAmount: 265800
  },
  {
    id: 3,
    period: "Março 2025",
    startDate: "01/03/2025",
    endDate: "31/03/2025",
    status: "processed",
    totalEmployees: 42,
    totalAmount: 259200
  },
  {
    id: 4,
    period: "Fevereiro 2025",
    startDate: "01/02/2025",
    endDate: "28/02/2025",
    status: "processed",
    totalEmployees: 40,
    totalAmount: 248000
  },
  {
    id: 5,
    period: "Janeiro 2025",
    startDate: "01/01/2025",
    endDate: "31/01/2025",
    status: "processed",
    totalEmployees: 40,
    totalAmount: 248000
  }
];

const payrollChartData = [
  { name: 'Jan', value: 248000 },
  { name: 'Fev', value: 248000 },
  { name: 'Mar', value: 259200 },
  { name: 'Abr', value: 265800 },
  { name: 'Mai', value: 278500 },
  { name: 'Jun', value: 0 },
];

const expenseCategories = [
  { name: 'Salários', value: 205000 },
  { name: 'Benefícios', value: 36800 },
  { name: 'Horas extras', value: 12500 },
  { name: 'Bônus', value: 11500 },
];

const StatusBadge = ({ status }: { status: PayrollPeriod["status"] }) => {
  const variants = {
    processed: "bg-green-100 text-green-800",
    pending: "bg-blue-100 text-blue-800",
    draft: "bg-yellow-100 text-yellow-800",
  };

  const labels = {
    processed: "Processado",
    pending: "Pendente",
    draft: "Rascunho",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[status]}`}>
      {labels[status]}
    </span>
  );
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(value);
};

const Payroll = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold">Folha de Pagamento</h1>
            <p className="text-gray-500 mt-1">
              Gerenciamento de salários e compensações
            </p>
          </div>
          <div className="flex space-x-2">
            <Button>
              <DollarSign className="mr-2 h-4 w-4" />
              Novo processamento
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <DollarSign className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold">{formatCurrency(278500)}</h3>
              <p className="text-sm text-gray-500">Total da Folha (Maio)</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <Users className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-2xl font-bold">45</h3>
              <p className="text-sm text-gray-500">Funcionários</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-yellow-100 p-3 rounded-full mb-4">
                <PieChart className="h-6 w-6 text-yellow-700" />
              </div>
              <h3 className="text-2xl font-bold">5,2%</h3>
              <p className="text-sm text-gray-500">Aumento Mensal</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <Clock className="h-6 w-6 text-purple-700" />
              </div>
              <h3 className="text-2xl font-bold">184</h3>
              <p className="text-sm text-gray-500">Horas Extras</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Ciclos de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="history">Histórico</TabsTrigger>
                <TabsTrigger value="reports">Relatórios</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <Card className="w-full lg:w-2/3">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Tendência da Folha de Pagamento</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={payrollChartData}>
                            <XAxis dataKey="name" />
                            <YAxis
                              tickFormatter={(value) => `${(value / 1000)}k`}
                              width={40}
                            />
                            <RechartsTooltip
                              formatter={(value: number) => [formatCurrency(value), "Valor"]}
                              labelFormatter={(label) => `${label}/2025`}
                            />
                            <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="w-full lg:w-1/3">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Próximo Pagamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm text-gray-500">Período:</span>
                          <span className="font-medium">Maio 2025</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm text-gray-500">Data de pagamento:</span>
                          <span className="font-medium">05/06/2025</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm text-gray-500">Status:</span>
                          <StatusBadge status="pending" />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm text-gray-500">Valor total:</span>
                          <span className="font-medium">{formatCurrency(278500)}</span>
                        </div>
                        
                        <div className="pt-2">
                          <Button className="w-full">
                            <FileText className="h-4 w-4 mr-2" />
                            Revisar Folha de Pagamento
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Distribuição de Despesas</CardTitle>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtros
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b text-xs text-gray-500">
                            <th className="text-left pb-2">Categoria</th>
                            <th className="text-right pb-2">Valor</th>
                            <th className="text-right pb-2">Percentual</th>
                            <th className="text-right pb-2">Evolução</th>
                          </tr>
                        </thead>
                        <tbody>
                          {expenseCategories.map((category, index) => (
                            <tr key={index} className="border-b last:border-0">
                              <td className="py-3 font-medium">{category.name}</td>
                              <td className="py-3 text-right">{formatCurrency(category.value)}</td>
                              <td className="py-3 text-right">
                                {(category.value / payrollPeriods[0].totalAmount * 100).toFixed(1)}%
                              </td>
                              <td className="py-3 text-right text-green-600">
                                +{(index % 3 + 1).toFixed(1)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history">
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                        <tr>
                          <th className="px-6 py-3 text-left">Período</th>
                          <th className="px-6 py-3 text-left">Data de Pagamento</th>
                          <th className="px-6 py-3 text-left">Funcionários</th>
                          <th className="px-6 py-3 text-left">Valor Total</th>
                          <th className="px-6 py-3 text-left">Status</th>
                          <th className="px-6 py-3 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {payrollPeriods.map((period) => (
                          <tr key={period.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <p className="font-medium">{period.period}</p>
                              <p className="text-xs text-gray-500">
                                {period.startDate} - {period.endDate}
                              </p>
                            </td>
                            <td className="px-6 py-4">
                              {period.status === "processed" 
                                ? `05/${period.endDate.split('/')[1]}/${period.endDate.split('/')[2]}` 
                                : "-"}
                            </td>
                            <td className="px-6 py-4">{period.totalEmployees}</td>
                            <td className="px-6 py-4">{formatCurrency(period.totalAmount)}</td>
                            <td className="px-6 py-4">
                              <StatusBadge status={period.status} />
                            </td>
                            <td className="px-6 py-4 text-right">
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4 mr-2" />
                                Detalhes
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reports">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Relatório Resumo", icon: FileText, description: "Resumo completo da folha de pagamento" },
                    { title: "Relatório por Departamento", icon: Users, description: "Custos por departamento" },
                    { title: "Impostos e Contribuições", icon: DollarSign, description: "Resumo de impostos e contribuições" },
                    { title: "Relatório de Horas Extras", icon: Clock, description: "Detalhes de horas extras por funcionário" },
                    { title: "Benefícios", icon: PieChart, description: "Relatório detalhado de benefícios" },
                    { title: "Relatório para Contabilidade", icon: ExternalLink, description: "Exportação para sistema contábil" }
                  ].map((report, index) => (
                    <Card key={index} className="hover:bg-gray-50 cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gray-100 p-3 rounded-full">
                            <report.icon className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{report.title}</h3>
                            <p className="text-sm text-gray-500">{report.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Payroll;
