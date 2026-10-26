import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BellRing,
  BrainCircuit,
  Cctv,
  CheckCircle2,
  ChevronRight,
  History,
  MonitorSmartphone,
  ShieldCheck,
  Siren,
  UserRound,
} from "lucide-react";

import feedLivingRoom from "@/assets/feed-living-room.jpg";
import fallSnapshot from "@/assets/fall-snapshot.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rumi — Deteksi Jatuh Real-Time untuk Orang Tersayang" },
      {
        name: "description",
        content:
          "Rumi memantau kamera CCTV 24/7 dengan AI dan mengirim fall alert ke pendamping dalam hitungan detik. Mulai lindungi keluarga Anda hari ini.",
      },
      { property: "og:title", content: "Rumi — Deteksi Jatuh Real-Time untuk Orang Tersayang" },
      {
        property: "og:description",
        content:
          "Rumi memantau kamera CCTV 24/7 dengan AI dan mengirim fall alert ke pendamping dalam hitungan detik. Mulai lindungi keluarga Anda hari ini.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const STATS = [
  { value: "2,4 dtk", label: "Waktu respons rata-rata" },
  { value: "99,6%", label: "Uptime sistem" },
  { value: "< 3 dtk", label: "Latensi alert konsisten" },
  { value: "24/7", label: "Pemantauan berbasis AI" },
];

const FEATURES = [
  {
    icon: BrainCircuit,
    title: "Deteksi jatuh berbasis AI",
    description:
      "Model AI menganalisis setiap frame kamera secara real-time dan mengenali pola kejadian jatuh tanpa perlu sensor tambahan.",
  },
  {
    icon: BellRing,
    title: "Notifikasi multi-pendamping",
    description:
      "Saat insiden terdeteksi, peringatan dengan snapshot terkirim ke seluruh pendamping dalam rata-rata 2,4 detik.",
  },
  {
    icon: Cctv,
    title: "Mode CCTV multi-kamera",
    description:
      "Pantau seluruh ruangan dalam satu dashboard — ruang tamu, kamar, dapur, hingga garasi dengan status kamera live.",
  },
];

const STEPS = [
  {
    icon: Cctv,
    title: "Pasang kamera",
    description: "Hubungkan kamera CCTV yang sudah ada di rumah — tidak memerlukan perangkat baru.",
  },
  {
    icon: BrainCircuit,
    title: "AI memantau 24/7",
    description: "Rumi menganalisis setiap ruangan secara terus-menerus, siang dan malam.",
  },
  {
    icon: Siren,
    title: "Alert dalam hitungan detik",
    description: "Saat kejadian jatuh terdeteksi, snapshot dan lokasi langsung dikirim.",
  },
  {
    icon: CheckCircle2,
    title: "Pendamping menangani",
    description: "Pendamping terdekat merespons dan menandai insiden sebagai ditangani.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Ibu saya tinggal sendiri dan pernah jatuh tanpa ada yang tahu berjam-jam. Sejak pakai Rumi, saya dapat notifikasi sebelum sempat khawatir.",
    name: "Rina Andini",
    role: "Anak pendamping, Jakarta",
    initials: "RA",
  },
  {
    quote:
      "Tim kami memantau 12 kamar di rumah perawatan. Waktu respons yang dulu belasan menit sekarang di bawah 3 detik.",
    name: "Bayu Dwiputra",
    role: "Koordinator caregiver, Bandung",
    initials: "BD",
  },
];

