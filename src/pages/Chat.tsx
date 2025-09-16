import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Send, 
  Bot, 
  User, 
  Waves, 
  BarChart3, 
  Globe, 
  Thermometer, 
  Droplets, 
  Activity, 
  TrendingUp, 
  Eye, 
  Clock, 
  MapPin, 
  Database,
  Zap,
  RefreshCw,
  Sparkles,
  Brain
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Professional suggested questions for ocean data analysis
const suggestedQuestions = [
  {
    category: 'Temperature Analysis',
    icon: Thermometer,
    questions: [
      "Show me thermal stratification profiles for the Arabian Sea region",
      "Compare surface temperatures between monsoon and post-monsoon seasons",
    ]
  },
  {
    category: 'Salinity & Density',
    icon: Droplets,
    questions: [
      "How does salinity vary with depth in the Bay of Bengal?",
      "Compare salinity levels between different ocean basins",
    ]
  },
  {
    category: 'Oxygen & Biogeochemistry',
    icon: Activity,
    questions: [
      "Analyze the oxygen minimum zone distribution",
      "How do seasonal variations affect dissolved oxygen?",
    ]
  },
  {
    category: 'Data Quality & Trends',
    icon: BarChart3,
    questions: [
      "What's the data coverage for ARGO floats in 2024?",
      "Analyze long-term climate trends from ARGO data",
    ]
  },
];

const quickActions = [
  { label: 'Latest Data', icon: Database, query: "Show me the latest ARGO float data from the past 24 hours" },
  { label: 'Temperature Profile', icon: Thermometer, query: "Generate a temperature profile for the Indian Ocean surface" },
  { label: 'Trend Analysis', icon: TrendingUp, query: "Analyze 10-year trends in ocean temperature and salinity" },
  { label: 'Quality Report', icon: Eye, query: "Provide a data quality summary for current month" }
];

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  chartData?: any[];
  chartType?: 'temperature' | 'salinity' | 'oxygen';
}

interface BotResponse {
  content: string;
  chartData?: any[];
  chartType?: 'temperature' | 'salinity' | 'oxygen';
}

