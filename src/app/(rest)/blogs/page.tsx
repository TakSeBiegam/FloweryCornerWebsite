"use client";

import { blogIdeas } from "@/data/blogIdeas";
import { BlogTile } from "./_components/BlogTile";
import { useBackend } from "@/external/client";
import { useEffect, useState } from "react";
import { ModelTypes } from "@/types/zeus";

export default function Blogs() {
  const { getBlogs } = useBackend();
  const [blogs, setBlogs] = useState<undefined | ModelTypes["Blog"][]>();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const b = await getBlogs();
        setBlogs(b);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-10">
      {blogs?.map((b) => (
        <BlogTile {...b} key={b.title} />
      ))}
    </div>
  );
}
