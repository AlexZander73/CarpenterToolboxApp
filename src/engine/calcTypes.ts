export type Unit =
  | "mm"
  | "cm"
  | "m"
  | "deg"
  | "rad"
  | "m2"
  | "m3"
  | "mm2"
  | "cm2"
  | "mm3"
  | "cm3"
  | "percent"
  | "count"
  | "ratio"

export type CalcInput = {
  key: string
  label: string
  unit: Unit
  min?: number
  max?: number
  step?: number
  required?: boolean
  placeholder?: string
  allowUnitSelect?: boolean
}

export type CalcOutput = {
  key: string
  label: string
  unit: Unit
  precision?: number
}

export type CalcSchema = {
  id: string
  title: string
  inputs: CalcInput[]
  outputs: CalcOutput[]
  compute: string
}

export type MediaPhoto = {
  src: string
  alt: string
  credit: string
  sourceUrl: string
  license: string
}

export type Media = {
  image?: string
  animation?: string
  photo?: MediaPhoto
}

export type Formula = {
  id: string
  title: string
  category:
    | "Measuring & Set-out"
    | "Geometry"
    | "Roofing"
    | "Stairs"
    | "Estimating/Takeoff"
    | "Conversions"
  tags: string[]
  summary: string
  whenToUse: string
  howToUse: string[]
  steps: string[]
  equation?: string
  media?: Media
  example: {
    inputs: Record<string, number>
    outputs: Record<string, number>
    explanation: string
  }
  commonMistakes: string[]
  siteTips: string[]
  verification: string
  related: string[]
  calculator: CalcSchema
}

export type Lesson = {
  id: string
  title: string
  summary: string
  tags: string[]
  content: string
  media?: {
    image?: string
    photo?: MediaPhoto
  }
}

export type ReferenceItem = {
  id: string
  title: string
  summary: string
  tags: string[]
  sourceUrl: string
  type: "NCC" | "Standard"
}
