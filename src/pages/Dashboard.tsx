import React, { useState, useEffect } from 'react';
import { GeospatialDashboard } from '@/components/dashboard/GeospatialDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Database, 
  TrendingUp, 
  Activity, 
  Users,
  FileText,
  Shield,
  Globe,
  ArrowRight,
  Zap,
  Target,
  Brain,
  Sparkles
} from 'lucide-react';

const Dashboard = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="gov-header border-b">
        <div className="gov-container py-6">
          <div className={`flex items-center justify-between transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary rounded-lg shadow-sm">
                <BarChart3 className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary-foreground">
                  Analytics Dashboard
                </h1>
                <p className="text-primary-foreground/80">
                  Comprehensive oceanographic data analysis and visualization
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge className="bg-accent text-accent-foreground">
                <Shield className="h-4 w-4 mr-2" />
                Government Portal
              </Badge>
              <Badge variant="outline" className="border-white/40 text-white">
                <Activity className="h-4 w-4 mr-2" />
                Live Data
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="gov-container py-8">
        {/* Key Metrics Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {[
            { icon: Globe, title: 'Global', subtitle: 'Coverage' },
            { icon: Activity, title: 'Real-time', subtitle: 'Processing' },
            { icon: TrendingUp, title: 'Advanced', subtitle: 'Analytics' },
            { icon: Database, title: 'Secure', subtitle: 'Data Access' },
          ].map((item, idx) => (
            <Card key={idx} className="gov-card hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                {React.createElement(item.icon, { className: 'h-12 w-12 mx-auto mb-4 text-primary' })}
                <div className="text-3xl font-bold text-foreground mb-1">{item.title}</div>
                <div className="text-muted-foreground">{item.subtitle}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Component */}
        <div className={`transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <GeospatialDashboard />
        </div>

        {/* Call to Action */}
        <div className="mt-8 flex items-center justify-center">
          <Button className="gov-btn-primary px-6">
            Explore Advanced Analytics
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Additional Features Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="gov-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Export Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Export your data in multiple formats including CSV, ASCII tables, and NetCDF for further analysis.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">CSV</Badge>
                <Badge variant="secondary">ASCII</Badge>
                <Badge variant="secondary">NetCDF</Badge>
                <Badge variant="secondary">JSON</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="gov-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary" />
                Visualization Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Interactive 2D/3D maps, statistical charts, and comprehensive data tables for complete analysis.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">2D Maps</Badge>
                <Badge variant="secondary">3D Globe</Badge>
                <Badge variant="secondary">Charts</Badge>
                <Badge variant="secondary">Tables</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="gov-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Security Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Government-grade security with user authentication, audit trails, and secure data transmission.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Secure Access</Badge>
                <Badge variant="secondary">Audit Logs</Badge>
                <Badge variant="secondary">Encryption</Badge>
                <Badge variant="secondary">Compliance</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;