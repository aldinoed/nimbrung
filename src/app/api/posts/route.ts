import { NextResponse } from "next/server";
import prisma from "../../../prisma";

export async function GET(){
    try{
      const response = await prisma.post.findMany();
  
      if(response.length > 0){
        return NextResponse.json({
          sucess: true,
          data: response
        }, {
          status: 200
        })
      }else{
        return NextResponse.json({
          sucess: true,
          message: "Belum ada postingan."
        }, {
          status: 200
        })
      }
    }catch(error){
      return NextResponse.json({
        sucess: false,
        message: error
      }, {
        status: 500
      })
    }
  }
  
  export async function DELETE(request:any, {params}:any){
    const id = parseInt(params.id);
    const response = await prisma.post.delete({
      where: {
        id
      }
    })
  }