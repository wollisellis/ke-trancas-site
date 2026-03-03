import { NextResponse } from 'next/server';
import { isCMSData, readCMS, writeCMS } from '@/lib/cms-store';

function getExpectedToken(): string {
  const envToken = process.env.ADMIN_TOKEN?.trim();
  return envToken && envToken.length > 0 ? envToken : 'ke-admin-local';
}

function hasAdminAccess(request: Request): boolean {
  const incoming = request.headers.get('x-admin-token')?.trim() ?? '';
  return incoming.length > 0 && incoming === getExpectedToken();
}

export async function GET() {
  const data = await readCMS();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  if (!hasAdminAccess(request)) {
    return NextResponse.json({ ok: false, error: 'Nao autorizado. Envie x-admin-token valido.' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!isCMSData(body)) {
    return NextResponse.json({ ok: false, error: 'Payload invalido.' }, { status: 400 });
  }

  const saved = await writeCMS(body);
  return NextResponse.json({ ok: true, data: saved });
}
