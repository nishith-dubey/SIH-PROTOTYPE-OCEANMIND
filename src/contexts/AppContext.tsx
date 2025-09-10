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
          if (message.content.toLowerCase().includes('temperature')) {
            mockResponse = {
              query: "temperature analysis",
              response: "Here's the temperature analysis for the selected region. The data shows typical thermocline structure with surface temperatures around 28°C decreasing to 7°C at 500m depth.",
              floatIds: ["13857", "15855"],
              plotType: "profile",
              variable: "temperature"
            };
          } else if (message.content.toLowerCase().includes('salinity')) {
            mockResponse = {
              query: "salinity analysis", 
              response: "Salinity profiles show characteristic patterns with surface values around 35.0 PSU. The data indicates typical ocean stratification with slight variations due to regional water masses.",
              floatIds: ["15855"],
              plotType: "profile",
              variable: "salinity"
            };
          } else if (message.content.toLowerCase().includes('oxygen')) {
            mockResponse = {
              query: "oxygen analysis",
              response: "Oxygen measurements reveal the oxygen minimum zone between 200-400m depth. Surface waters show high oxygen saturation from air-sea exchange.",
              floatIds: ["13857", "16789"],
              plotType: "comparison", 
              variable: "oxygen"
            };
          } else if (message.content.toLowerCase().includes('compare')) {
            mockResponse = {
              query: "comparison analysis",
              response: "Comparison between floats shows regional differences in water mass characteristics. Float 13857 (Atlantic) shows different patterns compared to Float 15855 (Arabian Sea).",
              floatIds: ["13857", "15855"],
              plotType: "comparison",
              variable: "temperature"
            };
          } else {
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