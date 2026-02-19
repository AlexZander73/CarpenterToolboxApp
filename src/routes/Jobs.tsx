import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { db } from "../data/db"
import type { Job } from "../data/db/models"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import SegmentedControl from "../components/ui/SegmentedControl"

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<"active" | "archived">("active")
  const [sort, setSort] = useState<"recent" | "name">("recent")
  const [name, setName] = useState("")
  const [client, setClient] = useState("")
  const [siteAddress, setSiteAddress] = useState("")
  const [notes, setNotes] = useState("")

  const loadJobs = async () => {
    const data = await db.jobs.toArray()
    setJobs(data)
  }

  useEffect(() => {
    loadJobs()
  }, [])

  const filtered = useMemo(() => {
    const lower = query.toLowerCase()
    const list = jobs.filter(
      (job) =>
        job.status === status &&
        `${job.name} ${job.client ?? ""} ${job.siteAddress ?? ""}`
          .toLowerCase()
          .includes(lower),
    )
    if (sort === "name") {
      return [...list].sort((a, b) => a.name.localeCompare(b.name))
    }
    return [...list].sort((a, b) => b.updatedAt - a.updatedAt)
  }, [jobs, query, status, sort])

  const handleCreate = async () => {
    if (!name.trim()) return
    const now = Date.now()
    await db.jobs.add({
      id: `job-${now}`,
      name: name.trim(),
      client: client.trim() || undefined,
      siteAddress: siteAddress.trim() || undefined,
      notes: notes.trim() || undefined,
      status: "active",
      pinnedCalculators: [],
      createdAt: now,
      updatedAt: now,
    })
    setName("")
    setClient("")
    setSiteAddress("")
    setNotes("")
    loadJobs()
  }

  const handleArchive = async (job: Job) => {
    await db.jobs.update(job.id, { status: "archived", updatedAt: Date.now() })
    loadJobs()
  }

  const handleDuplicate = async (job: Job) => {
    const now = Date.now()
    await db.jobs.add({
      ...job,
      id: `job-${now}`,
      name: `${job.name} (Copy)`,
      status: "active",
      createdAt: now,
      updatedAt: now,
    })
    loadJobs()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Jobs</CardTitle>
          <CardDescription>
            Create job folders with calculations, materials, and references.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <div className="grid gap-3 md:grid-cols-2">
          <Input placeholder="Job name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Client name" value={client} onChange={(e) => setClient(e.target.value)} />
          <Input placeholder="Site address" value={siteAddress} onChange={(e) => setSiteAddress(e.target.value)} />
          <Input placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <div className="mt-3">
          <Button onClick={handleCreate}>Create Job</Button>
        </div>
      </Card>

      <Card>
        <div className="flex flex-wrap items-center gap-3">
          <Input
            placeholder="Search jobs"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <SegmentedControl
            options={[
              { value: "active", label: "Active" },
              { value: "archived", label: "Archived" },
            ]}
            value={status}
            onChange={(value) => setStatus(value as "active" | "archived")}
          />
          <SegmentedControl
            options={[
              { value: "recent", label: "Recent" },
              { value: "name", label: "Name" },
            ]}
            value={sort}
            onChange={(value) => setSort(value as "recent" | "name")}
          />
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card>
          <p className="text-sm text-[rgb(var(--text-muted))]">
            No jobs yet. Create your first job to start tracking work.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((job) => (
            <Card key={job.id} className="p-5">
              <CardHeader>
                <CardTitle>{job.name}</CardTitle>
                <CardDescription>
                  {job.client ? `${job.client} • ` : ""}
                  {job.siteAddress ?? "No site address"}
                </CardDescription>
              </CardHeader>
              <div className="flex flex-wrap gap-2 text-xs text-[rgb(var(--text-muted))]">
                Updated {new Date(job.updatedAt).toLocaleDateString()}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to={`/jobs/${job.id}`}>
                  <Button variant="secondary">Open</Button>
                </Link>
                <Button variant="secondary" onClick={() => handleDuplicate(job)}>
                  Duplicate
                </Button>
                {job.status === "active" && (
                  <Button variant="secondary" onClick={() => handleArchive(job)}>
                    Archive
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Jobs
