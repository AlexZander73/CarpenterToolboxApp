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
    media: {
      image: "/illustrations/lessons/reading-tape.svg",
      photo: {
        src: "https://images.pexels.com/photos/4048078/pexels-photo-4048078.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Tape measure on timber",
        credit: "Photo by Erik Mclean / Pexels",
        sourceUrl: "https://www.pexels.com/photo/close-up-photo-of-measuring-tape-4048078/",
        license: "Pexels License",
      },
    },
  },
  {
    id: "set-out-fundamentals",
    title: "Set-out Fundamentals",
    summary: "Reliable set-out habits that prevent compounding errors.",
    tags: ["set-out", "layout"],
    content: setOutFundamentals,
    media: {
      image: "/illustrations/lessons/set-out-fundamentals.svg",
      photo: {
        src: "https://images.pexels.com/photos/7483040/pexels-photo-7483040.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Carpentry tools and plans",
        credit: "Photo by cottonbro studio / Pexels",
        sourceUrl: "https://www.pexels.com/photo/tools-in-a-carpentry-7483040/",
        license: "Pexels License",
      },
    },
  },
  {
    id: "right-triangles",
    title: "Right Triangles on Site",
    summary: "Use Pythagoras for framing checks and set-out.",
    tags: ["geometry", "roofing"],
    content: rightTriangles,
    media: {
      image: "/illustrations/lessons/right-triangles.svg",
      photo: {
        src: "https://images.pexels.com/photos/7483040/pexels-photo-7483040.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Carpentry tools and plans",
        credit: "Photo by cottonbro studio / Pexels",
        sourceUrl: "https://www.pexels.com/photo/tools-in-a-carpentry-7483040/",
        license: "Pexels License",
      },
    },
  },
  {
    id: "roofing-pitch",
    title: "Roofing Pitch and What the Numbers Mean",
    summary: "Translate pitch ratios into practical set-out decisions.",
    tags: ["roofing", "pitch"],
    content: roofingPitch,
    media: {
      image: "/illustrations/lessons/roofing-pitch.svg",
      photo: {
        src: "https://images.pexels.com/photos/31763538/pexels-photo-31763538.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Roof framing under construction",
        credit: "Photo by Clément Proust / Pexels",
        sourceUrl:
          "https://www.pexels.com/photo/roof-construction-with-red-tiles-and-wooden-framework-31763538/",
        license: "Pexels License",
      },
    },
  },
  {
    id: "stair-comfort",
    title: "Stair Comfort Rules of Thumb",
    summary: "Heuristics for comfortable stair layouts (not code).",
    tags: ["stairs", "comfort"],
    content: stairComfort,
    media: {
      image: "/illustrations/lessons/stair-comfort.svg",
      photo: {
        src: "https://images.pexels.com/photos/7667625/pexels-photo-7667625.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Carpenters building a staircase",
        credit: "Photo by Андрей Филоненко / Pexels",
        sourceUrl: "https://www.pexels.com/photo/carpenters-building-a-staircase-7667625/",
        license: "Pexels License",
      },
    },
  },
  {
    id: "estimating-mindset",
    title: "Estimating Mindset: Allowances, Waste, Cuts",
    summary: "Build a repeatable estimating workflow.",
    tags: ["estimating", "waste"],
    content: estimatingMindset,
    media: {
      image: "/illustrations/lessons/estimating-mindset.svg",
      photo: {
        src: "https://images.pexels.com/photos/30285503/pexels-photo-30285503.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Stack of timber boards",
        credit: "Photo by Jean Marc Pampuch / Pexels",
        sourceUrl: "https://www.pexels.com/photo/stack-of-freshly-cut-lumber-in-sunlight-30285503/",
        license: "Pexels License",
      },
    },
  },
]

export default lessons
