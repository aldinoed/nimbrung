import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function POST(request: any) {
  console.log("🚀 ~ POST ~ request:", request);
  const { title, content, authorId, image } = await request.json();
  try {
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: authorId,
        image: image,
      },
    });
    console.log("🚀 ~ POST ~ post:", post);

    return NextResponse.json(
      {
        success: true,
        message: "Post Created Successfully!",
        data: post,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Post Failed!",
      },
      { status: 400 }
    );
  }
}
