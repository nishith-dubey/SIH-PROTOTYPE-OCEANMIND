import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HeroButton } from '@/components/ui/hero-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, Download, TrendingUp, Waves, BarChart3, Info, 
  Clock, Layers, Thermometer, Droplets, Wind, Sparkles, Zap
} from 'lucide-react';

// Ocean Background Component
const OceanBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="oceanGradientHovmoller" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(249, 115, 22, 0.1)" />
          <stop offset="100%" stopColor="rgba(194, 65, 12, 0.05)" />
        </linearGradient>
      </defs>
      
      <path d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z" fill="rgba(249, 115, 22, 0.05)">
        <animateTransform attributeName="transform" type="translate" values="0,0;50,0;0,0" dur="9s" repeatCount="indefinite"/>
      </path>
      
      <path d="M0,450 C400,350 800,550 1200,450 L1200,800 L0,800 Z" fill="rgba(194, 65, 12, 0.03)">
        <animateTransform attributeName="transform" type="translate" values="0,0;-30,0;0,0" dur="13s" repeatCount="indefinite"/>
      </path>
    </svg>
  </div>
);

// Floating Particles
const FloatingParticles = () => (
  <div className="fixed inset-0 pointer-events-none z-10">
    {Array.from({ length: 18 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-orange-400/30 rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${2 + Math.random() * 3}s`
        }}
      />
    ))}
  </div>
);

const Hovmoller = () => {
  const { floats, t } = useApp();
  const [selectedFloat, setSelectedFloat] = useState(floats[0]?.wmo_id || '');
  const [selectedVariable, setSelectedVariable] = useState<'temperature' | 'salinity' | 'oxygen'>('temperature');
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const currentFloat = floats.find(f => f.wmo_id === selectedFloat);

  const generateHovmollerData = () => {
    if (!currentFloat) return [];

    const depths = [0, 25, 50, 75, 100, 150, 200, 300, 400, 500];
    const cycles = currentFloat.profiles.map((p: any) => p.cycle);

    return depths.map(depth => {
      const row: any = { depth };
      cycles.forEach(cycle => {
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

  const getVariableIcon = () => {
    switch (selectedVariable) {
      case 'temperature': return Thermometer;
      case 'salinity': return Droplets;
      case 'oxygen': return Wind;
      default: return Activity;
    }
  };

  const getVariableColor = () => {
    switch (selectedVariable) {
      case 'temperature': return 'from-red-500 to-orange-600';
      case 'salinity': return 'from-blue-500 to-cyan-600';
      case 'oxygen': return 'from-green-500 to-emerald-600';
      default: return 'from-orange-500 to-red-600';
    }
  };

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
      const blue = Math.round(255 * (1 - normalized));
      const red = Math.round(255 * normalized);
      return `rgb(${red}, 0, ${blue})`;
    } else if (selectedVariable === 'salinity') {
      const normalized = Math.max(0, Math.min(1, (value - 33) / 4));
      const green = Math.round(255 * (1 - normalized));
      const red = Math.round(255 * normalized);
      return `rgb(${red}, ${green}, 0)`;
    } else {
      const normalized = Math.max(0, Math.min(1, (value - 50) / 200));
      const purple = Math.round(255 * (1 - normalized));
      const orange = Math.round(255 * normalized);
      return `rgb(${orange}, ${purple/2}, ${purple})`;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-900 text-white relative overflow-hidden">
      <OceanBackground />
      <FloatingParticles />

      <div className="relative z-20">
        {/* Enhanced Header */}
        <div className="border-b border-orange-500/20 bg-white/5 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className={`flex items-center justify-between transition-all duration-1000 ${
              isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
                  <div className="relative p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-orange-400/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Activity className="h-8 w-8 text-orange-400" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                    Hovmöller Analysis
                  </h1>
                  <p className="text-orange-200/80">
                    Temporal analysis of oceanographic profiles
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/30 px-4 py-2 backdrop-blur-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Time-Depth Analysis
                </Badge>
                {hovmollerData.length > 0 && (
                  <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30 px-4 py-2 backdrop-blur-sm animate-pulse">
                    <Layers className="h-4 w-4 mr-2" />
                    {hovmollerData.length} depth levels
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            
            {/* Enhanced Sidebar */}
            <div className={`xl:col-span-1 space-y-6 transition-all duration-1200 delay-300 ${
              isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              
              {/* Float Selection */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Waves className="h-5 w-5 mr-2 text-orange-400" />
                    Select Float
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedFloat} onValueChange={setSelectedFloat}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white hover:border-orange-500/50 transition-colors duration-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 backdrop-blur-xl">
                      {floats.map(f => (
                        <SelectItem key={f.wmo_id} value={f.wmo_id} className="text-white hover:bg-orange-500/20">
                          <div className="flex items-center">
                            <Activity className="h-4 w-4 mr-2 text-orange-400" />
                            {f.wmo_id} - {f.profiles?.length || 0} profiles
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Variable Selection */}
              <Card className={`bg-gradient-to-br ${getVariableColor()}/10 backdrop-blur-xl border-orange-500/20 hover:scale-105 transition-all duration-300`}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    {React.createElement(getVariableIcon(), { className: "h-5 w-5 mr-2 text-orange-400" })}
                    Variable Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedVariable} onValueChange={(v: any) => setSelectedVariable(v)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="temperature" className="text-white">
                        <div className="flex items-center">
                          <Thermometer className="h-4 w-4 mr-2 text-red-400" />
                          🌡️ Temperature
                        </div>
                      </SelectItem>
                      <SelectItem value="salinity" className="text-white">
                        <div className="flex items-center">
                          <Droplets className="h-4 w-4 mr-2 text-blue-400" />
                          🧂 Salinity
                        </div>
                      </SelectItem>
                      <SelectItem value="oxygen" className="text-white">
                        <div className="flex items-center">
                          <Wind className="h-4 w-4 mr-2 text-green-400" />
                          💨 Oxygen
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Analysis Info */}
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Info className="h-5 w-5 mr-2 text-purple-400" />
                    About Hovmöller
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-purple-200 leading-relaxed mb-4">
                    A Hovmöller diagram shows how a variable changes over time and depth, 
                    providing insights into temporal patterns in the water column.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-white/5 rounded border border-purple-500/30">
                      <span className="text-purple-300">💡 Look for patterns like seasonal thermoclines, mixing events, or water mass changes.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Float Statistics */}
              <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-cyan-400 animate-pulse" />
                    Float Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between p-2 bg-white/5 rounded border border-white/10">
                      <span className="text-cyan-300">Float ID:</span>
                      <span className="text-white font-mono">{currentFloat?.wmo_id || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white/5 rounded border border-white/10">
                      <span className="text-blue-300">Institution:</span>
                      <span className="text-white">{currentFloat?.institution || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white/5 rounded border border-white/10">
                      <span className="text-orange-300">Total Cycles:</span>
                      <span className="text-white font-bold">{cycles.length}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white/5 rounded border border-white/10">
                      <span className="text-green-300">Depth Levels:</span>
                      <span className="text-white font-bold">{hovmollerData.length}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded border border-purple-500/30">
                      <span className="text-purple-300">Value Range:</span>
                      <span className="text-white text-xs">
                        {valueRange.min.toFixed(1)} - {valueRange.max.toFixed(1)} {getVariableUnit()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Export Options */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="pt-6">
                  <HeroButton 
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white hover:scale-105 transition-all duration-300"
                    disabled={hovmollerData.length === 0}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Diagram
                  </HeroButton>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Main Content */}
            <div className={`xl:col-span-3 transition-all duration-1400 delay-500 ${
              isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-orange-500/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart3 className="h-6 w-6 mr-2 text-orange-400" />
                      Hovmöller Diagram - {getVariableLabel()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                        {cycles.length} time steps
                      </Badge>
                      <Button size="sm" variant="ghost" className="text-orange-400 hover:text-white">
                        <TrendingUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-6">
                    {hovmollerData.length > 0 ? (
                      <>
                        {/* Hovmöller Heatmap */}
                        <div className="relative">
                          <div className="grid gap-px bg-slate-700 p-1 rounded-lg" 
                               style={{ gridTemplateColumns: `auto repeat(${cycles.length}, 1fr)` }}>
                            
                            {/* Header row */}
                            <div className="bg-slate-800 p-2 text-xs font-semibold text-center text-orange-300 rounded-tl">
                              Depth (m)
                            </div>
                            {cycles.map(cycle => (
                              <div key={cycle} className="bg-slate-800 p-2 text-xs font-semibold text-center text-white">
                                C{cycle}
                              </div>
                            ))}
                            
                            {/* Data rows */}
                            {hovmollerData.map((row, rowIndex) => (
                              <React.Fragment key={row.depth}>
                                <div className="bg-slate-800 p-2 text-xs font-semibold text-orange-300 text-center">
                                  {row.depth}
                                </div>
                                {cycles.map(cycle => {
                                  const value = row[`cycle_${cycle}`];
                                  const hasValue = value !== undefined && value !== null;
                                  return (
                                    <div
                                      key={cycle}
                                      className={`p-2 text-xs font-medium text-center transition-all duration-300 hover:scale-110 hover:z-10 relative ${
                                        hasValue ? 'text-white cursor-pointer' : 'text-slate-500'
                                      }`}
                                      style={{
                                        backgroundColor: hasValue 
                                          ? getColorScale(value)
                                          : 'rgb(51, 65, 85)',
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
                            <span className="text-sm text-slate-300">Low</span>
                            <div className="flex h-4 w-48 rounded overflow-hidden">
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
                            <span className="text-sm text-slate-300">High</span>
                          </div>
                          
                          <div className="mt-2 text-center">
                            <span className="text-xs text-slate-400">
                              {getVariableLabel()} ({getVariableUnit()}) - Range: {valueRange.min.toFixed(1)} to {valueRange.max.toFixed(1)}
                            </span>
                          </div>
                        </div>

                        {/* Axis Labels */}
                        <div className="grid grid-cols-2 gap-8 mt-8">
                          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border-blue-500/20 p-4">
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 mr-3 text-blue-400" />
                              <div>
                                <h4 className="font-semibold text-white">Time Axis (Horizontal)</h4>
                                <p className="text-sm text-blue-200">Profile cycle numbers representing time progression of measurements.</p>
                              </div>
                            </div>
                          </Card>
                          
                          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20 p-4">
                            <div className="flex items-center">
                              <TrendingUp className="h-5 w-5 mr-3 text-purple-400" />
                              <div>
                                <h4 className="font-semibold text-white">Depth Axis (Vertical)</h4>
                                <p className="text-sm text-purple-200">Ocean depth in meters, from surface (0m) to deeper waters (500m).</p>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-96">
                        <div className="text-center">
                          <div className="relative mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-500/20 rounded-full blur-xl animate-pulse"></div>
                            <div className="relative w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                              <Activity className="h-8 w-8 text-white animate-bounce" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">
                            Ready for Time Analysis
                          </h3>
                          <p className="text-slate-300 max-w-md mx-auto">
                            Select a float with multiple profiles to create a Hovmöller diagram showing temporal oceanographic patterns.
                          </p>
                        </div>
                      </div>
                    )}
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

export default Hovmoller;
