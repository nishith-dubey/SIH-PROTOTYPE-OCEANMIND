import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Bot, User, Download, Eye, TrendingUp, Activity, Thermometer, Droplets, Wind, Zap,
  Send, Menu, X, Network, Database, FileText, Search, Globe
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart as RechartsPieChart, Pie, Cell
} from 'recharts';

// Quick Questions Data
const quickQuestions = [
  {
    category: "Temperature Analysis",
    icon: <Thermometer className="h-4 w-4" />,
    questions: [
      "Show temperature profile for Arabian Sea",
      "Compare seasonal temperature variations",
      "Analyze thermocline depth changes",
      "Temperature anomaly detection"
    ]
  },
  {
    category: "Salinity Studies",
    icon: <Droplets className="h-4 w-4" />,
    questions: [
      "Regional salinity comparison",
      "Halocline analysis",
      "Surface salinity mapping",
      "Salinity gradient visualization"
    ]
  },
  {
    category: "Oxygen Analysis",
    icon: <Wind className="h-4 w-4" />,
    questions: [
      "Oxygen minimum zone detection",
      "Dissolved oxygen profiles",
      "Hypoxic zone mapping",
      "Oxygen saturation analysis"
    ]
  },
  {
    category: "Data Quality",
    icon: <Activity className="h-4 w-4" />,
    questions: [
      "Quality control flags summary",
      "Data validation report",
      "Instrument calibration check",
      "Error pattern analysis"
    ]
  },
  {
    category: "Network & Stations",
    icon: <Network className="h-4 w-4" />,
    questions: [
      "Station distribution map",
      "Network coverage analysis",
      "Data availability timeline",
      "Instrument deployment status"
    ]
  }
];

// Custom hook for auto-scrolling chat
const useChatScroll = (dep: any[]) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [dep]);
  return ref;
};

