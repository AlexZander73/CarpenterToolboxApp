import { Link } from "react-router-dom"
import { Bookmark, Clock3, Search, Settings } from "lucide-react"
import Input from "../ui/Input"
import Button from "../ui/Button"

type CommandBarProps = {
  onOpenPalette: () => void
}

const CommandBar = ({ onOpenPalette }: CommandBarProps) => {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg-elevated))]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[rgb(var(--accent))] text-sm text-[rgb(var(--accent-foreground))]">
            CC
          </span>
          <span className="text-lg">Carpentry Companion (AU)</span>
        </Link>
        <div className="flex-1">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-[rgb(var(--text-muted))]" />
            <Input
              id="global-search"
              type="search"
              placeholder="Search formulas, lessons, tools, references (Cmd+K)"
              className="pl-9"
              onFocus={onOpenPalette}
            />
          </div>
        </div>
        <nav className="hidden items-center gap-2 md:flex">
          <Link to="/saved">
            <Button variant="secondary" size="sm">
            <Bookmark className="h-4 w-4" />
            Saved
            </Button>
          </Link>
          <Button variant="secondary" size="sm" onClick={onOpenPalette}>
            <Clock3 className="h-4 w-4" />
            Recents
          </Button>
          <Link to="/settings">
            <Button variant="secondary" size="sm">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default CommandBar
