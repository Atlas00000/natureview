import { getCDNAssetUrl, loadAssetWithRetry, CDN_ASSETS } from './cloudflare-cdn'

export interface AssetConfig {
  localPath: string
  cdnPath?: string
  fallbackType: 'primitive' | 'texture' | 'none'
}

// Enhanced asset mapping with better forest-themed assets
export const ASSETS = {
  // Arctic assets (original)
  arcticTerrain: {
    localPath: '/assets/arctic_terrain1.glb',
    cdnPath: 'https://cdn.jsdelivr.net/gh/your-repo/arctic-assets@main/arctic_terrain1.glb',
    fallbackType: 'primitive' as const
  },
  polarBear: {
    localPath: '/assets/polar_bear.glb',
    cdnPath: 'https://cdn.jsdelivr.net/gh/your-repo/arctic-assets@main/polar_bear.glb',
    fallbackType: 'primitive' as const
  },
  snowEnvironment: {
    localPath: '/assets/snowenvrion_1k.hdr',
    cdnPath: 'https://cdn.jsdelivr.net/gh/your-repo/arctic-assets@main/snowenvrion_1k.hdr',
    fallbackType: 'none' as const
  },
  
  // Forest assets (enhanced with better fallbacks)
  blackBear: {
    localPath: '/assets/black_bear.glb', // Correct forest bear model name
    cdnPath: 'https://cdn.jsdelivr.net/gh/your-repo/forest-assets@main/black_bear.glb',
    fallbackType: 'primitive' as const
  },
  forest: {
    localPath: '/assets/forest.glb', // Correct forest terrain model name
    cdnPath: 'https://cdn.jsdelivr.net/gh/your-repo/forest-assets@main/forest.glb',
    fallbackType: 'primitive' as const
  },
  forestEnvironment: {
    localPath: '/assets/forest_environment.hdr', // New forest environment
    cdnPath: 'https://cdn.jsdelivr.net/gh/your-repo/forest-assets@main/forest_environment.hdr',
    fallbackType: 'none' as const
  },
  rainforestTrail: {
    localPath: '/assets/rainforest_trail.hdr', // Rainforest trail environment
    cdnPath: 'https://cdn.jsdelivr.net/gh/your-repo/forest-assets@main/rainforest_trail.hdr',
    fallbackType: 'none' as const
  },
  
  // Coastal assets (for future use)
  coastalTerrain: {
    localPath: '/assets/coastal_terrain.glb',
    cdnPath: 'https://cdn.jsdelivr.net/gh/your-repo/coastal-assets@main/coastal_terrain.glb',
    fallbackType: 'primitive' as const
  },
  coastalEnvironment: {
    localPath: '/assets/coastal_environment.hdr',
    cdnPath: 'https://cdn.jsdelivr.net/gh/your-repo/coastal-assets@main/coastal_environment.hdr',
    fallbackType: 'none' as const
  }
}

// Asset cache for faster subsequent loads
const assetCache = new Map<string, string>()

// Enhanced asset path resolver with Cloudflare CDN
export const getAssetPath = (assetKey: keyof typeof ASSETS): string => {
  // Check cache first
  if (assetCache.has(assetKey)) {
    return assetCache.get(assetKey)!
  }
  
  // Use Cloudflare CDN if available
  if (assetKey in CDN_ASSETS) {
    const url = getCDNAssetUrl(assetKey as keyof typeof CDN_ASSETS)
    assetCache.set(assetKey, url)
    return url
  }
  
  // Fallback to legacy logic
  const asset = ASSETS[assetKey]
  const url = asset.cdnPath || asset.localPath
  assetCache.set(assetKey, url)
  return url
}

// Enhanced asset loader with retry and health checks
export const loadAssetWithHealthCheck = async (
  assetKey: keyof typeof ASSETS,
  options?: {
    maxRetries?: number
    timeout?: number
    useCDN?: boolean
  }
): Promise<string> => {
  const { maxRetries = 2, timeout = 5000, useCDN = true } = options || {} // Reduced timeout and retries
  
  // Use Cloudflare CDN if available and enabled
  if (useCDN && assetKey in CDN_ASSETS) {
    return loadAssetWithRetry(assetKey as keyof typeof CDN_ASSETS, maxRetries)
  }
  
  // Fallback to legacy loading
  const asset = ASSETS[assetKey]
  const url = getAssetPath(assetKey)
  
  // Simple health check with shorter timeout
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    
    const response = await fetch(url, { 
      method: 'HEAD',
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (response.ok) {
      return url
    }
  } catch (error) {
    console.warn(`Asset health check failed for ${assetKey}:`, error)
  }
  
  return asset.localPath
}

// Asset preloader for critical assets
export const preloadCriticalAssets = async (): Promise<void> => {
  const criticalAssets: (keyof typeof ASSETS)[] = [
    'arcticTerrain', 
    'polarBear', 
    'snowEnvironment',
    'blackBear',
    'forest',
    'forestEnvironment'
  ]
  
  await Promise.allSettled(
    criticalAssets.map(assetKey => loadAssetWithHealthCheck(assetKey))
  )
}

// Asset health check function
export const checkAssetHealth = async (): Promise<Record<string, boolean>> => {
  const results: Record<string, boolean> = {}
  
  for (const [key, asset] of Object.entries(ASSETS)) {
    try {
      const url = getAssetPath(key as keyof typeof ASSETS)
      const response = await fetch(url, { method: 'HEAD' })
      results[key] = response.ok
    } catch (error) {
      results[key] = false
    }
  }
  
  return results
}

// Asset size information
export const getAssetInfo = (assetKey: keyof typeof ASSETS) => {
  if (assetKey in CDN_ASSETS) {
    const cdnAsset = CDN_ASSETS[assetKey as keyof typeof CDN_ASSETS]
    return {
      size: cdnAsset.size,
      type: cdnAsset.type,
      url: getCDNAssetUrl(assetKey as keyof typeof CDN_ASSETS)
    }
  }
  
  return {
    size: 'Unknown',
    type: 'Unknown',
    url: getAssetPath(assetKey)
  }
} 