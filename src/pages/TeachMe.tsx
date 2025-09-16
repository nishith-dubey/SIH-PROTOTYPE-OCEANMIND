import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, CheckCircle, AlertCircle, XCircle, Clock, Database, TrendingUp, 
  Waves, Thermometer, Droplets, Wind, Eye, Brain, Target, Info, Sparkles,
  Globe, Zap, GraduationCap, Award, Languages
} from 'lucide-react';

// Ocean Background Component
const OceanBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="oceanGradientTeach" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(79, 70, 229, 0.1)" />
          <stop offset="100%" stopColor="rgba(99, 102, 241, 0.05)" />
        </linearGradient>
      </defs>
      
      <path d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z" fill="rgba(79, 70, 229, 0.05)">
        <animateTransform attributeName="transform" type="translate" values="0,0;50,0;0,0" dur="11s" repeatCount="indefinite"/>
      </path>
      
      <path d="M0,450 C400,350 800,550 1200,450 L1200,800 L0,800 Z" fill="rgba(99, 102, 241, 0.03)">
        <animateTransform attributeName="transform" type="translate" values="0,0;-30,0;0,0" dur="16s" repeatCount="indefinite"/>
      </path>
    </svg>
  </div>
);

// Floating Particles
const FloatingParticles = () => (
  <div className="fixed inset-0 pointer-events-none z-10">
    {Array.from({ length: 25 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-1.5 h-1.5 bg-indigo-400/25 rounded-full animate-bounce"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }}
      />
    ))}
  </div>
);

