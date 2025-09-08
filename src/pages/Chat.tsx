import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { HeroButton } from '@/components/ui/hero-button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Download, FileText, Database, Bot, User } from 'lucide-react';

const Chat = () => {
  const { chatMessages, addChatMessage, t, isLoading } = useApp();
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    addChatMessage({
      type: 'user',
      content: inputMessage
    });

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const exportOptions = [
    { label: t('csv'), icon: FileText, format: 'csv' },
    { label: t('netcdf'), icon: Database, format: 'nc' },
    { label: t('notebook'), icon: FileText, format: 'ipynb' }
  ];

  const handleExport = (format: string) => {
    // Mock export functionality
    const blob = new Blob(['# Mock export data'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `float_data.${format}`;
    a.click();
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        
        {/* Chat Sidebar */}
        <div className="lg:col-span-1">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <Bot className="h-5 w-5 mr-2 text-primary" />
                {t('chat')}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-4">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-2 ${
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.type === 'assistant' && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground ml-auto'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      {message.type === 'user' && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-secondary" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center space-x-2">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary animate-spin" />
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-sm">Thinking...</p>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask about float data..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={isLoading || !inputMessage.trim()}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Analysis Results</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{t('export')}:</span>
                  {exportOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <Button
                        key={option.format}
                        variant="outline"
                        size="sm"
                        onClick={() => handleExport(option.format)}
                      >
                        <Icon className="h-4 w-4 mr-1" />
                        {option.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-full p-6">
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full gradient-ocean flex items-center justify-center animate-float-drift">
                    <Bot className="h-12 w-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Ask me about oceanographic data
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      Try asking: "Show me salinity profiles near 10N 70E" or "Compare temperature between regions"
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {[
                      "Show temperature profiles",
                      "Find floats near 15N 65E", 
                      "Compare oxygen levels",
                      "What are QC flags?"
                    ].map((suggestion) => (
                      <HeroButton
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setInputMessage(suggestion);
                          addChatMessage({ type: 'user', content: suggestion });
                        }}
                      >
                        {suggestion}
                      </HeroButton>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;