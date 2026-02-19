import { areaRectangle } from "./areaRectangle"
import { areaTriangle } from "./areaTriangle"
import { areaCircle } from "./areaCircle"
import { volumeRectangular } from "./volumeRectangular"
import { pythagorasRafter } from "./pythagorasRafter"
import { roofPitchToDegrees, degreesToPitchRatio } from "./roofPitch"
import { mitreAngle } from "./mitreAngle"
import { stairsRisersTreads } from "./stairsRisersTreads"
import { boardFeetMetric } from "./boardFeetMetric"
import { wasteFactor } from "./wasteFactor"
import {
  convertLength,
  convertArea,
  convertVolume,
  slopePercentToDegrees,
  rafterLengthFromRunAngle,
  estimateSheets,
  areaToVolume,
} from "./conversions"

const calculators = {
  areaRectangle,
  areaTriangle,
  areaCircle,
  volumeRectangular,
  pythagorasRafter,
  roofPitchToDegrees,
  degreesToPitchRatio,
  mitreAngle,
  stairsRisersTreads,
  boardFeetMetric,
  wasteFactor,
  convertLength,
  convertArea,
  convertVolume,
  slopePercentToDegrees,
  rafterLengthFromRunAngle,
  estimateSheets,
  areaToVolume,
}

export default calculators
