import { memo, useEffect, useMemo, useState } from 'react'

function resolveImageSrc(url?: string) {
  if (!url) return undefined
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url
  if (url.startsWith('/')) return url
  return `/${url}`
}

function cacheBustUrl(url: string, seed: string) {
  const normalized = resolveImageSrc(url) ?? url
  const bust = encodeURIComponent(seed.slice(0, 64))
  if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
    try {
      const parsed = new URL(normalized)
      parsed.searchParams.set('dexv', seed.slice(0, 64))
      return parsed.toString()
    } catch {
      return normalized
    }
  }
  const sep = normalized.includes('?') ? '&' : '?'
  return `${normalized}${sep}dexv=${bust}`
}

interface DexRemoteImageProps {
  src?: string
  alt: string
  cacheSeed: string
  className?: string
  fallback: React.ReactNode
}

export const DexRemoteImage = memo(function DexRemoteImage({
  src,
  alt,
  cacheSeed,
  className,
  fallback,
}: DexRemoteImageProps) {
  const [failed, setFailed] = useState(false)
  const resolvedSrc = useMemo(() => {
    if (!src || failed) return null
    return cacheBustUrl(src, cacheSeed)
  }, [src, cacheSeed, failed])

  useEffect(() => {
    setFailed(false)
  }, [src, cacheSeed])

  if (!resolvedSrc) return <>{fallback}</>

  return (
    <img
      key={resolvedSrc}
      src={resolvedSrc}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  )
})
