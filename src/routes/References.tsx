import { useEffect, useState } from "react"
import repository from "../data/repository"
import type { ReferenceItem } from "../engine/calcTypes"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { useRecents } from "../state/recentsStore"

const References = () => {
  const [references, setReferences] = useState<ReferenceItem[]>([])
  const { addRecent } = useRecents()

  useEffect(() => {
    repository.listReferences().then(setReferences)
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>References</CardTitle>
          <CardDescription>
            Links to NCC clauses and Australian Standards (summaries only).
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>How to use references</CardTitle>
          <CardDescription>
            Use these links to check the authoritative source. This app stores
            identifiers and original summaries only.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {references.map((ref) => (
          <Card key={ref.id} className="p-5">
            <CardHeader>
              <CardTitle>{ref.title}</CardTitle>
              <CardDescription>{ref.summary}</CardDescription>
            </CardHeader>
            <div className="text-xs font-medium text-[rgb(var(--text-muted))]">
              {ref.type}
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-[rgb(var(--text-muted))]">
              {ref.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[rgb(var(--border))] px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={ref.sourceUrl}
              className="mt-4 inline-flex text-sm font-medium text-[rgb(var(--text))]"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                addRecent({ id: ref.id, title: ref.title, type: "reference" })
              }
            >
              Open official source →
            </a>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default References
