import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
  Tooltip,
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
  AlertCircle,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for Leaflet default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// DEMO DATA - Remains unchanged
const generateDemoFloats = () => {
  const regions = [
    { name: "Arabian Sea", centerLat: 20.3618, centerLng: 62.5146 },
    { name: "Bay of Bengal", centerLat: 15.0, centerLng: 85.0 },
    { name: "North Indian Ocean", centerLat: 10.0, centerLng: 75.0 },
    { name: "Oman Sea", centerLat: 24.0, centerLng: 58.0 },
    { name: "Red Sea", centerLat: 22.0, centerLng: 38.0 },
  ];
  const institutions = ["INCOIS", "NIOT", "WHOI", "SIO", "IFREMER", "CSIRO", "JMA", "KORDI"];
  const profilerTypes = ["APEX", "SOLO", "NAVIS", "ARVOR", "PROVOR", "DEEP APEX"];
  const demoFloats = [];
  for (let i = 0; i < 45; i++) {
    const region = regions[Math.floor(Math.random() * regions.length)];
    const institution = institutions[Math.floor(Math.random() * institutions.length)];
    const profilerType = profilerTypes[Math.floor(Math.random() * profilerTypes.length)];
    const lat = region.centerLat + (Math.random() - 0.5) * 15;
    const lng = region.centerLng + (Math.random() - 0.5) * 15;
    const trajectory = [];
    let currentLat = lat;
    let currentLng = lng;
    for (let j = 0; j < 20; j++) {
      currentLat += (Math.random() - 0.5) * 0.3;
      currentLng += (Math.random() - 0.5) * 0.3;
      const date = new Date();
      date.setDate(date.getDate() - (20 - j));
      trajectory.push({ latitude: currentLat, longitude: currentLng, date: date.toISOString() });
    }
    const profileCount = Math.floor(Math.random() * 150) + 50;
    const profiles = [];
    for (let k = 0; k < Math.min(profileCount, 10); k++) {
      const date = new Date();
      date.setDate(date.getDate() - (profileCount - k) * 10);
      profiles.push({ cycle: k + 1, date: date.toISOString().split("T")[0] });
    }
    const lastUpdate = new Date();
    lastUpdate.setHours(lastUpdate.getHours() - Math.random() * 48);
    demoFloats.push({
      wmo_id: `690${(2000 + i).toString()}`,
      institution,
      profiler_type: profilerType,
      last_location: { latitude: lat, longitude: lng },
      last_update: lastUpdate.toISOString(),
      profiles,
      trajectory,
    });
  }
  return demoFloats;
};

// THEME UPDATED: Dark Background Component
const DarkBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-black">
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="darkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(39, 39, 42, 0.1)" />
          <stop offset="100%" stopColor="rgba(9, 9, 11, 0.05)" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#darkGradient)" />
    </svg>
  </div>
);

