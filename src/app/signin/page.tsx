"use client";

import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  if (Cookies.get("auth") === null || Cookies.get("auth") === undefined) {
    localStorage.clear();
  } else {
    router.push("/");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      // console.log(response)
      const data = await response.json();
      if (response.status === 200) {
        Cookies.set("auth", data.data.token, { expires: 10 / (24 * 60) });
        localStorage.setItem("id", data.data.user.id);
        localStorage.setItem("name", data.data.user.fullname);
        Swal.fire({
          title: "Berhasil!",
          text: "Berhasil login",
          icon: "success",
        });
        router.push("/");
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "User atau Password Salah",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: String(error),
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center max-h-screen min-h-screen">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-xl text-center font-medium text-gray-900 dark:text-white">Masuk</h5>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Masuk
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Belum punya akun?{" "}
            <a href="/signup" className="text-blue-700 hover:underline dark:text-blue-500">
              Daftar
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
