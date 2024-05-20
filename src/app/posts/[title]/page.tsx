"use client";
import Navbar from "@/app/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function DetailPost() {
  const router = useRouter();
  const param = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishDate, setPublishDate] = useState("");

  useEffect(() => {
    async function fetchDetailPost() {
      const data = await axios.get("/api/posts/" + param.title);
      setTitle(data.data.data.title);
      setContent(data.data.data.content);
      setPublishDate(data.data.data.createdAt);
    }

    fetchDetailPost();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-white min-w-screen max-w-screen">
        <div className="shadow">
          <Navbar></Navbar>
        </div>
        <div className="px-10">
          <div className="bg-white mx-auto mt-5 max-w-full min-w-full">
            <h1 className="text-black text-center font-bold text-3xl mb-5">{title}</h1>
            <div className=" max-w-full mt-5 min-w-full ">
              {/* <Image src={""} alt="banner" /> */}
              <p className="text-black text-center">{content}</p>
              <span className="text-slate-600">{publishDate}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
