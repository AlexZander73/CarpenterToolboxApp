import type { Formula, Lesson, ReferenceItem, Tool } from "../../engine/calcTypes"

export type SearchResult = {
  id: string
  type: "formula" | "lesson" | "reference" | "tool"
  title: string
  summary: string
  tags: string[]
}

export interface ContentRepository {
  listFormulas(): Promise<Formula[]>
  getFormula(id: string): Promise<Formula | undefined>
  listLessons(): Promise<Lesson[]>
  getLesson(id: string): Promise<Lesson | undefined>
  listReferences(): Promise<ReferenceItem[]>
  listTools(): Promise<Tool[]>
  getTool(id: string): Promise<Tool | undefined>
  search(query: string): Promise<SearchResult[]>
}
