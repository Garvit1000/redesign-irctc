import React, { useEffect, useRef } from 'react';
import { 
  Train, 
  Map, 
  Calendar, 
  CreditCard, 
  Clock, 
  ShieldCheck, 
  Bell, 
  Smartphone,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { fadeInUp, bounceAnimation } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/ui/aceternity/scroll-animation';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  color: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, index, color }) => {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover-3d group transition-all duration-300 overflow-hidden relative">
      {/* Background gradient that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${color}20, ${color}05)` }}></div>
      
      {/* Top decorative line that changes color on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-100 group-hover:bg-gradient-to-r transition-colors duration-500" 
        style={{ backgroundImage: `linear-gradient(to right, ${color}50, ${color}20)` }}></div>
      
      <div className="relative">
        {/* Icon container with animated background */}
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 md:mb-5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-white/20"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-black/10"></div>
          </div>
          
          {/* Icon */}
          <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        
        {/* Sparkle decoration */}
        <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Sparkles className="h-4 w-4 text-primary animate-sparkle" />
        </div>
      </div>
      
      {/* Content */}
      <h3 className="text-base md:text-lg font-medium mb-1 md:mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">{description}</p>
      
      {/* Learn more button that appears on hover */}
      <div className="h-6 overflow-hidden">
        <Button 
          variant="ghost" 
          size="sm" 
          className="px-0 text-xs text-primary opacity-0 -translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          Learn more <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>
      
      {/* Decorative gradient line */}
      <div className="h-0.5 w-0 group-hover:w-full mt-3 md:mt-4 bg-gradient-to-r transition-all duration-700 rounded-full" 
        style={{ backgroundImage: `linear-gradient(to right, ${color}20, ${color}, ${color}20)` }}></div>
      
      {/* Decorative corner accent */}
      <div className="absolute bottom-0 right-0 w-10 md:w-12 h-10 md:h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-14 md:w-16 h-14 md:h-16 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-3xl"></div>
      </div>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('staggered-animation');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: <Train className="h-6 w-6" />,
      title: "Smart Booking",
      description: "Easily search and book train tickets with intuitive interface and personalized recommendations.",
      color: "#1897ff"
    },
    {
      icon: <Map className="h-6 w-6" />,
      title: "Live Tracking",
      description: "Track your train's location in real-time with accurate updates and predicted arrival times.",
      color: "#22c55e"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Advanced Planning",
      description: "Plan your journey up to 120 days in advance with fare predictions and availability trends.",
      color: "#f59e0b"
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Secure Payments",
      description: "Multiple payment options with bank-grade security and instant confirmation.",
      color: "#8b5cf6"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time-Saving",
      description: "Quick booking process with saved preferences and one-click checkout options.",
      color: "#ec4899"
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Travel Insurance",
      description: "Optional travel insurance with coverage for delays, cancellations, and more.",
      color: "#14b8a6"
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Smart Alerts",
      description: "Personalized notifications for fare drops, schedule changes, and platform updates.",
      color: "#f43f5e"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Tickets",
      description: "Paperless travel with digital tickets and boarding passes on your mobile device.",
      color: "#6366f1"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -top-10 left-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-10 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      {/* Floating geometric shapes - hide some on mobile */}
      <div className={bounceAnimation("absolute top-20 left-10 w-8 h-8 bg-primary/10 rounded-full hidden md:block")} style={{animationDelay: "0.5s"}}></div>
      <div className={bounceAnimation("absolute bottom-20 right-10 w-6 h-6 bg-primary/10 rounded-md rotate-45 hidden md:block")} style={{animationDelay: "0.8s"}}></div>
      <div className={bounceAnimation("absolute bottom-40 left-20 w-4 h-4 bg-primary/20 rounded-full")} style={{animationDelay: "1.2s"}}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4 animate-pulse-soft">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Premium Features
          </div>
          <h2 className={fadeInUp({ className: "text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4" })}>
            Experience Modern Train Travel
          </h2>
          <p className={fadeInUp({ delay: 0.1, className: "text-sm md:text-base lg:text-lg text-muted-foreground" })}>
            Our redesigned platform offers powerful features to make your travel experience seamless from booking to arrival.
          </p>
          
          {/* Decorative indicator */}
          <div className="flex justify-center mt-4 md:mt-6 space-x-1">
            <span className="block w-8 h-1 rounded-full bg-primary"></span>
            <span className="block w-2 h-1 rounded-full bg-primary/40"></span>
            <span className="block w-2 h-1 rounded-full bg-primary/40"></span>
          </div>
        </div>

        {/* Wrap the features grid with ScrollAnimation */}
        <ScrollAnimation className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {features.map((feature, index) => (
            <Feature 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description}
              index={index}
              color={feature.color}
            />
          ))}
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default FeaturesSection;
