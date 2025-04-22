import React from "react"
import { twMerge } from "tailwind-merge"

// Card Container
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    noPadding?: boolean
    bordered?: boolean
    elevated?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, noPadding = false, bordered = true, elevated = true, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={twMerge(
                    "bg-white rounded-lg",
                    bordered && "border border-slate-200",
                    elevated && "shadow-sm",
                    !noPadding && "p-6",
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        )
    },
)

Card.displayName = "Card"

// Card Header
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div ref={ref} className={twMerge("mb-4", className)} {...props}>
                {children}
            </div>
        )
    },
)

CardHeader.displayName = "CardHeader"

// Card Title
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ className, children, as = "h3", ...props }, ref) => {
        const Component = as
        return (
            <Component
                ref={ref}
                className={twMerge("text-xl font-semibold text-slate-900 tracking-tight", className)}
                {...props}
            >
                {children}
            </Component>
        )
    },
)

CardTitle.displayName = "CardTitle"

// Card Description
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> { }

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <p ref={ref} className={twMerge("text-sm text-slate-500 mt-1", className)} {...props}>
                {children}
            </p>
        )
    },
)

CardDescription.displayName = "CardDescription"

// Card Content
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> { }

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div ref={ref} className={twMerge("", className)} {...props}>
                {children}
            </div>
        )
    },
)

CardContent.displayName = "CardContent"

// Card Footer
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { }

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div ref={ref} className={twMerge("mt-6 flex items-center", className)} {...props}>
                {children}
            </div>
        )
    },
)

CardFooter.displayName = "CardFooter"
