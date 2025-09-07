import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Image, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Play,
  Settings,
  Download,
  Trash2,
  FileSearch,
  Power,
  PowerOff
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface SiteData {
  id: string;
  name: string;
  url: string;
  status: "success" | "warning" | "error";
  lastScan: Date;
  pageSize: number; // in MB
  imageCount: number;
  heavyImages: number;
  isActive: boolean;
  limits: {
    imageSize: number; // in KB
    pageSize: number; // in MB
    resolution: string;
  };
}

interface SiteCardProps {
  site: SiteData;
  onScan?: (siteId: string) => void;
  onSettings?: (siteId: string) => void;
  onDownload?: (siteId: string) => void;
  onDelete?: (siteId: string) => void;
  onViewLogs?: (siteId: string) => void;
  onToggleActive?: (siteId: string) => void;
}

const SiteCard = ({ site, onScan, onSettings, onDownload, onDelete, onViewLogs, onToggleActive }: SiteCardProps) => {
  const getStatusIcon = () => {
    if (!site.isActive) {
      return <PowerOff className="h-4 w-4 text-muted-foreground" />;
    }
    switch (site.status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "error":
        return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadge = () => {
    if (!site.isActive) {
      return <Badge variant="outline" className="border-muted-foreground text-muted-foreground">Inactivo</Badge>;
    }
    switch (site.status) {
      case "success":
        return <Badge variant="outline" className="border-success text-success">Correcto</Badge>;
      case "warning":
        return <Badge variant="outline" className="border-warning text-warning">Advertencia</Badge>;
      case "error":
        return <Badge variant="outline" className="border-destructive text-destructive">Problema</Badge>;
    }
  };

  const getCardStyles = () => {
    switch (site.status) {
      case "success":
        return "border-success/20 hover:border-success/40";
      case "warning":
        return "border-warning/20 hover:border-warning/40";
      case "error":
        return "border-destructive/20 hover:border-destructive/40";
      default:
        return "border-border hover:border-primary/40";
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-elevation-lg border-2",
      getCardStyles(),
      !site.isActive && "opacity-50 grayscale"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{site.name}</h3>
                {site.isActive ? (
                  <Power className="h-3 w-3 text-success" />
                ) : (
                  <PowerOff className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {site.url}
              </p>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-xs text-muted-foreground">
          Último escaneo: {formatDistanceToNow(site.lastScan, { 
            addSuffix: true, 
            locale: es 
          })}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Página</span>
            </div>
            <div className="text-xl font-bold">
              {site.pageSize.toFixed(1)} MB
            </div>
            <div className="text-xs text-muted-foreground">
              Límite: {site.limits.pageSize} MB
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Image className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Imágenes</span>
            </div>
            <div className="text-xl font-bold">
              {site.imageCount}
            </div>
            {site.heavyImages > 0 && (
              <div className="text-xs text-destructive">
                {site.heavyImages} pesadas
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-muted/50 p-3 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Límites configurados</div>
          <div className="text-xs space-y-1">
            <div>Imagen: {site.limits.imageSize} KB</div>
            <div>Resolución: {site.limits.resolution}</div>
          </div>
        </div>
        
        <div className="flex gap-1.5">
          <Button 
            size="sm" 
            onClick={() => onScan?.(site.id)}
            disabled={!site.isActive}
            className="flex-1"
          >
            <Play className="h-3 w-3" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => onViewLogs?.(site.id)}
            title="Ver logs"
          >
            <FileSearch className="h-3 w-3" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => onToggleActive?.(site.id)}
            title={site.isActive ? "Desactivar sitio" : "Activar sitio"}
          >
            {site.isActive ? (
              <PowerOff className="h-3 w-3" />
            ) : (
              <Power className="h-3 w-3" />
            )}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => onSettings?.(site.id)}
            title="Configuración"
          >
            <Settings className="h-3 w-3" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => onDownload?.(site.id)}
            title="Descargar reporte"
          >
            <Download className="h-3 w-3" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => onDelete?.(site.id)}
            title="Eliminar sitio"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SiteCard;