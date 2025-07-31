import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
 
export async function POST(req: NextRequest) {
  const { id } = await req.json();
  await prisma.course.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 