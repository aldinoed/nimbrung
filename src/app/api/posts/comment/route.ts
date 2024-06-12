import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function POST(request: any) {
  const { userId, postId, comment } = await request.json();

  try {
    if (comment === undefined || comment.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          message: "Komentar tidak boleh kosong!",
        },
        {
          status: 400,
        }
      );
    }

    const response = await prisma.comment.create({
      data: {
        userId: userId,
        postId: postId,
        comment: comment,
      },
    });
    console.log("🚀 ~ POST ~ response:", response);
    return NextResponse.json(
      {
        success: true,
        message: "Berhasil menambahkan komentar!",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      {
        status: 500,
      }
    );
  }
}
