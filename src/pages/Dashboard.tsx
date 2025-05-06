
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { EmployeeListCard } from "@/components/dashboard/EmployeeListCard";
import { JobPostingsCard } from "@/components/dashboard/JobPostingsCard";
import { UpcomingEventsCard } from "@/components/dashboard/UpcomingEventsCard";
import { BarChart3, Users, Briefcase, Award } from "lucide-react";

// Sample data
const recentEmployees = [
  {
    id: "1",
    name: "Carlos Silva",
    position: "Desenvolvedor Full Stack",
    department: "Tecnologia",
  },
  {
    id: "2",
    name: "Ana Ferreira",
    position: "Designer UX/UI",
    department: "Produto",
  },
  {
    id: "3",
    name: "Roberto Santos",
    position: "Gerente de Marketing",
    department: "Marketing",
  },
  {
    id: "4",
    name: "Juliana Costa",
    position: "Analista de RH",
    department: "Recursos Humanos",
  },
];

const jobPostings = [
  {
    id: "1",
    title: "Desenvolvedor Frontend",
    department: "Tecnologia",
    location: "Remoto",
    applications: 24,
    daysLeft: 7,
  },
  {
    id: "2",
    title: "Analista de Marketing",
    department: "Marketing",
    location: "São Paulo",
    applications: 18,
    daysLeft: 14,
  },
  {
    id: "3",
    title: "Gerente de Projetos",
    department: "Operações",
    location: "Híbrido",
    applications: 12,
    daysLeft: 21,
  },
];

const upcomingEvents = [
  {
    id: "1",
    title: "Treinamento de Liderança",
    date: "22 de Maio, 2025",
    time: "14:00-16:00",
    type: "training" as const,
  },
  {
    id: "2",
    title: "Avaliação de Desempenho - Equipe de Design",
    date: "25 de Maio, 2025",
    time: "10:00-12:00",
    type: "review" as const,
  },
  {
    id: "3",
    title: "Entrevista - Candidato para Analista de Dados",
    date: "28 de Maio, 2025",
    time: "15:30-16:30",
    type: "interview" as const,
  },
];

export default function Dashboard() {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-1">Bem-vindo ao painel de controle CompassHR</p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total de Funcionários"
            value="128"
            icon={<Users size={20} />}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Vagas em Aberto"
            value="8"
            icon={<Briefcase size={20} />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Avaliações Pendentes"
            value="23"
            icon={<Award size={20} />}
            trend={{ value: 2, isPositive: false }}
          />
          <StatCard
            title="Adesão ao Treinamento"
            value="86%"
            icon={<BarChart3 size={20} />}
            trend={{ value: 4, isPositive: true }}
          />
        </div>
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EmployeeListCard
            title="Funcionários Recentes"
            employees={recentEmployees}
          />
          <div className="grid grid-cols-1 gap-6">
            <JobPostingsCard jobPostings={jobPostings} />
            <UpcomingEventsCard events={upcomingEvents} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
