import React, { useState, useCallback, memo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AreaChart, ChevronDown, ChevronUp, Clock, Train } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TrainCardProps {
  trainNumber: string;
  trainName: string;
  departure: {
    station: string;
    time: string;
    day: number;
  };
  arrival: {
    station: string;
    time: string;
    day: number;
  };
  duration: string;
  runningDays: string[];
  className?: string;
}

const classAvailability = [
  { name: "Sleeper (SL)", price: "₹875", status: "Available", seats: 132 },
  { name: "AC 3 Tier (3A)", price: "₹1,245", status: "Available", seats: 45 },
  { name: "AC 2 Tier (2A)", price: "₹1,795", status: "RAC 15", seats: 0 },
  { name: "AC First Class (1A)", price: "₹2,975", status: "WL 8", seats: 0 },
];

// Memoize the DayIndicator component
const DayIndicator = memo<{ days: string[] }>(({ days }) => {
  const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <div className="flex space-x-1">
      {allDays.map((day) => {
        const isRunning = days.includes(day);
        return (
          <TooltipProvider key={day}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className={cn(
                    "inline-block w-6 h-6 text-xs rounded-full flex items-center justify-center",
                    isRunning 
                      ? "bg-primary/10 text-primary font-medium"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {day[0]}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isRunning ? `Runs on ${day}` : `Doesn't run on ${day}`}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
});

DayIndicator.displayName = 'DayIndicator';

const TrainCard: React.FC<TrainCardProps> = ({
  trainNumber,
  trainName,
  departure,
  arrival,
  duration,
  runningDays,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  return (
    <div className={cn(
      "bg-white rounded-xl border border-border shadow-sm transition-all duration-300",
      isOpen ? "shadow-md" : "",
      className
    )}>
      <Collapsible open={isOpen} onOpenChange={toggleOpen}>
        <div className="p-4 md:p-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Train info */}
            <div className="flex items-start space-x-4">
              <div className="hidden md:flex h-10 w-10 rounded-lg bg-primary/10 items-center justify-center text-primary">
                <Train className="h-5 w-5" />
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg">{trainName}</h3>
                  <div className="rounded-full px-2.5 py-0.5 bg-secondary text-xs text-muted-foreground">
                    {trainNumber}
                  </div>
                </div>
                
                <div className="mt-1 flex items-center space-x-3 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Clock className="mr-1 h-3.5 w-3.5" />
                    {duration}
                  </span>
                  
                  <span className="hidden md:inline-block">•</span>
                  
                  <span className="hidden md:flex items-center">
                    <DayIndicator days={runningDays} />
                  </span>
                </div>
              </div>
            </div>
            
            {/* Time and station info */}
            <div className="flex w-full md:w-auto justify-between space-x-4">
              {/* Departure */}
              <div className="text-left">
                <div className="font-medium text-lg">{departure.time}</div>
                <div className="text-sm text-muted-foreground">{departure.station}</div>
                {departure.day > 0 && (
                  <div className="mt-1 text-xs inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-500">
                    Day {departure.day}
                  </div>
                )}
              </div>
              
              {/* Journey visualization */}
              <div className="hidden md:flex flex-col items-center justify-center px-2">
                <div className="w-24 h-0.5 bg-muted relative">
                  <div className="absolute -top-1.5 -left-1 h-3 w-3 rounded-full border-2 border-primary bg-background"></div>
                  <div className="absolute -top-1.5 -right-1 h-3 w-3 rounded-full border-2 border-primary bg-background"></div>
                </div>
                <span className="text-xs text-muted-foreground mt-1">{duration}</span>
              </div>
              
              {/* Arrival */}
              <div className="text-right">
                <div className="font-medium text-lg">{arrival.time}</div>
                <div className="text-sm text-muted-foreground">{arrival.station}</div>
                {arrival.day > 1 && (
                  <div className="mt-1 text-xs inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-500">
                    Day {arrival.day}
                  </div>
                )}
              </div>
            </div>
            
            {/* Action buttons on mobile */}
            <div className="w-full md:w-auto flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                <AreaChart className="h-4 w-4 mr-1.5" />
                Fare
              </Button>
              
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                  {isOpen ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1.5" />
                      Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1.5" />
                      More
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
          
          {/* Mobile running days */}
          <div className="mt-2 md:hidden">
            <DayIndicator days={runningDays} />
          </div>
        </div>
        
        <CollapsibleContent>
          <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 border-t border-muted/50">
            <div className="pt-4">
              <h4 className="font-medium text-sm mb-3">Availability & Fares</h4>
              
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead>Fare</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classAvailability.map((cls) => (
                      <TableRow key={cls.name}>
                        <TableCell className="font-medium">{cls.name}</TableCell>
                        <TableCell>{cls.price}</TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                              cls.status === "Available"
                                ? "bg-green-50 text-green-600"
                                : cls.status.startsWith("RAC")
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-red-50 text-red-600"
                            )}
                          >
                            {cls.status}
                            {cls.seats > 0 && ` (${cls.seats})`}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="default" 
                            size="sm"
                            className={cn(
                              "rounded-md font-medium text-xs",
                              cls.status === "Available" ? "" : "opacity-80"
                            )}
                            disabled={cls.status.startsWith("WL")}
                          >
                            Book Now
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                  <div className="flex items-center text-sm">
                    <Button variant="outline" size="sm" className="mr-2">Train Schedule</Button>
                    <Button variant="outline" size="sm" className="mr-2">Route Map</Button>
                    <Button variant="outline" size="sm">Seat Layout</Button>
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  Last updated 10 mins ago
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default memo(TrainCard);
