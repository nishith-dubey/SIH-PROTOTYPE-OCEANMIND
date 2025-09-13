import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Globe, 
  BarChart3, 
  Shield, 
  Users, 
  FileText, 
  ArrowRight,
  CheckCircle,
  Bell,
  Calendar,
  Download,
  Waves,
  MessageSquare,
  TrendingUp,
  Zap,
  BookOpen,
  Eye,
  PlayCircle,
  Thermometer,
  Droplets,
  Wind,
  Activity,
  Target,
  Brain,
  Sparkles,
  Award,
  GraduationCap,
  Info,
  Clock,
  XCircle,
  AlertCircle,
  Languages,
  ChevronRight,
  Anchor,
  Compass,
  MapPin
} from 'lucide-react';

// Ocean Background Component
const OceanBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.1)" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0.05)" />
        </linearGradient>
      </defs>
      
      <path d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z" fill="hsl(var(--primary) / 0.05)">
        <animateTransform attributeName="transform" type="translate" values="0,0;50,0;0,0" dur="20s" repeatCount="indefinite"/>
      </path>
      
      <path d="M0,450 C400,350 800,550 1200,450 L1200,800 L0,800 Z" fill="hsl(var(--primary) / 0.03)">
        <animateTransform attributeName="transform" type="translate" values="0,0;-30,0;0,0" dur="25s" repeatCount="indefinite"/>
      </path>
      
      <path d="M0,500 C200,400 1000,600 1200,500 L1200,800 L0,800 Z" fill="hsl(var(--accent) / 0.02)">
        <animateTransform attributeName="transform" type="translate" values="0,0;25,0;0,0" dur="30s" repeatCount="indefinite"/>
      </path>
    </svg>
  </div>
);

// Floating Data Points
const FloatingDataPoints = () => (
  <div className="fixed inset-0 pointer-events-none z-10">
    {Array.from({ length: 15 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-accent/30 rounded-full animate-bounce"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 2}s`
        }}
      />
    ))}
  </div>
);

