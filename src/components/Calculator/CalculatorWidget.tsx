import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { CalcSchema } from "../../engine/calcTypes"
import { validateInputs } from "../../engine/validator"
import calculators from "../../calculators"
import Input from "../ui/Input"
import Button from "../ui/Button"
import Badge from "../ui/Badge"
import { useHistory } from "../../state/historyStore"
import { usePresets } from "../../state/presetsStore"
import { useSettings } from "../../state/settingsStore"
import { roundValue } from "../../engine/rounding"
import { useRecents } from "../../state/recentsStore"
import { db } from "../../data/db"

type CalculatorWidgetProps = {
  schema: CalcSchema
  formulaId?: string
  jobId?: string
  contextLabel?: string
  contextNote?: string
  audit?: {
    equation?: string
    steps?: string[]
    sanityChecks?: string[]
  }
  presetInputs?: Record<string, number | string>
  onPresetSaved?: () => void
}

const CalculatorWidget = ({
  schema,
  formulaId,
  jobId,
  contextLabel,
  contextNote,
  audit,
  presetInputs,
  onPresetSaved,
}: CalculatorWidgetProps) => {
  const [values, setValues] = useState<Record<string, number | undefined>>({})
  const [units, setUnits] = useState<Record<string, string>>({})
  const [results, setResults] = useState<Record<string, number>>({})
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const { addRun, listByCalculator: listHistory } = useHistory()
  const { addPreset, listByCalculator: listPresets } = usePresets()
  const { settings } = useSettings()
  const { addRecent } = useRecents()

  const errors = useMemo(() => validateInputs(schema.inputs, values), [schema, values])

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: value === "" ? undefined : Number(value),
    }))
  }

  const handleUnitChange = (key: string, unit: string) => {
    setUnits((prev) => ({ ...prev, [key]: unit }))
  }

  const handleCalculate = () => {
    if (errors.length > 0) {
      setError("Fix the highlighted fields before calculating.")
      return
    }
    setError(null)
    const fn = (calculators as Record<string, (...args: any[]) => any>)[schema.compute]
    if (!fn) {
      setError("Calculator not available.")
      return
    }

    const args = schema.inputs.flatMap((input) => {
      const value = values[input.key] ?? 0
      if (input.allowUnitSelect) {
        return [value, units[input.key] ?? input.unit]
      }
      return [value]
    })

    const output = fn(...args)
    setResults(output)
    addRecent({ id: schema.id, title: schema.title, type: "calculator" })
    const params = new URLSearchParams(searchParams)
    schema.inputs.forEach((input) => {
      const val = values[input.key]
      if (val !== undefined) params.set(input.key, String(val))
      if (input.allowUnitSelect) {
        params.set(`${input.key}Unit`, units[input.key] ?? settings.lengthUnit)
      }
    })
    setSearchParams(params, { replace: true })
    const compactInputs = Object.fromEntries(
      Object.entries({ ...values, ...units }).filter(([, value]) => value !== undefined),
    ) as Record<string, string | number>

    addRun({
      id: `${schema.id}-${Date.now()}`,
      calculatorId: schema.id,
      inputs: compactInputs,
      outputs: output,
      timestamp: Date.now(),
    })
    if (jobId) {
      const conversions = schema.inputs
        .filter((input) => input.allowUnitSelect)
        .map((input) => {
          const usedUnit = units[input.key] ?? settings.lengthUnit
          return usedUnit === "m"
            ? null
            : `Converted ${input.label} from ${usedUnit} to m`
        })
        .filter(Boolean) as string[]
      db.calculations.add({
        id: `calc-${Date.now()}`,
        jobId,
        calculatorId: schema.id,
        calculatorName: schema.title,
        label: contextLabel,
        contextNote,
        inputs: compactInputs,
        outputs: output,
        equation: audit?.equation,
        steps: audit?.steps ?? [],
        conversions,
        sanityChecks: audit?.sanityChecks ?? [],
        rounding: {
          mode: settings.roundingMode,
          length: settings.rounding.length,
          angle: settings.rounding.angle,
          area: settings.rounding.area,
          volume: settings.rounding.volume,
          practicalStep: settings.practicalStep,
        },
        timestamp: Date.now(),
      })
    }
  }

  useEffect(() => {
    const nextValues: Record<string, number | undefined> = {}
    const nextUnits: Record<string, string> = {}
    schema.inputs.forEach((input) => {
      const paramValue = searchParams.get(input.key)
      if (paramValue) nextValues[input.key] = Number(paramValue)
      if (input.allowUnitSelect) {
        const paramUnit = searchParams.get(`${input.key}Unit`)
        if (paramUnit) nextUnits[input.key] = paramUnit
      }
    })
    if (Object.keys(nextValues).length > 0) setValues(nextValues)
    if (Object.keys(nextUnits).length > 0) setUnits(nextUnits)
  }, [schema.inputs, searchParams])

  useEffect(() => {
    if (!presetInputs) return
    const nextValues: Record<string, number | undefined> = {}
    const nextUnits: Record<string, string> = {}
    schema.inputs.forEach((input) => {
      const val = presetInputs[input.key]
      if (typeof val === "number") nextValues[input.key] = val
      if (typeof val === "string") nextUnits[input.key] = val
    })
    setValues(nextValues)
    setUnits(nextUnits)
  }, [presetInputs, schema.inputs])

  const handleSavePreset = () => {
    const name = window.prompt("Preset name")
    if (!name) return
    const compactInputs = Object.fromEntries(
      Object.entries({ ...values, ...units }).filter(([, value]) => value !== undefined),
    ) as Record<string, string | number>
    if (jobId) {
      db.presets.add({
        id: `${schema.id}-${Date.now()}`,
        calculatorId: schema.id,
        formulaId: formulaId ?? schema.id,
        name,
        inputs: compactInputs,
        createdAt: Date.now(),
        jobId,
      })
      onPresetSaved?.()
      return
    }
    addPreset({
      id: `${schema.id}-${Date.now()}`,
      calculatorId: schema.id,
      formulaId: formulaId ?? schema.id,
      name,
      inputs: compactInputs,
      createdAt: Date.now(),
    })
  }

  const presets = listPresets(schema.id)
  const history = listHistory(schema.id).slice(0, 5)

  const handleAddMaterial = async () => {
    if (!jobId) return
    if (schema.id === "estimate-sheets") {
      const sheets = results["sheets"]
      if (!sheets) return
      await db.materials.add({
        id: `mat-${Date.now()}`,
        jobId,
        name: "Sheet material",
        unit: "pcs",
        quantity: Number(sheets),
        wastePercent: Number(values["wastePercent"] ?? 0),
        createdAt: Date.now(),
      })
    }
    if (schema.id === "waste-factor") {
      const total = results["total"]
      if (!total) return
      await db.materials.add({
        id: `mat-${Date.now()}`,
        jobId,
        name: "Material total",
        unit: "pcs",
        quantity: Number(total),
        wastePercent: Number(values["wastePercent"] ?? 0),
        createdAt: Date.now(),
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {schema.inputs.map((input) => {
          const inputError = errors.find((err) => err.key === input.key)
          return (
            <div key={input.key} className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium">
                <span>{input.label}</span>
                <Badge>{input.allowUnitSelect ? units[input.key] ?? settings.lengthUnit : input.unit}</Badge>
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  min={input.min}
                  max={input.max}
                  step={input.step ?? "any"}
                  value={values[input.key] ?? ""}
                  onChange={(event) => handleChange(input.key, event.target.value)}
                  hasError={Boolean(inputError)}
                />
                {input.allowUnitSelect && (
                  <select
                    className="h-10 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elevated))] px-3 text-sm"
                    value={units[input.key] ?? settings.lengthUnit}
                    onChange={(event) => handleUnitChange(input.key, event.target.value)}
                  >
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                  </select>
                )}
              </div>
              {inputError && (
                <p className="text-xs text-rose-500">{inputError.message}</p>
              )}
            </div>
          )
        })}
      </div>

      {error && <p className="text-sm text-rose-500">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleCalculate}>Calculate</Button>
        <Button variant="secondary" onClick={handleSavePreset}>
          Save preset
        </Button>
        {jobId && (schema.id === "estimate-sheets" || schema.id === "waste-factor") && (
          <Button variant="secondary" onClick={handleAddMaterial}>
            Add to materials
          </Button>
        )}
      </div>

      {presets.length > 0 && (
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-4 py-3 text-sm">
          <p className="text-xs text-[rgb(var(--text-muted))]">Presets</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className="rounded-full border border-[rgb(var(--border))] px-3 py-1 text-xs"
                onClick={() => {
                  const nextValues: Record<string, number | undefined> = {}
                  const nextUnits: Record<string, string> = {}
                  schema.inputs.forEach((input) => {
                    const val = preset.inputs[input.key]
                    if (typeof val === "number") {
                      nextValues[input.key] = val
                    }
                    if (typeof val === "string") {
                      nextUnits[input.key] = val
                    }
                  })
                  setValues(nextValues)
                  setUnits(nextUnits)
                }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Results</p>
        <Button
          variant="secondary"
          size="sm"
          onClick={async () => {
            const payload = JSON.stringify(results, null, 2)
            await navigator.clipboard.writeText(payload)
          }}
        >
          Copy result
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {schema.outputs.map((output) => (
          <div
            key={output.key}
            className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-4 py-3 text-sm"
          >
            <p className="text-xs text-[rgb(var(--text-muted))]">{output.label}</p>
            <p className="mt-1 text-lg font-semibold">
              {results[output.key] !== undefined
                ? roundValue(results[output.key], {
                    mode:
                      output.unit === "m" || output.unit === "mm" || output.unit === "cm"
                        ? settings.roundingMode
                        : "fixed",
                    precision:
                      output.unit === "deg"
                        ? settings.rounding.angle
                        : output.unit === "m2" || output.unit === "mm2" || output.unit === "cm2"
                          ? settings.rounding.area
                          : output.unit === "m3" || output.unit === "mm3" || output.unit === "cm3"
                            ? settings.rounding.volume
                            : settings.rounding.length,
                    practicalStep: settings.practicalStep,
                  }).toFixed(output.precision ?? 3)
                : "--"}{" "}
              <span className="text-xs text-[rgb(var(--text-muted))]">
                {output.unit}
              </span>
            </p>
          </div>
        ))}
      </div>

      {history.length > 0 && (
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-4 py-3 text-sm">
          <p className="text-xs text-[rgb(var(--text-muted))]">Recent runs</p>
          <ul className="mt-2 space-y-2 text-xs">
            {history.map((run) => (
              <li key={run.id}>
                {new Date(run.timestamp).toLocaleString()} —{" "}
                {Object.entries(run.outputs)
                  .map(([key, value]) => `${key}: ${value.toFixed(3)}`)
                  .join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CalculatorWidget
