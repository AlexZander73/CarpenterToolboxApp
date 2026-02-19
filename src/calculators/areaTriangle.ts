import { normalizeLengthToMeters } from "../engine/unit"

export const areaTriangle = (
  base: number,
  height: number,
  baseUnit: string,
  heightUnit: string,
) => {
  const b = normalizeLengthToMeters(base, baseUnit as any)
  const h = normalizeLengthToMeters(height, heightUnit as any)
  return { area: (b * h) / 2 }
}