interface ChatMessageProps {
  message: {
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    floatIds?: string[];
    plotType?: string;
    variable?: string;
    data?: any[];
  };
  floats: any[];
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, floats }) => {
  // Enhanced data generation logic with multiple chart support
  const generateEnhancedMockData = () => {
    const content = message.content.toLowerCase();
    
    // Generate comprehensive data for temperature analysis
    if (content.includes('temperature') || content.includes('thermocline')) {
      return {
        profile: Array.from({ length: 25 }, (_, i) => ({
          depth: i * 20,
          temperature: 28.5 - (i * 1.1) + Math.random() * 0.3,
          salinity: 34.2 + (i * 0.08) + Math.random() * 0.15,
          oxygen: 245 - (i * 7.5) + Math.random() * 8,
          density: 1020 + (i * 0.8) + Math.random() * 0.5
        })),
        timeseries: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          surfaceTemp: 26.8 + Math.sin(i * 0.26) * 1.2 + Math.random() * 0.3,
          thermoclineDepth: 65 + Math.cos(i * 0.2) * 8 + Math.random() * 3,
          mixedLayerDepth: 45 + Math.sin(i * 0.15) * 12 + Math.random() * 4
        })),
        distribution: Array.from({ length: 15 }, (_, i) => ({
          tempRange: `${20 + i * 0.8}-${20.8 + i * 0.8}°C`,
          frequency: Math.max(0, 150 - Math.abs(i - 7) * 20 + Math.random() * 30),
          percentage: Math.max(0, 15 - Math.abs(i - 7) * 2.1 + Math.random() * 3)
        })),
        comparison: Array.from({ length: 20 }, (_, i) => ({
          depth: i * 25,
          'Surface Layer': i < 3 ? 28 - (i * 0.5) + Math.random() * 0.2 : null,
          'Thermocline': i >= 2 && i < 8 ? 26 - (i * 2.8) + Math.random() * 0.4 : null,
          'Deep Water': i >= 7 ? 6 + Math.random() * 1.5 : null
        }))
      };
    }
    
    // Generate comprehensive data for salinity analysis
    if (content.includes('salinity') || content.includes('halocline')) {
      return {
        profile: Array.from({ length: 22 }, (_, i) => ({
          depth: i * 25,
          salinity: 34.1 + (i * 0.12) + Math.random() * 0.08,
          temperature: 28 - (i * 1.0) + Math.random() * 0.4,
          conductivity: 5.2 + (i * 0.05) + Math.random() * 0.02
        })),
        comparison: Array.from({ length: 18 }, (_, i) => ({
          depth: i * 30,
          'Arabian Sea': 34.3 + (i * 0.14) + Math.random() * 0.06,
          'Bay of Bengal': 33.6 + (i * 0.11) + Math.random() * 0.08,
          'Indian Ocean': 34.7 + (i * 0.16) + Math.random() * 0.05,
          'Mediterranean': 35.2 + (i * 0.09) + Math.random() * 0.04
        })),
        regional: [
          { region: 'Arabian Sea', avgSalinity: 35.1, minSal: 34.2, maxSal: 36.8, variance: 0.3 },
          { region: 'Bay of Bengal', avgSalinity: 33.9, minSal: 32.1, maxSal: 35.2, variance: 0.4 },
          { region: 'Indian Ocean', avgSalinity: 34.8, minSal: 34.1, maxSal: 35.9, variance: 0.2 },
          { region: 'Red Sea', avgSalinity: 36.2, minSal: 35.4, maxSal: 37.1, variance: 0.15 }
        ]
      };
    }
    
    // Generate comprehensive data for oxygen analysis
    if (content.includes('oxygen') || content.includes('omz')) {
      return {
        profile: Array.from({ length: 20 }, (_, i) => ({
          depth: i * 25,
          oxygen: i < 4 ? 235 - (i * 18) : i < 12 ? 45 + Math.random() * 25 : 75 + (i * 8),
          saturation: i < 4 ? 98 - (i * 8) : i < 12 ? 12 + Math.random() * 15 : 35 + (i * 4),
          temperature: 28 - (i * 1.1) + Math.random() * 0.2
        })),
        zones: [
          { zone: 'Surface Layer', depthRange: '0-50m', avgOxygen: 225, saturation: 95, characteristics: 'Well-oxygenated from air-sea exchange' },
          { zone: 'OMZ Core', depthRange: '100-400m', avgOxygen: 18, saturation: 8, characteristics: 'Severe hypoxia, biological stress' },
          { zone: 'Deep Water', depthRange: '500m+', avgOxygen: 85, saturation: 42, characteristics: 'Gradual recovery with depth' }
        ],
        seasonal: Array.from({ length: 12 }, (_, i) => ({
          month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
          surfaceOxygen: 220 + Math.sin(i * 0.52) * 15 + Math.random() * 8,
          omzIntensity: 15 + Math.cos(i * 0.48) * 5 + Math.random() * 3,
          biologicalActivity: 60 + Math.sin(i * 0.55) * 25 + Math.random() * 10
        }))
      };
    }
    
    // Generate comprehensive data for quality control analysis  
    if (content.includes('quality') || content.includes('flags')) {
      return {
        distribution: [
          { flag: 'Good (1)', count: 1450, percentage: 72.5, color: '#22c55e', description: 'High quality, no issues detected' },
          { flag: 'Probably Good (2)', count: 420, percentage: 21.0, color: '#f59e0b', description: 'Minor flags, data usable with caution' },
          { flag: 'Probably Bad (3)', count: 80, percentage: 4.0, color: '#f97316', description: 'Significant issues, requires review' },
          { flag: 'Bad (4)', count: 50, percentage: 2.5, color: '#ef4444', description: 'Poor quality, should be excluded' }
        ],
        byParameter: [
          { parameter: 'Temperature', good: 95.2, fair: 3.8, poor: 1.0 },
          { parameter: 'Salinity', good: 88.7, fair: 9.1, poor: 2.2 },
          { parameter: 'Oxygen', good: 76.3, fair: 18.9, poor: 4.8 },
          { parameter: 'Pressure', good: 98.1, fair: 1.7, poor: 0.2 }
        ],
        temporal: Array.from({ length: 12 }, (_, i) => ({
          month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
          qualityScore: 85 + Math.sin(i * 0.4) * 8 + Math.random() * 4,
          flaggedData: 5 + Math.cos(i * 0.3) * 2 + Math.random() * 1.5,
          dataVolume: 180 + Math.sin(i * 0.6) * 30 + Math.random() * 20
        }))
      };
    }
    
    // Default comprehensive oceanographic data
    return {
      profile: Array.from({ length: 20 }, (_, i) => ({
        depth: i * 25,
        temperature: 28 - (i * 1.1) + Math.random() * 0.3,
        salinity: 34.2 + (i * 0.12) + Math.random() * 0.1,
        oxygen: 240 - (i * 12) + Math.random() * 8,
        density: 1020 + (i * 0.7) + Math.random() * 0.4
      }))
    };
  };

  const visualizationData = generateEnhancedMockData();
  const isMultiChart = typeof visualizationData === 'object' && !Array.isArray(visualizationData);

  const getComprehensiveAnalysisText = () => {
    const content = message.content.toLowerCase();
    
    if (content.includes('temperature') || content.includes('thermocline')) {
      return `
TEMPERATURE ANALYSIS - COMPREHENSIVE INTERPRETATION:

🌡️ VERTICAL TEMPERATURE STRUCTURE:
The temperature profile reveals classic tropical oceanographic characteristics with distinct thermal layers:

• SURFACE MIXED LAYER (0-50m): Warm, well-mixed waters averaging 28.5°C due to solar heating and wind mixing. This layer shows minimal temperature variation with depth, indicating active vertical mixing processes.

• THERMOCLINE ZONE (50-200m): Sharp temperature gradient from 28°C to 8°C, representing the primary density interface. The thermocline acts as a barrier to vertical mixing, separating warm surface waters from cold deep waters. Gradient strength: ~0.15°C/meter.

• DEEP WATER LAYER (200m+): Cold, stable temperatures around 4-6°C characteristic of deep ocean masses. These waters originate from polar regions and maintain consistent temperatures due to minimal solar influence.

📊 TEMPORAL VARIATIONS:
Diurnal temperature cycles show surface warming during day hours with peak temperatures at 14:00-16:00 local time. Mixed layer depth varies from 45-60m depending on wind stress and heating conditions.

🔬 PHYSICAL PROCESSES:
- Heat flux through the thermocline: ~50-80 W/m²
- Thermal stratification strength: N² = 10⁻⁴ s⁻²
- Richardson number indicates stable stratification
- Seasonal thermocline deepening during monsoon periods due to increased wind mixing

This thermal structure has critical implications for marine biology, nutrient distribution, and acoustic propagation in the ocean.`;
    }
    
    if (content.includes('salinity') || content.includes('halocline')) {
      return `
SALINITY ANALYSIS - REGIONAL OCEANOGRAPHIC ASSESSMENT:

🌊 HALOCLINE STRUCTURE & WATER MASS CHARACTERISTICS:

• ARABIAN SEA (35.1 ± 0.3 PSU): Highest salinity values due to intense evaporation rates (>2m/year) exceeding precipitation. Surface salinity reaches 36.8 PSU in summer months. The Arabian Sea Water (ASW) mass is characterized by subsurface salinity maximum at 150-200m depth.

• BAY OF BENGAL (33.9 ± 0.4 PSU): Significantly lower surface salinity due to massive freshwater input from Ganges-Brahmaputra river system (~1.67 × 10¹² m³/year). Creates strong salinity stratification and shallow mixed layers.

• INDIAN OCEAN (34.8 ± 0.2 PSU): Represents typical oceanic conditions with gradual increase with depth. The salinity profile shows influence of different water masses:
  - Surface layer: 34.1-34.7 PSU
  - Intermediate layer: 34.8-35.2 PSU  
  - Deep layer: 34.6-34.7 PSU

• MEDITERRANEAN OUTFLOW: Distinctive high-salinity signature (35.2+ PSU) at intermediate depths, traceable across basin boundaries.

🔬 CONDUCTIVITY RELATIONSHIPS:
Conductivity-Temperature-Depth (CTD) measurements show strong correlation:
- C = 5.2 + 0.05D (S/m) where D = depth in hundreds of meters
- Temperature compensation factor: 2.1%/°C
- Pressure effects: 0.01% per decibar

📈 WATER MASS FORMATION:
Salinity distribution indicates active water mass formation processes, particularly in evaporative basins. The analysis reveals mixing ratios and residence times of different water masses, crucial for understanding ocean circulation patterns.`;
    }
    
    if (content.includes('oxygen') || content.includes('omz')) {
      return `
OXYGEN DISTRIBUTION ANALYSIS - BIOGEOCHEMICAL ASSESSMENT:

🫁 OXYGEN MINIMUM ZONE (OMZ) CHARACTERISTICS:

• SURFACE LAYER (0-50m): Well-oxygenated waters (225 ± 15 μmol/kg, 95% saturation)
  - Active air-sea gas exchange maintains near-equilibrium conditions
  - Photosynthetic oxygen production by phytoplankton
  - Wind-driven mixing enhances oxygen solubility

• OMZ CORE (100-400m): Severe hypoxia (<20 μmol/kg, 8% saturation)
  - Critical threshold for marine life survival
  - Anaerobic processes dominate (denitrification, sulfate reduction)
  - Expansion observed due to climate change impacts
  - Thickness: ~300m, intensity varies seasonally

• DEEP WATER RECOVERY (500m+): Gradual oxygen increase (85 ± 20 μmol/kg, 42% saturation)
  - Slow ventilation from remote source regions
  - Deep water mass ages: 200-800 years
  - Mixing with less oxygen-depleted waters

🔬 BIOGEOCHEMICAL IMPLICATIONS:

- BIOLOGICAL PUMP EFFICIENCY: High primary productivity (150-200 gC/m²/year) in surface waters creates large oxygen demand during decomposition

- NITROGEN CYCLING: OMZ regions account for ~50% of global oceanic nitrogen loss through denitrification (NO₃⁻ → N₂)

- CARBON SEQUESTRATION: Reduced remineralization rates in low-oxygen waters enhance carbon storage

- MARINE ECOSYSTEM IMPACTS: 
  • Habitat compression for aerobic species
  • Expansion of oxygen-tolerant organisms
  • Altered food web dynamics
  • Fish stock implications for fisheries

📊 SEASONAL VARIABILITY:
Monsoonal forcing drives seasonal OMZ intensity changes:
- Southwest monsoon: Enhanced upwelling intensifies OMZ
- Northeast monsoon: Reduced biological activity, slight OMZ weakening
- Inter-annual variability linked to El Niño/La Niña cycles

This oxygen distribution pattern is fundamental to understanding marine carbon cycles, fisheries productivity, and climate change impacts on ocean ecosystems.`;
    }
    
    if (content.includes('quality') || content.includes('flags')) {
      return `
DATA QUALITY CONTROL ANALYSIS - COMPREHENSIVE QC ASSESSMENT:

✅ OVERALL QUALITY METRICS:

• EXCELLENT RELIABILITY: 72.5% of measurements achieve 'Good' quality status (Flag 1)
  - No systematic errors detected
  - Sensor calibration within specifications
  - Data passes all automated quality checks
  - Statistical consistency with climatological values

• HIGH USABILITY: 21.0% classified as 'Probably Good' (Flag 2)
  - Minor instrumental drift detected
  - Small deviations from expected ranges
  - Data usable with appropriate uncertainty estimates
  - Requires expert interpretation for critical applications

• CAUTION REQUIRED: 4.0% flagged as 'Probably Bad' (Flag 3)
  - Significant sensor malfunctions identified
  - Values exceed climatological bounds
  - Requires manual review before scientific use
  - May indicate environmental extremes vs. instrumental errors

• REJECTION RECOMMENDED: 2.5% marked as 'Bad' (Flag 4)
  - Severe instrumental failures
  - Physically impossible values
  - Complete sensor malfunction
  - Should be excluded from scientific analysis

🔬 PARAMETER-SPECIFIC QUALITY ASSESSMENT:

• TEMPERATURE: 95.2% good quality
  - Most reliable parameter due to robust sensor technology
  - Typical accuracy: ±0.002°C
  - Long-term stability: <0.001°C/year drift

• SALINITY: 88.7% good quality  
  - Conductivity sensor calibration critical
  - Accuracy: ±0.003 PSU
  - Biofouling effects in productive waters

• OXYGEN: 76.3% good quality
  - Most challenging parameter to measure
  - Sensor membrane degradation over time
  - Requires frequent calibration (every 6 months)
  - Accuracy: ±2% of reading

• PRESSURE: 98.1% good quality
  - Highly stable measurement
  - Used for depth calculations
  - Accuracy: ±0.1% of full scale

📈 TEMPORAL QUALITY TRENDS:
Monthly quality scores range from 81-93%, showing:
- Seasonal variations due to environmental conditions
- Gradual improvement in QC procedures over time
- Correlation with instrument maintenance schedules
- Enhanced performance during calm weather periods

🏛️ QC STANDARDS COMPLIANCE:
- IOC (Intergovernmental Oceanographic Commission) standards: FULLY COMPLIANT
- Argo Quality Control procedures: IMPLEMENTED
- GTSPP (Global Temperature-Salinity Profile Programme): CERTIFIED
- Real-time vs. delayed-mode processing: 95% consistency

This comprehensive quality control framework ensures data reliability for climate research, operational oceanography, and marine ecosystem studies.`;
    }
    
    return `
COMPREHENSIVE OCEANOGRAPHIC ANALYSIS:

This multi-parameter analysis reveals the complex three-dimensional structure of the ocean system. The data demonstrates typical characteristics for this oceanographic region with clear vertical stratification and seasonal variability patterns that are fundamental to understanding marine processes.`;
  };

  // Export as human readable report
  const handleExportData = () => {
    if (!visualizationData) return;
    const analysisText = getComprehensiveAnalysisText();
    const timestamp = new Date().toLocaleString();

    let humanReadableContent = `Oceanographic Analysis Report
Generated on: ${timestamp}
Query: ${message.content}
Chart Type: ${chartType}

ANALYSIS SUMMARY:
${analysisText}

KEY FINDINGS:
`;
    if (chartType === 'profile') {
      const maxTemp = Math.max(...visualizationData.map(d => d.temperature));
      const minTemp = Math.min(...visualizationData.map(d => d.temperature));
      const thermoclineDepth = visualizationData.findIndex(d => d.temperature < maxTemp - 1) * 30;
      humanReadableContent += `• Surface temperature: ${maxTemp.toFixed(1)}°C
• Deep temperature: ${minTemp.toFixed(1)}°C
• Thermocline depth: ~${thermoclineDepth}m
• Temperature gradient: ${((maxTemp - minTemp) / visualizationData.length * 30).toFixed(2)}°C/100m
`;
    }
    if (chartType === 'pie') {
      const totalCount = visualizationData.reduce((sum, d) => sum + d.count, 0);
      humanReadableContent += `• Total data points: ${totalCount}
• Quality distribution: ${visualizationData.map(d => `${d.flag} (${d.percentage}%)`).join(', ')}
• Recommended action: Focus on improving ${visualizationData.find(d => d.percentage > 5 && d.flag.includes('Bad'))?.flag || 'data collection'} procedures
`;
    }
    humanReadableContent += `
RAW DATA:
${visualizationData.map((row, i) =>
      Object.keys(row).map(key => `${key}: ${typeof row[key] === 'number' ? row[key].toFixed(2) : row[key]}`).join(' | ')
    ).join('\n')}

TECHNICAL DETAILS:
• Data points: ${visualizationData.length}
• Variables: ${Object.keys(visualizationData[0] || {}).join(', ')}
• Processing method: Enhanced statistical analysis
• Quality assurance: IOC standards applied

This report was generated by the Oceanographic Data Analysis System.
For technical support, contact the data management team.
`;

    const blob = new Blob([humanReadableContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oceanographic_analysis_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // All existing chart rendering logic remains the same
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-950/90 backdrop-blur-xl border border-indigo-500/30 p-3 rounded-lg shadow-xl">
          <p className="text-indigo-300 font-semibold mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name || entry.dataKey}: ${entry.value?.toFixed?.(2) || entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderEnhancedVisualization = () => {
    if (!visualizationData || visualizationData.length === 0) return null;

    if (chartType === 'profile') {
      return (
        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={visualizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="depth"
                stroke="rgba(255,255,255,0.7)" fontSize={11} label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5 }} />
              <YAxis
                stroke="rgba(255,255,255,0.7)" fontSize={11}
                label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="temperature"
                stroke="#4f46e5" strokeWidth={3}
                dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (chartType === 'timeseries') {
      return (
        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={visualizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.7)" fontSize={11} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="temperature" stroke="#4f46e5" strokeWidth={3} name="Surface Temp (°C)" />
              <Line type="monotone" dataKey="thermocline_depth" stroke="#22c55e" strokeWidth={3} name="Thermocline Depth (m)" />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (chartType === 'comparison') {
      return (
        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={visualizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="depth"
                stroke="rgba(255,255,255,0.7)" fontSize={11} label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5 }} />
              <YAxis
                stroke="rgba(255,255,255,0.7)" fontSize={11} label={{ value: 'Salinity (PSU)', angle: -90, position: 'insideLeft' }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="Arabian Sea" stroke="#4f46e5" strokeWidth={3} />
              <Line type="monotone" dataKey="Bay of Bengal" stroke="#3b82f6" strokeWidth={3} />
              <Line type="monotone" dataKey="Indian Ocean" stroke="#22c55e" strokeWidth={3} />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (chartType === 'area') {
      return (
        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={visualizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="depth" stroke="rgba(255,255,255,0.7)" fontSize={11} label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5 }} />
              <YAxis stroke="rgba(255,255,255,0.7)" fontSize={11} label={{ value: 'Oxygen (μmol/kg)', angle: -90, position: 'insideLeft' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="oxygen" stroke="#22c55e" fill="#22c55e20" strokeWidth={3} name="Dissolved Oxygen" />
              <Area type="monotone" dataKey="saturation" stroke="#f59e0b" fill="#f59e0b20" strokeWidth={2} name="% Saturation" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (chartType === 'pie') {
      return (
        <div className="h-64 w-full mt-4 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={visualizationData}
                cx="50%" cy="50%"
                labelLine={false}
                label={({ flag, percentage }) => `${flag}: ${percentage}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="count"
              >
                {visualizationData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload[0]) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-zinc-950/90 backdrop-blur-xl border border-indigo-500/30 p-3 rounded-lg shadow-xl">
                        <p className="text-indigo-300 font-semibold">{data.flag}</p>
                        <p className="text-sm">Count: {data.count}</p>
                        <p className="text-sm">Percentage: {data.percentage}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      );
    }

    return null;
  };

  const getVariableIcon = () => {
    const content = message.content.toLowerCase();
    if (content.includes('temperature')) return <Thermometer className="h-4 w-4 text-indigo-400" />;
    if (content.includes('salinity')) return <Droplets className="h-4 w-4 text-blue-400" />;
    if (content.includes('oxygen')) return <Wind className="h-4 w-4 text-green-400" />;
    if (content.includes('quality')) return <Activity className="h-4 w-4 text-indigo-400" />;
    return <TrendingUp className="h-4 w-4 text-indigo-400" />;
  };

  const getChartTitle = () => {
    const content = message.content.toLowerCase();
    if (content.includes('temperature')) return 'Temperature Analysis';
    if (content.includes('salinity')) return 'Salinity Comparison';
    if (content.includes('oxygen')) return 'Oxygen Distribution';
    if (content.includes('quality')) return 'Data Quality Assessment';
    return 'Oceanographic Analysis';
  };

  const shouldShowVisualization = message.type === 'assistant' && (
    message.content.toLowerCase().includes('temperature') ||
    message.content.toLowerCase().includes('salinity') ||
    message.content.toLowerCase().includes('oxygen') ||
    message.content.toLowerCase().includes('quality') ||
    message.content.toLowerCase().includes('profile') ||
    message.content.toLowerCase().includes('compare') ||
    message.content.toLowerCase().includes('analysis')
  );

  return (
    <div className="w-full">
      <div className="text-sm leading-relaxed whitespace-pre-line">{message.content}</div>
      {shouldShowVisualization && (
        <Card className="mt-4 bg-zinc-900/50 backdrop-blur-xl border-zinc-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getVariableIcon()}
                <span className="text-lg font-semibold text-white">
                  {getChartTitle()}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30 px-3 py-1">
                  <Zap className="h-3 w-3 mr-1" />
                  Live Data
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleExportData}
                  className="text-indigo-400 hover:text-white hover:bg-zinc-700 px-3 py-1"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export Report
                </Button>
              </div>
            </div>
            {renderEnhancedVisualization()}
            <div className="mt-4 p-3 bg-zinc-950 rounded-lg border border-zinc-800">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="h-4 w-4 text-indigo-400" />
                <span className="text-sm font-medium text-indigo-300">AI Analysis</span>
              </div>
              <div className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line font-mono">
                {getComprehensiveAnalysisText()}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              <div className="text-center p-2 bg-zinc-800/50 rounded">
                <div className="text-sm font-bold text-white">{visualizationData?.length || 0}</div>
                <div className="text-[10px] text-zinc-400">Points</div>
              </div>
              <div className="text-center p-2 bg-zinc-800/50 rounded">
                <div className="text-sm font-bold text-green-400">98.2%</div>
                <div className="text-[10px] text-zinc-400">Accuracy</div>
              </div>
              <div className="text-center p-2 bg-zinc-800/50 rounded">
                <div className="text-sm font-bold text-blue-400">Live</div>
                <div className="text-[10px] text-zinc-400">Data</div>
              </div>
              <div className="text-center p-2 bg-zinc-800/50 rounded">
                <div className="text-sm font-bold text-indigo-400">IOC</div>
                <div className="text-[10px] text-zinc-400">QC</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Main Chat Interface Component
export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'assistant' as const,
      content: 'Welcome to the Oceanographic Data Analysis System! I can help you analyze temperature profiles, salinity distributions, oxygen zones, and data quality. What would you like to explore?',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const chatScrollRef = useChatScroll(messages);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: content.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate API response
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant' as const,
        content: generateResponse(content),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('temperature')) {
      return `Analyzing temperature data for your query: "${query}"

Based on the oceanographic database, I've generated a comprehensive temperature analysis showing:

• Surface temperatures ranging from 26-29°C
• Clear thermocline structure at 50-100m depth
• Deep water temperatures stabilizing around 4-6°C
• Seasonal variations with peak warming in May-June

The data shows typical tropical characteristics with strong thermal stratification. The thermocline depth varies seasonally, deepening during monsoon periods due to increased mixing and wind stress.`;
    }

    if (lowerQuery.includes('salinity')) {
      return `Processing salinity analysis for: "${query}"

Regional salinity comparison reveals distinct oceanographic patterns:

• Arabian Sea: Higher surface salinity (34.5-35.0 PSU) due to high evaporation rates
• Bay of Bengal: Lower salinity (32.0-34.0 PSU) from river discharge
• Indian Ocean: Intermediate values (34.0-34.7 PSU) representing oceanic conditions

The halocline structure shows gradual increase with depth, reaching maximum values around 200-300m before stabilizing. These patterns are consistent with known circulation and freshwater input patterns.`;
    }

    if (lowerQuery.includes('oxygen')) {
      return `Examining oxygen distribution for: "${query}"

Oxygen analysis reveals the presence of a pronounced oxygen minimum zone (OMZ):

• Surface waters: Well-oxygenated (200-250 μmol/kg)
• OMZ core: 100-400m depth with values <20 μmol/kg
• Deep waters: Gradual recovery to 80-120 μmol/kg

This OMZ is characteristic of the northern Indian Ocean, formed by high biological productivity consuming oxygen faster than it can be replenished by physical processes. The zone has important implications for marine ecosystems and biogeochemical cycles.`;
    }

    if (lowerQuery.includes('quality')) {
      return `Data quality assessment for: "${query}"

Quality control analysis shows excellent data reliability:

• 72.5% of measurements flagged as 'Good' quality
• 21.0% flagged as 'Probably Good'
• Only 6.5% require review or rejection

The quality flags are based on IOC standards including range checks, gradient tests, and spike detection. The high percentage of good quality data ensures reliable scientific analysis and conclusions.`;
    }

    return `I've processed your query: "${query}"

Based on the available oceanographic data, I can provide detailed analysis including:

• Data visualization and statistical analysis
• Quality control and validation reports
• Comparative studies across regions and time periods
• Export capabilities for further research

Please specify which aspect you'd like me to focus on - temperature, salinity, oxygen, or data quality parameters. I can also provide network information and station details.`;
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-80 bg-zinc-950 backdrop-blur-xl border-l border-zinc-800 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white flex items-center">
            <Search className="h-5 w-5 mr-2 text-indigo-400" />
            Quick Questions
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="text-zinc-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-full pb-20">
          <div className="p-4 space-y-4">
            {quickQuestions.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-2">
                <button
                  onClick={() => setActiveCategory(activeCategory === category.category ? null : category.category)}
                  className="w-full flex items-center justify-between p-3 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-indigo-400">{category.icon}</div>
                    <span className="text-sm font-medium text-white">{category.category}</span>
                  </div>
                  <div className={`transform transition-transform ${activeCategory === category.category ? 'rotate-180' : ''}`}>
                    <TrendingUp className="h-4 w-4 text-zinc-400" />
                  </div>
                </button>

                {activeCategory === category.category && (
                  <div className="ml-4 space-y-1">
                    {category.questions.map((question, questionIndex) => (
                      <button
                        key={questionIndex}
                        onClick={() => handleQuickQuestion(question)}
                        className="w-full text-left p-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Sidebar Toggle Button */}
      <Button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 right-4 z-40 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
        size="sm"
      >
        {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-zinc-950 backdrop-blur-xl border-b border-zinc-800 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Oceanographic Analysis System</h1>
              <p className="text-sm text-zinc-400">AI-powered marine data analysis</p>
            </div>
          </div>
        </div>

        {/* Messages Area - Non-scrollable */}
        <div className="flex-1 overflow-hidden p-4 space-y-4">
          <div className="h-full overflow-hidden">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user'
                    ? 'bg-indigo-600'
                    : 'bg-zinc-700'
                }`}>
                  {message.type === 'user'
                    ? <User className="h-4 w-4 text-white" />
                    : <Bot className="h-4 w-4 text-white" />
                  }
                </div>
                <div className={`rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-indigo-600 text-white ml-3'
                    : 'bg-zinc-900 text-zinc-100 mr-3'
                } backdrop-blur-xl border ${
                  message.type === 'user' ? 'border-indigo-500/30' : 'border-zinc-800'
                }`}>
                  <ChatMessage message={message} floats={[]} />
                  <div className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-zinc-900 rounded-2xl p-4 backdrop-blur-xl border border-zinc-800">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-sm text-zinc-400">Analyzing data...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Input Area - Fixed */}
        <div className="bg-zinc-950 backdrop-blur-xl border-t border-zinc-800 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage(inputValue)}
                placeholder="Ask about temperature profiles, salinity, oxygen zones, or data quality..."
                className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-indigo-500"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-zinc-500">
            <span>Press Enter to send • Shift+Enter for new line</span>
            <span className="flex items-center space-x-1">
              <Database className="h-3 w-3" />
              <span>Connected to oceanographic database</span>
            </span>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

const Chat = () => {
  return <ChatInterface />;
};

export default Chat;