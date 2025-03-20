
import React, { useState } from 'react';
import { Search, Train, ArrowRight, Plus, AlertCircle, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrainTracker from '@/components/TrainTracker';

// Demo data for recent trains
const recentTrains = [
  {
    trainNumber: "12301",
    trainName: "Howrah Rajdhani",
    from: "New Delhi",
    to: "Howrah Jn",
    lastChecked: "2 hours ago"
  },
  {
    trainNumber: "12259",
    trainName: "Sealdah Duronto",
    from: "New Delhi",
    to: "Sealdah",
    lastChecked: "Yesterday"
  },
  {
    trainNumber: "12313",
    trainName: "Sealdah Rajdhani",
    from: "New Delhi",
    to: "Sealdah",
    lastChecked: "3 days ago"
  },
];

// Demo data for featured train stations
const featuredStations = [
  "New Delhi (NDLS)",
  "Mumbai Central (BCT)",
  "Chennai Central (MAS)",
  "Kolkata Howrah (HWH)",
  "Bangalore City (SBC)",
  "Ahmedabad (ADI)",
  "Hyderabad (HYD)",
  "Pune (PUNE)",
  "Jaipur (JP)",
  "Lucknow (LKO)",
  "Chandigarh (CDG)",
];

// Demo data for tracking result
const trackingResult = {
  trainNumber: "12301",
  trainName: "Howrah Rajdhani",
  progress: 68,
  stations: [
    {
      name: "New Delhi",
      code: "NDLS",
      scheduledArrival: "16:25",
      actualArrival: "16:25",
      scheduledDeparture: "16:55",
      actualDeparture: "16:58",
      status: "completed" as const,
      platformNo: 9
    },
    {
      name: "Kanpur Central",
      code: "CNB",
      scheduledArrival: "21:30",
      actualArrival: "21:45",
      scheduledDeparture: "21:40",
      actualDeparture: "21:55",
      status: "completed" as const,
      delayedBy: 15,
      platformNo: 3
    },
    {
      name: "Allahabad Junction",
      code: "ALD",
      scheduledArrival: "23:55",
      actualArrival: "00:15",
      scheduledDeparture: "00:10",
      actualDeparture: "00:25",
      status: "completed" as const,
      delayedBy: 20,
      platformNo: 5
    },
    {
      name: "Gaya Junction",
      code: "GAYA",
      scheduledArrival: "03:23",
      actualArrival: "03:40",
      scheduledDeparture: "03:28",
      actualDeparture: "03:45",
      status: "completed" as const,
      delayedBy: 17,
      platformNo: 2
    },
    {
      name: "Dhanbad Junction",
      code: "DHN",
      scheduledArrival: "05:35",
      actualArrival: "05:55",
      scheduledDeparture: "05:45",
      actualDeparture: "06:05",
      status: "current" as const,
      delayedBy: 20,
      platformNo: 4
    },
    {
      name: "Asansol Junction",
      code: "ASN",
      scheduledArrival: "06:38",
      actualArrival: null,
      scheduledDeparture: "06:45",
      actualDeparture: null,
      status: "upcoming" as const
    },
    {
      name: "Durgapur",
      code: "DGR",
      scheduledArrival: "07:15",
      actualArrival: null,
      scheduledDeparture: "07:17",
      actualDeparture: null,
      status: "upcoming" as const
    },
    {
      name: "Howrah Junction",
      code: "HWH",
      scheduledArrival: "09:55",
      actualArrival: null,
      scheduledDeparture: "-",
      actualDeparture: null,
      status: "upcoming" as const
    }
  ]
};

const TrackTrain = () => {
  const [trainNumber, setTrainNumber] = useState("");
  const [pnrNumber, setPnrNumber] = useState("");
  const [showResult, setShowResult] = useState(false);
  
  const handleTrackTrain = () => {
    if (trainNumber) {
      setShowResult(true);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header section */}
        <section className="bg-gradient-to-b from-primary/5 to-white pt-28 pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Track Your Train</h1>
              <p className="text-muted-foreground mb-0">
                Get real-time information about your train's current location and status.
              </p>
            </div>
          </div>
        </section>
        
        {/* Track form section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue="train" className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <TabsList>
                    <TabsTrigger value="train">By Train Number</TabsTrigger>
                    <TabsTrigger value="pnr">By PNR</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="train" className="mt-0">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Track using train number</CardTitle>
                      <CardDescription>
                        Enter the train number to get real-time location and status updates.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <div className="relative">
                            <Input 
                              placeholder="Enter train number (e.g., 12301)" 
                              className="pl-10"
                              value={trainNumber}
                              onChange={(e) => setTrainNumber(e.target.value)}
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                              <Train className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                        <Button 
                          onClick={handleTrackTrain}
                          disabled={!trainNumber}
                        >
                          Track Train
                        </Button>
                      </div>
                      
                      <div className="mt-4">
                        <h3 className="text-sm font-medium mb-2">Featured Trains</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {["12301 - Howrah Rajdhani", "12951 - Mumbai Rajdhani", "12259 - Sealdah Duronto", "12050 - Gatimaan Express", "12311 - Kalka Mail", "16031 - Andaman Express"].map((train, index) => (
                            <button
                              key={index}
                              className="text-left bg-muted py-2.5 px-3 rounded-md text-xs hover:bg-muted/80 transition-colors"
                              onClick={() => {
                                const trainNo = train.split(" - ")[0];
                                setTrainNumber(trainNo);
                              }}
                            >
                              {train}
                            </button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
                      Data refreshes automatically every 5 minutes
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="pnr" className="mt-0">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Track using PNR number</CardTitle>
                      <CardDescription>
                        Enter your 10-digit PNR number to check your booking status and train location.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <div className="relative">
                            <Input 
                              placeholder="Enter 10-digit PNR number" 
                              className="pl-10"
                              value={pnrNumber}
                              onChange={(e) => setPnrNumber(e.target.value)}
                              maxLength={10}
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                              <Search className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                        <Button>
                          Check Status
                        </Button>
                      </div>
                      
                      <Alert className="mt-4 bg-blue-50 border border-blue-100">
                        <AlertCircle className="h-4 w-4 text-blue-500" />
                        <AlertTitle className="text-blue-700 text-sm font-medium">PNR Tracking</AlertTitle>
                        <AlertDescription className="text-blue-700 text-sm">
                          PNR information includes booking status, passenger details, coach and seat information.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                    <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
                      PNR status typically updates every 2-3 hours
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Tracking result */}
        {showResult && (
          <section className="py-8 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-xl font-semibold mb-6">Tracking Result</h2>
                
                <TrainTracker
                  trainNumber={trackingResult.trainNumber}
                  trainName={trackingResult.trainName}
                  stations={trackingResult.stations}
                  progress={trackingResult.progress}
                />
              </div>
            </div>
          </section>
        )}
        
        {/* Recent trains and featured stations */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Recent trains */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">Recently Tracked Trains</h2>
                  
                  <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Train Number</TableHead>
                          <TableHead>Train Name</TableHead>
                          <TableHead>Route</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentTrains.map((train) => (
                          <TableRow key={train.trainNumber}>
                            <TableCell className="font-medium">{train.trainNumber}</TableCell>
                            <TableCell>{train.trainName}</TableCell>
                            <TableCell>
                              <div className="flex items-center text-sm">
                                <span>{train.from}</span>
                                <ArrowRight className="h-3 w-3 mx-1 text-muted-foreground" />
                                <span>{train.to}</span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                Last checked: {train.lastChecked}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-xs"
                                onClick={() => {
                                  setTrainNumber(train.trainNumber);
                                  setShowResult(true);
                                }}
                              >
                                Track Again
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                {/* Featured stations */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Featured Stations</h2>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-primary gap-1">
                          <Plus className="h-3.5 w-3.5" />
                          More
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>All Stations</DialogTitle>
                          <DialogDescription>
                            Browse and search for stations across India.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="relative mb-4">
                            <Input placeholder="Search stations..." className="pl-8" />
                            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                            {[...featuredStations, ...featuredStations].map((station, index) => (
                              <button
                                key={index}
                                className="text-left bg-muted py-2.5 px-3 rounded-md text-xs hover:bg-muted/80 transition-colors"
                              >
                                {station}
                              </button>
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-border shadow-sm p-4">
                    <div className="grid grid-cols-1 gap-2">
                      {featuredStations.slice(0, 8).map((station, index) => (
                        <button
                          key={index}
                          className="text-left bg-muted py-2.5 px-3 rounded-md text-xs hover:bg-muted/80 transition-colors flex justify-between items-center"
                        >
                          <span>{station}</span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Train tracking info section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">How Train Tracking Works</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Our advanced train tracking system uses multiple data sources to provide accurate and real-time information about your train's location and status.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Train className="h-6 w-6" />,
                    title: "GPS & Cellular Data",
                    description: "Real-time GPS tracking combined with cellular network data provides accurate train positioning."
                  },
                  {
                    icon: <Clock className="h-6 w-6" />,
                    title: "Station Updates",
                    description: "Station arrival and departure times are logged at each stop, allowing for precise delay calculations."
                  },
                  {
                    icon: <Calendar className="h-6 w-6" />,
                    title: "Historical Patterns",
                    description: "Historical data helps predict delays and estimated arrival times based on past performance."
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl border border-border p-6 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-5">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-white mt-8 rounded-xl border border-border p-6">
                <h3 className="text-lg font-medium mb-4">Tracking Accuracy</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Our train tracking system provides accurate information for most trains, but accuracy may vary based on several factors:
                </p>
                <ul className="space-y-2">
                  {[
                    "Network coverage in remote areas may affect real-time updates",
                    "Extreme weather conditions can impact tracking accuracy",
                    "Updates typically refresh every 5-10 minutes",
                    "Unscheduled stops or route diversions may temporarily affect accuracy"
                  ].map((point, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 mt-0.5">
                        <AlertCircle className="h-3 w-3" />
                      </div>
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrackTrain;
