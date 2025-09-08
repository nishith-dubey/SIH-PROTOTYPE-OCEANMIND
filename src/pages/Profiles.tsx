import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { HeroButton } from '@/components/ui/hero-button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart as LineChartIcon, Download, Layers } from 'lucide-react';

const Profiles = () => {
  const { floats, t } = useApp();
  const [selectedFloat, setSelectedFloat] = useState(floats[0]?.wmo_id || '');
  const [selectedVariable, setSelectedVariable] = useState<'temperature' | 'salinity' | 'oxygen'>('temperature');
  const [selectedCycles, setSelectedCycles] = useState<number[]>([]);

  const currentFloat = floats.find(f => f.wmo_id === selectedFloat);
  
  const prepareProfileData = () => {
    if (!currentFloat) return [];
    
    const cyclesToShow = selectedCycles.length > 0 
      ? currentFloat.profiles.filter(p => selectedCycles.includes(p.cycle))
      : currentFloat.profiles.slice(0, 3); // Show first 3 cycles by default

    const depths = cyclesToShow[0]?.depths || [];
    
    return depths.map((depth, index) => {
      const dataPoint: any = { depth };
      
      cyclesToShow.forEach(profile => {
        const values = profile[selectedVariable];
        if (values && values[index] !== undefined) {
          dataPoint[`Cycle ${profile.cycle}`] = values[index];
        }
      });
      
      return dataPoint;
    });
  };

  const toggleCycle = (cycle: number) => {
    setSelectedCycles(prev => 
      prev.includes(cycle) 
        ? prev.filter(c => c !== cycle)
        : [...prev, cycle]
    );
  };

  const profileData = prepareProfileData();
  
  const getVariableLabel = () => {
    switch (selectedVariable) {
      case 'temperature': return `${t('temperature')}`;
      case 'salinity': return `${t('salinity')}`;
      case 'oxygen': return `${t('oxygen')}`;
      default: return selectedVariable;
    }
  };

  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Controls Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <LineChartIcon className="h-5 w-5 mr-2 text-primary" />
                Profile Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Float Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">Select Float</label>
                <Select value={selectedFloat} onValueChange={setSelectedFloat}>
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

              {/* Cycle Selection */}
              {currentFloat && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Cycles</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {currentFloat.profiles.map(profile => (
                      <div key={profile.cycle} className="flex items-center justify-between">
                        <div>
                          <span className="text-sm">Cycle {profile.cycle}</span>
                          {profile.date && (
                            <p className="text-xs text-muted-foreground">
                              {new Date(profile.date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <Button
                          variant={selectedCycles.includes(profile.cycle) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleCycle(profile.cycle)}
                        >
                          {selectedCycles.includes(profile.cycle) ? "Remove" : "Add"}
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  {selectedCycles.length === 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Showing first 3 cycles by default
                    </p>
                  )}
                </div>
              )}

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

          {/* Float Info */}
          {currentFloat && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Float Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">WMO ID:</span>
                    <span className="ml-2">{currentFloat.wmo_id}</span>
                  </div>
                  <div>
                    <span className="font-medium">Institution:</span>
                    <span className="ml-2">{currentFloat.institution}</span>
                  </div>
                  <div>
                    <span className="font-medium">Type:</span>
                    <span className="ml-2 text-xs">{currentFloat.profiler_type}</span>
                  </div>
                  <div>
                    <span className="font-medium">Profiles:</span>
                    <span className="ml-2">{currentFloat.profiles.length}</span>
                  </div>
                  <div>
                    <span className="font-medium">Last Update:</span>
                    <span className="ml-2 text-xs">
                      {new Date(currentFloat.last_update).toLocaleDateString()}
                    </span>
                  </div>
                  {currentFloat.metadata?.qc_flags && (
                    <div>
                      <span className="font-medium">QC Status:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {currentFloat.metadata.qc_flags.slice(0, 5).map((flag, i) => (
                          <Badge
                            key={i}
                            variant={flag === 1 ? "default" : flag === 2 ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            {flag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Profile Chart */}
        <div className="lg:col-span-3">
          <Card className="h-[700px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Layers className="h-5 w-5 mr-2 text-primary" />
                  {getVariableLabel()} vs {t('depth')} - Float {selectedFloat}
                </CardTitle>
                <Badge variant="outline">
                  {profileData.length > 0 ? `${profileData.length} data points` : 'No data'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="h-full pb-4">
              {profileData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={profileData}
                    margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey={selectedVariable === 'temperature' ? 'Temperature (°C)' : 
                               selectedVariable === 'salinity' ? 'Salinity (PSU)' : 
                               'Oxygen (μmol/kg)'}
                      label={{ value: getVariableLabel(), position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis 
                      reversed
                      label={{ value: t('depth'), angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                      labelFormatter={(value) => `${t('depth')}: ${value}m`}
                      formatter={(value: any, name: any) => [
                        `${value?.toFixed(2) || 'N/A'} ${selectedVariable === 'temperature' ? '°C' : 
                                                           selectedVariable === 'salinity' ? 'PSU' : 
                                                           'μmol/kg'}`,
                        name
                      ]}
                    />
                    <Legend />
                    
                    {Object.keys(profileData[0] || {})
                      .filter(key => key !== 'depth')
                      .map((cycle, index) => (
                        <Line
                          key={cycle}
                          type="monotone"
                          dataKey={cycle}
                          stroke={colors[index % colors.length]}
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          connectNulls={false}
                        />
                      ))}
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <LineChartIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-muted-foreground">No Profile Data</h3>
                    <p className="text-muted-foreground">
                      Select a float and variable to view profiles
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

export default Profiles;