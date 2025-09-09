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
  Sun,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { BarChart3 as DashboardIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

const Sidebar = () => {
  const { language, setLanguage, t } = useApp();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/chat', icon: MessageSquare, label: t('chat') },
    { path: '/dashboard', icon: DashboardIcon, label: 'Dashboard' },
    { path: '/explore', icon: Map, label: t('explore') },
    { path: '/profiles', icon: LineChart, label: t('profiles') },
    { path: '/hovmoller', icon: Activity, label: t('hovmoller') },
    { path: '/compare', icon: BarChart3, label: t('compare') },
    { path: '/teachme', icon: BookOpen, label: t('teachMe') },
    { path: '/provenance', icon: FileText, label: t('provenance') }
  ];

  return (
    <div 
      className={`
        fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 
        border-r border-slate-200 dark:border-slate-800 
        transition-all duration-300 z-50
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
        {!isCollapsed && (
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Waves className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white">
              FloatChat
            </span>
          </Link>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <div className="p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link key={item.path} to={item.path}>
              <div
                className={`
                  flex items-center px-3 py-2 rounded-lg transition-colors cursor-pointer
                  ${active 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                  ${isCollapsed ? 'justify-center' : 'justify-start'}
                `}
              >
                <Icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-0 right-0 p-2 space-y-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`w-full ${isCollapsed ? 'px-0' : 'justify-start'}`}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {!isCollapsed && <span className="ml-2">Toggle Theme</span>}
        </Button>

        {/* Language Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className={`w-full ${isCollapsed ? 'px-0' : 'justify-start'}`}
        >
          <Globe className="h-4 w-4" />
          {!isCollapsed && (
            <span className="ml-2">{language === 'en' ? 'English' : 'हिंदी'}</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
