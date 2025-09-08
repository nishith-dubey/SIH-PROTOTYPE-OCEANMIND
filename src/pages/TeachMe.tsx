import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeroButton } from '@/components/ui/hero-button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  BookOpen, 
  ChevronDown, 
  ChevronRight, 
  AlertTriangle, 
  Clock, 
  Thermometer, 
  Waves, 
  BarChart3,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { mockGlossary } from '@/data/mockData';

const TeachMe = () => {
  const { language, t } = useApp();
  const [openSections, setOpenSections] = useState<string[]>(['qc-flags']);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const educationalSections = [
    {
      id: 'qc-flags',
      title: 'Quality Control Flags',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      content: {
        en: (
          <div className="space-y-4">
            <p>
              Quality Control (QC) flags are essential for understanding data reliability. 
              Each measurement has an associated flag indicating its quality:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-3 border rounded">
                  <Badge variant="default" className="bg-green-500">1</Badge>
                  <div>
                    <h4 className="font-medium">Good Data</h4>
                    <p className="text-sm text-muted-foreground">Passed all quality tests</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded">
                  <Badge variant="secondary">2</Badge>
                  <div>
                    <h4 className="font-medium">Probably Good</h4>
                    <p className="text-sm text-muted-foreground">Minor quality concerns</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded">
                  <Badge variant="outline">3</Badge>
                  <div>
                    <h4 className="font-medium">Probably Bad</h4>
                    <p className="text-sm text-muted-foreground">Failed some quality tests</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-3 border rounded">
                  <Badge variant="destructive">4</Badge>
                  <div>
                    <h4 className="font-medium">Bad Data</h4>
                    <p className="text-sm text-muted-foreground">Failed quality tests</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded">
                  <Badge variant="outline">8</Badge>
                  <div>
                    <h4 className="font-medium">Estimated</h4>
                    <p className="text-sm text-muted-foreground">Interpolated values</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded">
                  <Badge variant="outline">9</Badge>
                  <div>
                    <h4 className="font-medium">Missing</h4>
                    <p className="text-sm text-muted-foreground">No data available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        hi: (
          <div className="space-y-4">
            <p>
              गुणवत्ता नियंत्रण (QC) फ्लैग डेटा की विश्वसनीयता को समझने के लिए आवश्यक हैं। 
              प्रत्येक माप का एक संबद्ध फ्लैग होता है जो इसकी गुणवत्ता को दर्शाता है:
            </p>
            <div className="text-sm space-y-2">
              <p><strong>1:</strong> अच्छा डेटा - सभी गुणवत्ता परीक्षणों में उत्तीर्ण</p>
              <p><strong>2:</strong> शायद अच्छा - मामूली गुणवत्ता संबंधी चिंताएं</p>
              <p><strong>3:</strong> शायद खराब - कुछ गुणवत्ता परीक्षणों में असफल</p>
              <p><strong>4:</strong> खराब डेटा - गुणवत्ता परीक्षणों में असफल</p>
            </div>
          </div>
        )
      }
    },
    {
      id: 'rt-vs-dm',
      title: 'Real-time vs Delayed Mode',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      content: {
        en: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg bg-green-50">
                <h4 className="font-semibold text-green-800 mb-2">Real-time (RT)</h4>
                <ul className="text-sm space-y-1 text-green-700">
                  <li>• Available within 24 hours</li>
                  <li>• Automated processing</li>
                  <li>• Basic quality checks</li>
                  <li>• May contain errors</li>
                  <li>• Good for operational use</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg bg-purple-50">
                <h4 className="font-semibold text-purple-800 mb-2">Delayed Mode (DM)</h4>
                <ul className="text-sm space-y-1 text-purple-700">
                  <li>• Available after 6-12 months</li>
                  <li>• Expert scientific review</li>
                  <li>• Comprehensive quality control</li>
                  <li>• Calibration adjustments</li>
                  <li>• Research quality data</li>
                </ul>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Best Practice</h4>
              <p className="text-sm text-yellow-700">
                Always prefer *_ADJUSTED variables in Delayed Mode data for scientific analysis. 
                Real-time data is valuable for monitoring but should be used with caution for research.
              </p>
            </div>
          </div>
        ),
        hi: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">रीयल-टाइम डेटा</h4>
                <p className="text-sm">24 घंटे के भीतर उपलब्ध, स्वचालित प्रसंस्करण</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">विलंबित मोड डेटा</h4>
                <p className="text-sm">6-12 महीने बाद उपलब्ध, वैज्ञानिक समीक्षा के साथ</p>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      id: 'float-types',
      title: 'Argo Float Types',
      icon: Waves,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      content: {
        en: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">SOLO / SOLO-II</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Scripps Institution profiling float
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Temperature & Salinity</li>
                  <li>• 2000m depth capability</li>
                  <li>• 10-day cycle</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">APEX</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Teledyne Webb Research float
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Temperature & Salinity</li>
                  <li>• 2000m depth capability</li>
                  <li>• Configurable cycles</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">NAVIS</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Sea-Bird Scientific float
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Enhanced sensor packages</li>
                  <li>• BGC capabilities</li>
                  <li>• Deep profiling variants</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">BGC Floats</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Biogeochemical sensors
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Oxygen, pH, Chlorophyll</li>
                  <li>• Nitrate, Backscatter</li>
                  <li>• Downward irradiance</li>
                </ul>
              </div>
            </div>
          </div>
        ),
        hi: (
          <div className="space-y-4">
            <p>आर्गो फ्लोट्स विभिन्न प्रकार के होते हैं, प्रत्येक के अपने विशेष सेंसर और क्षमताएं होती हैं।</p>
          </div>
        )
      }
    },
    {
      id: 'oceanography',
      title: 'Oceanographic Concepts',
      icon: Thermometer,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      content: {
        en: (
          <div className="space-y-4">
            <div className="space-y-4">
              {Object.entries(mockGlossary).map(([term, definition]) => (
                <div key={term} className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">{term}</h4>
                  <p className="text-sm text-muted-foreground">
                    {definition[language as keyof typeof definition]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ),
        hi: (
          <div className="space-y-4">
            <div className="space-y-4">
              {Object.entries(mockGlossary).map(([term, definition]) => (
                <div key={term} className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">{term}</h4>
                  <p className="text-sm text-muted-foreground">
                    {definition[language as keyof typeof definition]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      }
    },
    {
      id: 'data-interpretation',
      title: 'Data Interpretation Tips',
      icon: BarChart3,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      content: {
        en: (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                <h4 className="font-medium text-blue-800">Temperature Profiles</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Look for the mixed layer (uniform temperature near surface), 
                  thermocline (rapid temperature drop), and deep water characteristics.
                </p>
              </div>
              <div className="p-4 border-l-4 border-green-500 bg-green-50">
                <h4 className="font-medium text-green-800">Salinity Patterns</h4>
                <p className="text-sm text-green-700 mt-1">
                  Surface salinity reflects evaporation/precipitation balance. 
                  Subsurface maxima often indicate water mass origins.
                </p>
              </div>
              <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                <h4 className="font-medium text-purple-800">Oxygen Levels</h4>
                <p className="text-sm text-purple-700 mt-1">
                  High surface oxygen from air-sea exchange. Oxygen minimum zones 
                  indicate biological consumption and limited ventilation.
                </p>
              </div>
            </div>
          </div>
        ),
        hi: (
          <div className="space-y-4">
            <p>डेटा की व्याख्या करने के लिए महत्वपूर्ण सुझाव और पैटर्न की पहचान।</p>
          </div>
        )
      }
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold gradient-ocean bg-clip-text text-transparent mb-2">
          Learn About Argo Floats
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Understanding oceanographic data, quality control, and how to interpret Argo float measurements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Quick Navigation */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                Quick Navigation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {educationalSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <Button
                      key={section.id}
                      variant={openSections.includes(section.id) ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => toggleSection(section.id)}
                    >
                      <Icon className={`h-4 w-4 mr-2 ${section.color}`} />
                      {section.title}
                    </Button>
                  );
                })}
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-2">Need Help?</h4>
                <HeroButton variant="coral" size="sm" className="w-full">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Ask ChatBot
                </HeroButton>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Educational Content */}
        <div className="lg:col-span-3 space-y-6">
          {educationalSections.map((section) => {
            const Icon = section.icon;
            const isOpen = openSections.includes(section.id);
            
            return (
              <Card key={section.id} className={isOpen ? `border-l-4 border-l-primary` : ''}>
                <Collapsible
                  open={isOpen}
                  onOpenChange={() => toggleSection(section.id)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${section.bgColor} mr-3`}>
                            <Icon className={`h-5 w-5 ${section.color}`} />
                          </div>
                          {section.title}
                        </div>
                        <div className="flex items-center space-x-2">
                          {isOpen && (
                            <Badge variant="outline" className="text-xs">
                              <Lightbulb className="h-3 w-3 mr-1" />
                              Learning
                            </Badge>
                          )}
                          {isOpen ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </div>
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      {section.content[language as keyof typeof section.content]}
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeachMe;