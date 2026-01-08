import { LogOut, LayoutGrid } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  userName?: string;
  onLogout?: () => void;
  showLogo?: boolean;
}

export const Navbar = ({ userName, onLogout, showLogo = true }: NavbarProps) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    // Call custom onLogout if provided
    if (onLogout) {
      onLogout();
    }

    // Clear auth state
    logout?.();

    // Instant full redirect — no blank flash
    window.location.href = "/login";
  };

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        background: "var(--card-bg)",
        borderBottom: "1px solid var(--card-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {showLogo && (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <LayoutGrid className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                JudixTask
              </h1>
              {userName && (
                <p style={{ color: "var(--card-muted)" }} className="text-sm">
                  Hi, {userName}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <>
              <div className="h-8 w-px bg-slate-300/40 dark:bg-slate-700/40" />
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-500 transition-colors duration-200 p-2 rounded-lg hover:bg-red-500/10"
                title="Logout"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};