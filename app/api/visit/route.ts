import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

const COUNTER_KEY = 'total_visits';

export async function GET() {
  try {
    const { env } = await getCloudflareContext();
    const kv = env.VISIT_COUNTER;
    
    if (!kv) {
      // Fallback for local development
      return NextResponse.json({ count: 0, error: 'KV not available' });
    }

    const count = await kv.get(COUNTER_KEY);
    return NextResponse.json({ count: parseInt(count || '0', 10) });
  } catch (error) {
    console.error('Failed to get visit count:', error);
    return NextResponse.json({ count: 0 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const kv = env.VISIT_COUNTER;
    
    if (!kv) {
      return NextResponse.json({ count: 0, error: 'KV not available' });
    }

    // Get current count
    const currentCount = await kv.get(COUNTER_KEY);
    const newCount = parseInt(currentCount || '0', 10) + 1;
    
    // Update count
    await kv.put(COUNTER_KEY, newCount.toString());
    
    return NextResponse.json({ count: newCount });
  } catch (error) {
    console.error('Failed to increment visit count:', error);
    return NextResponse.json({ count: 0 });
  }
}
