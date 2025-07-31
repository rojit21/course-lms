import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  console.log('TOKEN:', token);
  if (!token || token.role !== 'CREATOR') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const courses = await prisma.course.findMany({
    where: { creatorId: token.id },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      difficulty: true,
      price: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ courses });
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  console.log('TOKEN:', token);
  if (!token || token.role !== 'CREATOR') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  try {
    const course = await prisma.course.create({
      data: {
        title: body.title,
        description: body.description,
        price: parseFloat(body.price),
        image: body.image,
        introVideo: body.introVideo,
        duration: body.duration,
        difficulty: body.difficulty,
        category: body.category,
        instructor: token.name || '',
        isPublished: false,
        creatorId: token.id,
      },
    });
    return NextResponse.json({ course });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create course.' }, { status: 500 });
  }
} 