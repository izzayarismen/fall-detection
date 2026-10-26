import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  ChevronRight,
  CircleAlert,
  Gauge,
  RadioTower,
  RefreshCw,
  Siren,
} from "lucide-react";

import fallSnapshot from "@/assets/fall-snapshot.jpg";
import feedBedroom from "@/assets/feed-bedroom.jpg";
import feedKitchen from "@/assets/feed-kitchen.jpg";
import feedLivingRoom from "@/assets/feed-living-room.jpg";
import { AppShell } from "@/components/app-shell";
import { CameraFullscreenButton } from "@/components/camera-fullscreen-button";
import { CameraStream } from "@/components/camera-stream";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSavedCameras } from "@/lib/cameras";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Rumi | Dashboard Monitoring" },
      {
        name: "description",
        content:
          "Pantau live grid multi-kamera CCTV, terima fall alert real-time, dan lihat ringkasan sistem deteksi jatuh.",
      },
      { property: "og:title", content: "Rumi | Dashboard Monitoring" },
      {
        property: "og:description",
        content:
          "Pantau live grid multi-kamera CCTV, terima fall alert real-time, dan lihat ringkasan sistem deteksi jatuh.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const FEEDS = [
  { name: "Ruang Tamu", cam: "Cam 01", status: "online", image: feedLivingRoom },
  { name: "Garasi", cam: "Cam 04", status: "offline", image: null },
] as const;

const WEEK_ACTIVITY = [
  { day: "Sen", value: 0 },
  { day: "Sel", value: 1 },
  { day: "Rab", value: 0 },
  { day: "Kam", value: 2 },
  { day: "Jum", value: 0 },
  { day: "Sab", value: 1 },
  { day: "Min", value: 0 },
];

