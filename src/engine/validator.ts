import type { CalcInput } from "./calcTypes"

export type ValidationError = {
  key: string
  message: string
}

export const validateInputs = (
  inputs: CalcInput[],
  values: Record<string, number | undefined>,
) => {
  const errors: ValidationError[] = []
  inputs.forEach((input) => {
    const value = values[input.key]
    if (input.required && (value === undefined || Number.isNaN(value))) {
      errors.push({ key: input.key, message: "Required field" })
      return
    }
    if (value === undefined || Number.isNaN(value)) return
    if (input.min !== undefined && value < input.min) {
      errors.push({ key: input.key, message: `Minimum is ${input.min}` })
    }
    if (input.max !== undefined && value > input.max) {
      errors.push({ key: input.key, message: `Maximum is ${input.max}` })
    }
  })
  return errors
}
