import { useEffect, useState } from 'react'

export default function useWindowSize() {
  const [width, setWidth] = useState<number>(0)
  useEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return width
}
