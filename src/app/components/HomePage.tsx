"use client";

import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPostData() {
      const response = await axios.get("http://localhost:3000/api/posts");
      console.log("🚀 ~ fetchPostData ~ response:", response)
      setPosts(response.data.data);
      console.log("🚀 ~ fetchPostData ~ response.data.data:", response.data.data)
    }

    fetchPostData();
  }, []);

  return <Navbar></Navbar>;
}
