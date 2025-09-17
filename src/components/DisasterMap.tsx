import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, MapPin } from "lucide-react";
import { motion } from "framer-motion";

// Mock data for disaster zones
const disasterZones = [
  {
    id: 1,
    name: "Kerala Coastal Region",
    lat: 9.9312,
    lng: 76.2673,
    riskLevel: "high",
    type: "flood",
    description: "Heavy monsoon flooding expected"
  },
  {
    id: 2, 
    name: "Mumbai Metropolitan",
    lat: 19.0760,
    lng: 72.8777,
    riskLevel: "moderate",
    type: "rainfall",
    description: "Heavy rainfall warning"
  },
  {
    id: 3,
    name: "Himachal Pradesh Hills",
    lat: 31.1048,
    lng: 77.1734,
    riskLevel: "high",
    type: "landslide",
    description: "Landslide risk due to rainfall"
  },
  {
    id: 4,
    name: "Tamil Nadu Coastal",
    lat: 11.1271,
    lng: 78.6569,
    riskLevel: "low",
    type: "rainfall",
    description: "Normal monsoon activity"
  },
  {
    id: 5,
    name: "Gujarat Region",
    lat: 23.0225,
    lng: 72.5714,
    riskLevel: "moderate",
    type: "flood",
    description: "River level monitoring"
  }
];

const riskColors = {
  low: "#22c55e",
  moderate: "#f59e0b", 
  high: "#ef4444"
};

export function DisasterMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Since we can't use actual Leaflet in this demo, we'll create a visual representation
    // In a real implementation, this would initialize a Leaflet map
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div class="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg overflow-hidden border">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center space-y-4">
              <div class="text-4xl">🗺️</div>
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Interactive Map of India</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                In a real implementation, this would show an interactive Leaflet map with disaster zones
              </p>
            </div>
          </div>
          
          <!-- Mock disaster zone indicators -->
          <div class="absolute top-4 left-4 space-y-1">
            <div class="flex items-center space-x-2 text-xs">
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
              <span class="text-gray-600 dark:text-gray-400">Low Risk</span>
            </div>
            <div class="flex items-center space-x-2 text-xs">
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span class="text-gray-600 dark:text-gray-400">Moderate Risk</span>
            </div>
            <div class="flex items-center space-x-2 text-xs">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <span class="text-gray-600 dark:text-gray-400">High Risk</span>
            </div>
          </div>

          <!-- Mock zone indicators -->
          <div class="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          <div class="absolute top-1/2 left-1/4 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg"></div>
          <div class="absolute bottom-1/3 right-1/3 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
          <div class="absolute top-1/3 right-1/4 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg"></div>
          <div class="absolute bottom-1/4 left-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        </div>
      `;
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
              <Map className="h-5 w-5 text-white" />
            </div>
            <span>Disaster Risk Map</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Map Container */}
          <div ref={mapRef} className="h-64 w-full" />

          {/* Active Zones List */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Active Risk Zones</span>
            </h4>
            
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {disasterZones.map((zone, index) => (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: riskColors[zone.riskLevel] }}
                    />
                    <div>
                      <span className="text-sm font-medium">{zone.name}</span>
                      <p className="text-xs text-muted-foreground">{zone.description}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={zone.riskLevel === "high" ? "destructive" : zone.riskLevel === "moderate" ? "warning" : "success"}
                    className="text-xs"
                  >
                    {zone.riskLevel}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}