import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HeroButton } from '@/components/ui/hero-button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { BarChart3, Download, GitCompare, TrendingUp } from 'lucide-react';

const Compare = () => {
  const { floats, t } = useApp();
  const [float1, setFloat1] = useState(floats[0]?.wmo_id || '');
  const [float2, setFloat2] = useState(floats[1]?.wmo_id || '');
  const [selectedVariable, setSelectedVariable] = useState<'temperature' | 'salinity' | 'oxygen'>('temperature');
  const [comparisonType, setComparisonType] = useState<'profiles' | 'statistics' | 'timeseries'>('profiles');

  const currentFloat1 = floats.find(f => f.wmo_id === float1);
  const currentFloat2 = floats.find(f => f.wmo_id === float2);

  const prepareComparisonData = () => {
    if (!currentFloat1 || !currentFloat2) return [];

    if (comparisonType === 'profiles') {
      // Compare latest profiles
      const profile1 = currentFloat1.profiles[currentFloat1.profiles.length - 1];
      const profile2 = currentFloat2.profiles[currentFloat2.profiles.length - 1];
      
      if (!profile1 || !profile2) return [];

      const commonDepths = profile1.depths.filter(depth => 
        profile2.depths.includes(depth)
      );

      return commonDepths.map(depth => {
        const index1 = profile1.depths.indexOf(depth);
        const index2 = profile2.depths.indexOf(depth);
        
        return {
          depth,
          [currentFloat1.wmo_id]: profile1[selectedVariable]?.[index1] || null,
          [currentFloat2.wmo_id]: profile2[selectedVariable]?.[index2] || null
        };
      });
    } else if (comparisonType === 'statistics') {
      // Statistical comparison at different depths
      const depths = [0, 50, 100, 200, 500];
      
      return depths.map(targetDepth => {
        const getValueAtDepth = (float: any) => {
          const values: number[] = [];
          float.profiles.forEach((profile: any) => {
            const depthIndex = profile.depths.findIndex((d: number) => Math.abs(d - targetDepth) < 25);
            if (depthIndex !== -1 && profile[selectedVariable]?.[depthIndex] !== undefined) {
              values.push(profile[selectedVariable][depthIndex]);
            }
          });
          
          if (values.length === 0) return null;
          
          values.sort((a, b) => a - b);
          const mean = values.reduce((a, b) => a + b, 0) / values.length;
          const q1 = values[Math.floor(values.length * 0.25)];
          const q3 = values[Math.floor(values.length * 0.75)];
          const median = values[Math.floor(values.length * 0.5)];
          
          return { mean, median, q1, q3, min: values[0], max: values[values.length - 1] };
        };

        const stats1 = getValueAtDepth(currentFloat1);
        const stats2 = getValueAtDepth(currentFloat2);

        return {
          depth: `${targetDepth}m`,
          [`${currentFloat1.wmo_id}_mean`]: stats1?.mean || null,
          [`${currentFloat2.wmo_id}_mean`]: stats2?.mean || null,
          [`${currentFloat1.wmo_id}_range`]: stats1 ? [stats1.q1, stats1.q3] : null,
          [`${currentFloat2.wmo_id}_range`]: stats2 ? [stats2.q1, stats2.q3] : null
        };
      });
    } else {
      // Time series comparison at surface
      const getAllSurfaceValues = (float: any) => {
        return float.profiles.map((profile: any) => ({
          cycle: profile.cycle,
          date: profile.date || `Cycle ${profile.cycle}`,
          value: profile[selectedVariable]?.[0] || null
        }));
      };

      const series1 = getAllSurfaceValues(currentFloat1);
      const series2 = getAllSurfaceValues(currentFloat2);
      
      // Combine by cycle
      const allCycles = [...new Set([...series1.map(s => s.cycle), ...series2.map(s => s.cycle)])].sort();
      
      return allCycles.map(cycle => {
        const data1 = series1.find(s => s.cycle === cycle);
        const data2 = series2.find(s => s.cycle === cycle);
        
        return {
          cycle: `Cycle ${cycle}`,
          [currentFloat1.wmo_id]: data1?.value || null,
          [currentFloat2.wmo_id]: data2?.value || null
        };
      });
    }
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

  const renderChart = () => {
    if (comparisonData.length === 0) return null;

    if (comparisonType === 'profiles') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={comparisonData}
            margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey={selectedVariable}
              label={{ value: `${getVariableLabel()} (${getVariableUnit()})`, position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              reversed
              label={{ value: t('depth'), angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              labelFormatter={(value) => `${t('depth')}: ${value}m`}
              formatter={(value: any, name: any) => [
                `${value?.toFixed(2) || 'N/A'} ${getVariableUnit()}`,
                name
              ]}
            />
            <Legend />
            
            <Line
              type="monotone"
              dataKey={currentFloat1?.wmo_id}
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
              name={`Float ${currentFloat1?.wmo_id}`}
            />
            <Line
              type="monotone"
              dataKey={currentFloat2?.wmo_id}
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 3 }}
              name={`Float ${currentFloat2?.wmo_id}`}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (comparisonType === 'statistics') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={comparisonData}
            margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="depth" />
            <YAxis 
              label={{ value: `${getVariableLabel()} (${getVariableUnit()})`, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Legend />
            
            <Bar
              dataKey={`${currentFloat1?.wmo_id}_mean`}
              fill="#3b82f6"
              name={`Float ${currentFloat1?.wmo_id} Mean`}
            />
            <Bar
              dataKey={`${currentFloat2?.wmo_id}_mean`}
              fill="#ef4444"
              name={`Float ${currentFloat2?.wmo_id} Mean`}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={comparisonData}
            margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="cycle" />
            <YAxis 
              label={{ value: `${getVariableLabel()} (${getVariableUnit()})`, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Legend />
            
            <Line
              type="monotone"
              dataKey={currentFloat1?.wmo_id}
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              name={`Float ${currentFloat1?.wmo_id}`}
            />
            <Line
              type="monotone"
              dataKey={currentFloat2?.wmo_id}
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 4 }}
              name={`Float ${currentFloat2?.wmo_id}`}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Controls Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <GitCompare className="h-5 w-5 mr-2 text-primary" />
                Comparison Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Float Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">First Float</label>
                <Select value={float1} onValueChange={setFloat1}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {floats.map(float => (
                      <SelectItem key={float.wmo_id} value={float.wmo_id}>
                        {float.wmo_id} ({float.institution})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Second Float</label>
                <Select value={float2} onValueChange={setFloat2}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {floats.filter(f => f.wmo_id !== float1).map(float => (
                      <SelectItem key={float.wmo_id} value={float.wmo_id}>
                        {float.wmo_id} ({float.institution})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Variable Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">Variable</label>
                <Select value={selectedVariable} onValueChange={(value: any) => setSelectedVariable(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temperature">{t('temperature')}</SelectItem>
                    <SelectItem value="salinity">{t('salinity')}</SelectItem>
                    <SelectItem value="oxygen">{t('oxygen')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Comparison Type */}
              <div>
                <label className="text-sm font-medium mb-2 block">Comparison Type</label>
                <Select value={comparisonType} onValueChange={(value: any) => setComparisonType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="profiles">Latest Profiles</SelectItem>
                    <SelectItem value="statistics">Statistical Summary</SelectItem>
                    <SelectItem value="timeseries">Surface Time Series</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Export Options */}
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">Export Options</p>
                <div className="space-y-2">
                  <HeroButton variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    CSV Data
                  </HeroButton>
                  <HeroButton variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    PNG Image
                  </HeroButton>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Summary */}
          {currentFloat1 && currentFloat2 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Comparison Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded bg-blue-50 dark:bg-blue-950/20">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                      Float {currentFloat1.wmo_id}
                    </h4>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      {currentFloat1.institution} • {currentFloat1.profiles.length} profiles
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded bg-red-50 dark:bg-red-950/20">
                    <h4 className="font-medium text-red-800 dark:text-red-200 mb-1">
                      Float {currentFloat2.wmo_id}
                    </h4>
                    <p className="text-sm text-red-600 dark:text-red-300">
                      {currentFloat2.institution} • {currentFloat2.profiles.length} profiles
                    </p>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>
                      Comparing <strong>{getVariableLabel()}</strong> using{' '}
                      <strong>{comparisonType.replace('_', ' ')}</strong> method
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Comparison Chart */}
        <div className="lg:col-span-3">
          <Card className="h-[700px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  {getVariableLabel()} Comparison
                </CardTitle>
                <Badge variant="outline">
                  {comparisonType.charAt(0).toUpperCase() + comparisonType.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="h-full pb-4">
              {currentFloat1 && currentFloat2 && comparisonData.length > 0 ? (
                renderChart()
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-muted-foreground">No Comparison Data</h3>
                    <p className="text-muted-foreground">
                      Select two different floats to compare their data
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Compare;