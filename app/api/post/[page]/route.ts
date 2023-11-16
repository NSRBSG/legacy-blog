import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params: { page } }: { params: { page: number } }
) {
  try {
    const limit = 10;
    const offset = page * limit;
    const result = await sql`
      SELECT * FROM posts ORDER BY date DESC LIMIT ${limit} OFFSET ${offset}`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
