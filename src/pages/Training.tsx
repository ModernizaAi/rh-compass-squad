
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Clock, Calendar, ArrowRight, BookOpen, Users, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Sample data for training courses
const courses = [
  {
    id: 1,
    title: "Liderança Efetiva",
    description: "Aprenda técnicas de liderança para gerenciar equipes de alto desempenho.",
    category: "Liderança",
    duration: "8 horas",
    enrolledCount: 24,
    completionRate: 75,
    startDate: "15/05/2025",
    status: "Em andamento"
  },
  {
    id: 2,
    title: "Fundamentos de UX/UI Design",
    description: "Princípios fundamentais de design de experiência do usuário e interface.",
    category: "Design",
    duration: "12 horas",
    enrolledCount: 18,
    completionRate: 62,
    startDate: "22/05/2025",
    status: "Aberto para inscrições"
  },
  {
    id: 3,
    title: "Desenvolvimento Full Stack",
    description: "Aprenda a desenvolver aplicações web completas com React e Node.js.",
    category: "Tecnologia",
    duration: "24 horas",
    enrolledCount: 32,
    completionRate: 48,
    startDate: "10/05/2025",
    status: "Em andamento"
  },
  {
    id: 4,
    title: "Gestão de Projetos Ágeis",
    description: "Metodologias ágeis para gerenciamento de projetos de software.",
    category: "Gestão",
    duration: "16 horas",
    enrolledCount: 42,
    completionRate: 85,
    startDate: "05/05/2025",
    status: "Em andamento"
  }
];

// Sample data for employee training
const employeeTraining = [
  {
    id: 1,
    employeeName: "Carlos Silva",
    position: "Desenvolvedor Full Stack",
    department: "Tecnologia",
    coursesCompleted: 4,
    coursesInProgress: 1,
    lastActivity: "3 dias atrás",
    certifications: ["AWS Certified Developer", "React Certified"]
  },
  {
    id: 2,
    employeeName: "Ana Ferreira",
    position: "Designer UX/UI",
    department: "Produto",
    coursesCompleted: 3,
    coursesInProgress: 2,
    lastActivity: "1 dia atrás",
    certifications: ["UI/UX Certified Designer"]
  },
  {
    id: 3,
    employeeName: "Roberto Santos",
    position: "Gerente de Marketing",
    department: "Marketing",
    coursesCompleted: 2,
    coursesInProgress: 0,
    lastActivity: "1 semana atrás",
    certifications: ["Marketing Digital Certified"]
  },
  {
    id: 4,
    employeeName: "Juliana Costa",
    position: "Analista de RH",
    department: "Recursos Humanos",
    coursesCompleted: 5,
    coursesInProgress: 1,
    lastActivity: "2 dias atrás",
    certifications: ["HR Management Certified", "Talent Acquisition Certified"]
  }
];

export default function Training() {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold">Treinamentos</h1>
        <p className="text-gray-500 mt-1">
          Gerencie cursos, certificações e desenvolvimento profissional
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-sm text-gray-500">Cursos Ativos</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold">86</h3>
              <p className="text-sm text-gray-500">Participantes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <CheckCircle2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold">68%</h3>
              <p className="text-sm text-gray-500">Taxa de Conclusão</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-yellow-100 p-3 rounded-full mb-4">
                <GraduationCap className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold">42</h3>
              <p className="text-sm text-gray-500">Certificações Emitidas</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="courses">Cursos</TabsTrigger>
              <TabsTrigger value="employees">Funcionários</TabsTrigger>
              <TabsTrigger value="calendar">Calendário</TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Cursos Disponíveis</h2>
                <Button>Novo Curso</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <Card key={course.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <Badge variant={
                          course.status === "Em andamento" ? "default" :
                          course.status === "Concluído" ? "success" : "secondary"
                        }>
                          {course.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 text-gray-500 mr-2" />
                          <span>{course.category}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-500 mr-2" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-500 mr-2" />
                          <span>{course.enrolledCount} participantes</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                          <span>Início: {course.startDate}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Taxa de Conclusão</span>
                          <span>{course.completionRate}%</span>
                        </div>
                        <Progress value={course.completionRate} className="h-2" />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          Ver Detalhes <ArrowRight size={16} className="ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="employees">
              <div className="bg-white rounded-lg border border-gray-100 shadow-soft overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="font-semibold">Progresso dos Funcionários</h2>
                  <Button variant="outline" size="sm">
                    Exportar Relatório
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                      <tr>
                        <th className="px-6 py-3 text-left">Funcionário</th>
                        <th className="px-6 py-3 text-left">Departamento</th>
                        <th className="px-6 py-3 text-center">Cursos Concluídos</th>
                        <th className="px-6 py-3 text-center">Em Andamento</th>
                        <th className="px-6 py-3 text-left">Última Atividade</th>
                        <th className="px-6 py-3 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {employeeTraining.map((employee) => (
                        <tr key={employee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-800">{employee.employeeName}</p>
                              <p className="text-xs text-gray-500">{employee.position}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">{employee.department}</td>
                          <td className="px-6 py-4 text-center">
                            <span className="font-medium">{employee.coursesCompleted}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="font-medium">{employee.coursesInProgress}</span>
                          </td>
                          <td className="px-6 py-4 text-sm">{employee.lastActivity}</td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="ghost" size="sm">
                              Perfil <ArrowRight size={16} className="ml-1" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Calendário de Treinamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px] flex items-center justify-center border rounded-md p-4">
                    <div className="text-center text-gray-500">
                      <Calendar className="mx-auto h-16 w-16 mb-2 opacity-50" />
                      <p>Visualização do calendário seria exibida aqui.</p>
                      <p className="text-sm text-muted-foreground">
                        Implementação do calendário pendente.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
