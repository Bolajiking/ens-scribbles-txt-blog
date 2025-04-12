
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getPostById } from "../data/posts";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

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
    month: "short",
    day: "2-digit",
  }).replace(",", "");

  // Split the content by Markdown headers to process them
  const contentParts = post.content.split(/(?=^#+\s)/m);

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="flex justify-end mb-8">
        <ThemeToggle />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-medium text-center mb-8">Bolaji Maj's Website</h1>
      
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-3 w-3" /> Back
          </button>
          
          <Link 
            to="/"
            className="text-primary text-xs hover:text-primary/80 transition-colors"
          >
            See all posts
          </Link>
        </div>
        
        {/* Redesigned article headline section */}
        <div className="border-b border-border pb-8 mb-10">
          <div className="relative">
            <div className="absolute -left-4 h-full w-1 bg-primary rounded-full"></div>
            <h1 className="text-2xl md:text-3xl font-normal mb-3">{post.title}</h1>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="inline-block w-3 h-0.5 bg-muted-foreground"></span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="prose prose-stone dark:prose-invert max-w-none text-xs tracking-wide leading-relaxed font-light">
        {contentParts.map((part, index) => {
          // Process Markdown-like content
          if (part.startsWith("# ")) {
            const text = part.substring(2);
            return <h1 key={index} className="text-xl font-light mt-8 mb-4">{text}</h1>;
          } else if (part.startsWith("## ")) {
            const text = part.substring(3);
            return <h2 key={index} className="text-lg font-light mt-6 mb-3">{text}</h2>;
          } else if (part.startsWith("### ")) {
            const text = part.substring(4);
            return <h3 key={index} className="text-base font-light mt-5 mb-2">{text}</h3>;
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
                      <ul key={i} className="list-disc pl-5 my-4 text-xs font-light">
                        {items.map((item, j) => (
                          <li key={j} className="mb-2">{item}</li>
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
                      <ol key={i} className="list-decimal pl-5 my-4 text-xs font-light">
                        {items.map((item, j) => (
                          <li key={j} className="mb-2">{item}</li>
                        ))}
                      </ol>
                    );
                  }
                  
                  // Handle links in text (basic implementation)
                  const processedParagraph = paragraph.replace(
                    /\[([^\]]+)\]\(([^)]+)\)/g, 
                    '<a href="$2" class="text-primary hover:text-primary/80">$1</a>'
                  );
                  
                  return (
                    <p 
                      key={i} 
                      className="my-4 leading-relaxed text-xs tracking-wide font-light"
                      dangerouslySetInnerHTML={{ __html: processedParagraph }}
                    />
                  );
                })}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default PostPage;
