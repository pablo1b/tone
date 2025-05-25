import React, { useState } from 'react';
import { theme } from '../theme';

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
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  ...props 
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      setIsPressed(true);
    }
    onMouseDown?.(e);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(false);
    onMouseUp?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(false);
    onMouseLeave?.(e);
  };

  const getVariantStyles = (variant: ButtonVariant, isPressed: boolean) => {
    const getActiveColor = (baseColor: string, hoverColor: string) => {
      // Make active state slightly darker than hover
      return isPressed ? hoverColor : baseColor;
    };

    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled 
            ? theme.colors.disabled 
            : getActiveColor(theme.colors.primary, theme.colors.primaryHover),
          color: theme.colors.textInverse,
          border: 'none',
          transform: isPressed && !disabled ? 'translateY(1px)' : 'translateY(0)',
        };
      case 'secondary':
        return {
          backgroundColor: isPressed && !disabled ? theme.colors.hover : 'transparent',
          color: disabled 
            ? theme.colors.disabled 
            : getActiveColor(theme.colors.secondary, theme.colors.secondaryHover),
          border: `1px solid ${disabled 
            ? theme.colors.disabled 
            : getActiveColor(theme.colors.secondary, theme.colors.secondaryHover)}`,
          transform: isPressed && !disabled ? 'translateY(1px)' : 'translateY(0)',
        };
      case 'danger':
        return {
          backgroundColor: disabled 
            ? theme.colors.disabled 
            : getActiveColor(theme.colors.danger, theme.colors.dangerHover),
          color: theme.colors.textInverse,
          border: 'none',
          transform: isPressed && !disabled ? 'translateY(1px)' : 'translateY(0)',
        };
      case 'ghost':
        return {
          backgroundColor: isPressed && !disabled ? theme.colors.hover : 'transparent',
          color: disabled ? theme.colors.disabled : theme.colors.text,
          border: 'none',
          transform: isPressed && !disabled ? 'translateY(1px)' : 'translateY(0)',
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
    transition: theme.transitions.fast,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    outline: 'none',
    userSelect: 'none',
    ...getSizeStyles(size),
    ...getVariantStyles(variant, isPressed),
  };

  return (
    <button
      style={{
        ...baseStyles,
        ...style,
      }}
      disabled={disabled}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}; 