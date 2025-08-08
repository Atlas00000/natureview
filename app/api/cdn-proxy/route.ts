import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  
  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // Add timeout and caching
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'public, max-age=3600', // 1 hour cache
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.arrayBuffer();
    
    // Determine content type for proper caching
    const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
    const isCompressible = contentType.includes('text') || contentType.includes('json') || contentType.includes('xml');
    
    return new NextResponse(data, {
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD',
        'Access-Control-Allow-Headers': '*',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400', // 1 hour browser, 24 hour CDN
        'ETag': `"${Buffer.from(url).toString('base64').slice(0, 8)}"`,
        ...(isCompressible && { 'Content-Encoding': 'gzip' }),
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch asset' }, { status: 500 });
  }
} 