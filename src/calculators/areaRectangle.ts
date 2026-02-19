import { normalizeLengthToMeters } from "../engine/unit"

export const areaRectangle = (
  length: number,
  width: number,
  lengthUnit: string,
  widthUnit: string,
) => {
  const l = normalizeLengthToMeters(length, lengthUnit as any)
  const w = normalizeLengthToMeters(width, widthUnit as any)
  return { area: l * w }
}
