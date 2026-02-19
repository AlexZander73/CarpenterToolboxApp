import { normalizeLengthToMeters, toDegrees, toRadians } from "../engine/unit"

export const roofPitchToDegrees = (
  rise: number,
  run: number,
  riseUnit: string,
  runUnit: string,
) => {
  const r = normalizeLengthToMeters(rise, riseUnit as any)
  const u = normalizeLengthToMeters(run, runUnit as any)
  return { degrees: toDegrees(Math.atan(r / u)) }
}

export const degreesToPitchRatio = (degrees: number) => {
  return { ratio: Math.tan(toRadians(degrees)) }
}
