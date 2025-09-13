import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
  Tooltip
} from "react-leaflet";
import { useApp } from "@/contexts/AppContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Filter,
  Building2,
  Globe,
  Search,
  Layers,
  Waves,
  Sparkles,
  Target,
  Activity,
  Zap,
  Navigation,
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ✅ Fix for Leaflet default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// 🌊 DEMO DATA - Complete Argo Float Dataset
const generateDemoFloats = () => {
  const regions = [
    { name: "Arabian Sea", centerLat: 20.3618, centerLng: 62.5146 },
    { name: "Bay of Bengal", centerLat: 15.0, centerLng: 85.0 },
    { name: "North Indian Ocean", centerLat: 10.0, centerLng: 75.0 },
    { name: "Oman Sea", centerLat: 24.0, centerLng: 58.0 },
    { name: "Red Sea", centerLat: 22.0, centerLng: 38.0 }
  ];

  const institutions = ["INCOIS", "NIOT", "WHOI", "SIO", "IFREMER", "CSIRO", "JMA", "KORDI"];
  const profilerTypes = ["APEX", "SOLO", "NAVIS", "ARVOR", "PROVOR", "DEEP APEX"];

  const demoFloats = [];

  for (let i = 0; i < 45; i++) {
    const region = regions[Math.floor(Math.random() * regions.length)];
    const institution = institutions[Math.floor(Math.random() * institutions.length)];
    const profilerType = profilerTypes[Math.floor(Math.random() * profilerTypes.length)];
    
    // Generate realistic coordinates within region
    const lat = region.centerLat + (Math.random() - 0.5) * 15;
    const lng = region.centerLng + (Math.random() - 0.5) * 15;
    
    // Generate trajectory (historical positions)
    const trajectory = [];
    let currentLat = lat;
    let currentLng = lng;
    
    for (let j = 0; j < 20; j++) {
      // Simulate drift
      currentLat += (Math.random() - 0.5) * 0.3;
      currentLng += (Math.random() - 0.5) * 0.3;
      
      const date = new Date();
      date.setDate(date.getDate() - (20 - j));
      
      trajectory.push({
        latitude: currentLat,
        longitude: currentLng,
        date: date.toISOString()
      });
    }

    // Generate profile data
    const profileCount = Math.floor(Math.random() * 150) + 50;
    const profiles = [];
    
    for (let k = 0; k < Math.min(profileCount, 10); k++) {
      const date = new Date();
      date.setDate(date.getDate() - (profileCount - k) * 10);
      
      const depths = [0, 10, 20, 30, 50, 75, 100, 150, 200, 300, 400, 500, 750, 1000, 1500, 2000];
      const temperature = depths.map(d => {
        if (d < 50) return 28 + Math.random() * 4 - (d * 0.05);
        if (d < 200) return 25 - (d - 50) * 0.1 + Math.random() * 2;
        if (d < 1000) return 15 - (d - 200) * 0.01 + Math.random() * 1;
        return 2 + Math.random() * 2;
      });
      
      const salinity = depths.map(d => {
        if (d < 100) return 34.5 + Math.random() * 1;
        if (d < 500) return 34.7 + Math.random() * 0.5;
        return 34.6 + Math.random() * 0.3;
      });
      
      const oxygen = depths.map(d => {
        if (d < 50) return 200 + Math.random() * 50;
        if (d < 200) return 150 - (d - 50) * 0.5 + Math.random() * 30;
        if (d < 1000) return 100 - (d - 200) * 0.05 + Math.random() * 20;
        return 50 + Math.random() * 10;
      });

      profiles.push({
        cycle: k + 1,
        date: date.toISOString().split('T')[0],
        depths,
        temperature,
        salinity,
        oxygen
      });
    }

    const lastUpdate = new Date();
    lastUpdate.setHours(lastUpdate.getHours() - Math.random() * 48);

    demoFloats.push({
      wmo_id: `690${(2000 + i).toString()}`,
      institution,
      profiler_type: profilerType,
      last_location: {
        latitude: lat,
        longitude: lng
      },
      last_update: lastUpdate.toISOString(),
      profiles,
      trajectory
    });
  }

  return demoFloats;
};

