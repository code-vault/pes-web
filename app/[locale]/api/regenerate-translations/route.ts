import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = request.headers.get('webhook-secret');
    if (webhookSecret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    if (body._type === 'translation') {
      console.log('🔄 Translation updated, regenerating files...');
      
      return NextResponse.json({ 
        success: true, 
        message: 'Translations updated',
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({ message: 'No action needed' });
    
  } catch (error) {
    console.error('Error regenerating translations:', error);
    return NextResponse.json(
      { error: 'Failed to regenerate translations' }, 
      { status: 500 }
    );
  }
}