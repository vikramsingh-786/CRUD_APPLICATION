"use client";

import { User } from "lucide-react";

interface ProfileData {
  name: string;
  email: string;
  password: string;
}

interface SettingsFormProps {
  profileData: ProfileData;
  onChange: (data: ProfileData) => void;
  onSubmit: () => void;
  loading?: boolean;
}

export const SettingsForm = ({
  profileData,
  onChange,
  onSubmit,
  loading = false,
}: SettingsFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="max-w-2xl mx-auto p-8 rounded-3xl"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
      }}
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3
            className="text-2xl font-bold"
            style={{ color: "var(--card-title)" }}
          >
            Profile Settings
          </h3>
          <p className="text-sm" style={{ color: "var(--card-muted)" }}>
            Update your account information
          </p>
        </div>
      </div>


      <div className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--card-title)" }}
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={profileData.name}
            onChange={(e) =>
              onChange({ ...profileData, name: e.target.value })
            }
            placeholder="Your full name"
            className="w-full px-4 py-3 rounded-xl outline-none transition focus:ring-2 focus:ring-blue-500/30"
            style={{
              background: "transparent",
              border: "1px solid var(--card-border)",
              color: "var(--card-title)",
            }}
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--card-title)" }}
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={profileData.email}
            onChange={(e) =>
              onChange({ ...profileData, email: e.target.value })
            }
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl outline-none transition focus:ring-2 focus:ring-blue-500/30"
            style={{
              background: "transparent",
              border: "1px solid var(--card-border)",
              color: "var(--card-title)",
            }}
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--card-title)" }}
          >
            New Password
          </label>
          <input
            id="password"
            type="password"
            value={profileData.password}
            onChange={(e) =>
              onChange({ ...profileData, password: e.target.value })
            }
            placeholder="Leave blank to keep current password"
            className="w-full px-4 py-3 rounded-xl outline-none transition focus:ring-2 focus:ring-blue-500/30"
            style={{
              background: "transparent",
              border: "1px solid var(--card-border)",
              color: "var(--card-title)",
            }}
          />
          <p className="text-xs mt-1" style={{ color: "var(--card-muted)" }}>
            Only fill this field if you want to change your password
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-6 py-3 rounded-xl font-semibold transition shadow-lg ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};
