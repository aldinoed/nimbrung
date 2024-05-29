"use client";
import { content } from "flowbite-react/tailwind";
import { headers } from "next/headers";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import "@mantine/tiptap/styles.css";
import { RichTextEditor, Link } from "@mantine/tiptap";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function Publish() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePublicUrl, setImagePublicUrl] = useState("");

  const quillModules = {
    toolbar: [[{ header: [1, 2, 3, false] }], ["bold", "italic", "underline", "strike", "blockquote"], [{ list: "ordered" }, { list: "bullet" }], ["link"], [{ align: [] }], [{ color: [] }], ["code-block"], ["clean"]],
  };

  const quillFormats = ["header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "link", "image", "align", "color", "code-block"];

  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

  useEffect(() => {
    const sessionId = localStorage.getItem("id");
    const sessionName = localStorage.getItem("name");

    if (Cookies.get("auth") == null || Cookies.get("auth") == undefined || sessionId == null || sessionName == null) {
      Swal.fire({
        title: "oops!",
        text: "Silahkan login dulu ya...",
        icon: "info",
      });
      router.push("/signin");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const sessionId = localStorage.getItem("id");
    const sessionName = localStorage.getItem("name");
    if (Cookies.get("auth") == null || Cookies.get("auth") == undefined || sessionId == null || sessionName == null) {
      Swal.fire({
        title: "oops!",
        text: "Silahkan login dulu ya...",
        icon: "info",
      });
      router.push("/signin");
    }
    try {
      const response = await fetch("/api/posts/create-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          content: content,
          authorId: parseInt(sessionId!, 10),
          image: imagePublicUrl,
        }),
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Berhasil!",
          text: "Berhasil membuat postingan!",
          icon: "success",
        });
        router.push("/");
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Gagal membuat Postingan!",
          icon: "error",
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
    <div className=" min-h-screen max-h-screen min-w-full px-20 max-w-full flex flex-col justify-evenly items-center bg-white">
      <form className="border shadow rounded max-w-full min-w-full  mx-auto p-20" onSubmit={handleSubmit}>
        <h1 className="text-center font-sans font-bold antialiased">Mau sharing cerita apa hari ini?</h1>
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
          <label htmlFor="content" className="block text-sm font-medium text-gray-900 dark:text-white">
            Konten Postingan
          </label>
          <QuillEditor value={content} onChange={handleEditorChange} modules={quillModules} formats={quillFormats} className="w-full min-h-[80%] mt-1 bg-white" />
          <div>
            <img className="my-3 border max-w-14 min-w-14 min-h-14 max-h-14" src={imagePublicUrl == "" ? "/image/placeholder-image.png" : imagePublicUrl} alt="" />
            <CldUploadWidget
              uploadPreset="nimbrung"
              onSuccess={(result: any) => {
                if (result && result.info && result.info.secure_url) {
                  setImagePublicUrl(result.info.secure_url);
                } else {
                  console.error("Upload failed or no secure_url found in result.");
                }
              }}
            >
              {({ open }) => {
                return (
                  <button
                    className="text-white bg-slate-400 hover:bg-slate-500 focus:outline-none font-medium rounded-lg text-sm max-w-30 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => open()}
                  >
                    Unggah banner
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
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
