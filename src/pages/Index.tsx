import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeroButton } from '@/components/ui/hero-button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Map, LineChart, GitCompare, Activity, MessageSquare, BookOpen, 
  Globe, Zap, ArrowRight, Waves, Eye, Brain, Target, Database,
  Play, Sparkles, TrendingUp
} from 'lucide-react';

// ✨ Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, label, icon: Icon }: any) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const startCount = 0;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;
      
      if (progress < 1) {
        setCount(Math.floor(startCount + (end - startCount) * progress));
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [end, duration]);

  return (
    <div className="text-center group hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-center mb-2">
        <Icon className="h-8 w-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
      </div>
      <div className="text-3xl font-bold text-white mb-1 font-mono">
        {count.toLocaleString()}+
      </div>
      <div className="text-sm text-cyan-200 opacity-80">{label}</div>
    </div>
  );
};

// ✨ Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-cyan-400 rounded-full opacity-20 animate-bounce"
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

// ✨ Animated Ocean Waves SVG
const OceanWaves = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0.1)" />
            <stop offset="100%" stopColor="rgba(8, 145, 178, 0.05)" />
          </linearGradient>
        </defs>
        
        {/* Wave Layer 1 - Fastest */}
        <path
          d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z"
          fill="rgba(6, 182, 212, 0.05)"
          className="animate-pulse"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0;50,0;0,0"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Wave Layer 2 - Medium */}
        <path
          d="M0,450 C400,350 800,550 1200,450 L1200,800 L0,800 Z"
          fill="rgba(8, 145, 178, 0.03)"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0;-30,0;0,0"
            dur="12s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Wave Layer 3 - Slowest */}
        <path
          d="M0,500 C200,400 1000,600 1200,500 L1200,800 L0,800 Z"
          fill="rgba(6, 182, 212, 0.02)"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0;25,0;0,0"
            dur="15s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};

