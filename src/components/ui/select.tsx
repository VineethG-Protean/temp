import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "ptn-flex ptn-h-9 ptn-w-full ptn-items-center ptn-justify-between ptn-whitespace-nowrap ptn-rounded-md ptn-bg-transparent ptn-text-sm data-[placeholder]:ptn-text-muted-foreground  disabled:ptn-cursor-not-allowed disabled:ptn-opacity-50 [&>span]:ptn-line-clamp-1 focus-visible:ptn-outline-none",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="ptn-h-4 ptn-w-4 ptn-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "ptn-flex ptn-cursor-default ptn-items-center ptn-justify-center ptn-py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "ptn-flex ptn-cursor-default ptn-items-center ptn-justify-center ptn-py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="ptn-h-4 ptn-w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "ptn-relative ptn-z-[999999] ptn-max-h-96 ptn-min-w-[8rem] ptn-overflow-hidden ptn-rounded-md ptn-border ptn-bg-popover ptn-text-popover-foreground ptn-shadow-md data-[state=open]:ptn-animate-in data-[state=closed]:ptn-animate-out data-[state=closed]:ptn-fade-out-0 data-[state=open]:ptn-fade-in-0 data-[state=closed]:ptn-zoom-out-95 data-[state=open]:ptn-zoom-in-95 data-[side=bottom]:ptn-slide-in-from-top-2 data-[side=left]:ptn-slide-in-from-right-2 data-[side=right]:ptn-slide-in-from-left-2 data-[side=top]:ptn-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:ptn-translate-y-1 data-[side=left]:-ptn-translate-x-1 data-[side=right]:ptn-translate-x-1 data-[side=top]:-ptn-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "ptn-h-[var(--radix-select-trigger-height)] ptn-w-full ptn-min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("ptn-px-2 ptn-py-1.5 ptn-text-sm ptn-font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "ptn-relative ptn-flex ptn-w-full ptn-cursor-default ptn-select-none ptn-items-center ptn-rounded-sm ptn-py-1.5 ptn-pl-2 ptn-pr-8 ptn-text-sm ptn-outline-none focus:ptn-bg-accent focus:ptn-text-accent-foreground data-[disabled]:ptn-pointer-events-none data-[disabled]:ptn-opacity-50",
      className
    )}
    {...props}
  >
    <span className="ptn-absolute ptn-right-2 ptn-flex ptn-h-3.5 ptn-w-3.5 ptn-items-center ptn-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="ptn-h-4 ptn-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-ptn-mx-1 ptn-my-1 ptn-h-px ptn-bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
