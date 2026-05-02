import { NextResponse } from 'next/server';

const TOKEN = process.env.API_TOKEN || "";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || '10';
  const page = searchParams.get('page') || '1';
  const notification_type = searchParams.get('notification_type') || '';

  let url = `http://20.207.122.201/evaluation-service/notifications?limit=${limit}&page=${page}`;
  if (notification_type) url += `&notification_type=${notification_type}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });

  const data = await res.json();
  return NextResponse.json(data);
}
