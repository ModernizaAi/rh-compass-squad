
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckCircle, Clock, BookOpen, Award } from "lucide-react";

interface Training {
  id: string;
  title: string;
  description: string;
  status: "não iniciado" | "em andamento" | "concluído";
  progress: number;
  dueDate?: string;
  completionDate?: string;
  certificateUrl?: string;
  type: "obrigatório" | "opcional";
  category: string;
}

// Dados de exemplo
const sampleTrainings: Training[] = [
  {
    id: "1",
    title: "Segurança da Informação",
    description: "Treinamento obrigatório anual sobre políticas de segurança da informação da empresa.",
    status: "em andamento",
    progress: 60,
    dueDate: "2025-06-30T00:00:00Z",
    type: "obrigatório",
    category: "Compliance",
  },
  {
    id: "2",
    title: "Liderança e Gestão de Equipes",
    description: "Desenvolva habilidades essenciais para liderar equipes de alto desempenho.",
    status: "concluído",
    progress: 100,
    completionDate: "2024-11-15T00:00:00Z",
    certificateUrl: "#",
    type: "opcional",
    category: "Liderança",
  },
  {
    id: "3",
    title: "Código de Conduta",
    description: "Treinamento sobre o código de conduta e ética da empresa.",
    status: "não iniciado",
    progress: 0,
    dueDate: "2025-08-15T00:00:00Z",
    type: "obrigatório",
    category: "Compliance",
  },
  {
    id: "4",
    title: "Excel Avançado",
    description: "Domine funções avançadas, tabelas dinâmicas e automação com macros.",
    status: "em andamento",
    progress: 35,
    dueDate: "2025-07-20T00:00:00Z",
    type: "opcional",
    category: "Ferramentas",
  },
];

export function MyTrainings() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Meus Treinamentos</h2>
        <Button variant="outline">Explorar Catálogo</Button>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Em Andamento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {sampleTrainings
            .filter((training) => training.status === "em andamento")
            .map((training) => (
              <Card key={training.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{training.title}</CardTitle>
                      <CardDescription>{training.category}</CardDescription>
                    </div>
                    <Badge variant={training.type === "obrigatório" ? "destructive" : "secondary"}>
                      {training.type === "obrigatório" ? "Obrigatório" : "Opcional"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-600 mb-2">{training.description}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>{training.progress}%</span>
                    </div>
                    <Progress value={training.progress} className="h-2" />
                  </div>
                  {training.dueDate && (
                    <div className="flex items-center gap-1 mt-2 text-sm text-amber-600">
                      <Clock size={16} />
                      <span>
                        Prazo: {format(parseISO(training.dueDate), "dd/MM/yyyy", { locale: ptBR })}
                      </span>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Continuar</Button>
                </CardFooter>
              </Card>
            ))}
        </div>

        <h3 className="text-lg font-medium mb-3">A Iniciar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {sampleTrainings
            .filter((training) => training.status === "não iniciado")
            .map((training) => (
              <Card key={training.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{training.title}</CardTitle>
                      <CardDescription>{training.category}</CardDescription>
                    </div>
                    <Badge variant={training.type === "obrigatório" ? "destructive" : "secondary"}>
                      {training.type === "obrigatório" ? "Obrigatório" : "Opcional"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-600 mb-2">{training.description}</p>
                  {training.dueDate && (
                    <div className="flex items-center gap-1 mt-2 text-sm text-amber-600">
                      <Clock size={16} />
                      <span>
                        Prazo: {format(parseISO(training.dueDate), "dd/MM/yyyy", { locale: ptBR })}
                      </span>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Iniciar</Button>
                </CardFooter>
              </Card>
            ))}
        </div>

        <h3 className="text-lg font-medium mb-3">Concluídos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleTrainings
            .filter((training) => training.status === "concluído")
            .map((training) => (
              <Card key={training.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{training.title}</CardTitle>
                      <CardDescription>{training.category}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle size={14} className="mr-1" />
                      Concluído
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-600 mb-2">{training.description}</p>
                  {training.completionDate && (
                    <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                      <Award size={16} />
                      <span>
                        Concluído em:{" "}
                        {format(parseISO(training.completionDate), "dd/MM/yyyy", {
                          locale: ptBR,
                        })}
                      </span>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <div className="flex w-full gap-2">
                    <Button variant="outline" className="w-full">
                      <BookOpen size={16} className="mr-2" />
                      Revisar
                    </Button>
                    {training.certificateUrl && (
                      <Button variant="outline" className="w-full">
                        <Award size={16} className="mr-2" />
                        Certificado
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
