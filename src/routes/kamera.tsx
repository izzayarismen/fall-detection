import { createFileRoute } from "@tanstack/react-router";
import { Cctv, MapPin, Pencil, Plus, Trash2 } from "lucide-react";

import feedBedroom from "@/assets/feed-bedroom.jpg";
import feedKitchen from "@/assets/feed-kitchen.jpg";
import feedLivingRoom from "@/assets/feed-living-room.jpg";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/kamera")({
  head: () => ({
    meta: [
      { title: "Kamera CCTV — Rumi" },
      {
        name: "description",
        content:
          "Kelola daftar kamera CCTV: tambah, edit, dan hapus feed RTSP/HTTP yang diproses model deteksi jatuh.",
      },
      { property: "og:title", content: "Kamera CCTV — Rumi" },
      {
        property: "og:description",
        content:
          "Kelola daftar kamera CCTV: tambah, edit, dan hapus feed RTSP/HTTP yang diproses model deteksi jatuh.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KameraPage,
});

const CAMERAS = [
  {
    name: "Ruang Tamu",
    cam: "Cam 01",
    location: "Ruang Tamu",
    url: "rtsp://admin:••••••@192.168.1.50:554/stream1",
    protocol: "RTSP",
    status: "online",
    image: feedLivingRoom,
  },
  {
    name: "Kamar Utama",
    cam: "Cam 02",
    location: "Kamar Utama",
    url: "http://192.168.1.51:8080/video",
    protocol: "MJPEG",
    status: "online",
    image: feedBedroom,
  },
  {
    name: "Dapur",
    cam: "Cam 03",
    location: "Dapur",
    url: "rtsp://admin:••••••@192.168.1.52:554/stream1",
    protocol: "RTSP",
    status: "online",
    image: feedKitchen,
  },
  {
    name: "Garasi",
    cam: "Cam 04",
    location: "Garasi",
    url: "rtsp://admin:••••••@192.168.1.53:554/stream1",
    protocol: "RTSP",
    status: "offline",
    image: null,
  },
];

function KameraPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3 px-2">
          <div>
            <h2 className="text-xl font-extrabold text-foreground">Kamera CCTV</h2>
            <p className="text-sm text-muted-foreground">
              Daftarkan stream RTSP/HTTP untuk diproses model deteksi jatuh.
            </p>
          </div>
          <Button className="rounded-full">
            <Plus className="size-4" />
            Tambah Kamera
          </Button>
        </div>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {CAMERAS.map((camera) => (
            <article key={camera.cam} className="card-shadow overflow-hidden rounded-3xl bg-card">
              <div className="relative">
                {camera.image ? (
                  <img
                    src={camera.image}
                    alt={`Feed kamera ${camera.name}`}
                    width={1280}
                    height={720}
                    loading="lazy"
                    className="aspect-video w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 bg-muted">
                    <Cctv className="size-8 text-muted-foreground/60" />
                    <span className="text-xs font-semibold text-muted-foreground">
                      Menyambung ulang…
                    </span>
                  </div>
                )}
                <span className="absolute left-3 top-3">
                  <Badge
                    className={`rounded-full ${camera.status === "online" ? "bg-success" : "bg-destructive"}`}
                  >
                    {camera.status === "online" ? "Online" : "Offline"}
                  </Badge>
                </span>
              </div>
              <div className="flex flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-foreground">{camera.name}</h3>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3.5" />
                      {camera.location} · {camera.cam}
                    </p>
                  </div>
                  <Badge variant="secondary" className="rounded-full">
                    {camera.protocol}
                  </Badge>
                </div>
                <p className="truncate rounded-xl bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
                  {camera.url}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 rounded-full bg-card">
                    <Pencil className="size-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-card text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </article>
          ))}

          {/* Registration form (static) */}
          <article className="card-shadow flex flex-col gap-4 rounded-3xl bg-card p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Plus className="size-5" />
              </span>
              <div>
                <h3 className="font-bold text-foreground">Daftarkan Kamera Baru</h3>
                <p className="text-xs text-muted-foreground">
                  Aktif dalam &lt; 2 menit sesuai target onboarding
                </p>
              </div>
            </div>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="camera-name" className="text-xs font-bold text-foreground">
                  Nama Kamera
                </label>
                <Input
                  id="camera-name"
                  placeholder="cth. Kamar Anak"
                  className="rounded-xl bg-muted"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="camera-location" className="text-xs font-bold text-foreground">
                  Lokasi
                </label>
                <Input
                  id="camera-location"
                  placeholder="cth. Lantai 1 — Kamar Anak"
                  className="rounded-xl bg-muted"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="camera-url" className="text-xs font-bold text-foreground">
                  URL Stream (RTSP / HTTP)
                </label>
                <Input
                  id="camera-url"
                  placeholder="rtsp://admin:password@192.168.1.54:554/stream1"
                  className="rounded-xl bg-muted font-mono text-xs"
                />
              </div>
              <Button type="submit" className="mt-1 rounded-full">
                Daftarkan Kamera
              </Button>
            </form>
          </article>
        </section>
      </div>
    </AppShell>
  );
}
