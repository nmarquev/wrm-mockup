import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricsCard from "@/components/dashboard/MetricsCard";
import SiteCard from "@/components/dashboard/SiteCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Globe, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  TrendingUp,
  Activity,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with real API calls
const mockSites = [
  {
    id: "1",
    name: "Tout",
    url: "https://tout.com.ar",
    status: "error" as const,
    lastScan: new Date("2025-09-06T02:01:00"),
    pageSize: 5.8,
    imageCount: 89,
    heavyImages: 4,
    isActive: true,
    limits: {
      imageSize: 500,
      pageSize: 2,
      resolution: "1920 × 1080 px"
    }
  },
  {
    id: "2", 
    name: "Rollpix",
    url: "https://rollpix.com",
    status: "warning" as const,
    lastScan: new Date("2025-09-06T02:01:04"),
    pageSize: 2.3,
    imageCount: 37,
    heavyImages: 0,
    isActive: true,
    limits: {
      imageSize: 500,
      pageSize: 2,
      resolution: "1920 × 1080 px"
    }
  },
  {
    id: "3",
    name: "Buttman", 
    url: "https://buttman.com.ar",
    status: "error" as const,
    lastScan: new Date("2025-09-06T02:01:11"),
    pageSize: 6.8,
    imageCount: 118,
    heavyImages: 1,
    isActive: false,
    limits: {
      imageSize: 500,
      pageSize: 2,
      resolution: "1920 × 1080 px"
    }
  }
];

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const sitesPerPage = 12;
  const { toast } = useToast();
  
  const filteredSites = mockSites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                         site.url.toLowerCase().includes(searchValue.toLowerCase());
    const matchesStatus = statusFilter === "all" || site.status === statusFilter;
    const matchesActive = activeFilter === "all" || 
                         (activeFilter === "active" && site.isActive) ||
                         (activeFilter === "inactive" && !site.isActive);
    
    return matchesSearch && matchesStatus && matchesActive;
  });

  const totalPages = Math.ceil(filteredSites.length / sitesPerPage);
  const startIndex = (currentPage - 1) * sitesPerPage;
  const paginatedSites = filteredSites.slice(startIndex, startIndex + sitesPerPage);

  const totalSites = mockSites.length;
  const activeSites = mockSites.filter(s => s.isActive).length;
  const successSites = 0; // No success sites in mock data yet
  const warningSites = mockSites.filter(s => s.status === "warning" && s.isActive).length;
  const errorSites = mockSites.filter(s => s.status === "error" && s.isActive).length;
  const avgPageSize = activeSites > 0 ? mockSites.filter(s => s.isActive).reduce((acc, site) => acc + site.pageSize, 0) / activeSites : 0;

  const handleScanSite = (siteId: string) => {
    toast({
      title: "Escaneando sitio",
      description: "El escaneo ha comenzado. Te notificaremos cuando termine.",
    });
  };

  const handleScanAll = () => {
    toast({
      title: "Escaneando todos los sitios",
      description: "El escaneo masivo ha comenzado. Esto puede tomar unos minutos.",
    });
  };

  const handleAddSite = () => {
    toast({
      title: "Agregar sitio",
      description: "Funcionalidad próximamente disponible.",
    });
  };

  const handleSettings = () => {
    toast({
      title: "Configuración",
      description: "Panel de configuración próximamente disponible.",
    });
  };

  const handleViewLogs = (siteId: string) => {
    toast({
      title: "Ver logs",
      description: `Mostrando logs del sitio ${siteId}`,
    });
  };

  const handleToggleActive = (siteId: string) => {
    const site = mockSites.find(s => s.id === siteId);
    toast({
      title: site?.isActive ? "Sitio desactivado" : "Sitio activado",
      description: `El sitio ${site?.name} ha sido ${site?.isActive ? "desactivado" : "activado"}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        onAddSite={handleAddSite}
        onScanAll={handleScanAll}
        onSettings={handleSettings}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />
      
      <div className="container mx-auto px-6 py-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <MetricsCard
            title="Total Sitios"
            value={totalSites}
            icon={<Globe className="h-4 w-4" />}
            variant="default"
          />
          <MetricsCard
            title="Correctos"
            value={successSites}
            icon={<CheckCircle className="h-4 w-4" />}
            variant="success"
          />
          <MetricsCard
            title="Con Avisos"
            value={warningSites}
            icon={<AlertTriangle className="h-4 w-4" />}
            variant="warning"
          />
          <MetricsCard
            title="Con Problemas"
            value={errorSites}
            icon={<XCircle className="h-4 w-4" />}
            variant="destructive"
          />
          <MetricsCard
            title="Peso Promedio"
            value={`${avgPageSize.toFixed(1)} MB`}
            subtitle="Promedio de todos los sitios"
            icon={<Activity className="h-4 w-4" />}
            trend={{ value: -12, isPositive: true }}
          />
        </div>

        {/* Sites Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">
              Sitios Web {searchValue && `(${filteredSites.length} resultados)`}
            </h2>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={statusFilter} onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="success">Correctos</SelectItem>
                  <SelectItem value="warning">Avisos</SelectItem>
                  <SelectItem value="error">Problemas</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={activeFilter} onValueChange={(value) => {
                setActiveFilter(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Actividad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="inactive">Inactivos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredSites.length > 0 && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div>
                Mostrando {startIndex + 1}-{Math.min(startIndex + sitesPerPage, filteredSites.length)} de {filteredSites.length} sitios
              </div>
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Página {currentPage} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {filteredSites.length === 0 ? (
            <div className="text-center py-12">
              <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No se encontraron sitios</h3>
              <p className="text-muted-foreground">
                {searchValue || statusFilter !== "all" || activeFilter !== "all"
                  ? "Intenta ajustar los filtros de búsqueda" 
                  : "Agrega tu primer sitio para comenzar el monitoreo"}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {paginatedSites.map((site) => (
                  <SiteCard
                    key={site.id}
                    site={site}
                    onScan={handleScanSite}
                    onSettings={handleSettings}
                    onDownload={() => {}}
                    onDelete={() => {}}
                    onViewLogs={handleViewLogs}
                    onToggleActive={handleToggleActive}
                  />
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Anterior
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        const distance = Math.abs(page - currentPage);
                        return distance === 0 || distance === 1 || page === 1 || page === totalPages;
                      })
                      .map((page, index, array) => (
                        <div key={page} className="flex items-center">
                          {index > 0 && array[index - 1] !== page - 1 && (
                            <span className="px-2 text-muted-foreground">...</span>
                          )}
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="w-10"
                          >
                            {page}
                          </Button>
                        </div>
                      ))
                    }
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;