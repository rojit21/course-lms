import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token || !token.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await req.json();
  // Only allow deletion if the course belongs to the creator
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course || course.creatorId !== token.id) {
    return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
  }
  await prisma.course.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 