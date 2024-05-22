"use client";

import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

interface User {
  fullname: string;
  email: string;
  password: string;
}

export default function Profile() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [oriFullName, setOriFullName] = useState("");
  const [oriEmail, setOriEmail] = useState("");
  const [oriPassword, setOriPassword] = useState("");
  const [image, setImage] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState("");

  if (Cookies.get("auth") === null || Cookies.get("auth") === undefined || localStorage.getItem("id") == null || localStorage.getItem("name") == null) {
    localStorage.clear();
    router.push("/");
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    async function fetchUser() {
      const data = await axios.get("http://localhost:3000/api/users/" + localStorage.getItem("id"));
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
      const data = await axios.get("/api/posts/user/" + userId);
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

  const handleSubmit = () => {};
  const handleReset = (e: any) => {
    e.preventDefault();
    setFullName(oriFullName);
    setEmail(oriEmail);
    setPassword(oriPassword);
  };

  return fullName == "" ? (
    <>
      <div className="flex justify-center items-center">
        <Loading type={"spin"} color={"#aaaaaa"} />
      </div>
    </>
  ) : (
    <>
      <script src="../../../node_modules/preline/dist/preline.js"></script>
      <div className=" max-w-screen min-w-screen max-h-screen min-h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Navbar></Navbar>
        <div className="flex justify-evenly min-h-screen max-h-screen px-5 pt-6">
          <div className="flex border flex-col items-center max-h-44">
            {image === "" ? (
              <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://res.cloudinary.com/du4zezzcw/image/upload/v1716389749/male_xq7rip.png" alt="Bonnie image" />
            ) : (
              <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://res.cloudinary.com/du4zezzcw/image/upload/v1716389748/female_oc4qdm.png" alt="Bonnie image" />
            )}
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{oriFullName}</h5>
            <div className="pt-4">
              <div className="flex flex-row w-60 p-2 max-w-sm rounded  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                <a href="">
                  <h1 className="pl-3 text-[14px] text-ellipsis overflow-hidden ">Tentang Saya </h1>
                </a>
              </div>
            </div>
            <div className="pt-4">
              <div className="flex flex-row w-60 p-2 max-w-sm rounded  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                <a href="#instruction">
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
          <form className="min-h-[15%] max-h-[15%]" onSubmit={handleSubmit}>
            <div className="flex flex-col max-h-[60%] min-h-[60%] py-4 rounded px-6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-full ">
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
                <div className="pr-14">
                  <div className="xl:max-w-[1280px] w-full h-full">
                    <div className="">
                      {/* Ganti button dengan Link */}
                      <button className="outline bg-cream text-orange hover:bg-white font-bold py-2 px-10  border-orange hover:text-orange outline-cream rounded" onClick={handleReset}>
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  w-full h-full">
                  <div className="">
                    {/* Ganti button dengan Link */}

                    <button className="outline bg-orange text-white hover:bg-white font-bold w-[345px] py-2 border-orange hover:text-orange outline-orange rounded" type="submit">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
