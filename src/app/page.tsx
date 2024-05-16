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
      {Array.isArray(posts) &&
        posts.map((item, i) => (
          <a
            href="#"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item[i]}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </a>
        ))}
    </>
  );
}
