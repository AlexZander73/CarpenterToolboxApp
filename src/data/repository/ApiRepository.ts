import type { ContentRepository, SearchResult } from "./ContentRepository"
import type { Formula, Lesson, ReferenceItem, Tool } from "../../engine/calcTypes"

class ApiRepository implements ContentRepository {
  async listFormulas(): Promise<Formula[]> {
    return []
  }

  async getFormula(): Promise<Formula | undefined> {
    return undefined
  }

  async listLessons(): Promise<Lesson[]> {
    return []
  }

  async getLesson(): Promise<Lesson | undefined> {
    return undefined
  }

  async listReferences(): Promise<ReferenceItem[]> {
    return []
  }

  async listTools(): Promise<Tool[]> {
    return []
  }

  async getTool(): Promise<Tool | undefined> {
    return undefined
  }

  async search(): Promise<SearchResult[]> {
    return []
  }
}

export default ApiRepository
