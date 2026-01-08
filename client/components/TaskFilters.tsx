import { Search } from "lucide-react";

interface TaskFiltersProps {
  searchQuery: string;
  filterStatus: "all" | "pending" | "completed";
  onSearchChange: (query: string) => void;
  onFilterChange: (status: "all" | "pending" | "completed") => void;
}

export const TaskFilters = ({
  searchQuery,
  filterStatus,
  onSearchChange,
  onFilterChange,
}: TaskFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            color: "var(--card-title)",
          }}
        />
      </div>

      <div
        className="flex gap-2 p-1 rounded-xl"
        style={{ background: "var(--card-bg)" }}
      >
        {(["all", "pending", "completed"] as const).map((status) => (
          <button
            key={status}
            onClick={() => onFilterChange(status)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              filterStatus === status
                ? "bg-blue-600 text-white"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};