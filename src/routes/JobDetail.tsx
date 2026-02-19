import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import repository from "../data/repository"
import { db } from "../data/db"
import type { Formula } from "../engine/calcTypes"
import type {
  Attachment,
  CalculationEntry,
  Job,
  MaterialItem,
  Preset,
  ReferenceBookmark,
} from "../data/db/models"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import SegmentedControl from "../components/ui/SegmentedControl"
import CalculatorWidget from "../components/Calculator/CalculatorWidget"
import { renderMarkdownLite } from "../utils/markdownLite"

const JobDetail = () => {
  const { id } = useParams()
  const [job, setJob] = useState<Job | null>(null)
  const [tab, setTab] = useState("overview")
  const [formulas, setFormulas] = useState<Formula[]>([])
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>("")
  const [formulaQuery, setFormulaQuery] = useState("")
  const [label, setLabel] = useState("")
  const [contextNote, setContextNote] = useState("")
  const [calculations, setCalculations] = useState<CalculationEntry[]>([])
  const [materials, setMaterials] = useState<MaterialItem[]>([])
  const [references, setReferences] = useState<ReferenceBookmark[]>([])
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [jobPresets, setJobPresets] = useState<Preset[]>([])
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null)
  const [notesDraft, setNotesDraft] = useState("")
  const totalAttachmentSize = attachments.reduce((sum, att) => sum + (att.size || 0), 0)

  useEffect(() => {
    if (!id) return
    db.jobs.get(id).then((result) => {
      setJob(result ?? null)
      setNotesDraft(result?.notes ?? "")
    })
    repository.listFormulas().then((list) => setFormulas(list))
  }, [id])

  const loadJobData = async () => {
    if (!id) return
    const calc = await db.calculations.where("jobId").equals(id).toArray()
    const mats = await db.materials.where("jobId").equals(id).toArray()
    const refs = await db.references.where("jobId").equals(id).toArray()
    const atts = await db.attachments.where("jobId").equals(id).toArray()
    const presets = await db.presets.where("jobId").equals(id).toArray()
    setCalculations(calc.sort((a, b) => b.timestamp - a.timestamp))
    setMaterials(mats)
    setReferences(refs)
    setAttachments(atts)
    setJobPresets(presets)
  }

  useEffect(() => {
    loadJobData()
  }, [id])

  const selectedFormula = useMemo(
    () => formulas.find((f) => f.id === selectedFormulaId),
    [formulas, selectedFormulaId],
  )

  const pinnedFormulas = useMemo(
    () =>
      formulas.filter((formula) =>
        (job?.pinnedCalculators ?? []).includes(formula.id),
      ),
    [formulas, job?.pinnedCalculators],
  )

  if (!job) {
    return (
      <Card>
        <p className="text-sm text-[rgb(var(--text-muted))]">Job not found.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{job.name}</CardTitle>
          <CardDescription>
            {job.client ? `${job.client} • ` : ""}
            {job.siteAddress ?? "No site address"}
          </CardDescription>
        </CardHeader>
        <div className="flex flex-wrap gap-2">
          <a className="text-sm underline" href={`#/jobs/${job.id}/report`}>
            Open job report
          </a>
        </div>
        {job.notes && (
          <p className="text-sm text-[rgb(var(--text-muted))]">{job.notes}</p>
        )}
      </Card>

      <SegmentedControl
        options={[
          { value: "overview", label: "Overview" },
          { value: "calculations", label: "Calculations" },
          { value: "presets", label: "Presets" },
          { value: "materials", label: "Materials" },
          { value: "references", label: "References" },
        ]}
        value={tab}
        onChange={setTab}
      />

      {tab === "overview" && (
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Quick calculators, notes, and recent activity for this job.
            </CardDescription>
          </CardHeader>
          <div className="space-y-3">
            <label className="text-xs font-semibold text-[rgb(var(--text-muted))]">
              Notes (Markdown supported)
            </label>
            <textarea
              className="min-h-[120px] w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elevated))] p-3 text-sm"
              value={notesDraft}
              onChange={(event) => setNotesDraft(event.target.value)}
            />
            <Button
              variant="secondary"
              onClick={async () => {
                await db.jobs.update(job.id, { notes: notesDraft, updatedAt: Date.now() })
                const updated = await db.jobs.get(job.id)
                setJob(updated ?? null)
              }}
            >
              Save notes
            </Button>
            {notesDraft.trim().length > 0 && (
              <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-3 text-sm">
                <p className="text-xs text-[rgb(var(--text-muted))]">Preview</p>
                <div className="mt-2 space-y-2">
                  {renderMarkdownLite(notesDraft).map((block) => {
                    if (block.type === "h3") {
                      return (
                        <h3 key={block.key} className="text-sm font-semibold">
                          {block.content}
                        </h3>
                      )
                    }
                    if (block.type === "h4") {
                      return (
                        <h4 key={block.key} className="text-sm font-medium">
                          {block.content}
                        </h4>
                      )
                    }
                    if (block.type === "li") {
                      return (
                        <li key={block.key} className="ml-5 list-disc">
                          {block.content}
                        </li>
                      )
                    }
                    return (
                      <p key={block.key} className="text-sm text-[rgb(var(--text-muted))]">
                        {block.content}
                      </p>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
          <p className="text-sm text-[rgb(var(--text-muted))]">
            Recent calculations: {calculations.length}
          </p>
          <div className="mt-3">
            <p className="text-xs font-semibold text-[rgb(var(--text-muted))]">
              Job pinned calculators
            </p>
            {pinnedFormulas.length === 0 ? (
              <p className="text-sm text-[rgb(var(--text-muted))]">
                Pin calculators from the calculations tab.
              </p>
            ) : (
              <ul className="mt-2 space-y-2 text-sm">
                {pinnedFormulas.map((formula) => (
                  <li key={formula.id} className="flex items-center justify-between">
                    <span>{formula.title}</span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setSelectedFormulaId(formula.id)
                        setTab("calculations")
                      }}
                    >
                      Open
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="text-xs text-[rgb(var(--text-muted))]">
            Attachment storage: {(totalAttachmentSize / 1024 / 1024).toFixed(2)} MB
          </p>
          {totalAttachmentSize > 50 * 1024 * 1024 && (
            <p className="text-xs text-amber-500">
              Storage usage is high. Consider exporting and removing large files.
            </p>
          )}
          <AttachmentPanel jobId={job.id} onSaved={loadJobData} items={attachments} />
        </Card>
      )}

      {tab === "calculations" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Calculation</CardTitle>
              <CardDescription>
                Choose a calculator, add context, then run and save it to this job.
              </CardDescription>
            </CardHeader>
            <div className="grid gap-3 md:grid-cols-2">
              <Input
                placeholder="Search calculators"
                value={formulaQuery}
                onChange={(event) => setFormulaQuery(event.target.value)}
              />
              <select
                className="h-10 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elevated))] px-3 text-sm"
                value={selectedFormulaId}
                onChange={(event) => {
                  setSelectedFormulaId(event.target.value)
                  setSelectedPreset(null)
                }}
              >
                <option value="">Select calculator</option>
                {formulas
                  .filter((formula) =>
                    formula.title.toLowerCase().includes(formulaQuery.toLowerCase()),
                  )
                  .map((formula) => (
                  <option key={formula.id} value={formula.id}>
                    {formula.title}
                  </option>
                  ))}
              </select>
              <Input
                placeholder="Label (e.g. Rafter length – front porch)"
                value={label}
                onChange={(event) => setLabel(event.target.value)}
              />
              <Input
                placeholder="Context note"
                value={contextNote}
                onChange={(event) => setContextNote(event.target.value)}
              />
            </div>
            {selectedFormula && (
              <div className="mt-4">
                <div className="mb-3 flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={async () => {
                      const pinned = job.pinnedCalculators ?? []
                      const exists = pinned.includes(selectedFormula.id)
                      const next = exists
                        ? pinned.filter((item) => item !== selectedFormula.id)
                        : [...pinned, selectedFormula.id]
                      await db.jobs.update(job.id, {
                        pinnedCalculators: next,
                        updatedAt: Date.now(),
                      })
                      const updated = await db.jobs.get(job.id)
                      setJob(updated ?? null)
                    }}
                  >
                    {(job.pinnedCalculators ?? []).includes(selectedFormula.id)
                      ? "Unpin from Job"
                      : "Pin to Job"}
                  </Button>
                </div>
                <CalculatorWidget
                  schema={selectedFormula.calculator}
                  formulaId={selectedFormula.id}
                  jobId={job.id}
                  contextLabel={label}
                  contextNote={contextNote}
                  audit={{
                    equation: selectedFormula.equation ?? selectedFormula.title,
                    steps: selectedFormula.steps,
                    sanityChecks: [selectedFormula.verification],
                  }}
                  presetInputs={selectedPreset?.inputs}
                  onPresetSaved={loadJobData}
                />
                <div className="mt-3">
                  <Button variant="secondary" onClick={loadJobData}>
                    Refresh job log
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {calculations.length === 0 ? (
            <Card>
              <p className="text-sm text-[rgb(var(--text-muted))]">
                No calculations yet.
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {calculations.map((entry) => (
                <Card key={entry.id} className="p-5">
                  <CardHeader>
                    <CardTitle>{entry.calculatorName}</CardTitle>
                    <CardDescription>
                      {entry.label ?? "No label"} •{" "}
                      {new Date(entry.timestamp).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  {entry.locked && (
                    <p className="text-xs text-amber-500">Locked</p>
                  )}
                  {entry.contextNote && (
                    <p className="text-sm text-[rgb(var(--text-muted))]">
                      {entry.contextNote}
                    </p>
                  )}
                  <details className="mt-3 text-sm">
                    <summary className="cursor-pointer">Details</summary>
                    <div className="mt-2 space-y-2">
                      <p className="text-xs text-[rgb(var(--text-muted))]">
                        Formula used: {entry.equation || entry.calculatorName}
                      </p>
                      {entry.steps && entry.steps.length > 0 && (
                        <div>
                          <p className="text-xs text-[rgb(var(--text-muted))]">Steps</p>
                          <ul className="list-disc pl-5 text-xs">
                            {entry.steps.map((step, index) => (
                              <li key={`${entry.id}-step-${index}`}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {entry.conversions && entry.conversions.length > 0 && (
                        <div>
                          <p className="text-xs text-[rgb(var(--text-muted))]">
                            Unit conversions
                          </p>
                          <ul className="list-disc pl-5 text-xs">
                            {entry.conversions.map((item, index) => (
                              <li key={`${entry.id}-conv-${index}`}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {entry.sanityChecks && entry.sanityChecks.length > 0 && (
                        <div>
                          <p className="text-xs text-[rgb(var(--text-muted))]">
                            Sanity checks
                          </p>
                          <ul className="list-disc pl-5 text-xs">
                            {entry.sanityChecks.map((item, index) => (
                              <li key={`${entry.id}-san-${index}`}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-[rgb(var(--text-muted))]">Inputs</p>
                        <pre className="text-xs">{JSON.stringify(entry.inputs, null, 2)}</pre>
                      </div>
                      <div>
                        <p className="text-xs text-[rgb(var(--text-muted))]">Outputs</p>
                        <pre className="text-xs">{JSON.stringify(entry.outputs, null, 2)}</pre>
                      </div>
                      <div>
                        <p className="text-xs text-[rgb(var(--text-muted))]">Rounding</p>
                        <pre className="text-xs">{JSON.stringify(entry.rounding, null, 2)}</pre>
                      </div>
                    </div>
                  </details>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      className="text-xs underline"
                      href={`#/jobs/${job.id}/calculations/${entry.id}/slip`}
                    >
                      Export slip
                    </a>
                    <button
                      className="text-xs underline"
                      onClick={() => {
                        const params = new URLSearchParams()
                        Object.entries(entry.inputs).forEach(([key, value]) =>
                          params.set(key, String(value)),
                        )
                        const url = `${window.location.origin}/#/formulas/${entry.calculatorId}?${params.toString()}`
                        navigator.clipboard.writeText(url)
                      }}
                    >
                      Copy share link
                    </button>
                    <span className="text-xs text-[rgb(var(--text-muted))]">
                      Links stay local, can be long, and are not encrypted.
                    </span>
                    <button
                      className="text-xs underline"
                      onClick={async () => {
                        await db.calculations.update(entry.id, {
                          locked: !entry.locked,
                        })
                        loadJobData()
                      }}
                    >
                      {entry.locked ? "Unlock" : "Lock"}
                    </button>
                    <button
                      className="text-xs underline"
                      onClick={async () => {
                        await db.calculations.add({
                          ...entry,
                          id: `calc-${Date.now()}`,
                          timestamp: Date.now(),
                          locked: false,
                        })
                        loadJobData()
                      }}
                    >
                      Duplicate entry
                    </button>
                  </div>
                  <AttachmentPanel
                    jobId={job.id}
                    calculationId={entry.id}
                    onSaved={loadJobData}
                    items={attachments.filter((att) => att.calculationId === entry.id)}
                  />
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "presets" && (
        <Card>
          <CardHeader>
            <CardTitle>Job presets</CardTitle>
            <CardDescription>Saved presets for this job only.</CardDescription>
          </CardHeader>
          {jobPresets.length === 0 ? (
            <p className="text-sm text-[rgb(var(--text-muted))]">
              Save a preset from a calculation to see it here.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
            {jobPresets.map((preset) => (
              <li key={preset.id} className="flex items-center justify-between">
                <span>{preset.name}</span>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSelectedFormulaId(preset.formulaId ?? preset.calculatorId)
                      setSelectedPreset(preset)
                      setTab("calculations")
                    }}
                  >
                    Load
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={async () => {
                      await db.presets.delete(preset.id)
                      loadJobData()
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
            </ul>
          )}
        </Card>
      )}

      {tab === "materials" && (
        <Card>
          <CardHeader>
            <CardTitle>Materials</CardTitle>
            <CardDescription>Takeoff list for this job.</CardDescription>
          </CardHeader>
          <MaterialEditor jobId={job.id} onSaved={loadJobData} items={materials} />
        </Card>
      )}

      {tab === "references" && (
        <Card>
          <CardHeader>
            <CardTitle>Reference bookmarks</CardTitle>
            <CardDescription>
              Keep clause IDs and standards identifiers for this job.
            </CardDescription>
          </CardHeader>
          <ReferenceEditor jobId={job.id} onSaved={loadJobData} items={references} />
        </Card>
      )}
    </div>
  )
}

const MaterialEditor = ({
  jobId,
  onSaved,
  items,
}: {
  jobId: string
  onSaved: () => void
  items: MaterialItem[]
}) => {
  const [name, setName] = useState("")
  const [unit, setUnit] = useState<MaterialItem["unit"]>("pcs")
  const [quantity, setQuantity] = useState(0)
  const [wastePercent, setWastePercent] = useState(10)
  const [notes, setNotes] = useState("")

  const addMaterial = async () => {
    if (!name.trim()) return
    await db.materials.add({
      id: `mat-${Date.now()}`,
      jobId,
      name,
      unit,
      quantity,
      wastePercent,
      notes: notes || undefined,
      createdAt: Date.now(),
    })
    setName("")
    setQuantity(0)
    setNotes("")
    onSaved()
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Input placeholder="Item name" value={name} onChange={(e) => setName(e.target.value)} />
        <select
          className="h-10 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elevated))] px-3 text-sm"
          value={unit}
          onChange={(e) => setUnit(e.target.value as MaterialItem["unit"])}
        >
          <option value="pcs">pcs</option>
          <option value="m">m</option>
          <option value="m2">m²</option>
          <option value="m3">m³</option>
        </select>
        <Input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Waste %"
          value={wastePercent}
          onChange={(e) => setWastePercent(Number(e.target.value))}
        />
        <Input placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      <Button onClick={addMaterial}>Add material</Button>
      {items.length === 0 ? (
        <p className="text-sm text-[rgb(var(--text-muted))]">No materials yet.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <span>
                {item.name} — {item.quantity} {item.unit} (waste {item.wastePercent ?? 0}
                %)
              </span>
              <button
                className="text-xs text-rose-500"
                onClick={async () => {
                  await db.materials.delete(item.id)
                  onSaved()
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const ReferenceEditor = ({
  jobId,
  onSaved,
  items,
}: {
  jobId: string
  onSaved: () => void
  items: ReferenceBookmark[]
}) => {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [sourceUrl, setSourceUrl] = useState("")
  const [type, setType] = useState<ReferenceBookmark["type"]>("NCC")

  const addReference = async () => {
    if (!title.trim() || !sourceUrl.trim()) return
    await db.references.add({
      id: `ref-${Date.now()}`,
      jobId,
      title,
      summary,
      sourceUrl,
      type,
      createdAt: Date.now(),
    })
    setTitle("")
    setSummary("")
    setSourceUrl("")
    onSaved()
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Input placeholder="Identifier" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Official link" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} />
        <Input placeholder="Summary (original)" value={summary} onChange={(e) => setSummary(e.target.value)} />
        <select
          className="h-10 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elevated))] px-3 text-sm"
          value={type}
          onChange={(e) => setType(e.target.value as ReferenceBookmark["type"])}
        >
          <option value="NCC">NCC</option>
          <option value="Standard">Standard</option>
        </select>
      </div>
      <Button onClick={addReference}>Add reference</Button>
      {items.length === 0 ? (
        <p className="text-sm text-[rgb(var(--text-muted))]">No references yet.</p>
      ) : (
        <ul className="space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                <span>
                  {item.title} — {item.type}{" "}
                  <a className="underline" href={item.sourceUrl} target="_blank" rel="noreferrer">
                    Link
                  </a>
                  {item.summary ? (
                    <span className="ml-2 text-xs text-[rgb(var(--text-muted))]">
                      {item.summary}
                    </span>
                  ) : null}
                </span>
                <button
                className="text-xs text-rose-500"
                onClick={async () => {
                  await db.references.delete(item.id)
                  onSaved()
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const AttachmentPanel = ({
  jobId,
  calculationId,
  onSaved,
  items,
}: {
  jobId: string
  calculationId?: string
  onSaved: () => void
  items: Attachment[]
}) => {
  const handleUpload = async (file: File) => {
    await db.attachments.add({
      id: `att-${Date.now()}`,
      jobId,
      calculationId,
      name: file.name,
      type: file.type,
      size: file.size,
      createdAt: Date.now(),
      blob: file,
    })
    onSaved()
  }

  const handleDelete = async (id: string) => {
    await db.attachments.delete(id)
    onSaved()
  }

  const handleRename = async (id: string, current: string) => {
    const next = window.prompt("Rename attachment", current)
    if (!next) return
    await db.attachments.update(id, { name: next })
    onSaved()
  }

  return (
    <div className="mt-4 space-y-2 text-sm">
      <label className="text-xs font-semibold text-[rgb(var(--text-muted))]">
        Attachments
      </label>
      <input
        type="file"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) handleUpload(file)
        }}
      />
      {items.length > 0 && (
        <ul className="grid gap-2 text-xs md:grid-cols-2">
          {items.map((att) => (
            <li key={att.id} className="rounded-lg border border-[rgb(var(--border))] p-2">
              {att.type?.startsWith("image/") && att.blob && (
                <img
                  src={URL.createObjectURL(att.blob)}
                  alt={att.name}
                  className="mb-2 h-24 w-full rounded object-cover"
                />
              )}
              <div className="flex items-center justify-between">
                <span className="truncate">{att.name}</span>
                <div className="flex gap-2">
                  <button
                    className="text-xs text-[rgb(var(--text))]"
                    onClick={() => handleRename(att.id, att.name)}
                  >
                    Rename
                  </button>
                  <button className="text-rose-500" onClick={() => handleDelete(att.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default JobDetail
