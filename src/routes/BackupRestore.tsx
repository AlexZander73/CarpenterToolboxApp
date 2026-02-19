import { useState } from "react"
import { db } from "../data/db"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"

const BackupRestore = () => {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const blobToBase64 = (blob: Blob) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(String(reader.result))
      reader.onerror = () => reject(new Error("Failed to read blob"))
      reader.readAsDataURL(blob)
    })

  const base64ToBlob = async (data: string) => {
    const res = await fetch(data)
    return res.blob()
  }

  const backup = async () => {
    const rawAttachments = await db.attachments.toArray()
    const attachments = await Promise.all(
      rawAttachments.map(async (att) => ({
        ...att,
        blob: undefined,
        data: await blobToBase64(att.blob),
      })),
    )
    const payload = {
      jobs: await db.jobs.toArray(),
      jobNotes: await db.jobNotes.toArray(),
      calculations: await db.calculations.toArray(),
      presets: await db.presets.toArray(),
      materials: await db.materials.toArray(),
      references: await db.references.toArray(),
      attachments,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `carpentry-companion-backup-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const restore = async () => {
    if (!file) return
    const confirmed = window.confirm(
      "Restoring will overwrite current local data. Continue?",
    )
    if (!confirmed) return
    const text = await file.text()
    const payload = JSON.parse(text)
    const attachmentPayload = await Promise.all(
      (payload.attachments || []).map(async (att: any) => ({
        ...att,
        blob: att.data ? await base64ToBlob(att.data) : att.blob,
      })),
    )

    await db.transaction(
      "rw",
      [db.jobs, db.jobNotes, db.calculations, db.presets, db.materials, db.references, db.attachments],
      async () => {
      await db.jobs.clear()
      await db.jobNotes.clear()
      await db.calculations.clear()
      await db.presets.clear()
      await db.materials.clear()
      await db.references.clear()
      await db.attachments.clear()
      await db.jobs.bulkAdd(payload.jobs || [])
      await db.jobNotes.bulkAdd(payload.jobNotes || [])
      await db.calculations.bulkAdd(payload.calculations || [])
      await db.presets.bulkAdd(payload.presets || [])
      await db.materials.bulkAdd(payload.materials || [])
      await db.references.bulkAdd(payload.references || [])
      await db.attachments.bulkAdd(attachmentPayload || [])
    },
    )
    setStatus("Restore completed.")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Backup & Restore</CardTitle>
          <CardDescription>
            Export all local data to a single JSON backup or restore from a file.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <Button onClick={backup}>Export backup</Button>
      </Card>
      <Card>
        <div className="space-y-3">
          <Input
            type="file"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
          <Button variant="secondary" onClick={restore}>
            Restore backup
          </Button>
          {status && <p className="text-sm text-[rgb(var(--text-muted))]">{status}</p>}
        </div>
      </Card>
    </div>
  )
}

export default BackupRestore
