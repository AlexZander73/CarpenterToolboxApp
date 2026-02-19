import { normalizeLengthToMeters } from "../engine/unit"

export const volumeRectangular = (
  length: number,
  width: number,
  height: number,
  lengthUnit: string,
  widthUnit: string,
  heightUnit: string,
) => {
  const l = normalizeLengthToMeters(length, lengthUnit as any)
  const w = normalizeLengthToMeters(width, widthUnit as any)
  const h = normalizeLengthToMeters(height, heightUnit as any)
  return { volume: l * w * h }
}
