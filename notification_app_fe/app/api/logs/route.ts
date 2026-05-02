import { NextResponse } from 'next/server';

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtcDI3MDlAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMTE0MywiaWF0IjoxNzc3NzAwMjQzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNTgxMmY2MWYtOWNkYy00MWJlLTg1MDAtODVhYWI0YzllYjgzIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibXVrdWwgcGFyYXNoYXIiLCJzdWIiOiJhMWVmMDFlZC0wY2VmLTQxNzYtOTQ2MC0xYWJmYzE0ODg5NzgifSwiZW1haWwiOiJtcDI3MDlAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJtdWt1bCBwYXJhc2hhciIsInJvbGxObyI6InJhMjMxMTAyNzAxMDAwOCIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImExZWYwMWVkLTBjZWYtNDE3Ni05NDYwLTFhYmZjMTQ4ODk3OCIsImNsaWVudFNlY3JldCI6IndnclBwZlZHcHNNSFpNRUMifQ._oDipEDbXkqwt6WYg_7ULNNA-C9CO6fKrqOcOrm-rzY";

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
