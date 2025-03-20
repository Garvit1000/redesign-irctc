import React from 'react';
import { Sparkles } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';
import DestinationCard from './DestinationCard';

const destinations = [
  { 
    from: "Delhi", 
    to: "Mumbai", 
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=600&auto=format&fit=crop",
    duration: "16h 10m",
    price: "₹1,250",
    trains: 12,
    rating: 4.7
  },
  { 
    from: "Bangalore", 
    to: "Chennai", 
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=600&auto=format&fit=crop",
    duration: "6h 30m",
    price: "₹850",
    trains: 18,
    rating: 4.5
  },
  { 
    from: "Kolkata", 
    to: "Delhi", 
    image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=600&auto=format&fit=crop",
    duration: "17h 15m",
    price: "₹1,450",
    trains: 8,
    rating: 4.3
  },
  { 
    from: "Mumbai", 
    to: "Ahmedabad", 
    image: "https://images.unsplash.com/photo-1599030284356-06b51a13f954?q=80&w=600&auto=format&fit=crop",
    duration: "8h 45m",
    price: "₹950",
    trains: 15,
    rating: 4.6
  }
];

const PopularDestinations: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 md:px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Popular Routes
          </div>
          <h2 className={fadeInUp({ className: "text-3xl md:text-4xl font-bold mb-4" })}>
            Discover Top Train Destinations
          </h2>
          <p className={fadeInUp({ delay: 0.1, className: "text-muted-foreground text-lg" })}>
            Explore India's most popular train routes with competitive fares and excellent connectivity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {destinations.map((destination, index) => (
            <DestinationCard 
              key={index}
              {...destination}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations; 