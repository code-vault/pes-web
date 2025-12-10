import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

function verifyWebhookSignature(signature: string, body: string, secret: string): boolean {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')
  
  // Timing-safe comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(signature)
  )
}

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.SANITY_WEBHOOK_SECRET
    const signature = request.headers.get('x-webhook-signature')

    if (!secret || !signature) {
      return NextResponse.json(
        { error: 'Unauthorized - Missing webhook secret or signature' },
        { status: 401 },
        { headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY'
        }}
      )
    }

    const body = await request.text()
    
    // Verify HMAC signature
    if (!verifyWebhookSignature(signature, body, secret)) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid signature' },
        { status: 401 }
      )
    }
    
    const data = JSON.parse(body) or testimonial update
    const documentType = data.documentType || data._type
    
    if (documentType === 'galleryProject') {
      // Revalidate gallery pages
      revalidatePath('/gallery')
      revalidatePath('/(en|hi)/gallery')
      
      // Revalidate home page (where gallery component is used)
      revalidatePath('/')
      revalidatePath('/(en|hi)')
      
      console.log('✅ Revalidated gallery paths for galleryProject update')
      
      return NextResponse.json(
        { message: 'Gallery revalidated successfully' },
        { status: 200 }
      )
    }
    
    if (documentType === 'testimonial' || documentType === 'videoTestimonial') {
      // Revalidate testimonials pages
      revalidatePath('/testimonials')
      revalidatePath('/(en|hi)/testimonials')
      
      // Revalidate home page (where testimonials component is used)
      revalidatePath('/')
      revalidatePath('/(en|hi)')
      
      console.log(`✅ Revalidated testimonial paths for ${documentType} update`)
      
      return NextResponse.json(
        { message: 'Testimonials revalidated successfully' },
        { status: 200 }
      )
    }
    
    return NextResponse.json(
      { message: 'No revalidation needed for this document type', documentType },
      { status: 200 }
    )
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500, headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      }}
    )
  }
}
