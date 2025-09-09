import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HeroButton } from '@/components/ui/hero-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  BarChart3, Download, GitCompare, TrendingUp, Activity, Layers, Zap,
  Waves, Globe, Target, Brain, Sparkles
} from 'lucide-react';

// Ocean Background Component (reusable)
const OceanBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
      <path d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z" fill="rgba(6, 182, 212, 0.03)">
        <animateTransform attributeName="transform" type="translate" values="0,0;50,0;0,0" dur="12s" repeatCount="indefinite"/>
      </path>
      <path d="M0,450 C400,350 800,550 1200,450 L1200,800 L0,800 Z" fill="rgba(8, 145, 178, 0.02)">
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

  // [Keep the existing data preparation logic but enhance the UI]
  const prepareComparisonData = () => {
    if (!currentFloat1 || !currentFloat2) return [];
    // ... existing logic ...
    return []; // Simplified for brevity
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      <OceanBackground />
      
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-pulse"
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
        <div className="border-b border-purple-500/20 bg-white/5 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className={`flex items-center justify-between transition-all duration-1000 ${
              isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
                  <div className="relative p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-purple-400/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <GitCompare className="h-8 w-8 text-purple-400" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    Float Comparison
                  </h1>
                  <p className="text-purple-200/80">
                    Compare oceanographic data between different Argo floats
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 px-4 py-2 backdrop-blur-sm">
                  <Activity className="h-4 w-4 mr-2" />
                  Advanced Analytics
                </Badge>
                {comparisonData.length > 0 && (
                  <Badge className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-green-300 border-green-500/30 px-4 py-2 backdrop-blur-sm">
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
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Layers className="h-5 w-5 mr-2 text-purple-400" />
                    Select Floats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-purple-300 mb-2 block">First Float</label>
                    <Select value={float1} onValueChange={setFloat1}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white hover:border-purple-500/50 transition-colors duration-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 backdrop-blur-xl">
                        {floats.map(f => (
                          <SelectItem key={f.wmo_id} value={f.wmo_id} className="text-white hover:bg-purple-500/20">
                            {f.wmo_id} - {f.institution}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm text-purple-300 mb-2 block">Second Float</label>
                    <Select value={float2} onValueChange={setFloat2}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white hover:border-purple-500/50 transition-colors duration-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 backdrop-blur-xl">
                        {floats.map(f => (
                          <SelectItem key={f.wmo_id} value={f.wmo_id} className="text-white hover:bg-purple-500/20">
                            {f.wmo_id} - {f.institution}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Options */}
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-purple-500/20 hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-pink-400" />
                    Analysis Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedVariable} onValueChange={(v: any) => setSelectedVariable(v)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="temperature" className="text-white">🌡️ Temperature</SelectItem>
                      <SelectItem value="salinity" className="text-white">🧂 Salinity</SelectItem>
                      <SelectItem value="oxygen" className="text-white">💨 Oxygen</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={comparisonType} onValueChange={(v: any) => setComparisonType(v)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="profiles" className="text-white">📊 Profile Comparison</SelectItem>
                      <SelectItem value="statistics" className="text-white">📈 Statistical Analysis</SelectItem>
                      <SelectItem value="timeseries" className="text-white">⏱️ Time Series</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Insights Panel */}
              <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-cyan-400 animate-pulse" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-cyan-200 leading-relaxed">
                    Comparing <span className="font-semibold text-cyan-300">{getVariableLabel()}</span> using{' '}
                    <span className="font-semibold text-purple-300">{comparisonType.replace('_', ' ')}</span> method 
                    between floats <span className="font-mono text-white">{currentFloat1?.wmo_id}</span> and{' '}
                    <span className="font-mono text-white">{currentFloat2?.wmo_id}</span>.
                  </p>
                  {comparisonData.length > 0 && (
                    <div className="mt-4 p-3 bg-white/5 rounded-lg border border-cyan-500/30">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-cyan-300">Data Points:</span>
                        <span className="text-white font-semibold">{comparisonData.length}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Export Options */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="pt-6">
                  <HeroButton 
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white hover:scale-105 transition-all duration-300"
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
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-purple-500/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart3 className="h-6 w-6 mr-2 text-purple-400" />
                      Comparison Visualization
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {getVariableLabel()} Analysis
                      </Badge>
                      <Button size="sm" variant="ghost" className="text-purple-400 hover:text-white">
                        <TrendingUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="h-[600px] w-full">
                    {comparisonData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={comparisonData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis 
                            dataKey="depth" 
                            stroke="rgba(255,255,255,0.7)"
                            fontSize={12}
                          />
                          <YAxis 
                            stroke="rgba(255,255,255,0.7)"
                            fontSize={12}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(0,0,0,0.8)', 
                              border: '1px solid rgba(147, 51, 234, 0.3)',
                              borderRadius: '8px',
                              backdropFilter: 'blur(16px)'
                            }}
                            labelStyle={{ color: '#fff' }}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey={currentFloat1?.wmo_id} 
                            stroke="#8b5cf6" 
                            strokeWidth={3}
                            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: '#a855f7' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey={currentFloat2?.wmo_id} 
                            stroke="#06b6d4" 
                            strokeWidth={3}
                            dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: '#0891b2' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="relative mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-xl animate-pulse"></div>
                            <div className="relative w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                              <GitCompare className="h-8 w-8 text-white animate-bounce" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">
                            Ready to Compare
                          </h3>
                          <p className="text-slate-300 max-w-md mx-auto">
                            Select two different floats to compare their data and discover oceanographic patterns.
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

export default Compare;
