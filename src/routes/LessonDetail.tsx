import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import repository from "../data/repository"
import type { Lesson } from "../engine/calcTypes"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import Button from "../components/ui/Button"
import { useFavorites } from "../state/favoritesStore"
import { useRecents } from "../state/recentsStore"
import MediaTabs from "../components/Media/MediaTabs"

const LessonDetail = () => {
  const { id } = useParams()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addRecent } = useRecents()

  useEffect(() => {
    if (!id) return
    repository.getLesson(id).then((result) => {
      if (result) {
        addRecent({ id: result.id, title: result.title, type: "lesson" })
      }
      setLesson(result ?? null)
    })
  }, [id])

  return (
    <div className="space-y-6">
      {!lesson ? (
        <Card>
          <p className="text-sm text-[rgb(var(--text-muted))]">Lesson not found.</p>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{lesson.title}</CardTitle>
              <CardDescription>{lesson.summary}</CardDescription>
            </CardHeader>
            {(lesson.media?.image || lesson.media?.photo) && (
              <MediaTabs
                title="Visual reference"
                tabs={[
                  lesson.media?.image
                    ? {
                        key: "illustration",
                        label: "Illustration",
                        type: "image",
                        src: lesson.media.image,
                        alt: `${lesson.title} illustration`,
                      }
                    : null,
                  lesson.media?.photo
                    ? { key: "photo", label: "Photo", type: "photo", photo: lesson.media.photo }
                    : null,
                ].filter(Boolean) as any}
              />
            )}
            <Button
              variant={isFavorite(lesson.id, "lesson") ? "primary" : "secondary"}
              onClick={() =>
                toggleFavorite({ id: lesson.id, type: "lesson", title: lesson.title })
              }
            >
              {isFavorite(lesson.id, "lesson") ? "Saved" : "Save"}
            </Button>
          </Card>
          <Card>
            <div className="space-y-3 text-sm text-[rgb(var(--text-muted))]">
              {lesson.content.split("\n").map((line, index) => (
                <p key={`${line}-${index}`}>{line}</p>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}

export default LessonDetail
