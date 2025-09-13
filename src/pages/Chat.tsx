import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Zap, TrendingUp, BarChart3, Activity, Download, Eye } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter
} from 'recharts';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  hasVisualization?: boolean;
}

// Government color palette from your website
const GOVT_COLORS = {
  primary: 'hsl(220, 100%, 25%)',      // Navy Blue
  accent: 'hsl(30, 100%, 60%)',        // Saffron
  secondary: 'hsl(210, 11%, 85%)',     // Gray
  success: 'hsl(142, 71%, 45%)',       // Green
  warning: 'hsl(38, 92%, 50%)',        // Yellow
  danger: 'hsl(0, 84%, 60%)',          // Red
  info: 'hsl(200, 100%, 50%)',         // Blue
  muted: 'hsl(210, 20%, 95%)',         // Light gray
};

const CHART_COLORS = {
  temperature: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
  salinity: ['#74b9ff', '#0984e3', '#00b894', '#00cec9', '#6c5ce7'],
  oxygen: ['#55a3ff', '#26de81', '#feca57', '#ff9ff3', '#54a0ff'],
  quality: ['#10ac84', '#f39c12', '#e17055', '#d63031', '#6c5ce7']
};

// Enhanced data generation functions
const generateTemperatureData = () => {
  const profile = Array.from({ length: 20 }, (_, i) => ({
    depth: i * 25,
    temperature: 28.5 - (i * 1.2) + Math.random() * 0.5,
    salinity: 34.2 + (i * 0.08) + Math.random() * 0.1,
  }));
  
  const seasonal = [
    { month: 'Jan', surface: 26.8, thermocline: 18.2, deep: 4.1 },
    { month: 'Feb', surface: 27.2, thermocline: 18.8, deep: 4.2 },
    { month: 'Mar', surface: 28.5, thermocline: 19.5, deep: 4.3 },
    { month: 'Apr', surface: 29.8, thermocline: 20.2, deep: 4.4 },
    { month: 'May', surface: 30.2, thermocline: 21.1, deep: 4.5 },
    { month: 'Jun', surface: 29.5, thermocline: 20.8, deep: 4.4 },
    { month: 'Jul', surface: 28.8, thermocline: 20.1, deep: 4.3 },
    { month: 'Aug', surface: 28.2, thermocline: 19.5, deep: 4.2 },
    { month: 'Sep', surface: 28.9, thermocline: 19.8, deep: 4.3 },
    { month: 'Oct', surface: 29.2, thermocline: 20.2, deep: 4.4 },
    { month: 'Nov', surface: 28.1, thermocline: 19.1, deep: 4.1 },
    { month: 'Dec', surface: 27.5, thermocline: 18.5, deep: 4.0 },
  ];
  
  const distribution = [
    { range: '0-5°C', count: 120, percentage: 15.0 },
    { range: '5-10°C', count: 200, percentage: 25.0 },
    { range: '10-15°C', count: 180, percentage: 22.5 },
    { range: '15-20°C', count: 150, percentage: 18.8 },
    { range: '20-25°C', count: 100, percentage: 12.5 },
    { range: '25-30°C', count: 50, percentage: 6.2 },
  ];
  
  return { profile, seasonal, distribution };
};

