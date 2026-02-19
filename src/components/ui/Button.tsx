import type { ButtonHTMLAttributes } from "react"
import { cn } from "../../utils/cn"

type Variant = "primary" | "secondary" | "ghost"
type Size = "sm" | "md" | "lg"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
}

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"

const variantClasses: Record<Variant, string> = {
  primary:
    "pill bg-[rgb(var(--accent))] text-[rgb(var(--accent-foreground))] hover:opacity-90",
  secondary:
    "pill border border-[rgb(var(--border))] bg-transparent text-[rgb(var(--text))] hover:bg-[rgb(var(--bg))]",
  ghost:
    "pill text-[rgb(var(--text))] hover:bg-[rgb(var(--bg))]",
}

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
}

const Button = ({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  )
}

export default Button
