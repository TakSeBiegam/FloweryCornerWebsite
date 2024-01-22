import { BlogElement } from "@/data/blogIdeas";
import Image from "next/image";

export const BlogTile = (blog: BlogElement) => {
  return (
    <div className="bg-white p-1 rounded-xl">
      <div className=" h-72 overflow-hidden relative ">
        <Image
          className="object-cover rounded-2xl"
          fill
          src={blog.image}
          alt={blog.image}
        />
      </div>
      <p className="font-medium py-4"> {blog.name}</p>
    </div>
  );
};
