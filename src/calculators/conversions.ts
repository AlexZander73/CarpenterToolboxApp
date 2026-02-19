import { normalizeLengthToMeters } from "../engine/unit"

export const convertLength = (value: number, unit: string) => {
  const meters = normalizeLengthToMeters(value, unit as any)
  return { result: meters }
}

export const convertArea = (area: number) => {
  return { areaOut: area * 1_000_000 }
}

export const convertVolume = (volume: number) => {
  return { volumeOut: volume * 1_000_000_000 }
}

export const areaToVolume = (
  area: number,
  thickness: number,
  thicknessUnit: string,
) => {
  const t = normalizeLengthToMeters(thickness, thicknessUnit as any)
  return { volume: area * t }
}

export const slopePercentToDegrees = (slopePercent: number) => {
  return { degrees: (Math.atan(slopePercent / 100) * 180) / Math.PI }
}

export const rafterLengthFromRunAngle = (
  run: number,
  degrees: number,
  runUnit: string,
) => {
  const r = normalizeLengthToMeters(run, runUnit as any)
  const length = r / Math.cos((degrees * Math.PI) / 180)
  return { length }
}

export const estimateSheets = (
  totalArea: number,
  sheetArea: number,
  wastePercent: number,
) => {
  const base = totalArea / sheetArea
  const total = base * (1 + wastePercent / 100)
  return { sheets: Math.ceil(total) }
}
