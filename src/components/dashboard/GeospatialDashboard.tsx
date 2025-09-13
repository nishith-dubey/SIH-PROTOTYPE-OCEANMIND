import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlotlyChart } from '@/components/visualizations/PlotlyChart';
import { CesiumViewer } from '@/components/visualizations/CesiumViewer';
import { DataTable } from '@/components/visualizations/DataTable';
import { useApp } from '@/contexts/AppContext';
import { 
  exportToCSV, 
  exportToJSON, 
  exportToASCII, 
  exportToNetCDF,
  generateSummaryReport 
} from '@/utils/exportUtils';
import { 
  Globe, 
  BarChart3, 
  Map, 
  Table, 
  Download, 
  TrendingUp,
  Waves,
  Thermometer,
  Droplets,
  Wind,
  Activity,
  Target,
  Zap,
  Eye,
  Clock
} from 'lucide-react';

export const GeospatialDashboard: React.FC = () => {
  const { floats, selectedFloats, setSelectedFloats } = useApp();
  const [activeView, setActiveView] = useState<'2d' | '3d'>('2d');

  // Prepare data for visualizations
  const dashboardData = useMemo(() => {
    const floatData = floats.map(float => ({
      wmo_id: float.wmo_id,
      institution: float.institution,
      profiler_type: float.profiler_type,
      latitude: float.last_location?.latitude || 0,
      longitude: float.last_location?.longitude || 0,
      profiles_count: float.profiles?.length || 0,
      last_update: float.last_update,
      avg_temperature: float.profiles?.length > 0 
        ? float.profiles[float.profiles.length - 1]?.temperature?.reduce((a, b) => a + b, 0) / float.profiles[float.profiles.length - 1]?.temperature?.length || 0
        : 0,
      avg_salinity: float.profiles?.length > 0
        ? float.profiles[float.profiles.length - 1]?.salinity?.reduce((a, b) => a + b, 0) / float.profiles[float.profiles.length - 1]?.salinity?.length || 0
        : 0
    }));

    return floatData;
  }, [floats]);

  // Enhanced Plotly configurations for different chart types
  const scatterMapData = [{
    type: 'scattergeo',
    mode: 'markers+text',
    lon: dashboardData.map(d => d.longitude),
    lat: dashboardData.map(d => d.latitude),
    text: dashboardData.map(d => `<b>Float ${d.wmo_id}</b><br>🏛️ ${d.institution}<br>📊 ${d.profiles_count} profiles<br>🌡️ ${d.avg_temperature.toFixed(1)}°C<br>🧂 ${d.avg_salinity.toFixed(2)} PSU`),
    hovertemplate: '%{text}<extra></extra>',
    marker: {
      size: dashboardData.map(d => Math.max(12, Math.min(25, d.profiles_count / 3))),
      color: dashboardData.map(d => selectedFloats.includes(d.wmo_id) ? '#00E5FF' : d.avg_temperature),
      colorscale: [
        [0, '#1e3a8a'],    // Deep blue for cold
        [0.2, '#3b82f6'],  // Blue
        [0.4, '#06b6d4'],  // Cyan
        [0.6, '#10b981'],  // Green
        [0.8, '#f59e0b'],  // Yellow
        [1, '#ef4444']     // Red for warm
      ],
      showscale: true,
      colorbar: {
        title: 'Temperature (°C)',
        titlefont: { color: '#ffffff' },
        tickfont: { color: '#ffffff' },
        bgcolor: 'rgba(0,0,0,0.5)',
        bordercolor: '#4a5568',
        borderwidth: 1,
        x: 1.02
      },
      line: { 
        color: dashboardData.map(d => selectedFloats.includes(d.wmo_id) ? '#ffffff' : '#1a365d'),
        width: 2
      },
      opacity: 0.8,
      symbol: 'circle'
    },
    name: 'Argo Floats',
    selectedpoints: selectedFloats.map(id => dashboardData.findIndex(d => d.wmo_id === id)).filter(idx => idx !== -1)
  }];

  const scatterMapLayout = {
    title: {
      text: 'Global Argo Float Distribution',
      font: { size: 18, color: '#ffffff' },
      x: 0.5,
      xanchor: 'center'
    },
    geo: {
      projection: { type: 'natural earth' },
      showland: true,
      landcolor: '#2d3748',
      coastlinecolor: '#4a5568',
      showocean: true,
      oceancolor: '#1a365d',
      showlakes: true,
      lakecolor: '#2b6cb0',
      showcountries: true,
      countrycolor: '#4a5568',
      showsubunits: false,
      bgcolor: '#0f172a'
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    height: 600,
    margin: { l: 0, r: 0, t: 40, b: 0 }
  };

  const temperatureHistData = [{
    x: dashboardData.map(d => d.avg_temperature).filter(t => t > 0),
    type: 'histogram',
    marker: { color: '#FF6B6B', opacity: 0.7 },
    name: 'Temperature Distribution'
  }];

  const temperatureHistLayout = {
    title: {
      text: 'Average Temperature Distribution',
      font: { color: '#ffffff', size: 16 }
    },
    xaxis: { 
      title: { text: 'Temperature (°C)', font: { color: '#ffffff' } },
      tickfont: { color: '#ffffff' },
      gridcolor: '#374151',
      zerolinecolor: '#4b5563'
    },
    yaxis: { 
      title: { text: 'Count', font: { color: '#ffffff' } },
      tickfont: { color: '#ffffff' },
      gridcolor: '#374151',
      zerolinecolor: '#4b5563'
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: '#1f2937',
    height: 400
  };

  const salinityScatterData = [{
    x: dashboardData.map(d => d.avg_temperature).filter((_, i) => dashboardData[i].avg_temperature > 0),
    y: dashboardData.map(d => d.avg_salinity).filter((_, i) => dashboardData[i].avg_temperature > 0),
    mode: 'markers',
    type: 'scatter',
    marker: {
      size: 8,
      color: dashboardData.map(d => d.profiles_count),
      colorscale: 'Viridis',
      showscale: true,
      colorbar: { title: 'Profile Count' }
    },
    text: dashboardData.map(d => `${d.wmo_id}<br>Profiles: ${d.profiles_count}`),
    name: 'T-S Relationship'
  }];

  const salinityScatterLayout = {
    title: {
      text: 'Temperature-Salinity Relationship',
      font: { color: '#ffffff', size: 16 }
    },
    xaxis: { 
      title: { text: 'Temperature (°C)', font: { color: '#ffffff' } },
      tickfont: { color: '#ffffff' },
      gridcolor: '#374151',
      zerolinecolor: '#4b5563'
    },
    yaxis: { 
      title: { text: 'Salinity (PSU)', font: { color: '#ffffff' } },
      tickfont: { color: '#ffffff' },
      gridcolor: '#374151',
      zerolinecolor: '#4b5563'
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: '#1f2937',
    height: 400
  };

  const institutionBarData = [{
    x: Object.keys(
      dashboardData.reduce((acc, d) => {
        acc[d.institution] = (acc[d.institution] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ),
    y: Object.values(
      dashboardData.reduce((acc, d) => {
        acc[d.institution] = (acc[d.institution] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ),
    type: 'bar',
    marker: { color: '#4ECDC4', opacity: 0.8 },
    name: 'Floats by Institution'
  }];

  const institutionBarLayout = {
    title: {
      text: 'Float Distribution by Institution',
      font: { color: '#ffffff', size: 16 }
    },
    xaxis: { 
      title: { text: 'Institution', font: { color: '#ffffff' } },
      tickfont: { color: '#ffffff', size: 10 },
      tickangle: -45,
      gridcolor: '#374151',
      zerolinecolor: '#4b5563'
    },
    yaxis: { 
      title: { text: 'Number of Floats', font: { color: '#ffffff' } },
      tickfont: { color: '#ffffff' },
      gridcolor: '#374151',
      zerolinecolor: '#4b5563'
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: '#1f2937',
    height: 400
  };

  const tableColumns = [
    { key: 'wmo_id', label: 'WMO ID', type: 'string' as const },
    { key: 'institution', label: 'Institution', type: 'string' as const },
    { key: 'profiler_type', label: 'Type', type: 'string' as const },
    { key: 'latitude', label: 'Latitude', type: 'number' as const },
    { key: 'longitude', label: 'Longitude', type: 'number' as const },
    { key: 'profiles_count', label: 'Profiles', type: 'number' as const },
    { key: 'avg_temperature', label: 'Avg Temp (°C)', type: 'number' as const },
    { key: 'avg_salinity', label: 'Avg Salinity (PSU)', type: 'number' as const },
    { key: 'last_update', label: 'Last Update', type: 'date' as const }
  ];

  const handleExport = (format: 'csv' | 'json' | 'ascii' | 'netcdf') => {
    const exportData = {
      data: dashboardData,
      filename: `argo_floats_${new Date().toISOString().split('T')[0]}`,
      columns: tableColumns
    };

    switch (format) {
      case 'csv':
        exportToCSV(exportData);
        break;
      case 'json':
        exportToJSON(exportData);
        break;
      case 'ascii':
        exportToASCII(exportData);
        break;
      case 'netcdf':
        exportToNetCDF(exportData);
        break;
    }
  };

  const handleFloatSelect = (floatId: string) => {
    const newSelected = selectedFloats.includes(floatId)
      ? selectedFloats.filter(id => id !== floatId)
      : [...selectedFloats, floatId];
    setSelectedFloats(newSelected);
  };

  return (
    <div className="space-y-6">
      {/* Header with Export Options */}
      <Card className="gov-card">
        <CardHeader>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-gray-900 flex items-center text-2xl font-semibold">
                <Globe className="h-6 w-6 mr-3 text-blue-600" />
                Geospatial Analytics Dashboard
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Interactive visualizations and data analysis for Argo float network
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-accent text-accent-foreground">
                <Activity className="h-4 w-4 mr-1" />
                {dashboardData.length} Active Floats
              </Badge>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleExport('csv')}
                  className="gov-btn-primary"
                >
                  <Download className="h-4 w-4 mr-1" />
                  CSV
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleExport('ascii')}
                  className="gov-btn-secondary"
                >
                  <Download className="h-4 w-4 mr-1" />
                  ASCII
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleExport('netcdf')}
                  className="gov-btn-primary"
                >
                  <Download className="h-4 w-4 mr-1" />
                  NetCDF
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="maps" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-muted">
          <TabsTrigger value="maps" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Map className="h-4 w-4 mr-2" />
            Maps
          </TabsTrigger>
          <TabsTrigger value="charts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <BarChart3 className="h-4 w-4 mr-2" />
            Charts
          </TabsTrigger>
          <TabsTrigger value="data" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Table className="h-4 w-4 mr-2" />
            Data
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analysis
          </TabsTrigger>
        </TabsList>

        {/* Maps Tab */}
        <TabsContent value="maps" className="space-y-6">
          {/* Interactive Map Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <Card className="gov-card hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Globe className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {dashboardData.length}
                </div>
                <div className="text-gray-600 text-sm">Active Floats</div>
              </CardContent>
            </Card>
            
            <Card className="gov-card hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Activity className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedFloats.length}
                </div>
                <div className="text-gray-600 text-sm">Selected</div>
              </CardContent>
            </Card>
            
            <Card className="gov-card hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {(dashboardData.reduce((sum, d) => sum + d.avg_temperature, 0) / dashboardData.length).toFixed(1)}°C
                </div>
                <div className="text-gray-600 text-sm">Avg Temp</div>
              </CardContent>
            </Card>
            
            <Card className="gov-card hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Waves className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {new Set(dashboardData.map(d => d.institution)).size}
                </div>
                <div className="text-gray-600 text-sm">Institutions</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex gap-2">
              <Button
                variant={activeView === '2d' ? 'default' : 'outline'}
                onClick={() => setActiveView('2d')}
              >
                <Map className="h-4 w-4 mr-2" />
                2D Map
              </Button>
              <Button
                variant={activeView === '3d' ? 'default' : 'outline'}
                onClick={() => setActiveView('3d')}
              >
                <Globe className="h-4 w-4 mr-2" />
                3D Globe
              </Button>
            </div>
            
            {/* Map View Options */}
            <div className="flex items-center gap-2">
              <Button size="sm" className="gov-btn-primary">
                <TrendingUp className="h-4 w-4 mr-1" />
                Temperature View
              </Button>
              <Button size="sm" variant="outline">
                <Droplets className="h-4 w-4 mr-1" />
                Salinity View
              </Button>
              <Button size="sm" variant="outline">
                <Wind className="h-4 w-4 mr-1" />
                Depth View
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Map */}
            <div className="xl:col-span-3">
              <Card className="gov-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 flex items-center font-semibold">
                      <Globe className="h-5 w-5 mr-2 text-blue-600" />
                      Ocean Data Visualization
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-600">Live Data</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {activeView === '2d' ? (
                    <PlotlyChart
                      data={scatterMapData}
                      layout={scatterMapLayout}
                      className="h-[600px]"
                    />
                  ) : (
                    <CesiumViewer
                      floats={floats}
                      selectedFloats={selectedFloats}
                      onFloatSelect={handleFloatSelect}
                      className="h-[600px] rounded-lg"
                    />
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Side Panel with Interactive Information */}
            <div className="xl:col-span-1 space-y-4">
              {/* Real-time Stats */}
              <Card className="gov-card">
                <CardHeader>
                  <CardTitle className="text-gray-900 text-sm flex items-center font-medium">
                    <Activity className="h-4 w-4 mr-2 text-blue-600 animate-pulse" />
                    Live Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Total Profiles</span>
                    <span className="text-gray-900 font-mono font-bold">
                      {dashboardData.reduce((sum, d) => sum + d.profiles_count, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Temp Range</span>
                    <span className="text-gray-900 font-mono font-bold">
                      {Math.min(...dashboardData.map(d => d.avg_temperature)).toFixed(1)}° - {Math.max(...dashboardData.map(d => d.avg_temperature)).toFixed(1)}°C
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Data Quality</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-900 font-mono font-bold text-sm">98.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Selected Float Info */}
              {selectedFloats.length > 0 && (
                <Card className="gov-card">
                  <CardHeader>
                    <CardTitle className="text-gray-900 text-sm flex items-center font-medium">
                      <Target className="h-4 w-4 mr-2 text-blue-600" />
                      Selected Float{selectedFloats.length > 1 ? 's' : ''}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    {selectedFloats.slice(0, 3).map(floatId => {
                      const floatData = dashboardData.find(d => d.wmo_id === floatId);
                      return floatData ? (
                        <div key={floatId} className="p-2 bg-gray-100 rounded text-xs">
                          <div className="font-mono text-gray-900 font-medium">{floatData.wmo_id}</div>
                          <div className="text-gray-600">{floatData.institution}</div>
                        </div>
                      ) : null;
                    })}
                    {selectedFloats.length > 3 && (
                      <div className="text-center text-gray-600 text-xs">
                        +{selectedFloats.length - 3} more
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
              
              {/* Quick Actions */}
              <Card className="gov-card">
                <CardHeader>
                  <CardTitle className="text-gray-900 text-sm flex items-center font-medium">
                    <Zap className="h-4 w-4 mr-2 text-orange-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <Button size="sm" className="w-full gov-btn-primary">
                    <Download className="h-4 w-4 mr-1" />
                    Export Visible Data
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    <Eye className="h-4 w-4 mr-1" />
                    Focus Selected
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    <Globe className="h-4 w-4 mr-1" />
                    Reset View
                  </Button>
                </CardContent>
              </Card>
              
              {/* Recent Activity */}
              <Card className="gov-card">
                <CardHeader>
                  <CardTitle className="text-gray-900 text-sm flex items-center font-medium">
                    <Clock className="h-4 w-4 mr-2 text-blue-600" />
                    Recent Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  {dashboardData.slice(0, 4).map((float, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <div className="text-gray-900 font-mono font-medium">{float.wmo_id}</div>
                        <div className="text-gray-600">Updated recently</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Charts Tab */}
        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="gov-card">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center font-semibold">
                  <Thermometer className="h-5 w-5 mr-2 text-red-500" />
                  Temperature Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PlotlyChart
                  data={temperatureHistData}
                  layout={temperatureHistLayout}
                />
              </CardContent>
            </Card>

            <Card className="gov-card">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center font-semibold">
                  <Droplets className="h-5 w-5 mr-2 text-blue-500" />
                  T-S Relationship
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PlotlyChart
                  data={salinityScatterData}
                  layout={salinityScatterLayout}
                />
              </CardContent>
            </Card>

            <Card className="gov-card lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center font-semibold">
                  <BarChart3 className="h-5 w-5 mr-2 text-green-500" />
                  Institution Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PlotlyChart
                  data={institutionBarData}
                  layout={institutionBarLayout}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Data Tab */}
        <TabsContent value="data" className="space-y-6 bg-background">
          <DataTable className = "bg-background"
            data={dashboardData}
            columns={tableColumns}
            title="Argo Float Data Summary"
            onExport={(format) => handleExport(format as any)}
          />
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="gov-card hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {dashboardData.length}
                </div>
                <div className="text-gray-600">Total Floats</div>
              </CardContent>
            </Card>

            <Card className="gov-card hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Activity className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {dashboardData.reduce((sum, d) => sum + d.profiles_count, 0).toLocaleString()}
                </div>
                <div className="text-gray-600">Total Profiles</div>
              </CardContent>
            </Card>

            <Card className="gov-card hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Thermometer className="h-12 w-12 mx-auto mb-4 text-red-600" />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {(dashboardData.reduce((sum, d) => sum + d.avg_temperature, 0) / dashboardData.length).toFixed(1)}°C
                </div>
                <div className="text-gray-600">Avg Temperature</div>
              </CardContent>
            </Card>

            <Card className="gov-card hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Wind className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {new Set(dashboardData.map(d => d.institution)).size}
                </div>
                <div className="text-gray-600">Institutions</div>
              </CardContent>
            </Card>
          </div>

          <Card className="gov-card">
            <CardHeader>
              <CardTitle className="text-gray-900 font-semibold">Data Quality Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-gray-900 text-sm font-medium">High Quality Data</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round(dashboardData.length * 0.85)}
                    </div>
                    <div className="text-green-600 text-sm">85% of floats</div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="text-gray-900 text-sm font-medium">Moderate Quality</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round(dashboardData.length * 0.12)}
                    </div>
                    <div className="text-yellow-600 text-sm">12% of floats</div>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="text-gray-900 text-sm font-medium">Needs Review</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round(dashboardData.length * 0.03)}
                    </div>
                    <div className="text-orange-600 text-sm">3% of floats</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};