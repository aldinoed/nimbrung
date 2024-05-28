import prisma from "../../../../../prisma";
import { NextResponse } from "next/server";
const secretKey = "hagsydgsdjkasdkbh7yiuJHBJGCD";

const jwt = require("jsonwebtoken");

export async function POST(request: any) {
  const { email, password } = await request.json();
  try {
    const user = await prisma.user.findMany({
      where: {
        email: email,
      },
    });
    // const hashedPassword = await hash(password, 10);

    if (user.length === 1) {
      const valid = password === user[0].password;
      if (email === user[0].email && valid == true) {
        const token = jwt.sign({ id: user[0].id }, secretKey, {
          expiresIn: "15m",
        });
        //   res.cookie("refresh_token", token, {
        //     httpOnly: true,
        //     maxAge: 60 * 60 * 1000,
        //   });
        //         res.status(200).json({ token: token, user: data[0] });
        //         next();
        //       } else {
        //         res.status(400).send("NRP atau password salah!");
        //       }
        //     } else {
        //       if (
        //         nrp === data[0].nrp &&
        //         bcrypt.compare(password, data[0].password)
        //       ) {
        //         const token = jwt.sign({ id: data[0].nrp }, secretKey, {
        //           expiresIn: "30m",
        //         });
        //         res.cookie("refresh_token", token, {
        //           httpOnly: true,
        //           maxAge: 60 * 60 * 1000,
        //         });
        //         res.status(200).json({ token: token, user: data[0] });
        //         next();
        //       } else {
        //         res.status(400).send("NRP atau password salah!");

        return NextResponse.json(
          {
            success: true,
            message: `Berhasil login!`,
            data: { user: user[0], token: token },
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: `Email atau password salah!`,
          },
          { status: 403 }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: `User tidak terdaftar.`,
        },
        { status: 403 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
}
