"use client";

import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {useRouter } from "next/navigation";
import {Router as NexRouter} from "next/router"

export default function SignUp() {
  // const navigate = useNavigate();
  const router =  useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          fullname: fullname,
        }),
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Berhasil!",
          text: "Berhasil registrasi",
          icon: "success",
        });
        // navigate('/signin')
        router.push('/signin');
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
          <h5 className="text-xl font-medium text-gray-900 text-center dark:text-white">
            Daftar
          </h5>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
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
            <label
              htmlFor="fullname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nama
            </label>
            <input
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              type="text"
              name="fullname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Rusel Van Persie"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
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
            Daftar
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Sudah punya akun?{" "}
            <a
              href="/signin"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Masuk
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
