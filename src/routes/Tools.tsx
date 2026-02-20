import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import repository from "../data/repository"
import type { Tool } from "../engine/calcTypes"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import Input from "../components/ui/Input"
import SegmentedControl from "../components/ui/SegmentedControl"
import { useOnlineStatus } from "../hooks/useOnlineStatus"

const filters = [
  { value: "all", label: "All" },
  { value: "hand", label: "Hand" },
  { value: "power", label: "Power" },
  { value: "measure", label: "Measuring" },
  { value: "clamp", label: "Clamping" },
  { value: "safety", label: "Safety" },
  { value: "site", label: "Site" },
  { value: "adjacent", label: "Adjacent" },
]

const Tools = () => {
  const [tools, setTools] = useState<Tool[]>([])
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const isOnline = useOnlineStatus()

  useEffect(() => {
    repository.listTools().then(setTools)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tools.filter((tool) => {
      const matchQuery =
        !q ||
        `${tool.title} ${tool.summary} ${tool.tags.join(" ")}`
          .toLowerCase()
          .includes(q)

      const matchFilter =
        filter === "all" ||
        (filter === "hand" && tool.type === "Hand Tool") ||
        (filter === "power" && tool.type === "Power Tool") ||
        (filter === "measure" && tool.type === "Measuring & Layout") ||
        (filter === "clamp" && tool.type === "Clamping & Holding") ||
        (filter === "safety" && tool.type === "Safety & PPE") ||
        (filter === "site" && tool.type === "Site & Access") ||
        (filter === "adjacent" && tool.type === "Adjacent Trade")

      return matchQuery && matchFilter
    })
  }, [tools, query, filter])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tools</CardTitle>
          <CardDescription>
            Field-ready tool reference with best uses, alternate uses, and safety notes.
          </CardDescription>
        </CardHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search tools..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <SegmentedControl options={filters} value={filter} onChange={setFilter} />
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card>
          <p className="text-sm text-[rgb(var(--text-muted))]">
            No tools match that search. Try a different keyword.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((tool) => (
            <Card key={tool.id} className="p-5">
              <CardHeader>
                <CardTitle>{tool.title}</CardTitle>
                <CardDescription>{tool.summary}</CardDescription>
              </CardHeader>
              {isOnline && (
                <img
                  src={tool.media.photo.src}
                  alt={tool.media.photo.alt}
                  className="mt-3 w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-[rgb(var(--text-muted))]">
                <span className="rounded-full border border-[rgb(var(--border))] px-2 py-1">
                  {tool.type}
                </span>
                <span className="rounded-full border border-[rgb(var(--border))] px-2 py-1">
                  {tool.category}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-[rgb(var(--text-muted))]">
                {tool.tags.map((tag) => (
                  <span
                    key={`${tool.id}-${tag}`}
                    className="rounded-full border border-[rgb(var(--border))] px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/tools/${tool.id}`}
                className="mt-4 inline-flex text-sm font-medium text-[rgb(var(--text))]"
              >
                View tool →
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tools
