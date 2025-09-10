import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, User, Download, Eye, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from 'recharts';

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
  const generateVisualizationData = () => {
    if (!message.floatIds || !message.variable) return null;

    const selectedFloats = floats.filter(f => message.floatIds!.includes(f.wmo_id));
    
    if (message.plotType === 'profile' && selectedFloats.length > 0) {
      const float = selectedFloats[0];
      if (float.profiles && float.profiles.length > 0) {
        const latestProfile = float.profiles[float.profiles.length - 1];
        return latestProfile.depths?.map((depth: number, index: number) => ({
          depth,
          [message.variable!]: latestProfile[message.variable!]?.[index] || 0
        })) || [];
      }
    }

    if (message.plotType === 'comparison' && selectedFloats.length >= 2) {
      const depths = [0, 25, 50, 75, 100, 150, 200, 300, 400, 500];
      return depths.map(depth => {
        const dataPoint: any = { depth };
        selectedFloats.forEach(float => {
          if (float.profiles && float.profiles.length > 0) {
            const profile = float.profiles[float.profiles.length - 1];
            const depthIndex = profile.depths?.indexOf(depth);
            if (depthIndex !== -1 && profile[message.variable!]) {
              dataPoint[float.wmo_id] = profile[message.variable!][depthIndex];
            }
          }
        });
        return dataPoint;
      });
    }

    if (message.plotType === 'depth_slice') {
      return selectedFloats.map(float => {
        if (float.profiles && float.profiles.length > 0) {
          const profile = float.profiles[float.profiles.length - 1];
          const depthIndex = profile.depths?.indexOf(100); // 100m depth
          return {
            float_id: float.wmo_id,
            institution: float.institution,
            value: depthIndex !== -1 ? profile[message.variable!]?.[depthIndex] || 0 : 0,
            latitude: float.last_location?.latitude || 0,
            longitude: float.last_location?.longitude || 0
          };
        }
        return null;
      }).filter(Boolean);
    }

    return null;
  };

  const visualizationData = generateVisualizationData();

  const getVariableUnit = () => {
    switch (message.variable) {
      case 'temperature': return '°C';
      case 'salinity': return 'PSU';
      case 'oxygen': return 'μmol/kg';
      default: return '';
    }
  };

  const getVariableColor = () => {
    switch (message.variable) {
      case 'temperature': return '#ef4444';
      case 'salinity': return '#3b82f6';
      case 'oxygen': return '#10b981';
      default: return '#6b7280';
    }
  };

  const renderVisualization = () => {
    if (!visualizationData || visualizationData.length === 0) return null;

    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 p-3 rounded-lg shadow-xl">
            <p className="text-cyan-300 font-semibold mb-1">{`${message.plotType === 'depth_slice' ? 'Float' : 'Depth'}: ${label}${message.plotType !== 'depth_slice' ? 'm' : ''}`}</p>
            {payload.map((entry: any, index: number) => (
              <p key={index} style={{ color: entry.color }} className="text-sm">
                {`${entry.dataKey}: ${entry.value?.toFixed(2)} ${getVariableUnit()}`}
              </p>
            ))}
          </div>
        );
      }
      return null;
    };

    if (message.plotType === 'profile') {
      return (
        <div className="h-80 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visualizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="depth" 
                stroke="rgba(255,255,255,0.7)"
                fontSize={11}
                label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#94a3b8' } }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.7)"
                fontSize={11}
                label={{ value: `${message.variable} (${getVariableUnit()})`, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#94a3b8' } }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey={message.variable}
                stroke={getVariableColor()}
                strokeWidth={3}
                dot={{ fill: getVariableColor(), strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: getVariableColor(), stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (message.plotType === 'comparison') {
      const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
      return (
        <div className="h-80 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visualizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="depth" 
                stroke="rgba(255,255,255,0.7)"
                fontSize={11}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.7)"
                fontSize={11}
              />
              <Tooltip content={<CustomTooltip />} />
              {message.floatIds?.map((floatId, index) => (
                <Line 
                  key={floatId}
                  type="monotone" 
                  dataKey={floatId}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ fill: colors[index % colors.length], strokeWidth: 1, r: 3 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (message.plotType === 'depth_slice') {
      return (
        <div className="h-80 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visualizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="float_id" 
                stroke="rgba(255,255,255,0.7)"
                fontSize={11}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.7)"
                fontSize={11}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill={getVariableColor()}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
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
    a.download = `${message.variable}_data_${message.id}.csv`;
    a.click();
  };

  return (
    <div className={`flex items-start space-x-3 ${
      message.type === 'user' ? 'justify-end' : 'justify-start'
    }`}>
      {message.type === 'assistant' && (
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="h-5 w-5 text-white" />
        </div>
      )}
      
      <div className={`max-w-2xl transition-all duration-300 hover:scale-[1.02] ${
        message.type === 'user' ? 'ml-auto' : ''
      }`}>
        <div className={`p-4 rounded-2xl backdrop-blur-sm ${
          message.type === 'user'
            ? 'bg-gradient-to-br from-cyan-600 to-blue-700 text-white'
            : 'bg-white/10 border border-white/20 text-slate-100'
        }`}>
          <p className="leading-relaxed">{message.content}</p>
          
          {/* Render visualization for assistant messages */}
          {message.type === 'assistant' && visualizationData && (
            <Card className="mt-4 bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-medium text-white">
                      {message.variable?.charAt(0).toUpperCase() + message.variable?.slice(1)} Analysis
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs">
                      {visualizationData.length} points
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleExportData}
                      className="text-cyan-400 hover:text-white h-6 w-6 p-0"
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                {renderVisualization()}
                
                {/* Data insights */}
                <div className="mt-3 p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-medium text-cyan-300">Key Insights</span>
                  </div>
                  <div className="text-xs text-cyan-200">
                    {message.plotType === 'profile' && (
                      <p>Profile shows typical {message.variable} distribution with depth for float {message.floatIds?.[0]}</p>
                    )}
                    {message.plotType === 'comparison' && (
                      <p>Comparing {message.variable} between {message.floatIds?.length} floats reveals regional differences</p>
                    )}
                    {message.plotType === 'depth_slice' && (
                      <p>Horizontal distribution of {message.variable} at 100m depth across selected floats</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {message.type === 'user' && (
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  );
};