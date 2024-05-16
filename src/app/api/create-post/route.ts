import { NextResponse } from "next/server";
import prisma from "../../../prisma";

export async function POST(request: any) {
  const { title, content } = await request.json();

  try{
    const post = await prisma.post.create({
      data:{
          title: title,
          content: content,
      }
    });
  
    return NextResponse.json(
      {
        success: true,
        message: "Post Created Successfully!",
        data: post,
      },
      { status: 200 }
    );
  }catch(error : any){
    return NextResponse.json(
      {
        success: false,
        message: "Post Failed!",
      },
      { status: 400 }
    );
  }
}


