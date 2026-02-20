import { useMemo, useState } from "react"
import SegmentedControl from "../ui/SegmentedControl"
import type { MediaPhoto } from "../../engine/calcTypes"
import { useOnlineStatus } from "../../hooks/useOnlineStatus"

export type MediaTab =
  | { key: string; label: string; type: "image"; src: string; alt: string }
  | { key: string; label: string; type: "photo"; photo: MediaPhoto }

type MediaTabsProps = {
  title: string
  tabs: MediaTab[]
}

const MediaTabs = ({ title, tabs }: MediaTabsProps) => {
  const isOnline = useOnlineStatus()
  const availableTabs = useMemo(() => {
    return tabs.filter((tab) => tab.type !== "photo" || isOnline)
  }, [tabs, isOnline])

  const [active, setActive] = useState(availableTabs[0]?.key ?? "")

  if (availableTabs.length === 0) return null

  const activeTab = availableTabs.find((tab) => tab.key === active) ?? availableTabs[0]

  return (
    <div className="space-y-3">
      {availableTabs.length > 1 && (
        <SegmentedControl
          options={availableTabs.map((tab) => ({ value: tab.key, label: tab.label }))}
          value={activeTab.key}
          onChange={setActive}
        />
      )}
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-3">
        <p className="text-xs text-[rgb(var(--text-muted))]">{title}</p>
        {activeTab.type === "image" ? (
          <img
            src={activeTab.src}
            alt={activeTab.alt}
            className="mt-2 w-full max-h-72 rounded-lg object-contain"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <>
            <img
              src={activeTab.photo.src}
              alt={activeTab.photo.alt}
              className="mt-2 w-full max-h-72 rounded-lg object-cover"
              loading="lazy"
              decoding="async"
            />
            <p className="mt-2 text-[11px] text-[rgb(var(--text-muted))]">
              {activeTab.photo.credit} —{" "}
              <a
                href={activeTab.photo.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Source
              </a>{" "}
              ({activeTab.photo.license})
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default MediaTabs
