export const renderMarkdownLite = (text: string) => {
  const lines = text.split("\n")
  return lines.map((line, index) => {
    if (line.startsWith("## ")) {
      return { type: "h4", key: index, content: line.slice(3) }
    }
    if (line.startsWith("# ")) {
      return { type: "h3", key: index, content: line.slice(2) }
    }
    if (line.startsWith("- ")) {
      return { type: "li", key: index, content: line.slice(2) }
    }
    return { type: "p", key: index, content: line }
  })
}