// ✨ Mouse Light Effect
const MouseLightEffect = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.05), transparent 40%)`,
      }}
    />
  );
};

const Index = () => {
  const { t } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      title: 'Explore Floats',
      desc: 'Interactive map showing global Argo float locations with filtering and selection capabilities',
      icon: Map,
      path: '/explore',
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      accent: 'border-green-400',
      hoverGlow: 'hover:shadow-green-500/25'
    },
    {
      title: 'Profile Analysis',
      desc: 'Detailed oceanographic profiles with multi-variable visualization and cycle comparison',
      icon: LineChart,
      path: '/profiles',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      accent: 'border-blue-400',
      hoverGlow: 'hover:shadow-blue-500/25'
    },
    {
      title: 'Float Comparison',
      desc: 'Compare data between different floats using advanced statistical analysis methods',
      icon: GitCompare,
      path: '/compare',
      color: 'bg-gradient-to-br from-purple-500 to-violet-600',
      accent: 'border-purple-400',
      hoverGlow: 'hover:shadow-purple-500/25'
    },
    {
      title: 'Hovmöller Diagrams',
      desc: 'Time-depth analysis showing temporal patterns in oceanographic variables',
      icon: Activity,
      path: '/hovmoller',
      color: 'bg-gradient-to-br from-orange-500 to-red-600',
      accent: 'border-orange-400',
      hoverGlow: 'hover:shadow-orange-500/25'
    },
    {
      title: 'AI Chat Assistant',
      desc: 'Intelligent conversation interface for data queries and oceanographic insights',
      icon: MessageSquare,
      path: '/chat',
      color: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      accent: 'border-cyan-400',
      hoverGlow: 'hover:shadow-cyan-500/25'
    },
    {
      title: 'Analytics Dashboard',
      desc: 'Advanced geospatial visualizations with Plotly, Cesium 3D globe, and comprehensive data export',
      icon: BarChart3,
      path: '/dashboard',
      color: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      accent: 'border-indigo-400',
      hoverGlow: 'hover:shadow-indigo-500/25'
    },
      title: 'Learn & Guide',
      desc: 'Educational resources and tutorials for understanding oceanographic data analysis',
      icon: BookOpen,
      path: '/teachme',
      color: 'bg-gradient-to-br from-pink-500 to-rose-600',
      accent: 'border-pink-400',
      hoverGlow: 'hover:shadow-pink-500/25'
    }
  ];

  const stats = [
    { label: 'Active Floats', value: 3800, icon: Globe },
    { label: 'Data Points', value: 2500000, icon: Database },
    { label: 'Ocean Coverage', value: 90, icon: Waves },
    { label: 'Countries', value: 30, icon: Target }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <OceanWaves />
      <FloatingParticles />
      <MouseLightEffect />
      
      {/* Main Content */}
      <div className="relative z-20">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
          <div className={`text-center max-w-6xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            
            {/* Animated Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                <div className="relative p-6 bg-white/5 backdrop-blur-xl rounded-full border border-cyan-400/20 group-hover:border-cyan-400/40 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <Waves className="h-12 w-12 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                </div>
              </div>
            </div>

            {/* Animated Title */}
            <div className={`transition-all duration-1200 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-600 bg-clip-text text-transparent animate-gradient bg-300% bg-pos-0 hover:bg-pos-100 transition-all duration-1000">
                  FloatChat
                </span>
                <div className="flex items-center justify-center mt-4">
                  <Sparkles className="h-8 w-8 text-cyan-400 mr-4 animate-spin" />
                  <span className="text-2xl md:text-4xl text-slate-300 font-light">
                    Ocean Intelligence
                  </span>
                  <Sparkles className="h-8 w-8 text-cyan-400 ml-4 animate-spin" />
                </div>
              </h1>
            </div>

            {/* Animated Subtitle */}
            <div className={`transition-all duration-1400 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                Discover, analyze, and understand Argo float data through 
                <span className="text-cyan-400 font-semibold"> interactive maps</span>, 
                <span className="text-blue-400 font-semibold"> AI-powered chat</span>, and 
                <span className="text-purple-400 font-semibold"> comprehensive visualizations</span>.
              </p>
            </div>

            {/* Animated CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1600 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <Link to="/explore">
                <HeroButton 
                  size="lg" 
                  className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm border border-cyan-400/20"
                >
                  <Play className="mr-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  Start Exploring
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </HeroButton>
              </Link>
              
              <Link to="/dashboard">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group bg-white/5 backdrop-blur-xl border-indigo-400/30 hover:border-indigo-400/60 text-white hover:text-indigo-300 px-8 py-4 rounded-xl text-lg font-semibold transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                >
                  <BarChart3 className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  View Dashboard
                </Button>
              </Link>
              
              <Link to="/chat">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group bg-white/5 backdrop-blur-xl border-cyan-400/30 hover:border-cyan-400/60 text-white hover:text-cyan-300 px-8 py-4 rounded-xl text-lg font-semibold transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                >
                  <Brain className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Try AI Assistant
                </Button>
              </Link>
            </div>

            {/* Animated Stats */}
            <div className={`mt-20 transition-all duration-1800 delay-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`transition-all duration-500 delay-${(index + 1) * 200}`}
                  >
                    <AnimatedCounter
                      end={stat.value}
                      duration={2000 + index * 200}
                      label={stat.label}
                      icon={stat.icon}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-1 h-16 bg-gradient-to-b from-cyan-400 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 px-6 relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-cyan-500/10 text-cyan-300 border-cyan-500/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                🚀 Powerful Features
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                  Advanced Ocean Analytics
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Jump straight into oceanographic data analysis with our comprehensive suite of 
                visualization and analysis tools designed for researchers and scientists.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Link key={feature.title} to={feature.path}>
                    <Card className={`group relative bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${feature.hoverGlow} hover:shadow-2xl cursor-pointer h-full`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                      
                      <CardHeader className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-xl ${feature.color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                        <CardTitle className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="relative z-10">
                        <p className="text-slate-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                          {feature.desc}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-20 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-purple-500/10 text-purple-300 border-purple-500/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                📊 Simple Process
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                How It Works
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Follow these simple steps to begin your oceanographic data exploration
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Explore & Select",
                  desc: "Start by exploring the global map to see Argo float locations and select floats of interest",
                  icon: Globe,
                  color: "from-green-500 to-emerald-600"
                },
                {
                  step: "02",
                  title: "Analyze & Compare",
                  desc: "Use our analysis tools to examine profiles, compare floats, and create visualizations",
                  icon: TrendingUp,
                  color: "from-blue-500 to-cyan-600"
                },
                {
                  step: "03",
                  title: "Chat & Export",
                  desc: "Chat with our AI assistant for insights or export your findings for further research",
                  icon: MessageSquare,
                  color: "from-purple-500 to-violet-600"
                }
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="text-center group">
                    <div className="relative mb-8">
                      <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}>
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold text-sm group-hover:scale-125 transition-transform duration-300">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="py-20 px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Ready to Dive Deep?
                  </span>
                </h2>
                <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                  Join thousands of researchers and scientists using our platform for oceanographic analysis
                </p>
                <Link to="/explore">
                  <HeroButton 
                    size="lg" 
                    className="group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-10 py-5 rounded-xl text-xl font-semibold shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                  >
                    <Zap className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    Start Your Ocean Journey
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </HeroButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
