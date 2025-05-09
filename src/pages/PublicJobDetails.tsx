
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Briefcase, MapPin, Calendar, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mesmo dados fictícios do componente Recruitment
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
    description: "Estamos em busca de um Desenvolvedor Frontend talentoso para se juntar à nossa equipe de tecnologia. O candidato ideal terá experiência em React, TypeScript e construção de interfaces responsivas.",
    requirements: [
      "Experiência mínima de 3 anos com desenvolvimento frontend",
      "Conhecimento avançado em React e TypeScript",
      "Familiaridade com bibliotecas de UI como Material UI ou Tailwind",
      "Experiência com gerenciamento de estado usando Redux ou similar",
      "Conhecimento de práticas de UI/UX e design responsivo",
      "Capacidade de trabalhar em ambientes ágeis com entregas contínuas"
    ],
    benefits: [
      "Remuneração competitiva",
      "Trabalho 100% remoto",
      "Horário flexível",
      "Plano de saúde e odontológico",
      "Vale refeição/alimentação",
      "Auxílio home office"
    ]
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
    description: "Procuramos um Analista de Marketing estratégico para desenvolver e implementar campanhas efetivas, analisar métricas e apoiar o crescimento da marca.",
    requirements: [
      "Formação em Marketing, Comunicação ou áreas relacionadas",
      "Mínimo de 2 anos de experiência em marketing digital",
      "Conhecimento de ferramentas de análise como Google Analytics",
      "Experiência com redes sociais e plataformas de mídia",
      "Habilidades analíticas para interpretar dados de campanhas",
      "Excelente comunicação escrita e verbal"
    ],
    benefits: [
      "Remuneração competitiva",
      "Vale transporte",
      "Plano de saúde e odontológico",
      "Vale refeição/alimentação",
      "Gympass",
      "Programa de participação nos lucros"
    ]
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
    description: "Buscamos um Gerente de Projetos experiente para liderar nossos projetos estratégicos, coordenar equipes multidisciplinares e garantir a entrega dentro dos prazos e orçamentos.",
    requirements: [
      "Formação em Administração, Engenharia ou áreas relacionadas",
      "Certificação PMP desejável",
      "Mínimo de 5 anos de experiência em gerenciamento de projetos",
      "Experiência com metodologias ágeis e tradicionais",
      "Excelente habilidade de comunicação e liderança",
      "Capacidade de gerenciar múltiplos projetos simultaneamente"
    ],
    benefits: [
      "Remuneração competitiva",
      "Modelo de trabalho híbrido",
      "Plano de saúde e odontológico",
      "Vale refeição/alimentação",
      "Seguro de vida",
      "Bônus anual por desempenho"
    ]
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
    description: "Procuramos um Assistente Administrativo organizado para apoiar as operações diárias do escritório, gerenciar documentações e dar suporte à equipe administrativa.",
    requirements: [
      "Ensino médio completo, curso técnico ou superior em andamento",
      "Experiência prévia em funções administrativas",
      "Conhecimento intermediário do pacote Office",
      "Habilidades de organização e gerenciamento de tempo",
      "Boa comunicação verbal e escrita",
      "Proatividade e capacidade de multitarefas"
    ],
    benefits: [
      "Remuneração compatível com o mercado",
      "Vale transporte",
      "Vale refeição",
      "Convênio com farmácias",
      "Possibilidade de efetivação em tempo integral"
    ]
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
    description: "Estamos procurando um Especialista em Vendas dinâmico para desenvolver novas oportunidades de negócio, manter relacionamentos com clientes e atingir metas comerciais.",
    requirements: [
      "Experiência mínima de 3 anos em vendas corporativas",
      "Histórico comprovado de atingimento de metas",
      "Habilidades de negociação e fechamento de vendas",
      "Conhecimento de CRM (Salesforce preferencial)",
      "Excelente comunicação e relacionamento interpessoal",
      "Disponibilidade para viagens ocasionais"
    ],
    benefits: [
      "Salário fixo + comissão atrativa",
      "Vale transporte",
      "Plano de saúde e odontológico",
      "Vale refeição/alimentação",
      "Bônus por desempenho",
      "Plano de carreira"
    ]
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
    description: "Buscamos um Designer UX/UI talentoso para criar interfaces intuitivas e atrativas, conduzir pesquisas com usuários e colaborar no desenvolvimento de produtos digitais inovadores.",
    requirements: [
      "Formação em Design, Interação Humano-Computador ou áreas relacionadas",
      "Portfólio demonstrando projetos de UX/UI",
      "Experiência com ferramentas como Figma, Adobe XD ou Sketch",
      "Conhecimento de princípios de usabilidade e acessibilidade",
      "Habilidade para conduzir e interpretar pesquisas com usuários",
      "Experiência em criar wireframes, protótipos e design systems"
    ],
    benefits: [
      "Remuneração competitiva",
      "Trabalho 100% remoto",
      "Horário flexível",
      "Plano de saúde e odontológico",
      "Vale refeição/alimentação",
      "Auxílio home office"
    ]
  },
];

export default function PublicJobDetails() {
  const { id } = useParams<{ id: string }>();
  const job = jobPostingsData.find(job => job.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Vaga não encontrada</h2>
          <p className="text-gray-600 mb-4">A vaga que você está procurando não existe ou foi removida.</p>
          <Link to="/public/job-listings">
            <Button>Ver todas as vagas</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Portal de Vagas</h1>
              <p className="text-gray-600 mt-1">Detalhes da vaga</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/auth">
                <Button variant="outline" className="mr-2">Entrar</Button>
              </Link>
              <Link to="/auth?tab=signup">
                <Button>Cadastre-se</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Link to="/public/job-listings" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft size={16} className="mr-1" />
          Voltar para todas as vagas
        </Link>

        <Card className="overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                  <Badge variant="outline" className="ml-3 bg-green-100 text-green-800 border-green-200">
                    {job.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-y-2 mt-2">
                  <div className="flex items-center text-gray-600 mr-4">
                    <Briefcase size={16} className="mr-1.5" />
                    <span>{job.department} • {job.type}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mr-4">
                    <MapPin size={16} className="mr-1.5" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-1.5" />
                    <span>Publicada em {job.postedDate}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="flex items-center gap-1">
                  <Share2 size={16} />
                  Compartilhar
                </Button>
                <Button>Candidatar-se</Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Descrição da vaga</h2>
              <p className="text-gray-700">{job.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Requisitos</h2>
              <ul className="list-disc list-inside space-y-1.5 text-gray-700">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Benefícios</h2>
              <ul className="list-disc list-inside space-y-1.5 text-gray-700">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-6">
              <h2 className="text-lg font-semibold mb-3">Candidatar-se a esta vaga</h2>
              <p className="text-gray-700 mb-4">
                Para se candidatar a esta vaga, você precisa criar uma conta ou fazer login no nosso sistema.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/auth?tab=signup">
                  <Button className="w-full sm:w-auto">Criar conta e candidatar-se</Button>
                </Link>
                <Link to="/auth">
                  <Button variant="outline" className="w-full sm:w-auto">Já tenho uma conta</Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">© 2025 CompassHR. Todos os direitos reservados.</p>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
              <Link to="/public/job-listings" className="text-primary hover:underline">Vagas</Link>
              <Link to="/auth" className="text-primary hover:underline">Entrar</Link>
              <Link to="/auth?tab=signup" className="text-primary hover:underline">Cadastre-se</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
