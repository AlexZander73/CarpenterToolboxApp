import { normalizeLengthToMeters } from "../engine/unit"

export const areaCircle = (radius: number, radiusUnit: string) => {
  const r = normalizeLengthToMeters(radius, radiusUnit as any)
  return { area: Math.PI * r * r }
}
