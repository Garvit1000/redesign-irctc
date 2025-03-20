
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, Filter, MapPin, Plus, RefreshCw, Sliders, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrainCard from '@/components/TrainCard';
import BookingForm from '@/components/BookingForm';

// Demo data for train results
const trainResults = [
  {
    trainNumber: "12301",
    trainName: "Howrah Rajdhani",
    departure: {
      station: "New Delhi",
      time: "16:55",
      day: 1
    },
    arrival: {
      station: "Howrah Jn",
      time: "09:55",
      day: 2
    },
    duration: "17h 00m",
    runningDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  {
    trainNumber: "12302",
    trainName: "Delhi Rajdhani",
    departure: {
      station: "New Delhi",
      time: "17:15",
      day: 1
    },
    arrival: {
      station: "Howrah Jn",
      time: "10:05",
      day: 2
    },
    duration: "16h 50m",
    runningDays: ["Mon", "Tue", "Thu", "Fri", "Sun"]
  },
  {
    trainNumber: "12259",
    trainName: "Sealdah Duronto",
    departure: {
      station: "New Delhi",
      time: "12:40",
      day: 1
    },
    arrival: {
      station: "Sealdah",
      time: "06:20",
      day: 2
    },
    duration: "17h 40m",
    runningDays: ["Mon", "Wed", "Fri"]
  },
  {
    trainNumber: "12313",
    trainName: "Sealdah Rajdhani",
    departure: {
      station: "New Delhi",
      time: "16:30",
      day: 1
    },
    arrival: {
      station: "Sealdah",
      time: "10:10",
      day: 2
    },
    duration: "17h 40m",
    runningDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  {
    trainNumber: "12305",
    trainName: "Howrah - New Delhi Kalka Mail",
    departure: {
      station: "New Delhi",
      time: "19:40",
      day: 1
    },
    arrival: {
      station: "Howrah Jn",
      time: "19:55",
      day: 2
    },
    duration: "24h 15m",
    runningDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  }
];

const TrainList = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  const clearFilters = () => {
    setActiveFilters([]);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 bg-gray-50">
        {/* Search summary and form */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold">Delhi to Mumbai</h1>
                  <Badge variant="outline" className="ml-2 text-xs">
                    Sun, 25 Jun
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <span>5 trains found</span>
                  <span className="mx-2">•</span>
                  <span>AC 3 Tier</span>
                  <span className="mx-2">•</span>
                  <span>General Quota</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <RefreshCw className="h-3.5 w-3.5" />
                  Refresh
                </Button>
                <Link to="/book-train">
                  <Button variant="outline" size="sm" className="gap-1">
                    <ChevronLeft className="h-3.5 w-3.5" />
                    Modify
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile: Modify search */}
        <div className="md:hidden bg-white border-b border-border">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-medium">Modify Search</h2>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <BookingForm minimal />
          </div>
        </div>
        
        {/* Main content */}
        <div className="container mx-auto px-6 py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar filters (desktop) */}
            <div className="hidden lg:block w-full lg:w-64 shrink-0">
              <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium">Filters</h2>
                    {activeFilters.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearFilters}
                        className="h-auto px-2 py-1 text-xs text-muted-foreground hover:text-destructive"
                      >
                        Clear All
                      </Button>
                    )}
                  </div>
                </div>
                
                <div>
                  <Accordion type="multiple" defaultValue={["departure", "classes", "duration"]}>
                    <AccordionItem value="departure">
                      <AccordionTrigger className="px-4 py-3 text-sm">Departure Time</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="space-y-2">
                          {["Early Morning (12am - 6am)", "Morning (6am - 12pm)", "Afternoon (12pm - 6pm)", "Evening (6pm - 12am)"].map((time) => (
                            <div key={time} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`time-${time}`} 
                                checked={activeFilters.includes(time)}
                                onCheckedChange={() => toggleFilter(time)}
                              />
                              <Label htmlFor={`time-${time}`} className="text-sm font-normal cursor-pointer">
                                {time}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="classes">
                      <AccordionTrigger className="px-4 py-3 text-sm">Train Class</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="space-y-2">
                          {["Sleeper (SL)", "AC 3 Tier (3A)", "AC 2 Tier (2A)", "AC First Class (1A)", "Second Sitting (2S)"].map((cls) => (
                            <div key={cls} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`class-${cls}`} 
                                checked={activeFilters.includes(cls)}
                                onCheckedChange={() => toggleFilter(cls)}
                              />
                              <Label htmlFor={`class-${cls}`} className="text-sm font-normal cursor-pointer">
                                {cls}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="duration">
                      <AccordionTrigger className="px-4 py-3 text-sm">Journey Duration</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="space-y-2">
                          {["Less than 6 hours", "6 - 12 hours", "12 - 18 hours", "18 - 24 hours", "More than 24 hours"].map((duration) => (
                            <div key={duration} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`duration-${duration}`}
                                checked={activeFilters.includes(duration)}
                                onCheckedChange={() => toggleFilter(duration)}
                              />
                              <Label htmlFor={`duration-${duration}`} className="text-sm font-normal cursor-pointer">
                                {duration}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="days">
                      <AccordionTrigger className="px-4 py-3 text-sm">Running Days</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="grid grid-cols-4 gap-2">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                            <div key={day} className="flex flex-col items-center">
                              <Button
                                variant={activeFilters.includes(day) ? "default" : "outline"}
                                size="sm"
                                className={cn(
                                  "h-8 w-8 p-0 rounded-full",
                                  activeFilters.includes(day) ? "bg-primary" : "bg-transparent"
                                )}
                                onClick={() => toggleFilter(day)}
                              >
                                {day[0]}
                              </Button>
                              <span className="text-xs mt-1">{day}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
            
            {/* Mobile filters */}
            <div className="lg:hidden sticky top-16 z-10 pt-2 pb-4 bg-gray-50">
              <div className="flex items-center space-x-2">
                <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Filter className="h-3.5 w-3.5" />
                      Filters
                      {activeFilters.length > 0 && (
                        <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                          {activeFilters.length}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:w-80">
                    <SheetHeader className="pb-2 border-b">
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                      <Accordion type="multiple" defaultValue={["departure", "classes", "duration", "days"]}>
                        <AccordionItem value="departure">
                          <AccordionTrigger className="py-3 text-sm">Departure Time</AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <div className="space-y-2">
                              {["Early Morning (12am - 6am)", "Morning (6am - 12pm)", "Afternoon (12pm - 6pm)", "Evening (6pm - 12am)"].map((time) => (
                                <div key={time} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`mobile-time-${time}`} 
                                    checked={activeFilters.includes(time)}
                                    onCheckedChange={() => toggleFilter(time)}
                                  />
                                  <Label htmlFor={`mobile-time-${time}`} className="text-sm font-normal cursor-pointer">
                                    {time}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="classes">
                          <AccordionTrigger className="py-3 text-sm">Train Class</AccordionTrigger>
                          <AccordionContent className="pb-4">
                            {/* Same content as desktop */}
                            <div className="space-y-2">
                              {["Sleeper (SL)", "AC 3 Tier (3A)", "AC 2 Tier (2A)", "AC First Class (1A)", "Second Sitting (2S)"].map((cls) => (
                                <div key={cls} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`mobile-class-${cls}`} 
                                    checked={activeFilters.includes(cls)}
                                    onCheckedChange={() => toggleFilter(cls)}
                                  />
                                  <Label htmlFor={`mobile-class-${cls}`} className="text-sm font-normal cursor-pointer">
                                    {cls}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="duration">
                          <AccordionTrigger className="py-3 text-sm">Journey Duration</AccordionTrigger>
                          <AccordionContent className="pb-4">
                            {/* Same content as desktop */}
                            <div className="space-y-2">
                              {["Less than 6 hours", "6 - 12 hours", "12 - 18 hours", "18 - 24 hours", "More than 24 hours"].map((duration) => (
                                <div key={duration} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`mobile-duration-${duration}`}
                                    checked={activeFilters.includes(duration)}
                                    onCheckedChange={() => toggleFilter(duration)}
                                  />
                                  <Label htmlFor={`mobile-duration-${duration}`} className="text-sm font-normal cursor-pointer">
                                    {duration}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="days">
                          <AccordionTrigger className="py-3 text-sm">Running Days</AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <div className="grid grid-cols-4 gap-2">
                              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                                <div key={day} className="flex flex-col items-center">
                                  <Button
                                    variant={activeFilters.includes(day) ? "default" : "outline"}
                                    size="sm"
                                    className={cn(
                                      "h-8 w-8 p-0 rounded-full",
                                      activeFilters.includes(day) ? "bg-primary" : "bg-transparent"
                                    )}
                                    onClick={() => toggleFilter(day)}
                                  >
                                    {day[0]}
                                  </Button>
                                  <span className="text-xs mt-1">{day}</span>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-white">
                      <div className="flex items-center justify-between">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={clearFilters}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          Clear All
                        </Button>
                        <Button onClick={() => setIsFiltersOpen(false)}>
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                
                <Button variant="outline" size="sm" className="gap-1">
                  <Sliders className="h-3.5 w-3.5" />
                  Sort
                </Button>
                
                <div className="relative flex-1">
                  <Input 
                    placeholder="Search trains..." 
                    className="pl-8 h-9"
                  />
                  <MapPin className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              {/* Active filters */}
              {activeFilters.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeFilters.map(filter => (
                    <Badge key={filter} variant="secondary" className="gap-1 px-2 py-1 rounded-full">
                      {filter}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => toggleFilter(filter)} 
                        className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            {/* Train list */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Delhi to Mumbai Trains</h2>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-muted-foreground gap-1 h-8">
                    <Plus className="h-3.5 w-3.5" />
                    Compare
                  </Button>
                  
                  <div className="hidden md:flex items-center space-x-4 text-sm">
                    <span>Sort by:</span>
                    <button className="font-medium text-primary">Departure</button>
                    <button>Duration</button>
                    <button>Arrival</button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {trainResults.map((train) => (
                  <TrainCard
                    key={train.trainNumber}
                    trainNumber={train.trainNumber}
                    trainName={train.trainName}
                    departure={train.departure}
                    arrival={train.arrival}
                    duration={train.duration}
                    runningDays={train.runningDays}
                  />
                ))}
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <Button variant="outline" size="sm" className="gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-3">Page 1 of 3</span>
                  <div className="flex items-center space-x-1">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-primary">1</Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">2</Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">3</Button>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="gap-1">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrainList;
