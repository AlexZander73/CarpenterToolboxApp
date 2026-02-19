import { normalizeLengthToMeters } from "../engine/unit"

export const pythagorasRafter = (
  rise: number,
  run: number,
  riseUnit: string,
  runUnit: string,
) => {
  const r = normalizeLengthToMeters(rise, riseUnit as any)
  const u = normalizeLengthToMeters(run, runUnit as any)
  return { length: Math.sqrt(r * r + u * u) }
}
