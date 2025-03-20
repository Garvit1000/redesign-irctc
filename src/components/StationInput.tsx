import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Check, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StationInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  className?: string;
  error?: string;
}

const StationInput: React.FC<StationInputProps> = ({
  label,
  placeholder = 'Enter station name or code',
  value,
  onChange,
  suggestions,
  className,
  error
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update input value when prop value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Memoize filtered suggestions
  const filteredSuggestions = useMemo(() => {
    if (!inputValue) return [];
    
    return suggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice(0, 5);
  }, [inputValue, suggestions]);

  // Update suggestion visibility
  useEffect(() => {
    setShowSuggestions(isFocused && filteredSuggestions.length > 0);
  }, [filteredSuggestions.length, isFocused]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Memoize handlers
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  }, [onChange]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInputValue(suggestion);
    onChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  }, [onChange]);

  const handleClear = useCallback(() => {
    setInputValue('');
    onChange('');
    inputRef.current?.focus();
  }, [onChange]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setShowSuggestions(inputValue.length > 0 && filteredSuggestions.length > 0);
  }, [filteredSuggestions.length, inputValue.length]);

  return (
    <div className={cn("relative", className)}>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </label>
      
      <div className="relative">
        <div className={cn(
          "flex items-center border rounded-lg bg-white transition-all duration-200 overflow-hidden",
          isFocused ? "border-primary shadow-sm ring-1 ring-primary/20" : "border-input",
          error ? "border-destructive ring-1 ring-destructive/20" : ""
        )}>
          <div className="pl-3 text-muted-foreground">
            <MapPin className="h-5 w-5" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="flex-1 py-3 px-3 bg-transparent placeholder:text-muted-foreground focus:outline-none text-sm"
          />
          
          {inputValue && (
            <button 
              type="button"
              onClick={handleClear}
              className="pr-3 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {error && (
          <p className="text-xs text-destructive mt-1">{error}</p>
        )}
      </div>
      
      {/* Suggestions list */}
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-border py-1 animate-scale-in"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left px-3 py-2.5 hover:bg-muted text-sm flex items-center justify-between group transition-colors"
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseDown={(e) => e.preventDefault()} // Prevent input blur
            >
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{suggestion}</span>
              </div>
              <Check className="h-4 w-4 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(StationInput);
