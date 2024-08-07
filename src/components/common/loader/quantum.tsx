import { useEffect } from 'react'

export const Quantum = () => {
  useEffect(() => {
    async function getLoader() {
      const { quantum } = await import('ldrs')
      quantum.register()
    }
    getLoader()
  }, [])

  return <l-quantum size="45" speed="8" color="black"></l-quantum>
}
