"use client";
import Navbar from "@/app/components/Navbar";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
// import { Text, Avatar, Group } from "@mantine/core";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
const moments = require("moment");
import "moment/locale/id";
import Loading from "../../components/Loading";
// import whiteSpaceCommentCleaner from "../../lib/whiteSpaceCleaner";

interface Comment {
  postId: number;
  authorId: number;
  comment: String;
}

export default function DetailPost() {
  const router = useRouter();
  const param = useParams();
  const [commentData, setCommentData] = useState<any>([]);
  const [authorId, setAuthorId] = useState(null);
  const [authorName, setAuthorName] = useState(null);
  const [postId, setPostId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [comment, setComment] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [imagePublicUrl, setImagePublicUrl] = useState("");

  async function fetchUser(id: any) {
    const data = await axios.get("/api/users/" + id);
    setAuthorName(data.data.data.user.fullname);
  }

  async function fetchDetailPost() {
    const data = await axios.get("/api/posts/" + param.title);
    setPostId(data.data.data.id);
    setTimeout(() => {}, 500);
    setTitle(data.data.data.title);
    setContent(data.data.data.content);
    setAuthorId(data.data.data.authorId);
    let parsedDate = moments(data.data.data.createdAt).locale("id").fromNow();
    setPublishDate(parsedDate);
    setImagePublicUrl(data.data.data.image);
  }
  async function fetchComment() {
    const data = await axios.get(`/api/posts/comment/${postId}`);
    let tempData = [];

    for (let item of data.data.data) {
      item.createdAt = moments(item.createdAt).locale("id").fromNow();
      tempData.push(item);
    }
    fetchUser(data.data.data.authorId);
    setCommentData(tempData);
    setLoaded(true);
  }

  useEffect(() => {
    fetchDetailPost();
  }, []);
  useEffect(() => {
    if (postId !== null) {
      fetchComment();
    }
  }, [postId]);

  const hanldeCommentSubmit = async (e: any) => {
    e.preventDefault();
    if (Cookies.get("auth") === null || Cookies.get("auth") === undefined) {
      Swal.fire({
        title: "oops!",
        text: "Silahkan masuk terlebih dahulu!",
        icon: "info",
      });
      router.push("/signin");
    } else {
      const userId = localStorage.getItem("id");
      try {
        const response = await fetch("/api/posts/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: parseInt(postId!),
            comment: comment.trim(),
            userId: parseInt(authorId!),
          }),
        });
        let res = await response.json();
        setComment("");
        if (response.status === 200) {
          Swal.fire({
            title: "Berhasil!",
            text: res.message,
            icon: "success",
          });
        } else if (response.status === 400) {
          Swal.fire({
            title: "Oops!",
            text: "Komentar kosong",
            icon: "warning",
          });
        }
        fetchComment();
      } catch (error: any) {
        Swal.fire({
          title: "Error!",
          text: "Error: " + error,
          icon: "warning",
        });
      }
    }
  };
  return (
    <>
      {loaded === false ? (
        <div className="flex justify-center items-center max-w-screen min-w-screen max-h-screen min-h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Loading type={"spin"} color={"#aaaaaa"} />
        </div>
      ) : (
        <div className="min-h-screen bg-white pt-0 min-w-screen max-w-screen">
          <Navbar></Navbar>
          {/* <div className=""> */}
          <div className="px-10 pt-12 bg-white mx-auto min-h-full max-w-full min-w-full">
            <div className="border flex flex-col p-5 rounded-md">
              <h1 className="text-black text-center font-bold text-3xl mb-5">{title}</h1>
              <div className=" max-w-full min-w-full flex flex-col " style={{ marginTop: "3re" }}>
                {imagePublicUrl != null ? <div className="flex justify-center">{imagePublicUrl && <img src={imagePublicUrl} className="self-center max-w-44 max-h-44" alt="Description of my image" />}</div> : <div></div>}
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}></div>
                <span className="text-slate-600 pt-3">Diposting {publishDate}</span>
                <span className="text-slate-600">Oleh {authorName}</span>
              </div>
            </div>
            <form onSubmit={hanldeCommentSubmit} className="rounded-md bg-white mx-auto mt-5 max-w-full min-w-full flex justify-center">
              <div className=" mt-5 " style={{ maxWidth: "60%", minWidth: "60%" }}>
                <h4 className="text-black font-bold text-3sm mb-5">Komentar</h4>
                {/* <Image src={""} alt="banner" /> */}

                <div className="flex justify-center pb-5">
                  <input
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    type="text"
                    id="base-input"
                    required
                    placeholder="Tulis komentar disini"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block min-w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <button className="max-w-10 min-w-10 min-h-10 max-h-10 bg-blue  rounded-full">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </div>
              </div>
            </form>
            <div>
              {commentData.length === 0 ? (
                <div className="flex-col flex mx-auto align-items-center my-7 max-h-52 max-w-52">
                  <h1 className="mt-4 text-center text-black text-lg font-bold">Belum ada komentar</h1>
                </div>
              ) : (
                <div className="mx-auto min-h-[200px] max-h-[200px] max-w-[50%] min-w-[50%] overflow-y-auto flex justify-center flex-col align-items-center mt-4" style={{ scrollbarWidth: "none" }}>
                  {commentData.map((item: any, i: number) => (
                    <div key={i} className="mb-2 rounded-md border min-h-24 min-w-full flex-col align-items-center max-w-full">
                      <div className="flex">
                        <div className="flex flex-col mt-2">
                          <span className="font-bold">{item.user.fullname}</span>
                          <span className="text-xs text-current">{item.createdAt}</span>
                        </div>
                      </div>
                      <div>
                        <p>{item.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* </div> */}
        </div>
      )}
    </>
  );
}
