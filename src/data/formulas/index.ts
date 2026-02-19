import type { Formula } from "../../engine/calcTypes"
import areaRectangle from "./area-rectangle.json"
import areaTriangle from "./area-triangle.json"
import areaCircle from "./area-circle.json"
import volumeRectangular from "./volume-rectangular-prism.json"
import pythagorasRafter from "./pythagoras-rafter.json"
import roofPitchAngle from "./roof-pitch-angle.json"
import roofPitchRatio from "./roof-pitch-ratio.json"
import mitreAngle from "./mitre-angle-basics.json"
import stairs from "./stairs-risers-treads.json"
import boardFeet from "./board-feet-metric.json"
import wasteFactor from "./waste-factor.json"
import unitConvertLength from "./unit-convert-length.json"
import unitConvertArea from "./unit-convert-area.json"
import unitConvertVolume from "./unit-convert-volume.json"
import slopePercent from "./slope-percent.json"
import rafterLength from "./rafter-length-run-rise.json"
import estimateSheets from "./estimate-sheets.json"
import areaToVolume from "./conversion-area-m2-to-m3.json"

const formulas: Formula[] = [
  areaRectangle as Formula,
  areaTriangle as Formula,
  areaCircle as Formula,
  volumeRectangular as Formula,
  pythagorasRafter as Formula,
  roofPitchAngle as Formula,
  roofPitchRatio as Formula,
  mitreAngle as Formula,
  stairs as Formula,
  boardFeet as Formula,
  wasteFactor as Formula,
  unitConvertLength as Formula,
  unitConvertArea as Formula,
  unitConvertVolume as Formula,
  slopePercent as Formula,
  rafterLength as Formula,
  estimateSheets as Formula,
  areaToVolume as Formula,
]

export default formulas