// Ocean Background Component
const OceanBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(16, 185, 129, 0.1)" />
          <stop offset="100%" stopColor="rgba(5, 150, 105, 0.05)" />
        </linearGradient>
      </defs>
      
      <path d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z" fill="rgba(16, 185, 129, 0.05)">
        <animateTransform attributeName="transform" type="translate" values="0,0;50,0;0,0" dur="8s" repeatCount="indefinite"/>
      </path>
      
      <path d="M0,450 C400,350 800,550 1200,450 L1200,800 L0,800 Z" fill="rgba(5, 150, 105, 0.03)">
        <animateTransform attributeName="transform" type="translate" values="0,0;-30,0;0,0" dur="12s" repeatCount="indefinite"/>
      </path>
      
      <path d="M0,500 C200,400 1000,600 1200,500 L1200,800 L0,800 Z" fill="rgba(16, 185, 129, 0.02)">
        <animateTransform attributeName="transform" type="translate" values="0,0;25,0;0,0" dur="15s" repeatCount="indefinite"/>
      </path>
    </svg>
  </div>
);

// ✅ FIXED: Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-emerald-400/30 rounded-full animate-bounce"
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

// ✅ Custom float icon with status colors
const getFloatIcon = (isSelected: boolean, status: string = 'active') => {
  const colors = {
    active: isSelected ? "bg-emerald-400 ring-emerald-300" : "bg-emerald-500 ring-emerald-400",
    inactive: isSelected ? "bg-red-400 ring-red-300" : "bg-red-500 ring-red-400",
    warning: isSelected ? "bg-yellow-400 ring-yellow-300" : "bg-yellow-500 ring-yellow-400",
    predicted: "bg-blue-400 ring-blue-300 opacity-70"
  };

  return L.divIcon({
    className: "custom-div-icon",
    html: `<div class="w-4 h-4 rounded-full ${colors[status as keyof typeof colors] || colors.active} border-2 border-white shadow-lg ring-2 animate-pulse"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

// ✅ Generate predicted path for float
const generatePredictedPath = (currentLat: number, currentLng: number, days: number = 10) => {
  const path = [];
  const baseSpeed = 0.1; // degrees per day
  const currentDirection = Math.random() * 360; // Random initial direction
  
  for (let i = 0; i < days; i++) {
    // Add some randomness to simulate ocean currents
    const drift = (Math.random() - 0.5) * 0.02;
    const direction = currentDirection + drift * i;
    const speed = baseSpeed + (Math.random() - 0.5) * 0.02;
    
    const lat = currentLat + Math.cos(direction * Math.PI / 180) * speed * i;
    const lng = currentLng + Math.sin(direction * Math.PI / 180) * speed * i;
    
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    path.push({
      position: [lat, lng],
      date: date.toISOString().split('T')[0],
      day: i + 1,
      confidence: Math.max(0.9 - (i * 0.08), 0.1), // Decreasing confidence over time
      status: i === 0 ? 'Current Position' : `Day ${i} Prediction`,
      depth: Math.round(Math.random() * 2000 + 100), // Random depth prediction
      temperature: (22 + Math.random() * 8).toFixed(1), // Sample temperature
      salinity: (34.5 + Math.random() * 2).toFixed(2), // Sample salinity
    });
  }
  
  return path;
};

// ✅ Helper function to validate coordinates
const isValidCoordinate = (lat: any, lng: any): boolean => {
  return (
    typeof lat === 'number' && 
    typeof lng === 'number' && 
    !isNaN(lat) && 
    !isNaN(lng) &&
    lat >= -90 && 
    lat <= 90 && 
    lng >= -180 && 
    lng <= 180
  );
};

// ✅ Helper function to get valid floats with coordinates
const getValidFloats = (floats: any[]): any[] => {
  if (!floats || !Array.isArray(floats)) return [];
  
  return floats.filter((float: any) => {
    if (!float || !float.last_location) return false;
    
    const { latitude, longitude } = float.last_location;
    return isValidCoordinate(latitude, longitude);
  });
};

const Explore = () => {
  const { floats: contextFloats, selectedFloats, setSelectedFloats } = useApp();
  
  // 🔧 Use demo data if context doesn't provide floats
  const floats = React.useMemo(() => {
    if (contextFloats && contextFloats.length > 0) {
      return contextFloats;
    }
    console.log("Loading demo ocean data...");
    return generateDemoFloats();
  }, [contextFloats]);

  const [filteredFloats, setFilteredFloats] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    wmoId: "",
    institution: "all",
    dateRange: "all",
  });
  const [isAnimated, setIsAnimated] = useState(false);
  const [showPredictions, setShowPredictions] = useState(true);
  const [predictionDays, setPredictionDays] = useState(10);
  const [floatPredictions, setFloatPredictions] = useState<{[key: string]: any[]}>({});

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  // ✅ Update when floats load - with validation
  useEffect(() => {
    if (floats && Array.isArray(floats)) {
      const validFloats = getValidFloats(floats);
      setFilteredFloats(validFloats);
      
      // Generate predictions for selected floats
      const predictions: {[key: string]: any[]} = {};
      selectedFloats.forEach(floatId => {
        const float = floats.find(f => f.wmo_id === floatId);
        if (float?.last_location) {
          predictions[floatId] = generatePredictedPath(
            parseFloat(float.last_location.latitude),
            parseFloat(float.last_location.longitude),
            predictionDays
          );
        }
      });
      setFloatPredictions(predictions);
    } else {
      setFilteredFloats([]);
    }
  }, [floats, selectedFloats, predictionDays]);

  // ✅ Filtering logic with null checks
  useEffect(() => {
    if (!floats || !Array.isArray(floats)) return;

    const validFloats = getValidFloats(floats);
    let filtered = validFloats;

    if (filters.wmoId) {
      filtered = filtered.filter((f: any) =>
        f?.wmo_id?.toString().toLowerCase().includes(filters.wmoId.toLowerCase())
      );
    }

    if (filters.institution !== "all") {
      filtered = filtered.filter(
        (f: any) => f?.institution === filters.institution
      );
    }

    if (filters.dateRange === "recent") {
      const last30Days = new Date();
      last30Days.setDate(last30Days.getDate() - 30);
      filtered = filtered.filter((f: any) => {
        if (!f?.last_update) return false;
        try {
          return new Date(f.last_update) >= last30Days;
        } catch {
          return false;
        }
      });
    } else if (filters.dateRange === "year") {
      const currentYear = new Date().getFullYear();
      filtered = filtered.filter((f: any) => {
        if (!f?.last_update) return false;
        try {
          return new Date(f.last_update).getFullYear() === currentYear;
        } catch {
          return false;
        }
      });
    }

    setFilteredFloats(filtered);
  }, [filters, floats]);

  // ✅ Handle select/deselect with null check
  const handleFloatSelect = (wmoId: string) => {
    if (!wmoId) return;
    
    const newSelected = selectedFloats.includes(wmoId)
      ? selectedFloats.filter((id) => id !== wmoId)
      : [...selectedFloats, wmoId];
    
    setSelectedFloats(newSelected);
    
    // Generate prediction for newly selected float
    if (!selectedFloats.includes(wmoId)) {
      const float = floats.find(f => f.wmo_id === wmoId);
      if (float?.last_location) {
        setFloatPredictions(prev => ({
          ...prev,
          [wmoId]: generatePredictedPath(
            parseFloat(float.last_location.latitude),
            parseFloat(float.last_location.longitude),
            predictionDays
          )
        }));
      }
    }
  };

  // ✅ Safe institutions extraction
  const institutions = React.useMemo(() => {
    if (!floats || !Array.isArray(floats)) return [];
    
    const validInstitutions = floats
      .filter((f: any) => f?.institution)
      .map((f: any) => f.institution);
    
    return [...new Set(validInstitutions)];
  }, [floats]);

  // ✅ Loading and error states
  if (!floats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white flex items-center justify-center relative overflow-hidden">
        <OceanBackground />
        <FloatingParticles />
        <div className="text-center relative z-20">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center animate-spin">
              <Globe className="h-8 w-8 text-white" />
            </div>
          </div>
          <p className="text-xl text-emerald-200">Loading ocean data...</p>
        </div>
      </div>
    );
  }

  if (!Array.isArray(floats) || floats.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white flex items-center justify-center relative overflow-hidden">
        <OceanBackground />
        <FloatingParticles />
        <div className="text-center relative z-20">
          <Globe className="h-16 w-16 mx-auto mb-4 text-emerald-600" />
          <p className="text-xl mb-2">No floats data available</p>
          <p className="text-emerald-400">Please check your data source</p>
        </div>
      </div>
    );
  }

  const validFloatsCount = getValidFloats(floats).length;

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-x-hidden overflow-y-auto">
      <OceanBackground />
      <FloatingParticles />

      <div className="relative z-20">
        {/* Enhanced Header */}
        <div className="border-b border-emerald-500/20 bg-white/5 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className={`flex items-center justify-between transition-all duration-1000 ${
              isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
                  <div className="relative p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-emerald-400/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Globe className="h-8 w-8 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
                    Ocean Observation Network
                  </h1>
                  <p className="text-emerald-200/80">
                    Real-time float tracking with route prediction
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2 backdrop-blur-sm">
                  <Target className="h-4 w-4 mr-2" />
                  {filteredFloats.length} Active
                </Badge>
                {selectedFloats.length > 0 && (
                  <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30 px-4 py-2 backdrop-blur-sm">
                    <Navigation className="h-4 w-4 mr-2 animate-pulse" />
                    {selectedFloats.length} Tracking
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            
            {/* Enhanced Sidebar */}
            <div className={`xl:col-span-1 space-y-6 transition-all duration-1200 delay-300 ${
              isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              
              {/* Prediction Controls */}
              <Card className="bg-slate-800 border-blue-500/30 hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Navigation className="h-5 w-5 mr-2 text-blue-400" />
                    Route Prediction
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-300 text-sm">Show Predictions</span>
                    <Button
                      size="sm"
                      variant={showPredictions ? "default" : "outline"}
                      onClick={() => setShowPredictions(!showPredictions)}
                      className={showPredictions ? "bg-blue-600 hover:bg-blue-500 text-white" : "border-blue-500 text-blue-300 bg-slate-800 hover:bg-slate-700"}
                    >
                      {showPredictions ? "ON" : "OFF"}
                    </Button>
                  </div>
                  
                  <div>
                    <label className="text-sm text-blue-300 mb-2 block">Prediction Days</label>
                    <Select value={predictionDays.toString()} onValueChange={(v) => setPredictionDays(parseInt(v))}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="5" className="text-white">5 Days</SelectItem>
                        <SelectItem value="10" className="text-white">10 Days</SelectItem>
                        <SelectItem value="15" className="text-white">15 Days</SelectItem>
                        <SelectItem value="30" className="text-white">30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedFloats.length > 0 && (
                    <div className="p-3 bg-white/5 rounded-lg border border-blue-500/30">
                      <div className="text-xs text-blue-300 mb-1">Active Predictions</div>
                      <div className="text-white font-bold">{selectedFloats.length} floats</div>
                      <div className="text-xs text-blue-200 mt-1">
                        Next {predictionDays} days forecasted
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Filters */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Filter className="h-5 w-5 mr-2 text-emerald-400" />
                    Smart Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-emerald-300 mb-2 block">
                      Search by WMO ID
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-500" />
                      <Input
                        type="text"
                        placeholder="Enter WMO ID..."
                        value={filters.wmoId}
                        onChange={(e) =>
                          setFilters({ ...filters, wmoId: e.target.value })
                        }
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder-emerald-400/60 focus:border-emerald-500 focus:ring-emerald-500/50 backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-emerald-300 mb-2 block">
                      Institution
                    </label>
                    <Select
                      value={filters.institution}
                      onValueChange={(value) =>
                        setFilters({ ...filters, institution: value })
                      }
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white hover:border-emerald-500/50 transition-colors duration-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 backdrop-blur-xl">
                        <SelectItem value="all" className="text-white hover:bg-emerald-500/20">
                          All Institutions
                        </SelectItem>
                        {institutions.map((institution) => (
                          <SelectItem
                            key={institution}
                            value={institution}
                            className="text-white hover:bg-emerald-500/20"
                          >
                            {institution}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-emerald-300 mb-2 block">
                      Date Range
                    </label>
                    <Select
                      value={filters.dateRange}
                      onValueChange={(value) =>
                        setFilters({ ...filters, dateRange: value })
                      }
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white hover:border-emerald-500/50 transition-colors duration-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 backdrop-blur-xl">
                        <SelectItem value="all" className="text-white hover:bg-emerald-500/20">
                          All Time
                        </SelectItem>
                        <SelectItem value="recent" className="text-white hover:bg-emerald-500/20">
                          Last 30 Days
                        </SelectItem>
                        <SelectItem value="year" className="text-white hover:bg-emerald-500/20">
                          This Year
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Float List */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Layers className="h-5 w-5 mr-2 text-emerald-400" />
                    Float Network
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-96 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-emerald-500/50 scrollbar-track-transparent">
                    {filteredFloats.length > 0 ? (
                      filteredFloats.map((float: any) => {
                        const isSelected = selectedFloats.includes(float.wmo_id);
                        const hasInactiveStatus = Math.random() > 0.8; // Random status for demo
                        
                        return (
                          <div
                            key={float.wmo_id}
                            className={`p-3 rounded-lg cursor-pointer border transition-all duration-300 hover:scale-105 ${
                              isSelected
                                ? "bg-gradient-to-r from-emerald-600 to-green-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/25"
                                : "bg-white/5 border-white/20 text-emerald-100 hover:bg-white/10 hover:border-emerald-500/50"
                            }`}
                            onClick={() => handleFloatSelect(float.wmo_id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <div className="font-semibold text-sm">
                                    {float.wmo_id || 'Unknown ID'}
                                  </div>
                                  {hasInactiveStatus && (
                                    <AlertCircle className="h-3 w-3 text-yellow-400" />
                                  )}
                                </div>
                                <div className="text-xs opacity-75 flex items-center mt-1">
                                  <Building2 className="h-3 w-3 mr-1" />
                                  {float.institution || 'Unknown Institution'}
                                </div>
                                {isSelected && floatPredictions[float.wmo_id] && (
                                  <div className="text-xs text-emerald-200 mt-1 flex items-center">
                                    <Navigation className="h-3 w-3 mr-1" />
                                    {predictionDays}-day route active
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col items-center space-y-1">
                                <div
                                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    isSelected
                                      ? "bg-white animate-pulse"
                                      : hasInactiveStatus ? "bg-yellow-400" : "bg-emerald-400"
                                  }`}
                                ></div>
                                {isSelected && (
                                  <Navigation className="h-3 w-3 text-white animate-pulse" />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center text-emerald-500/60 py-8">
                        <Waves className="h-12 w-12 mx-auto mb-3 animate-bounce" />
                        <p>No floats found matching filters</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Stats */}
              <Card className="bg-slate-800 border-emerald-500/30 hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-emerald-400 animate-pulse" />
                    Network Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg border border-emerald-500/30">
                      <span className="text-emerald-300 text-sm">Active Floats</span>
                      <span className="text-white font-bold">
                        {floats.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg border border-emerald-500/30">
                      <span className="text-emerald-300 text-sm">Valid Coords</span>
                      <span className="text-white font-bold">
                        {validFloatsCount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg border border-emerald-500/30">
                      <span className="text-emerald-300 text-sm">Filtered</span>
                      <span className="text-white font-bold">
                        {filteredFloats.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-400/50">
                      <span className="text-blue-300 text-sm">Tracking</span>
                      <span className="text-blue-200 font-bold animate-pulse">
                        {selectedFloats.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg border border-emerald-500/30">
                      <span className="text-emerald-300 text-sm">Institutions</span>
                      <span className="text-white font-bold">
                        {institutions.length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Map */}
            <div className={`xl:col-span-3 transition-all duration-1400 delay-500 ${
              isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-emerald-500/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-6 w-6 mr-2 text-emerald-400" />
                      Ocean Observation Network
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="secondary"
                        className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      >
                        <Zap className="h-4 w-4 mr-1" />
                        {filteredFloats.length} Live
                      </Badge>
                      {showPredictions && selectedFloats.length > 0 && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-500/20 text-blue-300 border-blue-500/30"
                        >
                          <TrendingUp className="h-4 w-4 mr-1" />
                          {predictionDays}d Forecast
                        </Badge>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-0">
                  <div className="h-[700px] rounded-b-lg overflow-hidden relative">
                    <MapContainer
                      center={[20.3618, 62.5146]} // Centered on Arabian Sea like the image
                      zoom={6}
                      style={{ height: "100%", width: "100%" }}
                      className="z-0"
                    >
                      <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                      />

                      {/* Current Float Positions */}
                      {filteredFloats.map((float: any) => {
                        if (!float?.last_location?.latitude || !float?.last_location?.longitude) {
                          return null;
                        }

                        const lat = parseFloat(float.last_location.latitude);
                        const lng = parseFloat(float.last_location.longitude);

                        if (!isValidCoordinate(lat, lng)) {
                          return null;
                        }

                        const isSelected = selectedFloats.includes(float.wmo_id);
                        const status = Math.random() > 0.8 ? 'warning' : 'active'; // Random status for demo

                        return (
                          <Marker
                            key={float.wmo_id}
                            position={[lat, lng]}
                            icon={getFloatIcon(isSelected, status)}
                            eventHandlers={{
                              click: () => handleFloatSelect(float.wmo_id),
                            }}
                          >
                            <Popup className="custom-popup" maxWidth={350}>
                              <div className="bg-slate-900 text-white p-4 rounded-lg border border-emerald-500/30 backdrop-blur-xl">
                                <div className="flex items-center justify-between mb-4">
                                  <h3 className="text-xl font-bold text-emerald-300">
                                    {float.wmo_id || 'Unknown ID'}
                                  </h3>
                                  <div className="flex items-center space-x-2">
                                    <Badge
                                      className={
                                        isSelected
                                          ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                                          : status === 'warning'
                                          ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                          : "bg-slate-700 text-slate-300"
                                      }
                                    >
                                      {isSelected ? "🌊 Tracking" : status === 'warning' ? "⚠️ Warning" : "Active"}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                                  <div className="p-2 bg-white/5 rounded border border-white/10">
                                    <div className="text-emerald-400 text-xs">Institution</div>
                                    <div className="text-white font-medium">
                                      {float.institution || 'Unknown'}
                                    </div>
                                  </div>
                                  <div className="p-2 bg-white/5 rounded border border-white/10">
                                    <div className="text-emerald-400 text-xs">Type</div>
                                    <div className="text-white font-medium">
                                      {float.profiler_type || 'Standard'}
                                    </div>
                                  </div>
                                  <div className="p-2 bg-white/5 rounded border border-white/10">
                                    <div className="text-emerald-400 text-xs">Profiles</div>
                                    <div className="text-white font-medium">
                                      {float.profiles?.length || 0}
                                    </div>
                                  </div>
                                  <div className="p-2 bg-white/5 rounded border border-white/10">
                                    <div className="text-emerald-400 text-xs">Last Update</div>
                                    <div className="text-white font-medium text-xs">
                                      {float.last_update 
                                        ? new Date(float.last_update).toLocaleDateString()
                                        : 'Unknown'
                                      }
                                    </div>
                                  </div>
                                </div>

                                {/* Current Conditions */}
                                <div className="mb-4 p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                                  <div className="text-cyan-300 text-sm font-medium mb-2">Current Conditions</div>
                                  <div className="grid grid-cols-3 gap-2 text-xs">
                                    <div className="text-center">
                                      <div className="text-cyan-200">Depth</div>
                                      <div className="text-white font-bold">{Math.round(Math.random() * 2000 + 100)}m</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-cyan-200">Temp</div>
                                      <div className="text-white font-bold">{(20 + Math.random() * 10).toFixed(1)}°C</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-cyan-200">Sal</div>
                                      <div className="text-white font-bold">{(34 + Math.random() * 2).toFixed(1)} PSU</div>
                                    </div>
                                  </div>
                                </div>

                                {/* Prediction Info */}
                                {isSelected && showPredictions && floatPredictions[float.wmo_id] && (
                                  <div className="mb-4 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                                    <div className="flex items-center text-blue-300 text-sm font-medium mb-2">
                                      <Navigation className="h-4 w-4 mr-1" />
                                      Route Prediction ({predictionDays} days)
                                    </div>
                                    <div className="text-xs text-blue-200">
                                      Next position: {floatPredictions[float.wmo_id][1]?.position.map((c: number) => c.toFixed(3)).join(', ')}
                                    </div>
                                    <div className="text-xs text-blue-200">
                                      Confidence: {Math.round(floatPredictions[float.wmo_id][1]?.confidence * 100 || 0)}%
                                    </div>
                                  </div>
                                )}

                                <div className="flex space-x-2">
                                  <Button
                                    className={`flex-1 transition-all duration-300 hover:scale-105 ${
                                      isSelected
                                        ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400"
                                        : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500"
                                    } text-white`}
                                    onClick={() => handleFloatSelect(float.wmo_id)}
                                  >
                                    {isSelected ? (
                                      <>
                                        <Activity className="mr-2 h-4 w-4" />
                                        Stop Tracking
                                      </>
                                    ) : (
                                      <>
                                        <Target className="mr-2 h-4 w-4" />
                                        Start Tracking
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </Popup>
                          </Marker>
                        );
                      })}

                      {/* Predicted Routes */}
                      {showPredictions && Object.entries(floatPredictions).map(([floatId, predictions]) => {
                        const positions = predictions.map(p => p.position);
                        
                        return (
                          <React.Fragment key={`prediction-${floatId}`}>
                            {/* Route Line */}
                            <Polyline
                              positions={positions}
                              color="#3b82f6"
                              weight={3}
                              opacity={0.7}
                              dashArray="10, 10"
                            />
                            
                            {/* Prediction Points */}
                            {predictions.slice(1).map((prediction, index) => (
                              <CircleMarker
                                key={`${floatId}-pred-${index}`}
                                center={prediction.position}
                                radius={4}
                                color="#3b82f6"
                                fillColor="#60a5fa"
                                fillOpacity={Math.max(0.8 - (index * 0.05), 0.3)}
                                weight={2}
                              >
                                <Tooltip direction="top" offset={[0, -5]} opacity={0.9}>
                                  <div className="bg-slate-900 text-white p-2 rounded text-xs">
                                    <div className="font-semibold text-blue-300">
                                      {prediction.status}
                                    </div>
                                    <div className="text-blue-200">
                                      Date: {prediction.date}
                                    </div>
                                    <div className="text-blue-200">
                                      Confidence: {Math.round(prediction.confidence * 100)}%
                                    </div>
                                    <div className="text-blue-200">
                                      Est. Depth: {prediction.depth}m
                                    </div>
                                  </div>
                                </Tooltip>
                              </CircleMarker>
                            ))}
                          </React.Fragment>
                        );
                      })}

                      {/* Historical Trajectories */}
                      {selectedFloats.map((floatId: string) => {
                        const float = floats.find((f: any) => f.wmo_id === floatId);
                        
                        if (!float?.trajectory || !Array.isArray(float.trajectory)) {
                          return null;
                        }

                        const validPositions = float.trajectory
                          .filter((point: any) => 
                            point?.latitude !== undefined && 
                            point?.longitude !== undefined &&
                            isValidCoordinate(point.latitude, point.longitude)
                          )
                          .map((point: any) => [
                            parseFloat(point.latitude),
                            parseFloat(point.longitude),
                          ]);

                        if (validPositions.length < 2) {
                          return null;
                        }

                        return (
                          <Polyline
                            key={`history-${floatId}`}
                            positions={validPositions}
                            color="#10b981"
                            weight={2}
                            opacity={0.6}
                          />
                        );
                      })}
                    </MapContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Legend */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 mt-4 hover:border-emerald-500/30 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    {/* Float Status */}
                    <div>
                      <div className="text-emerald-300 font-semibold mb-2">Float Status</div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-emerald-200">Active (OMNI)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                          <span className="text-yellow-200">Warning</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          <span className="text-red-200">Inactive (OMNI)</span>
                        </div>
                      </div>
                    </div>

                    {/* Routes */}
                    <div>
                      <div className="text-blue-300 font-semibold mb-2">Route Types</div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <div className="w-4 h-0.5 bg-emerald-400 mr-2"></div>
                          <span className="text-emerald-200">Historical Path</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-0.5 bg-blue-400 mr-2 border-t-2 border-dashed border-blue-400"></div>
                          <span className="text-blue-200">Predicted Route</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-400 rounded-full mr-2 opacity-70"></div>
                          <span className="text-blue-200">Forecast Points</span>
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div>
                      <div className="text-cyan-300 font-semibold mb-2">Network Info</div>
                      <div className="space-y-1 text-xs">
                        <div className="text-cyan-200">
                          🌊 {filteredFloats.length} floats monitoring
                        </div>
                        <div className="text-cyan-200">
                          📡 Real-time data updates
                        </div>
                        <div className="text-cyan-200">
                          🔮 {predictionDays}-day route forecasts
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
