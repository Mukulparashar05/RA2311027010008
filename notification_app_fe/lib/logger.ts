export async function Log(stack: string, level: string, package_name: string, message: string) {
  try {
    await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stack, level, package: package_name, message })
    });
  } catch (error) {}
}
