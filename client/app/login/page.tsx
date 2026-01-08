"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LogIn,
  Mail,
  Lock,
  Loader2,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Login failed";

      const apiErrors = error.response?.data?.errors;

      if (Array.isArray(apiErrors)) {
        apiErrors.forEach((err: any) =>
          toast.error(err.msg || err.message)
        );
      } else {
        toast.error(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-500"
      style={{ background: "var(--bg-gradient)" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 dark:bg-blue-600 rounded-full blur-xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 dark:bg-purple-600 rounded-full blur-xl opacity-20" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-400 dark:bg-indigo-600 rounded-full blur-xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center gap-2 transition-colors"
            style={{ color: "var(--card-muted)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to home</span>
          </Link>
          <ThemeToggle />
        </div>

        <div
          className="backdrop-blur-xl rounded-3xl p-8 md:p-10 transition-colors duration-500"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
          }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <LogIn className="w-8 h-8 text-white" />
            </div>

            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: "var(--card-title)" }}
            >
              Welcome Back
            </h2>

            <p className="text-sm" style={{ color: "var(--card-muted)" }}>
              Enter your credentials to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "var(--card-text)" }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-gray-900 dark:text-white"
                  placeholder="you@example.com"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-sm mt-1 text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "var(--card-text)" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-gray-900 dark:text-white"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm mt-1 text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <LogIn />
                </>
              )}
            </button>
          </form>

          <Link
            href="/register"
            className="block text-center mt-6 font-medium transition-colors"
            style={{ color: "var(--card-text)" }}
          >
            Create an account →
          </Link>
        </div>

        <p
          className="text-center text-sm mt-6 flex justify-center gap-2"
          style={{ color: "var(--card-muted)" }}
        >
          <CheckCircle2 className="text-blue-500" />
          Enterprise-grade security included
        </p>
      </div>
    </div>
  );
}
