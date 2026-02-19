import type { ReferenceItem } from "../../engine/calcTypes"
import ncc from "./ncc.json"
import standards from "./standards.json"

const references: ReferenceItem[] = [
  ...ncc.map((item) => ({ ...item, type: "NCC" as const })),
  ...standards.map((item) => ({ ...item, type: "Standard" as const })),
]

export default references
