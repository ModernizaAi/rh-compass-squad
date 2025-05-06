
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Schema de validação do formulário
const jobPostingSchema = z.object({
  title: z.string().min(2, { message: "Título da vaga é obrigatório" }),
  department: z.string().min(2, { message: "Departamento é obrigatório" }),
  location: z.string().min(2, { message: "Localização é obrigatória" }),
  type: z.string().min(2, { message: "Tipo de contrato é obrigatório" }),
  description: z.string().min(10, { message: "Descrição deve conter pelo menos 10 caracteres" }),
  requirements: z.string().min(10, { message: "Requisitos devem conter pelo menos 10 caracteres" }),
  salary: z.string().optional(),
  benefits: z.string().optional(),
  deadline: z.string().min(1, { message: "Data limite é obrigatória" }),
});

export default function JobPostingForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof jobPostingSchema>>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      title: "",
      department: "",
      location: "",
      type: "",
      description: "",
      requirements: "",
      salary: "",
      benefits: "",
      deadline: "",
    },
  });

  function onSubmit(values: z.infer<typeof jobPostingSchema>) {
    // Aqui você iria salvar os dados no backend
    console.log(values);
    
    // Redireciona para a lista de vagas após salvar
    navigate("/recruitment");
  }

  const departments = [
    "Tecnologia",
    "Marketing",
    "Vendas",
    "Recursos Humanos",
    "Financeiro",
    "Operações",
    "Produto",
    "Administração",
  ];

  const jobTypes = [
    "Tempo Integral", 
    "Meio Período", 
    "Temporário", 
    "Freelancer", 
    "Estágio", 
    "Aprendiz"
  ];

  const locations = [
    "Remoto", 
    "Híbrido", 
    "Presencial - São Paulo", 
    "Presencial - Rio de Janeiro", 
    "Presencial - Belo Horizonte"
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/recruitment" className="flex items-center text-gray-500 hover:text-primary mr-4">
            <ArrowLeft size={16} className="mr-1" />
            <span>Voltar</span>
          </Link>
          <h1 className="text-2xl font-bold">Nova Vaga</h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 shadow-soft p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título da Vaga</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Desenvolvedor Frontend" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departamento</FormLabel>
                      <FormControl>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          {...field}
                        >
                          <option value="" disabled>Selecione um departamento</option>
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localização</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          {...field}
                        >
                          <option value="" disabled>Selecione uma localização</option>
                          {locations.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Contrato</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          {...field}
                        >
                          <option value="" disabled>Selecione um tipo</option>
                          {jobTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Faixa Salarial (Opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: R$ 4.000 - R$ 6.000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Limite para Candidaturas</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="date" {...field} />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                            <Calendar size={16} />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição da Vaga</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva os detalhes da vaga, responsabilidades e objetivos..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requisitos e Qualificações</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Liste as habilidades, experiência e qualificações necessárias..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="benefits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Benefícios (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Liste os benefícios oferecidos pela empresa..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/recruitment")}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  <Save size={16} className="mr-2" />
                  Publicar Vaga
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
