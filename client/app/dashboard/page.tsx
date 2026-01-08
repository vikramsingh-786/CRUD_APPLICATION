"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import api from "@/lib/axios";
import { Task } from "@/types";
import toast from "react-hot-toast";

import { Navbar } from "@/components/Navbar";
import { TabSwitcher } from "@/components/TabSwitcher";
import { StatsCards } from "@/components/StatsCards";
import { AddTaskInput } from "@/components/AddTaskInput";
import { TaskFilters } from "@/components/TaskFilters";
import { SettingsForm } from "@/components/SettingsForm";

import { CheckCircle, Circle, Trash2 } from "lucide-react";

export default function Dashboard() {
  const { user, logout, updateProfile } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [newTask, setNewTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] =
    useState<"all" | "pending" | "completed">("all");

  const [activeTab, setActiveTab] = useState<"tasks" | "settings">("tasks");

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  // Inline editing states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/tasks");
        setTasks(data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchTasks();
  }, [user]);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        password: "",
      });
    }
  }, [user]);

  const addTask = async () => {
  if (!newTask.trim()) return;

  const optimisticTask = {
    _id: Date.now().toString(), // Temporary client-side ID
    title: newTask,
    status: "pending" as const,
    createdAt: new Date().toISOString(),
    user: user?._id || "",
  };

  // Instant UI update + feedback
  setTasks((prev) => [optimisticTask, ...prev]);
  setNewTask("");
  toast.success("Task added");

  try {
    const { data } = await api.post("/tasks", { title: newTask });
    setTasks((prev) =>
      prev.map((t) => (t._id === optimisticTask._id ? data : t))
    );
  } catch (error: any) {
    setTasks((prev) => prev.filter((t) => t._id !== optimisticTask._id));
    toast.error(error.response?.data?.message || "Failed to save task");
  }
};

  const toggleTask = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";

    setTasks((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, status: newStatus as "pending" | "completed" } : t
      )
    );

    try {
      await api.put(`/tasks/${id}`, { status: newStatus });
    } catch (error: any) {
      setTasks((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, status: currentStatus as "pending" | "completed" } : t
        )
      );
      toast.error("Failed to update task");
    }
  };

  const deleteTask = async (id: string) => {
    const previousTasks = tasks;
    setTasks((prev) => prev.filter((t) => t._id !== id));

    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted");
    } catch (error: any) {
      setTasks(previousTasks);
      toast.error("Failed to delete task");
    }
  };

  const startEditing = (id: string, title: string) => {
    setEditingId(id);
    setEditValue(title);
  };

  const saveEdit = async (id: string) => {
    if (!editValue.trim()) {
      setEditingId(null);
      return;
    }

    const previousTasks = [...tasks];
    setTasks(tasks.map((t) => (t._id === id ? { ...t, title: editValue } : t)));
    setEditingId(null);

    try {
      await api.put(`/tasks/${id}`, { title: editValue });
      toast.success("Task updated");
    } catch (error: any) {
      setTasks(previousTasks);
      toast.error("Failed to update title");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(profileData);
      toast.success("Profile updated successfully");
      setProfileData((prev) => ({ ...prev, password: "" }));
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to update profile";
      const errors = error.response?.data?.errors;
      if (Array.isArray(errors)) {
        errors.forEach((err: any) => toast.error(err.msg || err.message));
      } else {
        toast.error(msg);
      }
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status === "pending").length,
    completionRate:
      tasks.length > 0
        ? Math.round((tasks.filter((t) => t.status === "completed").length / tasks.length) * 100)
        : 0,
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen transition-colors duration-500" style={{ background: "var(--bg-gradient)" }}>
        <Navbar userName={user?.name || ""} onLogout={logout} />

        <main className="max-w-7xl mx-auto p-6 space-y-8">
          <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "tasks" ? (
            <>
              <StatsCards {...stats} />

              <AddTaskInput value={newTask} onChange={setNewTask} onAdd={addTask} />

              <TaskFilters
                searchQuery={searchQuery}
                filterStatus={filterStatus}
                onSearchChange={setSearchQuery}
                onFilterChange={setFilterStatus}
              />

              {loading ? (
                <div className="text-center py-10">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                  <p className="mt-4" style={{ color: "var(--card-title)" }}>
                    Loading tasks...
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTasks.length === 0 ? (
                    <div
                      className="text-center py-20 rounded-3xl"
                      style={{
                        background: "var(--card-bg)",
                        border: "2px dashed var(--card-border)",
                      }}
                    >
                      <p style={{ color: "var(--card-muted)" }}>
                        {searchQuery || filterStatus !== "all"
                          ? "No tasks match your search."
                          : "No tasks yet. Add one above!"}
                      </p>
                    </div>
                  ) : (
                    filteredTasks.map((task) => (
                      <div
                        key={task._id}
                        className="p-5 rounded-2xl flex items-start gap-4"
                        style={{
                          background: "var(--card-bg)",
                          border: "1px solid var(--card-border)",
                        }}
                      >
                        {/* Toggle Status */}
                        <button onClick={() => toggleTask(task._id, task.status)} className="mt-1">
                          {task.status === "completed" ? (
                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-300 hover:text-blue-500 transition-colors flex-shrink-0" />
                          )}
                        </button>

                        {/* Title or Edit Input */}
                        <div className="flex-1 min-w-0">
                          {editingId === task._id ? (
                            <input
                              autoFocus
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={() => saveEdit(task._id)}
                              onKeyDown={(e) => e.key === "Enter" && saveEdit(task._id)}
                              className="w-full px-2 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-400 outline-none font-medium"
                              style={{ color: "var(--card-title)" }}
                            />
                          ) : (
                            <>
                              <p
                                className={`font-medium break-words ${
                                  task.status === "completed"
                                    ? "line-through text-[var(--card-muted)]"
                                    : "text-[var(--card-title)]"
                                }`}
                              >
                                {task.title}
                              </p>
                              <p className="text-xs mt-1" style={{ color: "var(--card-muted)" }}>
                                {new Date(task.createdAt).toLocaleDateString()}
                              </p>
                            </>
                          )}
                        </div>

                        {/* Edit & Delete Buttons - Always visible */}
                        <div className="flex items-center gap-2">
                          {/* Edit Button - Hidden when already editing */}
                          {editingId !== task._id && (
                            <button
                              onClick={() => startEditing(task._id, task.title)}
                              className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-colors"
                              title="Edit task"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                <path d="m15 5 4 4" />
                              </svg>
                            </button>
                          )}

                          {/* Delete Button - Always visible */}
                          <button
                            onClick={() => deleteTask(task._id)}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors"
                            title="Delete task"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          ) : (
            <SettingsForm
              profileData={profileData}
              onChange={setProfileData}
              onSubmit={handleUpdateProfile}
            />
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}