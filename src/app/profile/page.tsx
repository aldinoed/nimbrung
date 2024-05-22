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
  const [user, setUser] = useState<User | null>(null);

  if (Cookies.get("auth") === null || Cookies.get("auth") === undefined || localStorage.getItem("id") == null || localStorage.getItem("name") == null) {
    localStorage.clear();
    router.push("/");
  }
  useEffect(() => {
    async function fetchUser() {
      const data = await axios.get("http://localhost:3000/api/users/" + localStorage.getItem("id"));
      console.log("🚀 ~ fetchUser ~ data.data.data.user:", data.data.data.user);
      setUser(data.data.data.user);
    }
    fetchUser();
  }, []);

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

  return user == null ? (
    <>
      <div className="flex justify-center items-center">
        <Loading type={"spin"} color={"#aaaaaa"} />
      </div>
    </>
  ) : (
    <>
      <div className="w-full max-w-screen min-w-screen max-h-screen min-h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Navbar></Navbar>
        <div className="flex flex-col items-center pb-10">
          <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image" />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.fullname}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
          <div className="flex mt-4 md:mt-6">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
