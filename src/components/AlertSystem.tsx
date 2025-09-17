import { useState } from "react";
import { Bell, Smartphone, Mail, MessageCircle, Settings, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface NotificationMethod {
  id: string;
  name: string;
  icon: any;
  enabled: boolean;
  description: string;
}

export function AlertSystem() {
  const [notifications, setNotifications] = useState<NotificationMethod[]>([
    {
      id: "sms",
      name: "SMS",
      icon: Smartphone,
      enabled: true,
      description: "Instant text messages"
    },
    {
      id: "email", 
      name: "Email",
      icon: Mail,
      enabled: true,
      description: "Detailed email alerts"
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: MessageCircle,
      enabled: false,
      description: "WhatsApp notifications"
    }
  ]);

  const toggleNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
  };

  const activeCount = notifications.filter(n => n.enabled).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <span>Alert System</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {activeCount} Active
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Notification Methods */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Notification Methods</h4>
            
            {notifications.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${method.enabled ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{method.name}</div>
                      <div className="text-xs text-muted-foreground">{method.description}</div>
                    </div>
                  </div>
                  <Switch
                    checked={method.enabled}
                    onCheckedChange={() => toggleNotification(method.id)}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Alert Preferences */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Alert Preferences</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">High Risk Alerts</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Moderate Risk Alerts</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Weather Updates</span>
                <Switch />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Recent Alerts</h4>
            
            <div className="space-y-2 max-h-24 overflow-y-auto">
              {[
                { time: "2 min ago", message: "High flood risk alert sent", status: "delivered" },
                { time: "15 min ago", message: "Weather update notification", status: "delivered" },
                { time: "1 hour ago", message: "Landslide warning alert", status: "delivered" }
              ].map((alert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start space-x-2 text-xs"
                >
                  <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-foreground">{alert.message}</div>
                    <div className="text-muted-foreground">{alert.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Settings Button */}
          <Button variant="outline" className="w-full" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Advanced Settings
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}