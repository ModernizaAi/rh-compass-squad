
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Calendar, MapPin, Briefcase, Users, Clock, CheckCircle, XCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Dados fictícios de vagas para simulação
const jobPostingsData = [
  {
    id: "1",
    title: "Desenvolvedor Frontend",
    department: "Tecnologia",
    location: "Remoto",
    type: "Tempo Integral",
    applications: 24,
    postedDate: "29/04/2025",
    deadline: "15/05/2025",
    daysLeft: 7,
    status: "Ativo",
    description: "Estamos procurando um desenvolvedor Frontend experiente para se juntar à nossa equipe de tecnologia. O candidato ideal terá experiência sólida com React, TypeScript e design responsivo. Será responsável por desenvolver e manter interfaces de usuário de alta qualidade para nossos produtos.",
    requirements: "- 3+ anos de experiência com desenvolvimento frontend\n- Domínio de React e TypeScript\n- Conhecimento de HTML5, CSS3 e design responsivo\n- Experiência com gerenciamento de estado (Redux, Context API)\n- Conhecimento de testes automatizados\n- Boa comunicação e trabalho em equipe",
    benefits: "- Plano de saúde\n- Vale refeição\n- Horário flexível\n- Home office\n- Ambiente de trabalho colaborativo\n- Plano de carreira",
    salary: "R$ 7.000,00 - R$ 10.000,00",
    candidates: [
      { id: "c1", name: "Ana Luiza Santos", status: "Entrevista", date: "12/05/2025" },
      { id: "c2", name: "Bruno Martins", status: "CV Aprovado", date: "10/05/2025" },
      { id: "c3", name: "Carla Oliveira", status: "Teste Técnico", date: "09/05/2025" },
      { id: "c4", name: "Danilo Ferreira", status: "Triagem", date: "07/05/2025" },
    ]
  },
  // ... dados simulados de outras vagas
];

export default function JobPostingDetails() {
  const { id } = useParams();
  const job = jobPostingsData.find(j => j.id === id) || jobPostingsData[0]; // Fallback para o primeiro se não encontrar
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center">
            <Link to="/recruitment" className="flex items-center text-gray-500 hover:text-primary mr-4">
              <ArrowLeft size={16} className="mr-1" />
              <span>Voltar</span>
            </Link>
            <h1 className="text-2xl font-bold">{job.title}</h1>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link to={`/recruitment/edit/${job.id}`}>
              <Button>
                <Edit size={16} className="mr-2" />
                Editar Vaga
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna da esquerda - Detalhes da vaga */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-100 shadow-soft overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">{job.title}</h2>
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {job.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Briefcase size={16} className="mr-2 text-gray-500" />
                    <span className="text-gray-700">{job.department} • {job.type}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-gray-500" />
                    <span className="text-gray-700">{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    <span className="text-gray-700">Publicada em {job.postedDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-amber-600" />
                    <span className="text-amber-600">Encerra em {job.deadline} ({job.daysLeft} dias)</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-5 mt-5">
                  <h3 className="text-lg font-medium mb-3">Descrição da Vaga</h3>
                  <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                </div>

                <div className="border-t border-gray-100 pt-5 mt-5">
                  <h3 className="text-lg font-medium mb-3">Requisitos</h3>
                  <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
                </div>

                <div className="border-t border-gray-100 pt-5 mt-5">
                  <h3 className="text-lg font-medium mb-3">Benefícios</h3>
                  <p className="text-gray-700 whitespace-pre-line">{job.benefits}</p>
                </div>

                {job.salary && (
                  <div className="border-t border-gray-100 pt-5 mt-5">
                    <h3 className="text-lg font-medium mb-3">Faixa Salarial</h3>
                    <p className="text-gray-700">{job.salary}</p>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 p-6 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center">
                    <Users size={16} className="mr-2 text-primary" />
                    <span className="text-primary font-medium">{job.applications} candidatos cadastrados</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">
                      Encerrar Vaga
                    </Button>
                    <Button>
                      Ver Candidatos
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna da direita - Candidatos recentes */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-100 shadow-soft overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-medium">Candidatos Recentes</h3>
              </div>
              
              <div className="divide-y divide-gray-100">
                {job.candidates.map((candidate) => (
                  <div key={candidate.id} className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="font-medium text-primary text-sm">
                          {candidate.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{candidate.name}</p>
                        <p className="text-xs text-gray-500">Candidatura: {candidate.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="inline-flex px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                        {candidate.status}
                      </span>
                      
                      <div className="flex gap-2">
                        <button className="p-1 text-green-600 hover:bg-green-50 rounded-full">
                          <CheckCircle size={18} />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded-full">
                          <XCircle size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <Link 
                  to={`/recruitment/job/${job.id}/candidates`} 
                  className="block text-center text-sm text-primary font-medium hover:underline"
                >
                  Ver todos os candidatos
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-100 shadow-soft overflow-hidden mt-6">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-medium">Compartilhar Vaga</h3>
              </div>
              
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-3">Compartilhe esta vaga nas redes sociais para atrair mais candidatos:</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Email
                  </Button>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium mb-2">Link direto:</p>
                  <div className="flex">
                    <Input 
                      readOnly 
                      value={`https://empresa.com/vagas/${job.id}`} 
                      className="text-xs bg-gray-50"
                    />
                    <Button variant="secondary" size="sm" className="ml-2">
                      Copiar
                    </Button>
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

// Componente Input simulado para o exemplo
const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};
