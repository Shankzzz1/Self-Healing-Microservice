import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';

// shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const toggleMode = () => {
    if (isSubmitting) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
      });
      setShowPassword(false);
      setShowConfirmPassword(false);
      setFocusedField('');
      setIsAnimating(false);
    }, 250);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', { isLogin, formData });
    setIsSubmitting(false);
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Card */}
      <Card className={`relative w-full max-w-md bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl transition-all duration-500 ease-out transform ${isAnimating ? 'scale-95 opacity-60 blur-sm' : 'scale-100 opacity-100 blur-0'}`}>
        <CardHeader className="text-center space-y-4 pb-6">
          <div className={`mx-auto w-16 h-16 bg-gradient-to-r from-white to-gray-300 rounded-full flex items-center justify-center mb-4 transition-all duration-700 ease-out ${isAnimating ? 'scale-75 rotate-180' : 'scale-100 rotate-0'}`}>
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center transition-all duration-300">
              <div className="w-4 h-4 bg-gradient-to-r from-white to-gray-300 rounded-full"></div>
            </div>
          </div>
          <CardTitle className={`text-2xl font-bold text-white transition-all duration-400 ease-out ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <CardDescription className={`text-white/70 transition-all duration-500 ease-out ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            {isLogin 
              ? 'Sign in to your account to continue' 
              : 'Join us today and start your journey'
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-6 pb-6">
          <div className="space-y-4">
            {/* Name Fields for Signup */}
            {!isLogin && (
              <div className={`grid grid-cols-2 gap-4 transition-all duration-600 ease-out ${isAnimating ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'}`}>
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white/90 text-sm font-medium">First Name</Label>
                  <div className={`relative transition-all duration-300 ease-out ${focusedField === 'firstName' ? 'scale-105' : 'scale-100'}`}>
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-300 ${focusedField === 'firstName' ? 'text-white' : 'text-white/50'}`} />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('firstName')}
                      onBlur={handleBlur}
                      onKeyPress={handleKeyPress}
                      className={`pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 transition-all duration-300 ease-out ${
                        focusedField === 'firstName' 
                          ? 'border-white/40 ring-2 ring-white/20 bg-white/10' 
                          : 'hover:border-white/20 hover:bg-white/8'
                      }`}
                      placeholder="John"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white/90 text-sm font-medium">Last Name</Label>
                  <div className={`relative transition-all duration-300 ease-out ${focusedField === 'lastName' ? 'scale-105' : 'scale-100'}`}>
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-300 ${focusedField === 'lastName' ? 'text-white' : 'text-white/50'}`} />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('lastName')}
                      onBlur={handleBlur}
                      onKeyPress={handleKeyPress}
                      className={`pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 transition-all duration-300 ease-out ${
                        focusedField === 'lastName' 
                          ? 'border-white/40 ring-2 ring-white/20 bg-white/10' 
                          : 'hover:border-white/20 hover:bg-white/8'
                      }`}
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className={`space-y-2 transition-all duration-500 ease-out ${isAnimating ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'}`}>
              <Label htmlFor="email" className="text-white/90 text-sm font-medium">Email</Label>
              <div className={`relative transition-all duration-300 ease-out ${focusedField === 'email' ? 'scale-105' : 'scale-100'}`}>
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-300 ${focusedField === 'email' ? 'text-white' : 'text-white/50'}`} />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  onKeyPress={handleKeyPress}
                  className={`pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 transition-all duration-300 ease-out ${
                    focusedField === 'email' 
                      ? 'border-white/40 ring-2 ring-white/20 bg-white/10' 
                      : 'hover:border-white/20 hover:bg-white/8'
                  }`}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className={`space-y-2 transition-all duration-500 ease-out ${isAnimating ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'}`}>
              <Label htmlFor="password" className="text-white/90 text-sm font-medium">Password</Label>
              <div className={`relative transition-all duration-300 ease-out ${focusedField === 'password' ? 'scale-105' : 'scale-100'}`}>
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-300 ${focusedField === 'password' ? 'text-white' : 'text-white/50'}`} />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                  onKeyPress={handleKeyPress}
                  className={`pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 transition-all duration-300 ease-out ${
                    focusedField === 'password' 
                      ? 'border-white/40 ring-2 ring-white/20 bg-white/10' 
                      : 'hover:border-white/20 hover:bg-white/8'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all duration-200 hover:scale-110"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password for Signup */}
            {!isLogin && (
              <div className={`space-y-2 transition-all duration-600 ease-out ${isAnimating ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'}`}>
                <Label htmlFor="confirmPassword" className="text-white/90 text-sm font-medium">Confirm Password</Label>
                <div className={`relative transition-all duration-300 ease-out ${focusedField === 'confirmPassword' ? 'scale-105' : 'scale-100'}`}>
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-300 ${focusedField === 'confirmPassword' ? 'text-white' : 'text-white/50'}`} />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('confirmPassword')}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    className={`pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 transition-all duration-300 ease-out ${
                      focusedField === 'confirmPassword' 
                        ? 'border-white/40 ring-2 ring-white/20 bg-white/10' 
                        : 'hover:border-white/20 hover:bg-white/8'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all duration-200 hover:scale-110"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Forgot Password Link for Login */}
            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-white/60 hover:text-white transition-all duration-200 hover:underline"
                  disabled={isSubmitting}
                >
                  Forgot your password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-white to-gray-200 hover:from-gray-100 hover:to-white text-black font-semibold py-3 transition-all duration-300 ease-out group relative overflow-hidden ${
                isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
              } ${isSubmitting ? 'cursor-not-allowed opacity-70' : 'hover:scale-105 hover:shadow-lg'}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform text-black" />
                </>
              )}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <Separator className="bg-white/20" />
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black px-3 text-white/70 text-sm">
              or continue with
            </span>
          </div>

          {/* Social Login Buttons */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-500 ease-out ${isAnimating ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'}`}>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              className={`bg-white/5 border-white/10 text-white transition-all duration-300 ease-out ${
                isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-white/10 hover:scale-105 hover:shadow-md'
              }`}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              className={`bg-white/5 border-white/10 text-white transition-all duration-300 ease-out ${
                isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-white/10 hover:scale-105 hover:shadow-md'
              }`}
            >
              <Chrome className="w-4 h-4 mr-2" />
              Google
            </Button>
          </div>

          {/* Toggle Mode */}
          <div className="text-center pt-4">
            <span className="text-white/70 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              type="button"
              onClick={toggleMode}
              disabled={isSubmitting}
              className={`font-semibold text-sm transition-all duration-300 ease-out ${
                isSubmitting 
                  ? 'text-white/40 cursor-not-allowed' 
                  : 'text-white/60 hover:text-white hover:underline hover:scale-105'
              }`}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;