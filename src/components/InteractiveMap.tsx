import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Map, MapPin, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/contexts/TranslationContext";

// Leaflet imports
declare global {
  interface Window {
    L: any;
  }
}

interface DisasterZone {
  id: number;
  name: string;
  translationKey: string;
  lat: number;
  lng: number;
  riskLevel: "low" | "moderate" | "high";
  type: "flood" | "landslide" | "rainfall" | "earthquake";
  description: string;
  descriptionKey: string;
  affectedPopulation: number;
}

const disasterZones: DisasterZone[] = [
  {
    id: 1,
    name: "Kerala Coastal Region",
    translationKey: "keralaCoastalRegion",
    lat: 9.9312,
    lng: 76.2673,
    riskLevel: "high",
    type: "flood",
    description: "Heavy monsoon flooding expected",
    descriptionKey: "heavyMonsoonFlooding",
    affectedPopulation: 850000
  },
  {
    id: 2, 
    name: "Mumbai Metropolitan",
    translationKey: "mumbaiMetropolitan",
    lat: 19.0760,
    lng: 72.8777,
    riskLevel: "moderate",
    type: "rainfall",
    description: "Heavy rainfall warning",
    descriptionKey: "heavyRainfallWarning",
    affectedPopulation: 1200000
  },
  {
    id: 3,
    name: "Himachal Pradesh Hills",
    translationKey: "himachalPradeshHills",
    lat: 31.1048,
    lng: 77.1734,
    riskLevel: "high",
    type: "landslide",
    description: "Landslide risk due to rainfall",
    descriptionKey: "landslideRiskDueToRainfall",
    affectedPopulation: 45000
  },
  {
    id: 4,
    name: "Tamil Nadu Coastal",
    translationKey: "tamilNaduCoastal",
    lat: 11.1271,
    lng: 78.6569,
    riskLevel: "low",
    type: "rainfall",
    description: "Normal monsoon activity",
    descriptionKey: "normalMonsoonActivity",
    affectedPopulation: 320000
  },
  {
    id: 5,
    name: "Gujarat Region",
    translationKey: "gujaratRegion",
    lat: 23.0225,
    lng: 72.5714,
    riskLevel: "moderate",
    type: "flood",
    description: "River level monitoring",
    descriptionKey: "riverLevelMonitoring",
    affectedPopulation: 680000
  }
];

const riskColors = {
  low: "#22c55e",
  moderate: "#f59e0b", 
  high: "#ef4444"
};

const alertIcons = {
  flood: "🌊",
  landslide: "⛰️",
  rainfall: "🌧️",
  earthquake: "🔄"
};

export function DisasterMap() {
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [selectedZone, setSelectedZone] = useState<DisasterZone | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const loadLeaflet = async () => {
      // Load Leaflet CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // Load Leaflet JS
      if (!window.L) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = initializeMap;
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (!mapRef.current || mapInstance.current) return;

      try {
        // Initialize map centered on India
        mapInstance.current = window.L.map(mapRef.current, {
          center: [20.5937, 78.9629], // Center of India
          zoom: 5,
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          boxZoom: true,
          keyboard: true,
          dragging: true,
          touchZoom: true
        });

        // Add OpenStreetMap tiles
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18,
        }).addTo(mapInstance.current);

        // Add disaster zone markers
        disasterZones.forEach((zone) => {
          const color = riskColors[zone.riskLevel];
          
          // Create custom icon
          const customIcon = window.L.divIcon({
            className: 'custom-marker',
            html: `
              <div style="
                background-color: ${color};
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px;
                cursor: pointer;
                animation: ${zone.riskLevel === 'high' ? 'pulse 2s infinite' : 'none'};
              ">
                ${alertIcons[zone.type]}
              </div>
              <style>
                @keyframes pulse {
                  0% { transform: scale(1); opacity: 1; }
                  50% { transform: scale(1.2); opacity: 0.7; }
                  100% { transform: scale(1); opacity: 1; }
                }
              </style>
            `,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });

          const marker = window.L.marker([zone.lat, zone.lng], { 
            icon: customIcon 
          }).addTo(mapInstance.current);

          // Add click event to marker
          marker.on('click', () => {
            setSelectedZone(zone);
            mapInstance.current.setView([zone.lat, zone.lng], 7);
          });

          // Add tooltip
          marker.bindTooltip(`
            <div style="font-size: 12px;">
              <strong>${zone.name}</strong><br/>
              Risk: ${zone.riskLevel}<br/>
              Type: ${zone.type}
            </div>
          `, {
            permanent: false,
            direction: 'top'
          });

          markersRef.current.push(marker);
        });

        setIsMapLoaded(true);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    loadLeaflet();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

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
            <span>{t("disasterRiskMap")}</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {t("mapDescription")}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Map Container */}
          <div className="relative">
            <div 
              ref={mapRef} 
              className="h-64 w-full rounded-lg border border-border"
              style={{ minHeight: '256px' }}
            />
            
            {!isMapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center space-y-2">
                  <div className="text-2xl">🗺️</div>
                  <p className="text-sm text-muted-foreground">Loading interactive map...</p>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur p-2 rounded-lg border border-border/50 space-y-1">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-muted-foreground">{t("lowRisk")}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <span className="text-muted-foreground">{t("moderateRisk")}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-danger"></div>
                <span className="text-muted-foreground">{t("highRisk")}</span>
              </div>
            </div>
          </div>

          {/* Zone Details Modal */}
          <AnimatePresence>
            {selectedZone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 border rounded-lg bg-card space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{alertIcons[selectedZone.type]}</span>
                      <h4 className="font-semibold">{t(selectedZone.translationKey)}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t(selectedZone.descriptionKey)}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Population: {formatNumber(selectedZone.affectedPopulation)}</span>
                      <Badge 
                        variant={
                          selectedZone.riskLevel === "high" ? "destructive" : 
                          selectedZone.riskLevel === "moderate" ? "warning" : "success"
                        }
                        className="text-xs"
                      >
                        {t(`${selectedZone.riskLevel}Risk`)}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedZone(null)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Zones List */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{t("activeRiskZones")}</span>
            </h4>
            
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {disasterZones.map((zone, index) => (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedZone(zone);
                    if (mapInstance.current) {
                      mapInstance.current.setView([zone.lat, zone.lng], 7);
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: riskColors[zone.riskLevel] }}
                    />
                    <div>
                      <span className="text-sm font-medium">{t(zone.translationKey)}</span>
                      <p className="text-xs text-muted-foreground">{t(zone.descriptionKey)}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      zone.riskLevel === "high" ? "destructive" : 
                      zone.riskLevel === "moderate" ? "warning" : "success"
                    }
                    className="text-xs"
                  >
                    {t(`${zone.riskLevel}Risk`)}
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