function Dashboard() {
  const savedCameras = useSavedCameras();
  const playableCameraCount = savedCameras.filter((camera) => camera.protocol === "HTTP").length;
  const unavailableCameraCount = 1 + savedCameras.length - playableCameraCount;

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        {/* Fall alert banner */}
        <section className="card-shadow flex flex-wrap items-center gap-4 rounded-3xl border border-destructive/30 bg-destructive/10 p-4">
          <img
            src={fallSnapshot}
            alt="Snapshot kejadian jatuh di Ruang Tamu"
            width={112}
            height={64}
            className="h-16 w-28 rounded-2xl object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="gap-1 rounded-full">
                <Siren className="size-3.5" />
                Fall Alert
              </Badge>
              <span className="text-sm font-bold text-foreground">
                Ruang Tamu · Cam 01 · 12:47 WIB
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Kejadian jatuh terdeteksi pada Pak Hartono. Notifikasi terkirim ke 3 pendamping
              dalam 2,1 detik.
            </p>
          </div>
          <Button variant="outline" className="rounded-full bg-card">
            Lihat Detail
          </Button>
        </section>

        <div className="grid items-start gap-5 xl:grid-cols-[2fr_1fr]">
          {/* Live grid */}
          <section className="grid content-start gap-5 sm:grid-cols-2">
            {savedCameras.map((camera, index) => (
              <article
                key={camera.id}
                data-camera-frame
                className="card-shadow group relative aspect-video self-start overflow-hidden rounded-3xl bg-card"
              >
                <CameraStream
                  name={camera.name}
                  url={camera.url}
                  protocol={camera.protocol}
                />
                {camera.protocol === "HTTP" && (
                  <div className="camera-live-only absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-xs font-bold text-foreground">
                    <span className="size-2 rounded-full bg-destructive" />
                    Live
                  </div>
                )}
                <CameraFullscreenButton cameraName={camera.name} />
                <div className="camera-live-only absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10">
                  <p className="text-sm font-bold text-card-teal-foreground">{camera.name}</p>
                  <p className="text-xs text-card-teal-foreground/70">
                    {camera.location} · Cam {String(FEEDS.length + index + 1).padStart(2, "0")}
                  </p>
                </div>
              </article>
            ))}
            {FEEDS.map((feed) =>
              feed.status === "online" ? (
                <article
                  key={feed.cam}
                  data-camera-frame
                  className="card-shadow group relative aspect-video self-start overflow-hidden rounded-3xl bg-card"
                >
                  <img
                    src={feed.image}
                    alt={`Feed kamera ${feed.name}`}
                    width={1280}
                    height={720}
                    loading="lazy"
                    className="camera-media aspect-video w-full object-cover"
                  />
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-xs font-bold text-foreground">
                    <span className="size-2 rounded-full bg-destructive" />
                    Live
                  </div>
                  <CameraFullscreenButton cameraName={feed.name} />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10">
                    <p className="text-sm font-bold text-card-teal-foreground">{feed.name}</p>
                    <p className="text-xs text-card-teal-foreground/70">{feed.cam}</p>
                  </div>
                </article>
              ) : (
                <article
                  key={feed.cam}
                  data-camera-frame
                  className="card-shadow relative flex aspect-video flex-col items-center justify-center gap-2 overflow-hidden rounded-3xl bg-muted"
                >
                  <CameraFullscreenButton cameraName={feed.name} />
                  <Camera className="size-8 text-muted-foreground/60" />
                  <p className="text-sm font-bold text-muted-foreground">Kamera Offline</p>
                  <p className="text-xs text-muted-foreground/70">
                    {feed.name} · {feed.cam} · mencoba tersambung ulang
                  </p>
                  <RefreshCw className="size-4 text-muted-foreground/60" />
                </article>
              ),
            )}
          </section>

          {/* Insights card */}
          <section className="card-shadow flex flex-col gap-3 rounded-3xl bg-card-teal p-4 text-card-teal-foreground">
            <div className="flex items-center justify-between px-2 pt-1">
              <h2 className="text-lg font-bold">Insiden Terbaru</h2>
              <button
                type="button"
                aria-label="Lihat semua insiden"
                className="flex size-8 items-center justify-center rounded-full bg-white/15"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-card p-3 text-foreground">
              <img
                src={fallSnapshot}
                alt="Snapshot insiden jatuh"
                width={96}
                height={64}
                loading="lazy"
                className="h-14 w-20 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">Pak Hartono terdeteksi jatuh</p>
                <p className="text-xs text-muted-foreground">Ruang Tamu · 12:47 WIB</p>
              </div>
            </div>

            <div className="rounded-2xl bg-card p-4 text-foreground">
              <p className="text-sm font-bold">Insiden Hari Ini</p>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground">Kemarin</span>
                <span className="text-sm font-extrabold text-success">
                  <ArrowUpRight className="mr-1 inline size-4" />
                  1 kejadian
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-card p-4 text-foreground">
              <p className="text-sm font-bold">Waktu Pengiriman Alert</p>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground">Target &lt; 3 detik</span>
                <span className="text-sm font-extrabold text-success">2,4 detik</span>
              </div>
            </div>

            <div className="mt-auto rounded-2xl bg-white/15 p-4">
              <p className="text-sm font-semibold">Notifikasi insiden aktif di 3 perangkat.</p>
            </div>
          </section>
        </div>

        {/* Stat cards */}
        <section className="grid gap-5 md:grid-cols-3">
          <div className="card-shadow rounded-3xl bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-foreground">Kamera Aktif</p>
                <p className="mt-2 font-display text-3xl font-bold text-foreground">
                  {3 + playableCameraCount}
                  <span className="text-lg text-muted-foreground">/{4 + savedCameras.length}</span>
                </p>
              </div>
              <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                <Camera className="size-5" />
              </span>
            </div>
            <p className="mt-3 text-xs font-semibold text-destructive">
              <ArrowDownRight className="mr-1 inline size-4" />
              {unavailableCameraCount} kamera belum dapat ditampilkan
            </p>
          </div>

          <div className="card-shadow rounded-3xl bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-foreground">Uptime Sistem</p>
                <p className="mt-2 font-display text-3xl font-bold text-foreground">
                  99,6<span className="text-lg text-muted-foreground">%</span>
                </p>
              </div>
              <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                <RadioTower className="size-5" />
              </span>
            </div>
            <p className="mt-3 text-xs font-semibold text-success">
              <ArrowUpRight className="mr-1 inline size-4" />
              Di atas target 99,5%
            </p>
          </div>

          <div className="card-shadow rounded-3xl bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-foreground">Latensi Alert</p>
                <p className="mt-2 font-display text-3xl font-bold text-foreground">
                  2,4<span className="text-lg text-muted-foreground"> dtk</span>
                </p>
              </div>
              <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                <Gauge className="size-5" />
              </span>
            </div>
            <p className="mt-3 text-xs font-semibold text-success">
              <CircleAlert className="mr-1 inline size-4 text-success" />
              Real-time, konsisten &lt; 3 detik
            </p>
          </div>
        </section>

        {/* Weekly activity */}
        <section className="card-shadow rounded-3xl bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-foreground">Insiden 7 Hari Terakhir</h2>
              <p className="text-sm text-muted-foreground">
                Total 4 kejadian terdeteksi minggu ini
              </p>
            </div>
            <Badge variant="secondary" className="rounded-full">
              Mode CCTV aktif
            </Badge>
          </div>
          <div className="mt-6 flex h-36 items-end gap-3">
            {WEEK_ACTIVITY.map((item) => (
              <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-28 w-full items-end justify-center">
                  <div
                    className={`w-8 rounded-full ${item.value > 0 ? "bg-primary" : "bg-muted"}`}
                    style={{ height: `${Math.max(item.value * 40, 8)}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-muted-foreground">{item.day}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
