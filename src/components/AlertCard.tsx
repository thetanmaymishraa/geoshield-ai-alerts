import { AlertTriangle, Clock, MapPin, Info } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/contexts/TranslationContext";

interface AlertCardProps {
  id: string;
  type: "flood" | "landslide" | "rainfall" | "earthquake";
  severity: "low" | "moderate" | "high";
  location: string;
  locationKey: string;
  time: string;
  description: string;
  descriptionKey: string;
  affectedAreas: string[];
  affectedAreasKeys: string[];
  isActive?: boolean;
}

const alertConfig = {
  flood: {
    icon: "💧",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    nameKey: "floodAlert"
  },
  landslide: {
    icon: "⛰️",
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    nameKey: "landslideWarning"
  },
  rainfall: {
    icon: "🌧️",
    color: "text-gray-600",
    bgColor: "bg-gray-50 dark:bg-gray-950/20",
    nameKey: "heavyRainfall"
  },
  earthquake: {
    icon: "🔄",
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    nameKey: "seismicActivity"
  }
};

const severityConfig = {
  low: {
    badge: "success",
    textKey: "lowRisk",
    glowClass: "success-glow"
  },
  moderate: {
    badge: "warning",
    textKey: "moderateRisk",
    glowClass: "warning-glow"
  },
  high: {
    badge: "destructive",
    textKey: "highRisk",
    glowClass: "alert-glow"
  }
};

export function AlertCard({ 
  type, 
  severity, 
  location,
  locationKey,
  time, 
  description,
  descriptionKey,
  affectedAreas,
  affectedAreasKeys,
  isActive = false 
}: AlertCardProps) {
  const { t } = useTranslation();
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
                  {t(alert.nameKey)}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t(locationKey)}</span>
                </div>
              </div>
            </div>
            <Badge 
              variant={severityInfo.badge as any}
              className="text-xs"
            >
              {t(severityInfo.textKey)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {t(descriptionKey)}
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
                  {affectedAreasKeys.map((areaKey, index) => (
                    <Badge 
                      key={index}
                      variant="secondary" 
                      className="text-xs"
                    >
                      {t(areaKey)}
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
                {t("details")}
              </Button>
              
              {isActive && (
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Badge variant="destructive" className="text-xs">
                    🔴 {t("active")}
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