import type { HTMLAttributes } from "react"
import { cn } from "../../utils/cn"

type CardProps = HTMLAttributes<HTMLDivElement>

export const Card = ({ className, ...props }: CardProps) => {
  return <div className={cn("surface p-6", className)} {...props} />
}

export const CardHeader = ({ className, ...props }: CardProps) => {
  return <div className={cn("mb-4 space-y-1", className)} {...props} />
}

export const CardTitle = ({ className, ...props }: CardProps) => {
  return (
    <h2
      className={cn("text-xl font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

export const CardDescription = ({ className, ...props }: CardProps) => {
  return (
    <p className={cn("text-sm text-[rgb(var(--text-muted))]", className)} {...props} />
  )
}
