import React, { useState, useEffect } from 'react';
import { GeospatialDashboard } from '@/components/dashboard/GeospatialDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Globe, 
  TrendingUp, 
  Activity, 
  Sparkles,
  Zap,
  Target,
  Brain
} from 'lucide-react';

// Ocean Background Component
const OceanBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="dashboardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
          <stop offset="100%" stopColor="rgba(37, 99, 235, 0.05)" />
        </linearGradient>
      </defs>
      
      <path d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z" fill="rgba(59, 130, 246, 0.05)">
        <animateTransform attributeName="transform" type="translate" values="0,0;50,0;0,0" dur="12s" repeatCount="indefinite"/>
      </path>
      
      <path d="M0,450 C400,350 800,550 1200,450 L1200,800 L0,800 Z" fill="rgba(37, 99, 235, 0.03)">
        <animateTransform attributeName="transform" type="translate" values="0,0;-30,0;0,0" dur="16s" repeatCount="indefinite"/>
      </path>
    </svg>
  </div>
);

// Floating Particles
const FloatingParticles = () => (
  <div className="fixed inset-0 pointer-events-none z-10">
    {Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-bounce"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }}
      />
    ))}
  </div>
);

const Dashboard = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
                  <div className="relative p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-blue-400/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <BarChart3 className="h-8 w-8 text-blue-400" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Advanced Analytics Dashboard
                  </h1>
                  <p className="text-blue-200/80">
                    Comprehensive geospatial analysis and data visualization platform
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30 px-4 py-2 backdrop-blur-sm">
                  <Brain className="h-4 w-4 mr-2 animate-pulse" />
                  AI-Powered Insights
                </Badge>
                <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30 px-4 py-2 backdrop-blur-sm">
                  <Target className="h-4 w-4 mr-2" />
                  Real-time Data
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className={`transition-all duration-1200 delay-300 ${
            isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border-blue-500/30 hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 mx-auto mb-4 text-blue-400 animate-pulse" />
                  <div className="text-3xl font-bold text-white mb-2">Global</div>
                  <div className="text-blue-200">Coverage</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border-green-500/30 hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Activity className="h-12 w-12 mx-auto mb-4 text-green-400 animate-bounce" />
                  <div className="text-3xl font-bold text-white mb-2">Real-time</div>
                  <div className="text-green-200">Processing</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-purple-500/30 hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-purple-400 animate-pulse" />
                  <div className="text-3xl font-bold text-white mb-2">Advanced</div>
                  <div className="text-purple-200">Analytics</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl border-orange-500/30 hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-orange-400 animate-spin" />
                  <div className="text-3xl font-bold text-white mb-2">AI-Powered</div>
                  <div className="text-orange-200">Insights</div>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Component */}
            <GeospatialDashboard />

            {/* Additional Features Section */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl border-indigo-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-indigo-400" />
                    Export Capabilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-200 text-sm leading-relaxed mb-4">
                    Export your data in multiple formats including CSV, ASCII tables, and NetCDF for further analysis.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">CSV</Badge>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">ASCII</Badge>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">NetCDF</Badge>
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">JSON</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-cyan-400" />
                    Visualization Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-cyan-200 text-sm leading-relaxed mb-4">
                    Interactive 2D/3D maps, statistical charts, and comprehensive data tables for complete analysis.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">2D Maps</Badge>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">3D Globe</Badge>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Charts</Badge>
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">Tables</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-500/10 to-red-500/10 backdrop-blur-xl border-pink-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-pink-400" />
                    Smart Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-pink-200 text-sm leading-relaxed mb-4">
                    AI-powered data insights, responsive design, and real-time updates for optimal user experience.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">AI Insights</Badge>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Responsive</Badge>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Real-time</Badge>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Interactive</Badge>
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

export default Dashboard;