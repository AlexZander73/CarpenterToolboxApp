import { useEffect, useState } from "react"
import repository from "../data/repository"
import type { SearchResult } from "../data/repository/ContentRepository"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import Input from "../components/ui/Input"
import { Link } from "react-router-dom"

const Search = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    repository.search(query).then(setResults)
  }, [query])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search</CardTitle>
        <CardDescription>
          Use the command palette to search formulas, lessons, tools, and references.
        </CardDescription>
      </CardHeader>
      <div className="space-y-4">
        <Input
          placeholder="Search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {results.length === 0 ? (
          <p className="text-sm text-[rgb(var(--text-muted))]">
            No results yet. Try a different keyword.
          </p>
        ) : (
          <ul className="space-y-2 text-sm">
            {results.map((result) => (
              <li key={`${result.type}-${result.id}`}>
                <Link
                  to={
                    result.type === "formula"
                      ? `/formulas/${result.id}`
                      : result.type === "lesson"
                        ? `/lessons/${result.id}`
                        : result.type === "tool"
                          ? `/tools/${result.id}`
                        : "/references"
                  }
                  className="font-medium text-[rgb(var(--text))]"
                >
                  {result.title}
                </Link>
                <p className="text-xs text-[rgb(var(--text-muted))]">
                  {result.summary}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  )
}

export default Search