const Index = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [activeTeachTab, setActiveTeachTab] = useState('basics');

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden overflow-y-auto">
      <OceanBackground />
      <FloatingDataPoints />
      
      <div className="relative z-20">
        {/* Hero Section with Ocean Theme */}
        <section className="gov-header text-primary-foreground py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${
              isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="relative p-4 bg-primary-foreground/10 backdrop-blur-sm rounded-full border border-primary-foreground/20">
                    <Anchor className="h-12 w-12 text-accent" />
                  </div>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                AquaScope Pro
              </h1>
              <p className="text-xl md:text-2xl mb-4 opacity-90 leading-relaxed">
                AI-Powered Ocean Data Platform
              </p>
              <p className="text-lg mb-12 opacity-80 max-w-3xl mx-auto leading-relaxed">
                Unlock the secrets of our oceans with advanced ARGO float data analysis, 
                real-time visualization, and AI-assisted insights for marine research and policy making.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
                  <Link to="/explore" className="flex items-center justify-center">
                    <PlayCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                    <span>Start Exploring</span>
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-accent/80 text-accent bg-accent/10 hover:bg-accent/20 hover:text-accent text-lg px-8 py-6">
                  <Link to="/chat" className="flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 mr-3 flex-shrink-0" />
                    <span>Ask AI Assistant</span>
                  </Link>
                </Button>
              </div>
              
              {/* Value Propositions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Real-time AI Analysis</h3>
                    <p className="text-sm opacity-80">Get instant insights from ocean data with our advanced AI chatbot</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                    <Globe className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Global Ocean Data</h3>
                    <p className="text-sm opacity-80">Access comprehensive ARGO float data from oceans worldwide</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Government Grade</h3>
                    <p className="text-sm opacity-80">Secure, certified platform for official research and policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Stats with Animation */}
        <section className="py-16 bg-card relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1200 delay-300 ${
              isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              {[
                { value: '10,000+', label: 'Active Floats', icon: Waves, color: 'text-blue-600' },
                { value: '5M+', label: 'Data Points', icon: Database, color: 'text-green-600' },
                { value: '150+', label: 'Countries', icon: Globe, color: 'text-purple-600' },
                { value: '24/7', label: 'Data Access', icon: Clock, color: 'text-orange-600' },
              ].map((stat, idx) => (
                <Card key={idx} className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer - Platform Capabilities */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">What AquaScope Pro Offers</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything you need for ocean data analysis, from beginners to advanced researchers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: MessageSquare,
                  title: 'AI Ocean Assistant',
                  desc: 'Ask questions in natural language and get instant visualizations and analysis',
                  link: '/chat',
                  color: 'bg-blue-500'
                },
                {
                  icon: BarChart3,
                  title: 'Interactive Dashboards',
                  desc: 'Explore temperature, salinity, and oxygen profiles with advanced visualization tools',
                  link: '/analytics',
                  color: 'bg-green-500'
                },
                {
                  icon: Globe,
                  title: '3D Ocean Explorer',
                  desc: 'Navigate ocean data in immersive 3D maps with real-time float tracking',
                  link: '/explore',
                  color: 'bg-purple-500'
                },
                {
                  icon: TrendingUp,
                  title: 'Research Analytics',
                  desc: 'Advanced statistical analysis and reporting for scientific publications',
                  link: '/dashboard',
                  color: 'bg-orange-500'
                },
                {
                  icon: Download,
                  title: 'Data Export & APIs',
                  desc: 'Download datasets in multiple formats or integrate via our REST APIs',
                  link: '/provenance',
                  color: 'bg-pink-500'
                },
                {
                  icon: Bell,
                  title: 'Smart Alerts',
                  desc: 'Get notified about new data, unusual patterns, or research opportunities',
                  link: '/dashboard',
                  color: 'bg-cyan-500'
                }
              ].map((feature, idx) => (
                <Card key={idx} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-8">
                    <Link to={feature.link}>
                      <div className={`w-16 h-16 ${feature.color} rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{feature.desc}</p>
                      <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform">
                        <span className="text-sm font-medium">Learn more</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Integrated Teach Me Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold mb-6">Learn Ocean Science</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                New to oceanography? Start here! Learn about ARGO floats, ocean data, and how to interpret the science.
              </p>
            </div>
            
            <Tabs value={activeTeachTab} onValueChange={setActiveTeachTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto">
                <TabsTrigger value="basics">Ocean Basics</TabsTrigger>
                <TabsTrigger value="floats">ARGO Floats</TabsTrigger>
                <TabsTrigger value="data">Data Quality</TabsTrigger>
                <TabsTrigger value="analysis">Analysis Tips</TabsTrigger>
              </TabsList>

              <TabsContent value="basics" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Thermometer,
                      title: 'Temperature',
                      desc: 'Ocean temperature affects weather patterns, sea level, and marine life distribution.',
                      color: 'bg-red-500',
                      tip: 'Look for thermoclines - rapid temperature changes with depth',
                      ranges: { surface: '25°C', deep: '2°C', range: '0-30°C' },
                      interactive: 'temperature'
                    },
                    {
                      icon: Droplets,
                      title: 'Salinity',
                      desc: 'Salt content determines water density and ocean circulation patterns worldwide.',
                      color: 'bg-blue-500',
                      tip: 'Higher salinity = denser water that tends to sink',
                      ranges: { surface: '35 PSU', deep: '35 PSU', range: '30-40 PSU' },
                      interactive: 'salinity'
                    },
                    {
                      icon: Wind,
                      title: 'Dissolved Oxygen',
                      desc: 'Essential for marine life, indicates ocean health and biological productivity.',
                      color: 'bg-green-500',
                      tip: 'Low oxygen zones affect marine ecosystems significantly',
                      ranges: { surface: '250 μmol/kg', deep: '180 μmol/kg', range: '0-300 μmol/kg' },
                      interactive: 'oxygen'
                    }
                  ].map((param, idx) => {
                    const [hovered, setHovered] = React.useState(false);
                    const [selectedDepth, setSelectedDepth] = React.useState(0);
                    
                    const getValueAtDepth = (depth: number) => {
                      if (param.interactive === 'temperature') {
                        return (25 - (depth / 2000) * 23).toFixed(1) + '°C';
                      } else if (param.interactive === 'salinity') {
                        return (35 + Math.sin(depth / 500) * 2).toFixed(1) + ' PSU';
                      } else {
                        return Math.max(50, 250 - (depth / 2000) * 200).toFixed(0) + ' μmol/kg';
                      }
                    };
                    
                    return (
                      <Card key={idx} className="hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}>
                        <CardContent className="p-6">
                          <div className={`w-12 h-12 ${param.color} rounded-lg mb-4 flex items-center justify-center transition-all duration-300 ${hovered ? 'scale-110 shadow-lg' : ''}`}>
                            <param.icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold mb-3">{param.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{param.desc}</p>
                          
                          {/* Interactive Depth Slider */}
                          <div className={`transition-all duration-500 overflow-hidden ${hovered ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="bg-muted/30 p-3 rounded-lg mb-3 border border-dashed border-accent/30">
                              <div className="flex items-center justify-between text-xs mb-2">
                                <span>Surface (0m)</span>
                                <span className="font-mono font-bold text-accent">{getValueAtDepth(selectedDepth)}</span>
                                <span>Deep (2000m)</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="2000"
                                value={selectedDepth}
                                onChange={(e) => setSelectedDepth(Number(e.target.value))}
                                className="w-full h-2 bg-accent/20 rounded-lg appearance-none cursor-pointer"
                                style={{
                                  background: `linear-gradient(to right, ${param.color.replace('bg-', '')} 0%, ${param.color.replace('bg-', '')} ${(selectedDepth/2000)*100}%, #e2e8f0 ${(selectedDepth/2000)*100}%, #e2e8f0 100%)`
                                }}
                              />
                              <div className="text-xs text-center mt-1 text-muted-foreground">
                                Depth: {selectedDepth}m
                              </div>
                            </div>
                          </div>
                          
                          {/* Typical Values */}
                          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                            <div className="bg-muted/20 p-2 rounded text-center">
                              <div className="text-muted-foreground">Surface</div>
                              <div className="font-semibold">{param.ranges.surface}</div>
                            </div>
                            <div className="bg-muted/20 p-2 rounded text-center">
                              <div className="text-muted-foreground">Deep Ocean</div>
                              <div className="font-semibold">{param.ranges.deep}</div>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-accent/10 rounded-lg">
                            <div className="flex items-start space-x-2">
                              <Zap className="h-4 w-4 text-accent mt-0.5" />
                              <p className="text-xs text-foreground font-medium">{param.tip}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="floats" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="p-8">
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Waves className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">What are ARGO Floats?</h3>
                    </div>
                    <div className="space-y-4 text-muted-foreground">
                      <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-950/30 transition-colors cursor-pointer group">
                        <div className="text-2xl group-hover:scale-110 transition-transform">🌊</div>
                        <div>
                          <p className="font-semibold text-foreground">Autonomous robots</p>
                          <p className="text-sm">that drift with ocean currents</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-950/30 transition-colors cursor-pointer group">
                        <div className="text-2xl group-hover:scale-110 transition-transform">📍</div>
                        <div>
                          <p className="font-semibold text-foreground">Profile the ocean</p>
                          <p className="text-sm">from 2000m depth to surface</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-950/30 transition-colors cursor-pointer group">
                        <div className="text-2xl group-hover:scale-110 transition-transform">📡</div>
                        <div>
                          <p className="font-semibold text-foreground">Send data via satellite</p>
                          <p className="text-sm">every 10 days</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-950/30 transition-colors cursor-pointer group">
                        <div className="text-2xl group-hover:scale-110 transition-transform">🔋</div>
                        <div>
                          <p className="font-semibold text-foreground">Operate for 4-5 years</p>
                          <p className="text-sm">collecting continuous data</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-cyan-50 dark:bg-cyan-950/20 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-950/30 transition-colors cursor-pointer group">
                        <div className="text-2xl group-hover:scale-110 transition-transform">🌍</div>
                        <div>
                          <p className="font-semibold text-foreground">4000+ floats worldwide</p>
                          <p className="text-sm">creating a global network</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-8">
                    {(() => {
                      const [currentStep, setCurrentStep] = React.useState(0);
                      const [isPlaying, setIsPlaying] = React.useState(false);
                      const [floatDepth, setFloatDepth] = React.useState(0);
                      
                      const steps = [
                        { step: 1, desc: 'Float descends to 1000m, drifts for ~9 days', icon: '⬇️', depth: 1000, color: 'bg-blue-500' },
                        { step: 2, desc: 'Descends further to 2000m depth', icon: '🕳️', depth: 2000, color: 'bg-indigo-600' },
                        { step: 3, desc: 'Ascends slowly, measuring T/S/O2', icon: '📈', depth: 1000, color: 'bg-green-500' },
                        { step: 4, desc: 'Surfaces and transmits data via satellite', icon: '📡', depth: 0, color: 'bg-purple-500' },
                        { step: 5, desc: 'Repeats cycle every 10 days', icon: '🔄', depth: 0, color: 'bg-cyan-500' }
                      ];
                      
                      React.useEffect(() => {
                        let interval: NodeJS.Timeout;
                        if (isPlaying) {
                          interval = setInterval(() => {
                            setCurrentStep((prev) => (prev + 1) % steps.length);
                          }, 2000);
                        }
                        return () => clearInterval(interval);
                      }, [isPlaying]);
                      
                      React.useEffect(() => {
                        setFloatDepth(steps[currentStep]?.depth || 0);
                      }, [currentStep]);
                      
                      return (
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold">The ARGO Cycle</h3>
                            <Button 
                              size="sm" 
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="bg-primary hover:bg-primary/90"
                            >
                              <PlayCircle className="h-4 w-4 mr-2" />
                              {isPlaying ? 'Pause' : 'Play'} Animation
                            </Button>
                          </div>
                          
                          {/* Ocean Depth Visualization */}
                          <div className="relative bg-gradient-to-b from-blue-200 via-blue-400 to-blue-900 h-48 rounded-lg mb-6 overflow-hidden">
                            <div className="absolute inset-0">
                              {/* Ocean layers */}
                              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-blue-100 to-blue-200 opacity-80" />
                              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-blue-950 to-blue-900 opacity-80" />
                              
                              {/* Depth markers */}
                              <div className="absolute left-2 top-4 text-xs text-white font-mono">0m Surface</div>
                              <div className="absolute left-2 top-1/2 text-xs text-white font-mono">1000m</div>
                              <div className="absolute left-2 bottom-4 text-xs text-white font-mono">2000m Deep</div>
                              
                              {/* Animated Float */}
                              <div 
                                className={`absolute w-6 h-6 rounded-full ${steps[currentStep]?.color || 'bg-yellow-400'} border-2 border-white shadow-lg transition-all duration-1000 flex items-center justify-center text-xs`}
                                style={{
                                  left: '50%',
                                  transform: `translate(-50%, ${(floatDepth / 2000) * 180 + 10}px)`,
                                }}
                              >
                                {steps[currentStep]?.icon || '🔵'}
                              </div>
                              
                              {/* Data transmission waves */}
                              {currentStep === 3 && (
                                <div className="absolute top-2 right-4">
                                  <div className="animate-ping absolute w-3 h-3 bg-yellow-400 rounded-full opacity-75"></div>
                                  <div className="animate-pulse w-3 h-3 bg-yellow-300 rounded-full"></div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Step Indicators */}
                          <div className="space-y-3">
                            {steps.map((item, idx) => (
                              <div 
                                key={idx} 
                                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                                  idx === currentStep 
                                    ? 'bg-primary/20 border-2 border-primary scale-105 shadow-md' 
                                    : 'bg-muted/50 hover:bg-muted border border-transparent'
                                }`}
                                onClick={() => setCurrentStep(idx)}
                              >
                                <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${
                                  idx === currentStep ? 'scale-110 shadow-lg' : ''
                                }`}>
                                  {item.step}
                                </div>
                                <div className="flex-1">
                                  <span className="text-lg mr-3">{item.icon}</span>
                                  <span className={`text-sm transition-colors ${
                                    idx === currentStep ? 'font-semibold text-foreground' : 'text-muted-foreground'
                                  }`}>{item.desc}</span>
                                </div>
                                {idx === currentStep && (
                                  <div className="text-primary animate-pulse">
                                    <Activity className="h-4 w-4" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {/* Current Status */}
                          <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
                            <div className="flex items-center space-x-2 text-sm">
                              <Target className="h-4 w-4 text-accent" />
                              <span className="font-medium">Current Depth: {floatDepth}m</span>
                              <span className="text-muted-foreground">| Step {currentStep + 1} of 5</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="data" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      flag: '1', 
                      label: 'Good Data', 
                      desc: 'Passed all quality tests', 
                      color: 'bg-green-500', 
                      icon: CheckCircle,
                      example: 'Clean, consistent measurements',
                      sampleValue: '15.24°C',
                      pattern: 'smooth'
                    },
                    { 
                      flag: '2', 
                      label: 'Probably Good', 
                      desc: 'Minor quality concerns', 
                      color: 'bg-blue-500', 
                      icon: Info,
                      example: 'Slight sensor drift detected',
                      sampleValue: '15.26°C',
                      pattern: 'slight-noise'
                    },
                    { 
                      flag: '3', 
                      label: 'Probably Bad', 
                      desc: 'Some quality issues', 
                      color: 'bg-yellow-500', 
                      icon: AlertCircle,
                      example: 'Anomalous readings detected',
                      sampleValue: '14.89°C',
                      pattern: 'noisy'
                    },
                    { 
                      flag: '4', 
                      label: 'Bad Data', 
                      desc: 'Failed quality tests', 
                      color: 'bg-red-500', 
                      icon: XCircle,
                      example: 'Sensor malfunction evident',
                      sampleValue: 'NaN',
                      pattern: 'error'
                    },
                    { 
                      flag: '8', 
                      label: 'Estimated', 
                      desc: 'Interpolated values', 
                      color: 'bg-purple-500', 
                      icon: TrendingUp,
                      example: 'Calculated from nearby data',
                      sampleValue: '~15.20°C',
                      pattern: 'interpolated'
                    },
                    { 
                      flag: '9', 
                      label: 'Missing', 
                      desc: 'No data available', 
                      color: 'bg-gray-500', 
                      icon: Clock,
                      example: 'Sensor offline or lost',
                      sampleValue: '---',
                      pattern: 'missing'
                    }
                  ].map((item) => {
                    const [showExample, setShowExample] = React.useState(false);
                    
                    const renderPattern = (pattern: string) => {
                      const points = 20;
                      let values = [];
                      
                      for (let i = 0; i < points; i++) {
                        let baseValue = 15 + Math.sin(i * 0.3) * 2;
                        switch (pattern) {
                          case 'smooth':
                            values.push(baseValue);
                            break;
                          case 'slight-noise':
                            values.push(baseValue + (Math.random() - 0.5) * 0.5);
                            break;
                          case 'noisy':
                            values.push(baseValue + (Math.random() - 0.5) * 2);
                            break;
                          case 'error':
                            values.push(i < points/2 ? baseValue : NaN);
                            break;
                          case 'interpolated':
                            values.push(i % 3 === 0 ? NaN : baseValue);
                            break;
                          case 'missing':
                            values.push(NaN);
                            break;
                        }
                      }
                      
                      const maxVal = Math.max(...values.filter(v => !isNaN(v)));
                      const minVal = Math.min(...values.filter(v => !isNaN(v)));
                      const range = maxVal - minVal || 1;
                      
                      return (
                        <div className="w-full h-16 relative bg-muted/20 rounded">
                          <svg className="w-full h-full" viewBox="0 0 100 40">
                            <polyline
                              points={values.map((val, idx) => 
                                isNaN(val) ? null : `${(idx/(points-1))*90 + 5},${35 - ((val - minVal)/range)*25}`
                              ).filter(Boolean).join(' ')}
                              fill="none"
                              stroke={item.color.includes('green') ? '#10b981' : 
                                     item.color.includes('blue') ? '#3b82f6' :
                                     item.color.includes('yellow') ? '#f59e0b' :
                                     item.color.includes('red') ? '#ef4444' :
                                     item.color.includes('purple') ? '#8b5cf6' : '#6b7280'}
                              strokeWidth="1.5"
                              className="transition-all duration-300"
                            />
                            {pattern === 'interpolated' && values.map((val, idx) => 
                              isNaN(val) ? (
                                <circle key={idx} cx={(idx/(points-1))*90 + 5} cy="20" r="1" fill="#8b5cf6" opacity="0.5" />
                              ) : null
                            )}
                          </svg>
                        </div>
                      );
                    };
                    
                    return (
                      <Card key={item.flag} className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                            onClick={() => setShowExample(!showExample)}>
                        <CardContent className="p-6 text-center">
                          <div className={`w-16 h-16 ${item.color} rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <item.icon className="h-8 w-8 text-white" />
                          </div>
                          <div className="mb-2">
                            <Badge className="font-mono text-xs">{item.flag}</Badge>
                          </div>
                          <h3 className="font-semibold mb-2">{item.label}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                          
                          {/* Sample Value */}
                          <div className="text-center mb-3">
                            <div className="text-xs text-muted-foreground">Sample Value</div>
                            <div className={`font-mono text-sm font-bold ${
                              item.flag === '4' ? 'text-red-500' :
                              item.flag === '8' ? 'text-purple-600' :
                              item.flag === '9' ? 'text-gray-500' : 'text-foreground'
                            }`}>
                              {item.sampleValue}
                            </div>
                          </div>
                          
                          {/* Interactive Pattern Visualization */}
                          <div className={`transition-all duration-500 overflow-hidden ${
                            showExample ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                          }`}>
                            <div className="border-t border-dashed border-muted pt-3 mt-3">
                              <div className="text-xs text-muted-foreground mb-2">Data Pattern</div>
                              {renderPattern(item.pattern)}
                              <div className="text-xs text-muted-foreground mt-1">{item.example}</div>
                            </div>
                          </div>
                          
                          <div className="mt-2 text-xs text-muted-foreground opacity-60">
                            Click to see example pattern
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                
                <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                  <div className="flex items-start space-x-4">
                    <Zap className="h-6 w-6 text-yellow-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">Pro Tip for Researchers</h4>
                      <p className="text-yellow-700 text-sm">
                        Always use quality flags! For scientific analysis, prefer flag 1 (Good) data. 
                        In delayed-mode files, look for "_ADJUSTED" variables which have additional quality control.
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Temperature Profiles',
                      icon: Thermometer,
                      color: 'bg-red-500',
                      tips: [
                        'Look for mixed layer at surface (uniform temp)',
                        'Find thermocline (rapid temperature drop)',
                        'Deep water is cold and stable'
                      ],
                      profileType: 'temperature'
                    },
                    {
                      title: 'Salinity Patterns',
                      icon: Droplets,
                      color: 'bg-blue-500',
                      tips: [
                        'Surface salinity shows evaporation/rainfall',
                        'Subsurface maxima indicate water masses',
                        'Haloclines separate different water types'
                      ],
                      profileType: 'salinity'
                    },
                    {
                      title: 'Oxygen Distribution',
                      icon: Wind,
                      color: 'bg-green-500',
                      tips: [
                        'High oxygen at surface from air exchange',
                        'Oxygen minimum zones at mid-depths',
                        'Deep water oxygen from polar regions'
                      ],
                      profileType: 'oxygen'
                    }
                  ].map((guide, idx) => {
                    const [showProfile, setShowProfile] = React.useState(false);
                    const [hoveredTip, setHoveredTip] = React.useState(-1);
                    
                    const generateProfile = (type: string) => {
                      const depths = Array.from({length: 50}, (_, i) => i * 40);
                      let values = [];
                      
                      for (let depth of depths) {
                        switch (type) {
                          case 'temperature':
                            // Typical ocean temperature profile
                            if (depth < 100) values.push(25 - depth * 0.1); // Mixed layer
                            else if (depth < 1000) values.push(24 - (depth - 100) * 0.02); // Thermocline
                            else values.push(6 - (depth - 1000) * 0.002); // Deep water
                            break;
                          case 'salinity':
                            // Typical salinity profile
                            if (depth < 50) values.push(35.5);
                            else if (depth < 200) values.push(35.5 + (depth - 50) * 0.003);
                            else if (depth < 800) values.push(35.8 - (depth - 200) * 0.0005);
                            else values.push(34.7 + Math.sin(depth / 200) * 0.1);
                            break;
                          case 'oxygen':
                            // Typical oxygen profile
                            if (depth < 100) values.push(250 - depth * 0.5);
                            else if (depth < 800) values.push(200 - (depth - 100) * 0.15); // OMZ
                            else values.push(95 + (depth - 800) * 0.05);
                            break;
                        }
                      }
                      
                      const maxVal = Math.max(...values);
                      const minVal = Math.min(...values);
                      const range = maxVal - minVal;
                      
                      const pathData = depths.map((depth, i) => {
                        const x = ((values[i] - minVal) / range) * 80 + 10;
                        const y = (depth / depths[depths.length - 1]) * 80 + 10;
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ');
                      
                      return (
                        <div className="w-full h-48 bg-muted/20 rounded-lg p-4">
                          <div className="text-xs text-muted-foreground mb-2 text-center">
                            {type === 'temperature' ? 'Temperature (°C)' : 
                             type === 'salinity' ? 'Salinity (PSU)' : 'Oxygen (μmol/kg)'}
                          </div>
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            {/* Grid lines */}
                            <defs>
                              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
                              </pattern>
                            </defs>
                            <rect width="100" height="100" fill="url(#grid)" opacity="0.3" />
                            
                            {/* Profile line */}
                            <path
                              d={pathData}
                              fill="none"
                              stroke={guide.color.includes('red') ? '#ef4444' : 
                                     guide.color.includes('blue') ? '#3b82f6' : '#10b981'}
                              strokeWidth="2"
                              className="transition-all duration-300"
                            />
                            
                            {/* Depth axis */}
                            <text x="5" y="15" fontSize="4" fill="#6b7280">0m</text>
                            <text x="5" y="50" fontSize="4" fill="#6b7280">1000m</text>
                            <text x="5" y="90" fontSize="4" fill="#6b7280">2000m</text>
                            
                            {/* Highlight zones based on hovered tip */}
                            {hoveredTip === 0 && type === 'temperature' && (
                              <rect x="10" y="10" width="80" height="15" fill="yellow" opacity="0.3" />
                            )}
                            {hoveredTip === 1 && type === 'temperature' && (
                              <rect x="10" y="25" width="80" height="35" fill="orange" opacity="0.3" />
                            )}
                            {hoveredTip === 2 && type === 'temperature' && (
                              <rect x="10" y="60" width="80" height="30" fill="blue" opacity="0.3" />
                            )}
                            
                            {/* Similar highlighting for other profile types */}
                            {hoveredTip >= 0 && type === 'salinity' && (
                              <rect x="10" y={10 + hoveredTip * 25} width="80" height="20" fill="cyan" opacity="0.2" />
                            )}
                            {hoveredTip >= 0 && type === 'oxygen' && (
                              <rect x="10" y={10 + hoveredTip * 25} width="80" height="20" fill="green" opacity="0.2" />
                            )}
                          </svg>
                        </div>
                      );
                    };
                    
                    return (
                      <Card key={idx} className="hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer"
                            onClick={() => setShowProfile(!showProfile)}>
                        <CardContent className="p-6">
                          <div className={`w-12 h-12 ${guide.color} rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <guide.icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold mb-4">{guide.title}</h3>
                          
                          {/* Interactive Profile Visualization */}
                          <div className={`transition-all duration-500 overflow-hidden mb-4 ${
                            showProfile ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                          }`}>
                            {generateProfile(guide.profileType)}
                            <div className="text-xs text-center text-muted-foreground mt-2">
                              Depth vs {guide.title.split(' ')[0]}
                            </div>
                          </div>
                          
                          <ul className="space-y-2">
                            {guide.tips.map((tip, tipIdx) => (
                              <li key={tipIdx} 
                                  className={`flex items-start space-x-2 text-sm p-2 rounded transition-all duration-200 cursor-pointer ${
                                    hoveredTip === tipIdx ? 'bg-accent/20 scale-102' : 'hover:bg-muted/30'
                                  }`}
                                  onMouseEnter={() => setHoveredTip(tipIdx)}
                                  onMouseLeave={() => setHoveredTip(-1)}>
                                <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 transition-all duration-200 ${
                                  hoveredTip === tipIdx ? 'bg-accent scale-150' : 'bg-primary'
                                }`}></div>
                                <span className={`transition-colors duration-200 ${
                                  hoveredTip === tipIdx ? 'text-foreground font-medium' : 'text-muted-foreground'
                                }`}>{tip}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="mt-4 text-xs text-center text-muted-foreground opacity-60">
                            Click to see profile • Hover tips to highlight zones
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From ocean robots to insights - see how we transform raw data into knowledge
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Data Collection',
                  desc: 'ARGO floats collect temperature, salinity, and oxygen data',
                  icon: Waves,
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  step: '02', 
                  title: 'AI Processing',
                  desc: 'Advanced algorithms process and validate the data in real-time',
                  icon: Brain,
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  step: '03',
                  title: 'Smart Analysis', 
                  desc: 'Machine learning identifies patterns and generates insights',
                  icon: Target,
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  step: '04',
                  title: 'Interactive Results',
                  desc: 'Explore findings through maps, charts, and AI conversations',
                  icon: Eye,
                  color: 'from-orange-500 to-red-500'
                }
              ].map((step, idx) => (
                <Card key={idx} className="text-center group hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{step.step}</div>
                    <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 gov-header text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Explore Our Oceans?</h2>
            <p className="text-xl mb-12 opacity-90 leading-relaxed">
              Join researchers worldwide in understanding our planet's ocean systems. 
              Start your journey with real ocean data today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-10 py-6">
                <Link to="/signup" className="flex items-center justify-center">
                  <Users className="h-6 w-6 mr-3 flex-shrink-0" />
                  <span>Create Free Account</span>
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-accent/80 text-accent bg-accent/10 hover:bg-accent/20 hover:text-accent text-lg px-10 py-6">
                <Link to="/explore" className="flex items-center justify-center">
                  <Globe className="h-6 w-6 mr-3 flex-shrink-0" />
                  <span>Explore as Guest</span>
                </Link>
              </Button>
            </div>
            
            <p className="text-sm mt-8 opacity-75">
              No credit card required • Instant access • Used by 1000+ researchers
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-card border-t">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-primary rounded-lg">
                    <Anchor className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">AquaScope Pro</h3>
                    <p className="text-xs text-muted-foreground">Government of India</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Advanced oceanographic data visualization platform developed by the Ministry of Earth Sciences.
                </p>
                <div className="flex space-x-4">
                  <Badge variant="outline" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Secure
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    Certified
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Platform</h4>
                <div className="space-y-2 text-sm">
                  <Link to="/analytics" className="block text-muted-foreground hover:text-primary transition-colors">Analytics Dashboard</Link>
                  <Link to="/chat" className="block text-muted-foreground hover:text-primary transition-colors">AI Assistant</Link>
                  <Link to="/explore" className="block text-muted-foreground hover:text-primary transition-colors">3D Explorer</Link>
                  <Link to="/dashboard" className="block text-muted-foreground hover:text-primary transition-colors">Data Portal</Link>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>📧 support@aquascope.gov.in</p>
                  <p>🏛️ policy@moes.gov.in</p>
                  <p>📞 1800-XXX-XXXX (Toll Free)</p>
                  <p>🕒 24/7 Technical Support</p>
                </div>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 Ministry of Earth Sciences, Government of India. All rights reserved.</p>
              <p className="mt-2">Powered by ARGO Global Ocean Observing System</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
