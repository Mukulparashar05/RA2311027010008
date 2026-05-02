import axios from 'axios';

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtcDI3MDlAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzY5OTE0NywiaWF0IjoxNzc3Njk4MjQ3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMDI2NGNiZTUtMmFiMS00NGRjLWFkMDYtY2NiN2NjNTAzY2QyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibXVrdWwgcGFyYXNoYXIiLCJzdWIiOiJhMWVmMDFlZC0wY2VmLTQxNzYtOTQ2MC0xYWJmYzE0ODg5NzgifSwiZW1haWwiOiJtcDI3MDlAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJtdWt1bCBwYXJhc2hhciIsInJvbGxObyI6InJhMjMxMTAyNzAxMDAwOCIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImExZWYwMWVkLTBjZWYtNDE3Ni05NDYwLTFhYmZjMTQ4ODk3OCIsImNsaWVudFNlY3JldCI6IndnclBwZlZHcHNNSFpNRUMifQ.5RB-jrWX67suSqNnIfYDGl_DzWipBdhLVDmc9NkTJ4o";

export async function Log(stack: string, level: string, package_name: string, message: string) {
  try {
    await axios.post(
      'http://20.207.122.201/evaluation-service/logs',
      { stack, level, package: package_name, message },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`
        }
      }
    );
  } catch (error) {
    // Silent fail
  }
}