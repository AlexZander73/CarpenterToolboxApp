import type { ButtonHTMLAttributes } from "react"
import { cn } from "../../utils/cn"

type SegmentOption = {
  value: string
  label: string
}

type SegmentedControlProps = {
  options: SegmentOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

const SegmentedControl = ({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg-elevated))] p-1",
        className,
      )}
      role="tablist"
    >
      {options.map((option) => (
        <SegmentButton
          key={option.value}
          isActive={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </SegmentButton>
      ))}
    </div>
  )
}

type SegmentButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean
}

const SegmentButton = ({ isActive, className, ...props }: SegmentButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "rounded-full px-3 py-1.5 text-xs font-medium transition",
        isActive
          ? "bg-[rgb(var(--accent))] text-[rgb(var(--accent-foreground))]"
          : "text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))]",
        className,
      )}
      {...props}
    />
  )
}

export default SegmentedControl
