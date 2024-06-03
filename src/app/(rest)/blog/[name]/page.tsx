"use client";

import { useBackend } from "@/external/client";
import { ModelTypes } from "@/types/zeus";
import moment from "moment";
import { useEffect, useState } from "react";

export default function Blog({ params }: { params: { name: string } }) {
  const { getBlog } = useBackend();
  const [blog, setBlog] = useState<undefined | ModelTypes["Blog"]>();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const b = await getBlog(params.name);
        setBlog(b);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {blog?.image && (
        <div className="mb-6">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-md"
          />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-4">{blog?.title}</h1>
      <p className="text-gray-500 mb-8">
        {moment(blog?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </p>
      <div className="text-lg leading-relaxed">{blog?.text}</div>
    </div>
  );
}
