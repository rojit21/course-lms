import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token || !token.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const enrollments = await prisma.enrollment.findMany({
    where: { userId: token.id },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          difficulty: true,
          price: true,
          image: true,
          introVideo: true,
          instructor: true,
          creatorId: true,
        },
      },
    },
  });
  return NextResponse.json({ enrollments });
} 