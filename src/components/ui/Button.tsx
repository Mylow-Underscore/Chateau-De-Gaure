'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-300 ease-smooth rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-secondary-400 hover:bg-primary-600 focus:ring-accent-500',
        secondary: 'bg-secondary-400 text-primary-500 hover:bg-secondary-500 focus:ring-primary-500',
        outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
        gold: 'bg-accent-500 text-primary-500 hover:bg-accent-600 focus:ring-accent-500 shadow-gold-glow',
        ghost: 'text-primary-500 hover:bg-primary-100 focus:ring-primary-500',
        danger: 'bg-status-error text-white hover:bg-red-700 focus:ring-status-error',
      },
      size: {
        sm: 'px-3 py-2 text-sm gap-2',
        md: 'px-4 py-2.5 text-base gap-2',
        lg: 'px-6 py-3 text-lg gap-3',
        xl: 'px-8 py-4 text-lg gap-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="animate-spin">⏳</span>
            {children}
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button