import { NextResponse } from 'next/server';

const TOKEN = process.env.API_TOKEN || "";

export async function POST(request: Request) {
  const body = await request.json();
  await fetch('http://20.207.122.201/evaluation-service/logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`
    },
    body: JSON.stringify(body)
  });
  return NextResponse.json({ success: true });
}
