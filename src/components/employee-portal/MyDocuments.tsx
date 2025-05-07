
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
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Eye, Download, FileText, Upload, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useLoading } from "@/hooks/use-loading";

interface Document {
  id: string;
  title: string;
  type: string;
  uploadDate: string;
  category: string;
  fileSize: string;
  fileType: string;
  downloadUrl: string;
}

// Dados de exemplo
const sampleDocuments: Document[] = [
  {
    id: "1",
    title: "Contracheque - Janeiro 2025",
    type: "Folha de Pagamento",
    uploadDate: "2025-02-05T10:30:00Z",
    category: "Financeiro",
    fileSize: "245 KB",
    fileType: "PDF",
    downloadUrl: "#",
  },
  {
    id: "2",
    title: "Contrato de Trabalho",
    type: "Contrato",
    uploadDate: "2024-05-15T14:20:00Z",
    category: "RH",
    fileSize: "1.2 MB",
    fileType: "PDF",
    downloadUrl: "#",
  },
  {
    id: "3",
    title: "Manual do Funcionário",
    type: "Guia",
    uploadDate: "2024-06-01T09:45:00Z",
    category: "Institucional",
    fileSize: "3.5 MB",
    fileType: "PDF",
    downloadUrl: "#",
  },
  {
    id: "4",
    title: "Certificado - Treinamento Excel",
    type: "Certificado",
    uploadDate: "2024-11-20T16:10:00Z",
    category: "Treinamentos",
    fileSize: "780 KB",
    fileType: "PDF",
    downloadUrl: "#",
  },
  {
    id: "5",
    title: "Contracheque - Fevereiro 2025",
    type: "Folha de Pagamento",
    uploadDate: "2025-03-05T11:15:00Z",
    category: "Financeiro",
    fileSize: "248 KB",
    fileType: "PDF",
    downloadUrl: "#",
  },
];

export function MyDocuments() {
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentCategory, setDocumentCategory] = useState("");
  const { isLoading, withLoading } = useLoading();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !documentTitle || !documentCategory) {
      toast.error("Por favor, preencha todos os campos e selecione um arquivo");
      return;
    }

    try {
      await withLoading(
        new Promise<void>((resolve) => {
          setTimeout(() => {
            const newDocument: Document = {
              id: crypto.randomUUID(),
              title: documentTitle,
              type: selectedFile.name.split('.').pop()?.toUpperCase() || "Desconhecido",
              uploadDate: new Date().toISOString(),
              category: documentCategory,
              fileSize: `${(selectedFile.size / 1024).toFixed(0)} KB`,
              fileType: selectedFile.type.split('/').pop()?.toUpperCase() || "Desconhecido",
              downloadUrl: "#",
            };
            
            setDocuments(prev => [newDocument, ...prev]);
            setIsDialogOpen(false);
            setSelectedFile(null);
            setDocumentTitle("");
            setDocumentCategory("");
            resolve();
          }, 1500);
        })
      );
      
      toast.success("Documento enviado com sucesso!");
    } catch (error) {
      toast.error("Erro ao fazer upload do documento.");
    }
  };

  const filteredDocuments = documents
    .filter((doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((doc) => !categoryFilter || doc.category === categoryFilter);

  const uniqueCategories = Array.from(new Set(documents.map((doc) => doc.category)));

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Meus Documentos</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload size={16} className="mr-2" />
              Enviar Documento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enviar Novo Documento</DialogTitle>
              <DialogDescription>
                Faça upload de um documento para seu repositório pessoal.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="title">
                  Título do Documento
                </label>
                <Input
                  id="title"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  placeholder="Ex: Contrato de Trabalho"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Categoria</label>
                <Select value={documentCategory} onValueChange={setDocumentCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Financeiro">Financeiro</SelectItem>
                    <SelectItem value="RH">RH</SelectItem>
                    <SelectItem value="Institucional">Institucional</SelectItem>
                    <SelectItem value="Treinamentos">Treinamentos</SelectItem>
                    <SelectItem value="Pessoal">Pessoal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Arquivo</label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 p-6">
                  <div className="space-y-1 text-center">
                    <div className="flex flex-col items-center">
                      <FileText className="h-8 w-8 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none"
                        >
                          <span>Selecionar arquivo</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, DOCX, XLSX até 10MB
                    </p>
                    {selectedFile && (
                      <div className="mt-2 flex items-center justify-center gap-1 text-sm text-gray-700">
                        <span>{selectedFile.name}</span>
                        <span>({Math.round(selectedFile.size / 1024)} KB)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleUpload} disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Pesquisar documentos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={categoryFilter || ""} onValueChange={(value) => setCategoryFilter(value || null)}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Todas Categorias" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas Categorias</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle>{doc.title}</CardTitle>
                    <CardDescription>
                      {doc.type} • {doc.category}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <FileText size={16} />
                    <span>{doc.fileType}</span>
                    <span className="ml-2">{doc.fileSize}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-600">
                  Enviado em:{" "}
                  {format(parseISO(doc.uploadDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex w-full gap-2">
                  <Button variant="outline" className="w-full">
                    <Eye size={16} className="mr-2" />
                    Visualizar
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download size={16} className="mr-2" />
                    Baixar
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum documento encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || categoryFilter
              ? "Tente mudar sua pesquisa ou filtros."
              : "Envie seu primeiro documento para começar."}
          </p>
        </div>
      )}
    </div>
  );
}
