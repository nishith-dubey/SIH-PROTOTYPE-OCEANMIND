import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, Search, Globe } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-zinc-800 mb-4">404</div>
          <div className="inline-flex p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
            <Search className="h-12 w-12 text-indigo-500" />
          </div>
        </div>

        {/* Error Message */}
        <Card className="bg-zinc-900 border-zinc-800 mb-8">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-xl text-zinc-400 mb-6">
              The page you're looking for seems to have drifted away like an ocean current.
            </p>
            <div className="text-sm text-zinc-500 font-mono bg-zinc-950 p-3 rounded-lg border border-zinc-800">
              Requested path: <span className="text-indigo-400">{location.pathname}</span>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Options */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl">
                <Home className="h-5 w-5 mr-2" />
                Return to Home
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-600 px-6 py-3 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mt-12">
            <p className="text-zinc-500 mb-4">Or try one of these popular pages:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link to="/explore" className="text-zinc-400 hover:text-indigo-400 text-sm border border-zinc-800 rounded-lg p-3 hover:border-zinc-700 transition-colors">
                <Globe className="h-4 w-4 mx-auto mb-1" />
                Explore
              </Link>
              <Link to="/profiles" className="text-zinc-400 hover:text-indigo-400 text-sm border border-zinc-800 rounded-lg p-3 hover:border-zinc-700 transition-colors">
                <Search className="h-4 w-4 mx-auto mb-1" />
                Profiles
              </Link>
              <Link to="/chat" className="text-zinc-400 hover:text-indigo-400 text-sm border border-zinc-800 rounded-lg p-3 hover:border-zinc-700 transition-colors">
                <Search className="h-4 w-4 mx-auto mb-1" />
                Chat
              </Link>
              <Link to="/teachme" className="text-zinc-400 hover:text-indigo-400 text-sm border border-zinc-800 rounded-lg p-3 hover:border-zinc-700 transition-colors">
                <Search className="h-4 w-4 mx-auto mb-1" />
                Learn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;