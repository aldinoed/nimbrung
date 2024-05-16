import { NextResponse } from "next/server";

import prisma from "../../../../prisma";
import { hash } from 'bcrypt';

export async function POST(request: any) {
  const { fullname, email, password } = await request.json();
  // const existedUser: any = await prisma.user.findFirst({
  //   where: { email: email },
  // });

  // if(existedUser){
  //   return NextResponse.json({message: 'Email telah terdaftar!'}, {status: 409})
  // }

  const hashedPassword = await hash(password, 10);
  try{
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        fullname: fullname,
        image: "",
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Post Created Successfully!",
        data: user,
      },
      { status: 200 }
    );
  }catch(error){
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
}
