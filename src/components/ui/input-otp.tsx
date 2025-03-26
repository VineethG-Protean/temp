import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Minus } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "ptn-flex ptn-items-center ptn-gap-2 has-[:disabled]:ptn-opacity-50",
      containerClassName
    )}
    className={cn("disabled:ptn-cursor-not-allowed", className)}
    placeholder="*"
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("ptn-flex ptn-items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "ptn-relative ptn-flex ptn-h-9 ptn-w-9 ptn-items-center ptn-justify-center ptn-border-y ptn-border-r ptn-border-input ptn-text-sm ptn-shadow-sm ptn-transition-all first:ptn-rounded-l-md first:ptn-border-l last:ptn-rounded-r-md",
        isActive && "ptn-z-10 ptn-ring-1 ptn-ring-ring",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="ptn-pointer-events-none ptn-absolute ptn-inset-0 ptn-flex ptn-items-center ptn-justify-center">
          <div className="ptn-h-4 ptn-w-px ptn-animate-caret-blink ptn-bg-foreground ptn-duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
