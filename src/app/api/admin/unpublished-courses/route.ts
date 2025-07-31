import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const courses = await prisma.course.findMany({
    where: { isPublished: false },
    orderBy: { createdAt: 'desc' },
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
    },
  });
  return NextResponse.json({ courses });
} 