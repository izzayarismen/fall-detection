import { Link, useRouterState } from "@tanstack/react-router";

import {
  Bell,
  Cctv,
  History,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

const NAV_ITEMS: { to: string; label: string; icon: LucideIcon }[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/kamera", label: "Kamera", icon: Cctv },
  { to: "/riwayat", label: "Riwayat", icon: History },
  { to: "/pengaturan", label: "Pengaturan", icon: Settings },
];

const TEAM_AVATARS = [
  { initials: "RA", className: "bg-primary text-primary-foreground" },
  { initials: "BD", className: "bg-secondary text-secondary-foreground" },
  { initials: "SK", className: "bg-destructive text-destructive-foreground" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (

    <div className="flex min-h-screen gap-5 p-5">
      <aside className="card-shadow sticky top-5 flex h-[calc(100vh-2.5rem)] w-60 shrink-0 flex-col rounded-4xl bg-card p-5">
        <div className="px-2 pb-7 pt-1">
          <Link to="/dashboard" className="inline-block">
            <span className="text-2xl font-extrabold tracking-tight text-primary font-display">
              waspada
            </span>
          </Link>
          <p className="mt-1 text-xs font-medium text-muted-foreground">
            Sistem Deteksi Jatuh &amp; Monitoring CCTV
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground card-shadow"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon className="size-5" strokeWidth={2} />
                {item.label}
              </Link>
            );
          })}

        </nav>

        <button
          type="button"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="size-5" strokeWidth={2} />
          Logout
        </button>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-4 px-2 pb-6 pt-1">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">Selamat Siang, Pak Andi!</h1>
            <p className="text-sm text-muted-foreground">
              Semua kamera dipantau secara real-time
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm font-medium text-muted-foreground md:block">
              Kamis, 22 Oktober 2026 · 12:57 WIB
            </span>
            <button
              type="button"
              aria-label="Notifikasi"
              className="card-shadow relative flex size-11 items-center justify-center rounded-full bg-card transition-transform hover:scale-105"
            >
              <Bell className="size-5 text-foreground" />
              <span className="absolute right-2.5 top-2.5 size-2.5 rounded-full bg-destructive" />
            </button>
            <div className="flex items-center -space-x-3">
              {TEAM_AVATARS.map((avatar) => (
                <span
                  key={avatar.initials}
                  className={`flex size-11 items-center justify-center rounded-full border-2 border-card text-xs font-bold ${avatar.className}`}
                >
                  {avatar.initials}
                </span>
              ))}
              <span className="card-shadow flex size-11 items-center justify-center rounded-full border-2 border-card bg-card text-foreground">
                <Plus className="size-4" />
              </span>
            </div>
          </div>
        </header>

        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
