import { put } from '@vercel/blob';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageName = searchParams.get('image_name');

    const { body } = request;

    if (!imageName || !body) {
      return NextResponse.json({ error: 'Image Not Exist' }, { status: 400 });
    }

    const blob = await put(imageName, body, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
