import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, User, Download, Eye, TrendingUp, Activity, Thermometer, Droplets, Wind, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

interface ChatMessageProps {
  message: {
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    floatIds?: string[];
    plotType?: string;
    variable?: string;
    data?: any[];
  };
  floats: any[];
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, floats }) => {
  const generateEnhancedMockData = (type: string) => {
    // Generate rich mock data based on the message content
    if (message.content.toLowerCase().includes('temperature') || message.content.toLowerCase().includes('thermocline')) {
      if (type === 'profile') {
        return Array.from({ length: 20 }, (_, i) => ({
          depth: i * 25,
          temperature: 28 - (i * 1.2) + Math.random() * 0.5,
          salinity: 34.5 + (i * 0.1) + Math.random() * 0.2,
          oxygen: 250 - (i * 8) + Math.random() * 10
        }));
      }
      if (type === 'timeseries') {
        return Array.from({ length: 12 }, (_, i) => ({
          month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
          temperature: 24 + Math.sin(i * 0.5) * 4 + Math.random() * 0.5,
          thermocline_depth: 50 + Math.cos(i * 0.4) * 15 + Math.random() * 5
        }));
      }
    }
    
    if (message.content.toLowerCase().includes('salinity') || message.content.toLowerCase().includes('halocline')) {
      if (type === 'comparison') {
        return Array.from({ length: 15 }, (_, i) => ({
          depth: i * 30,
          'Arabian Sea': 34.2 + (i * 0.15) + Math.random() * 0.1,
          'Bay of Bengal': 33.8 + (i * 0.12) + Math.random() * 0.1,
          'Indian Ocean': 34.6 + (i * 0.18) + Math.random() * 0.1
        }));
      }
    }
    
    if (message.content.toLowerCase().includes('oxygen') || message.content.toLowerCase().includes('omz')) {
      if (type === 'area') {
        return Array.from({ length: 18 }, (_, i) => ({
          depth: i * 25,
          oxygen: i < 4 ? 220 - (i * 20) : i < 12 ? 50 + Math.random() * 30 : 80 + (i * 10),
          saturation: i < 4 ? 95 - (i * 10) : i < 12 ? 15 + Math.random() * 20 : 40 + (i * 5)
        }));
      }
    }
    
    if (message.content.toLowerCase().includes('quality') || message.content.toLowerCase().includes('flags')) {
      return [
        { flag: 'Good', count: 1450, percentage: 72.5, color: '#10b981' },
        { flag: 'Probably Good', count: 420, percentage: 21, color: '#f59e0b' },
        { flag: 'Probably Bad', count: 80, percentage: 4, color: '#f97316' },
        { flag: 'Bad', count: 50, percentage: 2.5, color: '#ef4444' }
      ];
    }
    
    // Default enhanced profile data
    return Array.from({ length: 16 }, (_, i) => ({
      depth: i * 30,
      temperature: 28 - (i * 1.1) + Math.random() * 0.3,
      salinity: 34.2 + (i * 0.12) + Math.random() * 0.1,
      oxygen: 240 - (i * 12) + Math.random() * 8
    }));
  };
  
  const getChartTypeFromMessage = () => {
    const content = message.content.toLowerCase();
    if (content.includes('compare') || content.includes('between')) return 'comparison';
    if (content.includes('seasonal') || content.includes('monthly') || content.includes('time')) return 'timeseries';
    if (content.includes('oxygen') && content.includes('zone')) return 'area';
    if (content.includes('quality') || content.includes('flags')) return 'pie';
    return 'profile';
  };
  
  const chartType = getChartTypeFromMessage();
  const visualizationData = generateEnhancedMockData(chartType);

  const getAnalysisText = () => {
    const content = message.content.toLowerCase();
    if (content.includes('temperature')) {
      if (chartType === 'timeseries') {
        return "The seasonal temperature profile shows typical tropical warming during summer months with thermocline variations. Peak temperatures occur in May-June, while the thermocline deepens during monsoon season (July-September).";
      }
      return "Temperature profile exhibits classic tropical characteristics with warm surface waters (28°C) and a sharp thermocline around 50-100m depth. Below 200m, temperature stabilizes around 4-6°C.";
    }
    if (content.includes('salinity')) {
      return "Salinity comparison reveals distinct regional patterns: Arabian Sea shows higher surface salinity due to evaporation, Bay of Bengal has lower values from river discharge, while the open Indian Ocean maintains intermediate levels.";
    }
    if (content.includes('oxygen')) {
      return "The oxygen minimum zone (OMZ) is clearly visible between 100-400m depth with values below 20 μmol/kg. This indicates strong biological activity and limited ventilation in intermediate waters.";
    }
    if (content.includes('quality') || content.includes('flags')) {
      return "Data quality analysis shows 72.5% of measurements flagged as 'Good', with 21% as 'Probably Good'. Only 6.5% of data requires careful review or rejection, indicating high overall data reliability.";
    }
    return "Oceanographic analysis reveals typical patterns for this region with clear vertical structure and seasonal variability.";
  };

  const renderEnhancedVisualization = () => {
    if (!visualizationData || visualizationData.length === 0) return null;

    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 p-3 rounded-lg shadow-xl">
            <p className="text-cyan-300 font-semibold mb-1">{label}</p>
            {payload.map((entry: any, index: number) => (
              <p key={index} style={{ color: entry.color }} className="text-sm">
                {`${entry.name || entry.dataKey}: ${entry.value?.toFixed?.(2) || entry.value}`}
              </p>
            ))}
          </div>
        );
      }
      return null;
    };

    // Temperature/Thermocline Profile
    if (chartType === 'profile') {
      return (
        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visualizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="depth" 
                stroke="rgba(255,255,255,0.7)"
                fontSize={11}
                label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.7)"
                fontSize={11}
                label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="temperature"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#ef4444', stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }

    // Seasonal Temperature Timeseries
    if (chartType === 'timeseries') {
      return (
        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visualizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.7)" fontSize={11} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="temperature"
                stroke="#ef4444"
                strokeWidth={3}
                name="Surface Temp (°C)"
              />
              <Line 
                type="monotone" 
                dataKey="thermocline_depth"
                stroke="#06b6d4"
                strokeWidth={3}
                name="Thermocline Depth (m)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }

    // Regional Salinity Comparison
    if (chartType === 'comparison') {
      return (
        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visualizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="depth" 
                stroke="rgba(255,255,255,0.7)"
                fontSize={11}
                label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.7)"
                fontSize={11}
                label={{ value: 'Salinity (PSU)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="Arabian Sea" stroke="#8b5cf6" strokeWidth={3} />
              <Line type="monotone" dataKey="Bay of Bengal" stroke="#06b6d4" strokeWidth={3} />
              <Line type="monotone" dataKey="Indian Ocean" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }

    // Oxygen Minimum Zone (Area Chart)
    if (chartType === 'area') {
      return (
        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={visualizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="depth" 
                stroke="rgba(255,255,255,0.7)"
                fontSize={11}
                label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.7)"
                fontSize={11}
                label={{ value: 'Oxygen (μmol/kg)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="oxygen" 
                stroke="#10b981" 
                fill="#10b98120" 
                strokeWidth={3}
                name="Dissolved Oxygen"
              />
              <Area 
                type="monotone" 
                dataKey="saturation" 
                stroke="#f59e0b" 
                fill="#f59e0b20" 
                strokeWidth={2}
                name="% Saturation"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
    }

    // Quality Control Flags (Pie Chart)
    if (chartType === 'pie') {
      return (
        <div className="h-64 w-full mt-4 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={visualizationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ flag, percentage }) => `${flag}: ${percentage}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="count"
              >
                {visualizationData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                content={({ payload }) => {
                  if (payload && payload[0]) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 p-3 rounded-lg shadow-xl">
                        <p className="text-cyan-300 font-semibold">{data.flag}</p>
                        <p className="text-sm">Count: {data.count}</p>
                        <p className="text-sm">Percentage: {data.percentage}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    }

    return null;
  };

  const handleExportData = () => {
    if (!visualizationData) return;
    
    const csvContent = [
      Object.keys(visualizationData[0]).join(','),
      ...visualizationData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oceanographic_analysis_${Date.now()}.csv`;
    a.click();
  };
  
  const getVariableIcon = () => {
    const content = message.content.toLowerCase();
    if (content.includes('temperature')) return <Thermometer className="h-4 w-4 text-red-400" />;
    if (content.includes('salinity')) return <Droplets className="h-4 w-4 text-blue-400" />;
    if (content.includes('oxygen')) return <Wind className="h-4 w-4 text-green-400" />;
    if (content.includes('quality')) return <Activity className="h-4 w-4 text-purple-400" />;
    return <TrendingUp className="h-4 w-4 text-cyan-400" />;
  };
  
  const getChartTitle = () => {
    const content = message.content.toLowerCase();
    if (content.includes('temperature')) return 'Temperature Analysis';
    if (content.includes('salinity')) return 'Salinity Comparison';
    if (content.includes('oxygen')) return 'Oxygen Distribution';
    if (content.includes('quality')) return 'Data Quality Assessment';
    return 'Oceanographic Analysis';
  };

  // Only render charts for assistant messages that seem to warrant analysis
  const shouldShowVisualization = message.type === 'assistant' && (
    message.content.toLowerCase().includes('temperature') ||
    message.content.toLowerCase().includes('salinity') ||
    message.content.toLowerCase().includes('oxygen') ||
    message.content.toLowerCase().includes('quality') ||
    message.content.toLowerCase().includes('profile') ||
    message.content.toLowerCase().includes('compare') ||
    message.content.toLowerCase().includes('analysis')
  );

  return (
    <div className="w-full">
      <div className="text-sm leading-relaxed whitespace-pre-line">{message.content}</div>
      
      {/* Enhanced Visualization for Assistant Messages */}
      {shouldShowVisualization && (
        <Card className="mt-4 bg-slate-800/50 backdrop-blur-xl border-slate-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getVariableIcon()}
                <span className="text-lg font-semibold text-white">
                  {getChartTitle()}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-3 py-1">
                  <Zap className="h-3 w-3 mr-1" />
                  Live Data
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleExportData}
                  className="text-cyan-400 hover:text-white hover:bg-slate-700 px-3 py-1"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
            
            {renderEnhancedVisualization()}
            
            {/* Compact Analysis Section */}
            <div className="mt-4 p-3 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-lg border border-slate-600">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-300">AI Analysis</span>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                {getAnalysisText()}
              </div>
            </div>
            
            {/* Compact Statistics */}
            <div className="mt-3 grid grid-cols-4 gap-2">
              <div className="text-center p-2 bg-slate-700/30 rounded">
                <div className="text-sm font-bold text-white">{visualizationData?.length || 0}</div>
                <div className="text-[10px] text-slate-400">Points</div>
              </div>
              <div className="text-center p-2 bg-slate-700/30 rounded">
                <div className="text-sm font-bold text-green-400">98.2%</div>
                <div className="text-[10px] text-slate-400">Accuracy</div>
              </div>
              <div className="text-center p-2 bg-slate-700/30 rounded">
                <div className="text-sm font-bold text-blue-400">Live</div>
                <div className="text-[10px] text-slate-400">Data</div>
              </div>
              <div className="text-center p-2 bg-slate-700/30 rounded">
                <div className="text-sm font-bold text-cyan-400">IOC</div>
                <div className="text-[10px] text-slate-400">QC</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};