import React from 'react';
import { styled } from './createStyled';

// Create a proxy that generates styled components on demand
// This allows usage like: s.div, s.button, s.customElement, etc.
export const s = new Proxy({} as Record<string, ReturnType<typeof styled>>, {
  get(_, element: string) {
    return styled(element as keyof React.JSX.IntrinsicElements);
  }
}) as {
  [K in keyof React.JSX.IntrinsicElements]: ReturnType<typeof styled>;
}; 