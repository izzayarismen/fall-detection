import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, ChevronDown, Play } from "lucide-react";

import fallSnapshot from "@/assets/fall-snapshot.jpg";
import feedBedroom from "@/assets/feed-bedroom.jpg";
import feedKitchen from "@/assets/feed-kitchen.jpg";
import feedLivingRoom from "@/assets/feed-living-room.jpg";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/riwayat")({
  head: () => ({
    meta: [
      { title: "Riwayat Deteksi Jatuh | Rumi" },
      {
        name: "description",
        content:
          "Riwayat notifikasi insiden deteksi jatuh: tanggal, lokasi kamera, snapshot, dan klip kejadian.",
      },
      { property: "og:title", content: "Riwayat Deteksi Jatuh | Rumi" },
      {
        property: "og:description",
        content:
          "Riwayat notifikasi insiden deteksi jatuh: tanggal, lokasi kamera, snapshot, dan klip kejadian.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RiwayatPage,
});

const INCIDENTS = [
  {
    date: "22 Okt 2026",
    time: "12:47 WIB",
    camera: "Ruang Tamu · Cam 01",
    clip: "8 dtk",
    image: fallSnapshot,
  },
  {
    date: "21 Okt 2026",
    time: "07:12 WIB",
    camera: "Kamar Utama · Cam 02",
    clip: "12 dtk",
    image: feedBedroom,
  },
  {
    date: "19 Okt 2026",
    time: "16:35 WIB",
    camera: "Dapur · Cam 03",
    clip: "6 dtk",
    image: feedKitchen,
  },
  {
    date: "17 Okt 2026",
    time: "09:03 WIB",
    camera: "Ruang Tamu · Cam 01",
    clip: "5 dtk",
    image: feedLivingRoom,
  },
  {
    date: "15 Okt 2026",
    time: "14:20 WIB",
    camera: "Kamar Utama · Cam 02",
    clip: "10 dtk",
    image: fallSnapshot,
  },
] as const;

function RiwayatPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <div className="px-2">
          <h2 className="text-xl font-extrabold text-foreground">Riwayat Deteksi Jatuh</h2>
          <p className="text-sm text-muted-foreground">
            Semua insiden yang tercatat oleh sistem, lengkap dengan bukti snapshot.
          </p>
        </div>

        {/* Filters */}
        <section className="card-shadow flex flex-wrap items-end gap-4 rounded-3xl bg-card p-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="filter-date" className="text-xs font-bold text-foreground">
              Rentang Tanggal
            </label>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <select
                id="filter-date"
                defaultValue="7"
                className="h-10 appearance-none rounded-xl bg-muted pl-9 pr-9 text-sm font-semibold text-foreground outline-none"
              >
                <option value="7">7 hari terakhir</option>
                <option value="30">30 hari terakhir</option>
                <option value="90">3 bulan terakhir</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="filter-location" className="text-xs font-bold text-foreground">
              Lokasi Kamera
            </label>
            <div className="relative">
              <select
                id="filter-location"
                defaultValue="all"
                className="h-10 appearance-none rounded-xl bg-muted pl-4 pr-9 text-sm font-semibold text-foreground outline-none"
              >
                <option value="all">Semua lokasi</option>
                <option value="ruang-tamu">Ruang Tamu</option>
                <option value="kamar-utama">Kamar Utama</option>
                <option value="dapur">Dapur</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          <Button className="rounded-full">Terapkan Filter</Button>
        </section>

        {/* Incident table */}
        <section className="card-shadow overflow-hidden rounded-3xl bg-card">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-4 font-bold">Bukti</th>
                <th className="px-5 py-4 font-bold">Tanggal &amp; Waktu</th>
                <th className="px-5 py-4 font-bold">Kamera / Lokasi</th>
                <th className="px-5 py-4 font-bold">Klip</th>
              </tr>
            </thead>
            <tbody>
              {INCIDENTS.map((incident) => (
                <tr key={`${incident.date}-${incident.time}`} className="border-b border-border last:border-0">
                  <td className="px-5 py-3">
                    <img
                      src={incident.image}
                      alt={`Snapshot insiden ${incident.camera}`}
                      width={1280}
                      height={720}
                      loading="lazy"
                      className="h-12 w-20 rounded-xl object-cover"
                    />
                  </td>
                  <td className="px-5 py-3 font-semibold text-foreground">
                    {incident.date}
                    <span className="block text-xs font-medium text-muted-foreground">
                      {incident.time}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-semibold text-foreground">{incident.camera}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-bold text-foreground">
                      <Play className="size-3" />
                      {incident.clip}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </AppShell>
  );
}
