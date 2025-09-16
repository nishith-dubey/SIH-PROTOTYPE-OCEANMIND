import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HeroButton } from '@/components/ui/hero-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area, ScatterChart, Scatter, Cell } from 'recharts';
import { 
  BarChart3, Download, GitCompare, TrendingUp, Activity, Layers, Zap,
  Waves, Globe, Target, Brain, Sparkles
} from 'lucide-react';

// Ocean Background Component (reusable)
const OceanBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
      <path d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z" fill="rgba(79, 70, 229, 0.03)">
        <animateTransform attributeName="transform" type="translate" values="0,0;50,0;0,0" dur="12s" repeatCount="indefinite"/>
      </path>
      <path d="M0,450 C400,350 800,550 1200,450 L1200,800 L0,800 Z" fill="rgba(59, 130, 246, 0.02)">
        <animateTransform attributeName="transform" type="translate" values="0,0;-30,0;0,0" dur="15s" repeatCount="indefinite"/>
      </path>
    </svg>
  </div>
);

const Compare = () => {
  const { floats, t } = useApp();
  const [float1, setFloat1] = useState(floats[0]?.wmo_id || '');
  const [float2, setFloat2] = useState(floats[1]?.wmo_id || '');
  const [selectedVariable, setSelectedVariable] = useState<'temperature' | 'salinity' | 'oxygen'>('temperature');
  const [comparisonType, setComparisonType] = useState<'profiles' | 'statistics' | 'timeseries'>('profiles');
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const currentFloat1 = floats.find(f => f.wmo_id === float1);
  const currentFloat2 = floats.find(f => f.wmo_id === float2);

  const prepareComparisonData = () => {
    if (!currentFloat1 || !currentFloat2) return [];
    
    // Get the latest profiles for both floats
    const profile1 = currentFloat1.profiles?.[currentFloat1.profiles.length - 1];
    const profile2 = currentFloat2.profiles?.[currentFloat2.profiles.length - 1];
    
    if (!profile1 || !profile2) return [];
    
    // Create comparison data by depth
    const commonDepths = profile1.depths?.filter(depth => 
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
  
  const prepareStatisticalData = () => {
    if (!currentFloat1 || !currentFloat2) return [];
    
    const profile1 = currentFloat1.profiles?.[currentFloat1.profiles.length - 1];
    const profile2 = currentFloat2.profiles?.[currentFloat2.profiles.length - 1];
    
    if (!profile1 || !profile2) return [];
    
    const data1 = profile1[selectedVariable] || [];
    const data2 = profile2[selectedVariable] || [];
    
    const stats = [
      {
        metric: 'Mean',
        [currentFloat1.wmo_id]: data1.reduce((a, b) => a + b, 0) / data1.length,
        [currentFloat2.wmo_id]: data2.reduce((a, b) => a + b, 0) / data2.length
      },
      {
        metric: 'Max',
        [currentFloat1.wmo_id]: Math.max(...data1),
        [currentFloat2.wmo_id]: Math.max(...data2)
      },
      {
        metric: 'Min',
        [currentFloat1.wmo_id]: Math.min(...data1),
        [currentFloat2.wmo_id]: Math.min(...data2)
      },
      {
        metric: 'Range',
        [currentFloat1.wmo_id]: Math.max(...data1) - Math.min(...data1),
        [currentFloat2.wmo_id]: Math.max(...data2) - Math.min(...data2)
      }
    ];
    
    return stats;
  };

  const comparisonData = prepareComparisonData();

  const getVariableLabel = () => {
    switch (selectedVariable) {
      case 'temperature': return t('temperature');
      case 'salinity': return t('salinity');
      case 'oxygen': return t('oxygen');
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
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden overflow-y-auto">
      <OceanBackground />
      
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-indigo-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-20">
        {/* Enhanced Header */}
        <div className="border-b border-indigo-500/20 bg-zinc-950/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className={`flex items-center justify-between transition-all duration-1000 ${
              isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
                  <div className="relative p-3 bg-zinc-900 backdrop-blur-xl rounded-xl border border-indigo-400/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <GitCompare className="h-8 w-8 text-indigo-400" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Float Comparison
                  </h1>
                  <p className="text-indigo-200/80">
                    Compare oceanographic data between different Argo floats
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge className="bg-indigo-600/20 text-indigo-300 border-indigo-500/30 px-4 py-2 backdrop-blur-sm">
                  <Activity className="h-4 w-4 mr-2" />
                  Advanced Analytics
                </Badge>
                {comparisonData.length > 0 && (
                  <Badge className="bg-green-600/20 text-green-300 border-green-500/30 px-4 py-2 backdrop-blur-sm">
                    <Target className="h-4 w-4 mr-2" />
                    {comparisonData.length} data points
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
              <Card className="bg-zinc-900 border-zinc-800 hover:border-indigo-500/30 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Layers className="h-5 w-5 mr-2 text-indigo-400" />
                    Select Floats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-indigo-300 mb-2 block">First Float</label>
                    <Select value={float1} onValueChange={setFloat1}>
                      <SelectTrigger className="bg-zinc-950 border-zinc-700 text-white hover:border-indigo-500/50 transition-colors duration-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 backdrop-blur-xl">
                        {floats.map(f => (
                          <SelectItem key={f.wmo_id} value={f.wmo_id} className="text-white hover:bg-indigo-500/20">
                            {f.wmo_id} - {f.institution}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm text-indigo-300 mb-2 block">Second Float</label>
                    <Select value={float2} onValueChange={setFloat2}>
                      <SelectTrigger className="bg-zinc-950 border-zinc-700 text-white hover:border-indigo-500/50 transition-colors duration-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 backdrop-blur-xl">
                        {floats.map(f => (
                          <SelectItem key={f.wmo_id} value={f.wmo_id} className="text-white hover:bg-indigo-500/20">
                            {f.wmo_id} - {f.institution}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Options */}
              <Card className="bg-zinc-900 border-indigo-500/30 hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-indigo-400" />
                    Analysis Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedVariable} onValueChange={(v: any) => setSelectedVariable(v)}>
                    <SelectTrigger className="bg-zinc-950 border-zinc-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800">
                      <SelectItem value="temperature" className="text-white">🌡️ Temperature</SelectItem>
                      <SelectItem value="salinity" className="text-white">🧂 Salinity</SelectItem>
                      <SelectItem value="oxygen" className="text-white">💨 Oxygen</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={comparisonType} onValueChange={(v: any) => setComparisonType(v)}>
                    <SelectTrigger className="bg-zinc-950 border-zinc-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800">
                      <SelectItem value="profiles" className="text-white">📊 Profile Comparison</SelectItem>
                      <SelectItem value="statistics" className="text-white">📈 Statistical Analysis</SelectItem>
                      <SelectItem value="timeseries" className="text-white">⏱️ Time Series</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Insights Panel */}
              <Card className="bg-zinc-900 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-blue-400 animate-pulse" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-200 leading-relaxed">
                    Comparing <span className="font-semibold text-blue-300">{getVariableLabel()}</span> using{' '}
                    <span className="font-semibold text-indigo-300">{comparisonType.replace('_', ' ')}</span> method 
                    between floats <span className="font-mono text-white">{currentFloat1?.wmo_id}</span> and{' '}
                    <span className="font-mono text-white">{currentFloat2?.wmo_id}</span>.
                  </p>
                  {comparisonData.length > 0 && (
                    <div className="mt-4 p-3 bg-zinc-950 rounded-lg border border-blue-500/30">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-300">Data Points:</span>
                        <span className="text-white font-semibold">{comparisonData.length}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Export Options */}
              <Card className="bg-zinc-900 border-zinc-800 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="pt-6">
                  <HeroButton 
                    className="w-full bg-green-600 hover:bg-green-700 text-white hover:scale-105 transition-all duration-300"
                    disabled={comparisonData.length === 0}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Comparison
                  </HeroButton>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Main Content */}
            <div className={`xl:col-span-3 transition-all duration-1400 delay-500 ${
              isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <Card className="bg-zinc-900 border-zinc-800 hover:border-indigo-500/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart3 className="h-6 w-6 mr-2 text-indigo-400" />
                      Comparison Visualization
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-indigo-600/20 text-indigo-300 border-indigo-500/30">
                        {getVariableLabel()} Analysis
                      </Badge>
                      <Button size="sm" variant="ghost" className="text-indigo-400 hover:text-white">
                        <TrendingUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-8">
                    {/* Main Comparison Chart */}
                    <div className="h-[400px] w-full">
                      {comparisonData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={comparisonData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis 
                              dataKey="depth" 
                              stroke="rgba(255,255,255,0.7)"
                              fontSize={12}
                              label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#a1a1aa' } }}
                            />
                            <YAxis 
                              stroke="rgba(255,255,255,0.7)"
                              fontSize={12}
                              label={{ value: `${getVariableLabel()} (${getVariableUnit()})`, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#a1a1aa' } }}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(9, 9, 11, 0.8)', 
                                border: '1px solid rgba(99, 102, 241, 0.3)',
                                borderRadius: '8px'
                              }}
                              labelStyle={{ color: '#fff' }}
                            />
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
                            <div className="w-16 h-16 mx-auto bg-indigo-600 rounded-full flex items-center justify-center mb-6">
                              <GitCompare className="h-8 w-8 text-white animate-bounce" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                              Ready to Compare
                            </h3>
                            <p className="text-zinc-300 max-w-md mx-auto">
                              Select two different floats to compare their data and discover oceanographic patterns.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Statistical Comparison */}
                    {comparisonData.length > 0 && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="bg-zinc-950 border-blue-500/30">
                          <CardHeader>
                            <CardTitle className="text-white flex items-center">
                              <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
                              Statistical Comparison
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={prepareStatisticalData()}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                  <XAxis dataKey="metric" stroke="rgba(255,255,255,0.7)" fontSize={10} />
                                  <YAxis stroke="rgba(255,255,255,0.7)" fontSize={10} />
                                  <Tooltip 
                                    contentStyle={{
                                      backgroundColor: 'rgba(9, 9, 11, 0.8)',
                                      border: '1px solid rgba(59, 130, 246, 0.3)',
                                      borderRadius: '8px'
                                    }}
                                  />
                                  <Legend />
                                  <Bar dataKey={currentFloat1?.wmo_id} fill="#6366f1" name={`Float ${currentFloat1?.wmo_id}`} />
                                  <Bar dataKey={currentFloat2?.wmo_id} fill="#3b82f6" name={`Float ${currentFloat2?.wmo_id}`} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-zinc-950 border-green-500/30">
                          <CardHeader>
                            <CardTitle className="text-white flex items-center">
                              <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                              Difference Analysis
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={comparisonData}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                  <XAxis dataKey="depth" stroke="rgba(255,255,255,0.7)" fontSize={10} />
                                  <YAxis stroke="rgba(255,255,255,0.7)" fontSize={10} />
                                  <Tooltip 
                                    contentStyle={{
                                      backgroundColor: 'rgba(9, 9, 11, 0.8)',
                                      border: '1px solid rgba(34, 197, 94, 0.3)',
                                      borderRadius: '8px'
                                    }}
                                  />
                                  <Area 
                                    type="monotone" 
                                    dataKey="difference" 
                                    stroke="#22c55e" 
                                    fill="#22c55e" 
                                    fillOpacity={0.3}
                                    name="Difference"
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                    
                    {/* Data Summary */}
                    {comparisonData.length > 0 && (
                      <Card className="bg-zinc-950 border-zinc-700">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center">
                            <Activity className="h-5 w-5 mr-2 text-indigo-400" />
                            Comparison Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-zinc-900 rounded-lg border border-indigo-500/30">
                              <div className="text-2xl font-bold text-indigo-300">
                                {comparisonData.length}
                              </div>
                              <div className="text-sm text-zinc-300">Data Points</div>
                            </div>
                            <div className="text-center p-3 bg-zinc-900 rounded-lg border border-blue-500/30">
                              <div className="text-2xl font-bold text-blue-300">
                                {Math.abs(comparisonData.reduce((sum, d) => sum + (d.difference || 0), 0) / comparisonData.length).toFixed(2)}
                              </div>
                              <div className="text-sm text-zinc-300">Avg Difference</div>
                            </div>
                            <div className="text-center p-3 bg-zinc-900 rounded-lg border border-green-500/30">
                              <div className="text-2xl font-bold text-green-300">
                                {Math.max(...comparisonData.map(d => Math.abs(d.difference || 0))).toFixed(2)}
                              </div>
                              <div className="text-sm text-zinc-300">Max Difference</div>
                            </div>
                            <div className="text-center p-3 bg-zinc-900 rounded-lg border border-zinc-700">
                              <div className="text-2xl font-bold text-zinc-300">
                                {getVariableUnit()}
                              </div>
                              <div className="text-sm text-zinc-300">Units</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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

export default Compare;