import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import SegmentedControl from "../components/ui/SegmentedControl"
import Input from "../components/ui/Input"
import type { Settings } from "../state/settingsStore"
import { useSettings } from "../state/settingsStore"
import { DATA_VERSION } from "../data/versions"
import { Link } from "react-router-dom"

const SettingsPage = () => {
  const { settings, setSettings } = useSettings()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Units, rounding, waste defaults, and theme controls.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium">Preferred length unit</p>
            <SegmentedControl
              options={[
                { value: "mm", label: "mm" },
                { value: "cm", label: "cm" },
                { value: "m", label: "m" },
              ]}
              value={settings.lengthUnit}
              onChange={(value) =>
                setSettings((prev) => ({ ...prev, lengthUnit: value as any }))
              }
              className="mt-2"
            />
          </div>

          <div>
            <p className="text-sm font-medium">Rounding (decimal places)</p>
            <div className="mt-2 grid gap-3 md:grid-cols-2">
              {(["length", "angle", "area", "volume"] as const).map((key) => (
                <div key={key}>
                  <label className="text-xs text-[rgb(var(--text-muted))]">
                    {key}
                  </label>
                  <Input
                    type="number"
                    min={0}
                    max={6}
                    value={settings.rounding[key]}
                    onChange={(event) =>
                      setSettings((prev) => ({
                        ...prev,
                        rounding: {
                          ...prev.rounding,
                          [key]: Number(event.target.value),
                        },
                      }))
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium">Rounding mode</p>
            <SegmentedControl
              options={[
                { value: "fixed", label: "Fixed" },
                { value: "practical", label: "Practical" },
              ]}
              value={settings.roundingMode}
              onChange={(value) =>
                setSettings((prev) => ({
                  ...prev,
                  roundingMode: value as Settings["roundingMode"],
                }))
              }
              className="mt-2"
            />
            {settings.roundingMode === "practical" && (
              <div className="mt-3">
                <label className="text-xs text-[rgb(var(--text-muted))]">
                  Practical step (in metres)
                </label>
                <Input
                  type="number"
                  min={0.001}
                  step={0.001}
                  value={settings.practicalStep}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      practicalStep: Number(event.target.value),
                    }))
                  }
                />
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-medium">Default waste %</p>
            <Input
              type="number"
              min={0}
              max={50}
              value={settings.wastePercent}
              onChange={(event) =>
                setSettings((prev) => ({
                  ...prev,
                  wastePercent: Number(event.target.value),
                }))
              }
              className="mt-2"
            />
          </div>

          <div>
            <p className="text-sm font-medium">Theme</p>
            <SegmentedControl
              options={[
                { value: "system", label: "System" },
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
              value={settings.theme}
              onChange={(value) =>
                setSettings((prev) => ({ ...prev, theme: value as any }))
              }
              className="mt-2"
            />
          </div>
          <div className="text-xs text-[rgb(var(--text-muted))]">
            Data version: {DATA_VERSION}
          </div>
          <Link to="/backup" className="text-sm underline">
            Backup & Restore
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default SettingsPage
