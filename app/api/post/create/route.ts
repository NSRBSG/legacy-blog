import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url, thumbnail, title, description, content } =
      await request.json();

    const result = await sql`
      INSERT INTO posts (url, thumbnail, title, description, content) VALUES (${url}, ${thumbnail}, ${title}, ${description}, ${content})`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
