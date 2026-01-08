import { Calendar } from "lucide-react";

interface EmptyStateProps {
  searchQuery: string;
}

export const EmptyState = ({ searchQuery }: EmptyStateProps) => {
  return (
    <div
      className="text-center py-20 rounded-3xl backdrop-blur-sm"
      style={{
        background: "var(--card-bg)",
        border: "2px dashed var(--card-border)",
      }}
    >
      <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
        <Calendar className="w-12 h-12 text-blue-400" />
      </div>
      <h3
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--card-title)" }}
      >
        Clean Slate!
      </h3>
      <p
        className="max-w-xs mx-auto"
        style={{ color: "var(--card-muted)" }}
      >
        {searchQuery 
          ? "No tasks match your search. Try a different keyword." 
          : "You've cleared your schedule! Add a new task above to stay productive."}
      </p>
    </div>
  );
};