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
}

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  className = '',
  once = true
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            setHasBeenVisible(true);
          }
        } else if (!once && !hasBeenVisible) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, once, hasBeenVisible]);

  const getTransformClass = () => {
    if (hasBeenVisible && once) return '';
    
    const baseClasses = 'transition-all ease-out';
    const durationClass = `duration-${duration}`;
    
    if (isVisible || hasBeenVisible) {
      return `${baseClasses} ${durationClass} opacity-100 translate-x-0 translate-y-0 scale-100`;
    }

    switch (direction) {
      case 'up':
        return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
      case 'down':
        return `${baseClasses} ${durationClass} opacity-0 -translate-y-8`;
      case 'left':
        return `${baseClasses} ${durationClass} opacity-0 translate-x-8`;
      case 'right':
        return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`;
      case 'scale':
        return `${baseClasses} ${durationClass} opacity-0 scale-95`;
      case 'fade':
        return `${baseClasses} ${durationClass} opacity-0`;
      default:
        return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getTransformClass()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;