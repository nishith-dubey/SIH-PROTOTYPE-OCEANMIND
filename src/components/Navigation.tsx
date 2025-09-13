import React, { useEffect, useState } from 'react';
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
  Database,
  Moon,
  Sun,
  User,
  LogIn,
  Menu,
  X
} from 'lucide-react';
import { BarChart3 as DashboardIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

const GovernmentNavigation = () => {
  const { language, setLanguage, t } = useApp();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      // Add background when scrolled
      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/chat', icon: MessageSquare, label: t('chat') },
    { path: '/dashboard', icon: DashboardIcon, label: 'Dashboard' },
    { path: '/explore', icon: Map, label: t('explore') },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/profiles', icon: LineChart, label: t('profiles') },
    { path: '/hovmoller', icon: Activity, label: t('hovmoller') },
    { path: '/compare', icon: BarChart3, label: t('compare') },
    { path: '/provenance', icon: FileText, label: t('provenance') }
  ];

  return (
    <>
      {/* Government Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        {/* Top Header with Government Identity */}
        <div className="bg-orange-600 text-white py-1 text-xs">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-xs">For Government of India</span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                  className="flex items-center space-x-1 hover:underline text-xs"
                >
                  <Globe className="h-3 w-3" />
                  <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
                </button>
                <Link to="/signup" className="flex items-center space-x-1 hover:underline text-xs">
                  <User className="h-3 w-3" />
                  <span>Register</span>
                </Link>
                <Link to="/login" className="flex items-center space-x-1 hover:underline text-xs">
                  <LogIn className="h-3 w-3" />
                  <span>Login</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className={`bg-slate-900 text-white py-2 transition-all duration-300 ${
          isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : ''
        }`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">AquaScope Pro</h1>
                  <p className="text-xs opacity-90">Advanced Ocean Analytics</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  
                  return (
                    <Link key={item.path} to={item.path}>
                      <div className={`
                        flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                        ${active 
                          ? 'bg-blue-600 text-white' 
                          : 'text-white/80 hover:bg-slate-800 hover:text-white'
                        }
                      `}>
                        <Icon className="h-3 w-3 mr-2" />
                        {item.label}
                      </div>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-1.5 rounded-md hover:bg-slate-800"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-slate-700">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  
                  return (
                    <Link 
                      key={item.path} 
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className={`
                        flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${active 
                          ? 'bg-blue-600 text-white' 
                          : 'text-white/80 hover:bg-slate-800 hover:text-white'
                        }
                      `}>
                        <Icon className="h-3 w-3 mr-2" />
                        {item.label}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
      </header>

    </>
  );
};

export default GovernmentNavigation;
