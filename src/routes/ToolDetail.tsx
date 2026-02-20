import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import repository from "../data/repository"
import type { Tool } from "../engine/calcTypes"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import Button from "../components/ui/Button"
import PhotoCard from "../components/Media/PhotoCard"
import { useFavorites } from "../state/favoritesStore"
import { useRecents } from "../state/recentsStore"

const ToolDetail = () => {
  const { id } = useParams()
  const [tool, setTool] = useState<Tool | null>(null)
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addRecent } = useRecents()

  useEffect(() => {
    if (!id) return
    repository.getTool(id).then((result) => {
      if (result) {
        addRecent({ id: result.id, title: result.title, type: "tool" })
      }
      setTool(result ?? null)
    })
  }, [id])

  return (
    <div className="space-y-6">
      {!tool ? (
        <Card>
          <p className="text-sm text-[rgb(var(--text-muted))]">Tool not found.</p>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{tool.title}</CardTitle>
              <CardDescription>{tool.summary}</CardDescription>
            </CardHeader>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-[rgb(var(--text-muted))]">
              <span className="rounded-full border border-[rgb(var(--border))] px-2 py-1">
                {tool.type}
              </span>
              <span className="rounded-full border border-[rgb(var(--border))] px-2 py-1">
                {tool.category}
              </span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <PhotoCard photo={tool.media.photo} label="Tool photo" />
              <PhotoCard photo={tool.media.usePhoto} label="In-use example" />
            </div>
            <Button
              variant={isFavorite(tool.id, "tool") ? "primary" : "secondary"}
              onClick={() =>
                toggleFavorite({ id: tool.id, type: "tool", title: tool.title })
              }
            >
              {isFavorite(tool.id, "tool") ? "Saved" : "Save"}
            </Button>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Use Cases</CardTitle>
              <CardDescription>Primary tasks where this tool shines.</CardDescription>
            </CardHeader>
            <ul className="list-disc pl-5 text-sm text-[rgb(var(--text-muted))]">
              {tool.bestUses.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Other Ways To Use It</CardTitle>
              <CardDescription>Secondary uses that save time on site.</CardDescription>
            </CardHeader>
            <ul className="list-disc pl-5 text-sm text-[rgb(var(--text-muted))]">
              {tool.otherUses.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safety Notes</CardTitle>
            </CardHeader>
            <ul className="list-disc pl-5 text-sm text-[rgb(var(--text-muted))]">
              {tool.safetyNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance</CardTitle>
            </CardHeader>
            <ul className="list-disc pl-5 text-sm text-[rgb(var(--text-muted))]">
              {tool.maintenance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          {tool.relatedTools.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Tools</CardTitle>
              </CardHeader>
              <ul className="list-disc pl-5 text-sm text-[rgb(var(--text-muted))]">
                {tool.relatedTools.map((item) => (
                  <li key={item}>
                    <a href={`#/tools/${item}`} className="underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </>
      )}
    </div>
  )
}

export default ToolDetail
