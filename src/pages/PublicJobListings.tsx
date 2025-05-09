
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Briefcase, Calendar, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  },
];

export default function PublicJobListings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    department: "",
    location: "",
    type: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Extrair valores únicos para os filtros
  const departments = [...new Set(jobPostingsData.map(job => job.department))];
  const locations = [...new Set(jobPostingsData.map(job => job.location))];
  const jobTypes = [...new Set(jobPostingsData.map(job => job.type))];

  // Filtrar vagas com base nos critérios
  const filteredJobs = useMemo(() => {
    return jobPostingsData.filter(job => {
      // Filtrar por termo de busca
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtrar por departamento
      const matchesDepartment = !filters.department || job.department === filters.department;
      
      // Filtrar por localização
      const matchesLocation = !filters.location || job.location === filters.location;
      
      // Filtrar por tipo de vaga
      const matchesType = !filters.type || job.type === filters.type;
      
      return matchesSearch && matchesDepartment && matchesLocation && matchesType;
    });
  }, [searchTerm, filters]);

  // Limpar todos os filtros
  const clearFilters = () => {
    setFilters({
      department: "",
      location: "",
      type: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Portal de Vagas</h1>
              <p className="text-gray-600 mt-1">Encontre oportunidades para sua carreira</p>
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
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Pesquisar vagas por título ou departamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div>
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="w-full md:w-auto"
              >
                <Filter size={18} className="mr-2" />
                Filtros
                {(filters.department || filters.location || filters.type) && (
                  <Badge variant="secondary" className="ml-2">
                    {Object.values(filters).filter(Boolean).length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="mb-6 p-4 border rounded-md bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">Filtrar por:</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters} 
                  className="h-8 text-xs"
                  disabled={!filters.department && !filters.location && !filters.type}
                >
                  <X size={14} className="mr-1" />
                  Limpar filtros
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Departamento</label>
                  <Select
                    value={filters.department}
                    onValueChange={(value) => setFilters({...filters, department: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os departamentos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os departamentos</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Localização</label>
                  <Select
                    value={filters.location}
                    onValueChange={(value) => setFilters({...filters, location: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as localizações" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as localizações</SelectItem>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Tipo de vaga</label>
                  <Select
                    value={filters.type}
                    onValueChange={(value) => setFilters({...filters, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os tipos</SelectItem>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <div className="text-gray-500 text-sm mb-4">
              {filteredJobs.length} vaga(s) encontrada(s)
            </div>
            
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 border rounded-md bg-gray-50">
                <p className="text-gray-500">Nenhuma vaga encontrada com os filtros aplicados.</p>
                {(searchTerm || filters.department || filters.location || filters.type) && (
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchTerm("");
                      clearFilters();
                    }}
                  >
                    Limpar filtros e recomeçar
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="overflow-hidden border hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-gray-900">{job.title}</h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {job.status}
                        </span>
                      </div>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Briefcase size={14} className="mr-2 flex-shrink-0" />
                          <span>{job.department} • {job.type}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin size={14} className="mr-2 flex-shrink-0" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar size={14} className="mr-2 flex-shrink-0" />
                          <span>Publicada em {job.postedDate}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-amber-600">{job.daysLeft} dias restantes</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 bg-gray-50 p-3">
                      <Link to={`/public/job/${job.id}`}>
                        <Button variant="outline" className="w-full">Ver detalhes</Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
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