const TeachMe = () => {
  const { t } = useApp();
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi'>('en');
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const qcFlags = [
    { flag: '1', label: 'Good', desc: 'Passed all quality tests', color: 'bg-green-600', icon: CheckCircle },
    { flag: '2', label: 'Probably Good', desc: 'Minor quality concerns', color: 'bg-blue-600', icon: Info },
    { flag: '3', label: 'Probably Bad', desc: 'Failed some quality tests', color: 'bg-yellow-600', icon: AlertCircle },
    { flag: '4', label: 'Bad', desc: 'Failed quality tests', color: 'bg-red-600', icon: XCircle },
    { flag: '5', label: 'Changed', desc: 'Interpolated values', color: 'bg-purple-600', icon: TrendingUp },
    { flag: '9', label: 'Missing', desc: 'No data available', color: 'bg-zinc-600', icon: Clock }
  ];

  const qcFlagsHindi = [
    { flag: '1', label: 'अच्छा डेटा', desc: 'सभी गुणवत्ता परीक्षणों में उत्तीर्ण', color: 'bg-green-600', icon: CheckCircle },
    { flag: '2', label: 'शायद अच्छा', desc: 'मामूली गुणवत्ता संबंधी चिंताएं', color: 'bg-blue-600', icon: Info },
    { flag: '3', label: 'शायद खराब', desc: 'कुछ गुणवत्ता परीक्षणों में असफल', color: 'bg-yellow-600', icon: AlertCircle },
    { flag: '4', label: 'खराब डेटा', desc: 'गुणवत्ता परीक्षणों में असफल', color: 'bg-red-600', icon: XCircle },
    { flag: '5', label: 'परिवर्तित', desc: 'इंटरपोलेटेड मान', color: 'bg-purple-600', icon: TrendingUp },
    { flag: '9', label: 'अनुपस्थित', desc: 'कोई डेटा उपलब्ध नहीं', color: 'bg-zinc-600', icon: Clock }
  ];

  const dataModes = {
    en: [
      { 
        title: 'Real-time Mode', 
        desc: 'Available within 24 hours, automated processing', 
        color: 'bg-blue-600', 
        icon: Clock, 
        details: 'Data transmitted via satellite and processed automatically. Quality control is limited but provides immediate access to measurements.' 
      },
      { 
        title: 'Delayed Mode', 
        desc: 'Available after 6-12 months, scientific review', 
        color: 'bg-green-600', 
        icon: CheckCircle, 
        details: 'Extensively quality controlled and calibrated data. Preferred for scientific research and analysis.' 
      }
    ],
    hi: [
      { 
        title: 'रियल-टाइम मोड', 
        desc: '24 घंटे के भीतर उपलब्ध, स्वचालित प्रसंस्करण', 
        color: 'bg-blue-600', 
        icon: Clock, 
        details: 'सैटेलाइट के माध्यम से डेटा प्रसारित और स्वचालित रूप से संसाधित। गुणवत्ता नियंत्रण सीमित है लेकिन माप तक तत्काल पहुंच प्रदान करता है।' 
      },
      { 
        title: 'देरी मोड', 
        desc: '6-12 महीने बाद उपलब्ध, वैज्ञानिक समीक्षा के साथ', 
        color: 'bg-green-600', 
        icon: CheckCircle, 
        details: 'व्यापक गुणवत्ता नियंत्रण और कैलिब्रेटेड डेटा। वैज्ञानिक अनुसंधान और विश्लेषण के लिए पसंदीदा।' 
      }
    ]
  };

  const floatTypes = [
    { name: 'APEX', desc: 'Scripps Institution profiling float', icon: Waves, color: 'bg-indigo-600' },
    { name: 'SOLO', desc: 'Teledyne Webb Research float', icon: Target, color: 'bg-indigo-600' },
    { name: 'NAVIS', desc: 'Sea-Bird Scientific float', icon: Database, color: 'bg-indigo-600' },
    { name: 'BGC', desc: 'Biogeochemical sensors', icon: Brain, color: 'bg-indigo-600' }
  ];

  const oceanographicTerms = {
    en: {
      thermocline: "A layer in water where temperature decreases rapidly with increasing depth",
      halocline: "A layer where salinity changes rapidly with depth", 
      pycnocline: "A layer where water density increases rapidly with depth",
      mixedlayer: "Surface layer with relatively uniform temperature and salinity due to mixing"
    },
    hi: {
      thermocline: "पानी में एक परत जहाँ गहराई बढ़ने के साथ तापमान तेजी से घटता है",
      halocline: "एक परत जहाँ गहराई के साथ लवणता तेजी से बदलती है",
      pycnocline: "एक परत जहाँ पानी का घनत्व गहराई के साथ तेजी से बढ़ता है",
      mixedlayer: "मिश्रण के कारण अपेक्षाकृत समान तापमान और लवणता वाली सतही परत"
    }
  };

  const interpretationTips = {
    en: [
      { 
        title: 'Temperature Profiles', 
        desc: 'Look for the mixed layer (uniform temperature near surface), thermocline (rapid temperature drop), and deep water characteristics.', 
        icon: Thermometer, 
        color: 'bg-indigo-600' 
      },
      { 
        title: 'Salinity Patterns', 
        desc: 'Surface salinity reflects evaporation/precipitation balance. Subsurface maxima often indicate water mass origins.', 
        icon: Droplets, 
        color: 'bg-blue-600' 
      },
      { 
        title: 'Oxygen Distribution', 
        desc: 'High surface oxygen from air-sea exchange. Oxygen minimum zones indicate biological consumption and limited ventilation.', 
        icon: Wind, 
        color: 'bg-green-600' 
      }
    ],
    hi: [
      { 
        title: 'तापमान प्रोफाइल', 
        desc: 'मिश्रित परत (सतह के पास समान तापमान), थर्मोक्लाइन (तेज़ तापमान गिरावट), और गहरे पानी की विशेषताओं को देखें।', 
        icon: Thermometer, 
        color: 'bg-indigo-600' 
      },
      { 
        title: 'लवणता पैटर्न', 
        desc: 'सतही लवणता वाष्पीकरण/वर्षा संतुलन को दर्शाती है। उप-सतही अधिकतम अक्सर पानी के द्रव्यमान की उत्पत्ति का संकेत देते हैं।', 
        icon: Droplets, 
        color: 'bg-blue-600' 
      },
      { 
        title: 'ऑक्सीजन वितरण', 
        desc: 'हवा-समुद्र के आदान-प्रदान से उच्च सतही ऑक्सीजन। ऑक्सीजन न्यूनतम क्षेत्र जैविक उपभोग और सीमित वेंटिलेशन का संकेत देते हैं।', 
        icon: Wind, 
        color: 'bg-green-600' 
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden overflow-y-auto">
      <OceanBackground />
      <FloatingParticles />

      <div className="relative z-20">
        {/* Enhanced Header */}
        <div className="border-b border-indigo-500/20 bg-zinc-950/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className={`flex items-center justify-between transition-all duration-1000 ${
              isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
                  <div className="relative p-3 bg-zinc-900 backdrop-blur-xl rounded-xl border border-indigo-400/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <BookOpen className="h-8 w-8 text-indigo-400" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Ocean Learning Hub
                  </h1>
                  <p className="text-indigo-200/80">
                    Understanding oceanographic data, quality control, and interpretation
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge className="bg-indigo-600/20 text-indigo-300 border-indigo-500/30 px-4 py-2 backdrop-blur-sm">
                  <Brain className="h-4 w-4 mr-2 animate-pulse" />
                  Interactive Learning
                </Badge>
                
                {/* Language Toggle */}
                <div className="flex items-center bg-zinc-900 backdrop-blur-sm rounded-lg border border-zinc-800">
                    <Button
                      size="sm"
                      variant={selectedLanguage === 'en' ? 'default' : 'ghost'}
                      onClick={() => setSelectedLanguage('en')}
                      className={`${selectedLanguage === 'en' 
                        ? 'bg-indigo-600 text-white' 
                        : 'text-indigo-300 hover:text-white hover:bg-indigo-600/20'} transition-all duration-300`}
                    >
                      <Languages className="h-3 w-3 mr-1" />
                      EN
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedLanguage === 'hi' ? 'default' : 'ghost'}
                      onClick={() => setSelectedLanguage('hi')}
                      className={`${selectedLanguage === 'hi' 
                        ? 'bg-indigo-600 text-white' 
                        : 'text-indigo-300 hover:text-white hover:bg-indigo-600/20'} transition-all duration-300`}
                    >
                      हिं
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className={`transition-all duration-1200 delay-300 ${
            isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Tabs defaultValue="quality-control" className="space-y-8">
              
              {/* Enhanced Tab List */}
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
                <TabsTrigger 
                  value="quality-control" 
                  className="data-[state=active]:bg-indigo-600 text-white transition-all duration-300 hover:scale-105"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Quality Control
                </TabsTrigger>
                <TabsTrigger 
                  value="data-modes"
                  className="data-[state=active]:bg-indigo-600 text-white transition-all duration-300 hover:scale-105"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Data Modes
                </TabsTrigger>
                <TabsTrigger 
                  value="float-types"
                  className="data-[state=active]:bg-indigo-600 text-white transition-all duration-300 hover:scale-105"
                >
                  <Waves className="h-4 w-4 mr-2" />
                  Float Types
                </TabsTrigger>
                <TabsTrigger 
                  value="interpretation"
                  className="data-[state=active]:bg-indigo-600 text-white transition-all duration-300 hover:scale-105"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Interpretation
                </TabsTrigger>
                <TabsTrigger 
                  value="tutorials"
                  className="data-[state=active]:bg-indigo-600 text-white transition-all duration-300 hover:scale-105"
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Tutorials
                </TabsTrigger>
              </TabsList>

              {/* Quality Control Tab */}
              <TabsContent value="quality-control" className="space-y-6">
                <Card className="bg-zinc-900 border-zinc-800 hover:border-indigo-500/30 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Award className="h-6 w-6 mr-3 text-indigo-400" />
                      Quality Control Flags
                    </CardTitle>
                    <p className="text-indigo-200/80">
                      {selectedLanguage === 'en' 
                        ? "Quality Control (QC) flags are essential for understanding data reliability. Each measurement has an associated flag indicating its quality:" 
                        : "गुणवत्ता नियंत्रण (QC) फ्लैग डेटा की विश्वसनीयता को समझने के लिए आवश्यक हैं। प्रत्येक माप का एक संबद्ध फ्लैग होता है जो इसकी गुणवत्ता को दर्शाता है:"
                      }
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(selectedLanguage === 'en' ? qcFlags : qcFlagsHindi).map((item) => {
                        const Icon = item.icon;
                        return (
                          <Card key={item.flag} className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:scale-105">
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className={`p-2 ${item.color} rounded-lg`}>
                                  <Icon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <Badge className="bg-zinc-800 text-white font-mono text-xs">{item.flag}</Badge>
                                    <span className="font-semibold text-white">{item.label}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-zinc-300 leading-relaxed">{item.desc}</p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                    
                    <Card className="mt-6 bg-zinc-950 border-blue-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Zap className="h-5 w-5 text-yellow-400 mt-1" />
                          <p className="text-sm text-blue-200 leading-relaxed">
                            <strong>
                              {selectedLanguage === 'en' 
                                ? "Pro Tip:" 
                                : "महत्वपूर्ण सुझाव:"
                              }
                            </strong>{" "}
                            {selectedLanguage === 'en' 
                              ? "Always prefer *_ADJUSTED variables in Delayed Mode data for scientific analysis. Real-time data is valuable for monitoring but should be used with caution for research."
                              : "वैज्ञानिक विश्लेषण के लिए देरी मोड डेटा में हमेशा *_ADJUSTED चर को प्राथमिकता दें। रियल-टाइम डेटा मॉनिटरिंग के लिए मूल्यवान है लेकिन अनुसंधान के लिए सावधानी से उपयोग किया जाना चाहिए।"
                            }
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Data Modes Tab */}
              <TabsContent value="data-modes" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dataModes[selectedLanguage].map((mode, index) => {
                    const Icon = mode.icon;
                    return (
                      <Card key={index} className="bg-zinc-900 border-zinc-800 hover:border-indigo-500/30 transition-all duration-300 hover:scale-105">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center">
                            <div className={`p-3 ${mode.color} rounded-xl mr-4`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">{mode.title}</h3>
                              <p className="text-sm text-indigo-200 font-normal">{mode.desc}</p>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-zinc-300 leading-relaxed">{mode.details}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              {/* Float Types Tab */}
              <TabsContent value="float-types" className="space-y-6">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Waves className="h-6 w-6 mr-3 text-green-400" />
                      Argo Float Types
                    </CardTitle>
                    <p className="text-green-200/80">
                      {selectedLanguage === 'en' 
                        ? "Argo floats come in various types, each with their own specialized sensors and capabilities."
                        : "आर्गो फ्लोट्स विभिन्न प्रकार के होते हैं, प्रत्येक के अपने विशेष सेंसर और क्षमताएं होती हैं।"
                      }
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {floatTypes.map((float, index) => {
                        const Icon = float.icon;
                        return (
                          <Card key={float.name} className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:scale-105">
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-4">
                                <div className={`p-3 ${float.color} rounded-xl`}>
                                  <Icon className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-white text-lg">{float.name}</h4>
                                  <p className="text-sm text-zinc-300">{float.desc}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Oceanographic Terms */}
                <Card className="bg-zinc-950 border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Globe className="h-6 w-6 mr-3 text-blue-400" />
                      Key Oceanographic Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(oceanographicTerms[selectedLanguage]).map(([term, definition]) => (
                        <Card key={term} className="bg-zinc-900 border-zinc-800 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
                          <CardContent className="p-4">
                            <h4 className="font-bold text-blue-300 mb-2 capitalize">{term}</h4>
                            <p className="text-sm text-zinc-300 leading-relaxed">{definition}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Interpretation Tab */}
              <TabsContent value="interpretation" className="space-y-6">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <GraduationCap className="h-6 w-6 mr-3 text-indigo-400" />
                      Data Interpretation Guide
                    </CardTitle>
                    <p className="text-indigo-200/80">
                      {selectedLanguage === 'en' 
                        ? "Key tips and patterns for interpreting oceanographic data."
                        : "डेटा की व्याख्या करने के लिए महत्वपूर्ण सुझाव और पैटर्न की पहचान।"
                      }
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {interpretationTips[selectedLanguage].map((tip, index) => {
                        const Icon = tip.icon;
                        return (
                          <Card key={index} className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:scale-105">
                            <CardHeader>
                              <div className="flex items-center space-x-3">
                                <div className={`p-3 ${tip.color} rounded-xl`}>
                                  <Icon className="h-6 w-6 text-white" />
                                </div>
                                <CardTitle className="text-white text-lg">{tip.title}</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-zinc-300 text-sm leading-relaxed">{tip.desc}</p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* New Tutorials Tab */}
              <TabsContent value="tutorials" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Beginner Tutorial */}
                  <Card className="bg-zinc-900 border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <div className="p-3 bg-green-600 rounded-xl mr-4">
                          <Target className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Beginner's Guide</h3>
                          <p className="text-sm text-green-200 font-normal">Start your ocean data journey</p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-zinc-800 rounded-lg">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                          <div>
                            <h4 className="font-semibold text-white">Understanding Argo Floats</h4>
                            <p className="text-sm text-zinc-300">Learn what Argo floats are and how they work</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-zinc-800 rounded-lg">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                          <div>
                            <h4 className="font-semibold text-white">Reading Basic Profiles</h4>
                            <p className="text-sm text-zinc-300">How to interpret temperature and salinity profiles</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-zinc-800 rounded-lg">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                          <div>
                            <h4 className="font-semibold text-white">Quality Control Basics</h4>
                            <p className="text-sm text-zinc-300">Understanding data quality flags and what they mean</p>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-500 text-white">
                        Start Tutorial
                      </Button>
                    </CardContent>
                  </Card>
                  
                  {/* Advanced Tutorial */}
                  <Card className="bg-zinc-900 border-indigo-500/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <div className="p-3 bg-indigo-600 rounded-xl mr-4">
                          <Brain className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Advanced Analysis</h3>
                          <p className="text-sm text-indigo-200 font-normal">For experienced researchers</p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-zinc-800 rounded-lg">
                          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                          <div>
                            <h4 className="font-semibold text-white">Water Mass Analysis</h4>
                            <p className="text-sm text-zinc-300">Identify different water masses using T-S diagrams</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-zinc-800 rounded-lg">
                          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                          <div>
                            <h4 className="font-semibold text-white">Trend Analysis</h4>
                            <p className="text-sm text-zinc-300">Statistical methods for long-term climate studies</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-zinc-800 rounded-lg">
                          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                          <div>
                            <h4 className="font-semibold text-white">Data Processing</h4>
                            <p className="text-sm text-zinc-300">Advanced techniques for data calibration and correction</p>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">
                        Start Advanced Course
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Common Data Analysis Patterns */}
                <Card className="bg-zinc-950 border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingUp className="h-6 w-6 mr-3 text-blue-400" />
                      Common Analysis Patterns
                    </CardTitle>
                    <p className="text-blue-200/80">
                      Recognize these typical patterns in oceanographic data to gain insights into ocean processes.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Card className="bg-zinc-900 border-zinc-800">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 bg-red-600 rounded-lg">
                              <Thermometer className="h-5 w-5 text-white" />
                            </div>
                            <h4 className="font-semibold text-white">Temperature Inversion</h4>
                          </div>
                          <p className="text-sm text-zinc-300">Temperature increases with depth, often indicating mixing processes or specific water masses.</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-zinc-900 border-zinc-800">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 bg-blue-600 rounded-lg">
                              <Droplets className="h-5 w-5 text-white" />
                            </div>
                            <h4 className="font-semibold text-white">Salinity Maximum</h4>
                          </div>
                          <p className="text-sm text-zinc-300">Subsurface salinity peaks often indicate Mediterranean or Red Sea water intrusion.</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-zinc-900 border-zinc-800">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 bg-green-600 rounded-lg">
                              <Wind className="h-5 w-5 text-white" />
                            </div>
                            <h4 className="font-semibold text-white">Oxygen Minimum Zone</h4>
                          </div>
                          <p className="text-sm text-zinc-300">Low oxygen regions typically found at 200-1000m depth due to biological processes.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Research Applications */}
                <Card className="bg-zinc-950 border-indigo-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Sparkles className="h-6 w-6 mr-3 text-indigo-400" />
                      Research Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-white mb-3">Climate Studies</h4>
                        <ul className="space-y-2 text-sm text-zinc-300">
                          <li className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                            <span>Ocean heat content analysis</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                            <span>Sea level rise contributions</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                            <span>Deep water formation rates</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-3">Ocean Circulation</h4>
                        <ul className="space-y-2 text-sm text-zinc-300">
                          <li className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                            <span>Water mass tracking</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                            <span>Current system monitoring</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                            <span>Mixing process studies</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachMe;