"use client";
import { content } from "flowbite-react/tailwind";
import { headers } from "next/headers";
import {useState } from "react";
import Swal from "sweetalert2";
import {useRouter } from "next/navigation";

export default function Publish() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // useEffect(()=>{
  //     console.log(title, content)
  // },[title, content])

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/create-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          content: content
        }),
      });
      if(response.status === 200){
        Swal.fire({
          title: "Berhasil!",
          text: 'Berhasil membuat postingan!',
          icon: "success",
        });
        router.push('/');
      }else{
        Swal.fire({
          title: "Gagal!",
          text: 'Gagal membuat Postingan!',
          icon: "success",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: String(error),
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen max-h-screen flex justify-center items-center ">
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Judul Postingan
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="content"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Konten Postingan
        </label>
        <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
          
          id="content"
          rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Kirim
      </button>
    </form>
    </div>
  );
}
