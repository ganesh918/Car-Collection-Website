import { useEffect, useState } from 'react'
import { PLACEHOLDER } from '../../data/images'

export default function CarImage({ src, alt, className = '', loading = 'lazy' }) {
  const [current, setCurrent] = useState(src)

  useEffect(() => {
    setCurrent(src)
  }, [src])

  return (
    <img
      src={current}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => {
        if (current !== PLACEHOLDER) setCurrent(PLACEHOLDER)
      }}
      className={className}
    />
  )
}
