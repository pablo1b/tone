// Single source of truth for design system attributes
export const designSystem = {
  layout: ['flex', 'flexCol', 'flexRow', 'flexCenter', 'flexBetween'],
  spacing: [
    'gap1', 'gap2', 'gap3', 'gap4', 'gap5', 'gap6',
    'p1', 'p2', 'p3', 'p4', 'p5', 'p6',
    'm1', 'm2', 'm3', 'm4', 'm5', 'm6'
  ],
  text: [
    'textCenter', 'textLeft', 'textRight',
    'textBold', 'textMedium', 'textNormal',
    'textMuted', 'textSubtle'
  ],
  borders: [
    'rounded', 'roundedSm', 'roundedLg', 'roundedFull',
    'bordered', 'borderless'
  ],
  shadows: ['shadowSm', 'shadowMd', 'shadowLg'],
  components: ['panel', 'card', 'elevated'],
  sizes: ['small', 'large'],
  variants: ['muted', 'subtle', 'inline'],
  buttons: ['primary', 'secondary', 'ghost', 'danger'],
  lists: ['unstyled', 'spaced'],
  states: ['error', 'disabled', 'loading']
} as const;

// Flatten all attributes into a single array
export const allAttributes = Object.values(designSystem).flat();

// Create a Set for O(1) lookup performance
export const attributeSet = new Set<string>(allAttributes);

// Type for all design system attributes
export type DesignSystemAttribute = typeof allAttributes[number];

// Type for design system props (all optional booleans)
export type DesignSystemProps = {
  [K in DesignSystemAttribute]?: boolean;
}; 