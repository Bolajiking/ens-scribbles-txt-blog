
import { Link } from "react-router-dom";
import { Post } from "../data/posts";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <div className="mb-10">
      <div className="text-base text-muted-foreground mb-1">{formattedDate}</div>
      <h2 className="text-2xl font-normal mb-1">
        <Link to={`/post/${post.id}`} className="text-primary hover:text-primary/80 transition-colors">
          {post.title}
        </Link>
      </h2>
    </div>
  );
};

export default PostCard;
