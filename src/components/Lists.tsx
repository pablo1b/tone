import React from 'react';
import { theme } from '../theme';

type ListStyle = 'default' | 'unstyled';
type Gap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface BaseListProps {
  listStyle?: ListStyle;
  gap?: Gap;
  spaced?: boolean;
}

// Unordered List Component
interface UlProps extends BaseListProps, React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export const Ul: React.FC<UlProps> = ({ 
  listStyle = 'default', 
  gap,
  spaced = false,
  style, 
  children, 
  ...props 
}) => {
  
  
  const baseStyles: React.CSSProperties = {
    margin: 0,
    padding: listStyle === 'unstyled' ? 0 : `0 0 0 ${theme.spacing.lg}`,
    listStyleType: listStyle === 'unstyled' ? 'none' : 'disc',
  };

  if (gap) {
    baseStyles.display = 'flex';
    baseStyles.flexDirection = 'column';
    baseStyles.gap = theme.spacing[gap];
    baseStyles.listStyleType = 'none';
    baseStyles.padding = 0;
  }

  if (spaced) {
    baseStyles.lineHeight = theme.typography.lineHeight.relaxed;
  }

  return (
    <ul style={{ ...baseStyles, ...style }} {...props}>
      {children}
    </ul>
  );
};

// Ordered List Component
interface OlProps extends BaseListProps, React.HTMLAttributes<HTMLOListElement> {
  children: React.ReactNode;
}

export const Ol: React.FC<OlProps> = ({ 
  listStyle = 'default', 
  gap,
  spaced = false,
  style, 
  children, 
  ...props 
}) => {
  
  
  const baseStyles: React.CSSProperties = {
    margin: 0,
    padding: listStyle === 'unstyled' ? 0 : `0 0 0 ${theme.spacing.lg}`,
    listStyleType: listStyle === 'unstyled' ? 'none' : 'decimal',
  };

  if (gap) {
    baseStyles.display = 'flex';
    baseStyles.flexDirection = 'column';
    baseStyles.gap = theme.spacing[gap];
    baseStyles.listStyleType = 'none';
    baseStyles.padding = 0;
  }

  if (spaced) {
    baseStyles.lineHeight = theme.typography.lineHeight.relaxed;
  }

  return (
    <ol style={{ ...baseStyles, ...style }} {...props}>
      {children}
    </ol>
  );
};

// List Item Component
interface LiProps extends React.HTMLAttributes<HTMLLIElement> {
  spaced?: boolean;
  children: React.ReactNode;
}

export const Li: React.FC<LiProps> = ({ 
  spaced = false,
  style, 
  children, 
  ...props 
}) => {
  
  
  const baseStyles: React.CSSProperties = {
    margin: 0,
    padding: spaced ? `${theme.spacing.xs} 0` : 0,
    lineHeight: spaced ? theme.typography.lineHeight.relaxed : theme.typography.lineHeight.normal,
  };

  return (
    <li style={{ ...baseStyles, ...style }} {...props}>
      {children}
    </li>
  );
}; 