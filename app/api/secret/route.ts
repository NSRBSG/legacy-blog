import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    console.log(password, process.env.CLIENT_KEY);
    if (password === process.env.CLIENT_KEY) {
      return NextResponse.json({ message: 'Success' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
