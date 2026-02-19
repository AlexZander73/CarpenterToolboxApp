import { normalizeLengthToMeters } from "../engine/unit"

export const stairsRisersTreads = (
  totalRise: number,
  totalRun: number,
  targetRiser: number,
  riseUnit: string,
  runUnit: string,
  riserUnit: string,
) => {
  const riseM = normalizeLengthToMeters(totalRise, riseUnit as any)
  const runM = normalizeLengthToMeters(totalRun, runUnit as any)
  const targetM = normalizeLengthToMeters(targetRiser, riserUnit as any)
  const risers = Math.max(1, Math.round(riseM / targetM))
  const riserHeight = riseM / risers
  const treads = Math.max(1, risers - 1)
  const treadDepth = runM / treads
  return { risers, riserHeight, treads, treadDepth }
}
