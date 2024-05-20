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

  const handleSignout = async (e: any) => {
    if (token) {
      localStorage.clear();
      Cookies.remove("auth");
      Swal.fire({
        title: "Behasil!",
        text: "Anda sudah logout!",
        icon: "success",
      });
      router.push("/");
    } else if (!token) {
      localStorage.clear();
      router.push("/");
    }
  };
  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://asset.cloudinary.com/du4zezzcw/12464a4a3265ef15f819ca6a054fda53" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {token !== undefined ? (
            <div className="flex">
              <Link href="/posts/create-post">
                <div className="max-w-10 max-h-10 me-5 rounded-md border-2 border-black">
                  <img alt="buat postingan" src="image/pencil.png"></img>
                </div>
              </Link>

              <button
                type="button"
                className="text-sm w-8 h-8 bg-gray-400 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
              </button>
              <p className="text-black">{localStorage.getItem("name")}</p>
            </div>
          ) : (
            <div className="flex flex-row">
              <Link href="/posts/create-post">
                <div className="max-w-10 max-h-10 me-5 rounded-md border-2 border-black">
                  <img alt="buat postingan" src="image/pencil.png"></img>
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
          <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Earnings
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
