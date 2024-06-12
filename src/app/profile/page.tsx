"use client";

import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
const moments = require("moment");
import "moment/locale/id";
import DOMPurify from "dompurify";
import Loading from "@/app/components/Loading";

interface Post {
  title: string;
  comment: string;
}

export default function Profile() {
  const router = useRouter();
  const [showUserPost, setShowUserPost] = useState(false);
  const [userPost, setUserPost] = useState<any>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [oriFullName, setOriFullName] = useState("");
  const [oriEmail, setOriEmail] = useState("");
  const [oriPassword, setOriPassword] = useState("");
  const [image, setImage] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const sessionId = localStorage.getItem("id");
    const sessionName = localStorage.getItem("name");

    if (Cookies.get("auth") === null || Cookies.get("auth") === undefined || sessionId == null || sessionName == null) {
      localStorage.clear();
      router.push("/");
    }
    async function fetchUser() {
      const data = await axios.get("/api/users/" + sessionId);
      setFullName(data.data.data.user.fullname);
      setUserId(data.data.data.user.id);
      setEmail(data.data.data.user.email);
      setImage(data.data.data.user.image);
      setPassword(data.data.data.user.password);
      setPassword(data.data.data.user.password);
      setOriFullName(data.data.data.user.fullname);

      setOriEmail(data.data.data.user.email);
      setOriPassword(data.data.data.user.password);
      setOriPassword(data.data.data.user.password);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchUserPost() {
      try {
        const data = await axios.get("/api/posts/user/" + userId);
        let tempData = [];

        for (let item of data.data.data) {
          item.createdAt = moments(item.createdAt).locale("id").fromNow();
          tempData.push(item);
        }
        setUserPost(tempData);
      } catch (error: any) {
        Swal.fire({
          title: "Gagal!",
          text: "Gagal memuat postinganmu!",
          icon: "error",
        });
      }
    }
    if (userId !== null) {
      fetchUserPost();
    }
  }, [userId]);

  const handleSignOut = async (e: any) => {
    if (Cookies.get("auth")) {
      localStorage.clear();
      Cookies.remove("auth");
      Swal.fire({
        title: "Behasil!",
        text: "Anda sudah logout!",
        icon: "success",
      });
      router.push("/");
    } else if (Cookies.get("auth") == null) {
      localStorage.clear();
      router.push("/");
    }
  };
  useEffect(() => {
    const handleHashChange = () => {
      setShowUserPost(window.location.hash === "#posts");
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const deleteHandler = async (title: String) => {
    const sessionId = localStorage.getItem("id");
    const sessionName = localStorage.getItem("name");
    if (Cookies.get("auth") === null || Cookies.get("auth") === undefined || sessionId == null || sessionName == null) {
      localStorage.clear();
      Swal.fire({
        title: "Oops!",
        text: "Kamu belum login nih!",
        icon: "warning",
      });
      router.push("/");
    }
    try {
      const response = await axios.delete("/api/posts/" + title);
      if (response.status === 200) {
        Swal.fire({
          title: "Berhasil!",
          text: "Postinganmu berhasil dihapus",
          icon: "success",
        });
        const newPosts = userPost.filter((item: any) => item.title !== title);
        setUserPost(newPosts);
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Gagal ngehapus postinganmu",
          icon: "error",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: "Yah... sistem lagi gangguan nih!",
        icon: "error",
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName,
          password: password,
        }),
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Berhasil!",
          text: "Berhasil update profile!",
          icon: "success",
        });
        setOriFullName(fullName);
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Gagal update profile!",
          icon: "error",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: "Yah... sistem lagi gangguan nih!",
        icon: "error",
      });
    }
  };
  const handleReset = (e: any) => {
    e.preventDefault();
    setFullName(oriFullName);
    setEmail(oriEmail);
    setPassword(oriPassword);
  };

  return fullName == "" ? (
    <>
      <div className="flex justify-center items-center max-w-screen min-w-screen max-h-screen min-h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Loading type={"spin"} color={"#aaaaaa"} />
      </div>
    </>
  ) : (
    <>
      <script src="../../../node_modules/preline/dist/preline.js" async></script>

      <Navbar></Navbar>
      <div className="bg-white flex align-items-center justify-evenly min-h-screen px-5 pt-6">
        <div className="flex border flex-col items-center max-h-[330px] p-2 rounded">
          {image === "" ? (
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://res.cloudinary.com/du4zezzcw/image/upload/v1716389749/male_xq7rip.png" alt="Bonnie image" />
          ) : (
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://res.cloudinary.com/du4zezzcw/image/upload/v1716389748/female_oc4qdm.png" alt="Bonnie image" />
          )}
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{oriFullName}</h5>
          <div className="pt-4">
            <div className="flex flex-row w-60 p-2 max-w-sm rounded  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
              <a href="/profile">
                <h1 className="pl-3 text-[14px] text-ellipsis overflow-hidden ">Tentang Saya </h1>
              </a>
            </div>
          </div>
          <div className="pt-4">
            <div className="flex flex-row w-60 p-2 max-w-sm rounded  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
              <a href="#posts">
                <h1 className="pl-3 text-[14px] text-ellipsis overflow-hidden ">Postingan</h1>
              </a>
            </div>
          </div>
          <div className="flex mt-4 md:mt-6">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Keluar
            </button>
          </div>
        </div>
        {showUserPost ? (
          <div className="min-h-full max-h-full min-w-[60%] max-w-[60%] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            {userPost.map((item: any, i: number) => (
              <div key={i} className="overflow-y-auto p-3 mb-3 border rounded-md min-h-[20%] max-h-[20%] min-w-full max-w-full flex justify-between" style={{ scrollbarWidth: "none" }}>
                <div className="flex flex-col justify-between">
                  <Link href={`/posts/${item.title}`}>
                    <h1 className="font-bold text-xl">{item.title}</h1>
                  </Link>
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content.substring(0, 90)) }}></div>
                  <div className="mb-0">
                    <p className="text-slate-600 ">{item.createdAt}</p>
                  </div>
                  <Link className="" href={`/posts/${item.title}`}>
                    <div className="rounded p-2 max-w-[164px] min-h-[24px] bg-blue-600">
                      <p className="text-white">Baca selengkapnya</p>
                    </div>
                  </Link>
                </div>
                <div className=" min-h-[100%] self-center">
                  <button onClick={() => deleteHandler(item.title)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // </div>
          <form className="min-h-full max-h-full min-w-[60%] max-w-[60%] " onSubmit={handleSubmit}>
            <div className="flex flex-col  py-4 rounded px-6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-full ">
              <div className="md:flex flex flex-row md:items-center  mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 pr-4 text-left" htmlFor="inline-full-name">
                    Nama
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600"
                    id="inline-full-name"
                    type="text"
                    required
                  ></input>
                </div>
              </div>
              <div className="md:flex  flex flex-row  md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 pr-4 text-left" htmlFor="inline-full-name">
                    Email
                  </label>
                </div>
                <div className="md:w-2/3">
                  <div className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="inline-full-name">
                    {email}
                  </div>
                </div>
              </div>
              <div className="md:flex  flex flex-row  md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 pr-4 text-left" htmlFor="inline-full-name">
                    Password
                  </label>
                </div>
                <div className="md:w-2/3 flex">
                  <input
                    id="hs-toggle-password"
                    type={showPassword ? "text" : "password"}
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <button type="button" onClick={togglePasswordVisibility} className=" p-3.5 rounded-e-md">
                    {showPassword ? (
                      <svg className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    ) : (
                      <svg className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line x1="2" x2="22" y1="2" y2="22"></line>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="md:flex  flex-row md:items-center mb-1">
                <div className="me-4 shadow border rounded-md border-black">
                  <div className="xl:max-w-[1280px] w-full h-full">
                    <button className=" bg-cream text-orange  font-bold py-2 px-8 hover:text-orange outline-cream rounded" onClick={handleReset}>
                      Reset
                    </button>
                  </div>
                </div>
                <div className="rounded-md bg-blue-600 hover:bg-blue-800 flex justify-center">
                  <div className="xl:max-w-[1280px]  w-full h-full">
                    <button className="text-white text-center text-orange py-2 px-8  hover:text-orange outline-cream rounded" type="submit">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
