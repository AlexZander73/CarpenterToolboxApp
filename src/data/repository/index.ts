import type { ContentRepository } from "./ContentRepository"
import ApiRepository from "./ApiRepository"
import LocalJsonRepository from "./LocalJsonRepository"
import { repositoryType } from "./config"

const repository: ContentRepository =
  repositoryType === "api" ? new ApiRepository() : new LocalJsonRepository()

export default repository
