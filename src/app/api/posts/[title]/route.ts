import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
export async function GET(req: any, { params }: any) {
  console.log("🚀 ~ GET ~ params:", params);
  try {
    const response = await prisma.post.findFirst({ where: { title: params.title } });

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
          message: "Belum ada postingan.",
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
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
