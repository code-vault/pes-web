"use client";
import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
  disabled?: boolean; // Add option to disable animations
}

// Create a global observer to reduce the number of observers
let globalObserver: IntersectionObserver | null = null;
const observedElements = new Map<Element, () => void>();

const createGlobalObserver = () => {
  if (typeof window === 'undefined') return null;
  
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const callback = observedElements.get(entry.target);
        if (callback && entry.isIntersecting) {
          callback();
          // Clean up after animation triggers
          globalObserver?.unobserve(entry.target);
          observedElements.delete(entry.target);
        }
      });
    },
    { 
      threshold: 0.1,
      rootMargin: '50px 0px' // Start animation slightly before element is visible
    }
  );
};

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 600, // Reduced from 800ms
  threshold = 0.1,
  className = '',
  once = true,
  disabled = false
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || disabled) {
      setShouldAnimate(false);
      setIsVisible(true);
      return;
    }

    if (!globalObserver) {
      globalObserver = createGlobalObserver();
    }

    const currentElement = elementRef.current;
    if (!currentElement || !globalObserver) return;

    const handleIntersection = () => {
      // Add slight delay for staggered animations
      setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    observedElements.set(currentElement, handleIntersection);
    globalObserver.observe(currentElement);

    return () => {
      if (currentElement && globalObserver) {
        globalObserver.unobserve(currentElement);
        observedElements.delete(currentElement);
      }
    };
  }, [delay, disabled]);

  const getAnimationClasses = () => {
    if (!shouldAnimate) return '';
    
    const baseClasses = 'transition-all ease-out';
    const durationClass = duration <= 300 ? 'duration-300' : 
                         duration <= 500 ? 'duration-500' : 
                         duration <= 700 ? 'duration-700' : 'duration-1000';
    
    if (isVisible) {
      return `${baseClasses} ${durationClass} opacity-100 translate-x-0 translate-y-0 scale-100`;
    }

    switch (direction) {
      case 'up':
        return `${baseClasses} ${durationClass} opacity-0 translate-y-4`; // Reduced from 8
      case 'down':
        return `${baseClasses} ${durationClass} opacity-0 -translate-y-4`;
      case 'left':
        return `${baseClasses} ${durationClass} opacity-0 translate-x-4`;
      case 'right':
        return `${baseClasses} ${durationClass} opacity-0 -translate-x-4`;
      case 'scale':
        return `${baseClasses} ${durationClass} opacity-0 scale-98`; // Reduced from scale-95
      case 'fade':
        return `${baseClasses} ${durationClass} opacity-0`;
      default:
        return `${baseClasses} ${durationClass} opacity-0 translate-y-4`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;