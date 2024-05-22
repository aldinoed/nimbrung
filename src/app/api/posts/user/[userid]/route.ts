import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma";

export async function GET(request: any, { params }: any) {
  const { userid } = params;
  console.log("🚀 ~ GET ~ params:", params);
  console.log("🚀 ~ GET ~ userId:", userid);
  const data = await prisma.post.findMany({ where: { authorId: parseInt(userid) } });
  console.log("🚀 ~ GET ~ data:", data);
}
