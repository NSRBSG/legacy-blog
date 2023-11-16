import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { title, thumbnail, description, content } = await request.json();

    const result = await sql`
      INSERT INTO posts (title, thumbnail, description, content) VALUES (${title}, ${thumbnail}, ${description}, ${content})`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
