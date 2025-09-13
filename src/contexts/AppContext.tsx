import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockFloats, mockChatResponses, translations } from '@/data/mockData';
import type { ArgoFloat } from '@/data/mockData';

type Language = 'en' | 'hi';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  floatIds?: string[];
  plotType?: string;
  variable?: string;
}

interface AppContextType {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;

  // Data
  floats: ArgoFloat[];
  selectedFloats: string[];
  setSelectedFloats: (floatIds: string[]) => void;

  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;

  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Query state for provenance
  lastQuery: {
    sql?: string;
    erddapUrl?: string;
    timestamp?: Date;
    parameters?: Record<string, any>;
  };
  setLastQuery: (query: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedFloats, setSelectedFloats] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your oceanographic assistant. Ask me about Argo float data, profiles, or oceanographic concepts.',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState({});

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const addChatMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newMessage]);

    // If it's a user message, generate a mock response
    if (message.type === 'user') {
      setTimeout(() => {
        // Enhanced response matching
        let mockResponse = mockChatResponses.find(resp => 
          message.content.toLowerCase().includes(resp.query.toLowerCase().split(' ')[0])
        );
        
        // If no match found, create a contextual response
        if (!mockResponse) {
          const content = message.content.toLowerCase();
          
          // Enhanced temperature analysis with seasonal patterns
          if (content.includes('temperature') && (content.includes('seasonal') || content.includes('monthly'))) {
            mockResponse = {
              query: "seasonal temperature analysis",
              response: "Seasonal temperature analysis reveals distinct patterns throughout the year. Surface temperatures peak during summer months (May-June) at ~30°C and cool during winter. The thermocline depth varies seasonally, deepening to ~65m during monsoon season (July-September) due to increased mixing.",
              floatIds: ["13857", "15855"],
              plotType: "timeseries",
              variable: "temperature"
            };
          } 
          // Temperature profile analysis
          else if (content.includes('temperature')) {
            mockResponse = {
              query: "temperature profile analysis",
              response: "Temperature profile analysis reveals classic tropical characteristics with warm surface waters (28°C) and a sharp thermocline around 50-100m depth. Below 200m, temperature stabilizes around 4-6°C, typical of deep ocean waters.",
              floatIds: ["13857", "15855"],
              plotType: "profile",
              variable: "temperature"
            };
          }
          // Regional salinity comparison
          else if (content.includes('salinity') && (content.includes('compare') || content.includes('between'))) {
            mockResponse = {
              query: "regional salinity comparison", 
              response: "Regional salinity comparison reveals distinct patterns: Arabian Sea shows higher surface salinity (35.2 PSU) due to high evaporation rates, Bay of Bengal has lower surface values (33.8 PSU) from freshwater river discharge, while the open Indian Ocean maintains intermediate levels (34.6 PSU).",
              floatIds: ["15855", "16789"],
              plotType: "comparison",
              variable: "salinity"
            };
          }
          // Standard salinity analysis
          else if (content.includes('salinity')) {
            mockResponse = {
              query: "salinity profile analysis", 
              response: "Salinity profile shows characteristic stratification with surface mixed layer values around 35.0 PSU. Subsurface maximum at ~150m depth indicates Arabian Sea Water mass influence, followed by gradual decrease with depth.",
              floatIds: ["15855"],
              plotType: "profile",
              variable: "salinity"
            };
          }
          // Oxygen minimum zone analysis
          else if (content.includes('oxygen') && (content.includes('minimum') || content.includes('omz'))) {
            mockResponse = {
              query: "oxygen minimum zone analysis",
              response: "The oxygen minimum zone (OMZ) is clearly visible between 100-400m depth with values dropping below 20 μmol/kg. This pronounced feature indicates strong biological oxygen consumption and limited ventilation in intermediate waters, characteristic of the northern Indian Ocean.",
              floatIds: ["13857", "15855"],
              plotType: "area",
              variable: "oxygen"
            };
          }
          // General oxygen analysis
          else if (content.includes('oxygen')) {
            mockResponse = {
              query: "oxygen profile analysis",
              response: "Oxygen measurements show high surface saturation (~240 μmol/kg) from air-sea exchange, followed by rapid decrease through biological consumption. The oxygen minimum zone is clearly defined between 200-400m depth.",
              floatIds: ["13857", "16789"],
              plotType: "comparison", 
              variable: "oxygen"
            };
          }
          // Data quality assessment
          else if (content.includes('quality') || content.includes('flags') || content.includes('qc')) {
            mockResponse = {
              query: "data quality assessment",
              response: "Data quality analysis shows excellent reliability across the dataset. 72.5% of measurements are flagged as 'Good' (flag 1), with 21% marked as 'Probably Good' (flag 2). Only 6.5% of data requires careful review or rejection, indicating robust quality control procedures and high overall data integrity.",
              floatIds: ["13857", "15855", "16789"],
              plotType: "pie",
              variable: "quality"
            };
          }
          // General comparison analysis
          else if (content.includes('compare') || content.includes('comparison')) {
            mockResponse = {
              query: "multi-parameter comparison",
              response: "Multi-parameter comparison reveals distinct regional oceanographic signatures. Atlantic floats show cooler, more saline characteristics compared to Indian Ocean floats, reflecting different water mass origins and circulation patterns.",
              floatIds: ["13857", "15855"],
              plotType: "comparison",
              variable: "temperature"
            };
          }
          // Default fallback
          else {
            mockResponse = mockChatResponses[0];
          }
        }

        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: mockResponse.response,
          timestamp: new Date(),
          floatIds: mockResponse.floatIds,
          plotType: mockResponse.plotType,
          variable: mockResponse.variable
        };

        setChatMessages(prev => [...prev, assistantMessage]);

        // Update provenance
        setLastQuery({
          sql: `SELECT * FROM argo_profiles WHERE platform_number IN (${mockResponse.floatIds.join(', ')})`,
          erddapUrl: `https://data-argo.ifremer.fr/erddap/tabledap/ArgoFloats.json?platform_number,longitude,latitude,temp,psal&platform_number=~"(${mockResponse.floatIds.join('|')})"`,
          timestamp: new Date(),
          parameters: { floatIds: mockResponse.floatIds, variable: mockResponse.variable }
        });
      }, 1000);
    }
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      t,
      floats: mockFloats,
      selectedFloats,
      setSelectedFloats,
      chatMessages,
      addChatMessage,
      isLoading,
      setIsLoading,
      lastQuery,
      setLastQuery
    }}>
      {children}
    </AppContext.Provider>
  );
};