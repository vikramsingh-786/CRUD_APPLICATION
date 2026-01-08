import { LayoutGrid, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { CircularProgress } from "./CircularProgress";

interface StatsCardsProps {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}

export const StatsCards = ({ total, completed, pending, completionRate }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div
        className="p-6 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-1"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
        }}
      >
        <div className="flex justify-between mb-3">
          <p style={{ color: "var(--card-muted)" }}>Total Tasks</p>
          <LayoutGrid className="w-5 h-5 text-blue-500" />
        </div>
        <p
          className="text-3xl font-bold"
          style={{ color: "var(--card-title)" }}
        >
          {total}
        </p>
      </div>

      <div
        className="p-6 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-1"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
        }}
      >
        <div className="flex justify-between mb-3">
          <p style={{ color: "var(--card-muted)" }}>Completed</p>
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
        <p
          className="text-3xl font-bold"
          style={{ color: "var(--card-title)" }}
        >
          {completed}
        </p>
      </div>

      <div
        className="p-6 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-1"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
        }}
      >
        <div className="flex justify-between mb-3">
          <p style={{ color: "var(--card-muted)" }}>Pending</p>
          <Clock className="w-5 h-5 text-orange-500" />
        </div>
        <p
          className="text-3xl font-bold"
          style={{ color: "var(--card-title)" }}
        >
          {pending}
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-white flex items-center justify-between overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-blue-100 font-medium">Task Completion</p>
            <TrendingUp className="w-4 h-4 text-blue-200" />
          </div>
          <p className="text-3xl font-bold">{completionRate}%</p>
          <p className="text-xs text-blue-200 mt-1">
            {completed} of {total} tasks done
          </p>
        </div>
        
        <div className="relative z-10 bg-white/10 p-2 rounded-full backdrop-blur-sm">
          <CircularProgress 
            percentage={completionRate} 
            size={70} 
            strokeWidth={6} 
          />
        </div>

        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};