
import { Link } from "react-router-dom";
import { Post } from "../data/posts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="mb-6 border-border bg-card hover:bg-card/80 transition-colors">
      <CardHeader className="pb-4">
        <div className="text-sm text-muted-foreground mb-1">{formattedDate}</div>
        <CardTitle>
          <Link to={`/post/${post.id}`} className="text-foreground hover:text-foreground/90">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
        <Link 
          to={`/post/${post.id}`} 
          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Read more <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default PostCard;
