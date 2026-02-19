import type { InputHTMLAttributes } from "react"
import { cn } from "../../utils/cn"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean
}

const Input = ({ className, hasError, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-xl border px-3 text-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2",
        hasError
          ? "border-rose-400 focus:ring-rose-200"
          : "border-[rgb(var(--border))] focus:ring-slate-200",
        "bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text))]",
        className,
      )}
      {...props}
    />
  )
}

export default Input
