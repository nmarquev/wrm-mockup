import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricsCard from "@/components/dashboard/MetricsCard";
import SiteCard from "@/components/dashboard/SiteCard";
import { 
  Globe, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  TrendingUp,
  Activity
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
    limits: {
      imageSize: 500,
      pageSize: 2,
      resolution: "1920 × 1080 px"
    }
  }
];

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();
  
  const filteredSites = mockSites.filter(site =>
    site.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    site.url.toLowerCase().includes(searchValue.toLowerCase())
  );

  const totalSites = mockSites.length;
  const successSites = 0; // No sites with success status in mock data
  const warningSites = mockSites.filter(s => s.status === "warning").length;
  const errorSites = mockSites.filter(s => s.status === "error").length;
  const avgPageSize = mockSites.reduce((acc, site) => acc + site.pageSize, 0) / totalSites;

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
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Sitios Web {searchValue && `(${filteredSites.length} resultados)`}
            </h2>
            {filteredSites.length > 0 && (
              <div className="text-sm text-muted-foreground">
                Mostrando {filteredSites.length} de {totalSites} sitios
              </div>
            )}
          </div>
          
          {filteredSites.length === 0 ? (
            <div className="text-center py-12">
              <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No se encontraron sitios</h3>
              <p className="text-muted-foreground">
                {searchValue 
                  ? "Intenta con otros términos de búsqueda" 
                  : "Agrega tu primer sitio para comenzar el monitoreo"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSites.map((site) => (
                <SiteCard
                  key={site.id}
                  site={site}
                  onScan={handleScanSite}
                  onSettings={handleSettings}
                  onDownload={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;