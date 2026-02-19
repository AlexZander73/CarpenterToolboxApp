import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../data/db"
import type { CalculationEntry, Job, MaterialItem, ReferenceBookmark } from "../data/db/models"
import Button from "../components/ui/Button"
import { toCsv, downloadText } from "../utils/exportCsv"

const JobReport = () => {
  const { id } = useParams()
  const [job, setJob] = useState<Job | null>(null)
  const [calculations, setCalculations] = useState<CalculationEntry[]>([])
  const [materials, setMaterials] = useState<MaterialItem[]>([])
  const [references, setReferences] = useState<ReferenceBookmark[]>([])
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (!id) return
    db.jobs.get(id).then((result) => setJob(result ?? null))
    db.calculations.where("jobId").equals(id).toArray().then(setCalculations)
    db.materials.where("jobId").equals(id).toArray().then(setMaterials)
    db.references.where("jobId").equals(id).toArray().then(setReferences)
  }, [id])

  if (!job) return null

  const exportCalcs = () => {
    const csv = toCsv(
      ["calculatorName", "timestamp", "label", "contextNote", "inputs", "outputs"],
      calculations.map((c) => ({
        calculatorName: c.calculatorName,
        timestamp: new Date(c.timestamp).toISOString(),
        label: c.label ?? "",
        contextNote: c.contextNote ?? "",
        inputs: JSON.stringify(c.inputs),
        outputs: JSON.stringify(c.outputs),
      })),
    )
    downloadText(`${job.name}-calculations.csv`, csv)
  }

  const exportMaterials = () => {
    const csv = toCsv(
      ["name", "unit", "quantity", "wastePercent", "notes"],
      materials.map((m) => ({
        name: m.name,
        unit: m.unit,
        quantity: m.quantity,
        wastePercent: m.wastePercent ?? "",
        notes: m.notes ?? "",
      })),
    )
    downloadText(`${job.name}-materials.csv`, csv)
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 bg-white p-8 text-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{job.name}</h1>
          <p className="text-sm text-slate-600">
            {job.client ? `${job.client} • ` : ""}{job.siteAddress ?? "No site address"}
          </p>
        </div>
        <div className="flex gap-2 print:hidden">
          <Button variant="secondary" onClick={() => window.print()}>
            Print / Save PDF
          </Button>
          <Button variant="secondary" onClick={exportCalcs}>
            Export calculations CSV
          </Button>
          <Button variant="secondary" onClick={exportMaterials}>
            Export materials CSV
          </Button>
          <Button variant="secondary" onClick={() => setShowDetails((v) => !v)}>
            {showDetails ? "Hide details" : "Show details"}
          </Button>
        </div>
      </div>

      {job.notes && (
        <section>
          <h2 className="text-lg font-semibold">Notes</h2>
          <p className="mt-2 text-sm text-slate-700">{job.notes}</p>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold">Materials</h2>
        {materials.length === 0 ? (
          <p className="text-sm text-slate-600">No materials recorded.</p>
        ) : (
          <table className="mt-2 w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Item</th>
                <th className="py-2 text-left">Qty</th>
                <th className="py-2 text-left">Unit</th>
                <th className="py-2 text-left">Waste %</th>
                <th className="py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => (
                <tr key={m.id} className="border-b">
                  <td className="py-2">{m.name}</td>
                  <td className="py-2">{m.quantity}</td>
                  <td className="py-2">{m.unit}</td>
                  <td className="py-2">{m.wastePercent ?? 0}</td>
                  <td className="py-2">{m.notes ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold">Calculations</h2>
        {calculations.length === 0 ? (
          <p className="text-sm text-slate-600">No calculations recorded.</p>
        ) : (
          <ul className="mt-2 space-y-3 text-sm">
            {calculations.map((c) => (
              <li key={c.id} className="rounded-xl border border-slate-200 p-3">
                <p className="font-medium">{c.calculatorName}</p>
                <p className="text-xs text-slate-600">
                  {new Date(c.timestamp).toLocaleString()} • {c.label ?? "No label"}
                </p>
                <p className="text-xs text-slate-600">
                  Outputs: {JSON.stringify(c.outputs)}
                </p>
                {showDetails && (
                  <div className="mt-2 text-xs text-slate-600">
                    <p>Inputs: {JSON.stringify(c.inputs)}</p>
                    {c.steps && c.steps.length > 0 && (
                      <p>Steps: {c.steps.join(" | ")}</p>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold">Reference bookmarks</h2>
        {references.length === 0 ? (
          <p className="text-sm text-slate-600">No references saved.</p>
        ) : (
          <ul className="mt-2 space-y-2 text-sm">
            {references.map((r) => (
              <li key={r.id}>
                {r.title} — {r.type} ({r.sourceUrl})
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="pt-4 text-xs text-slate-500">
        Generated {new Date().toLocaleString()}. Study tool only, not professional advice.
      </footer>
    </div>
  )
}

export default JobReport
