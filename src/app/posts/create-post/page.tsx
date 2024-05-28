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
// import { useEditor } from "@tiptap/react";
// import Highlight from "@tiptap/extension-highlight";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import TextAlign from "@tiptap/extension-text-align";
// import Superscript from "@tiptap/extension-superscript";
// import SubScript from "@tiptap/extension-subscript";

export default function Publish() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePublicUrl, setImagePublicUrl] = useState("");
  let sessionId = localStorage.getItem("id");
  let sessionName = localStorage.getItem("name");

  if (Cookies.get("auth") == null || Cookies.get("auth") == undefined || sessionId == null || sessionName == null) {
    Swal.fire({
      title: "oops!",
      text: "Silahkan login dulu ya...",
      icon: "info",
    });
    router.push("/signin");
  }

  //   const editor = useEditor({
  //     extensions: [StarterKit, Underline, Link, Superscript, SubScript, Highlight, TextAlign.configure({ types: ["heading", "paragraph"] })],
  //     content,
  //   });
  useEffect(() => {}, [imagePublicUrl]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (Cookies.get("auth") == null || Cookies.get("auth") == undefined || sessionId == null || sessionName == null) {
      Swal.fire({
        title: "oops!",
        text: "Silahkan login dulu ya...",
        icon: "info",
      });
      router.push("/signin");
    }
    sessionId = localStorage.getItem("id") ?? "";
    try {
      const response = await fetch("http://localhost:3000/api/posts/create-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          content: content,
          authorId: parseInt(sessionId, 10),
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
    <div className="min-h-screen max-h-screen flex flex-col justify-evenly items-center bg-white">
      <h1 className="font-sans font-bold antialiased">Mau sharing cerita apa hari ini?</h1>
      <form className="max-w-60 mx-auto" onSubmit={handleSubmit}>
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
          <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Konten Postingan
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            id="content"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <div>
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
                return <button onClick={() => open()}>Upload an Image</button>;
              }}
            </CldUploadWidget>
          </div>
          {/* <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Undo />
                <RichTextEditor.Redo />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
          </RichTextEditor> */}
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
