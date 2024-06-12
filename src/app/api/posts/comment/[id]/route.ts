import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma";

export async function GET(request: any, { params }: any) {
  try {
    const { id } = params;
    const response = await prisma.comment.findMany({ where: { postId: parseInt(id) }, include: { user: true } });
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

export async function DELETE(request: any, { params }: any) {
  const { id } = params;
  const data = await prisma.comment.findFirst({ where: { id: parseInt(id) } });
  const response = await prisma.comment.delete({ where: { id: data!.id } });
  try {
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
          message: "Gagal hapus komentar.",
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
