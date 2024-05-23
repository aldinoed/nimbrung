import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma";

export async function GET(request: any, { params }: any) {
  const { userid } = params;
  try {
    const data = await prisma.post.findMany({ where: { authorId: parseInt(userid) } });

    if (data.length === 0) {
      return NextResponse.json(
        {
          success: true,
          data: "Anda tidak memiliki postingan",
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          data: data,
        },
        {
          status: 200,
        }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        data: error,
      },
      {
        status: 500,
      }
    );
  }
}
