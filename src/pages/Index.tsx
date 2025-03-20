
import React from 'react';
import { ArrowRight, Calendar, Clock, MapPin, Shield, Star, Ticket, Train } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/FeaturesSection';
import BookingForm from '@/components/BookingForm';
import { fadeInUp, popIn, shimmerEffect, elevateEffect, glowPulse } from '@/lib/animations';

const Index = () => {
  // Demo data for popular routes
  const popularRoutes = [
    { from: "New Delhi", to: "Mumbai", price: "₹1,245", time: "16h 35m" },
    { from: "Bangalore", to: "Chennai", price: "₹675", time: "6h 20m" },
    { from: "Kolkata", to: "Delhi", price: "₹1,490", time: "17h 15m" },
    { from: "Mumbai", to: "Ahmedabad", price: "₹720", time: "8h 40m" },
    { from: "Chennai", to: "Hyderabad", price: "₹850", time: "9h 10m" },
    { from: "Delhi", to: "Jaipur", price: "₹500", time: "4h 45m" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <Hero />
        
        {/* Booking form section */}
        <section className="relative z-10 bg-white py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto -mt-32">
              <BookingForm />
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <FeaturesSection />
        
        {/* Popular routes section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className={popIn("inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-primary mb-4")}>
                <Star className="h-3.5 w-3.5 mr-1.5 animate-pulse-soft" />
                Popular Routes
              </div>
              <h2 className={fadeInUp({ className: "text-3xl md:text-4xl font-bold mb-4" })}>
                Trending Destinations
              </h2>
              <p className={fadeInUp({ delay: 0.1, className: "text-muted-foreground text-lg" })}>
                Explore the most popular train routes across India with great availability and competitive fares.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {popularRoutes.map((route, index) => (
                <Card 
                  key={index}
                  className="card-hover-lift overflow-hidden group relative border-none"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-primary/5 to-primary/10 opacity-80"></div>
                  
                  {/* Train track pattern at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 animate-tracks-scrolling"></div>
                  
                  {/* Card content */}
                  <CardContent className="p-5 relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 group-hover:bg-primary/20 transition-colors">
                            <MapPin className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium text-lg">{route.from}</span>
                        </div>
                        
                        {/* Train track connecting dots */}
                        <div className="ml-4 my-1 h-6 border-l-2 border-dashed border-primary/30 relative">
                          <div className="absolute w-1.5 h-1.5 rounded-full bg-primary/40 -left-[3px] top-0 animate-pulse-soft"></div>
                          <div className="absolute w-1.5 h-1.5 rounded-full bg-primary/40 -left-[3px] bottom-0 animate-pulse-soft" style={{animationDelay: "0.5s"}}></div>
                          
                          {/* Mini train on track */}
                          <div className="absolute -left-2 top-2.5 transform -translate-y-1/2 group-hover:translate-y-3 transition-all duration-700">
                            <Train className="h-3 w-3 text-primary rotate-90" />
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center mr-2 group-hover:bg-primary/15 transition-colors">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <span className="text-muted-foreground">{route.to}</span>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="bg-primary/90 text-white font-medium rounded-lg px-4 py-2 text-sm group-hover:bg-primary transition-colors">
                          {route.price}
                          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-pulse-soft"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-primary/10">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1.5" />
                        <span className="group-hover:text-primary transition-colors">{route.time}</span>
                      </div>
                      <Link to="/train-list">
                        <Button variant="ghost" size="sm" className="text-primary group-hover:bg-primary/10 transition-colors">
                          View Trains
                          <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Link to="/book-train">
                <Button variant="outline" size="lg" className="rounded-full relative overflow-hidden group">
                  <span className="relative z-10">
                    View All Routes
                    <ArrowRight className="ml-1 h-4 w-4 inline group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* How it works section - enhanced with visual elements */}
        <section className="py-16 bg-gray-50 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute top-20 right-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className={popIn("inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-primary mb-4")}>
                <Shield className="h-3.5 w-3.5 mr-1.5 animate-pulse-soft" />
                Simple Process
              </div>
              <h2 className={fadeInUp({ className: "text-3xl md:text-4xl font-bold mb-4" })}>
                How It Works
              </h2>
              <p className={fadeInUp({ delay: 0.1, className: "text-muted-foreground text-lg" })}>
                Booking train tickets has never been easier. Follow these simple steps to plan your journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
              {/* Connecting track between steps */}
              <div className="absolute top-24 left-0 right-0 h-2 hidden md:block">
                <div className="h-1 bg-primary/20 w-full animate-tracks-scrolling"></div>
              </div>
              
              {[
                {
                  icon: <Calendar className="h-6 w-6" />,
                  title: "Choose Journey Date",
                  description: "Select your travel date and preferred stations for departure and arrival."
                },
                {
                  icon: <Train className="h-6 w-6" />,
                  title: "Select Your Train",
                  description: "Browse through available trains, check fares, and seats availability."
                },
                {
                  icon: <Ticket className="h-6 w-6" />,
                  title: "Book & Travel",
                  description: "Complete your booking securely and receive instant e-ticket confirmation."
                }
              ].map((step, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center text-center p-6 group"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300 relative">
                    {step.icon}
                    <div className="absolute inset-0 rounded-full border-2 border-primary/30 scale-110 opacity-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-foreground font-medium text-sm mb-4 relative z-10">
                    {index + 1}
                    <span className="absolute inset-0 rounded-full animate-pulse-soft opacity-0 group-hover:opacity-100"></span>
                  </span>
                  <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section - enhanced with glass morphism and gradient effects */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-white relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-primary/10 blur-3xl transform -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-40 bg-primary/5 blur-2xl transform translate-y-1/4"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="glass rounded-2xl shadow-xl border border-white/40 p-8 md:p-12 max-w-4xl mx-auto text-center backdrop-blur-sm relative overflow-hidden group">
              {/* Pulsing glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 animate-gradient-flow"></div>
              </div>
              
              <div className={glowPulse("w-16 h-16 mx-auto mb-6 relative")}>
                <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse-soft"></div>
                <div className="relative z-10 w-full h-full rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
                  <Train className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4 relative">
                Ready to Start Your Journey?
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary/20 rounded-full"></div>
              </h2>
              
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Book your train tickets now and experience a seamless travel planning process with our modern redesigned platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/book-train">
                  <Button size="lg" className="rounded-full text-sm px-8 py-6 relative overflow-hidden group">
                    <span className="relative z-10">
                      Book Tickets
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  </Button>
                </Link>
                <Link to="/track-train">
                  <Button variant="outline" size="lg" className="rounded-full text-sm px-8 py-6 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all border-primary/20 hover:border-primary">
                    Track Train
                  </Button>
                </Link>
              </div>
              
              {/* Decorative train tracks */}
              <div className="absolute bottom-0 left-0 right-0 h-2 overflow-hidden">
                <div className="h-1 bg-primary/10 w-full animate-tracks-scrolling"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
