import React from 'react';
import { cn } from '@/lib/utils';

type TitleVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
type TitleColor = 'primary' | 'secondary' | 'accent' | 'muted' | 'destructive' | 'foreground';
type TitleWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
type TitleSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';

interface TitleProps {
  children: React.ReactNode;
  variant?: TitleVariant;
  color?: TitleColor;
  weight?: TitleWeight;
  size?: TitleSize;
  className?: string;
}

const getDefaultSize = (variant: TitleVariant): TitleSize => {
  switch (variant) {
    case 'h1': return '4xl';
    case 'h2': return '3xl';
    case 'h3': return '2xl';
    case 'h4': return 'xl';
    case 'h5': return 'lg';
    case 'h6': return 'base';
    default: return 'base';
  }
};

const getDefaultWeight = (variant: TitleVariant): TitleWeight => {
  if (['h1', 'h2', 'h3'].includes(variant)) return 'bold';
  if (['h4', 'h5', 'h6'].includes(variant)) return 'semibold';
  return 'normal';
};

export function Title({
  children,
  variant = 'h1',
  color = 'foreground',
  weight,
  size,
  className,
}: TitleProps) {
  const Component = variant as keyof JSX.IntrinsicElements;
  
  // Determine size and weight based on variant if not explicitly provided
  const titleSize = size || getDefaultSize(variant);
  const titleWeight = weight || getDefaultWeight(variant);

  // Map colors to CSS variables
  const colorMap: Record<TitleColor, string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    muted: 'text-muted',
    destructive: 'text-destructive',
    foreground: 'text-foreground',
  };

  // Map weights to Tailwind classes
  const weightMap: Record<TitleWeight, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };

  // Map sizes to Tailwind classes
  const sizeMap: Record<TitleSize, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
  };

  return (
    <Component
      className={cn(
        colorMap[color],
        weightMap[titleWeight],
        sizeMap[titleSize],
        className
      )}
    >
      {children}
    </Component>
  );
}
