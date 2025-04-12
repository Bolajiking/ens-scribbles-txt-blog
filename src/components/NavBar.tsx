
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <nav className="py-4 border-b border-border mb-8">
      <div className="container max-w-3xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-lg font-serif font-medium">ENS Blog</Link>
          <div className="hidden sm:flex space-x-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
