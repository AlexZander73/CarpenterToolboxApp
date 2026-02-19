import type { HTMLAttributes } from "react"
import { cn } from "../../utils/cn"

type BadgeProps = HTMLAttributes<HTMLSpanElement>

const Badge = ({ className, ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[rgb(var(--border))] px-2.5 py-1 text-xs font-medium text-[rgb(var(--text-muted))]",
        className,
      )}
      {...props}
    />
  )
}

export default Badge
