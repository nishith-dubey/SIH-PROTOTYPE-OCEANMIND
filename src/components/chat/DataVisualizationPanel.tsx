import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Download, 
  Eye, 
  TrendingUp, 
  Activity, 
  Globe,
  Thermometer,
  Droplets,
  Wind,
  Layers
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface DataVisualizationPanelProps {
  floats: any[];
  selectedFloats: string[];
}

export const DataVisualizationPanel: React.FC<DataVisualizationPanelProps> = ({ 
  floats, 
  selectedFloats 
}) => {
  // Generate overview statistics
  const generateOverviewData = () => {
    const institutions = floats.reduce((acc, float) => {
      acc[float.institution] = (acc[float.institution] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(institutions).map(([institution, count]) => ({
      institution,
      count
    }));
  };

  const generateTemperatureDistribution = () => {
    const temperatures: number[] = [];
    floats.forEach(float => {
      if (float.profiles && float.profiles.length > 0) {
        const latestProfile = float.profiles[float.profiles.length - 1];
        if (latestProfile.temperature) {
          temperatures.push(...latestProfile.temperature.filter((t: number) => t > 0));
        }
      }
    });

    // Create histogram bins
    const bins = Array.from({ length: 10 }, (_, i) => {
      const min = Math.min(...temperatures);
      const max = Math.max(...temperatures);
      const binSize = (max - min) / 10;
      const binStart = min + i * binSize;
      const binEnd = binStart + binSize;
      const count = temperatures.filter(t => t >= binStart && t < binEnd).length;
      
      return {
        range: `${binStart.toFixed(1)}-${binEnd.toFixed(1)}°C`,
        count,
        midpoint: (binStart + binEnd) / 2
      };
    });

    return bins;
  };

  const overviewData = generateOverviewData();
  const temperatureData = generateTemperatureDistribution();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 p-3 rounded-lg shadow-xl">
          <p className="text-cyan-300 font-semibold mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Network Overview */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-400" />
              Network Overview
            </div>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              {floats.length} floats
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overviewData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="institution" 
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="rgba(255,255,255,0.7)" fontSize={11} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Temperature Distribution */}
      <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-xl border-red-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Thermometer className="h-5 w-5 mr-2 text-red-400" />
              Temperature Distribution
            </div>
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
              Global Data
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="range" 
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="rgba(255,255,255,0.7)" fontSize={11} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border-green-500/20">
          <CardContent className="p-4 text-center">
            <Activity className="h-8 w-8 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-white">
              {floats.reduce((sum, f) => sum + (f.profiles?.length || 0), 0).toLocaleString()}
            </div>
            <div className="text-green-200 text-sm">Total Profiles</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-purple-500/20">
          <CardContent className="p-4 text-center">
            <Layers className="h-8 w-8 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-white">
              {new Set(floats.map(f => f.institution)).size}
            </div>
            <div className="text-purple-200 text-sm">Institutions</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};