import { client } from '@/lib/sanity';

// Simple in-memory rate limiting (for production, use Redis/similar)
const requestCache = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = requestCache.get(ip);
  
  if (!record || now > record.resetTime) {
    // Reset window
    requestCache.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return false;
  }
  
  if (record.count >= 60) { // 60 requests per minute
    return true;
  }
  
  record.count++;
  return false;
}

export async function GET(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    if (isRateLimited(ip)) {
      return Response.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    const query = `*[_type == "galleryProject"] | order(sortOrder asc) [0..5] {
      _id,
      title,
      category,
      mediaType,
      images,
      video,
      videoThumbnail,
      description,
      specifications,
      featured
    }`;

    const results = await client.fetch(query);

    return Response.json(
      { success: true, data: results },
      { headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      }}
    );
  } catch (error) {
    console.error('Gallery API error:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch gallery data' },
      { status: 500, headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      }}
    );
  }
}
