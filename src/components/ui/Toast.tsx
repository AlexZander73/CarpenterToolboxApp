import type { HTMLAttributes } from "react"
import { cn } from "../../utils/cn"

type ToastVariant = "info" | "success" | "warning"

type ToastProps = HTMLAttributes<HTMLDivElement> & {
  variant?: ToastVariant
}

const variantClasses: Record<ToastVariant, string> = {
  info: "border-slate-200 bg-white text-slate-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
}

const Toast = ({ variant = "info", className, ...props }: ToastProps) => {
  return (
    <div
      className={cn(
        "pointer-events-auto w-full max-w-sm rounded-2xl border px-4 py-3 text-sm shadow-[var(--shadow-soft)]",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  )
}

export default Toast
