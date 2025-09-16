import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  MessageSquare,
  Map,
  LineChart,
  Activity,
  BarChart3,
  FileText,
  Globe,
  User,
  LogIn,
  Menu,
  X,
  Waves,
} from "lucide-react";
import { BarChart3 as DashboardIcon } from "lucide-react";

const GovernmentNavigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/chat", icon: MessageSquare, label: "Chat" },
    { path: "/dashboard", icon: DashboardIcon, label: "Dashboard" },
    { path: "/explore", icon: Map, label: "Explore" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/profiles", icon: LineChart, label: "Profiles" },
    { path: "/hovmoller", icon: Activity, label: "Hovmöller" },
    { path: "/compare", icon: BarChart3, label: "Compare" },
    { path: "/provenance", icon: FileText, label: "Provenance" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Government Header */}
      <header
        className={`fixed top-0 left-0 bg-black right-0 z-50 transition-all duration-300 ease-in-out border-zinc-800 shadow-lg ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "border-b" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3 pr-5">
              <Link to="/" className="flex items-center space-x-2 group">
                <img
                  src="/favicon.ico"
                  alt="App Logo"
                  width="36"
                  height="36"
                  className="rounded-full"
                />
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-white">OceanMind</h1>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-indigo-600/10 text-indigo-400"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* User Menu */}
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-white hover:text-black"
              >
                <User className="h-5 w-5" />
              </Button>

              {/* Login Button */}
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex items-center space-x-2 px-3 py-1.5 text-sm hover:bg-white hover:text-black"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2 text-zinc-400"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-800 bg-black">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Navigation Items */}
              <div className="space-y-1 mb-4">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive(item.path)
                        ? "bg-indigo-600/10 text-indigo-400"
                        : "text-zinc-300 hover:bg-zinc-800"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-zinc-800 space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-center px-4 py-3 text-base font-medium border-zinc-700 text-zinc-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16" />
    </>
  );
};

export default GovernmentNavigation;
