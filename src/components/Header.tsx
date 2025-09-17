import { useState } from "react";
import { Globe, Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

type Language = "en" | "hi" | "ta";

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

const languages: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
];

export function Header() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  const translations = {
    title: {
      en: "GeoShield",
      hi: "जियोशील्ड",
      ta: "ஜியோஷீல்ட்"
    },
    subtitle: {
      en: "AI Disaster Early Warning",
      hi: "एआई आपदा चेतावनी",
      ta: "AI பேரிடர் எச்சரிக்கை"
    },
    dashboard: {
      en: "Dashboard",
      hi: "डैशबोर्ड",
      ta: "டாஷ்போர்டு"
    },
    alerts: {
      en: "Alerts",
      hi: "अलर्ट",
      ta: "எச்சரிக்கைகள்"
    },
    map: {
      en: "Map",
      hi: "मानचित्र",
      ta: "வரைபடம்"
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Title */}
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {translations.title[currentLanguage]}
            </h1>
            <p className="text-xs text-muted-foreground">
              {translations.subtitle[currentLanguage]}
            </p>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            {translations.dashboard[currentLanguage]}
          </a>
          <a href="#alerts" className="text-sm font-medium hover:text-primary transition-colors">
            {translations.alerts[currentLanguage]}
          </a>
          <a href="#map" className="text-sm font-medium hover:text-primary transition-colors">
            {translations.map[currentLanguage]}
          </a>
        </nav>

        {/* Language Selector and Mobile Menu */}
        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="h-9 px-3"
            >
              <Globe className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{currentLang?.nativeName}</span>
              <span className="sm:hidden">{currentLang?.code.toUpperCase()}</span>
            </Button>

            <AnimatePresence>
              {isLanguageMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 z-50"
                >
                  <Card className="min-w-[150px] p-1">
                    {languages.map((lang) => (
                      <Button
                        key={lang.code}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          setCurrentLanguage(lang.code);
                          setIsLanguageMenuOpen(false);
                        }}
                      >
                        <span className="text-sm">{lang.nativeName}</span>
                      </Button>
                    ))}
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden h-9 w-9 p-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur"
          >
            <div className="container mx-auto py-4 px-4">
              <div className="flex flex-col space-y-3">
                <a 
                  href="#dashboard" 
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {translations.dashboard[currentLanguage]}
                </a>
                <a 
                  href="#alerts" 
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {translations.alerts[currentLanguage]}
                </a>
                <a 
                  href="#map" 
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {translations.map[currentLanguage]}
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Click away overlay */}
      {(isLanguageMenuOpen || isMobileMenuOpen) && (
        <div 
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => {
            setIsLanguageMenuOpen(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </header>
  );
}