// Float comparison data
const generateFloatComparisonData = () => {
  // Define some float IDs for reference
  const floatIds = ['2901629', '2901630', '2901631', '2901632', '2901633'];
  
  // Temperature-depth profiles for multiple floats
  const depthTempProfiles = [];
  
  // Generate unique profiles for each float
  for (let i = 0; i < floatIds.length; i++) {
    // Create a base profile with some variation per float
    const profile = Array.from({ length: 25 }, (_, j) => {
      const depth = j * 20;
      // Add some characteristic variation to each float
      const baseTemp = 28 - (j * 0.9) + Math.sin(i * 0.8) * 2;
      const temp = baseTemp + Math.random() * 0.8 - 0.4;
      
      return {
        depth,
        temperature: temp,
        floatId: floatIds[i],
        // Add a region label for each float
        region: ['Arabian Sea', 'Bay of Bengal', 'Equatorial Indian Ocean', 'Somali Basin', 'Mozambique Channel'][i]
      };
    });
    
    depthTempProfiles.push(...profile);
  }
  
  // Create regional averages data
  const regionalAverages = [
    { region: 'Arabian Sea', surfaceTemp: 28.7, mixedLayerDepth: 38, thermoclineTemp: 18.3, deepTemp: 5.2 },
    { region: 'Bay of Bengal', surfaceTemp: 29.2, mixedLayerDepth: 42, thermoclineTemp: 17.8, deepTemp: 4.9 },
    { region: 'Equatorial Indian Ocean', surfaceTemp: 30.1, mixedLayerDepth: 45, thermoclineTemp: 19.2, deepTemp: 5.0 },
    { region: 'Somali Basin', surfaceTemp: 27.8, mixedLayerDepth: 35, thermoclineTemp: 16.9, deepTemp: 4.8 },
    { region: 'Mozambique Channel', surfaceTemp: 28.3, mixedLayerDepth: 40, thermoclineTemp: 17.5, deepTemp: 5.1 },
  ];
  
  // Temperature anomalies by float and region
  const anomalies = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  for (let i = 0; i < floatIds.length; i++) {
    months.forEach((month, j) => {
      // Generate seasonal anomalies with regional variations
      const baseAnomaly = Math.sin(j * 0.5) * 0.8;
      const regionalFactor = Math.cos(i * 1.2) * 0.5;
      
      anomalies.push({
        month,
        floatId: floatIds[i],
        region: ['Arabian Sea', 'Bay of Bengal', 'Equatorial Indian Ocean', 'Somali Basin', 'Mozambique Channel'][i],
        anomaly: baseAnomaly + regionalFactor + (Math.random() * 0.4 - 0.2)
      });
    });
  }
  
  return { depthTempProfiles, regionalAverages, anomalies, floatIds };
};

const generateSalinityData = () => {
  const comparison = Array.from({ length: 15 }, (_, i) => ({
    depth: i * 30,
    'Arabian Sea': 35.1 + (i * 0.12) + Math.random() * 0.05,
    'Bay of Bengal': 33.6 + (i * 0.09) + Math.random() * 0.08,
    'Indian Ocean': 34.7 + (i * 0.11) + Math.random() * 0.06,
  }));
  
  const regional = [
    { region: 'Arabian Sea', avgSalinity: 35.1, minSal: 34.2, maxSal: 36.8 },
    { region: 'Bay of Bengal', avgSalinity: 33.9, minSal: 32.1, maxSal: 35.2 },
    { region: 'Indian Ocean', avgSalinity: 34.8, minSal: 34.1, maxSal: 35.9 },
    { region: 'Red Sea', avgSalinity: 36.2, minSal: 35.4, maxSal: 37.1 },
  ];
  
  const gradient = Array.from({ length: 25 }, (_, i) => ({
    latitude: -30 + i * 2.5,
    salinity: 33.5 + Math.sin(i * 0.3) * 1.8 + Math.random() * 0.3,
    conductivity: 5.2 + i * 0.04 + Math.random() * 0.02,
  }));
  
  return { comparison, regional, gradient };
};

const generateOxygenData = () => {
  const profile = Array.from({ length: 20 }, (_, i) => ({
    depth: i * 25,
    oxygen: i < 4 ? 235 - (i * 18) : i < 12 ? 25 + Math.random() * 30 : 65 + (i * 8),
    saturation: i < 4 ? 98 - (i * 8) : i < 12 ? 15 + Math.random() * 20 : 35 + (i * 4),
  }));
  
  const zones = [
    { zone: 'Surface Layer', depth: '0-50m', oxygen: 225, saturation: 95, color: CHART_COLORS.oxygen[0] },
    { zone: 'OMZ Core', depth: '100-400m', oxygen: 18, saturation: 8, color: CHART_COLORS.oxygen[1] },
    { zone: 'Deep Water', depth: '500m+', oxygen: 85, saturation: 42, color: CHART_COLORS.oxygen[2] },
  ];
  
  const temporal = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    surfaceO2: 220 + Math.sin(i * 0.52) * 15 + Math.random() * 8,
    omzIntensity: 15 + Math.cos(i * 0.48) * 5 + Math.random() * 3,
  }));
  
  return { profile, zones, temporal };
};

