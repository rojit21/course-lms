import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token || !token.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { courseId } = await req.json();
  await prisma.enrollment.updateMany({
    where: { userId: token.id, courseId },
    data: { progress: 100, completedAt: new Date() },
  });
  return NextResponse.json({ success: true });
} 