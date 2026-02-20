import { NavLink } from "react-router-dom"
import { Calculator, Home, Sparkles, Bookmark, Briefcase, Wrench } from "lucide-react"
import { cn } from "../../utils/cn"

const bottomItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/formulas", label: "Formulas", icon: Calculator },
  { to: "/tools", label: "Tools", icon: Wrench },
  { to: "/wizards", label: "Wizards", icon: Sparkles },
  { to: "/saved", label: "Saved", icon: Bookmark },
]

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[rgb(var(--border))] bg-[rgb(var(--bg-elevated))] lg:hidden">
      <div className="flex items-center justify-around px-2 py-2 text-xs">
        {bottomItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex min-w-[56px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 transition-soft",
                  isActive
                    ? "text-[rgb(var(--accent))]"
                    : "text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))]",
                )
              }
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav
