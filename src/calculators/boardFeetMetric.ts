import { normalizeLengthToMeters } from "../engine/unit"

export const boardFeetMetric = (
  thickness: number,
  width: number,
  length: number,
  thicknessUnit: string,
  widthUnit: string,
  lengthUnit: string,
) => {
  const t = normalizeLengthToMeters(thickness, thicknessUnit as any)
  const w = normalizeLengthToMeters(width, widthUnit as any)
  const l = normalizeLengthToMeters(length, lengthUnit as any)
  const volumeM3 = t * w * l
  const boardFeet = volumeM3 / 0.002359737
  return { boardFeet }
}
