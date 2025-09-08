import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const heroButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        ocean: "bg-primary text-primary-foreground shadow hover:bg-primary-hover transform hover:scale-105 hover:shadow-lg",
        surface: "bg-secondary text-secondary-foreground shadow hover:bg-secondary-hover transform hover:scale-105 hover:shadow-lg",
        coral: "bg-accent text-accent-foreground shadow hover:bg-accent-hover transform hover:scale-105 hover:shadow-lg",
        gradient: "gradient-ocean text-white shadow-lg hover:shadow-xl transform hover:scale-105 border-0",
        "gradient-surface": "gradient-surface text-foreground shadow-lg hover:shadow-xl transform hover:scale-105 border-0",
        outline: "border border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground transform hover:scale-105",
        ghost: "text-primary hover:bg-primary/10 transform hover:scale-105"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-lg px-12 text-lg font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "ocean",
      size: "default",
    },
  }
);

export interface HeroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof heroButtonVariants> {
  asChild?: boolean;
}

const HeroButton = React.forwardRef<HTMLButtonElement, HeroButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(heroButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
HeroButton.displayName = "HeroButton";

export { HeroButton, heroButtonVariants };