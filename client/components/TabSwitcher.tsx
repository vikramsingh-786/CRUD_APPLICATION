import { LayoutGrid, Settings } from "lucide-react";

interface TabSwitcherProps {
  activeTab: "tasks" | "settings";
  onTabChange: (tab: "tasks" | "settings") => void;
}

export const TabSwitcher = ({ activeTab, onTabChange }: TabSwitcherProps) => {
  return (
    <div
      className="flex gap-2 p-1 rounded-xl inline-flex"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
      }}
    >
      <button
        onClick={() => onTabChange("tasks")}
        className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
          activeTab === "tasks"
            ? "bg-blue-600 text-white shadow-lg"
            : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
        My Tasks
      </button>
      <button
        onClick={() => onTabChange("settings")}
        className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
          activeTab === "settings"
            ? "bg-blue-600 text-white shadow-lg"
            : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        <Settings className="w-4 h-4" />
        Settings
      </button>
    </div>
  );
};