const generateQualityData = () => {
  const distribution = [
    { flag: 'Good', count: 1450, percentage: 72.5, color: CHART_COLORS.quality[0] },
    { flag: 'Probably Good', count: 420, percentage: 21.0, color: CHART_COLORS.quality[1] },
    { flag: 'Probably Bad', count: 80, percentage: 4.0, color: CHART_COLORS.quality[2] },
    { flag: 'Bad', count: 50, percentage: 2.5, color: CHART_COLORS.quality[3] },
  ];
  
  const byParameter = [
    { parameter: 'Temperature', good: 95.2, fair: 3.8, poor: 1.0 },
    { parameter: 'Salinity', good: 88.7, fair: 9.1, poor: 2.2 },
    { parameter: 'Oxygen', good: 76.3, fair: 18.9, poor: 4.8 },
    { parameter: 'Pressure', good: 98.1, fair: 1.7, poor: 0.2 },
  ];
  
  const timeline = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    qualityScore: 85 + Math.sin(i * 0.4) * 8 + Math.random() * 4,
    dataVolume: 180 + Math.sin(i * 0.6) * 30 + Math.random() * 20,
  }));
  
  return { distribution, byParameter, timeline };
};

// Custom hook for auto-scrolling
const useChatScroll = (dep: any[]) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
};