const FAQS = [
  {
    q: "Apakah saya perlu membeli kamera khusus?",
    a: "Tidak. Rumi bekerja dengan kamera CCTV yang sudah Anda miliki selama kamera dapat diakses melalui jaringan rumah Anda.",
  },
  {
    q: "Seberapa cepat notifikasi terkirim saat ada kejadian jatuh?",
    a: "Rata-rata alert terkirim dalam 2,4 detik dan selalu konsisten di bawah target 3 detik, lengkap dengan snapshot dan lokasi kamera.",
  },
  {
    q: "Siapa saja yang menerima peringatan?",
    a: "Hanya pendamping yang Anda daftarkan. Setiap anggota keluarga atau caregiver dapat menerima alert di perangkat masing-masing.",
  },
  {
    q: "Bagaimana dengan privasi dan rekaman kamera?",
    a: "Anda yang mengatur siapa yang dapat melihat setiap kamera. Tidak ada pihak lain yang dapat mengakses feed atau data insiden Anda.",
  },
  {
    q: "Apakah bisa dipakai untuk rumah perawatan?",
    a: "Bisa. Mode multi-kamera dan multi-pendamping dirancang untuk keluarga sekaligus tim caregiver yang memantau banyak kamar.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 px-4 pt-4">
        <nav className="card-shadow mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full bg-card/90 py-3 pl-6 pr-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary">
              <Siren className="size-4.5 text-primary-foreground" />
            </span>
            <span className="text-xl font-bold tracking-tight text-primary font-display">Rumi</span>
          </div>
          <div className="hidden items-center gap-7 text-sm font-semibold text-muted-foreground md:flex">
            <a href="#fitur" className="transition-colors hover:text-foreground">
              Fitur
            </a>
            <a href="#cara-kerja" className="transition-colors hover:text-foreground">
              Cara Kerja
            </a>
            <a href="#testimoni" className="transition-colors hover:text-foreground">
              Testimoni
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="rounded-full font-semibold">
              <Link to="/login">Masuk</Link>
            </Button>
            <Button asChild className="rounded-full font-semibold">
              <Link to="/register">
                Coba Sekarang
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-24">
        {/* Hero */}
        <section className="grid items-center gap-10 pt-10 lg:grid-cols-[1.05fr_1fr] lg:pt-14">
          <div>
            <Badge variant="secondary" className="gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold">
              <BrainCircuit className="size-3.5 text-primary" />
              Deteksi jatuh berbasis AI
            </Badge>
            <h1 className="mt-5 text-5xl leading-[1.05] font-bold text-foreground lg:text-6xl">
              Deteksi jatuh dalam hitungan detik, bukan menit.
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground">
              Rumi memantau kamera CCTV Anda 24/7 dan langsung mengirim peringatan ke seluruh
              pendamping saat kejadian jatuh terdeteksi — rata-rata hanya 2,4 detik.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full px-7 font-semibold">
                <Link to="/register">Mulai Gratis</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full bg-card px-7 font-semibold"
              >
                <Link to="/dashboard">Lihat Dashboard</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-3">
                {[
                  { i: "RA", c: "bg-primary text-primary-foreground" },
                  { i: "BD", c: "bg-secondary text-secondary-foreground" },
                  { i: "SK", c: "bg-card-teal text-card-teal-foreground" },
                ].map((a) => (
                  <span
                    key={a.i}
                    className={`flex size-10 items-center justify-center rounded-full border-2 border-card text-xs font-bold ${a.c}`}
                  >
                    {a.i}
                  </span>
                ))}
              </div>
              <p className="text-sm font-semibold text-muted-foreground">
                Dipercaya 200+ keluarga &amp; rumah perawatan
              </p>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="card-shadow rounded-4xl bg-card p-3">
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src={feedLivingRoom}
                  alt="Feed kamera ruang tamu yang dipantau Rumi"
                  width={1280}
                  height={720}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-xs font-bold text-foreground">
                  <span className="size-2 animate-pulse rounded-full bg-destructive" />
                  Live · Ruang Tamu · Cam 01
                </div>
              </div>
            </div>
            <div className="card-shadow absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl bg-card p-3 pr-5 sm:-left-8">
              <img
                src={fallSnapshot}
                alt="Snapshot kejadian jatuh terdeteksi"
                width={96}
                height={64}
                className="h-14 w-20 rounded-xl object-cover"
              />
              <div>
                <p className="flex items-center gap-1.5 text-xs font-bold text-destructive">
                  <Siren className="size-3.5" />
                  Fall Alert
                </p>
                <p className="text-sm font-bold text-foreground">Terdeteksi · 2,4 dtk</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="card-shadow grid gap-6 rounded-4xl bg-card p-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <p className="font-display text-4xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Features */}
        <section id="fitur" className="scroll-mt-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold text-foreground">
              Semua yang Anda butuhkan untuk menjaga orang tersayang
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Satu dashboard untuk memantau kamera, menerima fall alert real-time, dan mengelola
              riwayat insiden — tanpa perangkat tambahan.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <article key={feature.title} className="card-shadow rounded-3xl bg-card p-6">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <feature.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="cara-kerja" className="scroll-mt-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold text-foreground">
              Pemantauan sederhana, perlindungan menyeluruh
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Dari pemasangan hingga penanganan insiden, empat langkah yang berjalan otomatis.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <article key={step.title} className="relative card-shadow rounded-3xl bg-card p-6">
                <span className="font-display text-sm font-bold text-primary">
                  Langkah {index + 1}
                </span>
                <span className="mt-3 flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <step.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <section className="rounded-4xl bg-primary px-8 py-14 text-center text-primary-foreground">
          <h2 className="mx-auto max-w-2xl text-4xl font-bold">
            Mulai lindungi orang tersayang hari ini
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/80">
            Daftarkan keluarga Anda dalam beberapa menit. Tanpa perangkat baru, tanpa komitmen.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-card px-7 font-semibold text-primary hover:bg-card/90"
            >
              <Link to="/register">Daftar Sekarang</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-primary-foreground/30 bg-transparent px-7 font-semibold text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/dashboard">Lihat Dashboard</Link>
            </Button>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimoni" className="scroll-mt-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold text-foreground">Dipercaya oleh keluarga Indonesia</h2>
            <p className="mt-4 text-base text-muted-foreground">
              Cerita pendamping yang kini lebih tenang dengan Rumi.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="card-shadow rounded-3xl bg-card p-6">
                <blockquote className="text-base text-foreground">“{t.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold text-foreground">Pertanyaan yang sering diajukan</h2>
          </div>
          <div className="card-shadow mx-auto mt-12 max-w-3xl rounded-4xl bg-card p-6 sm:p-8">
            <Accordion type="single" collapsible className="gap-2">
              {FAQS.map((faq, index) => (
                <AccordionItem key={faq.q} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left text-base font-bold text-foreground hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground/95 px-4 pb-10 pt-16 text-background">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-start justify-between gap-10">
            <div className="max-w-sm">
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary">
                  <Siren className="size-4.5 text-primary-foreground" />
                </span>
                <span className="text-xl font-bold tracking-tight font-display text-background">
                  Rumi
                </span>
              </div>
              <p className="mt-4 text-sm text-background/60">
                Sistem deteksi jatuh &amp; monitoring CCTV untuk keluarga dan rumah perawatan di
                Indonesia.
              </p>
            </div>
            <div className="flex flex-wrap gap-16 text-sm">
              <div>
                <p className="font-bold text-background">Produk</p>
                <ul className="mt-3 space-y-2 text-background/60">
                  <li>
                    <a href="#fitur" className="transition-colors hover:text-background">
                      Fitur
                    </a>
                  </li>
                  <li>
                    <a href="#cara-kerja" className="transition-colors hover:text-background">
                      Cara Kerja
                    </a>
                  </li>
                  <li>
                    <Link to="/dashboard" className="transition-colors hover:text-background">
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-background">Akun</p>
                <ul className="mt-3 space-y-2 text-background/60">
                  <li>
                    <Link to="/login" className="transition-colors hover:text-background">
                      Masuk
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="transition-colors hover:text-background">
                      Daftar
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-background">Bantuan</p>
                <ul className="mt-3 space-y-2 text-background/60">
                  <li>
                    <a href="#faq" className="transition-colors hover:text-background">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <Link to="/pengaturan" className="transition-colors hover:text-background">
                      Pengaturan
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-6 border-t border-background/10 pt-6 text-center text-xs text-background/40">
            © 2026 Rumi. Sistem Deteksi Jatuh &amp; Monitoring CCTV.
          </p>
        </div>
      </footer>
    </div>
  );
}
