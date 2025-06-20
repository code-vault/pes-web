import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const webhookSecret = request.headers.get('webhook-secret');
    if (webhookSecret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Check if it's a translation update
    if (body._type === 'translation') {
      console.log('🔄 Translation updated, regenerating files...');
      
      // Run the generation script
      await execAsync('node scripts/generate-translations.js');
      
      // Trigger Next.js revalidation
      const revalidateResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'translations' })
        }
      );

      console.log('✅ Translations regenerated and site revalidated');
      
      return NextResponse.json({ 
        success: true, 
        message: 'Translations regenerated',
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