// Custom tooltip component with better contrast
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border p-3 rounded-lg shadow-lg">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
            {`${entry.name || entry.dataKey}: ${entry.value?.toFixed?.(2) || entry.value}`}
            {entry.dataKey === 'temperature' && '°C'}
            {entry.dataKey === 'salinity' && ' PSU'}
            {entry.dataKey === 'oxygen' && ' μmol/kg'}
            {entry.dataKey === 'percentage' && '%'}
            {entry.dataKey === 'anomaly' && '°C'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Float comparison visualization functions
const renderFloatComparisonCharts = () => {
  const data = generateFloatComparisonData();
  
  // Group profile data by float for line chart
  const groupedProfiles = data.floatIds.map(floatId => {
    const floatData = data.depthTempProfiles.filter(d => d.floatId === floatId);
    return {
      name: `Float ${floatId}`,
      data: floatData.map(d => ({ depth: d.depth, temperature: d.temperature, floatId: d.floatId })),
      region: floatData[0]?.region || ''
    };
  });
  
  return (
    <div className="space-y-6">
      {/* Multi-Float Temperature-Depth Comparison */}
      <Card className="gov-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-primary">
              <TrendingUp className="h-5 w-5" />
              Multi-Float Temperature-Depth Profiles
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                <Download className="h-3 w-3 mr-1" />
                Export CSV
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Eye className="h-3 w-3 mr-1" />
                Full Screen
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={800} height={300}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.3)" />
                <XAxis 
                  dataKey="depth" 
                  type="number" 
                  domain={[0, 500]} 
                  tick={{ fill: 'hsl(var(--foreground))' }}
                  tickFormatter={(value) => `${value}m`}
                />
                <YAxis 
                  dataKey="temperature" 
                  type="number" 
                  domain={[0, 30]} 
                  tick={{ fill: 'hsl(var(--foreground))' }}
                  tickFormatter={(value) => `${value}°C`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                {groupedProfiles.map((profile, index) => (
                  <Line
                    key={profile.name}
                    type="monotone"
                    dataKey="temperature"
                    data={profile.data}
                    stroke={CHART_COLORS.temperature[index % CHART_COLORS.temperature.length]}
                    strokeWidth={3}
                    name={`${profile.name} (${profile.region})`}
                    dot={{ r: 3, strokeWidth: 2 }}
                    connectNulls={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-foreground leading-relaxed">
              <strong>Analysis:</strong> This comparison shows distinct temperature profiles from 5 different floats across the Indian Ocean. 
              Each float exhibits unique characteristics based on its regional location: Arabian Sea floats show higher surface temperatures (28-29°C), 
              Bay of Bengal floats have warmer mixed layers due to freshwater influence, while equatorial floats demonstrate stronger thermoclines. 
              The depth-temperature relationship varies significantly by region, with some showing gradual cooling and others exhibiting sharp thermoclines at 50-100m depth.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Regional Temperature Averages */}
      <Card className="gov-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-primary">
            <BarChart3 className="h-5 w-5" />
            Regional Temperature Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.regionalAverages} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.3)" />
                <XAxis 
                  dataKey="region" 
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: 'hsl(var(--foreground))' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                <Bar dataKey="surfaceTemp" fill={CHART_COLORS.temperature[0]} name="Surface Temp (°C)" />
                <Bar dataKey="thermoclineTemp" fill={CHART_COLORS.temperature[1]} name="Thermocline Temp (°C)" />
                <Bar dataKey="deepTemp" fill={CHART_COLORS.temperature[2]} name="Deep Temp (°C)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-foreground leading-relaxed">
              <strong>Analysis:</strong> Regional comparison reveals significant temperature variations across the Indian Ocean. 
              The Equatorial Indian Ocean shows the warmest surface temperatures (30.1°C), while the Somali Basin is cooler (27.8°C) due to upwelling. 
              Mixed layer depths range from 35m (Somali Basin) to 45m (Equatorial), reflecting different mixing regimes. 
              All regions converge to similar deep water temperatures (~5°C), indicating common deep water masses.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Temperature Anomalies by Region */}
      <Card className="gov-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-primary">
            <Activity className="h-5 w-5" />
            Regional Temperature Anomalies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.anomalies.filter((_, i) => i % 5 === 0)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.3)" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(var(--foreground))' }} />
                <YAxis tick={{ fill: 'hsl(var(--foreground))' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                {Array.from(new Set(data.anomalies.map(d => d.region))).map((region, index) => {
                  const regionData = data.anomalies.filter(d => d.region === region);
                  return (
                    <Line
                      key={region}
                      type="monotone"
                      dataKey="anomaly"
                      data={regionData}
                      stroke={CHART_COLORS.temperature[index % CHART_COLORS.temperature.length]}
                      strokeWidth={2}
                      name={region}
                      dot={{ r: 3 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-foreground leading-relaxed">
              <strong>Analysis:</strong> Seasonal temperature anomalies show distinct patterns across regions. 
              Arabian Sea exhibits strong seasonal variations (+0.8°C in summer, -0.6°C in winter) driven by monsoon intensity. 
              Bay of Bengal shows muted variations due to freshwater stratification dampening heat exchange. 
              The Equatorial region maintains relatively stable anomalies, indicating consistent solar heating throughout the year.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Visualization component
const DataVisualization: React.FC<{ message: Message }> = ({ message }) => {
  if (!message.hasVisualization) return null;
  
  const content = message.content.toLowerCase();
  
  const renderTemperatureCharts = () => {
    const data = generateTemperatureData();
    
    return (
      <div className="space-y-6">
        {/* Temperature Profile */}
        <Card className="gov-card">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-primary">
              <TrendingUp className="h-5 w-5" />
              Temperature-Depth Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.profile}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.3)" />
                  <XAxis dataKey="depth" tick={{ fill: 'hsl(var(--foreground))' }} />
                  <YAxis tick={{ fill: 'hsl(var(--foreground))' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke={CHART_COLORS.temperature[0]} 
                    strokeWidth={3}
                    dot={{ fill: CHART_COLORS.temperature[0], strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>Analysis:</strong> This profile shows the classic three-layer ocean structure with a warm mixed layer (0-50m), 
                sharp thermocline (50-200m), and cold deep water below 200m. The thermocline acts as a barrier to vertical mixing.
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Seasonal Variation */}
        <Card className="gov-card">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-primary">
              <BarChart3 className="h-5 w-5" />
              Seasonal Temperature Variation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.seasonal}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.3)" />
                  <XAxis dataKey="month" tick={{ fill: 'hsl(var(--foreground))' }} />
                  <YAxis tick={{ fill: 'hsl(var(--foreground))' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                  <Line type="monotone" dataKey="surface" stroke={CHART_COLORS.temperature[0]} strokeWidth={2} name="Surface" />
                  <Line type="monotone" dataKey="thermocline" stroke={CHART_COLORS.temperature[1]} strokeWidth={2} name="Thermocline" />
                  <Line type="monotone" dataKey="deep" stroke={CHART_COLORS.temperature[2]} strokeWidth={2} name="Deep Water" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>Analysis:</strong> Surface waters show clear seasonal heating with peak temperatures in May (30.2°C). 
                The thermocline layer follows surface patterns with a 2-month delay, while deep waters remain stable year-round.
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Temperature Distribution */}
        <Card className="gov-card">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-primary">
              <Activity className="h-5 w-5" />
              Temperature Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.distribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.3)" />
                  <XAxis dataKey="range" tick={{ fill: 'hsl(var(--foreground))' }} />
                  <YAxis tick={{ fill: 'hsl(var(--foreground))' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="percentage" fill="hsl(var(--accent))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>Analysis:</strong> The distribution is bimodal with peaks at 5-10°C (deep waters, 25%) and 10-15°C (thermocline, 22.5%). 
                Surface waters (25-30°C) represent only 6.2% of the total water column, highlighting the ocean's cold nature.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // Check for float comparison queries first
  if (content.includes('float') && (content.includes('comparison') || content.includes('compare') || content.includes('between') || content.includes('depth') || content.includes('profile'))) {
    return renderFloatComparisonCharts();
  }
  
  if (content.includes('temperature') && !content.includes('float')) {
    return renderTemperatureCharts();
  }
  
  if (content.includes('salinity')) {
    return renderSalinityCharts();
  }
  
  if (content.includes('oxygen')) {
    return renderOxygenCharts();
  }
  
  if (content.includes('quality')) {
    return renderQualityCharts();
  }
  
  // Default: show float comparison charts for any unrecognized query
  return renderFloatComparisonCharts();
};

// Add the remaining chart rendering functions
const renderSalinityCharts = () => {
  const data = generateSalinityData();
  
  return (
    <div className="space-y-6">
      {/* Regional Comparison */}
      <Card className="gov-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <TrendingUp className="h-5 w-5" />
            Regional Salinity Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.comparison}>
                <CartesianGrid strokeDasharray="3 3" stroke={GOVT_COLORS.muted} />
                <XAxis dataKey="depth" stroke={GOVT_COLORS.primary} />
                <YAxis stroke={GOVT_COLORS.primary} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="Arabian Sea" stroke={CHART_COLORS.salinity[0]} strokeWidth={2} />
                <Line type="monotone" dataKey="Bay of Bengal" stroke={CHART_COLORS.salinity[1]} strokeWidth={2} />
                <Line type="monotone" dataKey="Indian Ocean" stroke={CHART_COLORS.salinity[2]} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Analysis:</strong> Clear regional differences with Arabian Sea showing highest salinity (35.1+ PSU) due to evaporation, 
            Bay of Bengal lowest (33.6+ PSU) from river discharge, and Indian Ocean intermediate values reflecting open ocean conditions.
          </p>
        </CardContent>
      </Card>
      
      {/* Regional Statistics */}
      <Card className="gov-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BarChart3 className="h-5 w-5" />
            Regional Salinity Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.regional}>
                <CartesianGrid strokeDasharray="3 3" stroke={GOVT_COLORS.muted} />
                <XAxis dataKey="region" stroke={GOVT_COLORS.primary} />
                <YAxis stroke={GOVT_COLORS.primary} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="avgSalinity" fill={GOVT_COLORS.accent} name="Average Salinity" />
                <Bar dataKey="maxSal" fill={CHART_COLORS.salinity[1]} name="Maximum" />
                <Bar dataKey="minSal" fill={CHART_COLORS.salinity[2]} name="Minimum" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Analysis:</strong> Red Sea shows extreme salinity (36.2 PSU avg), Arabian Sea high evaporation signature, 
            while Bay of Bengal demonstrates strong freshwater influence with lowest averages and highest variability.
          </p>
        </CardContent>
      </Card>
      
      {/* Latitudinal Gradient */}
      <Card className="gov-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Activity className="h-5 w-5" />
            Latitudinal Salinity Gradient
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={data.gradient}>
                <CartesianGrid strokeDasharray="3 3" stroke={GOVT_COLORS.muted} />
                <XAxis dataKey="latitude" stroke={GOVT_COLORS.primary} />
                <YAxis dataKey="salinity" stroke={GOVT_COLORS.primary} />
                <Tooltip content={<CustomTooltip />} />
                <Scatter dataKey="salinity" fill={CHART_COLORS.salinity[3]} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Analysis:</strong> Latitudinal salinity gradient shows subtropical maximum around 20-25°S, 
            reflecting the balance between evaporation and precipitation patterns across the Indian Ocean basin.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const renderOxygenCharts = () => {
  const data = generateOxygenData();
  
  return (
    <div className="space-y-6">
      {/* Oxygen Profile */}
      <Card className="gov-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <TrendingUp className="h-5 w-5" />
            Dissolved Oxygen Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.profile}>
                <CartesianGrid strokeDasharray="3 3" stroke={GOVT_COLORS.muted} />
                <XAxis dataKey="depth" stroke={GOVT_COLORS.primary} />
                <YAxis stroke={GOVT_COLORS.primary} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="oxygen" stroke={CHART_COLORS.oxygen[0]} fill={CHART_COLORS.oxygen[0]} fillOpacity={0.3} strokeWidth={2} />
                <Area type="monotone" dataKey="saturation" stroke={CHART_COLORS.oxygen[1]} fill={CHART_COLORS.oxygen[1]} fillOpacity={0.2} strokeWidth={1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Analysis:</strong> Clear oxygen minimum zone (OMZ) at 100-400m depth with severe hypoxia (&lt;20 μmol/kg).
            Surface waters well-oxygenated from air-sea exchange, gradual recovery in deep waters from remote ventilation.
          </p>
        </CardContent>
      </Card>
      
      {/* Oxygen Zones */}
      <Card className="gov-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BarChart3 className="h-5 w-5" />
            Oxygen Zone Characteristics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.zones}
                  cx="50%" cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="oxygen"
                >
                  {data.zones.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Analysis:</strong> Three-zone structure: Surface layer (95% saturation), OMZ core (8% saturation), 
            and deep water recovery (42% saturation). Each zone has distinct biogeochemical characteristics.
          </p>
        </CardContent>
      </Card>
      
      {/* Seasonal Variation */}
      <Card className="gov-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Activity className="h-5 w-5" />
            Seasonal Oxygen Dynamics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.temporal}>
                <CartesianGrid strokeDasharray="3 3" stroke={GOVT_COLORS.muted} />
                <XAxis dataKey="month" stroke={GOVT_COLORS.primary} />
                <YAxis stroke={GOVT_COLORS.primary} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="surfaceO2" stroke={CHART_COLORS.oxygen[0]} strokeWidth={2} name="Surface O2" />
                <Line type="monotone" dataKey="omzIntensity" stroke={CHART_COLORS.oxygen[1]} strokeWidth={2} name="OMZ Intensity" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Analysis:</strong> Seasonal patterns driven by monsoon forcing. Southwest monsoon enhances upwelling and OMZ intensity, 
            while northeast monsoon reduces biological activity. Surface oxygen follows temperature and biological cycles.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const renderQualityCharts = () => {
  const data = generateQualityData();
  
  return (
    <div className="space-y-6">
      {/* Quality Distribution */}
      <Card className="gov-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <TrendingUp className="h-5 w-5" />
            Data Quality Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.distribution}
                  cx="50%" cy="50%"
                  labelLine={false}
                  label={({ flag, percentage }) => `${flag}: ${percentage}%`}
                  outerRadius={120}
                  dataKey="count"
                >
                  {data.distribution.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Analysis:</strong> Excellent overall quality with 72.5% "Good" and 21% "Probably Good" data. 
            Only 6.5% requires review or rejection, exceeding international oceanographic standards.
          </p>
        </CardContent>
      </Card>
      
      {/* Parameter Quality */}
      <Card className="gov-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BarChart3 className="h-5 w-5" />
            Quality by Parameter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.byParameter}>
                <CartesianGrid strokeDasharray="3 3" stroke={GOVT_COLORS.muted} />
                <XAxis dataKey="parameter" stroke={GOVT_COLORS.primary} />
                <YAxis stroke={GOVT_COLORS.primary} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="good" stackId="quality" fill={CHART_COLORS.quality[0]} name="Good" />
                <Bar dataKey="fair" stackId="quality" fill={CHART_COLORS.quality[1]} name="Fair" />
                <Bar dataKey="poor" stackId="quality" fill={CHART_COLORS.quality[2]} name="Poor" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Analysis:</strong> Temperature and pressure show highest reliability (95-98% good), 
            while oxygen presents challenges (76% good) due to sensor complexity and calibration requirements.
          </p>
        </CardContent>
      </Card>
      
      {/* Quality Timeline */}
      <Card className="gov-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Activity className="h-5 w-5" />
            Quality Score Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.timeline}>
                <CartesianGrid strokeDasharray="3 3" stroke={GOVT_COLORS.muted} />
                <XAxis dataKey="month" stroke={GOVT_COLORS.primary} />
                <YAxis stroke={GOVT_COLORS.primary} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="qualityScore" stroke={GOVT_COLORS.accent} strokeWidth={3} name="Quality Score" />
                <Line type="monotone" dataKey="dataVolume" stroke={CHART_COLORS.quality[1]} strokeWidth={2} name="Data Volume" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Analysis:</strong> Quality scores range 81-93% with seasonal variations. Lower scores during monsoon periods 
            due to harsh conditions, improved performance during calm weather with regular maintenance schedules.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '🌊 Welcome to the Advanced Oceanographic Data Analysis System! I\'m your AI assistant providing instant marine data visualization and analysis.\n\n📈 **Available Analysis:**\n• **Float Comparisons** - Multi-float temperature-depth profiles, regional comparisons\n• **Temperature Analysis** - Depth profiles, seasonal variations, thermocline structure\n• **Salinity Distributions** - Regional variations, halocline analysis, conductivity\n• **Oxygen Zones** - OMZ detection, hypoxic conditions, biogeochemical cycles\n• **Data Quality Metrics** - QC assessments, validation reports, compliance analysis\n\n⚡ **Just type any query** and I\'ll instantly generate 2-3 detailed visualizations with comprehensive scientific analysis. No need to ask - just describe what you want to explore!',
      timestamp: new Date(),
      hasVisualization: false,
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatScrollRef = useChatScroll(messages);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate API response
    setTimeout(() => {
      const response = generateResponse(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        hasVisualization: response.hasVisualization,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateResponse = (query: string): { content: string; hasVisualization: boolean } => {
    const content = query.toLowerCase();
    
    // Check for float comparison queries first
    if (content.includes('float') && (content.includes('comparison') || content.includes('compare') || content.includes('between') || content.includes('depth') || content.includes('profile'))) {
      return {
        content: 'I\'ve generated comprehensive float comparison analysis showing temperature-depth profiles from multiple oceanographic floats across different regions of the Indian Ocean. The analysis includes multi-float profile comparisons, regional temperature statistics, and seasonal anomalies. Each float represents unique oceanographic conditions from its deployment location, providing insights into spatial variability of ocean temperature structure.',
        hasVisualization: true
      };
    }
    
    if (content.includes('temperature')) {
      return {
        content: 'I\'ve analyzed the temperature data from our oceanographic monitoring network. The visualizations below show comprehensive temperature analysis including depth profiles, seasonal variations, and statistical distributions. The data reveals classic tropical ocean characteristics with distinct thermal layering and seasonal patterns driven by solar heating and monsoon cycles.',
        hasVisualization: true
      };
    }
    
    if (content.includes('salinity')) {
      return {
        content: 'Salinity analysis reveals distinct regional patterns across the Indian Ocean basin. The Arabian Sea shows higher surface salinity due to intense evaporation, while the Bay of Bengal has lower values from massive freshwater input. I\'ve generated comprehensive visualizations showing regional comparisons, depth profiles, and conductivity relationships.',
        hasVisualization: true
      };
    }
    
    if (content.includes('oxygen')) {
      return {
        content: 'Oxygen distribution analysis reveals a prominent oxygen minimum zone (OMZ) with significant implications for marine ecosystems. The data shows severe hypoxic conditions between 100-400m depth, affecting biogeochemical cycles and marine habitat. The visualizations below detail the oxygen profile, zone characteristics, and seasonal variations.',
        hasVisualization: true
      };
    }
    
    if (content.includes('quality')) {
      return {
        content: 'Data quality assessment shows excellent overall reliability with 72.5% of measurements achieving "Good" status. The comprehensive quality control analysis includes parameter-specific assessments, temporal trends, and compliance with international oceanographic standards. Detailed visualizations show quality distributions and trends.',
        hasVisualization: true
      };
    }
    
    // Check for depth-related queries
    if (content.includes('depth') && (content.includes('temp') || content.includes('temperature'))) {
      return {
        content: 'I\'ve generated detailed depth-temperature analysis showing vertical ocean structure and thermal profiles across multiple floats. The analysis includes multi-float comparisons, thermocline characteristics, and regional variations across different ocean depths.',
        hasVisualization: true
      };
    }
    
    // Check for multi-parameter queries
    if ((content.includes('temp') || content.includes('temperature')) && content.includes('salinity')) {
      return {
        content: 'I\'ve created a comprehensive analysis combining temperature and salinity data, showing their interconnected relationships across multiple floats. The visualizations reveal ocean water mass characteristics, density variations, and thermohaline circulation patterns.',
        hasVisualization: true
      };
    }
    
    // Check for regional analysis queries
    if (content.includes('region') || content.includes('area') || content.includes('basin') || content.includes('arabian') || content.includes('bengal')) {
      return {
        content: 'I\'ve performed regional oceanographic analysis comparing different areas of the Indian Ocean basin. The visualizations show spatial variations in oceanographic parameters and highlight unique characteristics of each regional water mass from multiple float deployments.',
        hasVisualization: true
      };
    }
    
    // Check for broad oceanographic queries - default to float comparisons
    if (content.includes('ocean') || content.includes('data') || content.includes('analysis') || content.includes('show') || content.includes('graph') || content.includes('chart') || content.length < 20) {
      return {
        content: 'I\'ve generated comprehensive float comparison analysis showing temperature-depth profiles from multiple oceanographic floats across different regions of the Indian Ocean. The analysis includes multi-float profile comparisons, regional temperature statistics, and seasonal anomalies.',
        hasVisualization: true
      };
    }
    
    // Default response with visualizations for any unrecognized query
    return {
      content: 'I\'ve generated comprehensive oceanographic analysis including float comparisons, temperature profiles, and regional variations. The visualizations below show detailed insights into ocean temperature structure, multi-float comparisons, and regional characteristics across the Indian Ocean basin.',
      hasVisualization: true
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="gov-header p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Oceanographic Analysis Assistant</h1>
              <p className="text-sm text-white/80">AI-powered marine data analysis and visualization</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Zap className="h-3 w-3 mr-1" />
              Live Data
            </Badge>
            <Badge variant="outline" className="border-white/30 text-white">
              <Activity className="h-3 w-3 mr-1" />
              Government Certified
            </Badge>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-6xl mx-auto h-full flex flex-col">
          <div 
            ref={chatScrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-6"
          >
            {messages.map((message) => (
              <div key={message.id} className="space-y-4">
                <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                      message.type === 'user'
                        ? 'bg-primary border-primary-foreground'
                        : 'bg-accent border-accent-foreground'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-5 w-5 text-white" />
                      ) : (
                        <Bot className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl p-5 max-w-full ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground border border-primary/20'
                        : 'bg-card text-foreground border border-border border-l-4 border-l-accent'
                    } shadow-sm`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap text-inherit">{message.content}</p>
                      <div className={`text-xs mt-3 flex items-center justify-between ${
                        message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.hasVisualization && message.type === 'assistant' && (
                          <Badge variant="secondary" className="ml-2">
                            <Eye className="h-3 w-3 mr-1" />
                            Visualizations Available
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Render visualizations for assistant messages */}
                {message.type === 'assistant' && message.hasVisualization && (
                  <div className="ml-13">
                    <DataVisualization message={message} />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-accent border-2 border-accent-foreground flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white animate-pulse" />
                  </div>
                  <div className="bg-card text-foreground border border-border border-l-4 border-l-accent rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                        <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                      </div>
                      <span className="text-sm text-foreground font-medium">Analyzing oceanographic data...</span>
                      <Badge variant="outline" className="animate-pulse border-primary text-primary">
                        <Activity className="h-3 w-3 mr-1" />
                        Processing
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-card border-t border-border p-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about temperature profiles, salinity distributions, oxygen zones, data quality, or other oceanographic parameters..."
                className="gov-input h-12 text-base focus:ring-primary focus:border-primary"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              className="gov-btn-primary h-12 px-8 text-base font-semibold"
            >
              <Send className="h-5 w-5 mr-2" />
              Analyze
            </Button>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Activity className="h-3 w-3 mr-1" />
                Press Enter to send • Shift+Enter for new line
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                <Download className="h-3 w-3 mr-1" />
                Export Available
              </Badge>
              <Badge variant="outline" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Live Analysis
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
