
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Train, User, Search, Map, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface CurrentUser {
  name?: string;
  username: string;
  email: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const location = useLocation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is logged in
  useEffect(() => {
    const userDataJSON = localStorage.getItem('currentUser');
    const userToken = localStorage.getItem('userToken');
    
    if (userDataJSON && userToken) {
      try {
        const userData = JSON.parse(userDataJSON);
        setCurrentUser(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Clear invalid data
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userToken');
      }
    }
  }, [location.pathname]); // Re-check when route changes

  // Check if user has scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userToken');
    localStorage.removeItem('currentUser');
    
    // Update state
    setCurrentUser(null);
    
    // Show toast notification
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    
    // Redirect to home page
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-4 w-4 mr-1" /> },
    { name: 'Book Train', path: '/book-train', icon: <Train className="h-4 w-4 mr-1" /> },
    { name: 'Find Trains', path: '/train-list', icon: <Search className="h-4 w-4 mr-1" /> },
    { name: 'Track Train', path: '/track-train', icon: <Map className="h-4 w-4 mr-1" /> },
  ];

  // Get initials for avatar
  const getInitials = (name?: string, username?: string) => {
    if (name && name.length > 0) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    }
    return (username || 'U').substring(0, 2).toUpperCase();
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Train 
            className={cn(
              "h-7 w-7 mr-2 transition-colors",
              isScrolled ? "text-primary" : "text-primary"
            )} 
          />
          <span className={cn(
            "font-heading font-semibold text-xl transition-colors",
            isScrolled ? "text-foreground" : "text-foreground"
          )}>
            IRCTC
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "nav-link flex items-center text-sm px-1 py-1 transition-colors",
                  location.pathname === item.path 
                    ? "text-primary font-medium" 
                    : "text-foreground/80 hover:text-foreground"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        )}

        {/* Auth Buttons or User Menu */}
        <div className="hidden md:flex items-center space-x-3">
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full hover:bg-muted p-0 w-9 h-9">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {getInitials(currentUser.name, currentUser.username)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  My Bookings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
              >
                <User className="h-4 w-4 mr-1.5" />
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg animate-slide-in-up py-4 px-5">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-lg transition-all",
                    location.pathname === item.path 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100">
                {currentUser ? (
                  <div className="space-y-2">
                    <div className="flex items-center px-3 py-2">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(currentUser.name, currentUser.username)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{currentUser.name || currentUser.username}</p>
                        <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-center text-red-500 border-red-100 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-1.5" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <Link to="/login" className="block w-full">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full justify-center"
                    >
                      <User className="h-4 w-4 mr-1.5" />
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
