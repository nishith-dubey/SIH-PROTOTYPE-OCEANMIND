import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { HeroButton } from '@/components/ui/hero-button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { QuickQuestionCard } from '@/components/chat/QuickQuestionCard';
import { DataVisualizationPanel } from '@/components/chat/DataVisualizationPanel';
import { 
  Send, Download, FileText, Database, Bot, User, Sparkles, MessageCircle,
  Brain, Waves, Zap, Globe, Search, Copy, Share
} from 'lucide-react';

// Ocean Background Component
const OceanBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(6, 182, 212, 0.05)" />
          <stop offset="100%" stopColor="rgba(8, 145, 178, 0.02)" />
        </linearGradient>
      </defs>
      <path d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z" fill="rgba(6, 182, 212, 0.03)">
        <animateTransform attributeName="transform" type="translate" values="0,0;50,0;0,0" dur="10s" repeatCount="indefinite"/>
      </path>
    </svg>
  </div>
);

const Chat = () => {
  const { chatMessages, addChatMessage, t, isLoading, floats, selectedFloats } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    addChatMessage({ type: 'user', content: inputMessage });
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const exportOptions = [
    { label: t('csv'), icon: FileText, format: 'csv', color: 'bg-green-600' },
    { label: t('netcdf'), icon: Database, format: 'nc', color: 'bg-blue-600' },
    { label: t('notebook'), icon: FileText, format: 'ipynb', color: 'bg-purple-600' }
  ];

  const handleExport = (format: string) => {
    const blob = new Blob(['# Mock export data'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `float_data.${format}`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      <OceanBackground />
      
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-20">
        {/* Header */}
        <div className="border-b border-cyan-500/20 bg-white/5 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
                  <div className="relative p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-cyan-400/30 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-8 w-8 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    AI Ocean Assistant
                  </h1>
                  <p className="text-cyan-200/80">
                    Intelligent oceanographic data exploration
                  </p>
                </div>
              </div>

              <Badge className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                AI Powered
              </Badge>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 h-[calc(100vh-200px)]">
            
            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              {/* Quick Questions */}
              <QuickQuestionCard onQuestionSelect={setInputMessage} />

              {/* Data Visualization Panel */}
              <DataVisualizationPanel 
                floats={floats} 
                selectedFloats={selectedFloats}
              />

              {/* Export Options */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Download className="h-5 w-5 mr-2 text-cyan-400" />
                    Export Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {exportOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <Button
                        key={option.format}
                        onClick={() => handleExport(option.format)}
                        className={`w-full ${option.color} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {option.label}
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>

            </div>

            {/* Main Chat Area */}
            <div className="xl:col-span-3 flex flex-col">
              <Card className="flex-1 bg-white/5 backdrop-blur-xl border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageCircle className="h-6 w-6 mr-2 text-cyan-400" />
                      Ocean Intelligence Chat
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-white">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-white">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[500px] p-6">
                    <div className="space-y-4">
                      {/* Welcome Message - only show if no messages */}
                      {chatMessages.length === 1 && chatMessages[0].type === 'assistant' && (
                        <div className="text-center py-12">
                          <div className="relative mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                            <div className="relative w-16 h-16 mx-auto bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                              <Waves className="h-8 w-8 text-white animate-bounce" />
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3">
                            Welcome to Ocean Intelligence
                          </h3>
                          <p className="text-cyan-200 max-w-md mx-auto leading-relaxed">
                            Ask me anything about oceanographic data! I'm here to help you explore, analyze, and understand Argo float measurements.
                          </p>
                        </div>
                      )}

                      {/* Chat Messages */}
                      {chatMessages.slice(1).map((message, index) => (
                        <ChatMessage 
                          key={message.id || index} 
                          message={message} 
                          floats={floats}
                        />
                      ))}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                            <Bot className="h-5 w-5 text-white" />
                          </div>
                          <div className="bg-white/10 border border-white/20 p-4 rounded-2xl">
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  <Separator className="border-white/10" />

                  {/* Input Area */}
                  <div className="p-6">
                    <div className="flex items-end space-x-4">
                      <div className="flex-1">
                        <Input
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask me about oceanographic data..."
                          className="bg-white/10 border-white/20 text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 backdrop-blur-sm"
                          disabled={isLoading}
                        />
                      </div>
                      <HeroButton
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 px-6 py-2 hover:scale-105 transition-all duration-300"
                      >
                        <Send className="h-5 w-5" />
                      </HeroButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
