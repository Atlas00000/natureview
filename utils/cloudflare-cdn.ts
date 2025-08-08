export interface CloudflareAsset {
  id: string
  name: string
  url: string
  size: number
  uploaded: string
}

export interface CDNConfig {
  accountId: string
  apiToken: string
  r2Url: string
}

// Cloudflare R2 Storage Configuration
export const CLOUDFLARE_CONFIG = {
  // Replace with your Cloudflare account details
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '',
  apiToken: process.env.CLOUDFLARE_API_TOKEN || '',
  r2Url: process.env.CLOUDFLARE_R2_URL || '',
  
  // R2 Bucket Configuration
  bucketName: 'arctic-assets',
  
  // CDN Configuration
  cdnDomain: process.env.CLOUDFLARE_CDN_DOMAIN || process.env.CLOUDFLARE_R2_URL || '',
  cacheTTL: 31536000, // 1 year in seconds
}

// Asset mapping for Cloudflare R2
export const CDN_ASSETS = {
  // Arctic assets (original)
  arcticTerrain: {
    localPath: '/assets/arctic_terrain1.glb',
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/arctic_terrain1.glb`,
    fallbackPath: '/assets/arctic_terrain1.glb',
    size: '2.1MB',
    type: 'model'
  },
  polarBear: {
    localPath: '/assets/polar_bear.glb',
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/polar_bear.glb`,
    fallbackPath: '/assets/polar_bear.glb',
    size: '1.8MB',
    type: 'model'
  },
  snowEnvironment: {
    localPath: '/assets/snowenvrion_1k.hdr',
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/snowenvrion_1k.hdr`,
    fallbackPath: '/assets/snowenvrion_1k.hdr',
    size: '3.2MB',
    type: 'environment'
  },
  
  // Forest assets (enhanced)
  blackBear: {
    localPath: '/assets/black_bear.glb',
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/black_bear.glb`,
    fallbackPath: '/assets/black_bear.glb',
    size: '2.1MB',
    type: 'model'
  },
  forest: {
    localPath: '/assets/forest.glb',
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/forest.glb`,
    fallbackPath: '/assets/forest.glb',
    size: '3.5MB',
    type: 'model'
  },
  forest2: {
    localPath: '/assets/forest2.glb',
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/forest2.glb`,
    fallbackPath: '/assets/forest2.glb',
    size: '4.2MB',
    type: 'model'
  },
  forestEnvironment: {
    localPath: '/assets/forest_environment.hdr', // New forest environment
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/forest_environment.hdr`,
    fallbackPath: '/assets/forest_environment.hdr',
    size: '4.1MB',
    type: 'environment'
  },
  rainforestTrail: {
    localPath: '/assets/rainforest_trail.hdr', // Rainforest trail environment
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/rainforest_trail.hdr`,
    fallbackPath: '/assets/forest_environment.hdr', // Fallback to forest environment
    size: '4.5MB',
    type: 'environment'
  },
  
  // Coastal assets (for future use)
  coastalTerrain: {
    localPath: '/assets/coastal_terrain.glb',
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/coastal_terrain.glb`,
    fallbackPath: '/assets/coastal_terrain.glb',
    size: '2.8MB',
    type: 'model'
  },
  coastalEnvironment: {
    localPath: '/assets/coastal_environment.hdr',
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/coastal_environment.hdr`,
    fallbackPath: '/assets/coastal_environment.hdr',
    size: '3.7MB',
    type: 'environment'
  },
  
  // Audio assets (temporarily disabled)
  bearGrowl: {
    localPath: '/assets/audio/bear_growl.mp3',
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/audio/bear_growl.mp3`,
    fallbackPath: '/assets/audio/bear_growl.mp3',
    size: '256KB',
    type: 'audio'
  },
  bearRoar: {
    localPath: '/assets/audio/bear_roar.mp3',
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/audio/bear_roar.mp3`,
    fallbackPath: '/assets/audio/bear_roar.mp3',
    size: '512KB',
    type: 'audio'
  },
  ambientWind: {
    localPath: '/assets/audio/ambient_wind.mp3',
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/audio/ambient_wind.mp3`,
    fallbackPath: '/assets/audio/ambient_wind.mp3',
    size: '1.2MB',
    type: 'audio'
  },
  arcticAmbience: {
    localPath: '/assets/audio/arctic_ambience.mp3',
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/audio/arctic_ambience.mp3`,
    fallbackPath: '/assets/audio/arctic_ambience.mp3',
    size: '2.1MB',
    type: 'audio'
  }
}

// Get optimized asset URL with fallback
export const getCDNAssetUrl = (assetKey: keyof typeof CDN_ASSETS): string => {
  const asset = CDN_ASSETS[assetKey]
  
  // Use Cloudflare CDN if available (even in development)
  if (CLOUDFLARE_CONFIG.cdnDomain) {
    return asset.cdnPath
  }
  
  // Fallback to local assets
  return asset.localPath
}

// Asset loading with retry logic and optimization
export const loadAssetWithRetry = async (
  assetKey: keyof typeof CDN_ASSETS,
  maxRetries: number = 2, // Reduced retries for faster failure
  timeout: number = 3000 // 3 second timeout
): Promise<string> => {
  const asset = CDN_ASSETS[assetKey]
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const url = getCDNAssetUrl(assetKey)
      
      // Use AbortController for timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)
      
      const response = await fetch(url, { 
        method: 'HEAD',
        signal: controller.signal,
        cache: 'force-cache' // Aggressive caching
      })
      
      clearTimeout(timeoutId)
      
      if (response.ok) {
        return url
      }
      
      // If CDN fails, try fallback
      if (attempt === maxRetries) {
        return asset.fallbackPath
      }
    } catch (error) {
      console.warn(`Asset load attempt ${attempt} failed for ${assetKey}:`, error)
      
      if (attempt === maxRetries) {
        return asset.fallbackPath
      }
    }
  }
  
  return asset.fallbackPath
}

// Preload critical assets with optimization
export const preloadAssets = async (): Promise<void> => {
  const criticalAssets: (keyof typeof CDN_ASSETS)[] = [
    'arcticTerrain', 
    'polarBear', 
    'snowEnvironment',
    'blackBear',
    'forest2', // Updated to forest2
    'forestEnvironment',
    'bearGrowl',
    'bearRoar',
    'ambientWind',
    'arcticAmbience'
  ]
  
  // Parallel loading with concurrency limit
  const concurrencyLimit = 3
  const chunks = []
  
  for (let i = 0; i < criticalAssets.length; i += concurrencyLimit) {
    chunks.push(criticalAssets.slice(i, i + concurrencyLimit))
  }
  
  for (const chunk of chunks) {
    await Promise.allSettled(
      chunk.map(assetKey => loadAssetWithRetry(assetKey, 1, 2000)) // Faster timeout for preload
    )
  }
}

// Asset health check
export const checkAssetHealth = async (): Promise<Record<string, boolean>> => {
  const results: Record<string, boolean> = {}
  
  for (const [key, asset] of Object.entries(CDN_ASSETS)) {
    try {
      const url = getCDNAssetUrl(key as keyof typeof CDN_ASSETS)
      const response = await fetch(url, { method: 'HEAD' })
      results[key] = response.ok
    } catch (error) {
      results[key] = false
    }
  }
  
  return results
} 