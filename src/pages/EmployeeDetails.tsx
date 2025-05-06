
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Mail, Phone, Briefcase, Calendar, MapPin, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Dados fictícios de funcionários para simulação
const employeesData = [
  {
    id: "1",
    name: "Carlos Silva",
    email: "carlos.silva@empresa.com",
    position: "Desenvolvedor Full Stack",
    department: "Tecnologia",
    status: "Ativo",
    hireDate: "15/02/2022",
    manager: "Mariana Alves",
    phone: "(11) 99876-5432",
    address: "Rua das Flores, 123 - São Paulo, SP",
    salary: "R$ 8.500,00",
    notes: "Especialista em React e Node.js. Trabalha remotamente às sextas-feiras.",
    documents: [
      { name: "Contrato de Trabalho", date: "15/02/2022" },
      { name: "Termo de Confidencialidade", date: "15/02/2022" }
    ],
    skills: ["React", "Node.js", "TypeScript", "MongoDB"]
  },
  // ... dados simulados dos outros funcionários
];

export default function EmployeeDetails() {
  const { id } = useParams();
  const employee = employeesData.find(emp => emp.id === id) || employeesData[0]; // Fallback para o primeiro se não encontrar
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center">
            <Link to="/employees" className="flex items-center text-gray-500 hover:text-primary mr-4">
              <ArrowLeft size={16} className="mr-1" />
              <span>Voltar</span>
            </Link>
            <h1 className="text-2xl font-bold">{employee.name}</h1>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link to={`/employees/edit/${employee.id}`}>
              <Button>
                <Edit size={16} className="mr-2" />
                Editar Perfil
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna da esquerda - Informações pessoais */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-100 shadow-soft overflow-hidden">
              <div className="p-6 flex flex-col items-center text-center border-b border-gray-100">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-3xl font-medium text-primary">
                    {employee.name.charAt(0)}
                  </span>
                </div>
                <h2 className="text-xl font-bold">{employee.name}</h2>
                <p className="text-gray-500">{employee.position}</p>
                <p className="text-sm text-primary mt-1">{employee.department}</p>
                
                <div className="mt-3 flex flex-col space-y-2 w-full">
                  <div className="flex items-center text-sm">
                    <Mail size={14} className="mr-2 text-gray-500" />
                    <span className="text-gray-700">{employee.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone size={14} className="mr-2 text-gray-500" />
                    <span className="text-gray-700">{employee.phone}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 w-full">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {employee.status}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {employee.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="inline-flex px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-100 shadow-soft overflow-hidden mt-6">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-sm font-medium text-gray-900">Documentos</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {employee.documents.map((doc, index) => (
                  <div key={index} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.date}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna da direita - Detalhes profissionais */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-100 shadow-soft p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Profissionais</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Cargo</p>
                  <div className="flex items-center">
                    <Briefcase size={16} className="mr-2 text-gray-500" />
                    <p className="font-medium">{employee.position}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Departamento</p>
                  <div className="flex items-center">
                    <User size={16} className="mr-2 text-gray-500" />
                    <p className="font-medium">{employee.department}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Data de Contratação</p>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    <p className="font-medium">{employee.hireDate}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Gestor</p>
                  <div className="flex items-center">
                    <User size={16} className="mr-2 text-gray-500" />
                    <p className="font-medium">{employee.manager}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Salário</p>
                  <p className="font-medium">{employee.salary}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Endereço</p>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-gray-500" />
                    <p className="font-medium">{employee.address}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-md font-medium text-gray-900 mb-2">Observações</h4>
                <p className="text-gray-700">{employee.notes}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-100 shadow-soft p-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Histórico de Atividades</h3>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Calendar size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Avaliação Semestral</p>
                    <p className="text-xs text-gray-500">Realizada em 10/04/2023</p>
                    <p className="text-sm mt-1">Resultado: Excelente</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Calendar size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Treinamento React Avançado</p>
                    <p className="text-xs text-gray-500">Concluído em 22/03/2023</p>
                    <p className="text-sm mt-1">40 horas</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                    <Calendar size={16} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Promoção</p>
                    <p className="text-xs text-gray-500">01/02/2023</p>
                    <p className="text-sm mt-1">De Desenvolvedor Junior para Desenvolvedor Full Stack</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
