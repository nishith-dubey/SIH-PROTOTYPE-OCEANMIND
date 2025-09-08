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
        const mockResponse = mockChatResponses.find(resp => 
          message.content.toLowerCase().includes(resp.query.toLowerCase().split(' ')[0])
        ) || mockChatResponses[0];

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