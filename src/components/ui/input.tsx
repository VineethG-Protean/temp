import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "bot-fonts ptn-flex ptn-h-9 ptn-rounded-md ptn-transition-colors focus-visible:ptn-outline-none ptn-file:border-0 ptn-file:bg-transparent ptn-file:text-sm ptn-file:font-medium ptn-file:text-foreground placeholder:ptn-text-muted placeholder:ptn-font-light disabled:ptn-cursor-not-allowed disabled:ptn-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
