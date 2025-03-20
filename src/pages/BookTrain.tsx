
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, HelpCircle, Info, Settings, Train, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';

const BookTrain = () => {
  // Demo data for recent searches
  const recentSearches = [
    { from: "New Delhi", to: "Mumbai", date: "24 Jun 2023", class: "Sleeper" },
    { from: "Bangalore", to: "Chennai", date: "12 Jul 2023", class: "AC 3 Tier" },
    { from: "Kolkata", to: "Delhi", date: "08 Aug 2023", class: "AC 2 Tier" },
  ];

  // Demo data for travel tips
  const travelTips = [
    "Book tickets 120 days in advance for best availability",
    "Tatkal tickets open at 10:00 AM for AC classes",
    "Senior citizens get up to 40% concession on base fare",
    "Children under 5 years travel free without a seat",
    "Up to 6 tickets can be booked from one account per month"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header section */}
        <section className="bg-gradient-to-b from-primary/5 to-white pt-28 pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Book Your Train Tickets</h1>
              <p className="text-muted-foreground mb-0">
                Search and book train tickets for your journey across India with our modern booking system.
              </p>
            </div>
          </div>
        </section>
        
        {/* Booking form section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue="regular" className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <TabsList>
                    <TabsTrigger value="regular">Regular Ticket</TabsTrigger>
                    <TabsTrigger value="tatkal">Tatkal</TabsTrigger>
                    <TabsTrigger value="pass">Season Pass</TabsTrigger>
                  </TabsList>
                  
                  <Button variant="ghost" size="sm" className="text-muted-foreground gap-1">
                    <Settings className="h-4 w-4" />
                    Advanced Options
                  </Button>
                </div>
                
                <TabsContent value="regular" className="mt-0">
                  <Alert className="mb-6 bg-blue-50 border border-blue-100">
                    <Info className="h-4 w-4 text-blue-500" />
                    <AlertTitle className="text-blue-700 text-sm font-medium">Regular Booking</AlertTitle>
                    <AlertDescription className="text-blue-700 text-sm">
                      You can book regular tickets up to 120 days in advance.
                    </AlertDescription>
                  </Alert>
                  
                  <BookingForm />
                </TabsContent>
                
                <TabsContent value="tatkal" className="mt-0">
                  <Alert className="mb-6 bg-amber-50 border border-amber-100">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <AlertTitle className="text-amber-700 text-sm font-medium">Tatkal Booking</AlertTitle>
                    <AlertDescription className="text-amber-700 text-sm">
                      Tatkal ticket booking starts at 10:00 AM for AC classes and 11:00 AM for non-AC classes.
                    </AlertDescription>
                  </Alert>
                  
                  <BookingForm />
                </TabsContent>
                
                <TabsContent value="pass" className="mt-0">
                  <Alert className="mb-6 bg-green-50 border border-green-100">
                    <Calendar className="h-4 w-4 text-green-500" />
                    <AlertTitle className="text-green-700 text-sm font-medium">Season Pass</AlertTitle>
                    <AlertDescription className="text-green-700 text-sm">
                      Book monthly or quarterly season tickets for regular journeys.
                    </AlertDescription>
                  </Alert>
                  
                  <BookingForm />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Recent searches section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Searches</h2>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  Clear All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentSearches.map((search, index) => (
                  <div 
                    key={index} 
                    className="flex items-center p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center text-sm font-medium">
                        <span className="truncate">{search.from}</span>
                        <ArrowRight className="h-3 w-3 mx-1 text-muted-foreground" />
                        <span className="truncate">{search.to}</span>
                      </div>
                      <div className="mt-1 flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{search.date}</span>
                        <span className="mx-1.5">•</span>
                        <Train className="h-3 w-3 mr-1" />
                        <span>{search.class}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-2 text-primary">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Travel tips section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Travel Tips & Information</h2>
                <Link to="#">
                  <Button variant="link" size="sm" className="text-primary">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-border p-6">
                  <h3 className="text-lg font-medium mb-4">Booking Tips</h3>
                  <ul className="space-y-3">
                    {travelTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 mt-0.5">
                          <Info className="h-3 w-3" />
                        </div>
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl border border-border p-6">
                  <h3 className="text-lg font-medium mb-4">Need Help?</h3>
                  
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Having trouble booking?</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Our customer support team is here to help you with any issues.
                      </p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                        View FAQs
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border">
                    <h4 className="text-sm font-medium mb-3">Contact Support</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg" alt="Support" />
                          <AvatarFallback>CS</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Customer Support</div>
                          <div className="text-muted-foreground text-xs">Available 24/7</div>
                        </div>
                        <Button size="sm" variant="outline" className="ml-auto rounded-full">
                          Chat Now
                        </Button>
                      </div>
                      <div className="flex items-center text-sm">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg" alt="Phone" />
                          <AvatarFallback>PH</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Call Center</div>
                          <div className="text-muted-foreground text-xs">14567 (Toll Free)</div>
                        </div>
                        <Button size="sm" variant="outline" className="ml-auto rounded-full">
                          Call
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookTrain;
