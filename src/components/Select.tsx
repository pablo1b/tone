import React from 'react';
import { theme } from '../theme/';

type SelectSize = 'small' | 'medium' | 'large';

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: SelectSize;
  error?: boolean;
}

export const Select: React.FC<SelectProps> = ({ 
  size = 'medium',
  error = false,
  disabled = false,
  style,
  children,
  ...props 
}) => {
  const getSizeStyles = (size: SelectSize) => {
    switch (size) {
      case 'small':
        return {
          padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
          fontSize: theme.typography.fontSize.sm,
        };
      case 'large':
        return {
          padding: `${theme.spacing.md} ${theme.spacing.lg}`,
          fontSize: theme.typography.fontSize.lg,
        };
      case 'medium':
      default:
        return {
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          fontSize: theme.typography.fontSize.base,
        };
    }
  };

  const baseStyles: React.CSSProperties = {
    fontFamily: theme.typography.fontFamily.sans,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${error ? theme.colors.danger : theme.colors.border}`,
    backgroundColor: disabled ? theme.colors.disabled : theme.colors.background,
    color: disabled ? theme.colors.textMuted : theme.colors.text,
    transition: theme.transitions.normal,
    outline: 'none',
    width: '100%',
    cursor: disabled ? 'not-allowed' : 'pointer',
    ...getSizeStyles(size),
  };

  return (
    <select
      style={{
        ...baseStyles,
        ...style,
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </select>
  );
}; 