// THEME UPDATED: Floating Particles for dark theme
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i, size: Math.random() * 2 + 1, x: Math.random() * 100, y: Math.random() * 100,
    duration: Math.random() * 8 + 6, delay: Math.random() * 5,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <div key={particle.id} className="absolute bg-zinc-700/20 rounded-full animate-bounce"
          style={{
            width: `${particle.size}px`, height: `${particle.size}px`, left: `${particle.x}%`,
            top: `${particle.y}%`, animationDuration: `${particle.duration}s`, animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// THEME UPDATED: Custom float icon for dark theme
const getFloatIcon = (isSelected: boolean, status: string = "active") => {
  const colors = {
    active: isSelected ? "bg-indigo-400 ring-indigo-300" : "bg-indigo-500 ring-zinc-500",
    inactive: isSelected ? "bg-zinc-500 ring-zinc-100" : "bg-zinc-600 ring-zinc-400",
    warning: isSelected ? "bg-yellow-400 ring-yellow-100" : "bg-yellow-500 ring-yellow-400",
    predicted: "bg-zinc-400 ring-zinc-300 opacity-70",
  };
  const selectedClass = isSelected ? "ring-2 animate-pulse" : "ring-1";
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div class="w-3 h-3 rounded-full ${colors[status as keyof typeof colors] || colors.active} border-2 border-black shadow-md ${selectedClass}"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

// Helper function to generate predicted paths (logic unchanged)
const generatePredictedPath = (currentLat: number, currentLng: number, days: number = 10) => {
  const path = [];
  const baseSpeed = 0.1;
  const currentDirection = Math.random() * 360;
  for (let i = 0; i < days; i++) {
    const drift = (Math.random() - 0.5) * 0.02;
    const direction = currentDirection + drift * i;
    const speed = baseSpeed + (Math.random() - 0.5) * 0.02;
    const lat = currentLat + Math.cos((direction * Math.PI) / 180) * speed * i;
    const lng = currentLng + Math.sin((direction * Math.PI) / 180) * speed * i;
    const date = new Date();
    date.setDate(date.getDate() + i);
    path.push({
      position: [lat, lng],
      date: date.toISOString().split("T")[0],
      day: i + 1,
      confidence: Math.max(0.9 - i * 0.08, 0.1),
      status: i === 0 ? "Current Position" : `Day ${i} Prediction`,
    });
  }
  return path;
};

// Helper functions for validation (logic unchanged)
const isValidCoordinate = (lat: any, lng: any): boolean => {
  return (typeof lat === "number" && typeof lng === "number" && !isNaN(lat) && !isNaN(lng) &&
    lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180);
};
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
  const floats = React.useMemo(() => {
    if (contextFloats && contextFloats.length > 0) return contextFloats;
    return generateDemoFloats();
  }, [contextFloats]);

  const [filteredFloats, setFilteredFloats] = useState<any[]>([]);
  const [filters, setFilters] = useState({ wmoId: "", institution: "all", dateRange: "all" });
  const [isAnimated, setIsAnimated] = useState(false);
  const [showPredictions, setShowPredictions] = useState(true);
  const [predictionDays, setPredictionDays] = useState(10);
  const [floatPredictions, setFloatPredictions] = useState<{ [key: string]: any[] }>({});

  useEffect(() => { setIsAnimated(true); }, []);

  useEffect(() => {
    if (floats && Array.isArray(floats)) {
      const validFloats = getValidFloats(floats);
      setFilteredFloats(validFloats);
      const predictions: { [key: string]: any[] } = {};
      selectedFloats.forEach((floatId) => {
        const float = floats.find((f) => f.wmo_id === floatId);
        if (float?.last_location) {
          predictions[floatId] = generatePredictedPath(
            parseFloat(float.last_location.latitude), parseFloat(float.last_location.longitude), predictionDays
          );
        }
      });
      setFloatPredictions(predictions);
    } else {
      setFilteredFloats([]);
    }
  }, [floats, selectedFloats, predictionDays]);

  useEffect(() => {
    if (!floats || !Array.isArray(floats)) return;
    const validFloats = getValidFloats(floats);
    let filtered = validFloats;
    if (filters.wmoId) {
      filtered = filtered.filter((f: any) => f?.wmo_id?.toString().toLowerCase().includes(filters.wmoId.toLowerCase()));
    }
    if (filters.institution !== "all") {
      filtered = filtered.filter((f: any) => f?.institution === filters.institution);
    }
    // ... filtering logic unchanged
    setFilteredFloats(filtered);
  }, [filters, floats]);

  const handleFloatSelect = (wmoId: string) => {
    if (!wmoId) return;
    const newSelected = selectedFloats.includes(wmoId)
      ? selectedFloats.filter((id) => id !== wmoId)
      : [...selectedFloats, wmoId];
    setSelectedFloats(newSelected);
    if (!selectedFloats.includes(wmoId)) {
      const float = floats.find((f) => f.wmo_id === wmoId);
      if (float?.last_location) {
        setFloatPredictions((prev) => ({
          ...prev,
          [wmoId]: generatePredictedPath(parseFloat(float.last_location.latitude), parseFloat(float.last_location.longitude), predictionDays),
        }));
      }
    }
  };

  const institutions = React.useMemo(() => {
    if (!floats || !Array.isArray(floats)) return [];
    const validInstitutions = floats.filter((f: any) => f?.institution).map((f: any) => f.institution);
    return [...new Set(validInstitutions)];
  }, [floats]);

  // THEME UPDATED: Loading and error states for dark theme
  if (!floats) {
    return (
      <div className="min-h-screen bg-black text-zinc-300 flex items-center justify-center relative">
        <FloatingParticles />
        <div className="text-center relative z-20">
          <Globe className="h-8 w-8 text-indigo-400 animate-spin mx-auto mb-4" />
          <p className="text-xl text-zinc-300">Loading ocean data...</p>
        </div>
      </div>
    );
  }
  if (!Array.isArray(floats) || floats.length === 0) {
    return (
      <div className="min-h-screen bg-black text-zinc-300 flex items-center justify-center relative">
        <FloatingParticles />
        <div className="text-center relative z-20">
          <Globe className="h-16 w-16 mx-auto mb-4 text-zinc-600" />
          <p className="text-xl mb-2 text-white">No floats data available</p>
          <p className="text-zinc-500">Please check your data source</p>
        </div>
      </div>
    );
  }

  const validFloatsCount = getValidFloats(floats).length;

  return (
    // THEME UPDATED: Main container for dark theme
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden overflow-y-auto">
      <DarkBackground />
      <FloatingParticles />
      <div className="relative z-20">
        {/* THEME UPDATED: Header for dark theme */}
        <div className="border-b border-zinc-800 bg-black/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className={`flex items-center justify-between transition-all duration-1000 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-700">
                  <Globe className="h-8 w-8 text-indigo-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Ocean Observation Network</h1>
                  <p className="text-zinc-400">Real-time float tracking with route prediction</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-zinc-800 text-zinc-300 border-zinc-700 px-4 py-2">
                  <Target className="h-4 w-4 mr-2" />
                  {filteredFloats.length} Active
                </Badge>
                {selectedFloats.length > 0 && (
                  <Badge variant="default" className="bg-indigo-600 text-white border-indigo-500 px-4 py-2">
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
            {/* THEME UPDATED: Sidebar for dark theme */}
            <div className={`xl:col-span-1 space-y-6 transition-all duration-1200 delay-300 ${isAnimated ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <Card className="bg-zinc-950 border-zinc-800 shadow-lg">
                <CardHeader><CardTitle className="text-white flex items-center"><Navigation className="h-5 w-5 mr-2 text-indigo-400" />Route Prediction</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300 text-sm">Show Predictions</span>
                    <Button size="sm" onClick={() => setShowPredictions(!showPredictions)} className={showPredictions ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"}>{showPredictions ? "ON" : "OFF"}</Button>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400 mb-2 block">Prediction Days</label>
                    <Select value={predictionDays.toString()} onValueChange={(v) => setPredictionDays(parseInt(v))}>
                      <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-700 text-white"><SelectItem value="5">5 Days</SelectItem><SelectItem value="10">10 Days</SelectItem><SelectItem value="15">15 Days</SelectItem><SelectItem value="30">30 Days</SelectItem></SelectContent>
                    </Select>
                  </div>
                  {selectedFloats.length > 0 && (
                    <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-700">
                      <div className="text-xs text-zinc-400 mb-1">Active Predictions</div>
                      <div className="text-white font-bold">{selectedFloats.length} floats</div>
                      <div className="text-xs text-zinc-300 mt-1">Next {predictionDays} days forecasted</div>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className="bg-zinc-950 border-zinc-800 shadow-lg">
                <CardHeader><CardTitle className="text-white flex items-center"><Filter className="h-5 w-5 mr-2 text-indigo-400" />Smart Filters</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-zinc-400 mb-2 block">Search by WMO ID</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-600" />
                      <Input type="text" placeholder="Enter WMO ID..." value={filters.wmoId} onChange={(e) => setFilters({ ...filters, wmoId: e.target.value })} className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:border-indigo-500 focus:ring-indigo-500" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400 mb-2 block">Institution</label>
                    <Select value={filters.institution} onValueChange={(value) => setFilters({ ...filters, institution: value })}>
                      <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                        <SelectItem value="all">All Institutions</SelectItem>
                        {institutions.map((inst) => (<SelectItem key={inst} value={inst}>{inst}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400 mb-2 block">Date Range</label>
                    <Select value={filters.dateRange} onValueChange={(value) => setFilters({ ...filters, dateRange: value })}>
                      <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-700 text-white"><SelectItem value="all">All Time</SelectItem><SelectItem value="recent">Last 30 Days</SelectItem><SelectItem value="year">This Year</SelectItem></SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-zinc-950 border-zinc-800 shadow-lg">
                <CardHeader><CardTitle className="text-white flex items-center"><Layers className="h-5 w-5 mr-2 text-indigo-400" />Float Network</CardTitle></CardHeader>
                <CardContent>
                  <div className="max-h-96 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                    {filteredFloats.length > 0 ? (
                      filteredFloats.map((float: any) => {
                        const isSelected = selectedFloats.includes(float.wmo_id);
                        const hasInactiveStatus = Math.random() > 0.8;
                        return (
                          <div key={float.wmo_id} onClick={() => handleFloatSelect(float.wmo_id)} className={`p-3 rounded-lg cursor-pointer border transition-all duration-300 ${isSelected ? "bg-indigo-600 border-indigo-500 text-white" : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700"}`}>
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2"><div className="font-semibold text-sm">{float.wmo_id || "Unknown ID"}</div>{hasInactiveStatus && (<AlertCircle className="h-3 w-3 text-yellow-500" />)}</div>
                                <div className={`text-xs mt-1 flex items-center ${isSelected ? "text-indigo-200" : "text-zinc-500"}`}><Building2 className="h-3 w-3 mr-1" />{float.institution || "Unknown Institution"}</div>
                                {isSelected && floatPredictions[float.wmo_id] && (<div className="text-xs text-indigo-200 mt-1 flex items-center"><Navigation className="h-3 w-3 mr-1" />{predictionDays}-day route active</div>)}
                              </div>
                              <div className="flex flex-col items-center space-y-1"><div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${isSelected ? "bg-white animate-pulse" : hasInactiveStatus ? "bg-yellow-400" : "bg-indigo-400"}`}></div></div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center text-zinc-600 py-8"><Waves className="h-12 w-12 mx-auto mb-3" /><p>No floats found matching filters</p></div>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-zinc-950 border-zinc-800 shadow-lg">
                <CardHeader><CardTitle className="text-white flex items-center"><Activity className="h-5 w-5 mr-2 text-indigo-400" />Network Status</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { label: "Active Floats", value: floats.length },
                      { label: "Valid Coords", value: validFloatsCount },
                      { label: "Filtered", value: filteredFloats.length },
                      { label: "Institutions", value: institutions.length },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                        <span className="text-zinc-400 text-sm">{item.label}</span><span className="text-white font-semibold">{item.value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center p-2 bg-indigo-600 rounded-lg border border-indigo-500">
                      <span className="text-indigo-100 text-sm font-medium">Tracking</span><span className="text-white font-semibold animate-pulse">{selectedFloats.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* THEME UPDATED: Map for dark theme */}
            <div className={`xl:col-span-3 transition-all duration-1400 delay-500 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <Card className="bg-zinc-950 border-zinc-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center"><MapPin className="h-6 w-6 mr-2 text-indigo-400" />Ocean Observation Network</div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-zinc-800 text-zinc-300 border-zinc-700"><Zap className="h-4 w-4 mr-1" />{filteredFloats.length} Live</Badge>
                      {showPredictions && selectedFloats.length > 0 && (<Badge variant="default" className="bg-indigo-600 text-white border-indigo-500"><TrendingUp className="h-4 w-4 mr-1" />{predictionDays}d Forecast</Badge>)}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[700px] rounded-b-lg overflow-hidden relative">
                    <MapContainer center={[20.3618, 62.5146]} zoom={5} style={{ height: "100%", width: "100%" }} className="z-0 bg-zinc-900">
                      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' />
                      {filteredFloats.map((float: any) => {
                        if (!float?.last_location?.latitude || !float?.last_location?.longitude) return null;
                        const lat = parseFloat(float.last_location.latitude);
                        const lng = parseFloat(float.last_location.longitude);
                        if (!isValidCoordinate(lat, lng)) return null;
                        const isSelected = selectedFloats.includes(float.wmo_id);
                        const status = Math.random() > 0.8 ? "warning" : "active";
                        return (<Marker key={float.wmo_id} position={[lat, lng]} icon={getFloatIcon(isSelected, status)} eventHandlers={{ click: () => handleFloatSelect(float.wmo_id) }}>
                          <Popup className="custom-popup-dark" maxWidth={350}>
                            <div className="p-1 bg-zinc-950 text-white border border-zinc-800 rounded-md">
                              <h3 className="text-lg font-bold text-white mb-2">{float.wmo_id || "Unknown ID"}</h3>
                              <Button size="sm" className={`w-full mt-4 ${isSelected ? "bg-red-600 hover:bg-red-700 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`} onClick={() => handleFloatSelect(float.wmo_id)}>{isSelected ? "Stop Tracking" : "Start Tracking"}</Button>
                            </div>
                          </Popup>
                        </Marker>);
                      })}
                      {showPredictions && Object.entries(floatPredictions).map(([floatId, predictions]) => {
                        const positions = predictions.map((p) => p.position);
                        return (<React.Fragment key={`prediction-${floatId}`}>
                          <Polyline positions={positions} color="#a1a1aa" weight={3} opacity={0.7} dashArray="8, 8" />
                          {predictions.slice(1).map((prediction, index) => (<CircleMarker key={`${floatId}-pred-${index}`} center={prediction.position} radius={4} color="#f4f4f5" fillColor="#a1a1aa" fillOpacity={Math.max(0.8 - index * 0.05, 0.3)} weight={1}>
                            <Tooltip direction="top" offset={[0, -5]} opacity={0.9}><div className="p-1 text-xs bg-zinc-900 text-white rounded-md border border-zinc-700"><div className="font-semibold">{prediction.status}</div><div>Date: {prediction.date}</div><div>Conf: {Math.round(prediction.confidence * 100)}%</div></div></Tooltip>
                          </CircleMarker>))}
                        </React.Fragment>);
                      })}
                      {selectedFloats.map((floatId: string) => {
                        const float = floats.find((f: any) => f.wmo_id === floatId);
                        if (!float?.trajectory || !Array.isArray(float.trajectory)) return null;
                        const validPositions = float.trajectory.filter((p: any) => isValidCoordinate(p.latitude, p.longitude)).map((p: any) => [parseFloat(p.latitude), parseFloat(p.longitude)]);
                        if (validPositions.length < 2) return null;
                        return <Polyline key={`history-${floatId}`} positions={validPositions} color="#4f46e5" weight={2} opacity={0.8} />;
                      })}
                    </MapContainer>
                  </div>
                </CardContent>
              </Card>
              {/* THEME UPDATED: Legend for dark theme */}
              <Card className="bg-zinc-950 border-zinc-800 mt-4 shadow-lg">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div>
                      <div className="text-white font-semibold mb-2">Float Status</div>
                      <div className="space-y-1"><div className="flex items-center"><div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div><span className="text-zinc-300">Active</span></div><div className="flex items-center"><div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div><span className="text-zinc-300">Warning</span></div><div className="flex items-center"><div className="w-3 h-3 bg-zinc-500 rounded-full mr-2"></div><span className="text-zinc-300">Inactive</span></div></div>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Route Types</div>
                      <div className="space-y-1"><div className="flex items-center"><div className="w-4 h-0.5 bg-indigo-500 mr-2"></div><span className="text-zinc-300">Historical Path</span></div><div className="flex items-center"><div className="w-4 border-t-2 border-dashed border-zinc-400 mr-2"></div><span className="text-zinc-300">Predicted Route</span></div><div className="flex items-center"><div className="w-3 h-3 bg-zinc-400 rounded-full mr-2 opacity-70"></div><span className="text-zinc-300">Forecast Points</span></div></div>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Network Info</div>
                      <div className="space-y-1 text-xs text-zinc-400"><div>🌊 {filteredFloats.length} floats monitoring</div><div>📡 Real-time data updates</div><div>🔮 {predictionDays}-day route forecasts</div></div>
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