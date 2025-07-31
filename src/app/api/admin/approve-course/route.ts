import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  await prisma.course.update({
    where: { id },
    data: { isPublished: true },
  });
  return NextResponse.json({ success: true });
} 