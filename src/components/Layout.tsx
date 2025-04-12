
import { ReactNode } from "react";
import NavBar from "./NavBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="container max-w-3xl mx-auto px-4 pb-12">
        {children}
      </main>
      <footer className="py-6 border-t border-border mt-12">
        <div className="container max-w-3xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} • Connected to my ENS profile</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
