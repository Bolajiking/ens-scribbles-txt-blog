
import { Link } from "react-router-dom";
import { Post } from "../data/posts";
import { ArrowRight } from "lucide-react";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).replace(",", "");

  return (
    <div className="mb-16 pb-8 border-b border-border/50">
      <h2 className="text-3xl md:text-4xl font-normal mb-2">
        <Link to={`/post/${post.id}`} className="hover:text-primary transition-colors">
          {post.title}
        </Link>
      </h2>
      
      <div className="text-base text-muted-foreground mb-6">{formattedDate}</div>
      
      <div className="mb-6 text-sm leading-relaxed">
        {post.excerpt}
      </div>
      
      <div className="flex">
        <Link 
          to={`/post/${post.id}`} 
          className="text-primary text-sm flex items-center hover:text-primary/80 transition-colors hover:underline"
        >
          Read post <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
