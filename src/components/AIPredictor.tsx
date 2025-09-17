import { Brain, TrendingUp, Clock, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useTranslation } from "@/contexts/TranslationContext";

interface PredictionData {
  timeframe: string;
  riskLevel: "low" | "moderate" | "high";
  confidence: number;
  factors: string[];
  recommendation: string;
}

const mockPrediction: PredictionData = {
  timeframe: "Next 30 minutes",
  riskLevel: "moderate",
  confidence: 78,
  factors: ["Heavy rainfall patterns", "Soil saturation levels", "Historical data"],
  recommendation: "Monitor weather conditions closely. Prepare for potential warnings."
};

const riskConfig = {
  low: {
    color: "text-success",
    bgColor: "bg-success/10",
    badge: "success",
    icon: "🟢"
  },
  moderate: {
    color: "text-warning",
    bgColor: "bg-warning/10",
    badge: "warning", 
    icon: "🟡"
  },
  high: {
    color: "text-danger",
    bgColor: "bg-danger/10",
    badge: "destructive",
    icon: "🔴"
  }
};

export function AIPredictor() {
  const { t } = useTranslation();
  const riskInfo = riskConfig[mockPrediction.riskLevel];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span>{t("aiPredictionEngine")}</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Prediction */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {t("next30Minutes")}
                </span>
              </div>
              <Badge variant={riskInfo.badge as any} className="text-xs">
                {riskInfo.icon} {mockPrediction.riskLevel.toUpperCase()}
              </Badge>
            </div>

            {/* Risk Level Indicator */}
            <div className={`p-4 rounded-lg ${riskInfo.bgColor} border`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">{t("riskAssessment")}</span>
                <span className={`font-bold ${riskInfo.color}`}>
                  {t(`${mockPrediction.riskLevel}Risk`)}
                </span>
              </div>
              <Progress 
                value={mockPrediction.riskLevel === "low" ? 25 : mockPrediction.riskLevel === "moderate" ? 65 : 90}
                className="h-2"
              />
            </div>
          </div>

          {/* Confidence Level */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("confidenceLevel")}</span>
              <span className="text-sm font-bold">{mockPrediction.confidence}%</span>
            </div>
            <Progress value={mockPrediction.confidence} className="h-2" />
          </div>

          {/* Key Factors */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>{t("keyFactors")}</span>
            </h4>
            <div className="space-y-2">
              {mockPrediction.factors.map((factor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">{factor}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="p-3 bg-muted/50 rounded-lg border">
            <h4 className="text-sm font-medium mb-2 flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>Recommendation</span>
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {mockPrediction.recommendation}
            </p>
          </div>

          {/* Last Updated */}
          <div className="text-center">
            <motion.span 
              className="text-xs text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Last updated: {new Date().toLocaleTimeString()}
            </motion.span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}