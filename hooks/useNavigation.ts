import { useState, useCallback, useEffect } from "react"
import { usePathname } from "next/navigation"
import { regions } from "@/data/regions"

export function useNavigation() {
  const pathname = usePathname()
  const [activeRegion, setActiveRegion] = useState<string>("arctic")

  // Detect active region from URL pathname
  useEffect(() => {
    const pathSegments = pathname.split('/')
    const regionSegment = pathSegments[2] // /regions/[region]
    
    if (regionSegment && regions.find(r => r.id === regionSegment)) {
      setActiveRegion(regionSegment)
    } else if (pathname === '/') {
      // Default to arctic for homepage
      setActiveRegion("arctic")
    }
  }, [pathname])

  const handleRegionChange = useCallback((regionId: string) => {
    setActiveRegion(regionId)
    // Here you could add additional logic like:
    // - Analytics tracking
    // - Route changes
    // - Content updates
    // - API calls to load region-specific data
  }, [])

  const getActiveRegion = useCallback(() => {
    return regions.find(region => region.id === activeRegion)
  }, [activeRegion])

  return {
    regions,
    activeRegion,
    handleRegionChange,
    getActiveRegion
  }
} 