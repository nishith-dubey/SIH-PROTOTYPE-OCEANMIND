// Mock data for FloatChat MVP
export interface FloatProfile {
  cycle: number;
  depths: number[];
  temperature?: number[];
  salinity?: number[];
  oxygen?: number[];
  date?: string;
}

export interface ArgoFloat {
  wmo_id: string;
  institution: string;
  profiler_type: string;
  last_update: string;
  trajectory: [number, number][];
  profiles: FloatProfile[];
  metadata?: {
    platform_number?: string;
    deployment_date?: string;
    status?: string;
    qc_flags?: number[];
  };
}

export const mockFloats: ArgoFloat[] = [
  {
    wmo_id: "13857",
    institution: "AOML",
    profiler_type: "845 (SOLO-II)",
    last_update: "2018-10-11T20:00:14Z",
    trajectory: [
      [-60.0, 20.0],
      [-59.8, 19.9],
      [-59.5, 19.8],
      [-59.3, 19.7],
      [-59.0, 19.6],
      [-58.8, 19.5],
      [-58.5, 19.4]
    ],
    profiles: [
      {
        cycle: 1,
        date: "2018-01-15",
        depths: [0, 25, 50, 75, 100, 150, 200, 300, 400, 500],
        temperature: [28.5, 28.2, 27.8, 26.5, 24.2, 20.1, 15.8, 12.3, 9.2, 7.1],
        salinity: [35.1, 35.0, 34.9, 34.8, 34.7, 34.6, 34.5, 34.4, 34.3, 34.2],
        oxygen: [220, 215, 210, 205, 200, 180, 160, 140, 120, 100]
      },
      {
        cycle: 2,
        date: "2018-02-05",
        depths: [0, 25, 50, 75, 100, 150, 200, 300, 400, 500],
        temperature: [27.8, 27.5, 27.1, 25.8, 23.5, 19.4, 15.1, 11.6, 8.8, 6.9],
        salinity: [35.0, 34.9, 34.8, 34.7, 34.6, 34.5, 34.4, 34.3, 34.2, 34.1],
        oxygen: [225, 220, 215, 210, 205, 185, 165, 145, 125, 105]
      },
      {
        cycle: 3,
        date: "2018-02-25",
        depths: [0, 25, 50, 75, 100, 150, 200, 300, 400, 500],
        temperature: [29.1, 28.8, 28.4, 27.1, 24.8, 20.8, 16.5, 13.0, 9.8, 7.5],
        salinity: [35.2, 35.1, 35.0, 34.9, 34.8, 34.7, 34.6, 34.5, 34.4, 34.3],
        oxygen: [218, 213, 208, 203, 198, 178, 158, 138, 118, 98]
      }
    ],
    metadata: {
      platform_number: "1901393",
      deployment_date: "2017-12-15",
      status: "Active",
      qc_flags: [1, 1, 2, 1, 1, 1, 2, 1, 1, 1]
    }
  },
  {
    wmo_id: "15855",
    institution: "INCOIS",
    profiler_type: "831 (APEX)",
    last_update: "2018-10-11T20:00:34Z",
    trajectory: [
      [70.0, 10.0],
      [70.1, 10.05],
      [70.2, 10.1],
      [70.3, 10.15],
      [70.4, 10.2],
      [70.5, 10.25],
      [70.6, 10.3]
    ],
    profiles: [
      {
        cycle: 1,
        date: "2018-03-01",
        depths: [0, 25, 50, 75, 100, 150, 200, 300, 400, 500],
        temperature: [30.2, 29.8, 29.4, 28.1, 25.8, 21.5, 17.2, 13.7, 10.4, 8.1],
        salinity: [35.0, 34.9, 34.8, 34.7, 34.6, 34.5, 34.4, 34.3, 34.2, 34.1],
        oxygen: [210, 205, 200, 195, 190, 170, 150, 130, 110, 90]
      },
      {
        cycle: 2,
        date: "2018-03-21",
        depths: [0, 25, 50, 75, 100, 150, 200, 300, 400, 500],
        temperature: [29.5, 29.1, 28.7, 27.4, 25.1, 20.8, 16.5, 13.0, 9.7, 7.4],
        salinity: [34.9, 34.8, 34.7, 34.6, 34.5, 34.4, 34.3, 34.2, 34.1, 34.0],
        oxygen: [215, 210, 205, 200, 195, 175, 155, 135, 115, 95]
      }
    ],
    metadata: {
      platform_number: "2902746",
      deployment_date: "2018-01-10",
      status: "Active",
      qc_flags: [1, 1, 1, 1, 2, 1, 1, 1, 1, 1]
    }
  },
  {
    wmo_id: "16789",
    institution: "CSIRO",
    profiler_type: "846 (NAVIS_EBR)",
    last_update: "2018-10-12T15:30:22Z",
    trajectory: [
      [120.0, -30.0],
      [120.2, -29.8],
      [120.4, -29.6],
      [120.6, -29.4],
      [120.8, -29.2],
      [121.0, -29.0]
    ],
    profiles: [
      {
        cycle: 1,
        date: "2018-04-01",
        depths: [0, 25, 50, 75, 100, 150, 200, 300, 400, 500],
        temperature: [22.5, 22.1, 21.7, 20.4, 18.1, 14.8, 11.5, 8.2, 5.9, 4.6],
        salinity: [35.8, 35.7, 35.6, 35.5, 35.4, 35.3, 35.2, 35.1, 35.0, 34.9],
        oxygen: [240, 235, 230, 225, 220, 200, 180, 160, 140, 120]
      }
    ],
    metadata: {
      platform_number: "5906204",
      deployment_date: "2018-02-20",
      status: "Active",
      qc_flags: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }
  }
];

