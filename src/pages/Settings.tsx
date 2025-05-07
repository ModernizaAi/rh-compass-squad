
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";

export default function Settings() {
  const { user, profile } = useAuth();

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-gray-500 mt-1">Gerencie as configurações da sua conta</p>

        <div className="mt-6">
          <Tabs defaultValue="account">
            <TabsList className="mb-6">
              <TabsTrigger value="account">Conta</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
              <TabsTrigger value="appearance">Aparência</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Informações da Conta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-1">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" value={user?.email || ""} disabled />
                    <p className="text-xs text-gray-500">
                      Seu e-mail de acesso não pode ser alterado
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="firstName">Nome</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Seu nome" 
                        defaultValue={profile?.first_name || ""} 
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Seu sobrenome" 
                        defaultValue={profile?.last_name || ""} 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="position">Cargo</Label>
                    <Input 
                      id="position" 
                      placeholder="Seu cargo" 
                      defaultValue={profile?.position || ""} 
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="department">Departamento</Label>
                    <Select defaultValue={profile?.department || ""}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Vendas">Vendas</SelectItem>
                        <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                        <SelectItem value="Financeiro">Financeiro</SelectItem>
                        <SelectItem value="Operações">Operações</SelectItem>
                        <SelectItem value="Produto">Produto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="language">Idioma</Label>
                    <Select defaultValue="pt-BR">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end">
                    <Button>Salvar Alterações</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Preferências de Notificações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notificações por E-mail</h3>
                        <p className="text-sm text-gray-500">Receba atualizações via e-mail</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notificações no Aplicativo</h3>
                        <p className="text-sm text-gray-500">Receba atualizações dentro do sistema</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Lembretes de Eventos</h3>
                        <p className="text-sm text-gray-500">Receba lembretes de reuniões e eventos</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Atualizações de Recrutamento</h3>
                        <p className="text-sm text-gray-500">Novos candidatos e status de vagas</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notificações de Desempenho</h3>
                        <p className="text-sm text-gray-500">Avaliações e feedback</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Salvar Preferências</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Aparência</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Tema</Label>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <div className="border rounded-md p-4 flex flex-col items-center cursor-pointer bg-white">
                          <div className="w-full h-20 bg-white border rounded-md mb-2"></div>
                          <span className="text-sm">Claro</span>
                        </div>
                        <div className="border rounded-md p-4 flex flex-col items-center cursor-pointer">
                          <div className="w-full h-20 bg-gray-900 border rounded-md mb-2"></div>
                          <span className="text-sm">Escuro</span>
                        </div>
                        <div className="border rounded-md p-4 flex flex-col items-center cursor-pointer">
                          <div className="w-full h-20 bg-gradient-to-b from-white to-gray-900 border rounded-md mb-2"></div>
                          <span className="text-sm">Sistema</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Densidade</Label>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <div className="border rounded-md p-4 flex flex-col items-center cursor-pointer">
                          <div className="w-full space-y-1 mb-2">
                            <div className="h-1 w-full bg-gray-200 rounded"></div>
                            <div className="h-1 w-full bg-gray-200 rounded"></div>
                            <div className="h-1 w-full bg-gray-200 rounded"></div>
                          </div>
                          <span className="text-sm">Compacto</span>
                        </div>
                        <div className="border rounded-md p-4 flex flex-col items-center cursor-pointer bg-white">
                          <div className="w-full space-y-2 mb-2">
                            <div className="h-2 w-full bg-gray-200 rounded"></div>
                            <div className="h-2 w-full bg-gray-200 rounded"></div>
                            <div className="h-2 w-full bg-gray-200 rounded"></div>
                          </div>
                          <span className="text-sm">Padrão</span>
                        </div>
                        <div className="border rounded-md p-4 flex flex-col items-center cursor-pointer">
                          <div className="w-full space-y-3 mb-2">
                            <div className="h-3 w-full bg-gray-200 rounded"></div>
                            <div className="h-3 w-full bg-gray-200 rounded"></div>
                            <div className="h-3 w-full bg-gray-200 rounded"></div>
                          </div>
                          <span className="text-sm">Confortável</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Salvar Aparência</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Alterar Senha</h3>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <Label htmlFor="currentPassword">Senha Atual</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="newPassword">Nova Senha</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Autenticação de Dois Fatores</h3>
                        <p className="text-sm text-gray-500">Adicione uma camada extra de segurança</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Sessões Ativas</h3>
                        <p className="text-sm text-gray-500">Gerencie dispositivos conectados</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Gerenciar
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Salvar Configurações</Button>
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
