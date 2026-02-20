import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Search } from "lucide-react"
import repository from "../../data/repository"
import type { SearchResult } from "../../data/repository/ContentRepository"
import Input from "../ui/Input"
import { usePresets } from "../../state/presetsStore"
import { db } from "../../data/db"

type CommandPaletteProps = {
  isOpen: boolean
  onClose: () => void
}

const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [jobs, setJobs] = useState<Array<{ id: string; name: string }>>([])
  const [jobPresets, setJobPresets] = useState<
    Array<{ id: string; name: string; calculatorId: string; formulaId?: string }>
  >([])
  const { presets } = usePresets()

  useEffect(() => {
    if (!isOpen) return
    setQuery("")
    repository.search("").then(setResults)
    db.jobs.toArray().then((items) => setJobs(items.map((job) => ({ id: job.id, name: job.name }))))
    db.presets.toArray().then((items) =>
      setJobPresets(
        items
          .filter((preset) => preset.jobId)
          .map((preset) => ({
            id: preset.id,
            name: preset.name,
            calculatorId: preset.calculatorId,
            formulaId: preset.formulaId,
          })),
      ),
    )
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    repository.search(query).then(setResults)
  }, [isOpen, query])

  useEffect(() => {
    if (!isOpen) return
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  const grouped = useMemo(() => {
    const formulas = results.filter((r) => r.type === "formula")
    const lessons = results.filter((r) => r.type === "lesson")
    const references = results.filter((r) => r.type === "reference")
    const tools = results.filter((r) => r.type === "tool")
    const presetMatches = presets.filter((preset) =>
      `${preset.name} ${preset.calculatorId}`.toLowerCase().includes(query.toLowerCase()),
    )
    const jobPresetMatches = jobPresets.filter((preset) =>
      `${preset.name} ${preset.calculatorId}`.toLowerCase().includes(query.toLowerCase()),
    )
    const jobMatches = jobs.filter((job) =>
      job.name.toLowerCase().includes(query.toLowerCase()),
    )
    return { formulas, lessons, references, tools, presetMatches, jobPresetMatches, jobMatches }
  }, [presets, query, results, jobs, jobPresets])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elevated))] p-4 shadow-[var(--shadow-soft)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-[rgb(var(--text-muted))]" />
            <Input
              autoFocus
              placeholder="Search formulas, lessons, tools, references"
              className="pl-9"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
        </div>
        <div className="mt-4 space-y-4 text-sm">
          {results.length === 0 ? (
            <p className="text-[rgb(var(--text-muted))]">No matches found.</p>
          ) : (
            <>
              {grouped.formulas.length > 0 && (
                <Section title="Formulas">
                  {grouped.formulas.map((item) => (
                    <ResultLink
                      key={item.id}
                      to={`/formulas/${item.id}`}
                      title={item.title}
                      summary={item.summary}
                      onClose={onClose}
                    />
                  ))}
                </Section>
              )}
              {grouped.lessons.length > 0 && (
                <Section title="Lessons">
                  {grouped.lessons.map((item) => (
                    <ResultLink
                      key={item.id}
                      to={`/lessons/${item.id}`}
                      title={item.title}
                      summary={item.summary}
                      onClose={onClose}
                    />
                  ))}
                </Section>
              )}
              {grouped.references.length > 0 && (
                <Section title="References">
                  {grouped.references.map((item) => (
                    <ResultLink
                      key={item.id}
                      to="/references"
                      title={item.title}
                      summary={item.summary}
                      onClose={onClose}
                    />
                  ))}
                </Section>
              )}
              {grouped.tools.length > 0 && (
                <Section title="Tools">
                  {grouped.tools.map((item) => (
                    <ResultLink
                      key={item.id}
                      to={`/tools/${item.id}`}
                      title={item.title}
                      summary={item.summary}
                      onClose={onClose}
                    />
                  ))}
                </Section>
              )}
              {grouped.presetMatches.length > 0 && (
                <Section title="Presets">
                  {grouped.presetMatches.map((preset) => (
                    <ResultLink
                      key={preset.id}
                      to={`/formulas/${preset.formulaId}`}
                      title={preset.name}
                      summary={`Preset for ${preset.calculatorId}`}
                      onClose={onClose}
                    />
                  ))}
                </Section>
              )}
              {grouped.jobPresetMatches.length > 0 && (
                <Section title="Job Presets">
                  {grouped.jobPresetMatches.map((preset) => (
                    <ResultLink
                      key={preset.id}
                      to={`/formulas/${preset.formulaId ?? preset.calculatorId}`}
                      title={preset.name}
                      summary={`Job preset for ${preset.calculatorId}`}
                      onClose={onClose}
                    />
                  ))}
                </Section>
              )}
              {grouped.jobMatches.length > 0 && (
                <Section title="Jobs">
                  {grouped.jobMatches.map((job) => (
                    <ResultLink
                      key={job.id}
                      to={`/jobs/${job.id}`}
                      title={job.name}
                      summary="Job workspace"
                      onClose={onClose}
                    />
                  ))}
                </Section>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">
      {title}
    </p>
    <div className="mt-2 space-y-2">{children}</div>
  </div>
)

const ResultLink = ({
  to,
  title,
  summary,
  onClose,
}: {
  to: string
  title: string
  summary: string
  onClose: () => void
}) => (
  <Link
    to={to}
    onClick={onClose}
    className="block rounded-xl border border-[rgb(var(--border))] px-3 py-2"
  >
    <p className="font-medium text-[rgb(var(--text))]">{title}</p>
    <p className="text-xs text-[rgb(var(--text-muted))]">{summary}</p>
  </Link>
)

export default CommandPalette
