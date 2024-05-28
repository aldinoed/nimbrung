"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import axios from "axios";
import Link from "next/link";
import Loading from "./components/Loading";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    async function fetchPostData() {
      const response = await axios.get("http://localhost:3000/api/posts");
      if (response.data.data !== undefined) {
        setPosts(response.data.data);
        setLoaded(true);
      } else {
        console.log("agdajdhghsagj");
        setPosts([]);
        setLoaded(true);
      }
    }

    fetchPostData();
  }, []);
  return (
    <>
      <div className="min-h-screen max-h-screen bg-white" style={{ minWidth: "100vh !important" }}>
        <Navbar></Navbar>

        <div className="flex  justify-center align-items-center  bg-white" style={{ marginTop: "0" }}>
          {loaded === false ? (
            <div className="mt-20 relative min-h-screen min-w-screen flex justify-center align-items-center " style={{ minHeight: "0%", minWidth: "80%" }}>
              <Loading type={"spin"} color={"#aaaaaa"} />
            </div>
          ) : posts.length === 0 ? (
            <div className="flex-col flex mx-auto align-items-center max-h-52 max-w-52">
              <img src="image/empty-folder.png" alt="" />
              <h1 className="mt-4 text-center text-black text-lg font-bold">Belum ada postingan</h1>
            </div>
          ) : (
            <div className="flex flex-col align-items-center max-w-screen py-12 px-24">
              {posts.map((item: any, i: any) => (
                <div key={i} className="text-wrap block mb-3 max-w-full min-w-full max-h-52 min-h-52 p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <Link href={`/posts/${item.title}`} className="text-gray-900 dark:text-white">
                      {item.title}
                    </Link>
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400 text-wrap">{item.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
