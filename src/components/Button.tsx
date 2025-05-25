import React from 'react';
import { lightTheme } from '../theme/lightTheme';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  children,
  style,
  ...props 
}) => {
  const theme = lightTheme; // TODO: Get from theme context

  const getVariantStyles = (variant: ButtonVariant) => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? theme.colors.disabled : theme.colors.primary,
          color: theme.colors.textInverse,
          border: 'none',
          ':hover': !disabled && {
            backgroundColor: theme.colors.primaryHover,
          },
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          color: disabled ? theme.colors.disabled : theme.colors.secondary,
          border: `1px solid ${disabled ? theme.colors.disabled : theme.colors.secondary}`,
          ':hover': !disabled && {
            backgroundColor: theme.colors.hover,
            borderColor: theme.colors.secondaryHover,
            color: theme.colors.secondaryHover,
          },
        };
      case 'danger':
        return {
          backgroundColor: disabled ? theme.colors.disabled : theme.colors.danger,
          color: theme.colors.textInverse,
          border: 'none',
          ':hover': !disabled && {
            backgroundColor: theme.colors.dangerHover,
          },
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: disabled ? theme.colors.disabled : theme.colors.text,
          border: 'none',
          ':hover': !disabled && {
            backgroundColor: theme.colors.hover,
          },
        };
      default:
        return {};
    }
  };

  const getSizeStyles = (size: ButtonSize) => {
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
    fontWeight: theme.typography.fontWeight.semibold,
    borderRadius: theme.borderRadius.md,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: theme.transitions.normal,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    outline: 'none',
    ...getSizeStyles(size),
    ...getVariantStyles(variant),
  };

  return (
    <button
      style={{
        ...baseStyles,
        ...style,
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}; 