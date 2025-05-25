import 'react';

declare module 'react' {
  // Design System Attributes that can be used on any HTML element
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    // Layout & Display
    flex?: boolean;
    flexCol?: boolean;
    flexRow?: boolean;
    flexCenter?: boolean;
    flexBetween?: boolean;
    
    // Spacing
    gap1?: boolean;
    gap2?: boolean;
    gap3?: boolean;
    gap4?: boolean;
    gap5?: boolean;
    gap6?: boolean;
    
    p1?: boolean;
    p2?: boolean;
    p3?: boolean;
    p4?: boolean;
    p5?: boolean;
    p6?: boolean;
    
    m1?: boolean;
    m2?: boolean;
    m3?: boolean;
    m4?: boolean;
    m5?: boolean;
    m6?: boolean;
    
    // Text Utilities
    textCenter?: boolean;
    textLeft?: boolean;
    textRight?: boolean;
    textBold?: boolean;
    textMedium?: boolean;
    textNormal?: boolean;
    textMuted?: boolean;
    textSubtle?: boolean;
    
    // Border & Shape
    rounded?: boolean;
    roundedSm?: boolean;
    roundedLg?: boolean;
    roundedFull?: boolean;
    bordered?: boolean;
    borderless?: boolean;
    
    // Shadow
    shadowSm?: boolean;
    shadowMd?: boolean;
    shadowLg?: boolean;
    
    // Layout Components
    panel?: boolean;
    card?: boolean;
    elevated?: boolean;
    
    // Typography Sizes & Variants
    small?: boolean;
    large?: boolean;
    muted?: boolean;
    subtle?: boolean;
    inline?: boolean;
    
    // Button Variants
    primary?: boolean;
    secondary?: boolean;
    ghost?: boolean;
    danger?: boolean;
    
    // List Utilities
    unstyled?: boolean;
    spaced?: boolean;
    
    // Form States
    error?: boolean;
    disabled?: boolean;
    loading?: boolean;
  }
}