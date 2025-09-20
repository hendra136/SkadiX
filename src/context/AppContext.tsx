import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { translations, LanguageCode } from "../translations";

// Translation helper function
const getNestedTranslation = (obj: any, path: string): string => {
  return path.split(".").reduce((current, key) => current?.[key], obj) || path;
};

// Types
type Port = {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [latitude, longitude]
};

type Scenario = {
  id: string;
  name: string;
  year: number;
  description: string;
};

interface AppContextType {
  selectedPort: Port | null;
  setSelectedPort: (port: Port | null) => void;
  selectedScenario: Scenario | null;
  setSelectedScenario: (scenario: Scenario | null) => void;
  layers: any[];
  updateLayer: (layerId: string, updates: any) => void;
  showCoastalSubmergence: boolean;
  setShowCoastalSubmergence: (show: boolean) => void;
  runSimulation: () => void;
  saveProject: () => void;
  generateReport: () => void;
  basemap: string;
  setBasemap: (basemap: string) => void;
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string) => string;
  riskData: any;
  setRiskData: (data: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  // State
  const [selectedPort, setSelectedPort] = useState<Port | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [layers, setLayers] = useState<any[]>([]);
  const [showCoastalSubmergence, setShowCoastalSubmergence] = useState(false);
  const [basemap, setBasemap] = useState("plain");
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [riskData, setRiskData] = useState<any>(null);

  // Translation function
  const t = (key: string): string => {
    return getNestedTranslation(translations[language], key);
  };

  // Effect to simulate API call for risk data
  useEffect(() => {
    if (selectedPort && selectedScenario) {
      // Simulate API call delay
      const timer = setTimeout(() => {
        // Mock risk data based on port and scenario
        const riskIndex = Math.floor(Math.random() * 95) + 1;
        const seaLevelRise = Math.random() * 2 + 0.5; // 0.5 to 2.5 meters

        let status = "Low Risk";
        if (riskIndex >= 70) status = "High Risk";
        else if (riskIndex >= 40) status = "Medium Risk";

        const mockRiskData = {
          riskIndex,
          seaLevelRise,
          status,
          portId: selectedPort.id,
          scenarioId: selectedScenario.id,
        };
        setRiskData(mockRiskData);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setRiskData(null);
    }
  }, [selectedPort, selectedScenario]);

  const updateLayer = (layerId: string, updates: any) => {
    setLayers((prev) => prev.map((layer) => (layer.id === layerId ? { ...layer, ...updates } : layer)));
  };

  const runSimulation = () => {
    // Simulation logic here
  };

  // Save project
  const saveProject = () => {
    // In a real app, this would call the backend API
  };

  // Generate report
  const generateReport = () => {
    const portName = selectedPort?.name || "Unknown Port";
    const scenarioName = selectedScenario?.name || "Unknown Scenario";

    // Create a simple report alert with translated content
    const reportContent = `
${t("dashboard.generateReport")}
${t("dashboard.port")}: ${portName}
${t("dashboard.scenario")}: ${scenarioName}
${t("dashboard.language")}: ${language.toUpperCase()}

${t("dashboard.coastalSubmergence.title")}:
- ${t("dashboard.coastalSubmergence.portAreaWaterLevel")}: ${riskData?.seaLevelRise || "N/A"}m
- ${t("dashboard.coastalSubmergence.floodRisk")}: ${riskData?.riskIndex || "N/A"}%
- ${t("dashboard.coastalSubmergence.infrastructureVulnerability")}: ${riskData?.status || "N/A"}

${t("dashboard.coastalSubmergence.dummyDataNote")}
    `.trim();

    alert(reportContent);
    // In a real app, this would call the backend API with the selected language
  };

  const value = {
    selectedPort,
    setSelectedPort,
    selectedScenario,
    setSelectedScenario,
    layers,
    updateLayer,
    showCoastalSubmergence,
    setShowCoastalSubmergence,
    runSimulation,
    saveProject,
    generateReport,
    basemap,
    setBasemap,
    language,
    setLanguage,
    t,
    riskData,
    setRiskData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
