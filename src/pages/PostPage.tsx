
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { getPostById } from "../data/posts";
import { ArrowLeft } from "lucide-react";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = id ? getPostById(id) : undefined;

  useEffect(() => {
    if (!post) {
      navigate("/not-found", { replace: true });
    }
  }, [post, navigate]);

  if (!post) {
    return null;
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Split the content by Markdown headers to process them
  const contentParts = post.content.split(/(?=^#+\s)/m);

  return (
    <Layout>
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </button>
        <h1 className="font-serif">{post.title}</h1>
        <div className="text-muted-foreground mb-6">{formattedDate}</div>
      </div>
      
      <div className="prose prose-stone dark:prose-invert max-w-none">
        {contentParts.map((part, index) => {
          // Process Markdown-like content
          if (part.startsWith("# ")) {
            const text = part.substring(2);
            return <h1 key={index} className="text-3xl font-serif mt-8 mb-4">{text}</h1>;
          } else if (part.startsWith("## ")) {
            const text = part.substring(3);
            return <h2 key={index} className="text-2xl font-serif mt-6 mb-3">{text}</h2>;
          } else if (part.startsWith("### ")) {
            const text = part.substring(4);
            return <h3 key={index} className="text-xl font-serif mt-5 mb-2">{text}</h3>;
          } else {
            // Process paragraphs
            const paragraphs = part.split("\n\n").filter(p => p.trim());
            return (
              <div key={index}>
                {paragraphs.map((paragraph, i) => {
                  // Handle lists
                  if (paragraph.trim().startsWith("- ")) {
                    const items = paragraph
                      .split("\n")
                      .filter(item => item.trim().startsWith("- "))
                      .map(item => item.substring(2));
                    
                    return (
                      <ul key={i} className="list-disc pl-5 my-4">
                        {items.map((item, j) => (
                          <li key={j} className="mb-1">{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  
                  // Handle numbered lists
                  if (/^\d+\.\s/.test(paragraph.trim())) {
                    const items = paragraph
                      .split("\n")
                      .filter(item => /^\d+\.\s/.test(item.trim()))
                      .map(item => item.replace(/^\d+\.\s/, ''));
                    
                    return (
                      <ol key={i} className="list-decimal pl-5 my-4">
                        {items.map((item, j) => (
                          <li key={j} className="mb-1">{item}</li>
                        ))}
                      </ol>
                    );
                  }
                  
                  return <p key={i} className="my-4 leading-relaxed">{paragraph}</p>;
                })}
              </div>
            );
          }
        })}
      </div>
    </Layout>
  );
};

export default PostPage;
