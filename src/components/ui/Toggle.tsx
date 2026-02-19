import type { ButtonHTMLAttributes } from "react"
import { cn } from "../../utils/cn"

type ToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  pressed?: boolean
}

const Toggle = ({ pressed, className, ...props }: ToggleProps) => {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm transition",
        pressed
          ? "border-transparent bg-[rgb(var(--accent))] text-[rgb(var(--accent-foreground))]"
          : "border-[rgb(var(--border))] text-[rgb(var(--text))] hover:bg-[rgb(var(--bg))]",
        className,
      )}
      {...props}
    />
  )
}

export default Toggle
