import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi" | "ta";

interface TranslationContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    title: "GeoShield",
    subtitle: "AI Disaster Early Warning",
    dashboard: "Dashboard",
    alerts: "Alerts",
    map: "Map",
    
    // Hero Section
    heroTitle: "AI-Powered Disaster Protection",
    heroSubtitle: "Real-time monitoring and early warning system to keep communities safe from natural disasters across India",
    systemOnline: "System Online",
    aiMonitoring: "AI Monitoring Active",
    
    // Alert Types
    floodAlert: "Flood Alert",
    landslideWarning: "Landslide Warning",
    heavyRainfall: "Heavy Rainfall",
    seismicActivity: "Seismic Activity",
    
    // Severity Levels
    lowRisk: "Low Risk",
    moderateRisk: "Moderate Risk",
    highRisk: "High Risk",
    
    // Common Actions
    details: "Details",
    active: "ACTIVE",
    settings: "Settings",
    advancedSettings: "Advanced Settings",
    
    // AI Predictor
    aiPredictionEngine: "AI Prediction Engine",
    next30Minutes: "Next 30 minutes",
    riskAssessment: "Risk Assessment",
    confidenceLevel: "Confidence Level",
    keyFactors: "Key Factors",
    recommendation: "Recommendation",
    lastUpdated: "Last updated",
    
    // Map
    disasterRiskMap: "Disaster Risk Map",
    activeRiskZones: "Active Risk Zones",
    interactiveMap: "Interactive Map of India",
    mapDescription: "Click on zones to view detailed information about disaster risks in that region",
    
    // Alert System
    alertSystem: "Alert System",
    notificationMethods: "Notification Methods",
    alertPreferences: "Alert Preferences",
    recentAlerts: "Recent Alerts",
    highRiskAlerts: "High Risk Alerts",
    moderateRiskAlerts: "Moderate Risk Alerts",
    weatherUpdates: "Weather Updates",
    
    // Notification Methods
    instantTextMessages: "Instant text messages",
    detailedEmailAlerts: "Detailed email alerts",
    whatsappNotifications: "WhatsApp notifications",
    
    // Charts
    riskTrends24h: "Risk Trends (24h)",
    peakRisk: "Peak Risk",
    avgRisk: "Avg Risk",
    totalAlerts: "Total Alerts",
    riskLevelsDecreasing: "Risk levels are decreasing",
    
    // Alert Descriptions
    keralFloodDesc: "Heavy monsoon rains have caused severe flooding in low-lying areas. Water levels are rising rapidly.",
    himachalLandslideDesc: "Soil saturation has reached critical levels. Landslide risk is imminent in hilly regions.",
    mumbaiRainfallDesc: "Heavy rainfall warning issued. Possible waterlogging in low-lying areas expected.",
    delhiEarthquakeDesc: "Minor seismic activity detected. No immediate threat, monitoring continues.",
    
    // Time indicators
    updatedMinutesAgo: "Updated {minutes} minutes ago",
    updatedHourAgo: "Updated 1 hour ago",
    minutesAgo: "{minutes} min ago",
    hourAgo: "1 hour ago",
    
    // Status messages
    highFloodRiskSent: "High flood risk alert sent",
    weatherUpdateNotification: "Weather update notification",
    landslideWarningAlert: "Landslide warning alert",
    delivered: "delivered",
    
    // Locations
    keralaCoastalRegion: "Kerala Coastal Region",
    mumbaiMetropolitan: "Mumbai Metropolitan",
    himachalPradeshHills: "Himachal Pradesh Hills",
    tamilNaduCoastal: "Tamil Nadu Coastal",
    gujaratRegion: "Gujarat Region",
    delhiNCRRegion: "Delhi NCR Region",
    
    // Areas
    kochi: "Kochi",
    alappuzha: "Alappuzha",
    thrissur: "Thrissur",
    shimla: "Shimla",
    manali: "Manali",
    dharamshala: "Dharamshala",
    southMumbai: "South Mumbai",
    thane: "Thane",
    naviMumbai: "Navi Mumbai",
    delhi: "Delhi",
    gurgaon: "Gurgaon",
    noida: "Noida",
    
    // Footer
    footerText: "GeoShield AI Disaster Early Warning System • Built for safety and prevention",
    emergencyHotline: "Emergency Hotline: 108 | Stay Safe, Stay Informed",
    
    // Alert Activity
    currentDisasterAlerts: "Current Disaster Alerts",
    activeAlerts: "{count} Active Alerts",
    
    // Map zones
    heavyMonsoonFlooding: "Heavy monsoon flooding expected",
    heavyRainfallWarning: "Heavy rainfall warning", 
    landslideRiskDueToRainfall: "Landslide risk due to rainfall",
    normalMonsoonActivity: "Normal monsoon activity",
    riverLevelMonitoring: "River level monitoring",
    
    // AI Factors
    heavyRainfallPatterns: "Heavy rainfall patterns",
    soilSaturationLevels: "Soil saturation levels",
    historicalData: "Historical data",
    
    // Recommendations
    monitorWeatherConditions: "Monitor weather conditions closely. Prepare for potential warnings."
  },
  
  hi: {
    // Header
    title: "जियोशील्ड",
    subtitle: "एआई आपदा चेतावनी",
    dashboard: "डैशबोर्ड",
    alerts: "अलर्ट",
    map: "मानचित्र",
    
    // Hero Section
    heroTitle: "एआई-संचालित आपदा सुरक्षा",
    heroSubtitle: "भारत भर में प्राकृतिक आपदाओं से समुदायों को सुरक्षित रखने के लिए वास्तविक समय निगरानी और पूर्व चेतावनी प्रणाली",
    systemOnline: "सिस्टम ऑनलाइन",
    aiMonitoring: "एआई निगरानी सक्रिय",
    
    // Alert Types
    floodAlert: "बाढ़ चेतावनी",
    landslideWarning: "भूस्खलन चेतावनी",
    heavyRainfall: "भारी बारिश",
    seismicActivity: "भूकंपीय गतिविधि",
    
    // Severity Levels
    lowRisk: "कम जोखिम",
    moderateRisk: "मध्यम जोखिम",
    highRisk: "उच्च जोखिम",
    
    // Common Actions
    details: "विवरण",
    active: "सक्रिय",
    settings: "सेटिंग्स",
    advancedSettings: "उन्नत सेटिंग्स",
    
    // AI Predictor
    aiPredictionEngine: "एआई पूर्वानुमान इंजन",
    next30Minutes: "अगले 30 मिनट",
    riskAssessment: "जोखिम मूल्यांकन",
    confidenceLevel: "विश्वास स्तर",
    keyFactors: "मुख्य कारक",
    recommendation: "सिफारिश",
    lastUpdated: "अंतिम अपडेट",
    
    // Map
    disasterRiskMap: "आपदा जोखिम मानचित्र",
    activeRiskZones: "सक्रिय जोखिम क्षेत्र",
    interactiveMap: "भारत का इंटरैक्टिव मानचित्र",
    mapDescription: "उस क्षेत्र में आपदा जोखिमों के बारे में विस्तृत जानकारी देखने के लिए ज़ोन पर क्लिक करें",
    
    // Alert System
    alertSystem: "चेतावनी प्रणाली",
    notificationMethods: "सूचना के तरीके",
    alertPreferences: "चेतावनी प्राथमिकताएं",
    recentAlerts: "हाल की चेतावनी",
    highRiskAlerts: "उच्च जोखिम चेतावनी",
    moderateRiskAlerts: "मध्यम जोखिम चेतावनी",
    weatherUpdates: "मौसम अपडेट",
    
    // Notification Methods
    instantTextMessages: "तत्काल टेक्स्ट संदेश",
    detailedEmailAlerts: "विस्तृत ईमेल चेतावनी",
    whatsappNotifications: "व्हाट्सएप सूचनाएं",
    
    // Charts
    riskTrends24h: "जोखिम रुझान (24 घंटे)",
    peakRisk: "अधिकतम जोखिम",
    avgRisk: "औसत जोखिम",
    totalAlerts: "कुल चेतावनी",
    riskLevelsDecreasing: "जोखिम स्तर घट रहे हैं",
    
    // Alert Descriptions
    keralFloodDesc: "भारी मानसून बारिश के कारण निचले इलाकों में गंभीर बाढ़ आई है। पानी का स्तर तेजी से बढ़ रहा है।",
    himachalLandslideDesc: "मिट्टी की संतृप्ति गंभीर स्तर तक पहुंच गई है। पहाड़ी क्षेत्रों में भूस्खलन का खतरा।",
    mumbaiRainfallDesc: "भारी बारिश की चेतावनी जारी। निचले इलाकों में जलभराव की संभावना।",
    delhiEarthquakeDesc: "मामूली भूकंपीय गतिविधि का पता चला। कोई तत्काल खतरा नहीं, निगरानी जारी।",
    
    // Locations
    keralaCoastalRegion: "केरल तटीय क्षेत्र",
    mumbaiMetropolitan: "मुंबई महानगर",
    himachalPradeshHills: "हिमाचल प्रदेश पहाड़ियां",
    tamilNaduCoastal: "तमिलनाडु तटीय",
    gujaratRegion: "गुजरात क्षेत्र",
    delhiNCRRegion: "दिल्ली एनसीआर क्षेत्र",
    
    // Footer
    footerText: "जियोशील्ड एआई आपदा पूर्व चेतावनी प्रणाली • सुरक्षा और रोकथाम के लिए निर्मित",
    emergencyHotline: "आपातकालीन हॉटलाइन: 108 | सुरक्षित रहें, सूचित रहें"
  },
  
  ta: {
    // Header  
    title: "ஜியோஷீல்ட்",
    subtitle: "AI பேரிடர் எச்சரிக்கை",
    dashboard: "டாஷ்போர்டு",
    alerts: "எச்சரிக்கைகள்",
    map: "வரைபடம்",
    
    // Hero Section
    heroTitle: "AI-ஆல் இயக்கப்படும் பேரிடர் பாதுகாப்பு",
    heroSubtitle: "இந்தியா முழுவதும் இயற்கை பேரிடர்களிலிருந்து சமூகங்களை பாதுகாக்க நிகழ்நேர கண்காணிப்பு மற்றும் முன்னெச்சரிக்கை அமைப்பு",
    systemOnline: "சிஸ்டம் ஆன்லைன்",
    aiMonitoring: "AI கண்காணிப்பு செயலில்",
    
    // Alert Types
    floodAlert: "வெள்ள எச்சரிக்கை",
    landslideWarning: "நிலச்சரிவு எச்சரிக்கை",
    heavyRainfall: "கனமழை",
    seismicActivity: "நில அதிர்வு செயல்பாடு",
    
    // Severity Levels
    lowRisk: "குறைந்த ஆபத்து",
    moderateRisk: "மிதமான ஆபத்து",
    highRisk: "அதிக ஆபத்து",
    
    // Common Actions
    details: "விவரங்கள்",
    active: "செயலில்",
    settings: "அமைப்புகள்",
    advancedSettings: "மேம்பட்ட அமைப்புகள்",
    
    // AI Predictor
    aiPredictionEngine: "AI முன்கணிப்பு இயந்திரம்",
    next30Minutes: "அடுத்த 30 நிமிடங்கள்",
    riskAssessment: "ஆபத்து மதிப்பீடு",
    confidenceLevel: "நம்பிக்கை நிலை",
    keyFactors: "முக்கிய காரணிகள்",
    recommendation: "பரிந்துரை",
    lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது",
    
    // Map
    disasterRiskMap: "பேரிடர் ஆபத்து வரைபடம்",
    activeRiskZones: "செயலில் உள்ள ஆபத்து மண்டலங்கள்",
    interactiveMap: "இந்தியாவின் ஊடாடும் வரைபடம்",
    mapDescription: "அந்த பகுதியில் உள்ள பேரிடர் ஆபத்துகள் பற்றிய விரிவான தகவல்களைப் பார்க்க மண்டலங்களில் கிளிக் செய்யவும்",
    
    // Alert System
    alertSystem: "எச்சரிக்கை அமைப்பு",
    notificationMethods: "அறிவிப்பு முறைகள்",
    alertPreferences: "எச்சரிக்கை விருப்பங்கள்",
    recentAlerts: "சமீபத்திய எச்சரிக்கைகள்",
    highRiskAlerts: "அதிக ஆபத்து எச்சரிக்கைகள்",
    moderateRiskAlerts: "மிதமான ஆபத்து எச்சரிக்கைகள்",
    weatherUpdates: "வானிலை புதுப்பிப்புகள்",
    
    // Notification Methods
    instantTextMessages: "உடனடி உரை செய்திகள்",
    detailedEmailAlerts: "விரிவான மின்னஞ்சல் எச்சரிக்கைகள்",
    whatsappNotifications: "WhatsApp அறிவிப்புகள்",
    
    // Charts
    riskTrends24h: "ஆபத்து போக்குகள் (24 மணி)",
    peakRisk: "உச்ச ஆபத்து",
    avgRisk: "சராசரி ஆபத்து",
    totalAlerts: "மொத்த எச்சரிக்கைகள்",
    riskLevelsDecreasing: "ஆபத்து நிலைகள் குறைகின்றன",
    
    // Alert Descriptions
    keralFloodDesc: "கனமழை காரணமாக தாழ்வான பகுதிகளில் கடுமையான வெள்ளம். நீர் மட்டம் வேகமாக உயர்ந்து வருகிறது।",
    himachalLandslideDesc: "மண் நிறைவு முக்கியமான நிலையை அடைந்துள்ளது। மலைப்பகுதிகளில் நிலச்சரிவு ஆபத்து.",
    mumbaiRainfallDesc: "கனமழை எச்சரிக்கை வெளியிடப்பட்டுள்ளது। தாழ்வான பகுதிகளில் நீர்க்கோர்ப்பு சாத்தியம்.",
    delhiEarthquakeDesc: "சிறிய நில அதிர்வு செயல்பாடு கண்டறியப்பட்டது. உடனடி அபாயம் இல்லை, கண்காணிப்பு தொடர்கிறது।",
    
    // Locations
    keralaCoastalRegion: "கேரள கடலோர பகுதி",
    mumbaiMetropolitan: "மும்பை பெருநகர்",
    himachalPradeshHills: "இமாசல பிரதேச மலைகள்",
    tamilNaduCoastal: "தமிழ்நாடு கடலோர",
    gujaratRegion: "குஜராத் பகுதி",
    delhiNCRRegion: "டெல்லி NCR பகுதி",
    
    // Footer
    footerText: "ஜியோஷீல்ட் AI பேரிடர் முன்னெச்சரிக்கை அமைப்பு • பாதுகாப்பு மற்றும் தடுப்புக்காக உருவாக்கப்பட்டது",
    emergencyHotline: "அவசரகால ஹாட்லைன்: 108 | பாதுகாப்பாக இருங்கள், தகவல் அறிந்து இருங்கள்"
  }
};

const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <TranslationContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}