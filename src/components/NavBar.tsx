
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Blockchains", path: "/category/blockchains" },
  { name: "Cryptography", path: "/category/cryptography" },
  { name: "Economics", path: "/category/economics" },
  { name: "Fun", path: "/category/fun" },
  { name: "General", path: "/category/general" },
  { name: "Web3", path: "/category/web3" },
  { name: "Philosophy", path: "/category/philosophy" },
];

const NavBar = () => {
  const isMobile = useIsMobile();
  
  return (
    <nav className="w-full">
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
        <Link to="/" className={cn(
          "text-base hover:text-primary transition-colors",
          "text-primary font-medium" // Active state for home
        )}>
          Home
        </Link>
        
        {categories.map((category) => (
          <Link 
            key={category.name}
            to={category.path} 
            className="text-base text-muted-foreground hover:text-primary transition-colors"
          >
            {category.name}
          </Link>
        ))}
        
        <Link to="/about" className="text-base text-muted-foreground hover:text-primary transition-colors">
          About
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
