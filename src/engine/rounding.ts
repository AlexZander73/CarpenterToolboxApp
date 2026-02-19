export type RoundingMode = "none" | "fixed" | "practical"

export type RoundingConfig = {
  mode: RoundingMode
  precision: number
  practicalStep?: number
}

export const roundValue = (value: number, config: RoundingConfig) => {
  if (config.mode === "none") return value
  if (config.mode === "fixed") {
    const factor = 10 ** config.precision
    return Math.round(value * factor) / factor
  }
  if (config.mode === "practical" && config.practicalStep) {
    return Math.round(value / config.practicalStep) * config.practicalStep
  }
  return value
}
