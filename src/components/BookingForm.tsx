
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { CalendarIcon, Users, ChevronDown, ArrowRight, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import StationInput from './StationInput';

// Demo data
const STATIONS = [
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
  "Patna (PNBE)",
  "Bhopal (BPL)",
  "Guwahati (GHY)",
  "Kochi (ERS)"
];

interface BookingFormProps {
  minimal?: boolean;
  className?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ minimal = false, className }) => {
  const navigate = useNavigate();
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [passengerClass, setPassengerClass] = useState("all");
  const [quota, setQuota] = useState("general");
  const [errors, setErrors] = useState<{
    fromStation?: string;
    toStation?: string;
    date?: string;
  }>({});

  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    const newErrors: {
      fromStation?: string;
      toStation?: string;
      date?: string;
    } = {};
    
    if (!fromStation) newErrors.fromStation = 'Please enter departure station';
    if (!toStation) newErrors.toStation = 'Please enter arrival station';
    if (!date) newErrors.date = 'Please select journey date';
    
    if (fromStation && toStation && fromStation === toStation) {
      newErrors.toStation = 'Arrival station cannot be same as departure';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Navigate to train list page with search params
      navigate('/train-list');
    }
  };
  
  return (
    <div className={cn(
      "rounded-2xl shadow-sm border border-border bg-white p-6",
      minimal ? "shadow-none border-0 p-0" : "",
      className
    )}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <StationInput
            label="From"
            value={fromStation}
            onChange={setFromStation}
            suggestions={STATIONS}
            error={errors.fromStation}
          />
          
          <div className="relative">
            <StationInput
              label="To"
              value={toStation}
              onChange={setToStation}
              suggestions={STATIONS}
              error={errors.toStation}
            />
            
            {!minimal && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute top-1/2 -left-6 transform -translate-y-1/2 -translate-x-1/2 bg-background border border-border h-10 w-10 rounded-full hover:bg-muted shadow-sm"
                onClick={handleSwapStations}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Journey Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal text-sm bg-white",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd MMM yyyy") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="text-xs text-destructive mt-1">{errors.date}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Class
            </label>
            <Select defaultValue={passengerClass} onValueChange={setPassengerClass}>
              <SelectTrigger className="bg-white text-sm">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="1A">AC First Class (1A)</SelectItem>
                <SelectItem value="2A">AC 2 Tier (2A)</SelectItem>
                <SelectItem value="3A">AC 3 Tier (3A)</SelectItem>
                <SelectItem value="SL">Sleeper (SL)</SelectItem>
                <SelectItem value="CC">AC Chair Car (CC)</SelectItem>
                <SelectItem value="2S">Second Sitting (2S)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Quota
            </label>
            <Select defaultValue={quota} onValueChange={setQuota}>
              <SelectTrigger className="bg-white text-sm">
                <SelectValue placeholder="Select quota" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Quota</SelectItem>
                <SelectItem value="ladies">Ladies Quota</SelectItem>
                <SelectItem value="tatkal">Tatkal Quota</SelectItem>
                <SelectItem value="senior">Senior Citizen</SelectItem>
                <SelectItem value="defence">Defence Personnel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          type="submit" 
          size="lg" 
          className={cn(
            "w-full justify-center font-medium",
            minimal ? "rounded-lg" : "rounded-lg"
          )}
        >
          Search Trains
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
