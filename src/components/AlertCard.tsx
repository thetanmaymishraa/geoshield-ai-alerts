import { AlertTriangle, Clock, MapPin, Info } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  id: string;
  type: "flood" | "landslide" | "rainfall" | "earthquake";
  severity: "low" | "moderate" | "high";
  location: string;
  time: string;
  description: string;
  affectedAreas: string[];
  isActive?: boolean;
}

const alertConfig = {
  flood: {
    icon: "💧",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    name: "Flood Alert"
  },
  landslide: {
    icon: "⛰️",
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    name: "Landslide Warning"
  },
  rainfall: {
    icon: "🌧️",
    color: "text-gray-600",
    bgColor: "bg-gray-50 dark:bg-gray-950/20",
    name: "Heavy Rainfall"
  },
  earthquake: {
    icon: "🔄",
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    name: "Seismic Activity"
  }
};

const severityConfig = {
  low: {
    badge: "success",
    text: "Low Risk",
    glowClass: "success-glow"
  },
  moderate: {
    badge: "warning",
    text: "Moderate Risk",
    glowClass: "warning-glow"
  },
  high: {
    badge: "destructive",
    text: "High Risk",
    glowClass: "alert-glow"
  }
};

export function AlertCard({ 
  type, 
  severity, 
  location, 
  time, 
  description, 
  affectedAreas,
  isActive = false 
}: AlertCardProps) {
  const alert = alertConfig[type];
  const severityInfo = severityConfig[severity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2 }}
      className={cn(
        "group",
        isActive && severity === "high" && "pulse-danger"
      )}
    >
      <Card className={cn(
        "transition-all duration-300 hover:shadow-lg border-l-4",
        alert.bgColor,
        severity === "high" && "border-l-danger",
        severity === "moderate" && "border-l-warning", 
        severity === "low" && "border-l-success",
        isActive && severity === "high" && severityInfo.glowClass
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{alert.icon}</div>
              <div>
                <h3 className="font-semibold text-foreground text-base">
                  {alert.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{location}</span>
                </div>
              </div>
            </div>
            <Badge 
              variant={severityInfo.badge as any}
              className="text-xs"
            >
              {severityInfo.text}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {description}
          </p>

          <div className="space-y-3">
            {/* Time */}
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{time}</span>
            </div>

            {/* Affected Areas */}
            {affectedAreas.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Affected Areas:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {affectedAreas.map((area, index) => (
                    <Badge 
                      key={index}
                      variant="secondary" 
                      className="text-xs"
                    >
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <Button 
                size="sm" 
                variant="outline"
                className="h-8 text-xs"
              >
                <Info className="h-3 w-3 mr-1" />
                Details
              </Button>
              
              {isActive && (
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Badge variant="destructive" className="text-xs">
                    🔴 ACTIVE
                  </Badge>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}