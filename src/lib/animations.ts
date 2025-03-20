import { cn } from "@/lib/utils";

type AnimationProps = {
  delay?: number;
  duration?: number;
  className?: string;
};

export const fadeIn = ({ delay = 0, duration = 0.4, className = "" }: AnimationProps = {}) => {
  return cn(
    "animate-fade-in opacity-0",
    className
  );
};

export const fadeInUp = ({ delay = 0, duration = 0.4, className = "" }: AnimationProps = {}) => {
  return cn(
    "animate-fade-in-up [animation-fill-mode:forwards] opacity-0",
    className
  );
};

export const fadeInDown = ({ delay = 0, duration = 0.4, className = "" }: AnimationProps = {}) => {
  return cn(
    "animate-fade-in-down opacity-0",
    className
  );
};

export const slideInLeft = ({ delay = 0, duration = 0.3, className = "" }: AnimationProps = {}) => {
  return cn(
    "animate-slide-in-left",
    className
  );
};

export const slideInRight = ({ delay = 0, duration = 0.3, className = "" }: AnimationProps = {}) => {
  return cn(
    "animate-slide-in-right",
    className
  );
};

export const scaleIn = ({ delay = 0, duration = 0.3, className = "" }: AnimationProps = {}) => {
  return cn(
    "animate-scale-in",
    className
  );
};

export const floatingAnimation = (className: string = "") => {
  return cn("animate-float", className);
};

export const pulseAnimation = (className: string = "") => {
  return cn("animate-pulse-soft", className);
};

export const bounceAnimation = (className: string = "") => {
  return cn("animate-bounce-soft", className);
};

export const sparkleAnimation = (className: string = "") => {
  return cn("animate-sparkle", className);
};

export const pageTransition = (className: string = "") => {
  return cn("animate-page-transition", className);
};

export const staggeredChildren = (className: string = "") => {
  return cn("staggered-animation", className);
};

export const rotateAnimation = (className: string = "") => {
  return cn("animate-rotate", className);
};

export const blurInAnimation = (className: string = "") => {
  return cn("animate-blur-in", className);
};

export const trainMotionAnimation = (className: string = "") => {
  return cn("animate-train-motion", className);
};

export const smokeAnimation = (className: string = "") => {
  return cn("animate-smoke", className);
};

export const railwayTrackAnimation = (className: string = "") => {
  return cn("animate-railway-track", className);
};

export const signalLightAnimation = (className: string = "") => {
  return cn("animate-signal-light", className);
};

export const wheelRotation = (className: string = "") => {
  return cn("animate-wheel-rotation", className);
};

export const glowPulse = (className: string = "") => {
  return cn("animate-glow-pulse", className);
};

export const shimmerEffect = (className: string = "") => {
  return cn("animate-shimmer-effect", className);
};

export const gradientFlow = (className: string = "") => {
  return cn("animate-gradient-flow", className);
};

export const popIn = (className: string = "") => {
  return cn("animate-pop-in", className);
};

export const typewriter = (className: string = "") => {
  return cn("animate-typewriter", className);
};

export const colorCycle = (className: string = "") => {
  return cn("animate-color-cycle", className);
};

export const tiltEffect = (className: string = "") => {
  return cn("hover:animate-tilt", className);
};

export const elevateEffect = (className: string = "") => {
  return cn("hover:animate-elevate", className);
};

export const tracksScrolling = (className: string = "") => {
  return cn("animate-tracks-scrolling", className);
};

export const waveMotion = (className: string = "") => {
  return cn("animate-wave-motion", className);
};

export const smoothAppear = (className: string = "") => {
  return cn("opacity-0 animate-smooth-appear", className);
};

export const buttonPop = (className: string = "") => {
  return cn("hover:animate-button-pop active:scale-95 transition-transform", className);
};

export const cardRise = (className: string = "") => {
  return cn("transition-all duration-300 hover:-translate-y-2 hover:shadow-lg", className);
};

export const contentFocus = (className: string = "") => {
  return cn("transition-all duration-200 hover:brightness-105 hover:contrast-105", className);
};

export const polishedEntrance = (className: string = "") => {
  return cn("animate-polished-entrance", className);
};

export const subtlePresence = (className: string = "") => {
  return cn("opacity-0 animate-subtle-presence", className);
};

export const shimmerHighlight = (className: string = "") => {
  return cn("relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent", className);
};

// Enhanced animations for UI polish
export const softFadeIn = (className: string = "") => {
  return cn("opacity-0 animate-soft-fade-in", className);
};

export const smoothScale = (className: string = "") => {
  return cn("scale-95 opacity-0 animate-smooth-scale", className);
};

export const staggeredFadeIn = (className: string = "", index: number = 0) => {
  return cn("opacity-0 animate-fade-in", className, {
    "animation-delay-100": index === 1,
    "animation-delay-200": index === 2,
    "animation-delay-300": index === 3,
    "animation-delay-400": index === 4,
    "animation-delay-500": index === 5,
  });
};

export const hoverGlow = (className: string = "") => {
  return cn("transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,120,255,0.15)]", className);
};

export const subtleHoverLift = (className: string = "") => {
  return cn("transition-all duration-300 hover:-translate-y-1", className);
};

export const focusRing = (className: string = "") => {
  return cn("focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background transition-shadow", className);
};

export const pulseHighlight = (className: string = "") => {
  return cn("animate-pulse-highlight", className);
};

export const gradientShimmer = (className: string = "") => {
  return cn("bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%] animate-gradient-shimmer", className);
};

export const smoothReveal = (className: string = "") => {
  return cn("opacity-0 translate-y-4 animate-smooth-reveal", className);
};
