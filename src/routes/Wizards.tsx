import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"

const Wizards = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Wizards</CardTitle>
          <CardDescription>
            Guided flows to pick the right calculation fast.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <CardHeader>
            <CardTitle>Triangle Solver</CardTitle>
            <CardDescription>
              Use rise/run to get the missing side for right triangles.
            </CardDescription>
          </CardHeader>
          <a className="text-sm font-medium" href="#/formulas/pythagoras-rafter">
            Start →
          </a>
        </Card>
        <Card className="p-5">
          <CardHeader>
            <CardTitle>Roof Pitch</CardTitle>
            <CardDescription>
              Convert pitch ratios and angles, then check rafter length.
            </CardDescription>
          </CardHeader>
          <a className="text-sm font-medium" href="#/formulas/roof-pitch-angle">
            Start →
          </a>
        </Card>
        <Card className="p-5">
          <CardHeader>
            <CardTitle>Stairs</CardTitle>
            <CardDescription>
              Estimate risers and treads from total rise and run.
            </CardDescription>
          </CardHeader>
          <a className="text-sm font-medium" href="#/formulas/stairs-risers-treads">
            Start →
          </a>
        </Card>
        <Card className="p-5">
          <CardHeader>
            <CardTitle>Material Estimating</CardTitle>
            <CardDescription>
              Apply waste and estimate sheet counts quickly.
            </CardDescription>
          </CardHeader>
          <a className="text-sm font-medium" href="#/formulas/estimate-sheets">
            Start →
          </a>
        </Card>
      </div>
    </div>
  )
}

export default Wizards
