'use client';

import { useEffect, useState } from 'react';
import { assetCache } from '@/utils/assetCache';

interface PerformanceMetrics {
  loadTime: number;
  cacheHitRate: number;
  totalAssets: number;
  cachedAssets: number;
}

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    cacheHitRate: 0,
    totalAssets: 0,
    cachedAssets: 0
  });

  useEffect(() => {
    const updateMetrics = () => {
      const stats = assetCache.getStats();
      const cacheHitRate = stats.size > 0 ? (stats.size / (stats.size + 1)) * 100 : 0;
      
      setMetrics({
        loadTime: performance.now(),
        cacheHitRate,
        totalAssets: stats.size,
        cachedAssets: stats.size
      });
    };

    // Update metrics every 2 seconds
    const interval = setInterval(updateMetrics, 2000);
    updateMetrics();

    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white text-xs z-50">
      <div className="font-bold mb-1">Performance Monitor</div>
      <div className="space-y-1">
        <div>Load Time: {metrics.loadTime.toFixed(0)}ms</div>
        <div>Cache Hit: {metrics.cacheHitRate.toFixed(1)}%</div>
        <div>Cached Assets: {metrics.cachedAssets}</div>
        <div>Total Assets: {metrics.totalAssets}</div>
      </div>
    </div>
  );
}; 