import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "destructive";
  icon?: React.ReactNode;
}

const MetricsCard = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  variant = "default",
  icon 
}: MetricsCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-gradient-to-br from-success/5 to-success/10";
      case "warning":
        return "border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10";
      case "destructive":
        return "border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10";
      default:
        return "border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10";
    }
  };

  const getValueColor = () => {
    switch (variant) {
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      case "destructive":
        return "text-destructive";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className={cn(
      "border-2 transition-all duration-200 hover:shadow-elevation-lg",
      getVariantStyles()
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className={cn("p-2 rounded-lg", {
            "bg-success/10": variant === "success",
            "bg-warning/10": variant === "warning", 
            "bg-destructive/10": variant === "destructive",
            "bg-primary/10": variant === "default",
          })}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", getValueColor())}>
          {value}
        </div>
        <div className="flex items-center justify-between mt-1">
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <Badge variant={trend.isPositive ? "outline" : "destructive"} className="text-xs">
              {trend.isPositive ? "+" : ""}{trend.value}%
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;