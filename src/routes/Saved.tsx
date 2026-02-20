import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Link } from "react-router-dom"
import { useFavorites } from "../state/favoritesStore"
import { usePresets } from "../state/presetsStore"

const Saved = () => {
  const { favorites } = useFavorites()
  const { presets, removePreset } = usePresets()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
        <CardTitle>Saved Items</CardTitle>
        <CardDescription>
          Formulas, lessons, tools, references, and presets you have saved.
        </CardDescription>
      </CardHeader>
      </Card>

      <Card>
        <CardHeader>
        <CardTitle>Favourites</CardTitle>
        <CardDescription>Saved items across the app.</CardDescription>
      </CardHeader>
      {favorites.length === 0 ? (
        <p className="text-sm text-[rgb(var(--text-muted))]">
          Save a formula, lesson, or tool to see it here.
        </p>
      ) : (
          <ul className="space-y-2 text-sm">
            {favorites.map((fav) => (
              <li key={`${fav.type}-${fav.id}`}>
                <Link
                  to={
                    fav.type === "formula"
                      ? `/formulas/${fav.id}`
                      : fav.type === "lesson"
                        ? `/lessons/${fav.id}`
                        : fav.type === "tool"
                          ? `/tools/${fav.id}`
                          : "/references"
                  }
                  className="font-medium text-[rgb(var(--text))]"
                >
                  {fav.title}
                </Link>{" "}
                <span className="text-xs text-[rgb(var(--text-muted))]">({fav.type})</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Presets</CardTitle>
          <CardDescription>Saved calculator input sets.</CardDescription>
        </CardHeader>
        {presets.length === 0 ? (
          <p className="text-sm text-[rgb(var(--text-muted))]">
            Save a preset from any calculator to see it here.
          </p>
        ) : (
          <ul className="space-y-2 text-sm">
            {presets.map((preset) => (
              <li key={preset.id} className="flex items-center justify-between">
                <span>
                  {preset.name}{" "}
                  <span className="text-xs text-[rgb(var(--text-muted))]">
                    ({preset.calculatorId})
                  </span>
                </span>
                <button
                  className="text-xs text-rose-500"
                  onClick={() => removePreset(preset.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}

export default Saved
