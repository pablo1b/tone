import { attributeSet } from './design-system';

/**
 * Converts boolean props to HTML attributes for CSS attribute selectors
 * Uses a Set for O(1) lookup performance
 */
export function processStyledProps(props: Record<string, unknown>) {
  const processed: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(props)) {
    if (attributeSet.has(key) && value === true) {
      // Convert boolean prop to empty string for CSS attribute selectors
      processed[key] = '';
    } else if (!attributeSet.has(key)) {
      // Pass through non-design-system props unchanged
      processed[key] = value;
    }
    // Implicitly: if it's a design system prop but false, we skip it
  }
  
  return processed;
} 