
import { ReactNode } from "react";
import NavBar from "./NavBar";
import { Separator } from "./ui/separator";
import ThemeToggle from "./ThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="flex justify-end mb-8">
        <ThemeToggle />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-medium text-center mb-8">Bolaji Maj's Website</h1>
      
      <Separator className="mb-8" />
      
      <NavBar />
      
      <Separator className="my-8" />
      
      <main className="pb-12">
        {children}
      </main>
    </div>
  );
};

export default Layout;
