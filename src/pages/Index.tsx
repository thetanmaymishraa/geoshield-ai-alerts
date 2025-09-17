import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { AlertCard } from "@/components/AlertCard";
import { AIPredictor } from "@/components/AIPredictor";
import { DisasterMap } from "@/components/DisasterMap";
import { RiskChart } from "@/components/RiskChart";
import { AlertSystem } from "@/components/AlertSystem";

// Mock disaster alerts data
const activeAlerts = [
  {
    id: "1",
    type: "flood" as const,
    severity: "high" as const,
    location: "Kerala Coastal Region",
    time: "Updated 5 minutes ago",
    description: "Heavy monsoon rains have caused severe flooding in low-lying areas. Water levels are rising rapidly.",
    affectedAreas: ["Kochi", "Alappuzha", "Thrissur"],
    isActive: true
  },
  {
    id: "2", 
    type: "landslide" as const,
    severity: "high" as const,
    location: "Himachal Pradesh Hills",
    time: "Updated 12 minutes ago",
    description: "Soil saturation has reached critical levels. Landslide risk is imminent in hilly regions.",
    affectedAreas: ["Shimla", "Manali", "Dharamshala"],
    isActive: true
  },
  {
    id: "3",
    type: "rainfall" as const,
    severity: "moderate" as const,
    location: "Mumbai Metropolitan", 
    time: "Updated 25 minutes ago",
    description: "Heavy rainfall warning issued. Possible waterlogging in low-lying areas expected.",
    affectedAreas: ["South Mumbai", "Thane", "Navi Mumbai"],
    isActive: false
  },
  {
    id: "4",
    type: "earthquake" as const,
    severity: "low" as const,
    location: "Delhi NCR Region",
    time: "Updated 1 hour ago", 
    description: "Minor seismic activity detected. No immediate threat, monitoring continues.",
    affectedAreas: ["Delhi", "Gurgaon", "Noida"],
    isActive: false
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <motion.section 
          id="dashboard"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 py-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            AI-Powered Disaster Protection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time monitoring and early warning system to keep communities safe from natural disasters across India
          </p>
          <div className="flex items-center justify-center space-x-4 pt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-muted-foreground">System Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">AI Monitoring Active</span>
            </div>
          </div>
        </motion.section>

        {/* AI Prediction and Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AIPredictor />
          </div>
          <div className="lg:col-span-1">
            <RiskChart />
          </div>
          <div className="lg:col-span-1">
            <AlertSystem />
          </div>
        </div>

        {/* Current Alerts Section */}
        <motion.section 
          id="alerts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Current Disaster Alerts</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />
              <span className="text-sm text-muted-foreground">
                {activeAlerts.filter(alert => alert.isActive).length} Active Alerts
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AlertCard {...alert} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Map Section */}
        <motion.section 
          id="map"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-foreground">Disaster Risk Map</h2>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <DisasterMap />
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center py-8 border-t border-border/40"
        >
          <p className="text-sm text-muted-foreground">
            GeoShield AI Disaster Early Warning System • Built for safety and prevention
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Emergency Hotline: 108 | Stay Safe, Stay Informed
          </p>
        </motion.footer>
      </main>
    </div>
  );
};

export default Index;
