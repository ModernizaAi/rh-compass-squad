
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Calendar, BarChart3, Users, ArrowRight, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Sample data for performance reviews
const reviews = [
  {
    id: 1,
    employeeName: "Carlos Silva",
    position: "Desenvolvedor Full Stack",
    department: "Tecnologia",
    reviewDate: "15/04/2025",
    status: "Completo",
    score: 4.5,
    feedback: "Excelente trabalho em equipe e habilidades técnicas sólidas.",
  },
  {
    id: 2,
    employeeName: "Ana Ferreira",
    position: "Designer UX/UI",
    department: "Produto",
    reviewDate: "10/04/2025",
    status: "Completo",
    score: 4.2,
    feedback: "Muito criativa e entrega projetos antes do prazo.",
  },
  {
    id: 3,
    employeeName: "Roberto Santos",
    position: "Gerente de Marketing",
    department: "Marketing",
    reviewDate: "25/04/2025",
    status: "Pendente",
    score: null,
    feedback: "",
  },
  {
    id: 4,
    employeeName: "Juliana Costa",
    position: "Analista de RH",
    department: "Recursos Humanos",
    reviewDate: "30/04/2025",
    status: "Pendente",
    score: null,
    feedback: "",
  },
];

// Sample data for goals
const goals = [
  {
    id: 1,
    title: "Aumentar retenção de talentos",
    progress: 75,
    startDate: "01/01/2025",
    endDate: "31/12/2025",
    owner: "Departamento de RH",
    status: "Em andamento",
  },
  {
    id: 2,
    title: "Implementar nova plataforma de treinamento",
    progress: 40,
    startDate: "01/03/2025",
    endDate: "30/06/2025",
    owner: "Equipe de T&D",
    status: "Em andamento",
  },
  {
    id: 3,
    title: "Reduzir tempo de contratação em 20%",
    progress: 60,
    startDate: "01/02/2025",
    endDate: "31/05/2025",
    owner: "Equipe de Recrutamento",
    status: "Em andamento",
  },
];

export default function Performance() {
  const [activeTab, setActiveTab] = useState("reviews");

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold">Gestão de Desempenho</h1>
        <p className="text-gray-500 mt-1">
          Gerencie avaliações de desempenho e objetivos
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">24</h3>
              <p className="text-sm text-gray-500">Avaliações Completas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-yellow-100 p-3 rounded-full mb-4">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-sm text-gray-500">Avaliações Pendentes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold">4.2</h3>
              <p className="text-sm text-gray-500">Média de Desempenho</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold">86%</h3>
              <p className="text-sm text-gray-500">Taxa de Participação</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="reviews" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
              <TabsTrigger value="goals">Objetivos</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
            </TabsList>
            
            <TabsContent value="reviews">
              <div className="bg-white rounded-lg border border-gray-100 shadow-soft overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="font-semibold">Avaliações Recentes</h2>
                  <Button variant="outline" size="sm">
                    Nova Avaliação
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                      <tr>
                        <th className="px-6 py-3 text-left">Funcionário</th>
                        <th className="px-6 py-3 text-left">Departamento</th>
                        <th className="px-6 py-3 text-left">Data</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Pontuação</th>
                        <th className="px-6 py-3 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {reviews.map((review) => (
                        <tr key={review.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-800">{review.employeeName}</p>
                              <p className="text-xs text-gray-500">{review.position}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">{review.department}</td>
                          <td className="px-6 py-4 text-sm">{review.reviewDate}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                review.status === "Completo"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {review.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {review.score ? (
                              <div className="flex items-center">
                                <span className="font-medium">{review.score}</span>
                                <div className="ml-2 flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Award
                                      key={i}
                                      size={14}
                                      className={`${
                                        i < Math.floor(review.score)
                                          ? "text-yellow-400"
                                          : "text-gray-200"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="ghost" size="sm">
                              Detalhes <ArrowRight size={16} className="ml-1" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="goals">
              <div className="bg-white rounded-lg border border-gray-100 shadow-soft overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="font-semibold">Objetivos da Empresa</h2>
                  <Button variant="outline" size="sm">
                    Novo Objetivo
                  </Button>
                </div>
                <div className="divide-y divide-gray-100">
                  {goals.map((goal) => (
                    <div key={goal.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{goal.title}</h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            goal.status === "Em andamento"
                              ? "bg-blue-100 text-blue-800"
                              : goal.status === "Completo"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {goal.status}
                        </span>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progresso</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <div className="space-x-4 flex">
                          <span>Início: {goal.startDate}</span>
                          <span>Fim: {goal.endDate}</span>
                        </div>
                        <span>Responsável: {goal.owner}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reports">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Pontuações por Departamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md p-4">
                      <div className="text-center text-gray-500">
                        <PieChart className="mx-auto h-16 w-16 mb-2 opacity-50" />
                        <p>Dados de gráfico seriam exibidos aqui.</p>
                        <p className="text-sm text-muted-foreground">
                          Implementação de gráficos pendente.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Tendência de Desempenho
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md p-4">
                      <div className="text-center text-gray-500">
                        <BarChart3 className="mx-auto h-16 w-16 mb-2 opacity-50" />
                        <p>Dados de gráfico seriam exibidos aqui.</p>
                        <p className="text-sm text-muted-foreground">
                          Implementação de gráficos pendente.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
