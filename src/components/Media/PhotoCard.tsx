import type { MediaPhoto } from "../../engine/calcTypes"
import { useOnlineStatus } from "../../hooks/useOnlineStatus"

type PhotoCardProps = {
  photo?: MediaPhoto
  label?: string
}

const PhotoCard = ({ photo, label = "Photo reference" }: PhotoCardProps) => {
  const isOnline = useOnlineStatus()
  if (!photo || !isOnline) return null

  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-3">
      <p className="text-xs text-[rgb(var(--text-muted))]">{label}</p>
      <img
        src={photo.src}
        alt={photo.alt}
        className="mt-2 w-full rounded-lg object-cover"
        loading="lazy"
        decoding="async"
      />
      <p className="mt-2 text-[11px] text-[rgb(var(--text-muted))]">
        {photo.credit} —{" "}
        <a
          href={photo.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Source
        </a>{" "}
        ({photo.license})
      </p>
    </div>
  )
}

export default PhotoCard
