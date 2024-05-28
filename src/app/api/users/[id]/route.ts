import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function GET(request: any, { params }: any) {
  const id = parseInt(params.id);
  const user = await prisma.user.findUnique({ where: { id } });

  return NextResponse.json(
    {
      success: true,
      data: { user: user },
    },
    { status: 200 }
  );
}

export async function PUT(request: any, { params }: any) {
  const { id } = params;
  const { fullName, password } = await request.json();
  try {
    const response = await prisma.user.update({ where: { id: parseInt(id) }, data: { fullname: fullName, password: password } });
    console.log("🚀 ~ PUT ~ response:", response);
    return NextResponse.json({ sucess: true, message: "Berhasil update profile!" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ sucess: false, message: "Yah...sistem lagi error nih" }, { status: 500 });
  }
}
