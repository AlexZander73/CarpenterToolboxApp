import Dexie, { type Table } from "dexie"
import type {
  Attachment,
  CalculationEntry,
  Job,
  JobNote,
  MaterialItem,
  Preset,
  ReferenceBookmark,
} from "./models"

export class CarpentryDb extends Dexie {
  jobs!: Table<Job, string>
  jobNotes!: Table<JobNote, string>
  calculations!: Table<CalculationEntry, string>
  presets!: Table<Preset, string>
  materials!: Table<MaterialItem, string>
  references!: Table<ReferenceBookmark, string>
  attachments!: Table<Attachment, string>

  constructor() {
    super("carpentry_companion_db")
    this.version(1).stores({
      jobs: "id, status, updatedAt",
      jobNotes: "id, jobId, updatedAt",
      calculations: "id, jobId, timestamp, calculatorId",
      presets: "id, jobId, calculatorId, createdAt",
      materials: "id, jobId, createdAt",
      references: "id, jobId, createdAt",
      attachments: "id, jobId, calculationId, createdAt",
    })
    this.version(2)
      .stores({
        jobs: "id, status, updatedAt",
        jobNotes: "id, jobId, updatedAt",
        calculations: "id, jobId, timestamp, calculatorId",
        presets: "id, jobId, calculatorId, createdAt",
        materials: "id, jobId, createdAt",
        references: "id, jobId, createdAt",
        attachments: "id, jobId, calculationId, createdAt",
      })
      .upgrade(async (tx) => {
        await tx.table("calculations").toCollection().modify((entry: any) => {
          entry.equation = entry.equation ?? ""
          entry.steps = entry.steps ?? []
          entry.conversions = entry.conversions ?? []
          entry.sanityChecks = entry.sanityChecks ?? []
        })
        await tx.table("jobs").toCollection().modify((entry: any) => {
          entry.pinnedCalculators = entry.pinnedCalculators ?? []
        })
      })
  }
}
