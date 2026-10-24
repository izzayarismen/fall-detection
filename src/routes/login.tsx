import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, BrainCircuit, Siren } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Waspada — Masuk ke Akun Anda" },
      {
        name: "description",
        content: "Masuk ke dashboard Waspada untuk memantau kamera dan menerima fall alert real-time.",
      },
      { property: "og:title", content: "Waspada — Masuk ke Akun Anda" },
      {
        property: "og:description",
        content:
          "Masuk ke dashboard Waspada untuk memantau kamera dan menerima fall alert real-time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void navigate({ to: "/dashboard" });
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-full bg-primary-foreground/15">
            <Siren className="size-5" />
          </span>
          <span className="text-2xl font-bold tracking-tight font-display">waspada</span>
        </Link>
        <div>
          <h2 className="max-w-md text-4xl leading-tight font-bold">
            Selamat datang kembali. Orang tersayang Anda tetap dalam pantauan.
          </h2>
          <ul className="mt-8 space-y-4 text-sm text-primary-foreground/85">
            <li className="flex items-center gap-3">
              <BrainCircuit className="size-5 shrink-0" />
              AI memantau seluruh kamera 24/7
            </li>
            <li className="flex items-center gap-3">
              <Siren className="size-5 shrink-0" />
              Fall alert terkirim rata-rata 2,4 detik
            </li>
          </ul>
        </div>
        <p className="text-xs text-primary-foreground/50">
          © 2026 Waspada · Sistem Deteksi Jatuh &amp; Monitoring CCTV
        </p>
      </aside>

      {/* Form */}
      <main className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <Button
            asChild
            variant="ghost"
            className="-ml-2 mb-6 rounded-full text-muted-foreground"
          >
            <Link to="/">
              <ArrowLeft className="size-4" />
              Kembali ke beranda
            </Link>
          </Button>

          <div className="card-shadow rounded-4xl bg-card p-8">
            <h1 className="text-3xl font-bold text-foreground">Masuk</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Masuk untuk melihat dashboard pemantauan Anda.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-2xl bg-background px-4 py-6"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Kata Sandi</Label>
                  <a href="#" className="text-xs font-semibold text-primary hover:underline">
                    Lupa kata sandi?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-2xl bg-background px-4 py-6"
                />
              </div>
              <Button type="submit" size="lg" className="rounded-full font-semibold">
                Masuk
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Belum punya akun?{" "}
              <Link to="/register" className="font-semibold text-primary hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
