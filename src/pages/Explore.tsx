import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeroButton } from '@/components/ui/hero-button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Filter, Calendar, Building2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Explore = () => {
  const { floats, selectedFloats, setSelectedFloats, t } = useApp();
  const [filteredFloats, setFilteredFloats] = useState(floats);
  const [filters, setFilters] = useState({
    wmoId: '',
    institution: 'all',
    dateRange: 'all'
  });

  useEffect(() => {
    let filtered = floats;

    if (filters.wmoId) {
      filtered = filtered.filter(f => 
        f.wmo_id.toLowerCase().includes(filters.wmoId.toLowerCase())
      );
    }

    if (filters.institution !== 'all') {
      filtered = filtered.filter(f => f.institution === filters.institution);
    }

    setFilteredFloats(filtered);
  }, [filters, floats]);

  const handleFloatSelect = (wmoId: string) => {
    setSelectedFloats(
      selectedFloats.includes(wmoId)
        ? selectedFloats.filter(id => id !== wmoId)
        : [...selectedFloats, wmoId]
    );
  };

  const institutions = [...new Set(floats.map(f => f.institution))];

  const getFloatIcon = (isSelected: boolean) => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="
        background-color: ${isSelected ? '#ef4444' : '#3b82f6'};
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Filter className="h-5 w-5 mr-2 text-primary" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">WMO ID</label>
                <Input
                  placeholder="Search by WMO ID..."
                  value={filters.wmoId}
                  onChange={(e) => setFilters(prev => ({ ...prev, wmoId: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Institution</label>
                <Select 
                  value={filters.institution} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, institution: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Institutions</SelectItem>
                    {institutions.map(inst => (
                      <SelectItem key={inst} value={inst}>{inst}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Date Range</label>
                <Select 
                  value={filters.dateRange} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2018">2018</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Found {filteredFloats.length} floats
                </p>
                {selectedFloats.length > 0 && (
                  <p className="text-sm font-medium text-primary">
                    {selectedFloats.length} selected
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Selected Floats */}
          {selectedFloats.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="h-5 w-5 mr-2 text-accent" />
                  Selected Floats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedFloats.map(floatId => {
                    const float = floats.find(f => f.wmo_id === floatId);
                    return float ? (
                      <div key={floatId} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div>
                          <p className="font-medium text-sm">{float.wmo_id}</p>
                          <p className="text-xs text-muted-foreground">{float.institution}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFloatSelect(floatId)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : null;
                  })}
                </div>
                <div className="mt-4 space-y-2">
                  <HeroButton variant="coral" size="sm" className="w-full">
                    View Profiles
                  </HeroButton>
                  <HeroButton variant="surface" size="sm" className="w-full">
                    Compare Data
                  </HeroButton>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Map */}
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Argo Float Locations
                </span>
                <Badge variant="outline" className="text-xs">
                  {filteredFloats.length} floats visible
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full p-0">
              <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100 rounded-b-lg">
                <div className="text-center p-8">
                  <MapPin className="h-16 w-16 text-primary mx-auto mb-4 animate-float-drift" />
                  <h3 className="text-xl font-semibold mb-2">Interactive Float Map</h3>
                  <p className="text-muted-foreground mb-4">
                    {filteredFloats.length} Argo floats available for exploration
                  </p>
                  <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                    {filteredFloats.slice(0, 4).map((float) => (
                      <div
                        key={float.wmo_id}
                        className={`p-3 rounded border cursor-pointer transition-all ${
                          selectedFloats.includes(float.wmo_id) 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-background hover:bg-muted'
                        }`}
                        onClick={() => handleFloatSelect(float.wmo_id)}
                      >
                        <div className="font-medium text-sm">{float.wmo_id}</div>
                        <div className="text-xs opacity-70">{float.institution}</div>
                      </div>
                    ))}
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

export default Explore;