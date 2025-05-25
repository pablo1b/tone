import React from 'react';
import { lightTheme } from '../theme/lightTheme';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ 
  style,
  children,
  ...props 
}) => {
  const theme = lightTheme; // TODO: Get from theme context

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