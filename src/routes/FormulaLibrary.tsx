import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import repository from "../data/repository"
import type { Formula } from "../engine/calcTypes"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"

const FormulaLibrary = () => {
  const [formulas, setFormulas] = useState<Formula[]>([])

  useEffect(() => {
    repository.listFormulas().then(setFormulas)
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Formula Library</CardTitle>
          <CardDescription>
            Browse formulas by category, tags, and practical use case.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {formulas.map((formula) => (
          <Card key={formula.id} className="p-5">
            <CardHeader>
              <CardTitle>{formula.title}</CardTitle>
              <CardDescription>{formula.summary}</CardDescription>
            </CardHeader>
            {formula.media?.image && (
              <img
                src={formula.media.image}
                alt={formula.title}
                className="mt-3 w-full max-h-40 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-2 object-contain"
              />
            )}
            <p className="text-xs text-[rgb(var(--text-muted))]">
              Category: {formula.category}
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-[rgb(var(--text-muted))]">
              {formula.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[rgb(var(--border))] px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              to={`/formulas/${formula.id}`}
              className="mt-4 inline-flex text-sm font-medium text-[rgb(var(--text))]"
            >
              View formula →
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default FormulaLibrary
