import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  ScanLine,
  Settings,
  Moon,
  Sun
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface DashboardHeaderProps {
  onAddSite?: () => void;
  onScanAll?: () => void;
  onSettings?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

const DashboardHeader = ({ 
  onAddSite, 
  onScanAll, 
  onSettings,
  searchValue = "",
  onSearchChange 
}: DashboardHeaderProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Rollpix Speed Monitor
            </h1>
            <p className="text-muted-foreground">
              Monitor de performance y optimización de recursos de tiendas publicadas
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar sitios..."
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            
            <Button variant="outline" onClick={onSettings}>
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </Button>
            
            <Button variant="secondary" onClick={onScanAll}>
              <ScanLine className="h-4 w-4 mr-2" />
              Escanear Todos
            </Button>
            
            <Button onClick={onAddSite}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Sitio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;