
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Plus, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { createNotification } from "@/services/notificationService";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "@/services/employeeService";

// Form schema for creating a notification
const notificationSchema = z.object({
  recipient_id: z.string().min(1, { message: "Destinatário é obrigatório" }),
  title: z.string().min(3, { message: "Título deve ter pelo menos 3 caracteres" }),
  message: z.string().min(5, { message: "Mensagem deve ter pelo menos 5 caracteres" }),
  type: z.enum(["meeting", "recruitment", "performance", "training", "document", "general"], {
    required_error: "Tipo é obrigatório",
  }),
});

type NotificationFormValues = z.infer<typeof notificationSchema>;

export default function NotificationsAdmin() {
  const { user } = useAuth();
  const [isSending, setIsSending] = useState(false);

  // Fetch employees for the recipient dropdown
  const { data: employees = [], isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      recipient_id: "",
      title: "",
      message: "",
      type: "general",
    },
  });

  const onSubmit = async (values: NotificationFormValues) => {
    if (!user) return;

    setIsSending(true);
    try {
      const notification = {
        user_id: values.recipient_id,
        title: values.title,
        message: values.message,
        type: values.type as any,
        read: false,
      };

      const result = await createNotification(notification);
      
      if (result) {
        toast.success("Notificação enviada com sucesso!");
        form.reset();
      } else {
        toast.error("Falha ao enviar notificação");
      }
    } catch (error) {
      toast.error("Erro ao processar solicitação");
      console.error("Error sending notification:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Gerenciar Notificações</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Send notification */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Nova Notificação</CardTitle>
                <CardDescription>
                  Envie uma notificação para um funcionário
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="recipient_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Destinatário</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um funcionário" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {employees.map((employee: any) => (
                                <SelectItem 
                                  key={employee.id} 
                                  value={employee.id}
                                >
                                  {employee.first_name} {employee.last_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Tipo de notificação" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">Geral</SelectItem>
                              <SelectItem value="meeting">Reunião</SelectItem>
                              <SelectItem value="recruitment">Recrutamento</SelectItem>
                              <SelectItem value="performance">Desempenho</SelectItem>
                              <SelectItem value="training">Treinamento</SelectItem>
                              <SelectItem value="document">Documento</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem</FormLabel>
                          <FormControl>
                            <Textarea rows={4} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSending}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isSending ? "Enviando..." : "Enviar Notificação"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Options and Templates */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Templates de Notificações</CardTitle>
                <CardDescription>
                  Templates para envio rápido de notificações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Template cards */}
                    {[
                      {
                        title: "Reunião de Equipe",
                        description: "Notifique sobre uma próxima reunião de equipe",
                        type: "meeting"
                      },
                      {
                        title: "Novo Candidato",
                        description: "Notifique sobre um novo candidato para vaga",
                        type: "recruitment"
                      },
                      {
                        title: "Avaliação de Desempenho",
                        description: "Lembrete para avaliação de desempenho",
                        type: "performance"
                      },
                      {
                        title: "Novo Treinamento",
                        description: "Notifique sobre um novo treinamento disponível",
                        type: "training"
                      }
                    ].map((template, index) => (
                      <div 
                        key={index}
                        className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          form.setValue("title", template.title);
                          form.setValue("message", `Template para ${template.title.toLowerCase()}`);
                          form.setValue("type", template.type as any);
                        }}
                      >
                        <h3 className="font-medium">{template.title}</h3>
                        <p className="text-sm text-gray-500">{template.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Ações em Lote</h3>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Criar Template
                      </Button>
                      <Button variant="outline" className="text-red-500 hover:text-red-700">
                        <Trash className="h-4 w-4 mr-1" />
                        Limpar Notificações
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Configurações de Notificações</CardTitle>
                <CardDescription>
                  Configure as preferências do sistema de notificações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Notificações Automáticas
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="auto-meeting"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked
                        />
                        <label htmlFor="auto-meeting" className="text-sm">
                          Lembretes de reunião
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="auto-training"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked
                        />
                        <label htmlFor="auto-training" className="text-sm">
                          Novos treinamentos
                        </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Entrega de Notificações
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="deliver-app"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked
                        />
                        <label htmlFor="deliver-app" className="text-sm">
                          Via aplicação
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="deliver-email"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked
                        />
                        <label htmlFor="deliver-email" className="text-sm">
                          Via e-mail
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="mt-4">
                    Salvar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