export const mockChatResponses = [
  {
    query: "Show me salinity profiles near 10N 70E",
    response: "I found 2 active floats within 200km of your location. Float 15855 has recent salinity data showing typical Arabian Sea characteristics with higher surface salinity (35.0 PSU) decreasing with depth.",
    floatIds: ["15855"],
    plotType: "profile",
    variable: "salinity"
  },
  {
    query: "What is the temperature at 100m depth?",
    response: "At 100m depth, the temperature ranges from 18.1°C to 25.8°C across the available floats. This shows typical thermocline characteristics with rapid temperature decrease.",
    floatIds: ["13857", "15855", "16789"],
    plotType: "depth_slice",
    variable: "temperature"
  },
  {
    query: "Compare oxygen levels between regions",
    response: "Oxygen comparison shows Arabian Sea (Float 15855) has lower oxygen at depth (~95 μmol/kg at 500m) compared to Atlantic (Float 13857) with ~105 μmol/kg, indicating different water mass characteristics.",
    floatIds: ["13857", "15855"],
    plotType: "comparison",
    variable: "oxygen"
  },
  {
    query: "temperature profile analysis",
    response: "Temperature profile analysis reveals a well-defined thermocline structure. Surface mixed layer extends to ~50m with temperatures around 28°C, followed by rapid decrease through the thermocline to ~7°C at 500m depth.",
    floatIds: ["13857"],
    plotType: "profile", 
    variable: "temperature"
  },
  {
    query: "salinity distribution patterns",
    response: "Salinity distribution shows typical ocean stratification. Surface salinity reflects evaporation-precipitation balance, with subsurface maximum indicating water mass origins and mixing processes.",
    floatIds: ["15855", "16789"],
    plotType: "comparison",
    variable: "salinity"
  },
  {
    query: "oxygen minimum zone analysis", 
    response: "Oxygen minimum zone is clearly visible between 200-400m depth. This feature indicates biological oxygen consumption and limited ventilation in intermediate waters.",
    floatIds: ["13857", "15855"],
    plotType: "profile",
    variable: "oxygen"
  },
  {
    query: "multi-float comparison",
    response: "Multi-float comparison reveals significant regional differences. Atlantic floats show different temperature-salinity characteristics compared to Indian Ocean floats, reflecting distinct water mass properties.",
    floatIds: ["13857", "15855", "16789"],
    plotType: "comparison",
    variable: "temperature"
  }
];

