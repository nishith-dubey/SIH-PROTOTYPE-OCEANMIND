import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { HeroButton } from '@/components/ui/hero-button';
import { 
  Map, 
  LineChart, 
  BarChart3, 
  Activity, 
  MessageSquare, 
  BookOpen 
} from 'lucide-react';

const Index = () => {
  const { t } = useApp();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 gradient-ocean text-white overflow-hidden">
        <div className="absolute inset-0 animate-flow opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-wave">
              FloatChat
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Intelligent Oceanographic Data Explorer
            </p>
            <p className="text-lg mb-8 text-blue-200 max-w-2xl mx-auto">
              Discover, analyze, and understand Argo float data through interactive maps, 
              AI-powered chat, and comprehensive visualizations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <HeroButton variant="gradient-surface" size="xl" asChild>
                <Link to="/chat">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Start Exploring
                </Link>
              </HeroButton>
              <HeroButton variant="outline" size="xl" asChild>
                <Link to="/teachme">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Learn About Floats
                </Link>
              </HeroButton>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-surface/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quick Access</h2>
            <p className="text-muted-foreground">
              Jump straight into oceanographic data analysis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { to: '/explore', icon: Map, title: 'Explore Floats', desc: 'Interactive maps and trajectories' },
              { to: '/profiles', icon: LineChart, title: 'View Profiles', desc: 'Temperature, salinity, oxygen' },
              { to: '/compare', icon: BarChart3, title: 'Compare Data', desc: 'Side-by-side analysis' },
              { to: '/hovmoller', icon: Activity, title: 'Hovmöller', desc: 'Time-depth diagrams' }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.to} to={item.to}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 gradient-surface">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
