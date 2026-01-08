import { Plus } from "lucide-react";

interface AddTaskInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export const AddTaskInput = ({ value, onChange, onAdd }: AddTaskInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div
      className="p-4 rounded-2xl"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
      }}
    >
      <div className="flex gap-3">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What's your focus today?"
          className="flex-1 px-4 py-3 rounded-xl outline-none"
          style={{
            background: "transparent",
            color: "var(--card-title)",
            border: "1px solid var(--card-border)",
          }}
        />
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-6 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          <Plus />
        </button>
      </div>
    </div>
  );
};