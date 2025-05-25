import React from 'react';
import { processStyledProps } from './processStyledProps';

/**
 * HOC to automatically process styled props
 */
export function styled<P extends Record<string, unknown>>(
  Component: React.ComponentType<P> | keyof React.JSX.IntrinsicElements
) {
  return React.forwardRef<unknown, P>((props, ref) => {
    const processedProps = processStyledProps(props);
    
    if (typeof Component === 'string') {
      return React.createElement(Component, { ...processedProps, ref });
    }
    
    return React.createElement(Component, { ...processedProps as P, ref });
  });
} 