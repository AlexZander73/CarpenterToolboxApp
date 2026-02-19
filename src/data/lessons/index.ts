import type { Lesson } from "../../engine/calcTypes"
import readingTape from "./reading-tape.md?raw"
import setOutFundamentals from "./set-out-fundamentals.md?raw"
import rightTriangles from "./right-triangles.md?raw"
import roofingPitch from "./roofing-pitch.md?raw"
import stairComfort from "./stair-comfort.md?raw"
import estimatingMindset from "./estimating-mindset.md?raw"

const lessons: Lesson[] = [
  {
    id: "reading-tape",
    title: "Reading a Tape Measure (Metric)",
    summary: "How to read a metric tape quickly and accurately.",
    tags: ["measurement", "fundamentals"],
    content: readingTape,
  },
  {
    id: "set-out-fundamentals",
    title: "Set-out Fundamentals",
    summary: "Reliable set-out habits that prevent compounding errors.",
    tags: ["set-out", "layout"],
    content: setOutFundamentals,
  },
  {
    id: "right-triangles",
    title: "Right Triangles on Site",
    summary: "Use Pythagoras for framing checks and set-out.",
    tags: ["geometry", "roofing"],
    content: rightTriangles,
  },
  {
    id: "roofing-pitch",
    title: "Roofing Pitch and What the Numbers Mean",
    summary: "Translate pitch ratios into practical set-out decisions.",
    tags: ["roofing", "pitch"],
    content: roofingPitch,
  },
  {
    id: "stair-comfort",
    title: "Stair Comfort Rules of Thumb",
    summary: "Heuristics for comfortable stair layouts (not code).",
    tags: ["stairs", "comfort"],
    content: stairComfort,
  },
  {
    id: "estimating-mindset",
    title: "Estimating Mindset: Allowances, Waste, Cuts",
    summary: "Build a repeatable estimating workflow.",
    tags: ["estimating", "waste"],
    content: estimatingMindset,
  },
]

export default lessons
