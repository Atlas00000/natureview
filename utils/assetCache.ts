// Optimized asset cache system
interface CacheEntry {
  url: string
  timestamp: number
  size: number
}

class AssetCache {
  private cache = new Map<string, CacheEntry>()
  private maxSize = 50 * 1024 * 1024 // 50MB cache limit
  private currentSize = 0
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

  // Add asset to cache
  set(key: string, url: string, size: number = 0): void {
    // Remove old entry if exists
    if (this.cache.has(key)) {
      const oldEntry = this.cache.get(key)!
      this.currentSize -= oldEntry.size
    }

    // Check if we need to evict old entries
    while (this.currentSize + size > this.maxSize && this.cache.size > 0) {
      this.evictOldest()
    }

    this.cache.set(key, {
      url,
      timestamp: Date.now(),
      size
    })
    this.currentSize += size
  }

  // Get asset from cache
  get(key: string): string | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    // Check if expired
    if (Date.now() - entry.timestamp > this.CACHE_DURATION) {
      this.cache.delete(key)
      this.currentSize -= entry.size
      return null
    }

    return entry.url
  }

  // Check if asset is cached
  has(key: string): boolean {
    return this.get(key) !== null
  }

  // Clear expired entries
  cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.CACHE_DURATION) {
        this.cache.delete(key)
        this.currentSize -= entry.size
      }
    }
  }

  // Evict oldest entry
  private evictOldest(): void {
    let oldestKey: string | null = null
    let oldestTime = Date.now()

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp
        oldestKey = key
      }
    }

    if (oldestKey) {
      const entry = this.cache.get(oldestKey)!
      this.cache.delete(oldestKey)
      this.currentSize -= entry.size
    }
  }

  // Get cache stats
  getStats() {
    return {
      size: this.cache.size,
      totalSize: this.currentSize,
      maxSize: this.maxSize
    }
  }
}

export const assetCache = new AssetCache()

// Optimized asset loader with caching
export const loadAssetWithCache = async (
  assetKey: string,
  loader: () => Promise<string>,
  size: number = 0
): Promise<string> => {
  // Check cache first
  const cached = assetCache.get(assetKey)
  if (cached) {
    console.log(`Asset ${assetKey} loaded from cache`)
    return cached
  }

  // Load and cache
  try {
    const url = await loader()
    assetCache.set(assetKey, url, size)
    console.log(`Asset ${assetKey} cached`)
    return url
  } catch (error) {
    console.error(`Failed to load asset ${assetKey}:`, error)
    throw error
  }
}

// Preload with caching
export const preloadWithCache = async (assets: Array<{ key: string, loader: () => Promise<string>, size?: number }>) => {
  const promises = assets.map(({ key, loader, size }) => 
    loadAssetWithCache(key, loader, size).catch(err => {
      console.warn(`Failed to preload ${key}:`, err)
      return null
    })
  )
  
  return Promise.allSettled(promises)
} 