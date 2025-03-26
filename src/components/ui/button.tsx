import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "ptn-inline-flex ptn-items-center ptn-justify-center ptn-gap-2 ptn-whitespace-nowrap ptn-rounded-xl ptn-text-sm ptn-font-medium ptn-transition-colors focus-visible:ptn-outline-none focus-visible:ptn-ring-1 focus-visible:ptn-ring-ring disabled:ptn-pointer-events-none disabled:ptn-opacity-50 [&_svg]:ptn-pointer-events-none [&_svg]:ptn-size-4 [&_svg]:ptn-shrink-0",
  {
    variants: {
      variant: {
        default:
          "bot-fonts ptn-bg-primary ptn-text-white ptn-shadow hover:ptn-bg-primary/90 3xl:ptn-text-base",
        chat: "ptn-bg-gradient-to-br from-blue-400 via-violet-500 to-pink-500 ptn-text-primary-foreground ptn-shadow hover:ptn-bg-primary/90",
        destructive:
          "bot-fonts ptn-bg-destructive ptn-text-white ptn-shadow-sm hover:ptn-bg-destructive/90 3xl:ptn-text-2xl",
        outline:
          "ptn-border ptn-border-input ptn-bg-background ptn-shadow-sm hover:ptn-bg-accent hover:ptn-text-accent-foreground",
        secondary:
          "ptn-bg-secondary ptn-text-secondary-foreground ptn-shadow-sm hover:ptn-bg-secondary/80",
        ghost: "hover:ptn-bg-accent hover:ptn-text-accent-foreground",
        link: "ptn-text-primary ptn-underline-offset-4 hover:ptn-underline",
        green: "ptn-bg-green-700 ptn-text-white ptn-shadow hover:ptn-bg-green-600"
      },
      size: {
        default: "ptn-h-9 ptn-px-4 ptn-py-2 3xl:ptn-h-10",
        sm: "ptn-h-8 ptn-rounded-md ptn-px-3 ptn-text-xs",
        lg: "ptn-h-10 ptn-rounded-md ptn-px-8",
        icon: "ptn-h-9 ptn-w-9 3xl:ptn-p-8",
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
