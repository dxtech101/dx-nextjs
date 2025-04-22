import React from "react"
import { twMerge } from "tailwind-merge"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "danger"
    size?: "sm" | "md" | "lg" | "icon"
    isLoading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    fullWidth?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            isLoading = false,
            leftIcon,
            rightIcon,
            children,
            disabled,
            fullWidth = false,
            ...props
        },
        ref,
    ) => {
        // Base styles that apply to all buttons
        const baseStyles =
            "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"

        // Variant-specific styles
        const variantStyles = {
            primary: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
            secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400",
            outline: "border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-50 focus:ring-slate-400",
            ghost: "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400",
            link: "bg-transparent text-emerald-600 hover:underline focus:ring-emerald-500 p-0",
            danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        }

        // Size-specific styles
        const sizeStyles = {
            sm: "text-xs px-3 py-2",
            md: "text-sm px-4 py-2",
            lg: "text-base px-6 py-3",
            icon: "p-2",
        }

        // Disabled styles
        const disabledStyles = "opacity-50 cursor-not-allowed pointer-events-none"

        // Full width style
        const widthStyle = fullWidth ? "w-full" : ""

        // Combine all styles
        const buttonStyles = twMerge(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            disabled || isLoading ? disabledStyles : "",
            widthStyle,
            className,
        )

        return (
            <button ref={ref} className={buttonStyles} disabled={disabled || isLoading} {...props}>
                {isLoading && (
                    <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                )}
                {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
                {children}
                {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
            </button>
        )
    },
)

Button.displayName = "Button"
