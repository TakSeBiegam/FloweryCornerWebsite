import { blogIdeas } from "@/data/blogIdeas";
import { BlogTile } from "./_components/BlogTile";

export default function Blog() {
  return (
    <div className="grid grid-cols-3 gap-10">
      {blogIdeas.map((b) => (
        <BlogTile {...b} />
      ))}
    </div>
  );
}
