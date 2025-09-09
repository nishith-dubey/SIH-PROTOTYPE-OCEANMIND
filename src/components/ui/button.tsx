import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {props.children}
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    );
  },
);
Button.displayName = "Button";

interface FloatingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  depth?: "sm" | "md" | "lg";
}

const FloatingCard = React.forwardRef<HTMLDivElement, FloatingCardProps>(
  ({ className, depth = "md", children, ...props }, ref) => {
    const depthStyles = {
      sm: "hover:translate-y-[-2px]",
      md: "hover:translate-y-[-4px]",
      lg: "hover:translate-y-[-6px]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl bg-charcoal/30 backdrop-blur-xl",
          "border border-white/10",
          "transition-all duration-300 ease-out",
          depthStyles[depth],
          className,
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10 p-6">{children}</div>
      </div>
    );
  },
);
FloatingCard.displayName = "FloatingCard";

export function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "py-4 px-6 flex items-center justify-between",
        scrolled && "bg-background/80 backdrop-blur-lg border-b border-white/10",
      )}
    >
      <Link to="/" className="text-2xl font-display font-bold text-white">
        FloatChat
      </Link>

      <div className="flex items-center space-x-6">
        <Link
          to="/explore"
          className="text-white/80 hover:text-white transition-colors"
        >
          Explore
        </Link>
        <Link
          to="/data"
          className="text-white/80 hover:text-white transition-colors"
        >
          Data
        </Link>
        <Button variant="secondary" size="sm">
          Launch App
        </Button>
      </div>
    </nav>
  );
}

export function RootLayout() {
  return (
    <div className="min-h-screen bg-primary text-white">
      <NavigationBar />
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-color-primary)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-secondary/5" />
      </div>
    </div>
  );
}

export { Button, buttonVariants, FloatingCard };

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-6xl font-black mb-6 leading-tight">
            Explore Ocean Data
            <span className="text-secondary"> Like Never Before</span>
          </h1>

          <p className="text-xl text-white/80 mb-8">
            Advanced visualization and analysis tools for oceanographic data,
            powered by cutting-edge technology.
          </p>

          <div className="flex gap-4">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="relative w-[500px] h-[500px]">
          {/* Add floating data visualizations here */}
        </div>
      </div>
    </section>
  );
}
