import React from 'react';
import { theme } from '../theme/';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ 
  style,
  children,
  ...props 
}) => {
  const baseStyles: React.CSSProperties = {
    fontFamily: theme.typography.fontFamily.sans,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
    display: 'block',
    marginBottom: theme.spacing.xs,
  };

  return (
    <label
      style={{
        ...baseStyles,
        ...style,
      }}
      {...props}
    >
      {children}
    </label>
  );
}; 