import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma";

export async function GET(params: any) {
  //   console.log("🚀 ~ GET ~ params:", params);
  try {
    const { id } = params;
    const response = await prisma.comment.findMany({ where: { postId: id }, include: { user: true } });
    console.log("🚀 ~ GET ~ response:", response);

    //     console.log("🚀 ~ GET ~ response:", response);
    if (response) {
      return NextResponse.json(
        {
          success: true,
          data: response,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          sucess: true,
          message: "Belum ada komentar.",
        },
        {
          status: 200,
        }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        sucess: false,
        message: error,
      },
      {
        status: 500,
      }
    );
  }
}
