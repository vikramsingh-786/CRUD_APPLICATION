"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Lock,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";

export default function LandingPage() {
  const { user } = useAuth();
  const userDisplayName = user?.name || user?.email?.split("@")[0] || "";

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ background: "var(--bg-gradient)" }}
    >
      <Navbar userName={userDisplayName} />

      <main className="max-w-7xl mx-auto px-6 md:px-8 pt-16 md:pt-24 pb-20">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 shadow-lg"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
            }}
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--card-text)" }}
            >
              Scalable Full-Stack Solution
            </span>
          </div>

          <h2
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
            style={{ color: "var(--card-title)" }}
          >
            Manage your tasks
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              with confidence
            </span>
          </h2>

          <p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            style={{ color: "var(--card-muted)" }}
          >
            A modern, secure, and lightning-fast task management application.
            Built with Next.js 15, powered by enterprise-grade authentication.
          </p>

          {!user && (
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link
                href="/register"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/40 transition flex items-center justify-center gap-2"
              >
                Start for free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 rounded-2xl text-lg font-semibold border transition"
                style={{
                  background: "var(--card-bg)",
                  color: "var(--card-text)",
                  border: "1px solid var(--card-border)",
                }}
              >
                View Demo
              </Link>
            </div>
          )}

          <div
            className="flex flex-wrap justify-center items-center gap-6 text-sm"
            style={{ color: "var(--card-muted)" }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-500" />
              <span>Secure & encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span>Setup in 2 minutes</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-24">
          {[
            {
              title: "Secure Authentication",
              desc: "JWT-based auth with bcrypt encryption. Industry-standard security practices.",
              icon: ShieldCheck,
              color: "blue",
            },
            {
              title: "Lightning Fast",
              desc: "Built with Next.js 15 and Turbopack for instant performance.",
              icon: Zap,
              color: "indigo",
            },
            {
              title: "Intuitive CRUD",
              desc: "Manage tasks effortlessly with real-time search and filters.",
              icon: CheckCircle2,
              color: "purple",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="p-8 rounded-3xl transition hover:-translate-y-2"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br from-${f.color}-500 to-${f.color}-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
              >
                <f.icon className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ color: "var(--card-title)" }}
              >
                {f.title}
              </h3>
              <p style={{ color: "var(--card-muted)" }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white shadow-2xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Secure</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">&lt;100ms</div>
              <div className="text-blue-100">Response Time</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">∞</div>
              <div className="text-blue-100">Scalability</div>
            </div>
          </div>
        </div>
      </main>

      <footer
        className="mt-20 py-8 backdrop-blur"
        style={{
          background: "var(--card-bg)",
          borderTop: "1px solid var(--card-border)",
        }}
      >
        <div
          className="max-w-7xl mx-auto px-6 text-center text-sm"
          style={{ color: "var(--card-muted)" }}
        >
          © 2026 JudixTask. Built for the Judix Full-Stack Developer Assignment.
        </div>
      </footer>
    </div>
  );
}
