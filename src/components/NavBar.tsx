
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const isMobile = useIsMobile();
  
  return (
    <nav className="w-full">
      <div className="flex flex-col items-center gap-6">
        <p className="text-muted-foreground italic text-sm md:text-base">
          A little corner of the internet to braindump
        </p>
        
        <div className="flex gap-6">
          <Link to="/" className={cn(
            "text-base hover:text-primary transition-colors",
            "text-primary font-medium" // Active state for home
          )}>
            Home
          </Link>
          
          <Link to="/about" className="text-base text-muted-foreground hover:text-primary transition-colors">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
