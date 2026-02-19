import type { ContentRepository, SearchResult } from "./ContentRepository"
import type { Formula, Lesson, ReferenceItem } from "../../engine/calcTypes"
import formulasRaw from "../formulas/index"
import lessonsRaw from "../lessons/index"
import referencesRaw from "../references/index"

const normalizeQuery = (query: string) => query.trim().toLowerCase()

class LocalJsonRepository implements ContentRepository {
  private formulas: Formula[] = formulasRaw
  private lessons: Lesson[] = lessonsRaw
  private references: ReferenceItem[] = referencesRaw

  async listFormulas() {
    return this.formulas
  }

  async getFormula(id: string) {
    return this.formulas.find((item) => item.id === id)
  }

  async listLessons() {
    return this.lessons
  }

  async getLesson(id: string) {
    return this.lessons.find((item) => item.id === id)
  }

  async listReferences() {
    return this.references
  }

  async search(query: string): Promise<SearchResult[]> {
    const q = normalizeQuery(query)
    if (!q) return []

    const results: SearchResult[] = []
    const addIfMatch = (
      item: { id: string; title: string; summary: string; tags: string[] },
      type: SearchResult["type"],
    ) => {
      const haystack = `${item.title} ${item.summary} ${item.tags.join(" ")}`.toLowerCase()
      if (haystack.includes(q)) {
        results.push({
          id: item.id,
          type,
          title: item.title,
          summary: item.summary,
          tags: item.tags,
        })
      }
    }

    this.formulas.forEach((item) => addIfMatch(item, "formula"))
    this.lessons.forEach((item) => addIfMatch(item, "lesson"))
    this.references.forEach((item) => addIfMatch(item, "reference"))

    return results
  }
}

export default LocalJsonRepository
