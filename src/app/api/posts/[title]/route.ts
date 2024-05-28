import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
export async function GET(req: any, { params }: any) {
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

export async function DELETE(request: any, { params }: any) {
  const { title } = params;

  try {
    const data = await prisma.post.findFirst({ where: { title: title } });
    const response = await prisma.post.delete({ where: { id: data!.id } });
    console.log("🚀 ~ DELETE ~ response:", response);
    return NextResponse.json({ sucess: true, message: "Berhasil hapus postingan!" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ sucess: false, message: "Internal Server Error!" }, { status: 500 });
  }
}
