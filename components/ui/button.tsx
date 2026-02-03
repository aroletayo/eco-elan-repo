import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium font-body transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-eco-sm hover:shadow-eco-md hover:bg-primary/90 active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-eco-sm hover:bg-destructive/90",
        outline:
          "border-2 border-white bg-transparent text-white hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: 
          "text-primary hover:bg-secondary hover:text-primary",
        link: 
          "text-primary underline-offset-4 hover:underline",
        accent:
          "bg-accent text-accent-foreground shadow-eco-sm hover:shadow-eco-glow hover:bg-accent/90 active:scale-[0.98]",
        "accent-outline":
          "border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground",
        hero:
          "bg-accent text-accent-foreground shadow-eco-md hover:shadow-eco-glow hover:bg-accent/90 active:scale-[0.98] text-base px-8 py-6",
        "hero-outline":
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground text-base px-8 py-6",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
