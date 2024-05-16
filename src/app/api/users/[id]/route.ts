import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function GET(request : any, {params} : any){
      const id = parseInt(params.id)
      const user = await prisma.user.findUnique({where:{id}})

      return NextResponse.json(     
            {
            success: true,
            data: {user: user},
          },
          { status: 200 }
        );
}