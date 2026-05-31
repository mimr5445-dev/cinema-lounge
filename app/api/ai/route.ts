import { NextResponse } from 'next/server';
import { getChatAiResponse } from '@/lib/ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    const aiResponse = await getChatAiResponse(messages);
    
    return NextResponse.json({ content: aiResponse });
  } catch (error) {
    console.error('AI API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
