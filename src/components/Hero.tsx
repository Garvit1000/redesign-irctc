import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Train, Star, MapPin, Sparkles, TramFront, TrainTrack, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BackgroundBeams, SparklesCore, TextGenerateEffect, TypewriterEffect } from '@/components/ui/aceternity';
import { fadeIn, fadeInUp, floatingAnimation, sparkleAnimation, trainMotionAnimation, smokeAnimation, wheelRotation } from '@/lib/animations';
import StationInput from './StationInput';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const trainRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const tracksRef = useRef<HTMLDivElement>(null);
  const wheelsRef = useRef<Array<HTMLDivElement | null>>([]);
  const trafficLightRef = useRef<HTMLDivElement>(null);
  const redLightRef = useRef<HTMLDivElement>(null);
  const yellowLightRef = useRef<HTMLDivElement>(null);
  const greenLightRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Form state
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formErrors, setFormErrors] = useState({
    fromStation: '',
    toStation: '',
    date: ''
  });

  // Sample station suggestions
  const stationSuggestions = [
    "Delhi (DLI)",
    "Mumbai Central (MMCT)",
    "Chennai Central (MAS)",
    "Kolkata (KOAA)",
    "Bangalore (SBC)",
    "Hyderabad (HYD)",
    "Ahmedabad (ADI)",
    "Pune (PUNE)",
    "Jaipur (JP)",
    "Lucknow (LKO)",
    "Chandigarh (CDG)",
    "Bhubaneswar (BBS)",
    "Guwahati (GHY)",
    "Patna (PNBE)",
    "Kochi (ERS)"
  ];

  // Handle form submission
  const handleSearch = () => {
    // Reset errors
    const errors = {
      fromStation: '',
      toStation: '',
      date: ''
    };
    
    // Validate form
    let isValid = true;
    
    if (!fromStation) {
      errors.fromStation = 'Please select a departure station';
      isValid = false;
    }
    
    if (!toStation) {
      errors.toStation = 'Please select an arrival station';
      isValid = false;
    }
    
    if (fromStation && toStation && fromStation === toStation) {
      errors.toStation = 'Departure and arrival stations cannot be the same';
      isValid = false;
    }
    
    if (!date) {
      errors.date = 'Please select a date';
      isValid = false;
    }
    
    setFormErrors(errors);
    
    if (isValid) {
      // Navigate to search results with query params
      navigate(`/search-trains?from=${encodeURIComponent(fromStation)}&to=${encodeURIComponent(toStation)}&date=${date?.toISOString().split('T')[0]}`);
    }
  };

  // Swap stations function
  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  useEffect(() => {
    // Memoize DOM references
    const trainElement = trainRef.current;
    const tracksContainer = tracksRef.current;
    const particlesContainer = particlesRef.current;
    
    // Only create elements if they don't already exist
    if (tracksContainer && !tracksContainer.hasChildNodes()) {
      // Create railway tracks
      const tracksCount = Math.min(50, Math.floor(window.innerWidth / 20)); // Limit based on screen width
      const trackWidth = window.innerWidth / tracksCount;
      
      const trackFragment = document.createDocumentFragment();
      for (let i = 0; i < tracksCount; i++) {
        const track = document.createElement('div');
        track.className = 'absolute h-3 bg-gray-400/20 bottom-0';
        track.style.width = '8px';
        track.style.left = `${i * trackWidth + trackWidth / 2}px`;
        track.style.transform = 'perspective(500px) rotateX(60deg)';
        track.style.animationDelay = `${i * 0.1}s`;
        trackFragment.appendChild(track);
      }
      tracksContainer.appendChild(trackFragment);
    }
    
    // Only create particles if they don't already exist
    if (particlesContainer && !particlesContainer.hasChildNodes()) {
      // Create floating particles (steam/smoke) with reduced count
      const colors = ['#E2F0FF', '#C7CEEA', '#FFDAC1', '#FFFFFF', '#B5EAD7'];
      const particleCount = window.innerWidth < 768 ? 20 : 45; // Reduce on mobile
      
      const particleFragment = document.createDocumentFragment();
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 20 + 8;
        
        particle.className = 'absolute rounded-full opacity-50 z-10';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random position around train with wider spread
        particle.style.left = `${10 + Math.random() * 20}%`;
        particle.style.bottom = `${15 + Math.random() * 35}%`;
        
        // Random animation duration and delay with more variation
        const duration = Math.random() * 10 + 4;
        const delay = Math.random() * 3;
        particle.style.animation = `smoke ${duration}s infinite ease-out ${delay}s`;
        
        // Add scale variation
        particle.style.transform = `scale(${0.8 + Math.random() * 0.4})`;
        
        particleFragment.appendChild(particle);
      }
      particlesContainer.appendChild(particleFragment);
    }

    // Train wheels rotation - use CSS classes instead of direct manipulation
    wheelsRef.current.forEach(wheel => {
      if (wheel) {
        wheel.classList.add('animate-wheel-rotation');
      }
    });

    // Enhanced train motion animation with traffic light sync
    if (trainElement) {
      // Initial position off-screen to the LEFT (so it enters from left)
      trainElement.style.transform = 'translateX(-100%)';
      
      let animationFrame: number | null = null;
      
      // Set up traffic light sequence
      const setupTrafficLightSequence = () => {
        // Get light elements
        const redLight = redLightRef.current;
        const yellowLight = yellowLightRef.current;
        const greenLight = greenLightRef.current;
        
        if (redLight && yellowLight && greenLight) {
          // Initial state - red light on
          redLight.classList.add('active-light');
          yellowLight.classList.remove('active-light');
          greenLight.classList.remove('active-light');
          
          // After 2 seconds, switch to yellow
          const yellowTimer = setTimeout(() => {
            redLight.classList.remove('active-light');
            yellowLight.classList.add('active-light');
            
            // After 1 second, switch to green and start train
            const greenTimer = setTimeout(() => {
              yellowLight.classList.remove('active-light');
              greenLight.classList.add('active-light');
              
              // Start train movement when green light is on - move RIGHT
              trainElement.style.transition = 'transform 2s cubic-bezier(0.2, 0.8, 0.2, 1)';
              trainElement.style.transform = 'translateX(0)';
              
              // Start the continuous animation after the train enters
              const bounceTimer = setTimeout(() => {
                trainElement.style.transition = 'transform 0.1s ease-out';
                
                const animateTrain = () => {
                  if (!trainElement) return;
                  const bounceHeight = Math.sin(Date.now() / 500) * 2;
                  const swayAngle = Math.sin(Date.now() / 1000) * 0.8;
                  
                  trainElement.style.transform = `translateY(${bounceHeight}px) rotate(${swayAngle}deg)`;
                  animationFrame = requestAnimationFrame(animateTrain);
                };
                
                animationFrame = requestAnimationFrame(animateTrain);
                
                // After train is in view for a while, restart the sequence
                const resetTimer = setTimeout(() => {
                  // Reset train position - move it OFF-SCREEN to the RIGHT
                  trainElement.style.transition = 'transform 2s ease-in-out';
                  trainElement.style.transform = 'translateX(100%)';
                  
                  // Reset traffic light sequence
                  const offscreenTimer = setTimeout(() => {
                    // Move train back to left side off-screen without animation
                    trainElement.style.transition = 'none';
                    trainElement.style.transform = 'translateX(-100%)';
                    
                    // Small delay before starting next sequence
                    const restartTimer = setTimeout(() => {
                      setupTrafficLightSequence();
                    }, 100);
                    
                    return () => clearTimeout(restartTimer);
                  }, 2000);
                  
                  if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                    animationFrame = null;
                  }
                  
                  return () => clearTimeout(offscreenTimer);
                }, 15000); // Train visible for 15 seconds
                
                return () => clearTimeout(resetTimer);
              }, 2000);
              
              return () => clearTimeout(bounceTimer);
            }, 1000);
            
            return () => clearTimeout(greenTimer);
          }, 2000);
          
          return () => clearTimeout(yellowTimer);
        }
      };
      
      // Start the sequence with a delay
      const initialTimer = setTimeout(() => {
        setupTrafficLightSequence();
      }, 1000);
      
      // Clean up all animations and timers
      return () => {
        clearTimeout(initialTimer);
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, []);

  return (
    <div className={cn(
      "relative overflow-hidden pb-16 pt-24 md:pt-32 min-h-screen flex items-center",
      className
    )}>
      {/* Aceternity UI Background Beams Effect */}
      <BackgroundBeams className="absolute inset-0" />
      
      {/* Sparkles Effect */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#1897ff"
        />
      </div>
      
      {/* Floating particles container (smoke) */}
      <div ref={particlesRef} className="absolute bottom-24 left-16 w-96 h-56 pointer-events-none"></div>

      {/* Additional decorative elements and floating shapes */}
      <div className="absolute top-32 left-1/4 w-20 h-20 opacity-10 bg-primary rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-48 right-1/3 w-16 h-16 opacity-10 bg-primary rounded-full blur-2xl animate-pulse" style={{animationDelay: "1s"}}></div>
      <div className="absolute bottom-40 left-1/3 w-24 h-24 opacity-10 bg-primary rounded-full blur-3xl animate-pulse" style={{animationDelay: "2s"}}></div>

      {/* Floating shapes and decorative elements above train */}
      <div className="absolute bottom-48 left-1/4 w-16 h-16 bg-blue-50/60 rounded-lg rotate-45 animate-float backdrop-blur-sm" style={{animationDelay: "0.5s"}}></div>
      <div className="absolute bottom-52 right-1/4 w-12 h-12 bg-blue-50/60 rounded-full animate-float backdrop-blur-sm" style={{animationDelay: "1.2s"}}></div>
      <div className="absolute bottom-56 left-1/3 w-10 h-10 bg-blue-50/60 rounded-lg -rotate-12 animate-float backdrop-blur-sm" style={{animationDelay: "0.8s"}}></div>
      
      {/* Animated stars and icons */}
      <div className="absolute bottom-60 left-1/4 text-primary/70 animate-bounce" style={{animationDelay: "0.2s"}}>
        <Star className="w-6 h-6" />
      </div>
      <div className="absolute bottom-52 right-1/3 text-primary/70 animate-bounce" style={{animationDelay: "0.7s"}}>
        <TramFront className="w-5 h-5" />
      </div>
      <div className="absolute bottom-56 left-2/3 text-primary/70 animate-bounce" style={{animationDelay: "1.1s"}}>
        <Star className="w-4 h-4" />
      </div>

      {/* Railway track elements */}
      <div ref={tracksRef} className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden"></div>
      
      {/* Dynamic railway track with animation */}
      <div className="absolute bottom-0 left-0 right-0 h-2 overflow-hidden">
        <div className="flex w-full animate-track-scroll">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-12 h-2 flex items-center justify-center">
              <div className="h-1.5 w-10 bg-gray-300 mb-0.5 railway-sleeper"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Train animation with smoke */}
      <div className="absolute bottom-12 left-0 right-0 h-24 overflow-hidden">
        <div className="train-animation">
          <div ref={trainRef} className="relative w-72 h-28 flex items-end">
            {/* Engine */}
            <div className="relative h-20 w-28 bg-gradient-to-b from-blue-500 to-blue-700 rounded-t-md flex-shrink-0 mr-2 border-t border-l border-r border-blue-700 shadow-lg">
              {/* Engine body details */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-blue-600 opacity-50"></div>
                <div className="absolute top-1/3 left-0 w-1/2 h-1/3 bg-blue-800 opacity-20 rounded-br-lg"></div>
              </div>
              
              {/* Front window */}
              <div className="absolute top-3 right-3 w-8 h-6 bg-gradient-to-br from-sky-100 to-sky-200 rounded-sm border border-blue-400 overflow-hidden">
                <div className="absolute inset-0 bg-white/30 rounded-tl-sm w-1/2 h-1/2"></div>
              </div>
              
              {/* Chimney with dynamic smoke */}
              <div className="absolute -top-6 left-4 w-4 h-6 bg-blue-800 rounded-t-sm overflow-hidden">
                <div className="absolute bottom-0 inset-x-0 h-1/4 bg-blue-900"></div>
                
                {/* Animated smoke particles with improved effect */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                  {[...Array(8)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute rounded-full bg-white/60 animate-smoke-rise"
                      style={{
                        width: `${6 + i * 2}px`,
                        height: `${6 + i * 2}px`,
                        top: `-${5 + i * 8}px`,
                        left: `${(Math.sin(i) * 10) - 5}px`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: `${2 + i * 0.5}s`,
                        opacity: 0.8 - i * 0.1,
                        filter: 'blur(1px)'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Cabin with details */}
              <div className="absolute top-0 left-14 w-14 h-12 bg-gradient-to-b from-blue-400 to-blue-600 border-l border-t border-blue-700 rounded-tr-md overflow-hidden">
                {/* Cabin details */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 right-0 h-1/4 bg-blue-300 opacity-30"></div>
                </div>
                
                {/* Driver window */}
                <div className="absolute top-2 left-2 w-4 h-3 bg-gradient-to-br from-sky-100 to-sky-200 rounded-sm border border-blue-400 overflow-hidden">
                  <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-white/30 rounded-tl-sm"></div>
                  {/* Driver silhouette */}
                  <div className="absolute bottom-0 right-1 w-1.5 h-1.5 bg-gray-700/50 rounded-full"></div>
                </div>
              </div>
              
              {/* Front details */}
              <div className="absolute bottom-0 right-0 h-8 w-3 bg-blue-800 rounded-tr-md"></div>
              
              {/* Front light with dynamic glow */}
              <div className="absolute right-0 bottom-6 w-1 h-3 flex justify-center items-center">
                <div className="w-3 h-3 bg-yellow-200 rounded-full animate-pulse-fast shadow-[0_0_12px_rgba(255,255,0,0.8)]"></div>
                <div className="absolute w-6 h-6 bg-yellow-100/20 rounded-full animate-pulse-slow"></div>
                <div className="absolute w-12 h-4 bg-yellow-100/10 rounded-full transform rotate-90"></div>
              </div>
              
              {/* Engine details - pipes and valves */}
              <div className="absolute bottom-3 left-2 w-6 h-2 bg-blue-900 rounded-full"></div>
              <div className="absolute bottom-6 left-1 w-1 h-4 bg-blue-900 rounded-full"></div>
              
              {/* Wheels with  details */}
              <div ref={el => wheelsRef.current[0] = el} className="absolute -bottom-4 left-4 w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-gray-600 flex items-center justify-center shadow-inner overflow-hidden">
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gray-500/30 border-r-gray-500/30"></div>
                <div className="w-4 h-0.5 bg-gray-400 absolute"></div>
                <div className="w-0.5 h-4 bg-gray-400 absolute"></div>
                <div className="w-6 h-6 rounded-full border border-gray-700 absolute"></div>
                <div className="absolute w-2 h-2 bg-gray-500 rounded-full"></div>
              </div>
              <div ref={el => wheelsRef.current[1] = el} className="absolute -bottom-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-gray-600 flex items-center justify-center shadow-inner overflow-hidden">
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gray-500/30 border-r-gray-500/30"></div>
                <div className="w-4 h-0.5 bg-gray-400 absolute"></div>
                <div className="w-0.5 h-4 bg-gray-400 absolute"></div>
                <div className="w-6 h-6 rounded-full border border-gray-700 absolute"></div>
                <div className="absolute w-2 h-2 bg-gray-500 rounded-full"></div>
              </div>
              
              {/* Connecting rods with animation */}
              <div className="absolute -bottom-1 left-8 right-8 h-0.5 bg-gray-500"></div>
              <div className="absolute -bottom-2 left-6 w-4 h-0.5 bg-gray-600 origin-left animate-rod"></div>
              <div className="absolute -bottom-2 right-6 w-4 h-0.5 bg-gray-600 origin-right animate-rod" style={{animationDelay: '0.5s'}}></div>
            </div>
            
            {/* Passenger cars with  details */}
            {[...Array(2)].map((_, index) => (
              <div key={index} className="relative h-16 w-20 bg-gradient-to-b from-primary/80 to-primary rounded-sm flex-shrink-0 mr-2 border border-primary/80 shadow-md overflow-hidden">
                {/* Car body details */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 right-0 h-1/4 bg-white/10"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-black/10"></div>
                </div>
                
                {/* Car stripe */}
                <div className="absolute top-1/3 left-0 right-0 h-1 bg-primary-foreground/20"></div>
                
                {/* Windows with passengers */}
                <div className="flex justify-center gap-2 pt-3 px-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-sky-50 to-sky-200 rounded-sm border border-primary/30 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-white/30 rounded-br-sm"></div>
                    {/* Passenger silhouette */}
                    {Math.random() > 0.3 && (
                      <div className="absolute bottom-0.5 left-1 w-2 h-2 bg-gray-700/50 rounded-full"></div>
                    )}
                  </div>
                  <div className="w-4 h-4 bg-gradient-to-br from-sky-50 to-sky-200 rounded-sm border border-primary/30 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-white/30 rounded-br-sm"></div>
                    {/* Passenger silhouette */}
                    {Math.random() > 0.3 && (
                      <div className="absolute bottom-0.5 left-1 w-2 h-2 bg-gray-700/50 rounded-full"></div>
                    )}
                  </div>
                </div>
                
                {/* Car number with improved styling */}
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <span className="text-[8px] font-medium text-primary-foreground/90 px-1.5 py-0.5 bg-primary-foreground/10 rounded-full">{index + 1}</span>
                </div>
                
                {/* Wheels with improved details */}
                <div ref={el => wheelsRef.current[2 + index*2] = el} className="absolute -bottom-4 left-3 w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-gray-600 shadow-inner overflow-hidden">
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gray-500/30 border-r-gray-500/30"></div>
                  <div className="w-3 h-0.5 bg-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="w-0.5 h-3 bg-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                </div>
                <div ref={el => wheelsRef.current[3 + index*2] = el} className="absolute -bottom-4 right-3 w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-gray-600 shadow-inner overflow-hidden">
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gray-500/30 border-r-gray-500/30"></div>
                  <div className="w-3 h-0.5 bg-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="w-0.5 h-3 bg-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                </div>
                
                {/* Connecting elements with improved design */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-1 bg-gray-700 rounded-full shadow-sm"></div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-1 bg-gray-700 rounded-full shadow-sm"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Railway signal with improved traffic light */}
      <div 
        ref={trafficLightRef}
        className="absolute bottom-40 right-32 w-4 h-32 bg-gradient-to-b from-gray-600 to-gray-800 hidden md:block rounded-sm shadow-md"
      >
        {/* Signal arm */}
        <div className="absolute -left-6 top-6 w-6 h-2 bg-gray-700 rounded-sm shadow-sm"></div>
        
        {/* Signal box */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-16 bg-gradient-to-b from-gray-700 to-gray-900 flex flex-col gap-2 items-center justify-center rounded-md border border-gray-600 shadow-lg p-1.5">
          {/* Red light with glow effect */}
          <div className="relative w-5 h-5 rounded-full bg-red-900 border border-red-950 flex items-center justify-center shadow-inner">
            <div 
              ref={redLightRef}
              className="w-3 h-3 rounded-full bg-red-500 transition-all duration-300 opacity-40"
            ></div>
          </div>
          
          {/* Yellow light with glow effect */}
          <div className="relative w-5 h-5 rounded-full bg-yellow-900 border border-yellow-950 flex items-center justify-center shadow-inner">
            <div 
              ref={yellowLightRef}
              className="w-3 h-3 rounded-full bg-yellow-500 transition-all duration-300 opacity-40"
            ></div>
          </div>
          
          {/* Green light with glow effect */}
          <div className="relative w-5 h-5 rounded-full bg-green-900 border border-green-950 flex items-center justify-center shadow-inner">
            <div 
              ref={greenLightRef}
              className="w-3 h-3 rounded-full bg-green-500 transition-all duration-300 opacity-40"
            ></div>
          </div>
        </div>
        
        {/* Signal base */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-gray-800 rounded-md"></div>
        
        {/* Signal wires */}
        <div className="absolute -right-8 top-4 w-8 h-0.5 bg-gray-500"></div>
        <div className="absolute -right-8 top-8 w-8 h-0.5 bg-gray-500"></div>
      </div>

      {/* Add a small railway crossing sign nearby */}
      <div className="absolute bottom-32 right-48 hidden md:block">
        <div className="relative h-24 w-1.5 bg-gray-700">
          <div className="absolute -top-2 -left-6 w-14 h-8 bg-yellow-400 border-2 border-black rounded-sm flex items-center justify-center">
            <div className="text-[8px] font-bold text-black">RAILWAY</div>
          </div>
          <div className="absolute top-6 -left-6 w-14 h-8 bg-yellow-400 border-2 border-black rounded-sm flex items-center justify-center">
            <div className="text-[8px] font-bold text-black">CROSSING</div>
          </div>
        </div>
      </div>

      {/* Cloud decorations */}
      <div className="absolute top-20 left-10 w-32 h-16 bg-white rounded-full opacity-30 animate-float" style={{animationDelay: "0s"}}></div>
      <div className="absolute top-40 right-20 w-24 h-12 bg-white rounded-full opacity-20 animate-float" style={{animationDelay: "2s"}}></div>
      <div className="absolute bottom-40 left-1/4 w-28 h-14 bg-white rounded-full opacity-25 animate-float" style={{animationDelay: "1s"}}></div>

      {/* Main content */}
      <div className="relative container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-6 backdrop-blur-sm">
            <div className="relative mr-2">
              <span className="pulse-soft h-2 w-2 rounded-full bg-primary"></span>
              <Sparkles className="absolute -top-1.5 -left-1.5 h-3.5 w-3.5 text-primary animate-sparkle" />
            </div>
            <TypewriterEffect 
              words={["Seamless Train Booking Experience"]}
              className="text-sm"
            />
          </div>

          {/* Heading with Text Generate Effect */}
          <TextGenerateEffect
            words="Travel Smarter with Modern Booking"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
          />

          {/* Subtitle */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto opacity-90 backdrop-blur-sm">
            Experience a reimagined train booking platform with intuitive design, real-time tracking, and seamless journey planning.
          </p>

          {/* Booking Form Card with Glassmorphism */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-8 border border-white/20 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {/* ... existing form fields ... */}
            </div>
          </div>

          {/* Popular Routes with Hover Card Effect */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { icon: <MapPin size={12} />, label: "Delhi - Mumbai" },
              { icon: <Star size={12} />, label: "Popular Routes" },
              { icon: <MapPin size={12} />, label: "Bangalore - Chennai" },
              { icon: <TrainTrack size={12} />, label: "Kolkata - Delhi" }
            ].map((item, index) => (
              <div 
                key={index}
                className="group relative flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <span className="mr-2 text-primary group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                {item.label}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            ))}
          </div>

          {/* CTA Buttons with Animated Gradients */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-train">
              <Button 
                size="lg" 
                className="rounded-full text-sm px-6 py-6 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary transition-all duration-300 group"
              >
                Explore More
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/track-train">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full text-sm px-6 py-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                  Track Train
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
