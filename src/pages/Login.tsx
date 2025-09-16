import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, LogIn, Shield, Database } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Mock authentication
    setTimeout(() => {
      if (formData.email === 'admin@oceandataportal.gov.in' && formData.password === 'admin123') {
        // Mock successful login
        localStorage.setItem('auth_token', 'mock_token_' + Date.now());
        window.location.href = '/dashboard';
      } else {
        setError('Invalid email or password. Use demo credentials provided.');
      }
      setLoading(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
            <Database className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Sign In</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Access your Ocean Data Portal account
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-zinc-800 bg-zinc-900">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-center text-lg font-semibold text-white">
              Authorized Personnel Only
            </CardTitle>
            <div className="flex items-center justify-center text-sm text-zinc-400">
              <Shield className="h-4 w-4 mr-1 text-green-400" />
              Secure Government Portal
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your.email@gov.in"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950 border-zinc-700 text-white placeholder-zinc-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-300">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pr-10 bg-zinc-950 border-zinc-700 text-white placeholder-zinc-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-zinc-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-zinc-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link 
                    to="/forgot-password" 
                    className="text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-zinc-900 px-2 text-zinc-400">Demo Credentials</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-sm text-zinc-300 bg-zinc-950 p-3 rounded-md border border-zinc-800">
                  <p className="font-medium">Email: admin@oceandataportal.gov.in</p>
                  <p className="font-medium">Password: admin123</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-400">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-zinc-500">
          <p>Ministry of Earth Sciences, Government of India</p>
          <p className="mt-1">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;