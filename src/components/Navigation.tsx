import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { 
  Home, 
  MessageSquare, 
  Map, 
  LineChart, 
  Activity, 
  BarChart3, 
  BookOpen, 
  FileText,
  Globe,
  Waves,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from 'next-themes';

const Navigation = () => {
  const { language, setLanguage, t } = useApp();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/chat', icon: MessageSquare, label: t('chat') },
    { path: '/explore', icon: Map, label: t('explore') },
    { path: '/profiles', icon: LineChart, label: t('profiles') },
    { path: '/hovmoller', icon: Activity, label: t('hovmoller') },
    { path: '/compare', icon: BarChart3, label: t('compare') },
    { path: '/teachme', icon: BookOpen, label: t('teachMe') },
    { path: '/provenance', icon: FileText, label: t('provenance') }
  ];

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl gradient-ocean bg-clip-text text-transparent">
            <Waves className="h-6 w-6 text-primary animate-wave" />
            <span>FloatChat</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button 
                    variant={isActive(item.path) ? "default" : "ghost"} 
                    size="sm"
                    className={isActive(item.path) ? "bg-primary text-primary-foreground" : ""}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Theme and Language Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="min-w-[60px]"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language.toUpperCase()}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="grid grid-cols-4 gap-1">
            {navItems.slice(0, 8).map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button 
                    variant={isActive(item.path) ? "default" : "ghost"} 
                    size="sm"
                    className={`w-full text-xs ${isActive(item.path) ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;