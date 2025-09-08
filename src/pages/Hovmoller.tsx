import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HeroButton } from '@/components/ui/hero-button';
import { Badge } from '@/components/ui/badge';
import { Activity, Download, TrendingUp } from 'lucide-react';

const Hovmoller = () => {
  const { floats, t } = useApp();
  const [selectedFloat, setSelectedFloat] = useState(floats[0]?.wmo_id || '');
  const [selectedVariable, setSelectedVariable] = useState<'temperature' | 'salinity' | 'oxygen'>('temperature');

  const currentFloat = floats.find(f => f.wmo_id === selectedFloat);

  const generateHovmollerData = () => {
    if (!currentFloat) return [];
    
    // Create a synthetic Hovmöller diagram data
    const depths = [0, 25, 50, 75, 100, 150, 200, 300, 400, 500];
    const cycles = currentFloat.profiles.map(p => p.cycle);
    
    return depths.map(depth => {
      const row: any = { depth };
      
      cycles.forEach(cycle => {
        const profile = currentFloat.profiles.find(p => p.cycle === cycle);
        if (profile && profile[selectedVariable]) {
          const depthIndex = profile.depths.findIndex(d => d === depth);
          if (depthIndex !== -1 && profile[selectedVariable]![depthIndex] !== undefined) {
            row[`cycle_${cycle}`] = profile[selectedVariable]![depthIndex];
          }
        }
      });
      
      return row;
    });
  };

  const hovmollerData = generateHovmollerData();
  
  const getVariableLabel = () => {
    switch (selectedVariable) {
      case 'temperature': return t('temperature');
      case 'salinity': return t('salinity');
      case 'oxygen': return t('oxygen');
      default: return selectedVariable;
    }
  };

  const getColorScale = (value: number) => {
    if (selectedVariable === 'temperature') {
      // Temperature color scale (blue to red)
      const normalized = Math.max(0, Math.min(1, (value - 0) / 30));
      const blue = Math.round(255 * (1 - normalized));
      const red = Math.round(255 * normalized);
      return `rgb(${red}, 0, ${blue})`;
    } else if (selectedVariable === 'salinity') {
      // Salinity color scale (green to yellow)
      const normalized = Math.max(0, Math.min(1, (value - 33) / 4));
      const green = Math.round(255 * (1 - normalized));
      const red = Math.round(255 * normalized);
      return `rgb(${red}, ${green}, 0)`;
    } else {
      // Oxygen color scale (purple to orange)
      const normalized = Math.max(0, Math.min(1, (value - 50) / 200));
      const purple = Math.round(255 * (1 - normalized));
      const orange = Math.round(255 * normalized);
      return `rgb(${orange}, ${purple/2}, ${purple})`;
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
                <Activity className="h-5 w-5 mr-2 text-primary" />
                Hovmöller Controls
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

              {/* Export Options */}
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">Export Options</p>
                <div className="space-y-2">
                  <HeroButton variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    PNG Image
                  </HeroButton>
                  <HeroButton variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    NetCDF Data
                  </HeroButton>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About Hovmöller</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>
                  A Hovmöller diagram shows how a variable changes over time and depth, 
                  providing insights into temporal patterns in the water column.
                </p>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">X-axis:</span> Time (Cycles)
                  </div>
                  <div>
                    <span className="font-medium">Y-axis:</span> Depth
                  </div>
                  <div>
                    <span className="font-medium">Colors:</span> Variable intensity
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Look for patterns like seasonal thermoclines, 
                    mixing events, or water mass changes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hovmöller Diagram */}
        <div className="lg:col-span-3">
          <Card className="h-[700px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  {getVariableLabel()} Hovmöller - Float {selectedFloat}
                </CardTitle>
                <Badge variant="outline">
                  Time vs Depth
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="h-full pb-4">
              {hovmollerData.length > 0 && currentFloat ? (
                <div className="h-full flex flex-col">
                  {/* Color scale legend */}
                  <div className="mb-4 flex items-center justify-center">
                    <div className="flex items-center space-x-2 text-sm">
                      <span>Low</span>
                      <div className="w-32 h-4 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded"></div>
                      <span>High</span>
                      <span className="ml-2 text-muted-foreground">{getVariableLabel()}</span>
                    </div>
                  </div>
                  
                  {/* Hovmöller grid */}
                  <div className="flex-1 overflow-auto">
                    <div className="min-w-full">
                      {/* Header with cycle numbers */}
                      <div className="flex border-b">
                        <div className="w-16 p-2 font-medium text-xs border-r bg-muted">
                          Depth (m)
                        </div>
                        {currentFloat.profiles.map(profile => (
                          <div key={profile.cycle} className="w-20 p-2 text-center text-xs font-medium border-r bg-muted">
                            Cycle {profile.cycle}
                          </div>
                        ))}
                      </div>
                      
                      {/* Data rows */}
                      {hovmollerData.map(row => (
                        <div key={row.depth} className="flex border-b">
                          <div className="w-16 p-2 text-xs font-medium border-r bg-muted">
                            {row.depth}
                          </div>
                          {currentFloat.profiles.map(profile => {
                            const value = row[`cycle_${profile.cycle}`];
                            return (
                              <div
                                key={profile.cycle}
                                className="w-20 p-2 text-center text-xs border-r relative group"
                                style={{
                                  backgroundColor: value !== undefined ? getColorScale(value) : '#f3f4f6',
                                  color: value !== undefined ? 'white' : '#6b7280'
                                }}
                                title={value !== undefined ? `${value.toFixed(2)}` : 'No data'}
                              >
                                {value !== undefined ? value.toFixed(1) : '-'}
                                
                                {/* Tooltip on hover */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                  {value !== undefined ? `${value.toFixed(2)} ${
                                    selectedVariable === 'temperature' ? '°C' : 
                                    selectedVariable === 'salinity' ? 'PSU' : 
                                    'μmol/kg'
                                  }` : 'No data'}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-muted-foreground">No Hovmöller Data</h3>
                    <p className="text-muted-foreground">
                      Select a float with multiple profiles to create a Hovmöller diagram
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

export default Hovmoller;