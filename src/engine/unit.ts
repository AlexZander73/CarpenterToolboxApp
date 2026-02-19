import type { Unit } from "./calcTypes"

export type UnitPreference = "mm" | "cm" | "m"

export const normalizeLengthToMeters = (value: number, unit: Unit) => {
  switch (unit) {
    case "mm":
      return value / 1000
    case "cm":
      return value / 100
    case "m":
    default:
      return value
  }
}

export const fromMeters = (value: number, unit: UnitPreference) => {
  switch (unit) {
    case "mm":
      return value * 1000
    case "cm":
      return value * 100
    case "m":
    default:
      return value
  }
}

export const toRadians = (deg: number) => (deg * Math.PI) / 180

export const toDegrees = (rad: number) => (rad * 180) / Math.PI

export const areaUnitLabel = (unit: UnitPreference) =>
  unit === "mm" ? "mm2" : unit === "cm" ? "cm2" : "m2"

export const volumeUnitLabel = (unit: UnitPreference) =>
  unit === "mm" ? "mm3" : unit === "cm" ? "cm3" : "m3"
