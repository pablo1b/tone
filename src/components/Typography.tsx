import React from 'react';
import { theme } from '../theme';

type TextSize = 'small' | 'medium' | 'large';
type TextVariant = 'default' | 'muted' | 'subtle' | 'bold';

interface BaseTextProps {
  size?: TextSize;
  variant?: TextVariant;
}

const getTextStyles = (size: TextSize, variant: TextVariant) => {
  const sizeStyles = {
    small: { fontSize: theme.typography.fontSize.sm },
    medium: { fontSize: theme.typography.fontSize.base },
    large: { fontSize: theme.typography.fontSize.lg },
  };

  const variantStyles = {
    default: { color: theme.colors.text },
    muted: { color: theme.colors.textMuted },
    subtle: { color: theme.colors.textSubtle },
    bold: { fontWeight: theme.typography.fontWeight.bold },
  };

  return {
    fontFamily: theme.typography.fontFamily.sans,
    lineHeight: theme.typography.lineHeight.normal,
    margin: 0,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};

// Heading Components
interface HeadingProps extends BaseTextProps, React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const H1: React.FC<HeadingProps> = ({ size = 'large', variant = 'default', style, children, ...props }) => {
  
  return (
    <h1 style={{ 
      ...getTextStyles(size, variant), 
      fontSize: theme.typography.fontSize['4xl'],
      fontWeight: theme.typography.fontWeight.bold,
      ...style 
    }} {...props}>
      {children}
    </h1>
  );
};

export const H2: React.FC<HeadingProps> = ({ size = 'large', variant = 'default', style, children, ...props }) => {
  
  return (
    <h2 style={{ 
      ...getTextStyles(size, variant), 
      fontSize: theme.typography.fontSize['3xl'],
      fontWeight: theme.typography.fontWeight.bold,
      ...style 
    }} {...props}>
      {children}
    </h2>
  );
};

export const H3: React.FC<HeadingProps> = ({ size = 'medium', variant = 'default', style, children, ...props }) => {
  
  return (
    <h3 style={{ 
      ...getTextStyles(size, variant), 
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.semibold,
      ...style 
    }} {...props}>
      {children}
    </h3>
  );
};

export const H4: React.FC<HeadingProps> = ({ size = 'medium', variant = 'default', style, children, ...props }) => {
  
  return (
    <h4 style={{ 
      ...getTextStyles(size, variant), 
      fontSize: theme.typography.fontSize.xl,
      fontWeight: theme.typography.fontWeight.semibold,
      ...style 
    }} {...props}>
      {children}
    </h4>
  );
};

export const H5: React.FC<HeadingProps> = ({ size = 'medium', variant = 'default', style, children, ...props }) => {
  
  return (
    <h5 style={{ 
      ...getTextStyles(size, variant), 
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.medium,
      ...style 
    }} {...props}>
      {children}
    </h5>
  );
};

export const H6: React.FC<HeadingProps> = ({ size = 'small', variant = 'default', style, children, ...props }) => {
  
  return (
    <h6 style={{ 
      ...getTextStyles(size, variant), 
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium,
      ...style 
    }} {...props}>
      {children}
    </h6>
  );
};

// Paragraph Component
interface ParagraphProps extends BaseTextProps, React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const P: React.FC<ParagraphProps> = ({ size = 'medium', variant = 'default', style, children, ...props }) => {
  
  return (
    <p style={{ 
      ...getTextStyles(size, variant),
      marginBottom: theme.spacing.md,
      ...style 
    }} {...props}>
      {children}
    </p>
  );
};

// Span Component
interface SpanProps extends BaseTextProps, React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const Span: React.FC<SpanProps> = ({ size = 'medium', variant = 'default', style, children, ...props }) => {
  
  return (
    <span style={{ 
      ...getTextStyles(size, variant),
      ...style 
    }} {...props}>
      {children}
    </span>
  );
};

// Time Component
interface TimeProps extends BaseTextProps, React.TimeHTMLAttributes<HTMLTimeElement> {
  children: React.ReactNode;
}

export const Time: React.FC<TimeProps> = ({ size = 'small', variant = 'subtle', style, children, ...props }) => {
  
  return (
    <time style={{ 
      ...getTextStyles(size, variant),
      ...style 
    }} {...props}>
      {children}
    </time>
  );
};

// Code Components
interface CodeProps extends BaseTextProps, React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  children: React.ReactNode;
}

export const Code: React.FC<CodeProps> = ({ inline = false, style, children, ...props }) => {
  
  const baseStyles = {
    fontFamily: theme.typography.fontFamily.mono,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSize.sm,
  };

  const inlineStyles = inline ? {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    display: 'inline',
  } : {};

  return (
    <code style={{ 
      ...baseStyles,
      ...inlineStyles,
      ...style 
    }} {...props}>
      {children}
    </code>
  );
};

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
}

export const Pre: React.FC<PreProps> = ({ style, children, ...props }) => {
  
  return (
    <pre style={{ 
      fontFamily: theme.typography.fontFamily.mono,
      backgroundColor: theme.colors.surface,
      color: theme.colors.text,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      border: `1px solid ${theme.colors.border}`,
      overflow: 'auto',
      fontSize: theme.typography.fontSize.sm,
      lineHeight: theme.typography.lineHeight.relaxed,
      margin: 0,
      ...style 
    }} {...props}>
      {children}
    </pre>
  );
}; 