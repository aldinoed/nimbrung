"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import axios from "axios";

export default function Navbar() {
  // const [token, setToken] = useState(undefined)
  const token = Cookies.get("auth");

  const router = useRouter();

  const handleSignIn = (e: any) => {
    router.push("/signin");
  };

  const handleSignUp = (e: any) => {
    router.push("/signup");
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("name");
    user ?? setUser(user);
  }, []);

  return (
    <div className="sticky top-0  bg-white border-gray-200 dark:bg-gray-900 shadow-md" style={{ minWidth: "100%", marginTop: "0px" }}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://res.cloudinary.com/du4zezzcw/image/upload/v1716191006/nimbrung_1_idevuj.png" className="h-16" alt="nimbrung" />
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {token !== undefined ? (
            <div className="flex">
              <Link href="/posts/create-post">
                <div className="max-w-10 max-h-10 me-5 rounded-md border-2 border-black">
                  <img alt="buat postingan" src="https://res.cloudinary.com/du4zezzcw/image/upload/v1716348215/pencil_ogwf4a.png"></img>
                </div>
              </Link>

              <Link href="/profile">
                <button
                  type="button"
                  className="text-sm w-8 h-8 bg-gray-400 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-8 rounded-full" src="https://res.cloudinary.com/du4zezzcw/image/upload/v1716389749/male_xq7rip.png" alt="user photo" />
                </button>
              </Link>
              <p className="text-black">{localStorage.getItem("name")}</p>
            </div>
          ) : (
            <div className="flex flex-row">
              <Link href="/posts/create-post">
                <div className="max-w-10 max-h-10 me-5 rounded-md border-2 border-black">
                  <img alt="" src="https://res.cloudinary.com/du4zezzcw/image/upload/v1716348215/pencil_ogwf4a.png"></img>
                </div>
              </Link>
              <div>
                <button
                  onClick={handleSignIn}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Masuk
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