const ChatMessage = ({ message }: { message: Message }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const unit = message.chartType === 'temperature' ? '°C' : message.chartType === 'salinity' ? 'PSU' : 'μmol/kg';
      return (
        <div className="bg-zinc-950/90 backdrop-blur-sm border border-indigo-500/30 p-3 rounded-lg shadow-xl">
          <p className="text-indigo-300 font-semibold mb-1">{`Depth: ${label}m`}</p>
          <p style={{ color: payload[0].stroke }} className="text-sm">
            {`${payload[0].name}: ${payload[0].value.toFixed(2)} ${unit}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const getChartDetails = () => {
    switch (message.chartType) {
      case 'temperature':
        return { dataKey: 'temperature', name: 'Temperature', unit: '°C', color: '#818cf8' };
      case 'salinity':
        return { dataKey: 'salinity', name: 'Salinity', unit: 'PSU', color: '#60a5fa' };
      case 'oxygen':
        return { dataKey: 'oxygen', name: 'Oxygen', unit: 'μmol/kg', color: '#4ade80' };
      default:
        return { dataKey: '', name: '', unit: '', color: '#a1a1aa' };
    }
  };

  const chartDetails = getChartDetails();

  return (
    <div>
      <div className="whitespace-pre-line leading-relaxed">{message.content}</div>
      {message.chartData && message.chartType && (
        <Card className="mt-4 bg-zinc-950/50 border-zinc-800">
          <CardContent className="p-4">
            <h4 className="text-sm font-semibold text-indigo-300 mb-2">{chartDetails.name} Profile</h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={message.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis 
                    dataKey="depth" 
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    stroke="#a1a1aa" 
                    fontSize={11} 
                    label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5, fill: '#a1a1aa' }} 
                  />
                  <YAxis 
                    stroke="#a1a1aa" 
                    fontSize={11} 
                    label={{ value: `${chartDetails.name} (${chartDetails.unit})`, angle: -90, position: 'insideLeft', fill: '#a1a1aa' }} 
                    domain={['dataMin - 1', 'dataMax + 1']}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey={chartDetails.dataKey} 
                    name={chartDetails.name}
                    stroke={chartDetails.color} 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};


const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Welcome to the Ocean Intelligence Platform. I am your AI oceanography assistant specializing in ARGO float data analysis, ocean parameter visualization, and marine condition insights. I can help you analyze temperature profiles, salinity distributions, oxygen levels, data quality assessments, and regional oceanographic patterns. What specific aspect of ocean data would you like to explore today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (query: string): BotResponse => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('temperature')) {
      return {
        content: `Temperature Analysis Results:
Based on the latest ARGO float data, I have analyzed temperature patterns across the Indian Ocean. Here are the key findings:

Surface Temperature: Current average is 28.5°C with regional variations.
Thermocline Depth: Ranges from 45-75m depending on location.
Seasonal Variation: ±2.3°C difference between monsoon seasons.

The generated graph visualizes a typical vertical temperature profile, showing a warm mixed layer near the surface, a sharp drop in the thermocline, and cold, stable deep water.`,
        chartType: 'temperature',
        chartData: Array.from({ length: 50 }, (_, i) => ({
          depth: i * 10,
          temperature: 28 - 24 * (1 / (1 + Math.exp(-(i - 10) * 0.5))) + (Math.random() - 0.5) * 0.5
        })),
      };
    } 
    
    if (lowerQuery.includes('salinity')) {
      return {
        content: `Salinity Distribution Analysis:
Current salinity patterns across the Indian Ocean show distinct regional characteristics:

Arabian Sea: 35.1-35.5 PSU due to high evaporation rates.
Bay of Bengal: 33.6-34.2 PSU influenced by freshwater input.
Open Indian Ocean: 34.7-35.0 PSU representing typical oceanic values.

The graph below shows a typical salinity profile, which often varies by region. For instance, the Bay of Bengal might show lower surface salinity.`,
        chartType: 'salinity',
        chartData: Array.from({ length: 50 }, (_, i) => ({
          depth: i * 10,
          salinity: 34.5 + (i * 0.01) + Math.sin(i / 5) * 0.1 + (Math.random() - 0.5) * 0.05
        })),
      };
    } 
    
    if (lowerQuery.includes('oxygen')) {
      return {
        content: `Oxygen Distribution Analysis:
The Indian Ocean oxygen minimum zone (OMZ) analysis reveals critical biogeochemical patterns:

Depth Range: 200-800m with the core oxygen minimum at approximately 400m depth.
Oxygen Levels: Less than 20 μmol/kg in the OMZ core region.
Surface Saturation: 95% oxygen saturation in surface waters.

The profile graph illustrates the OMZ, with high oxygen at the surface, a sharp decrease to a minimum, and a gradual recovery in deeper waters.`,
        chartType: 'oxygen',
        chartData: Array.from({ length: 50 }, (_, i) => ({
          depth: i * 20,
          oxygen: 20 + 180 * Math.exp(-((i-2) * 0.1)) + i * 0.1 + (Math.random() - 0.5) * 5
        }))
      };
    } 
    
    // Default response for non-chart queries
    return {
      content: `I understand you are interested in ocean data analysis. I specialize in analyzing ARGO float datasets.

I can provide detailed analysis and graphs for:
- Temperature Profiles
- Salinity Patterns
- Oxygen Distribution

Please specify which oceanographic parameter you would like to analyze, and I will provide a comprehensive scientific assessment based on the latest ARGO observations.`
    };
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = generateResponse(message);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        timestamp: new Date(),
        ...botResponse
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Ocean AI Assistant</h1>
              <p className="text-sm text-zinc-400">AI-powered marine data analysis and visualization</p>
            </div>
            <div className="ml-auto">
              <Badge className="bg-green-900/30 text-green-300 border-green-700/50">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar with Suggested Questions */}
        <div className="w-80 border-r border-zinc-800 bg-zinc-950/50 p-4 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-indigo-400" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="h-auto p-3 bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-indigo-500 flex flex-col items-center space-y-1"
                    onClick={() => handleQuickAction(action.query)}
                  >
                    <action.icon className="w-4 h-4" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-indigo-400" />
                Suggested Questions
              </h3>
              <div className="space-y-3">
                {suggestedQuestions.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-3 text-left hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700"
                      onClick={() => setSelectedCategory(
                        selectedCategory === category.category ? null : category.category
                      )}
                    >
                      <category.icon className="w-4 h-4 mr-3 text-zinc-400" />
                      <span className="text-white">{category.category}</span>
                    </Button>
                    
                    {selectedCategory === category.category && (
                      <div className="mt-2 ml-7 space-y-1">
                        {category.questions.map((question, questionIndex) => (
                          <Button
                            key={questionIndex}
                            variant="ghost"
                            size="sm"
                            className="w-full text-left text-sm p-2 text-zinc-300 hover:text-white hover:bg-zinc-800 whitespace-normal h-auto"
                            onClick={() => handleSuggestedQuestion(question)}
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start space-x-3 max-w-4xl">
                  {message.type === 'bot' && (
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`rounded-xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-zinc-900 text-white border border-zinc-800'
                    }`}
                  >
                    <ChatMessage message={message} />
                    <div className="flex items-center justify-end mt-2 pt-2 border-t border-zinc-700/50">
                      <span className="text-xs text-zinc-500">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-zinc-900 rounded-xl px-4 py-3 border border-zinc-800">
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4 text-zinc-400 animate-spin" />
                      <span className="text-zinc-400">Analyzing oceanographic data...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-zinc-800 bg-zinc-950/50 p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                  placeholder="Ask about ocean data, e.g., 'Show a temperature profile'"
                  className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 pr-12 h-12 focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={isLoading}
                />
                <Button
                  size="sm"
                  className="absolute right-2 top-2 bg-indigo-600 hover:bg-indigo-700 text-white h-8 w-8 p-0"
                  onClick={() => handleSendMessage(inputMessage)}
                  disabled={isLoading || !inputMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-zinc-500">
                AI assistant for oceanographic data analysis • Powered by ARGO network • Last updated: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;