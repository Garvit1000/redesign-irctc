import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, ArrowRight, Train, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { subtlePresence, polishedEntrance } from '@/lib/animations';

// Type definitions for user data
interface UserData {
  name?: string;
  email: string;
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [validationErrors, setValidationErrors] = useState({
    login: { username: '', password: '' },
    signup: { name: '', email: '', password: '', confirmPassword: '' }
  });

  // Check if user is already logged in
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsAuthenticated(true);
      // Redirect to home if already logged in
      navigate('/');
    }
  }, [navigate]);

  const validateLoginForm = () => {
    const errors = { username: '', password: '' };
    let isValid = true;

    if (!loginForm.username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    }

    if (!loginForm.password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setValidationErrors({ ...validationErrors, login: errors });
    return isValid;
  };

  const validateSignupForm = () => {
    const errors = { name: '', email: '', password: '', confirmPassword: '' };
    let isValid = true;

    if (!signupForm.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!signupForm.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(signupForm.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!signupForm.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (signupForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!signupForm.agreeTerms) {
      toast({
        title: "Terms and Conditions",
        description: "Please agree to the terms and conditions",
        variant: "destructive"
      });
      isValid = false;
    }

    setValidationErrors({ ...validationErrors, signup: errors });
    return isValid;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Get users from localStorage
      const usersJSON = localStorage.getItem('users');
      const users: UserData[] = usersJSON ? JSON.parse(usersJSON) : [];
      
      // Find matching user
      const user = users.find(u => 
        (u.username === loginForm.username || u.email === loginForm.username) && 
        u.password === loginForm.password
      );
      
      if (user) {
        // Store auth token and user info
        localStorage.setItem('userToken', 'dummy-token-' + Date.now());
        localStorage.setItem('currentUser', JSON.stringify({
          name: user.name,
          username: user.username,
          email: user.email
        }));
        
        // Show success toast
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name || user.username}!`,
          variant: "default",
        });
        
        // Redirect to home page after successful login
        navigate('/');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password. Please try again.",
          variant: "destructive",
        });
      }
      
      setLoading(false);
    }, 1000);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignupForm()) return;
    
    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Get existing users from localStorage
      const usersJSON = localStorage.getItem('users');
      const users: UserData[] = usersJSON ? JSON.parse(usersJSON) : [];
      
      // Check if username or email already exists
      const existingUser = users.find(u => 
        u.username === signupForm.email || 
        u.email === signupForm.email
      );
      
      if (existingUser) {
        toast({
          title: "Registration Failed",
          description: "This email is already registered. Please use a different email or login instead.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      // Create new user
      const newUser: UserData = {
        name: signupForm.name,
        email: signupForm.email,
        username: signupForm.email, // Using email as username
        password: signupForm.password
      };
      
      // Add new user to array and save to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Automatically log in the new user
      localStorage.setItem('userToken', 'dummy-token-' + Date.now());
      localStorage.setItem('currentUser', JSON.stringify({
        name: newUser.name,
        username: newUser.username,
        email: newUser.email
      }));
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created and you're now logged in!",
        variant: "default",
      });
      
      // Redirect to home page
      navigate('/');
      setLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-6 md:py-10 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className={cn("flex flex-col lg:flex-row overflow-hidden rounded-xl shadow-lg border border-border", polishedEntrance(""))}>
            {/* Left side: Illustration/Info - Hide on small screens, show on medium and up */}
            <div className="hidden md:flex md:w-5/12 bg-primary/5 p-6 md:p-8 lg:p-12 flex-col justify-between">
              <div>
                <Link to="/" className="flex items-center mb-6 md:mb-8">
                  <Train className="h-5 w-5 md:h-6 md:w-6 mr-2 text-primary" />
                  <span className="font-heading font-semibold text-base md:text-lg">IRCTC</span>
                </Link>
                
                <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Welcome to the future of train travel</h2>
                <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6">
                  Login to access your account, manage bookings, and enjoy a seamless train booking experience.
                </p>
                
                <div className="space-y-3 md:space-y-4">
                  {[
                    "Quick and easy ticket booking",
                    "Real-time train tracking",
                    "Manage and modify bookings",
                    "Save favorite routes"
                  ].map((feature, index) => (
                    <div key={index} className={cn("flex items-center", subtlePresence("animation-delay-" + (index * 100)))}>
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                        <CheckCircle className="h-3 w-3" />
                      </div>
                      <span className="text-xs md:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 md:mt-12 lg:mt-0">
                <p className="text-xs text-muted-foreground">
                  By continuing, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </div>
            
            {/* Mobile header - Only show on small screens */}
            <div className="md:hidden bg-primary/5 p-6">
              <Link to="/" className="flex items-center mb-4">
                <Train className="h-5 w-5 mr-2 text-primary" />
                <span className="font-heading font-semibold text-base">IRCTC</span>
              </Link>
              
              <h2 className="text-xl font-bold mb-2">Welcome back</h2>
              <p className="text-muted-foreground text-sm">
                Login to access your account and bookings
              </p>
            </div>
            
            {/* Right side: Login/Signup Forms */}
            <div className="lg:w-7/12 bg-white p-6 md:p-8 lg:p-12">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 md:mb-8">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                {/* Login Form */}
                <TabsContent value="login">
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username or Email</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                          <User className="h-4 w-4" />
                        </div>
                        <Input 
                          id="username" 
                          type="text" 
                          placeholder="Enter your username or email" 
                          className={cn("pl-10", validationErrors.login.username && "border-red-500")}
                          value={loginForm.username}
                          onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                        />
                      </div>
                      {validationErrors.login.username && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.login.username}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-xs md:text-sm text-primary hover:underline">
                          Forgot?
                        </a>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                          <Lock className="h-4 w-4" />
                        </div>
                        <Input 
                          id="password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Enter your password" 
                          className={cn("pl-10", validationErrors.login.password && "border-red-500")}
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {validationErrors.login.password && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.login.password}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember-me"
                        className="rounded border-gray-300 text-primary focus:ring-primary/30"
                        checked={loginForm.rememberMe}
                        onChange={(e) => setLoginForm({...loginForm, rememberMe: e.target.checked})}
                      />
                      <Label htmlFor="remember-me" className="text-xs md:text-sm font-normal">
                        Remember me for 30 days
                      </Label>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Signing in...' : 'Sign in'}
                    </Button>
                  </form>
                </TabsContent>
                
                {/* Signup Form */}
                <TabsContent value="signup">
                  <form onSubmit={handleSignupSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        type="text" 
                        placeholder="Enter your full name" 
                        className={cn(validationErrors.signup.name && "border-red-500")}
                        value={signupForm.name}
                        onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                      />
                      {validationErrors.signup.name && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.signup.name}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email address" 
                        className={cn(validationErrors.signup.email && "border-red-500")}
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                      />
                      {validationErrors.signup.email && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.signup.email}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Password</Label>
                      <div className="relative">
                        <Input 
                          id="new-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Create a password" 
                          className={cn(validationErrors.signup.password && "border-red-500")}
                          value={signupForm.password}
                          onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {validationErrors.signup.password && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.signup.password}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        placeholder="Confirm your password" 
                        className={cn(validationErrors.signup.confirmPassword && "border-red-500")}
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                      />
                      {validationErrors.signup.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.signup.confirmPassword}</p>
                      )}
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="agree-terms"
                        className="rounded border-gray-300 text-primary focus:ring-primary/30 mt-1"
                        checked={signupForm.agreeTerms}
                        onChange={(e) => setSignupForm({...signupForm, agreeTerms: e.target.checked})}
                      />
                      <Label htmlFor="agree-terms" className="text-xs md:text-sm font-normal">
                        I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                      </Label>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Creating account...' : 'Create account'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              {/* Mobile footer - Only show on small screens */}
              <div className="mt-6 pt-6 border-t border-gray-100 text-center md:hidden">
                <p className="text-xs text-muted-foreground">
                  By continuing, you agree to our <a href="#" className="text-primary hover:underline">Terms</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
