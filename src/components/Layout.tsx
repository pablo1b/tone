import React from 'react';
import { theme } from '../theme/';

type FlexDirection = 'row' | 'column';
type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around';
type AlignItems = 'start' | 'center' | 'end' | 'stretch';
type Gap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Padding = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface BaseLayoutProps {
  flex?: boolean;
  flexDirection?: FlexDirection;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  gap?: Gap;
  padding?: Padding;
  bordered?: boolean;
  panel?: boolean;
  card?: boolean;
  elevated?: boolean;
}

const getLayoutStyles = (props: BaseLayoutProps) => {
  const {
    flex,
    flexDirection,
    justifyContent,
    alignItems,
    gap = 'sm', // Default gap
    padding = 'sm', // Default padding
    bordered,
    panel,
    card,
    elevated,
  } = props;

  const baseStyles: React.CSSProperties = {};

  // Always apply default padding
  baseStyles.padding = theme.spacing[padding];

  if (flex) {
    baseStyles.display = 'flex';
    if (flexDirection) {
      baseStyles.flexDirection = flexDirection;
    }
    if (justifyContent) {
      const justifyMap = {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        between: 'space-between',
        around: 'space-around',
      };
      baseStyles.justifyContent = justifyMap[justifyContent];
    }
    if (alignItems) {
      const alignMap = {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        stretch: 'stretch',
      };
      baseStyles.alignItems = alignMap[alignItems];
    }
    // Always apply default gap when flex is true
    baseStyles.gap = theme.spacing[gap];
  }

  if (bordered) {
    baseStyles.border = `1px solid ${theme.colors.border}`;
    baseStyles.borderRadius = theme.borderRadius.md;
  }

  if (panel) {
    baseStyles.backgroundColor = theme.colors.surface;
    baseStyles.border = `1px solid ${theme.colors.border}`;
    baseStyles.borderRadius = theme.borderRadius.lg;
  }

  if (card) {
    baseStyles.backgroundColor = theme.colors.background;
    baseStyles.border = `1px solid ${theme.colors.borderLight}`;
    baseStyles.borderRadius = theme.borderRadius.md;
    baseStyles.padding = theme.spacing.md;
  }

  if (elevated) {
    baseStyles.boxShadow = theme.shadows.md;
  }

  return baseStyles;
};

// Main Component
interface MainProps extends BaseLayoutProps, React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ 
  style, 
  children, 
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  padding,
  bordered,
  panel,
  card,
  elevated,
  ...htmlProps 
}) => {
  const layoutProps = { flex, flexDirection, justifyContent, alignItems, gap, padding, bordered, panel, card, elevated };
  const layoutStyles = getLayoutStyles(layoutProps);
  
  return (
    <main style={{ height: `calc(100vh - calc(${theme.spacing[padding || 'sm']} * 2))`, ...layoutStyles, ...style }} {...htmlProps}>
      {children}
    </main>
  );
};

// Section Component
interface SectionProps extends BaseLayoutProps, React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ 
  style, 
  children, 
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  padding,
  bordered,
  panel,
  card,
  elevated,
  ...htmlProps 
}) => {
  const layoutProps = { flex, flexDirection, justifyContent, alignItems, gap, padding, bordered, panel, card, elevated };
  const layoutStyles = getLayoutStyles(layoutProps);
  
  return (
    <section style={{ height: '100%', ...layoutStyles, ...style }} {...htmlProps}>
      {children}
    </section>
  );
};

// Header Component
interface HeaderProps extends BaseLayoutProps, React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ 
  style, 
  children, 
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  padding,
  bordered,
  panel,
  card,
  elevated,
  ...htmlProps 
}) => {
  const layoutProps = { flex, flexDirection, justifyContent, alignItems, gap, padding, bordered, panel, card, elevated };
  const layoutStyles = getLayoutStyles(layoutProps);
  
  return (
    <header style={{ ...layoutStyles, ...style }} {...htmlProps}>
      {children}
    </header>
  );
};

// Footer Component
interface FooterProps extends BaseLayoutProps, React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ 
  style, 
  children, 
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  padding,
  bordered,
  panel,
  card,
  elevated,
  ...htmlProps 
}) => {
  const layoutProps = { flex, flexDirection, justifyContent, alignItems, gap, padding, bordered, panel, card, elevated };
  const layoutStyles = getLayoutStyles(layoutProps);
  
  return (
    <footer style={{ ...layoutStyles, ...style }} {...htmlProps}>
      {children}
    </footer>
  );
};

// Article Component
interface ArticleProps extends BaseLayoutProps, React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Article: React.FC<ArticleProps> = ({ 
  style, 
  children, 
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  padding,
  bordered,
  panel,
  card,
  elevated,
  ...htmlProps 
}) => {
  const layoutProps = { flex, flexDirection, justifyContent, alignItems, gap, padding, bordered, panel, card, elevated };
  const layoutStyles = getLayoutStyles(layoutProps);
  
  return (
    <article style={{ width: '100%', ...layoutStyles, ...style }} {...htmlProps}>
      {children}
    </article>
  );
};

// Div Component
interface DivProps extends BaseLayoutProps, React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Div: React.FC<DivProps> = ({ 
  style, 
  children, 
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  padding,
  bordered,
  panel,
  card,
  elevated,
  ...htmlProps 
}) => {
  const layoutProps = { flex, flexDirection, justifyContent, alignItems, gap, padding, bordered, panel, card, elevated };
  const layoutStyles = getLayoutStyles(layoutProps);
  
  return (
    <div style={{ ...layoutStyles, ...style }} {...htmlProps}>
      {children}
    </div>
  );
};

// Form Component
interface FormProps extends BaseLayoutProps, React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({ 
  style, 
  children, 
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  padding,
  bordered,
  panel,
  card,
  elevated,
  ...htmlProps 
}) => {
  const layoutProps = { flex, flexDirection, justifyContent, alignItems, gap, padding, bordered, panel, card, elevated };
  const layoutStyles = getLayoutStyles(layoutProps);
  
  return (
    <form style={{ ...layoutStyles, ...style }} {...htmlProps}>
      {children}
    </form>
  );
};

// Fieldset Component
interface FieldsetProps extends BaseLayoutProps, React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  borderless?: boolean;
  children: React.ReactNode;
}

export const Fieldset: React.FC<FieldsetProps> = ({ 
  borderless = false, 
  style, 
  children, 
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  padding,
  bordered,
  panel,
  card,
  elevated,
  ...htmlProps 
}) => {
  const layoutProps = { flex, flexDirection, justifyContent, alignItems, gap, padding, bordered, panel, card, elevated };
  const layoutStyles = getLayoutStyles(layoutProps);
  
  const fieldsetStyles = borderless ? {
    border: 'none',
    padding: 0,
    margin: 0,
  } : {
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  };
  
  return (
    <fieldset style={{ ...layoutStyles, ...fieldsetStyles, ...style }} {...htmlProps}>
      {children}
    </fieldset>
  );
}; 