import { NavLink } from "react-router-dom"
import {
  Calculator,
  Home,
  Layers,
  Library,
  Sparkles,
  Bookmark,
  Briefcase,
} from "lucide-react"
import { cn } from "../../utils/cn"

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/formulas", label: "Formulas", icon: Calculator },
  { to: "/wizards", label: "Wizards", icon: Sparkles },
  { to: "/lessons", label: "Lessons", icon: Library },
  { to: "/references", label: "References", icon: Layers },
  { to: "/saved", label: "Saved", icon: Bookmark },
]

type SidebarNavProps = {
  collapsed?: boolean
}

const SidebarNav = ({ collapsed }: SidebarNavProps) => {
  return (
    <aside className="hidden w-60 flex-shrink-0 lg:block">
      <nav className="surface p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">
          Workspace
        </p>
        <ul className="space-y-1 text-sm">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2 transition-soft",
                      isActive
                        ? "bg-[rgb(var(--accent))] text-[rgb(var(--accent-foreground))]"
                        : "text-[rgb(var(--text))] hover:bg-[rgb(var(--bg))]",
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default SidebarNav
