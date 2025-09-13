import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HeroButton } from '@/components/ui/hero-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, Cell, PieChart, Pie } from 'recharts';
import { 
  LineChart as LineChartIcon, Download, TrendingUp, Activity, Layers, Zap,
  Waves, Globe, Target, Brain, Sparkles, Thermometer, Droplets, Wind
} from 'lucide-react';

// Ocean Background Component
const OceanBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="profileGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
          <stop offset="100%" stopColor="rgba(37, 99, 235, 0.05)" />
        </linearGradient>
      </defs>
      
      <path d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z" fill="rgba(59, 130, 246, 0.05)">
        <animateTransform attributeName="transform" type="translate" values="0,0;50,0;0,0" dur="10s" repeatCount="indefinite"/>
      </path>
      
      <path d="M0,450 C400,350 800,550 1200,450 L1200,800 L0,800 Z" fill="rgba(37, 99, 235, 0.03)">
        <animateTransform attributeName="transform" type="translate" values="0,0;-30,0;0,0" dur="14s" repeatCount="indefinite"/>
      </path>
      
      <path d="M0,500 C200,400 1000,600 1200,500 L1200,800 L0,800 Z" fill="rgba(59, 130, 246, 0.02)">
        <animateTransform attributeName="transform" type="translate" values="0,0;25,0;0,0" dur="18s" repeatCount="indefinite"/>
      </path>
    </svg>
  </div>
);

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 2.5 + 1.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-blue-400/25 rounded-full animate-bounce"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const Profiles = () => {
  const { floats, t } = useApp();
  const [selectedFloat, setSelectedFloat] = useState(floats[0]?.wmo_id || '');
  const [selectedVariable, setSelectedVariable] = useState<'temperature' | 'salinity' | 'oxygen'>('temperature');
  const [maxCycles, setMaxCycles] = useState(3);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const currentFloat = floats.find(f => f.wmo_id === selectedFloat);

  const prepareProfileData = () => {
    if (!currentFloat || !currentFloat.profiles) return [];

    const profilesToShow = currentFloat.profiles.slice(-maxCycles);
    const allDepths = [...new Set(
      profilesToShow.flatMap(p => p.depths || [])
    )].sort((a, b) => a - b);

    return allDepths.map(depth => {
      const dataPoint: any = { depth };
      
      profilesToShow.forEach((profile, index) => {
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
      case 'temperature': return ['#ef4444', '#f97316', '#eab308'];
      case 'salinity': return ['#3b82f6', '#06b6d4', '#8b5cf6'];
      case 'oxygen': return ['#10b981', '#059669', '#047857'];
      default: return ['#6b7280', '#9ca3af', '#d1d5db'];
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-xl border border-blue-500/30 p-4 rounded-lg shadow-xl">
          <p className="text-blue-300 font-semibold mb-2">{`Depth: ${label}m`}</p>
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

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-x-hidden overflow-y-auto">
      <OceanBackground />
      <FloatingParticles />

      <div className="relative z-20">
        {/* Enhanced Header */}
        <div className="border-b border-blue-500/20 bg-white/5 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className={`flex items-center justify-between transition-all duration-1000 ${
              isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
                  <div className="relative p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-blue-400/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <LineChartIcon className="h-8 w-8 text-blue-400" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Profile Analysis
                  </h1>
                  <p className="text-blue-200/80">
                    Detailed oceanographic profile visualization and analysis
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 border-blue-500/30 px-4 py-2 backdrop-blur-sm">
                  <Activity className="h-4 w-4 mr-2" />
                  Advanced Analytics
                </Badge>
                {profileData.length > 0 && (
                  <Badge className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-green-300 border-green-500/30 px-4 py-2 backdrop-blur-sm">
                    <Target className="h-4 w-4 mr-2" />
                    {profileData.length} depth levels
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
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Layers className="h-5 w-5 mr-2 text-blue-400" />
                    Select Float
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-blue-300 mb-2 block">Argo Float</label>
                    <Select value={selectedFloat} onValueChange={setSelectedFloat}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white hover:border-blue-500/50 transition-colors duration-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 backdrop-blur-xl">
                        {floats.map(f => (
                          <SelectItem key={f.wmo_id} value={f.wmo_id} className="text-white hover:bg-blue-500/20">
                            {f.wmo_id} - {f.institution}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm text-blue-300 mb-2 block">Variable</label>
                    <Select value={selectedVariable} onValueChange={(v: any) => setSelectedVariable(v)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white hover:border-blue-500/50 transition-colors duration-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 backdrop-blur-xl">
                        <SelectItem value="temperature" className="text-white hover:bg-red-500/20">
                          🌡️ Temperature
                        </SelectItem>
                        <SelectItem value="salinity" className="text-white hover:bg-blue-500/20">
                          🧂 Salinity
                        </SelectItem>
                        <SelectItem value="oxygen" className="text-white hover:bg-green-500/20">
                          💨 Oxygen
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm text-blue-300 mb-2 block">Max Cycles to Show</label>
                    <Select value={maxCycles.toString()} onValueChange={(v) => setMaxCycles(parseInt(v))}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white hover:border-blue-500/50 transition-colors duration-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 backdrop-blur-xl">
                        <SelectItem value="3" className="text-white">3 cycles</SelectItem>
                        <SelectItem value="5" className="text-white">5 cycles</SelectItem>
                        <SelectItem value="10" className="text-white">10 cycles</SelectItem>
                        <SelectItem value="20" className="text-white">20 cycles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Variable Info */}
              <Card className="bg-slate-800 border-blue-500/30 hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    {React.createElement(getVariableIcon(), { className: "h-5 w-5 mr-2 text-blue-400 animate-pulse" })}
                    {getVariableLabel()} Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-blue-500/30">
                      <span className="text-blue-300">Unit:</span>
                      <span className="text-white font-semibold">{getVariableUnit()}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-blue-500/30">
                      <span className="text-blue-300">Cycles:</span>
                      <span className="text-white font-semibold">{maxCycles}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-blue-500/30">
                      <span className="text-blue-300">Data Points:</span>
                      <span className="text-white font-semibold">{profileData.length}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg border border-blue-400/50">
                    <p className="text-sm text-blue-200 leading-relaxed">
                      <Sparkles className="inline h-4 w-4 mr-1" />
                      Showing latest {maxCycles} cycles for {currentFloat?.wmo_id}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Export Options */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="pt-6 space-y-3">
                  <HeroButton 
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white hover:scale-105 transition-all duration-300"
                    disabled={profileData.length === 0}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Profile Data
                  </HeroButton>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full text-blue-400 hover:text-white hover:bg-blue-500/20 border border-blue-500/30"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Statistics
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Main Content */}
            <div className={`xl:col-span-3 transition-all duration-1400 delay-500 ${
              isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-blue-500/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <LineChartIcon className="h-6 w-6 mr-2 text-blue-400" />
                      Ocean Profile Visualization
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {getVariableLabel()} ({getVariableUnit()})
                      </Badge>
                      <Button size="sm" variant="ghost" className="text-blue-400 hover:text-white">
                        <Zap className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="h-[600px] w-full">
                    {profileData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={profileData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis 
                            dataKey="depth" 
                            stroke="rgba(255,255,255,0.7)"
                            fontSize={12}
                            label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#94a3b8' } }}
                          />
                          <YAxis 
                            stroke="rgba(255,255,255,0.7)"
                            fontSize={12}
                            label={{ value: `${getVariableLabel()} (${getVariableUnit()})`, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#94a3b8' } }}
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
                                activeDot={{ r: 6, fill: colors[index % colors.length], stroke: '#fff', strokeWidth: 2 }}
                                connectNulls={false}
                              />
                            );
                          })}
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="relative mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-full blur-xl animate-pulse"></div>
                            <div className="relative w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                              <LineChartIcon className="h-8 w-8 text-white animate-bounce" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">
                            Ready to Analyze
                          </h3>
                          <p className="text-slate-300 max-w-md mx-auto">
                            Select a float and variable to view detailed oceanographic profiles and discover patterns in the data.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Additional Charts */}
              {profileData.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Depth Distribution Chart */}
                  <Card className="bg-slate-800 border-blue-500/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <BarChart className="h-5 w-5 mr-2 text-blue-400" />
                        Depth Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={profileData.slice(0, 15)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="depth" stroke="rgba(255,255,255,0.7)" fontSize={10} />
                            <YAxis stroke="rgba(255,255,255,0.7)" fontSize={10} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey={Object.keys(profileData[0] || {}).filter(k => k !== 'depth')[0]} fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Area Chart for Trend Analysis */}
                  <Card className="bg-slate-800 border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                        Trend Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={profileData.slice(0, 20)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="depth" stroke="rgba(255,255,255,0.7)" fontSize={10} />
                            <YAxis stroke="rgba(255,255,255,0.7)" fontSize={10} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area 
                              type="monotone" 
                              dataKey={Object.keys(profileData[0] || {}).filter(k => k !== 'depth')[0]} 
                              stroke="#10b981" 
                              fill="#10b981" 
                              fillOpacity={0.3}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Statistics Summary */}
              {profileData.length > 0 && (
                <Card className="bg-slate-800 border-purple-500/30 mt-6">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-purple-400" />
                      Statistical Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-slate-700 rounded-lg border border-purple-500/30">
                        <div className="text-2xl font-bold text-purple-300">
                          {Math.min(...profileData.map(d => d.depth || 0))}m
                        </div>
                        <div className="text-sm text-gray-300">Min Depth</div>
                      </div>
                      <div className="text-center p-3 bg-slate-700 rounded-lg border border-purple-500/30">
                        <div className="text-2xl font-bold text-purple-300">
                          {Math.max(...profileData.map(d => d.depth || 0))}m
                        </div>
                        <div className="text-sm text-gray-300">Max Depth</div>
                      </div>
                      <div className="text-center p-3 bg-slate-700 rounded-lg border border-purple-500/30">
                        <div className="text-2xl font-bold text-purple-300">
                          {profileData.length}
                        </div>
                        <div className="text-sm text-gray-300">Data Points</div>
                      </div>
                      <div className="text-center p-3 bg-slate-700 rounded-lg border border-purple-500/30">
                        <div className="text-2xl font-bold text-purple-300">
                          {maxCycles}
                        </div>
                        <div className="text-sm text-gray-300">Cycles</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Analysis Insights */}
              {profileData.length > 0 && (
                <Card className="bg-slate-800 border-indigo-500/30 mt-6">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-indigo-400" />
                      Analysis Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-slate-700 rounded-lg border border-indigo-500/30">
                        <Target className="h-8 w-8 mx-auto mb-2 text-indigo-400" />
                        <h4 className="font-semibold text-white mb-1">Data Quality</h4>
                        <p className="text-sm text-indigo-200">High resolution vertical profiles</p>
                      </div>
                      <div className="text-center p-3 bg-slate-700 rounded-lg border border-indigo-500/30">
                        <TrendingUp className="h-8 w-8 mx-auto mb-2 text-indigo-400" />
                        <h4 className="font-semibold text-white mb-1">Temporal Analysis</h4>
                        <p className="text-sm text-indigo-200">Compare cycles over time</p>
                      </div>
                      <div className="text-center p-3 bg-slate-700 rounded-lg border border-indigo-500/30">
                        <Waves className="h-8 w-8 mx-auto mb-2 text-indigo-400" />
                        <h4 className="font-semibold text-white mb-1">Ocean Structure</h4>
                        <p className="text-sm text-indigo-200">Identify mixing layers and thermoclines</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