export const mockGlossary = {
  "QC Flag": {
    en: "Quality Control flags indicate data reliability: 1=Good, 2=Probably good, 3=Probably bad, 4=Bad, 8=Estimated, 9=Missing",
    hi: "गुणवत्ता नियंत्रण फ्लैग डेटा की विश्वसनीयता दर्शाते हैं: 1=अच्छा, 2=शायद अच्छा, 3=शायद खराब, 4=खराब"
  },
  "Real-time": {
    en: "Data transmitted immediately from float via satellite, may contain errors before quality control",
    hi: "फ्लोट से तुरंत उपग्रह के माध्यम से प्रेषित डेटा, गुणवत्ता नियंत्रण से पहले त्रुटियां हो सकती हैं"
  },
  "Delayed Mode": {
    en: "Data processed by scientists with advanced quality control and calibration adjustments",
    hi: "वैज्ञानिकों द्वारा उन्नत गुणवत्ता नियंत्रण और अंशांकन समायोजन के साथ प्रसंस्कृत डेटा"
  },
  "Mixed Layer Depth": {
    en: "The depth of the well-mixed surface layer, typically where temperature is nearly uniform",
    hi: "अच्छी तरह मिश्रित सतही परत की गहराई, आमतौर पर जहां तापमान लगभग एकसमान होता है"
  },
  "Thermocline": {
    en: "Layer where temperature rapidly decreases with depth, typically 100-1000m",
    hi: "परत जहां गहराई के साथ तापमान तेजी से घटता है, आमतौर पर 100-1000 मीटर"
  },
  "PSU": {
    en: "Practical Salinity Unit - dimensionless unit for measuring seawater salinity",
    hi: "व्यावहारिक लवणता इकाई - समुद्री जल की लवणता मापने के लिए आयामरहित इकाई"
  }
};

export const translations = {
  en: {
    home: "Home",
    chat: "Chat Assistant",
    explore: "Explore Floats",
    profiles: "Profiles",
    hovmoller: "Hovmöller",
    compare: "Compare",
    teachMe: "Teach Me",
    provenance: "Provenance",
    language: "Language",
    search: "Search floats by WMO ID, location, or time...",
    export: "Export",
    csv: "CSV",
    netcdf: "NetCDF",
    notebook: "Notebook",
    floatData: "Float Data",
    depth: "Depth (m)",
    temperature: "Temperature (°C)",
    salinity: "Salinity (PSU)",
    oxygen: "Oxygen (μmol/kg)",
    cycle: "Cycle",
    loading: "Loading...",
    noData: "No data available"
  },
  hi: {
    home: "होम",
    chat: "चैट सहायक",
    explore: "फ्लोट्स खोजें",
    profiles: "प्रोफाइल्स",
    hovmoller: "होवमोलर",
    compare: "तुलना",
    teachMe: "मुझे सिखाएं",
    provenance: "उत्पत्ति",
    language: "भाषा",
    search: "WMO ID, स्थान, या समय से फ्लोट्स खोजें...",
    export: "निर्यात",
    csv: "CSV",
    netcdf: "NetCDF",
    notebook: "नोटबुक",
    floatData: "फ्लोट डेटा",
    depth: "गहराई (मी)",
    temperature: "तापमान (°C)",
    salinity: "लवणता (PSU)",
    oxygen: "ऑक्सीजन (μmol/kg)",
    cycle: "चक्र",
    loading: "लोड हो रहा है...",
    noData: "कोई डेटा उपलब्ध नहीं"
  }
};