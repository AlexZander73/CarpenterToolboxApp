import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import repository from "../data/repository"
import type { Lesson } from "../engine/calcTypes"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { useRecents } from "../state/recentsStore"

const Lessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const { addRecent } = useRecents()

  useEffect(() => {
    repository.listLessons().then(setLessons)
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lessons</CardTitle>
          <CardDescription>
            Original guidance to build measurement and set-out confidence.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="p-5">
            <CardHeader>
              <CardTitle>{lesson.title}</CardTitle>
              <CardDescription>{lesson.summary}</CardDescription>
            </CardHeader>
            {lesson.media?.image && (
              <img
                src={lesson.media.image}
                alt={lesson.title}
                className="mt-3 w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-2"
              />
            )}
            <div className="flex flex-wrap gap-2 text-xs text-[rgb(var(--text-muted))]">
              {lesson.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[rgb(var(--border))] px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              to={`/lessons/${lesson.id}`}
              className="mt-4 inline-flex text-sm font-medium text-[rgb(var(--text))]"
              onClick={() =>
                addRecent({ id: lesson.id, title: lesson.title, type: "lesson" })
              }
            >
              Read lesson →
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Lessons
