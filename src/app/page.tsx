"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPostData() {
      const response = await axios.get("http://localhost:3000/api/posts");
      setPosts(response.data.data);
    }

    fetchPostData();
  }, []);
  return (
    <>
      <Navbar></Navbar>
      {posts.map((item, i) => (
        <a key={i} href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <a href={"/posts/" + item.id} className="text-gray-900 dark:text-white">
              {item.title}
            </a>
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{item.content}</p>
        </a>
      ))}
    </>
  );
}
