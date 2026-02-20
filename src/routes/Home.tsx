import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { usePins } from "../state/pinsStore"
import { useRecents } from "../state/recentsStore"
import { useFavorites } from "../state/favoritesStore"
import { Link } from "react-router-dom"

const Home = () => {
  const { pins } = usePins()
  const { recents } = useRecents()
  const { favorites } = useFavorites()

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Home Dashboard</CardTitle>
          <CardDescription>
            Search formulas and tools, save favourites, and jump back into recent work.
          </CardDescription>
        </CardHeader>
      </Card>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <CardHeader>
            <CardTitle>Quick Calculators</CardTitle>
            <CardDescription>
              Pin up to six calculators for instant access.
            </CardDescription>
          </CardHeader>
          {pins.length === 0 ? (
            <p className="text-sm text-[rgb(var(--text-muted))]">
              Pin calculators from any formula page.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {pins.map((pin) => (
                <li key={pin.id} className="flex items-center justify-between">
                  <span>{pin.title}</span>
                  <Link
                    to={`/formulas/${pin.formulaId}`}
                    className="text-xs font-medium text-[rgb(var(--text))]"
                  >
                    Open →
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="p-5">
          <CardHeader>
            <CardTitle>Recently Viewed</CardTitle>
          <CardDescription>
            Track your last formulas, lessons, tools, and references.
          </CardDescription>
          </CardHeader>
          {recents.length === 0 ? (
            <p className="text-sm text-[rgb(var(--text-muted))]">
              Recent items will show once you start browsing.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {recents.slice(0, 5).map((item) => (
                <li key={`${item.type}-${item.id}`}>
                  {item.title}{" "}
                  <span className="text-xs text-[rgb(var(--text-muted))]">
                    ({item.type})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>

      <Card className="p-5">
        <CardHeader>
          <CardTitle>Favourites</CardTitle>
          <CardDescription>
            Save formulas, lessons, and tools for fast access on site.
          </CardDescription>
        </CardHeader>
        {favorites.length === 0 ? (
          <p className="text-sm text-[rgb(var(--text-muted))]">
            Your saved items will appear here.
          </p>
        ) : (
          <ul className="space-y-2 text-sm">
            {favorites.slice(0, 5).map((fav) => (
              <li key={`${fav.type}-${fav.id}`}>
                {fav.title}{" "}
                <span className="text-xs text-[rgb(var(--text-muted))]">
                  ({fav.type})
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}

export default Home
