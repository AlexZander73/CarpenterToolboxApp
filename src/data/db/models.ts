export type JobStatus = "active" | "archived"

export type Job = {
  id: string
  name: string
  client?: string
  siteAddress?: string
  notes?: string
  status: JobStatus
  pinnedCalculators?: string[]
  createdAt: number
  updatedAt: number
}

export type JobNote = {
  id: string
  jobId: string
  content: string
  updatedAt: number
}

export type CalculationEntry = {
  id: string
  jobId: string
  calculatorId: string
  calculatorName: string
  label?: string
  contextNote?: string
  inputs: Record<string, number | string>
  outputs: Record<string, number | string>
  equation?: string
  steps?: string[]
  conversions?: string[]
  sanityChecks?: string[]
  rounding: {
    mode: string
    length: number
    angle: number
    area: number
    volume: number
    practicalStep?: number
  }
  timestamp: number
  locked?: boolean
}

export type Preset = {
  id: string
  calculatorId: string
  formulaId?: string
  name: string
  inputs: Record<string, number | string>
  createdAt: number
  jobId?: string
}

export type MaterialItem = {
  id: string
  jobId: string
  name: string
  unit: "pcs" | "m" | "m2" | "m3"
  quantity: number
  wastePercent?: number
  notes?: string
  createdAt: number
}

export type ReferenceBookmark = {
  id: string
  jobId: string
  title: string
  summary: string
  sourceUrl: string
  type: "NCC" | "Standard"
  createdAt: number
}

export type Attachment = {
  id: string
  jobId: string
  calculationId?: string
  name: string
  type: string
  size: number
  createdAt: number
  blob: Blob
}
