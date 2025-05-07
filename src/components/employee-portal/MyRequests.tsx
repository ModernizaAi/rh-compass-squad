
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { format, parseISO, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useLoading } from "@/hooks/use-loading";

type RequestType = "férias" | "atestado" | "reembolso" | "documentos";

interface Request {
  id: string;
  type: RequestType;
  status: "pendente" | "aprovado" | "rejeitado";
  dateCreated: string;
  dateUpdated: string;
  startDate?: string;
  endDate?: string;
  description: string;
  amount?: number;
  attachments?: string[];
}

const requestSchema = z.object({
  type: z.string(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  amount: z.number().optional(),
});

// Dados de exemplo
const sampleRequests: Request[] = [
  {
    id: "1",
    type: "férias",
    status: "pendente",
    dateCreated: "2025-01-15T10:30:00Z",
    dateUpdated: "2025-01-15T10:30:00Z",
    startDate: "2025-02-01T00:00:00Z",
    endDate: "2025-02-15T00:00:00Z",
    description: "Férias anuais",
  },
  {
    id: "2",
    type: "reembolso",
    status: "aprovado",
    dateCreated: "2024-12-05T15:45:00Z",
    dateUpdated: "2024-12-06T09:20:00Z",
    description: "Reembolso de táxi para reunião com cliente",
    amount: 75.50,
  },
  {
    id: "3",
    type: "atestado",
    status: "aprovado",
    dateCreated: "2024-11-20T08:15:00Z",
    dateUpdated: "2024-11-20T14:30:00Z",
    startDate: "2024-11-20T00:00:00Z",
    endDate: "2024-11-22T00:00:00Z",
    description: "Atestado médico - consulta",
  },
];

export function MyRequests() {
  const { profile } = useAuth();
  const { isLoading, withLoading } = useLoading();
  const [requests, setRequests] = useState<Request[]>(sampleRequests);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("todas");

  const form = useForm<z.infer<typeof requestSchema>>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      type: "férias",
      description: "",
    },
  });

  const watchRequestType = form.watch("type");

  const filteredRequests = activeTab === "todas" 
    ? requests 
    : requests.filter(req => req.status === activeTab);

  const onSubmit = async (data: z.infer<typeof requestSchema>) => {
    try {
      // Simulando uma chamada de API
      await withLoading(
        new Promise<void>((resolve) => {
          setTimeout(() => {
            const newRequest: Request = {
              id: crypto.randomUUID(),
              type: data.type as RequestType,
              status: "pendente",
              dateCreated: new Date().toISOString(),
              dateUpdated: new Date().toISOString(),
              startDate: data.startDate?.toISOString(),
              endDate: data.endDate?.toISOString(),
              description: data.description,
              amount: data.amount,
            };
            
            setRequests(prev => [newRequest, ...prev]);
            form.reset();
            setIsDialogOpen(false);
            resolve();
          }, 1000);
        })
      );
      
      toast.success("Solicitação enviada com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar solicitação.");
    }
  };

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case "aprovado": 
        return "bg-green-100 text-green-800";
      case "rejeitado": 
        return "bg-red-100 text-red-800";
      default: 
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Minhas Solicitações</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Nova Solicitação</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Nova Solicitação</DialogTitle>
              <DialogDescription>
                Preencha os detalhes da sua solicitação abaixo.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Solicitação</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="férias">Férias</SelectItem>
                          <SelectItem value="atestado">Atestado</SelectItem>
                          <SelectItem value="reembolso">Reembolso</SelectItem>
                          <SelectItem value="documentos">Documentos</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {(watchRequestType === "férias" || watchRequestType === "atestado") && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data Início</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "dd/MM/yyyy", { locale: ptBR })
                                    ) : (
                                      <span>Selecione</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data Fim</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "dd/MM/yyyy", { locale: ptBR })
                                    ) : (
                                      <span>Selecione</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                  className="p-3 pointer-events-auto"
                                  disabled={(date) => {
                                    const startDate = form.getValues("startDate");
                                    return startDate ? date < startDate : false;
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}

                {watchRequestType === "reembolso" && (
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor (R$)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0,00"
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descreva sua solicitação com detalhes"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Enviar Solicitação"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="todas" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="pendente">Pendentes</TabsTrigger>
          <TabsTrigger value="aprovado">Aprovadas</TabsTrigger>
          <TabsTrigger value="rejeitado">Rejeitadas</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="space-y-4">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="capitalize text-lg">
                          Solicitação de {request.type}
                        </CardTitle>
                        <CardDescription>
                          {format(parseISO(request.dateCreated), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </CardDescription>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadgeClasses(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                    {request.startDate && request.endDate && (
                      <p className="text-sm text-gray-600">
                        Período: {format(parseISO(request.startDate), "dd/MM/yyyy", { locale: ptBR })} até{" "}
                        {format(parseISO(request.endDate), "dd/MM/yyyy", { locale: ptBR })}
                      </p>
                    )}
                    {request.amount && (
                      <p className="text-sm text-gray-600">
                        Valor: R$ {request.amount.toFixed(2).replace(".", ",")}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-end w-full gap-2">
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                      {request.status === "pendente" && (
                        <Button variant="destructive" size="sm">
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">Nenhuma solicitação encontrada</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
