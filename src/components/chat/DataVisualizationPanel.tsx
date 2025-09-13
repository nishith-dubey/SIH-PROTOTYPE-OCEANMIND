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
    <div className="space-y-4">
      {/* Quick Stats */}
      <Card className="bg-slate-700 border-slate-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-white flex items-center text-sm">
            <BarChart3 className="h-4 w-4 mr-2 text-blue-400" />
            Data Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-slate-600 rounded">
              <Activity className="h-5 w-5 mx-auto mb-1 text-green-400" />
              <div className="text-lg font-bold text-white">
                {floats.reduce((sum, f) => sum + (f.profiles?.length || 0), 0)}
              </div>
              <div className="text-green-200 text-xs">Profiles</div>
            </div>
            
            <div className="text-center p-3 bg-slate-600 rounded">
              <Layers className="h-5 w-5 mx-auto mb-1 text-purple-400" />
              <div className="text-lg font-bold text-white">
                {new Set(floats.map(f => f.institution)).size}
              </div>
              <div className="text-purple-200 text-xs">Institutions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mini Chart */}
      <Card className="bg-slate-700 border-slate-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-white flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-blue-400" />
              Network
            </div>
            <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30 text-xs">
              {floats.length} floats
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overviewData}>
                <XAxis 
                  dataKey="institution" 
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={8}
                  angle={-45}
                  textAnchor="end"
                  height={40}
                />
                <YAxis stroke="rgba(255,255,255,0.7)" fontSize={8} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  fill="#3b82f6"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};