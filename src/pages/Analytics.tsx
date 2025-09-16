import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HeroButton } from '@/components/ui/hero-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, Cell, PieChart, Pie } from 'recharts';
import { 
  BarChart3, Download, TrendingUp, Activity, Layers, Zap,
  Waves, Globe, Target, Brain, Sparkles, Thermometer, Droplets, Wind,
  LineChart as LineChartIcon, GitCompare, Clock, Info, Users, FileText, Shield
} from 'lucide-react';

// Enhanced Ocean Background Component
const OceanBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-black">
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="analyticsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(79, 70, 229, 0.1)" />
          <stop offset="100%" stopColor="rgba(79, 70, 229, 0.05)" />
        </linearGradient>
      </defs>
      
      <path d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z" fill="rgba(79, 70, 229, 0.05)">
        <animateTransform attributeName="transform" type="translate" values="0,0;50,0;0,0" dur="10s" repeatCount="indefinite"/>
      </path>
      
      <path d="M0,450 C400,350 800,550 1200,450 L1200,800 L0,800 Z" fill="rgba(79, 70, 229, 0.03)">
        <animateTransform attributeName="transform" type="translate" values="0,0;-30,0;0,0" dur="14s" repeatCount="indefinite"/>
      </path>
      
      <path d="M0,500 C200,400 1000,600 1200,500 L1200,800 L0,800 Z" fill="rgba(59, 130, 246, 0.02)">
        <animateTransform attributeName="transform" type="translate" values="0,0;25,0;0,0" dur="18s" repeatCount="indefinite"/>
      </path>
    </svg>
  </div>
);

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 p-4 rounded-lg shadow-lg">
        <p className="font-semibold text-white mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
            {`${entry.name || entry.dataKey}: ${entry.value?.toFixed?.(2) || entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Profiles Tab Component
const ProfilesTab = ({ floats, t }: any) => {
  const [selectedFloat, setSelectedFloat] = useState(floats[0]?.wmo_id || '');
  const [selectedVariable, setSelectedVariable] = useState<'temperature' | 'salinity' | 'oxygen'>('temperature');
  const [maxCycles, setMaxCycles] = useState(3);

  const currentFloat = floats.find((f: any) => f.wmo_id === selectedFloat);

  const prepareProfileData = () => {
    if (!currentFloat || !currentFloat.profiles) return [];

    const profilesToShow = currentFloat.profiles.slice(-maxCycles);
    const allDepths = [...new Set(
      profilesToShow.flatMap((p: any) => p.depths || [])
    )].sort((a, b) => a - b);

    return allDepths.map(depth => {
      const dataPoint: any = { depth };
      
      profilesToShow.forEach((profile: any, index: number) => {
        const depthIndex = profile.depths?.indexOf(depth);
        if (depthIndex !== -1 && profile[selectedVariable]?.[depthIndex] !== undefined) {
          dataPoint[`Cycle ${profile.cycle}`] = profile[selectedVariable]![depthIndex];
        }
      });
      
      return dataPoint;
    });
  };

  const profileData = prepareProfileData();

  const getVariableLabel = () => {
    switch (selectedVariable) {
      case 'temperature': return t('temperature') || 'Temperature';
      case 'salinity': return t('salinity') || 'Salinity';
      case 'oxygen': return t('oxygen') || 'Oxygen';
      default: return selectedVariable;
    }
  };

  const getVariableUnit = () => {
    switch (selectedVariable) {
      case 'temperature': return '°C';
      case 'salinity': return 'PSU';
      case 'oxygen': return 'μmol/kg';
      default: return '';
    }
  };

  const getVariableColor = () => {
    switch (selectedVariable) {
      case 'temperature': return ['#6366f1', '#818cf8', '#a5b4fc'];
      case 'salinity': return ['#3b82f6', '#60a5fa', '#93c5fd'];
      case 'oxygen': return ['#22c55e', '#4ade80', '#86efac'];
      default: return ['#a1a1aa', '#d4d4d8', '#e4e4e7'];
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4">
            <label className="text-sm font-medium text-zinc-400 mb-2 block">Argo Float</label>
            <Select value={selectedFloat} onValueChange={setSelectedFloat}>
              <SelectTrigger className="bg-zinc-950 border-zinc-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                {floats.map((f: any) => (
                  <SelectItem key={f.wmo_id} value={f.wmo_id}>
                    {f.wmo_id} - {f.institution}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4">
            <label className="text-sm font-medium text-zinc-400 mb-2 block">Variable</label>
            <Select value={selectedVariable} onValueChange={(v: any) => setSelectedVariable(v)}>
              <SelectTrigger className="bg-zinc-950 border-zinc-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="temperature">
                  <div className="flex items-center">
                    <Thermometer className="h-4 w-4 mr-2 text-indigo-400" />
                    Temperature
                  </div>
                </SelectItem>
                <SelectItem value="salinity">
                  <div className="flex items-center">
                    <Droplets className="h-4 w-4 mr-2 text-blue-400" />
                    Salinity
                  </div>
                </SelectItem>
                <SelectItem value="oxygen">
                  <div className="flex items-center">
                    <Wind className="h-4 w-4 mr-2 text-green-400" />
                    Oxygen
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4">
            <label className="text-sm font-medium text-zinc-400 mb-2 block">Max Cycles</label>
            <Select value={maxCycles.toString()} onValueChange={(v) => setMaxCycles(parseInt(v))}>
              <SelectTrigger className="bg-zinc-950 border-zinc-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="3">3 cycles</SelectItem>
                <SelectItem value="5">5 cycles</SelectItem>
                <SelectItem value="10">10 cycles</SelectItem>
                <SelectItem value="20">20 cycles</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-zinc-400">Actions</span>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full" disabled={profileData.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <LineChartIcon className="h-6 w-6 mr-2 text-indigo-400" />
              Profile Analysis - {getVariableLabel()}
            </div>
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
              {profileData.length} data points
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full">
            {profileData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profileData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis 
                    dataKey="depth" 
                    tick={{ fill: '#a1a1aa' }}
                    label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    tick={{ fill: '#a1a1aa' }}
                    label={{ value: `${getVariableLabel()} (${getVariableUnit()})`, angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  
                  {currentFloat?.profiles?.slice(-maxCycles).map((profile: any, index: number) => {
                    const colors = getVariableColor();
                    return (
                      <Line 
                        key={`cycle-${profile.cycle}`}
                        type="monotone" 
                        dataKey={`Cycle ${profile.cycle}`}
                        stroke={colors[index % colors.length]}
                        strokeWidth={3}
                        dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 4 }}
                        connectNulls={false}
                      />
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <LineChartIcon className="h-16 w-16 mx-auto mb-4 text-zinc-600" />
                  <h3 className="text-lg font-semibold mb-2 text-white">Ready to Analyze</h3>
                  <p className="text-zinc-400">
                    Select a float and variable to view detailed oceanographic profiles.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      {profileData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-zinc-900 border-zinc-800 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-indigo-400 mb-1">
                {Math.min(...profileData.map(d => d.depth || 0))}m
              </div>
              <div className="text-sm text-zinc-400">Min Depth</div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-indigo-400 mb-1">
                {Math.max(...profileData.map(d => d.depth || 0))}m
              </div>
              <div className="text-sm text-zinc-400">Max Depth</div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-indigo-400 mb-1">
                {profileData.length}
              </div>
              <div className="text-sm text-zinc-400">Data Points</div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-indigo-400 mb-1">
                {maxCycles}
              </div>
              <div className="text-sm text-zinc-400">Cycles</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// Compare Tab Component
const CompareTab = ({ floats, t }: any) => {
  const [float1, setFloat1] = useState(floats[0]?.wmo_id || '');
  const [float2, setFloat2] = useState(floats[1]?.wmo_id || '');
  const [selectedVariable, setSelectedVariable] = useState<'temperature' | 'salinity' | 'oxygen'>('temperature');

  const currentFloat1 = floats.find((f: any) => f.wmo_id === float1);
  const currentFloat2 = floats.find((f: any) => f.wmo_id === float2);

  const prepareComparisonData = () => {
    if (!currentFloat1 || !currentFloat2) return [];
    
    const profile1 = currentFloat1.profiles?.[currentFloat1.profiles.length - 1];
    const profile2 = currentFloat2.profiles?.[currentFloat2.profiles.length - 1];
    
    if (!profile1 || !profile2) return [];
    
    const commonDepths = profile1.depths?.filter((depth: number) => 
      profile2.depths?.includes(depth)
    ) || [];
    
    return commonDepths.map(depth => {
      const index1 = profile1.depths?.indexOf(depth) || 0;
      const index2 = profile2.depths?.indexOf(depth) || 0;
      
      return {
        depth,
        [currentFloat1.wmo_id]: profile1[selectedVariable]?.[index1],
        [currentFloat2.wmo_id]: profile2[selectedVariable]?.[index2],
        difference: (profile1[selectedVariable]?.[index1] || 0) - (profile2[selectedVariable]?.[index2] || 0)
      };
    }).filter(item => 
      item[currentFloat1.wmo_id] !== undefined && 
      item[currentFloat2.wmo_id] !== undefined
    );
  };

  const comparisonData = prepareComparisonData();

  const getVariableLabel = () => {
    switch (selectedVariable) {
      case 'temperature': return t('temperature') || 'Temperature';
      case 'salinity': return t('salinity') || 'Salinity';
      case 'oxygen': return t('oxygen') || 'Oxygen';
      default: return selectedVariable;
    }
  };

  const getVariableUnit = () => {
    switch (selectedVariable) {
      case 'temperature': return '°C';
      case 'salinity': return 'PSU';
      case 'oxygen': return 'μmol/kg';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4">
            <label className="text-sm font-medium text-zinc-400 mb-2 block">First Float</label>
            <Select value={float1} onValueChange={setFloat1}>
              <SelectTrigger className="bg-zinc-950 border-zinc-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                {floats.map((f: any) => (
                  <SelectItem key={f.wmo_id} value={f.wmo_id}>
                    {f.wmo_id} - {f.institution}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4">
            <label className="text-sm font-medium text-zinc-400 mb-2 block">Second Float</label>
            <Select value={float2} onValueChange={setFloat2}>
              <SelectTrigger className="bg-zinc-950 border-zinc-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                {floats.map((f: any) => (
                  <SelectItem key={f.wmo_id} value={f.wmo_id}>
                    {f.wmo_id} - {f.institution}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4">
            <label className="text-sm font-medium text-zinc-400 mb-2 block">Variable</label>
            <Select value={selectedVariable} onValueChange={(v: any) => setSelectedVariable(v)}>
              <SelectTrigger className="bg-zinc-950 border-zinc-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="temperature">
                  <div className="flex items-center">
                    <Thermometer className="h-4 w-4 mr-2 text-indigo-400" />
                    Temperature
                  </div>
                </SelectItem>
                <SelectItem value="salinity">
                  <div className="flex items-center">
                    <Droplets className="h-4 w-4 mr-2 text-blue-400" />
                    Salinity
                  </div>
                </SelectItem>
                <SelectItem value="oxygen">
                  <div className="flex items-center">
                    <Wind className="h-4 w-4 mr-2 text-green-400" />
                    Oxygen
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-zinc-400">Actions</span>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full" disabled={comparisonData.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export Comparison
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Comparison Chart */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <GitCompare className="h-6 w-6 mr-2 text-indigo-400" />
              Float Comparison - {getVariableLabel()}
            </div>
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
              {comparisonData.length} data points
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full">
            {comparisonData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis 
                    dataKey="depth" 
                    tick={{ fill: '#a1a1aa' }}
                    label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    tick={{ fill: '#a1a1aa' }}
                    label={{ value: `${getVariableLabel()} (${getVariableUnit()})`, angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={currentFloat1?.wmo_id} 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                    name={`Float ${currentFloat1?.wmo_id}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey={currentFloat2?.wmo_id} 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    name={`Float ${currentFloat2?.wmo_id}`}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <GitCompare className="h-16 w-16 mx-auto mb-4 text-zinc-600" />
                  <h3 className="text-lg font-semibold mb-2 text-white">Ready to Compare</h3>
                  <p className="text-zinc-400">
                    Select two different floats to compare their oceanographic data.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Charts */}
      {comparisonData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Difference Analysis */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-indigo-400" />
                Difference Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis dataKey="depth" tick={{ fill: '#a1a1aa' }} />
                    <YAxis tick={{ fill: '#a1a1aa' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="difference" 
                      stroke="#6366f1" 
                      fill="rgba(99, 102, 241, 0.3)" 
                      name="Difference"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Summary */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-indigo-400" />
                Comparison Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                  <span className="text-sm font-medium text-zinc-300">Data Points</span>
                  <span className="text-lg font-bold text-indigo-400">{comparisonData.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                  <span className="text-sm font-medium text-zinc-300">Avg Difference</span>
                  <span className="text-lg font-bold text-indigo-400">
                    {Math.abs(comparisonData.reduce((sum, d) => sum + (d.difference || 0), 0) / comparisonData.length).toFixed(2)} {getVariableUnit()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                  <span className="text-sm font-medium text-zinc-300">Max Difference</span>
                  <span className="text-lg font-bold text-indigo-400">
                    {Math.max(...comparisonData.map(d => Math.abs(d.difference || 0))).toFixed(2)} {getVariableUnit()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// Hovmoller Tab Component
const HovmollerTab = ({ floats, t }: any) => {
  const [selectedFloat, setSelectedFloat] = useState(floats[0]?.wmo_id || '');
  const [selectedVariable, setSelectedVariable] = useState<'temperature' | 'salinity' | 'oxygen'>('temperature');

  const currentFloat = floats.find((f: any) => f.wmo_id === selectedFloat);

  const generateHovmollerData = () => {
    if (!currentFloat) return [];

    const depths = [0, 25, 50, 75, 100, 150, 200, 300, 400, 500];
    const cycles = currentFloat.profiles.map((p: any) => p.cycle);

    return depths.map(depth => {
      const row: any = { depth };
      cycles.forEach((cycle: number) => {
        const profile = currentFloat.profiles.find((p: any) => p.cycle === cycle);
        if (profile && profile[selectedVariable]) {
          const depthIndex = profile.depths.findIndex((d: number) => d === depth);
          if (depthIndex !== -1 && profile[selectedVariable]![depthIndex] !== undefined) {
            row[`cycle_${cycle}`] = profile[selectedVariable]![depthIndex];
          }
        }
      });
      return row;
    });
  };

  const hovmollerData = generateHovmollerData();

  const getVariableLabel = () => {
    switch (selectedVariable) {
      case 'temperature': return t('temperature') || 'Temperature';
      case 'salinity': return t('salinity') || 'Salinity';  
      case 'oxygen': return t('oxygen') || 'Oxygen';
      default: return selectedVariable;
    }
  };

  const getVariableUnit = () => {
    switch (selectedVariable) {
      case 'temperature': return '°C';
      case 'salinity': return 'PSU';
      case 'oxygen': return 'μmol/kg';
      default: return '';
    }
  };

  const getColorScale = (value: number) => {
    if (selectedVariable === 'temperature') {
      const normalized = Math.max(0, Math.min(1, (value - 0) / 30));
      return `hsl(${240 - normalized * 240}, 70%, ${50 + normalized * 20}%)`;
    } else if (selectedVariable === 'salinity') {
      const normalized = Math.max(0, Math.min(1, (value - 33) / 4));
      return `hsl(${220 - normalized * 60}, 70%, ${50 + normalized * 20}%)`;
    } else {
      const normalized = Math.max(0, Math.min(1, (value - 50) / 200));
      return `hsl(${120 + normalized * 60}, 70%, ${50 + normalized * 20}%)`;
    }
  };

  const getValueRange = () => {
    if (!currentFloat || hovmollerData.length === 0) return { min: 0, max: 1 };

    let allValues: number[] = [];
    hovmollerData.forEach(row => {
      Object.keys(row).forEach(key => {
        if (key !== 'depth' && typeof row[key] === 'number') {
          allValues.push(row[key]);
        }
      });
    });

    return allValues.length > 0 
      ? { min: Math.min(...allValues), max: Math.max(...allValues) }
      : { min: 0, max: 1 };
  };

  const valueRange = getValueRange();
  const cycles = currentFloat?.profiles?.map((p: any) => p.cycle) || [];

  return (
    <div className="space-y-6">
      {/* Controls Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4">
            <label className="text-sm font-medium text-zinc-400 mb-2 block">Argo Float</label>
            <Select value={selectedFloat} onValueChange={setSelectedFloat}>
              <SelectTrigger className="bg-zinc-950 border-zinc-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                {floats.map((f: any) => (
                  <SelectItem key={f.wmo_id} value={f.wmo_id}>
                    {f.wmo_id} - {f.profiles?.length || 0} profiles
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4">
            <label className="text-sm font-medium text-zinc-400 mb-2 block">Variable</label>
            <Select value={selectedVariable} onValueChange={(v: any) => setSelectedVariable(v)}>
              <SelectTrigger className="bg-zinc-950 border-zinc-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="temperature">
                  <div className="flex items-center">
                    <Thermometer className="h-4 w-4 mr-2 text-indigo-400" />
                    Temperature
                  </div>
                </SelectItem>
                <SelectItem value="salinity">
                  <div className="flex items-center">
                    <Droplets className="h-4 w-4 mr-2 text-blue-400" />
                    Salinity
                  </div>
                </SelectItem>
                <SelectItem value="oxygen">
                  <div className="flex items-center">
                    <Wind className="h-4 w-4 mr-2 text-green-400" />
                    Oxygen
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-zinc-400">Statistics</span>
            </div>
            <div className="text-xs space-y-1">
              <div className="flex justify-between text-zinc-300">
                <span>Cycles:</span>
                <span className="font-mono">{cycles.length}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Depths:</span>
                <span className="font-mono">{hovmollerData.length}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Range:</span>
                <span className="font-mono">{valueRange.min.toFixed(1)}-{valueRange.max.toFixed(1)} {getVariableUnit()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-zinc-400">Actions</span>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full" disabled={hovmollerData.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export Diagram
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Hovmöller Diagram */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-6 w-6 mr-2 text-indigo-400" />
              Hovmöller Diagram - {getVariableLabel()}
            </div>
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
              {cycles.length} time steps
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hovmollerData.length > 0 ? (
            <div className="space-y-6">
              {/* Heatmap */}
              <div className="relative overflow-x-auto">
                <div className="grid gap-px bg-zinc-800 p-2 rounded-lg min-w-max" 
                     style={{ gridTemplateColumns: `120px repeat(${cycles.length}, 60px)` }}>
                  
                  {/* Header row */}
                  <div className="bg-zinc-950 p-2 text-xs font-semibold text-center text-zinc-400 rounded-tl">
                    Depth (m)
                  </div>
                  {cycles.map((cycle: number) => (
                    <div key={cycle} className="bg-zinc-950 p-2 text-xs font-semibold text-center text-white">
                      C{cycle}
                    </div>
                  ))}
                  
                  {/* Data rows */}
                  {hovmollerData.map((row) => (
                    <React.Fragment key={row.depth}>
                      <div className="bg-zinc-950 p-2 text-xs font-semibold text-center text-zinc-400">
                        {row.depth}
                      </div>
                      {cycles.map((cycle: number) => {
                        const value = row[`cycle_${cycle}`];
                        const hasValue = value !== undefined && value !== null;
                        return (
                          <div
                            key={cycle}
                            className={`p-2 text-xs font-medium text-center transition-all duration-300 hover:scale-110 cursor-pointer ${
                              hasValue ? 'text-white' : 'text-zinc-500 bg-zinc-800'
                            }`}
                            style={{
                              backgroundColor: hasValue ? getColorScale(value) : undefined,
                            }}
                            title={hasValue ? `Cycle ${cycle}, ${row.depth}m: ${value.toFixed(2)} ${getVariableUnit()}` : 'No data'}
                          >
                            {hasValue ? value.toFixed(1) : '-'}
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>

                {/* Color Scale Legend */}
                <div className="mt-6 flex items-center justify-center space-x-4">
                  <span className="text-sm text-zinc-400">Low</span>
                  <div className="flex h-4 w-48 rounded overflow-hidden border border-zinc-700">
                    {Array.from({ length: 20 }).map((_, i) => {
                      const value = valueRange.min + (valueRange.max - valueRange.min) * (i / 19);
                      return (
                        <div
                          key={i}
                          className="flex-1 h-full"
                          style={{ backgroundColor: getColorScale(value) }}
                        />
                      );
                    })}
                  </div>
                  <span className="text-sm text-zinc-400">High</span>
                </div>
                
                <div className="mt-2 text-center">
                  <span className="text-xs text-zinc-400">
                    {getVariableLabel()} ({getVariableUnit()}) - Range: {valueRange.min.toFixed(1)} to {valueRange.max.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-zinc-950 border-zinc-800">
                  <CardContent className="pt-4">
                    <div className="flex items-center mb-3">
                      <Clock className="h-5 w-5 mr-3 text-indigo-400" />
                      <h4 className="font-semibold text-white">Time Axis (Horizontal)</h4>
                    </div>
                    <p className="text-sm text-zinc-400">
                      Profile cycle numbers representing time progression of measurements.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-zinc-950 border-zinc-800">
                  <CardContent className="pt-4">
                    <div className="flex items-center mb-3">
                      <TrendingUp className="h-5 w-5 mr-3 text-indigo-400" />
                      <h4 className="font-semibold text-white">Depth Axis (Vertical)</h4>
                    </div>
                    <p className="text-sm text-zinc-400">
                      Ocean depth in meters, from surface (0m) to deeper waters (500m).
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <Clock className="h-16 w-16 mx-auto mb-4 text-zinc-600" />
                <h3 className="text-lg font-semibold mb-2 text-white">Ready for Time Analysis</h3>
                <p className="text-zinc-400">
                  Select a float with multiple profiles to create a Hovmöller diagram.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Main Analytics Component
const Analytics = () => {
  const { floats, t } = useApp();
  const [activeTab, setActiveTab] = useState('profiles');
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden text-white">
      <OceanBackground />
      
      <div className="relative z-20">
        {/* Enhanced Header */}
        <div className="border-b border-zinc-800 bg-zinc-900 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className={`flex items-center justify-between transition-all duration-1000 ${
              isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative p-3 bg-indigo-600 rounded-xl group-hover:scale-110 transition-all duration-300">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    Advanced Analytics Dashboard
                  </h1>
                  <p className="text-zinc-400">
                    Comprehensive oceanographic data analysis and visualization suite
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge className="bg-indigo-600/10 text-indigo-300 border-indigo-500/20 px-4 py-2">
                  <Shield className="h-4 w-4 mr-2" />
                  Government Portal
                </Badge>
                <Badge className="bg-green-600/10 text-green-300 border-green-500/20 px-4 py-2">
                  <Activity className="h-4 w-4 mr-2" />
                  Live Data
                </Badge>
                <Badge className="bg-zinc-800/50 text-zinc-300 border-zinc-700 px-4 py-2">
                  <Users className="h-4 w-4 mr-2" />
                  {floats.length} Floats
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Navigation Tabs */}
          <div className={`transition-all duration-1200 delay-300 ${
            isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3 bg-zinc-900 border-zinc-800">
                <TabsTrigger value="profiles" className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                  <LineChartIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile Analysis</span>
                  <span className="sm:hidden">Profiles</span>
                </TabsTrigger>
                <TabsTrigger value="compare" className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                  <GitCompare className="h-4 w-4" />
                  <span className="hidden sm:inline">Float Comparison</span>
                  <span className="sm:hidden">Compare</span>
                </TabsTrigger>
                <TabsTrigger value="hovmoller" className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">Hovmöller Analysis</span>
                  <span className="sm:hidden">Hovmöller</span>
                </TabsTrigger>
              </TabsList>

              <div className={`transition-all duration-1400 delay-500 ${
                isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <TabsContent value="profiles" className="space-y-6">
                  <ProfilesTab floats={floats} t={t} />
                </TabsContent>

                <TabsContent value="compare" className="space-y-6">
                  <CompareTab floats={floats} t={t} />
                </TabsContent>

                <TabsContent value="hovmoller" className="space-y-6">
                  <HovmollerTab floats={floats} t={t} />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Footer Information */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-indigo-400" />
                  Export Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Export your analysis results in multiple formats including CSV, ASCII tables, and NetCDF for further analysis.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">CSV</Badge>
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">ASCII</Badge>
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">NetCDF</Badge>
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">JSON</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-indigo-400" />
                  Analysis Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Advanced statistical analysis, temporal patterns, and comparative visualization tools for comprehensive oceanographic research.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">Profile Analysis</Badge>
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">Comparisons</Badge>
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">Time Series</Badge>
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">Statistics</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-indigo-400" />
                  Data Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Government-grade data quality assurance with rigorous validation, quality control flags, and metadata standards.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-800/50 text-green-300">QC Validated</Badge>
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">Metadata</Badge>
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">Standards</Badge>
                  <Badge variant="secondary" className="bg-green-800/50 text-green-300">Certified</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;