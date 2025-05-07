
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Search,
  File,
  FolderPlus,
  FilePlus,
  UserPlus,
  Share2
} from "lucide-react";

type Document = {
  id: number;
  name: string;
  type: string;
  category: string;
  uploadedBy: string;
  uploadedDate: string;
  size: string;
  status: "active" | "archived" | "draft";
  sharedWith: string[];
};

const documents: Document[] = [
  {
    id: 1,
    name: "Política de Férias.pdf",
    type: "PDF",
    category: "Políticas",
    uploadedBy: "Admin Demo",
    uploadedDate: "10/04/2025",
    size: "245 KB",
    status: "active",
    sharedWith: ["Todos"]
  },
  {
    id: 2,
    name: "Contrato de Trabalho Padrão.docx",
    type: "DOCX",
    category: "Modelos",
    uploadedBy: "Admin Demo",
    uploadedDate: "08/04/2025",
    size: "187 KB",
    status: "active",
    sharedWith: ["RH"]
  },
  {
    id: 3,
    name: "Manual do Funcionário.pdf",
    type: "PDF",
    category: "Manuais",
    uploadedBy: "Admin Demo",
    uploadedDate: "01/04/2025",
    size: "1.2 MB",
    status: "active",
    sharedWith: ["Todos"]
  },
  {
    id: 4,
    name: "Formulário de Reembolso.xlsx",
    type: "XLSX",
    category: "Formulários",
    uploadedBy: "Admin Demo",
    uploadedDate: "25/03/2025",
    size: "78 KB",
    status: "active",
    sharedWith: ["Finanças", "Gerentes"]
  },
  {
    id: 5,
    name: "Código de Conduta.pdf",
    type: "PDF",
    category: "Políticas",
    uploadedBy: "Admin Demo",
    uploadedDate: "15/03/2025",
    size: "320 KB",
    status: "active",
    sharedWith: ["Todos"]
  }
];

const DocumentBadge = ({ status }: { status: Document["status"] }) => {
  const variants = {
    active: "bg-green-100 text-green-800",
    archived: "bg-gray-100 text-gray-800",
    draft: "bg-yellow-100 text-yellow-800",
  };

  const labels = {
    active: "Ativo",
    archived: "Arquivado",
    draft: "Rascunho",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[status]}`}>
      {labels[status]}
    </span>
  );
};

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (activeTab === "all" || doc.category.toLowerCase() === activeTab)
  );

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-8 w-8 text-red-500" />;
      case "DOCX":
        return <FileText className="h-8 w-8 text-blue-500" />;
      case "XLSX":
        return <FileText className="h-8 w-8 text-green-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold">Documentos</h1>
            <p className="text-gray-500 mt-1">
              Gerenciamento centralizado de documentos da empresa
            </p>
          </div>
          <div className="flex space-x-2">
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Enviar documento
            </Button>
            <Button variant="outline">
              <FolderPlus className="mr-2 h-4 w-4" />
              Nova pasta
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <Card className="md:w-64 flex-shrink-0">
            <CardHeader>
              <CardTitle className="text-lg">Categorias</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-1">
                <Button 
                  variant={activeTab === "all" ? "default" : "ghost"}
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("all")}
                >
                  Todos os documentos
                </Button>
                <Button 
                  variant={activeTab === "políticas" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("políticas")}
                >
                  Políticas
                </Button>
                <Button 
                  variant={activeTab === "modelos" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("modelos")}
                >
                  Modelos
                </Button>
                <Button 
                  variant={activeTab === "manuais" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("manuais")}
                >
                  Manuais
                </Button>
                <Button 
                  variant={activeTab === "formulários" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("formulários")}
                >
                  Formulários
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button variant="outline" className="w-full">
                <FilePlus className="mr-2 h-4 w-4" />
                Gerenciar categorias
              </Button>
            </CardFooter>
          </Card>

          <div className="flex-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Buscar documentos..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {filteredDocuments.length > 0 ? (
              <div className="bg-white rounded-lg border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                      <tr>
                        <th className="px-6 py-3 text-left">Nome</th>
                        <th className="px-6 py-3 text-left">Categoria</th>
                        <th className="px-6 py-3 text-left">Enviado por</th>
                        <th className="px-6 py-3 text-left">Data</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredDocuments.map((doc) => (
                        <tr key={doc.id} className="hover:bg-gray-50">
                          <td className="px-6 py-3">
                            <div className="flex items-center space-x-3">
                              {getFileIcon(doc.type)}
                              <div>
                                <p className="font-medium text-gray-800">{doc.name}</p>
                                <p className="text-xs text-gray-500">{doc.size}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-sm">{doc.category}</td>
                          <td className="px-6 py-3 text-sm">{doc.uploadedBy}</td>
                          <td className="px-6 py-3 text-sm">{doc.uploadedDate}</td>
                          <td className="px-6 py-3">
                            <DocumentBadge status={doc.status} />
                          </td>
                          <td className="px-6 py-3 text-right">
                            <div className="flex justify-end space-x-2">
                              <Button size="icon" variant="ghost">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-gray-50">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-gray-900 font-medium">Nenhum documento encontrado</h3>
                <p className="mt-1 text-gray-500">Tente ajustar sua busca ou envie um novo documento.</p>
                <div className="mt-6">
                  <Button>
                    <Upload className="mr-2 h-4 w-4" /> Enviar documento
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Documents;
