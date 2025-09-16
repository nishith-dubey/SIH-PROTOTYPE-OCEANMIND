import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Database,
  Shield,
  MessageSquare,
  TrendingUp,
  Thermometer,
  Droplets,
  Activity,
  Anchor,
  Navigation,
  Satellite,
  Waves,
  Server,
  Brain,
  Eye,
  GraduationCap,
  Info,
} from 'lucide-react';

import VideoBackground from './VideoBackground';

const OceanBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/90 via-black to-zinc-950/90">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(79,70,229,0.05),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(79,70,229,0.05),transparent_40%)]" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-indigo-600/5 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-600/5 rounded-full filter blur-3xl animate-pulse animation-delay-4000" />
    </div>
  </div>
);

const Index = () => {
  const [selectedParameter, setSelectedParameter] = useState('temperature');
  const [currentStep, setCurrentStep] = useState(0);

  const features = [
    {
      icon: MessageSquare,
      title: 'AI-Powered Analysis',
      desc: 'Advanced machine learning algorithms provide real-time insights from complex oceanographic datasets.',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: Database,
      title: 'Global ARGO Network',
      desc: 'Access to 4,000+ autonomous floats collecting high-resolution ocean profiles worldwide.',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      desc: 'SOC 2 compliant platform with end-to-end encryption for sensitive research data.',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: TrendingUp,
      title: 'Predictive Modeling',
      desc: 'Climate trend analysis and forecasting using state-of-the-art oceanographic models.',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  const parameters = [
    {
      id: 'temperature',
      name: 'Temperature',
      icon: Thermometer,
      unit: '°C',
      range: '-2 to 35',
      accuracy: '±0.002°C',
      desc: 'High-precision temperature measurements critical for climate monitoring and marine ecosystem analysis.',
      tip: 'Temperature profiles reveal ocean layer structure and heat content distribution.',
    },
    {
      id: 'salinity',
      name: 'Salinity',
      icon: Droplets,
      unit: 'PSU',
      range: '2 to 41',
      accuracy: '±0.01 PSU',
      desc: 'Conductivity-derived salinity measurements essential for ocean circulation and water mass identification.',
      tip: 'Salinity changes indicate freshwater inputs and evaporation patterns.',
    },
    {
      id: 'pressure',
      name: 'Pressure',
      icon: Activity,
      unit: 'dbar',
      range: '0 to 2000',
      accuracy: '±2.4 dbar',
      desc: 'Precise depth measurements enabling accurate vertical profiling and geostrophic calculations.',
      tip: 'Pressure data enables precise depth calculation and density computations.',
    },
  ];

  const argoSteps = [
    { icon: Anchor, title: 'Deployment', desc: 'Research vessels deploy floats at strategic locations across global ocean basins.' },
    { icon: Navigation, title: 'Drift Phase', desc: 'Floats drift at 1000m depth for 9-10 days, following deep ocean currents.' },
    { icon: TrendingUp, title: 'Profile Ascent', desc: 'Autonomous ascent to surface while measuring temperature, salinity, and pressure.' },
    { icon: Satellite, title: 'Data Transmission', desc: 'Real-time satellite communication transmits profile data to global data centers.' },
    { icon: Database, title: 'Quality Control', desc: 'Automated and manual QC procedures ensure data accuracy and scientific integrity.' },
  ];

  const processSteps = [
    { icon: Waves, title: 'Data Acquisition', desc: 'Autonomous floats collect high-resolution profiles every 10 days.' },
    { icon: Server, title: 'Real-time Processing', desc: 'Advanced algorithms process and validate incoming data streams.' },
    { icon: Brain, title: 'AI Enhancement', desc: 'ML models enhance data quality and extract meaningful patterns.' },
    { icon: Eye, title: 'Scientific Insights', desc: 'Researchers access processed data through intuitive interfaces.' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % processSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black/10 text-white relative overflow-hidden">
      <OceanBackground />
      <VideoBackground />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge className="bg-zinc-900/80 text-white border-zinc-700/50 px-4 py-2">
              <Waves className="w-4 h-4 mr-2 text-indigo-400" />
              Advanced Ocean Data Analytics Platform
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Ocean Intelligence Platform
            </h1>

            <p className="text-xl text-zinc-300 leading-relaxed max-w-3xl mx-auto">
              Enterprise-grade oceanographic data analysis powered by AI. Access real-time ARGO float networks, advanced modeling capabilities, and collaborative research tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 h-auto text-lg font-semibold">
                Start Analysis
              </Button>
              <Button variant="outline" size="lg" className="text-white border-zinc-700 px-8 py-4 h-auto text-lg font-semibold hover:bg-white hover:text-black">
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">Enterprise Capabilities</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Parameters Section */}
      <section className="relative z-10 py-24 bg-zinc-950/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">Core Oceanographic Parameters</h2>

          <Tabs value={selectedParameter} onValueChange={setSelectedParameter}>
            <TabsList className="grid w-full grid-cols-3 bg-zinc-900 border-zinc-800">
              {parameters.map((param) => (
                <TabsTrigger key={param.id} value={param.id} className="text-white">
                  <param.icon className="w-4 h-4 mr-2" />
                  {param.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {parameters.map((param) => (
              <TabsContent key={param.id} value={param.id}>
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-white">{param.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-400">{param.desc}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ARGO Lifecycle Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">ARGO Float Lifecycle</h2>

          <div className="grid md:grid-cols-5 gap-8">
            {argoSteps.map((step, index) => (
              <Card key={index} className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <step.icon className="w-6 h-6 text-indigo-400" />
                  <CardTitle className="text-white">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
