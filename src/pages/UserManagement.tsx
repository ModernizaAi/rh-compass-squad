
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, UserCog } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserWithProfile = {
  id: string;
  email: string;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  position: string | null;
  department: string | null;
  role: UserRole;
};

export default function UserManagement() {
  const { profile, updateUserRole } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [targetUser, setTargetUser] = useState<{id: string, role: UserRole} | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<UserWithProfile[]>([]);
  const [filter, setFilter] = useState<string>("all");

  // Carregar usuários
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtrar usuários quando o termo de busca ou filtro mudar
  useEffect(() => {
    if (users.length > 0) {
      let result = users;
      
      // Aplicar filtro por função
      if (filter !== "all") {
        result = result.filter(user => user.role === filter);
      }
      
      // Aplicar termo de busca
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(
          user => 
            user.email.toLowerCase().includes(term) ||
            (user.first_name && user.first_name.toLowerCase().includes(term)) ||
            (user.last_name && user.last_name.toLowerCase().includes(term)) ||
            (user.department && user.department.toLowerCase().includes(term)) ||
            (user.position && user.position.toLowerCase().includes(term))
        );
      }
      
      setFilteredUsers(result);
    }
  }, [users, searchTerm, filter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Buscar todos os perfis, que contêm informações dos usuários e seus papéis
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*");
        
      if (error) {
        throw error;
      }
      
      // Transformar para o formato que precisamos
      const usersWithProfiles: UserWithProfile[] = profiles.map((profile: any) => ({
        id: profile.id,
        email: profile.email || "N/A", // Email pode não estar disponível diretamente
        created_at: profile.created_at,
        first_name: profile.first_name,
        last_name: profile.last_name,
        position: profile.position,
        department: profile.department,
        role: profile.role || "basic",
      }));
      
      setUsers(usersWithProfiles);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar a lista de usuários.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    // Verificar se é o próprio usuário
    if (userId === profile?.id) {
      toast({
        variant: "destructive",
        title: "Operação não permitida",
        description: "Você não pode alterar seu próprio nível de acesso.",
      });
      return;
    }
    
    // Configurar alvo da alteração e abrir diálogo de confirmação
    setTargetUser({
      id: userId,
      role: newRole,
    });
    setConfirmDialogOpen(true);
  };

  const confirmRoleChange = async () => {
    if (!targetUser) return;
    
    try {
      const { error } = await updateUserRole(targetUser.id, targetUser.role);
      
      if (error) {
        throw error;
      }
      
      // Atualizar lista local
      setUsers(prev => 
        prev.map(user => 
          user.id === targetUser.id 
            ? { ...user, role: targetUser.role } 
            : user
        )
      );
      
      toast({
        title: "Nível de acesso atualizado",
        description: "O nível de acesso do usuário foi alterado com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao atualizar papel:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Não foi possível atualizar o nível de acesso.",
      });
    } finally {
      setConfirmDialogOpen(false);
      setTargetUser(null);
    }
  };

  const canModifyRole = (userRole: UserRole): boolean => {
    // Admins podem modificar qualquer papel
    if (profile?.role === 'admin') return true;
    
    // Gestores só podem modificar usuários básicos
    if (profile?.role === 'manager') return userRole === 'basic';
    
    // Outros não podem modificar papéis
    return false;
  };

  const getUserFullName = (user: UserWithProfile): string => {
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    } else if (user.first_name) {
      return user.first_name;
    } else if (user.last_name) {
      return user.last_name;
    }
    return 'Usuário Sem Nome';
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 pb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <Shield className="mr-2 h-6 w-6" />
              Gerenciamento de Usuários
            </h1>
            <p className="text-gray-500 mt-1">
              Gerencie níveis de acesso e permissões dos usuários do sistema
            </p>
          </div>
        </div>

        {/* Filtros e busca */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-soft p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Buscar por nome, email, departamento..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Todos os níveis</SelectItem>
                    <SelectItem value="admin">Administradores</SelectItem>
                    <SelectItem value="manager">Gestores</SelectItem>
                    <SelectItem value="basic">Usuários Básicos</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={fetchUsers}>
              Atualizar Lista
            </Button>
          </div>
        </div>

        {/* Lista de usuários */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-soft overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium flex items-center">
                <UserCog className="mr-2 h-5 w-5" />
                Usuários do Sistema
              </h2>
              <span className="text-sm text-gray-500">
                {filteredUsers.length} usuários
              </span>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              <p className="mt-2 text-gray-500">Carregando usuários...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Nível de Acesso</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {getUserFullName(user)}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.department || "—"}</TableCell>
                        <TableCell>{user.position || "—"}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : user.role === "manager"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.role === "admin"
                              ? "Administrador"
                              : user.role === "manager"
                              ? "Gestor"
                              : "Básico"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {canModifyRole(user.role) ? (
                            <Select
                              value={user.role}
                              onValueChange={(value: UserRole) =>
                                handleRoleChange(user.id, value)
                              }
                              disabled={user.id === profile?.id}
                            >
                              <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="Selecionar nível" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin" disabled={profile?.role !== 'admin'}>
                                  Administrador
                                </SelectItem>
                                <SelectItem value="manager">Gestor</SelectItem>
                                <SelectItem value="basic">Básico</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Button variant="ghost" size="sm" disabled>
                              Sem permissão
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Nenhum usuário encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Diálogo de confirmação */}
        <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar alteração de nível</AlertDialogTitle>
              <AlertDialogDescription>
                Você está prestes a alterar o nível de acesso de um usuário para{" "}
                {targetUser?.role === "admin"
                  ? "Administrador"
                  : targetUser?.role === "manager"
                  ? "Gestor"
                  : "Básico"}
                . Esta ação concederá permissões diferentes ao usuário.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={confirmRoleChange}>
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
}
