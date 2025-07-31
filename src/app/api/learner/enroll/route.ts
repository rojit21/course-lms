import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token || !token.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { courseId } = await req.json();
  // Check if already enrolled
  const existing = await prisma.enrollment.findFirst({
    where: { userId: token.id, courseId },
  });
  if (!existing) {
    await prisma.enrollment.create({
      data: {
        userId: token.id,
        courseId,
        progress: 0,
      },
    });
  }
  return NextResponse.json({ success: true });
} 