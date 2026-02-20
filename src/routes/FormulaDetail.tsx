import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import repository from "../data/repository"
import type { Formula } from "../engine/calcTypes"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import CalculatorWidget from "../components/Calculator/CalculatorWidget"
import Button from "../components/ui/Button"
import { useFavorites } from "../state/favoritesStore"
import { usePins } from "../state/pinsStore"
import { useRecents } from "../state/recentsStore"
import PhotoCard from "../components/Media/PhotoCard"

const FormulaDetail = () => {
  const { id } = useParams()
  const [formula, setFormula] = useState<Formula | null>(null)
  const { toggleFavorite, isFavorite } = useFavorites()
  const { togglePin, isPinned } = usePins()
  const { addRecent } = useRecents()

  useEffect(() => {
    if (!id) return
    repository.getFormula(id).then((result) => {
      if (result) {
        addRecent({ id: result.id, title: result.title, type: "formula" })
      }
      setFormula(result ?? null)
    })
  }, [id])

  return (
    <div className="space-y-6">
      {!formula ? (
        <Card>
          <p className="text-sm text-[rgb(var(--text-muted))]">
            Formula not found.
          </p>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{formula.title}</CardTitle>
              <CardDescription>{formula.summary}</CardDescription>
            </CardHeader>
            {(formula.media?.image || formula.media?.photo || formula.media?.animation) && (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {formula.media?.image && (
                  <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-3">
                    <p className="text-xs text-[rgb(var(--text-muted))]">Example</p>
                    <img
                      src={formula.media.image}
                      alt={formula.title}
                      className="mt-2 w-full"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <PhotoCard photo={formula.media?.photo} />
                {formula.media?.animation && (
                  <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-3">
                    <p className="text-xs text-[rgb(var(--text-muted))]">Animated guide</p>
                    <img
                      src={formula.media.animation}
                      alt={`${formula.title} animation`}
                      className="mt-2 w-full"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={isFavorite(formula.id, "formula") ? "primary" : "secondary"}
                onClick={() =>
                  toggleFavorite({ id: formula.id, type: "formula", title: formula.title })
                }
              >
                {isFavorite(formula.id, "formula") ? "Saved" : "Save"}
              </Button>
              <Button
                variant={isPinned(formula.calculator.id) ? "primary" : "secondary"}
                onClick={() =>
                  togglePin({
                    id: formula.calculator.id,
                    title: formula.calculator.title,
                    formulaId: formula.id,
                  })
                }
              >
                {isPinned(formula.calculator.id) ? "Pinned" : "Pin to Home"}
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold">When to use</h3>
                <p className="mt-1 text-sm text-[rgb(var(--text-muted))]">
                  {formula.whenToUse}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">How to use</h3>
                <ul className="mt-1 list-disc pl-5 text-sm text-[rgb(var(--text-muted))]">
                  {formula.howToUse.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step-by-step method</CardTitle>
            </CardHeader>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-[rgb(var(--text-muted))]">
              {formula.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Worked example</CardTitle>
              <CardDescription>{formula.example.explanation}</CardDescription>
            </CardHeader>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold text-[rgb(var(--text-muted))]">
                  Inputs
                </p>
                <ul className="mt-2 text-sm text-[rgb(var(--text-muted))]">
                  {Object.entries(formula.example.inputs).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-[rgb(var(--text-muted))]">
                  Outputs
                </p>
                <ul className="mt-2 text-sm text-[rgb(var(--text-muted))]">
                  {Object.entries(formula.example.outputs).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calculator</CardTitle>
              <CardDescription>{formula.verification}</CardDescription>
            </CardHeader>
            <CalculatorWidget schema={formula.calculator} formulaId={formula.id} />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common mistakes</CardTitle>
            </CardHeader>
            <ul className="list-disc pl-5 text-sm text-[rgb(var(--text-muted))]">
              {formula.commonMistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Site tips</CardTitle>
            </CardHeader>
            <ul className="list-disc pl-5 text-sm text-[rgb(var(--text-muted))]">
              {formula.siteTips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          {formula.related.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related formulas</CardTitle>
              </CardHeader>
              <ul className="list-disc pl-5 text-sm text-[rgb(var(--text-muted))]">
                {formula.related.map((item) => (
                  <li key={item}>
                    <a href={`#/formulas/${item}`} className="underline">
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

export default FormulaDetail
