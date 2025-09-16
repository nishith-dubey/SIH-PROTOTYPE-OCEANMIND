import React, { useState, useEffect } from 'react';
import { GeospatialDashboard } from '@/components/dashboard/GeospatialDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Database, 
  TrendingUp, 
  Activity, 
  Users, 
  FileText, 
  Shield, 
  Globe, 
  ArrowRight, 
  Zap, 
  Target, 
  Brain, 
  Sparkles,
  Waves,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Clock,
  MapPin,
  Server,
  CloudDownload,
  LineChart,
  PieChart,
  BarChart,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Filter,
  Search,
  Download,
  Share2
} from 'lucide-react';

const Dashboard = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [activeMetric, setActiveMetric] = useState('temperature');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  // Real-time data simulation
  const [realtimeData, setRealtimeData] = useState({
    activeFloats: 3847,
    dataPoints: 125672,
    coverage: 94.2,
    quality: 97.8,
    alerts: 3,
    regions: 12
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => ({
        ...prev,
        dataPoints: prev.dataPoints + Math.floor(Math.random() * 50),
        coverage: Math.min(99.9, prev.coverage + (Math.random() - 0.5) * 0.1),
        quality: Math.min(99.9, prev.quality + (Math.random() - 0.5) * 0.1)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  // Key metrics with professional styling
  const keyMetrics = [
    {
      title: 'Active ARGO Floats',
      value: realtimeData.activeFloats.toLocaleString(),
      change: '+127',
      changeType: 'positive',
      icon: Database,
      color: 'from-indigo-500 to-indigo-600',
      description: 'Autonomous floats operational globally'
    },
    {
      title: 'Data Coverage',
      value: `${realtimeData.coverage.toFixed(1)}%`,
      change: '+2.3%',
      changeType: 'positive',
      icon: Globe,
      color: 'from-indigo-500 to-indigo-600',
      description: 'Ocean basin sampling coverage'
    },
    {
      title: 'Data Quality Score',
      value: `${realtimeData.quality.toFixed(1)}%`,
      change: '+0.8%',
      changeType: 'positive',
      icon: Shield,
      color: 'from-indigo-500 to-indigo-600',
      description: 'Quality control validation rate'
    },
    {
      title: 'Total Profiles',
      value: realtimeData.dataPoints.toLocaleString(),
      change: '+1,247',
      changeType: 'positive',
      icon: BarChart3,
      color: 'from-indigo-500 to-indigo-600',
      description: 'Temperature-salinity profiles collected'
    }
  ];

  // Ocean parameters with enhanced visuals
  const oceanParameters = [
    {
      id: 'temperature',
      name: 'Temperature',
      icon: Thermometer,
      currentValue: '28.5°C',
      trend: '+0.3°C',
      trendType: 'up',
      distribution: 'Normal distribution across depths',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-900/20'
    },
    {
      id: 'salinity',
      name: 'Salinity',
      icon: Droplets,
      currentValue: '34.8 PSU',
      trend: '+0.1 PSU',
      trendType: 'up',
      distribution: 'Regional variations observed',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20'
    },
    {
      id: 'pressure',
      name: 'Pressure',
      icon: Activity,
      currentValue: '1013.2 dbar',
      trend: 'Stable',
      trendType: 'stable',
      distribution: 'Consistent measurement accuracy',
      color: 'text-green-400',
      bgColor: 'bg-green-900/20'
    },
    {
      id: 'oxygen',
      name: 'Dissolved Oxygen',
      icon: Wind,
      currentValue: '201.5 μmol/kg',
      trend: '-3.2 μmol/kg',
      trendType: 'down',
      distribution: 'OMZ variations detected',
      color: 'text-orange-400',
      bgColor: 'bg-orange-900/20'
    }
  ];

  // Regional data with enhanced styling
  const regionalData = [
    {
      region: 'Arabian Sea',
      temperature: '29.2°C',
      salinity: '35.3 PSU',
      floats: 234,
      status: 'optimal',
      color: 'border-green-500'
    },
    {
      region: 'Bay of Bengal',
      temperature: '29.8°C',
      salinity: '33.7 PSU',
      floats: 198,
      status: 'optimal',
      color: 'border-green-500'
    },
    {
      region: 'Equatorial Indian Ocean',
      temperature: '30.1°C',
      salinity: '34.9 PSU',
      floats: 167,
      status: 'warning',
      color: 'border-yellow-500'
    },
    {
      region: 'Southern Ocean',
      temperature: '12.4°C',
      salinity: '34.1 PSU',
      floats: 145,
      status: 'optimal',
      color: 'border-green-500'
    }
  ];

  // System capabilities with professional descriptions
  const capabilities = [
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: 'Continuous oceanographic parameter tracking with automated quality control and alert systems'
    },
    {
      icon: Brain,
      title: 'AI-Enhanced Analysis',
      description: 'Machine learning algorithms for pattern recognition, anomaly detection, and predictive modeling'
    },
    {
      icon: CloudDownload,
      title: 'Multi-format Export',
      description: 'Export data in CSV, NetCDF, ASCII, and custom formats for research and operational use'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC 2 compliance with encrypted transmission, audit trails, and role-based access control'
    },
    {
      icon: BarChart,
      title: 'Advanced Visualization',
      description: 'Interactive 2D/3D mapping, statistical analysis, and customizable dashboard components'
    },
    {
      icon: Server,
      title: 'Scalable Infrastructure',
      description: 'High-performance computing resources for processing petabytes of oceanographic data'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Ocean Intelligence Dashboard</h1>
              <p className="text-xl text-zinc-400">Comprehensive oceanographic data analysis and visualization</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-900/30 text-green-300 border-green-700/50 px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Live Data
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-700 text-white hover:bg-zinc-800 hover:border-indigo-500"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white border-0"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Data
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 text-white hover:bg-zinc-800 hover:border-indigo-500"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 text-white hover:bg-zinc-800 hover:border-indigo-500"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 text-white hover:bg-zinc-800 hover:border-indigo-500"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric, index) => (
            <Card 
              key={index}
              className={`bg-zinc-900 border-zinc-800 hover:bg-zinc-800 hover:border-indigo-500/50 transition-all duration-300 ${
                isAnimated ? 'animate-in slide-in-from-bottom' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${metric.color} p-2`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge 
                    className={`px-2 py-1 text-xs ${
                      metric.changeType === 'positive' 
                        ? 'bg-green-900/30 text-green-300 border-green-700/50' 
                        : 'bg-red-900/30 text-red-300 border-red-700/50'
                    }`}
                  >
                    {metric.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
                  <p className="text-sm font-medium text-white">{metric.title}</p>
                  <p className="text-xs text-zinc-400">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Geospatial Dashboard - Takes up 2/3 of the width */}
          <div className="lg:col-span-2">
            <Card className="bg-zinc-900 border-zinc-800 h-[600px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-xl flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-indigo-400" />
                    Global Ocean Data Coverage
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-zinc-800 text-zinc-400 border-zinc-700">
                      <Clock className="w-3 h-3 mr-1" />
                      Updated 2 min ago
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[500px]">
                <GeospatialDashboard />
              </CardContent>
            </Card>
          </div>

          {/* Ocean Parameters Panel */}
          <div className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-indigo-400" />
                  Ocean Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {oceanParameters.map((param, index) => (
                  <div 
                    key={param.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      activeMetric === param.id 
                        ? `${param.bgColor} border-indigo-600` 
                        : 'bg-zinc-950 border-zinc-800 hover:bg-zinc-800'
                    }`}
                    onClick={() => setActiveMetric(param.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <param.icon className={`w-4 h-4 ${param.color}`} />
                        <span className="text-white font-medium text-sm">{param.name}</span>
                      </div>
                      <span className="text-white font-bold">{param.currentValue}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400">{param.distribution}</span>
                      <span className={`text-xs font-medium ${
                        param.trendType === 'up' ? 'text-green-400' :
                        param.trendType === 'down' ? 'text-red-400' : 'text-zinc-400'
                      }`}>
                        {param.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <Server className="w-5 h-5 mr-2 text-indigo-400" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">Data Processing</span>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-sm text-green-400">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">Quality Control</span>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-sm text-green-400">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">Data Distribution</span>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-sm text-green-400">Running</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">Alert System</span>
                  <div className="flex items-center">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                    <span className="text-sm text-yellow-400">{realtimeData.alerts} Alerts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Regional Data Overview */}
        <div className="mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center">
                <Globe className="w-5 h-5 mr-2 text-indigo-400" />
                Regional Ocean Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {regionalData.map((region, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg bg-zinc-950 border-2 ${region.color} hover:bg-zinc-800 transition-colors`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-semibold text-sm">{region.region}</h4>
                      <Badge 
                        className={`px-2 py-1 text-xs ${
                          region.status === 'optimal' 
                            ? 'bg-green-900/30 text-green-300 border-green-700/50'
                            : 'bg-yellow-900/30 text-yellow-300 border-yellow-700/50'
                        }`}
                      >
                        {region.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-zinc-400 text-xs">Temperature</span>
                        <span className="text-white text-xs font-mono">{region.temperature}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400 text-xs">Salinity</span>
                        <span className="text-white text-xs font-mono">{region.salinity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400 text-xs">Active Floats</span>
                        <span className="text-white text-xs font-mono">{region.floats}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Capabilities */}
        <div className="mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center">
                <Zap className="w-5 h-5 mr-2 text-indigo-400" />
                Platform Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {capabilities.map((capability, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <capability.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">{capability.title}</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">{capability.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Center */}
        <div className="text-center">
          <Card className="bg-zinc-900/70 border-zinc-800 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Sparkles className="w-6 h-6 text-indigo-400" />
                  <h2 className="text-3xl font-bold text-white">Advanced Ocean Analytics</h2>
                </div>
                <p className="text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto">
                  Harness the power of AI-driven oceanographic analysis. Access real-time data, 
                  advanced visualizations, and predictive models for cutting-edge marine research.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 h-auto text-lg font-semibold"
                  >
                    <Target className="w-5 h-5 mr-2" />
                    Start Analysis
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-zinc-700 text-white hover:bg-zinc-800 hover:border-indigo-500 hover:text-white px-8 py-4 h-auto text-lg font-semibold"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    View Reports
                  </Button>
                </div>
                <div className="flex items-center justify-center space-x-8 pt-6 border-t border-zinc-700">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{realtimeData.activeFloats.toLocaleString()}</div>
                    <div className="text-sm text-zinc-500">Active Sensors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{realtimeData.regions}</div>
                    <div className="text-sm text-zinc-500">Ocean Regions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-sm text-zinc-500">Monitoring</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;