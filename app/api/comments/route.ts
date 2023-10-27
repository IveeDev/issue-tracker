import { CommentSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = CommentSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const { content, authorId, issueId } = body;

  const newComment = await prisma.comment.create({
    data: {
      content,
      authorId,
      issueId,
    },
  });

  return NextResponse.json(newComment, { status: 200 });
}
