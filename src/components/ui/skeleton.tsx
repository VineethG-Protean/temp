import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("ptn-animate-pulse ptn-rounded-md ptn-bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
