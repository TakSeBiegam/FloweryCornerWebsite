import { ModelTypes } from "@/types/zeus";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const BlogTile = (blog: ModelTypes["Blog"]) => {
  const router = useRouter(); // Initialize the router

  const movePage = (page: string) => {
    router.push(`/blog/${page}`); // Navigate to the corresponding blog page
  };
  return (
    <div className="bg-white p-1 rounded-xl" onClick={() => movePage(blog._id)}>
      <div className=" h-72 overflow-hidden relative">
        <Image
          className="object-cover rounded-2xl"
          fill
          src={blog.image}
          alt={blog.image}
        />
      </div>
      <p className="font-medium py-4"> {blog.title}</p>
    </div>
  );
};
