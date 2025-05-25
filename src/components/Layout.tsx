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
    gap,
    padding,
    bordered,
    panel,
    card,
    elevated,
  } = props;

  const baseStyles: React.CSSProperties = {};

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
    if (gap) {
      baseStyles.gap = theme.spacing[gap];
    }
  }

  if (padding) {
    baseStyles.padding = theme.spacing[padding];
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

export const Main: React.FC<MainProps> = ({ style, children, ...props }) => {
  
  const layoutStyles = getLayoutStyles(props);
  
  return (
    <main style={{ ...layoutStyles, ...style }} {...props}>
      {children}
    </main>
  );
};

// Section Component
interface SectionProps extends BaseLayoutProps, React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ style, children, ...props }) => {
  
  const layoutStyles = getLayoutStyles(props);
  
  return (
    <section style={{ ...layoutStyles, ...style }} {...props}>
      {children}
    </section>
  );
};

// Header Component
interface HeaderProps extends BaseLayoutProps, React.HTMLAttributes<HTMLElement> {}

export const Header: React.FC<HeaderProps> = ({ style, children, ...props }) => {
  
  const layoutStyles = getLayoutStyles(props);
  
  return (
    <header style={{ ...layoutStyles, ...style }} {...props}>
      {children}
    </header>
  );
};

// Footer Component
interface FooterProps extends BaseLayoutProps, React.HTMLAttributes<HTMLElement> {}

export const Footer: React.FC<FooterProps> = ({ style, children, ...props }) => {
  
  const layoutStyles = getLayoutStyles(props);
  
  return (
    <footer style={{ ...layoutStyles, ...style }} {...props}>
      {children}
    </footer>
  );
};

// Article Component
interface ArticleProps extends BaseLayoutProps, React.HTMLAttributes<HTMLElement> {}

export const Article: React.FC<ArticleProps> = ({ style, children, ...props }) => {
  
  const layoutStyles = getLayoutStyles(props);
  
  return (
    <article style={{ ...layoutStyles, ...style }} {...props}>
      {children}
    </article>
  );
};

// Div Component
interface DivProps extends BaseLayoutProps, React.HTMLAttributes<HTMLDivElement> {}

export const Div: React.FC<DivProps> = ({ style, children, ...props }) => {
  
  const layoutStyles = getLayoutStyles(props);
  
  return (
    <div style={{ ...layoutStyles, ...style }} {...props}>
      {children}
    </div>
  );
};

// Form Component
interface FormProps extends BaseLayoutProps, React.FormHTMLAttributes<HTMLFormElement> {}

export const Form: React.FC<FormProps> = ({ style, children, ...props }) => {
  
  const layoutStyles = getLayoutStyles(props);
  
  return (
    <form style={{ ...layoutStyles, ...style }} {...props}>
      {children}
    </form>
  );
};

// Fieldset Component
interface FieldsetProps extends BaseLayoutProps, React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  borderless?: boolean;
}

export const Fieldset: React.FC<FieldsetProps> = ({ borderless = false, style, children, ...props }) => {
  
  const layoutStyles = getLayoutStyles(props);
  
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
    <fieldset style={{ ...layoutStyles, ...fieldsetStyles, ...style }} {...props}>
      {children}
    </fieldset>
  );
}; 