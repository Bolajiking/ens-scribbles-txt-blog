
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-full bg-secondary/50 p-1 px-2 shadow-sm">
      <Sun className={`h-4 w-4 transition-opacity ${theme === 'light' ? 'text-primary' : 'text-muted-foreground opacity-70'}`} />
      <Switch 
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-primary"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      />
      <Moon className={`h-4 w-4 transition-opacity ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground opacity-70'}`} />
    </div>
  );
};

export default ThemeToggle;
