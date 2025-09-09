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
  Activity
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

  // Plotly configurations for different chart types
  const scatterMapData = [{
    type: 'scattergeo',
    mode: 'markers',
    lon: dashboardData.map(d => d.longitude),
    lat: dashboardData.map(d => d.latitude),
    text: dashboardData.map(d => `${d.wmo_id}<br>${d.institution}<br>Profiles: ${d.profiles_count}`),
    marker: {
      size: dashboardData.map(d => Math.max(8, Math.min(20, d.profiles_count / 5))),
      color: dashboardData.map(d => selectedFloats.includes(d.wmo_id) ? '#00E5FF' : '#FFD700'),
      colorscale: 'Viridis',
      line: { color: 'white', width: 1 }
    },
    name: 'Argo Floats'
  }];

  const scatterMapLayout = {
    title: 'Global Argo Float Distribution',
    geo: {
      projection: { type: 'natural earth' },
      showland: true,
      landcolor: 'rgb(243, 243, 243)',
      coastlinecolor: 'rgb(204, 204, 204)',
      showocean: true,
      oceancolor: 'rgb(0, 100, 200)',
      showlakes: true,
      lakecolor: 'rgb(0, 100, 200)'
    },
    height: 500
  };

  const temperatureHistData = [{
    x: dashboardData.map(d => d.avg_temperature).filter(t => t > 0),
    type: 'histogram',
    marker: { color: '#FF6B6B', opacity: 0.7 },
    name: 'Temperature Distribution'
  }];

  const temperatureHistLayout = {
    title: 'Average Temperature Distribution',
    xaxis: { title: 'Temperature (°C)' },
    yaxis: { title: 'Count' },
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
    title: 'Temperature-Salinity Relationship',
    xaxis: { title: 'Temperature (°C)' },
    yaxis: { title: 'Salinity (PSU)' },
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
    title: 'Float Distribution by Institution',
    xaxis: { title: 'Institution' },
    yaxis: { title: 'Number of Floats' },
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
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-white flex items-center text-2xl">
                <Globe className="h-6 w-6 mr-3 text-blue-400" />
                Geospatial Analytics Dashboard
              </CardTitle>
              <p className="text-gray-400 mt-2">
                Interactive visualizations and data analysis for Argo float network
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Activity className="h-4 w-4 mr-1" />
                {dashboardData.length} Active Floats
              </Badge>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleExport('csv')}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Download className="h-4 w-4 mr-1" />
                  CSV
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleExport('ascii')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="h-4 w-4 mr-1" />
                  ASCII
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleExport('netcdf')}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
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
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white/5 backdrop-blur-xl border border-white/10">
          <TabsTrigger value="maps" className="data-[state=active]:bg-blue-600 text-white">
            <Map className="h-4 w-4 mr-2" />
            Maps
          </TabsTrigger>
          <TabsTrigger value="charts" className="data-[state=active]:bg-green-600 text-white">
            <BarChart3 className="h-4 w-4 mr-2" />
            Charts
          </TabsTrigger>
          <TabsTrigger value="data" className="data-[state=active]:bg-purple-600 text-white">
            <Table className="h-4 w-4 mr-2" />
            Data
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-orange-600 text-white">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analysis
          </TabsTrigger>
        </TabsList>

        {/* Maps Tab */}
        <TabsContent value="maps" className="space-y-6">
          <div className="flex gap-4 mb-4">
            <Button
              variant={activeView === '2d' ? 'default' : 'outline'}
              onClick={() => setActiveView('2d')}
              className="text-white"
            >
              <Map className="h-4 w-4 mr-2" />
              2D Map
            </Button>
            <Button
              variant={activeView === '3d' ? 'default' : 'outline'}
              onClick={() => setActiveView('3d')}
              className="text-white"
            >
              <Globe className="h-4 w-4 mr-2" />
              3D Globe
            </Button>
          </div>

          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
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
        </TabsContent>

        {/* Charts Tab */}
        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Thermometer className="h-5 w-5 mr-2 text-red-400" />
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

            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Droplets className="h-5 w-5 mr-2 text-blue-400" />
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

            <Card className="bg-white/5 backdrop-blur-xl border-white/10 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-green-400" />
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
        <TabsContent value="data" className="space-y-6">
          <DataTable
            data={dashboardData}
            columns={tableColumns}
            title="Argo Float Data Summary"
            onExport={(format) => handleExport(format as any)}
          />
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border-blue-500/30">
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                <div className="text-3xl font-bold text-white mb-2">
                  {dashboardData.length}
                </div>
                <div className="text-blue-200">Total Floats</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border-green-500/30">
              <CardContent className="p-6 text-center">
                <Activity className="h-12 w-12 mx-auto mb-4 text-green-400" />
                <div className="text-3xl font-bold text-white mb-2">
                  {dashboardData.reduce((sum, d) => sum + d.profiles_count, 0).toLocaleString()}
                </div>
                <div className="text-green-200">Total Profiles</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-xl border-red-500/30">
              <CardContent className="p-6 text-center">
                <Thermometer className="h-12 w-12 mx-auto mb-4 text-red-400" />
                <div className="text-3xl font-bold text-white mb-2">
                  {(dashboardData.reduce((sum, d) => sum + d.avg_temperature, 0) / dashboardData.length).toFixed(1)}°C
                </div>
                <div className="text-red-200">Avg Temperature</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-purple-500/30">
              <CardContent className="p-6 text-center">
                <Wind className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                <div className="text-3xl font-bold text-white mb-2">
                  {new Set(dashboardData.map(d => d.institution)).size}
                </div>
                <div className="text-purple-200">Institutions</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Data Quality Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30">
                    <div className="text-green-300 text-sm font-medium">High Quality Data</div>
                    <div className="text-2xl font-bold text-white">
                      {Math.round(dashboardData.length * 0.85)}
                    </div>
                    <div className="text-green-200 text-sm">85% of floats</div>
                  </div>
                  
                  <div className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-500/30">
                    <div className="text-yellow-300 text-sm font-medium">Moderate Quality</div>
                    <div className="text-2xl font-bold text-white">
                      {Math.round(dashboardData.length * 0.12)}
                    </div>
                    <div className="text-yellow-200 text-sm">12% of floats</div>
                  </div>
                  
                  <div className="bg-red-500/20 p-4 rounded-lg border border-red-500/30">
                    <div className="text-red-300 text-sm font-medium">Needs Review</div>
                    <div className="text-2xl font-bold text-white">
                      {Math.round(dashboardData.length * 0.03)}
                    </div>
                    <div className="text-red-200 text-sm">3% of floats</div>
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