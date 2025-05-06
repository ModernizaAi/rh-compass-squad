import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Briefcase, Users, Calendar, MapPin, Plus, ExternalLink, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Sample job posting data
const jobPostingsData = [
  {
    id: "1",
    title: "Desenvolvedor Frontend",
    department: "Tecnologia",
    location: "Remoto",
    type: "Tempo Integral",
    applications: 24,
    postedDate: "29/04/2025",
    daysLeft: 7,
    status: "Ativo",
  },
  {
    id: "2",
    title: "Analista de Marketing",
    department: "Marketing",
    location: "São Paulo",
    type: "Tempo Integral",
    applications: 18,
    postedDate: "27/04/2025",
    daysLeft: 14,
    status: "Ativo",
  },
  {
    id: "3",
    title: "Gerente de Projetos",
    department: "Operações",
    location: "Híbrido",
    type: "Tempo Integral",
    applications: 12,
    postedDate: "25/04/2025",
    daysLeft: 21,
    status: "Ativo",
  },
  {
    id: "4",
    title: "Assistente Administrativo",
    department: "Administração",
    location: "São Paulo",
    type: "Meio Período",
    applications: 42,
    postedDate: "20/04/2025",
    daysLeft: 3,
    status: "Ativo",
  },
  {
    id: "5",
    title: "Especialista em Vendas",
    department: "Vendas",
    location: "Rio de Janeiro",
    type: "Tempo Integral",
    applications: 15,
    postedDate: "15/04/2025",
    daysLeft: 10,
    status: "Ativo",
  },
  {
    id: "6",
    title: "Designer UX/UI",
    department: "Produto",
    location: "Remoto",
    type: "Tempo Integral",
    applications: 28,
    postedDate: "10/04/2025",
    daysLeft: 2,
    status: "Ativo",
  },
];

export default function Recruitment() {
  return (
    <Layout>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Recrutamento</h1>
            <p className="text-gray-500 mt-1">Gerenciamento de vagas e processos seletivos</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link to="/recruitment/create">
              <Button className="flex items-center">
                <Plus size={16} className="mr-2" />
                Publicar Vaga
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Vagas Ativas</h3>
              <div className="p-2 rounded-md bg-primary/10 text-primary">
                <Briefcase size={20} />
              </div>
            </div>
            <p className="stat-value mt-2">6</p>
            <p className="stat-label">em 3 departamentos</p>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Total de Candidatos</h3>
              <div className="p-2 rounded-md bg-secondary/10 text-secondary">
                <Users size={20} />
              </div>
            </div>
            <p className="stat-value mt-2">139</p>
            <p className="stat-label">+12% vs. mês anterior</p>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Entrevistas Agendadas</h3>
              <div className="p-2 rounded-md bg-amber-500/10 text-amber-500">
                <Calendar size={20} />
              </div>
            </div>
            <p className="stat-value mt-2">14</p>
            <p className="stat-label">próximos 7 dias</p>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-soft border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-lg font-medium">Vagas Publicadas</h3>
            <div className="flex items-center w-full sm:w-auto max-w-xs rounded-md bg-white border border-gray-200 px-3 py-2">
              <Search size={16} className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Buscar vagas..." 
                className="border-0 p-0 text-sm w-full focus:ring-0 bg-transparent"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {jobPostingsData.map((job) => (
              <div key={job.id} className="border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-gray-900">{job.title}</h4>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {job.status}
                    </span>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Briefcase size={14} className="mr-2" />
                      {job.department} • {job.type}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={14} className="mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={14} className="mr-2" />
                      Publicada em {job.postedDate}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {job.applications} candidatos
                    </span>
                    <span className="text-sm text-amber-600">{job.daysLeft} dias restantes</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <Link 
                    to={`/recruitment/job/${job.id}`} 
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Ver Detalhes
                  </Link>
                  <Link to={`/recruitment/job/${job.id}`} className="text-gray-500 hover:text-primary">
                    <ExternalLink size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
