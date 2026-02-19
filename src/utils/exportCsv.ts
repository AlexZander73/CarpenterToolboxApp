export const toCsv = (headers: string[], rows: Array<Record<string, string | number>>) => {
  const escape = (value: string | number) =>
    `"${String(value).replace(/"/g, '""')}"`
  const lines = [
    headers.map(escape).join(","),
    ...rows.map((row) => headers.map((key) => escape(row[key] ?? "")).join(",")),
  ]
  return lines.join("\n")
}

export const downloadText = (filename: string, content: string) => {
  const blob = new Blob([content], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
