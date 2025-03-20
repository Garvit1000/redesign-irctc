
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Train, 
  Map, 
  Clock, 
  Loader2, 
  CheckCircle2, 
  Circle, 
  AlertCircle 
} from 'lucide-react';
import {
  Progress,
} from "@/components/ui/progress";

interface Station {
  name: string;
  code: string;
  scheduledArrival: string;
  actualArrival: string | null;
  scheduledDeparture: string;
  actualDeparture: string | null;
  status: 'completed' | 'current' | 'upcoming' | 'delayed';
  delayedBy?: number; // in minutes
  platformNo?: number;
}

interface TrainTrackerProps {
  trainNumber: string;
  trainName: string;
  stations: Station[];
  progress: number;
  className?: string;
}

const StatusIcon = ({ status }: { status: Station['status'] }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'current':
      return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
    case 'delayed':
      return <AlertCircle className="h-5 w-5 text-amber-500" />;
    case 'upcoming':
      return <Circle className="h-5 w-5 text-gray-300" />;
    default:
      return <Circle className="h-5 w-5 text-gray-300" />;
  }
};

const TrainTracker: React.FC<TrainTrackerProps> = ({ 
  trainNumber, 
  trainName, 
  stations, 
  progress,
  className 
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  
  // Animate progress
  useEffect(() => {
    setCurrentProgress(0);
    
    const timer = setTimeout(() => {
      setCurrentProgress(progress);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [progress]);
  
  const currentStation = stations.find(station => station.status === 'current');
  
  return (
    <div className={cn("bg-white rounded-xl border border-border shadow-sm", className)}>
      <div className="p-5 border-b border-border">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Train className="h-6 w-6" />
            </div>
            
            <div>
              <h2 className="text-xl font-bold">{trainName}</h2>
              <div className="text-sm text-muted-foreground">
                Train No: {trainNumber}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 md:items-end">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Map className="h-4 w-4" />
                Live Map
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Clock className="h-4 w-4" />
                Journey Time
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated 2 mins ago
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium">Journey Progress</div>
            <div className="text-sm text-muted-foreground">{currentProgress}% complete</div>
          </div>
          <Progress value={currentProgress} className="h-2" />
        </div>
        
        {currentStation && (
          <div className="mt-4 rounded-lg bg-blue-50 p-3 border border-blue-100">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                <Train className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-blue-900">
                  Currently at {currentStation.name} ({currentStation.code})
                </div>
                <div className="text-xs text-blue-700">
                  {currentStation.platformNo ? `Platform ${currentStation.platformNo}` : 'Platform updating...'}
                </div>
              </div>
              {currentStation.delayedBy && (
                <div className="ml-auto rounded-full bg-amber-100 text-amber-800 text-xs px-2 py-1">
                  Delayed by {currentStation.delayedBy} mins
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-sm font-semibold mb-4">Journey Status</h3>
        
        <div className="space-y-0">
          {stations.map((station, index) => (
            <div 
              key={station.code}
              className={cn(
                "flex items-start group",
                index !== stations.length - 1 ? "pb-6" : ""
              )}
            >
              <div className="relative mr-4 flex items-center justify-center">
                <div className={cn(
                  "z-10 flex h-9 w-9 items-center justify-center rounded-full",
                  station.status === 'current' ? "bg-blue-100" : "bg-gray-50 group-hover:bg-gray-100"
                )}>
                  <StatusIcon status={station.status} />
                </div>
                
                {index !== stations.length - 1 && (
                  <div className={cn(
                    "absolute top-9 bottom-0 left-1/2 w-0.5",
                    station.status === 'completed' 
                      ? "bg-green-500" 
                      : station.status === 'current'
                      ? "bg-gradient-to-b from-blue-500 to-gray-200"
                      : "bg-gray-200"
                  )}></div>
                )}
              </div>
              
              <div className={cn(
                "flex flex-1 flex-col pt-1",
                station.status === 'current' ? "font-medium" : ""
              )}>
                <div className="flex flex-wrap justify-between gap-y-1">
                  <div className="text-sm font-medium">
                    {station.name} ({station.code})
                    {station.platformNo && station.status !== 'upcoming' && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        Platform {station.platformNo}
                      </span>
                    )}
                  </div>
                  
                  <div className={cn(
                    "flex space-x-2 text-xs",
                    station.status === 'delayed' ? "text-amber-600" : "text-muted-foreground"
                  )}>
                    <span>
                      {station.actualArrival || station.scheduledArrival}
                    </span>
                    <span>-</span>
                    <span>
                      {station.actualDeparture || station.scheduledDeparture}
                    </span>
                  </div>
                </div>
                
                {station.delayedBy && (
                  <div className="mt-1 text-xs text-amber-600">
                    Delayed by {station.delayedBy} mins
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainTracker;
