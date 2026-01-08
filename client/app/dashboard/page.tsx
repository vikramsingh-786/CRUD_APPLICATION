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
import { TaskList } from "@/components/TaskList";
import { SettingsForm } from "@/components/SettingsForm";

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


  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/tasks");
        setTasks(data);
      } catch (error: any) {
        const msg = error.response?.data?.message || "Failed to load tasks";
        toast.error(msg);
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

    try {
      const { data } = await api.post("/tasks", { title: newTask });
      setTasks((prev) => [data, ...prev]);
      setNewTask("");
      toast.success("Task added");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to add task";
      toast.error(msg);
    }
  };

  const toggleTask = async (id: string, status: string) => {
    const newStatus = status === "completed" ? "pending" : "completed";

    try {
      await api.put(`/tasks/${id}`, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, status: newStatus as any } : t
        )
      );
    } catch (error: any) {
      const msg = error.response?.data?.message || "Update failed";
      toast.error(msg);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success("Task deleted");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Delete failed";
      toast.error(msg);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(profileData);
      toast.success("Profile updated successfully");
      setProfileData((prev) => ({ ...prev, password: "" }));
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Failed to update profile";

      const errors = error.response?.data?.errors;
      if (Array.isArray(errors)) {
        errors.forEach((err) =>
          toast.error(err.msg || err.message)
        );
      } else {
        toast.error(msg);
      }
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || task.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status === "pending").length,
    completionRate:
      tasks.length > 0
        ? Math.round(
            (tasks.filter((t) => t.status === "completed").length /
              tasks.length) *
              100
          )
        : 0,
  };

  return (
    <ProtectedRoute>
      <div
        className="min-h-screen transition-colors duration-500"
        style={{ background: "var(--bg-gradient)" }}
      >
        <Navbar userName={user?.name || ""} onLogout={logout} />

        <main className="max-w-7xl mx-auto p-6 space-y-8">
          <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "tasks" ? (
            <>
              <StatsCards {...stats} />

              <AddTaskInput
                value={newTask}
                onChange={setNewTask}
                onAdd={addTask}
              />

              <TaskFilters
                searchQuery={searchQuery}
                filterStatus={filterStatus}
                onSearchChange={setSearchQuery}
                onFilterChange={setFilterStatus}
              />

              {loading ? (
                <div className="text-center py-10">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                  <p
                    className="mt-4"
                    style={{ color: "var(--card-title)" }}
                  >
                    Loading tasks...
                  </p>
                </div>
              ) : (
                <TaskList
                  tasks={filteredTasks}
                  searchQuery={searchQuery}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
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
