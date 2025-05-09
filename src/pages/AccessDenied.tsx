
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function AccessDenied() {
  const { profile } = useAuth();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-10">
        <div className="mb-6 p-6 rounded-full bg-red-100">
          <Shield className="h-16 w-16 text-red-500" />
        </div>

        <h1 className="text-3xl font-bold mb-2">Acesso Negado</h1>
        
        <p className="text-gray-600 max-w-md mb-8">
          Você não tem permissão para acessar esta página. Esta funcionalidade requer um 
          nível de acesso superior ao seu nível atual ({profile?.role || 'básico'}).
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link to="/">
              Voltar para Dashboard
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/employee-portal">
              Ir para Portal do Colaborador
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
