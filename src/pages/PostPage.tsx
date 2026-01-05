
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

  // Parse markdown content into elements
  const parseMarkdown = (content: string) => {
    const elements: JSX.Element[] = [];
    let key = 0;

    // Split by double newlines to get blocks, but preserve horizontal rules
    const blocks = content.split(/\n\n+/).filter(block => block.trim());

    blocks.forEach((block) => {
      const trimmed = block.trim();

      // Handle horizontal rules
      if (trimmed.match(/^---+$/)) {
        elements.push(
          <hr key={key++} className="my-8 border-border" />
        );
        return;
      }

      // Handle headers
      if (trimmed.startsWith("# ")) {
        const text = trimmed.substring(2).trim();
        elements.push(
          <h1 key={key++} className="text-2xl font-light mt-8 mb-4">{parseInlineMarkdown(text)}</h1>
        );
        return;
      }
      if (trimmed.startsWith("## ")) {
        const text = trimmed.substring(3).trim();
        elements.push(
          <h2 key={key++} className="text-xl font-light mt-6 mb-3">{parseInlineMarkdown(text)}</h2>
        );
        return;
      }
      if (trimmed.startsWith("### ")) {
        const text = trimmed.substring(4).trim();
        elements.push(
          <h3 key={key++} className="text-lg font-light mt-5 mb-2">{parseInlineMarkdown(text)}</h3>
        );
        return;
      }

      // Handle bullet lists
      if (trimmed.split("\n").every(line => line.trim().startsWith("- ") || line.trim() === "")) {
        const items = trimmed
          .split("\n")
          .filter(line => line.trim().startsWith("- "))
          .map(line => line.trim().substring(2).trim());
        
        elements.push(
          <ul key={key++} className="list-disc pl-5 my-4 text-base font-light">
            {items.map((item, i) => (
              <li key={i} className="mb-2">{parseInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
        return;
      }

      // Handle numbered lists
      if (trimmed.split("\n").every(line => /^\d+\.\s/.test(line.trim()) || line.trim() === "")) {
        const items = trimmed
          .split("\n")
          .filter(line => /^\d+\.\s/.test(line.trim()))
          .map(line => line.trim().replace(/^\d+\.\s/, '').trim());
        
        elements.push(
          <ol key={key++} className="list-decimal pl-5 my-4 text-base font-light">
            {items.map((item, i) => (
              <li key={i} className="mb-2">{parseInlineMarkdown(item)}</li>
            ))}
          </ol>
        );
        return;
      }

      // Handle regular paragraphs
      // Split by single newlines within the block to handle line breaks
      const lines = trimmed.split("\n").filter(line => line.trim());
      lines.forEach((line) => {
        elements.push(
          <p key={key++} className="my-4 leading-relaxed text-base tracking-wide font-light">
            {parseInlineMarkdown(line)}
          </p>
        );
      });
    });

    return elements;
  };

  // Parse inline markdown (bold, italic, links)
  const parseInlineMarkdown = (text: string): (string | JSX.Element)[] => {
    if (!text) return [];
    
    let partKey = 0;
    const parse = (str: string): (string | JSX.Element)[] => {
      const result: (string | JSX.Element)[] = [];
      let remaining = str;
      
      while (remaining.length > 0) {
        // Find the earliest markdown element
        let earliestIndex = Infinity;
        let matchType: 'link' | 'bold' | 'italic' | null = null;
        let match: RegExpMatchArray | null = null;
        
        // Check for links
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
        const linkMatch = remaining.match(linkRegex);
        if (linkMatch && linkMatch.index !== undefined && linkMatch.index < earliestIndex) {
          earliestIndex = linkMatch.index;
          matchType = 'link';
          match = linkMatch;
        }
        
        // Check for bold (**text**)
        const boldRegex = /\*\*([^*]+?)\*\*/;
        const boldMatch = remaining.match(boldRegex);
        if (boldMatch && boldMatch.index !== undefined && boldMatch.index < earliestIndex) {
          earliestIndex = boldMatch.index;
          matchType = 'bold';
          match = boldMatch;
        }
        
        // Check for italic (*text* but not **text**)
        // We need to find *text* where the * is not part of **
        const italicRegex = /\*([^*]+?)\*/;
        const italicMatch = remaining.match(italicRegex);
        if (italicMatch && italicMatch.index !== undefined) {
          const idx = italicMatch.index;
          // Check if it's not part of ** (check character before and after)
          const before = idx > 0 ? remaining[idx - 1] : '';
          const after = idx + italicMatch[0].length < remaining.length ? remaining[idx + italicMatch[0].length] : '';
          if (before !== '*' && after !== '*' && idx < earliestIndex) {
            earliestIndex = idx;
            matchType = 'italic';
            match = italicMatch;
          }
        }
        
        // If no match found, add remaining text and break
        if (!match || matchType === null) {
          if (remaining.length > 0) {
            result.push(remaining);
          }
          break;
        }
        
        // Add text before the match
        if (earliestIndex > 0) {
          result.push(remaining.substring(0, earliestIndex));
        }
        
        // Add the matched element
        if (matchType === 'link' && match) {
          result.push(
            <a
              key={`link-${partKey++}`}
              href={match[2]}
              className="text-primary hover:text-primary/80 underline"
            >
              {parse(match[1])}
            </a>
          );
        } else if (matchType === 'bold' && match) {
          result.push(
            <strong key={`bold-${partKey++}`} className="font-medium">
              {parse(match[1])}
            </strong>
          );
        } else if (matchType === 'italic' && match) {
          result.push(
            <em key={`italic-${partKey++}`} className="italic">
              {parse(match[1])}
            </em>
          );
        }
        
        // Continue with remaining text
        remaining = remaining.substring(earliestIndex + (match[0]?.length || 0));
      }
      
      return result.length > 0 ? result : [str];
    };
    
    return parse(text);
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="flex justify-end mb-8">
        <ThemeToggle />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-medium text-center mb-8">Bolaji Maj's Website</h1>
      
      <div className="mb-10">
        {/* Navigation buttons positioned outside the border, on either side */}
        <div className="flex justify-between items-center mb-4">
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
      
      <div className="prose prose-stone dark:prose-invert max-w-none text-base tracking-wide leading-relaxed font-light">
        {parseMarkdown(post.content)}
      </div>
    </div>
  );
};

export default PostPage;
