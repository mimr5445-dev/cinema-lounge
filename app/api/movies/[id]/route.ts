import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.movie.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete movie' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const movie = await prisma.movie.update({
      where: { id: params.id },
      data: data,
    });
    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update movie' }, { status: 500 });
  }
}
