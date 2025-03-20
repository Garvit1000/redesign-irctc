import React, { useState, useEffect, useRef } from 'react';
import { Clock, MapPin, Star, Train, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { fadeInUp } from '@/lib/animations';

interface DestinationCardProps {
  from: string;
  to: string;
  image: string;
  duration: string;
  price: string;
  trains: number;
  rating?: number;
  index: number;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  from,
  to,
  image,
  duration,
  price,
  trains,
  rating = 4.5,
  index
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Lazy load images when they come into view
  useEffect(() => {
    if (!cardRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(cardRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300",
        fadeInUp({ delay: 0.1 * index })
      )}
    >
      {/* Image with lazy loading */}
      <div className="relative h-48 overflow-hidden">
        {isInView && (
          <>
            {/* Placeholder while image loads */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
            )}
            <img 
              src={image} 
              alt={`${from} to ${to}`} 
              className={cn(
                "w-full h-full object-cover transition-all duration-500 group-hover:scale-105",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsLoaded(true)}
              loading="lazy"
            />
          </>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Price tag */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
          {price}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{from} to {to}</h3>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span className="flex items-center">
            <Clock className="mr-1 h-3.5 w-3.5" />
            {duration}
          </span>
          <span className="flex items-center">
            <Users className="mr-1 h-3.5 w-3.5" />
            {trains} trains
          </span>
        </div>
        
        {/* Rating */}
        <div className="flex items-center">
          <div className="flex items-center bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
            <Star className="mr-1 h-3 w-3 fill-primary" />
            {rating}
          </div>
          <span className="text-xs text-muted-foreground ml-2">Popular route</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DestinationCard); 