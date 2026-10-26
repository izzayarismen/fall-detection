import { createFileRoute } from "@tanstack/react-router";
import { Cctv, MapPin, Pencil, Plus, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import feedBedroom from "@/assets/feed-bedroom.jpg";
import feedKitchen from "@/assets/feed-kitchen.jpg";
import feedLivingRoom from "@/assets/feed-living-room.jpg";
import { AppShell } from "@/components/app-shell";
import { CameraFullscreenButton } from "@/components/camera-fullscreen-button";
import { CameraStream } from "@/components/camera-stream";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { addCamera, removeCamera, useSavedCameras } from "@/lib/cameras";

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
    name: "Garasi",
    cam: "Cam 04",
    location: "Garasi",
    url: "rtsp://admin:••••••@192.168.1.53:554/stream1",
    protocol: "RTSP",
    status: "offline",
    image: null,
  },
] as const;

function KameraPage() {
  const savedCameras = useSavedCameras();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formError, setFormError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const location = String(form.get("location") ?? "").trim();
    const url = String(form.get("url") ?? "").trim();

    try {
      addCamera({ name, location, url });
      setFormError("");
      setDialogOpen(false);
      event.currentTarget.reset();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Kamera gagal ditambahkan");
    }
  }

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
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full">
                <Plus className="size-4" />
                Tambah Kamera
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl border-border bg-card sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Tambah kamera baru</DialogTitle>
                <DialogDescription>
                  Untuk IP Webcam Android, gunakan alamat video yang ditampilkan aplikasi,
                  biasanya http://IP-HP:8080/video.
                </DialogDescription>
              </DialogHeader>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="camera-name" className="text-xs font-bold text-foreground">
                    Nama Kamera
                  </label>
                  <Input
                    id="camera-name"
                    name="name"
                    placeholder="cth. Kamera Android"
                    className="rounded-xl bg-muted"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="camera-location" className="text-xs font-bold text-foreground">
                    Lokasi
                  </label>
                  <Input
                    id="camera-location"
                    name="location"
                    placeholder="cth. Ruang Keluarga"
                    className="rounded-xl bg-muted"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="camera-url" className="text-xs font-bold text-foreground">
                    URL Stream HTTP / RTSP
                  </label>
                  <Input
                    id="camera-url"
                    name="url"
                    type="url"
                    placeholder="http://192.168.1.10:8080/video"
                    className="rounded-xl bg-muted font-mono text-xs"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    HTTP/MJPEG dapat diputar langsung. RTSP disimpan, tetapi memerlukan gateway
                    HLS/WebRTC agar dapat diputar oleh browser.
                  </p>
                </div>
                {formError && <p className="text-sm font-semibold text-destructive">{formError}</p>}
                <DialogFooter>
                  <Button type="submit" className="rounded-full">
                    Tambahkan Kamera
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {savedCameras.map((camera, index) => (
            <article key={camera.id} className="card-shadow overflow-hidden rounded-3xl bg-card">
              <div data-camera-frame className="relative overflow-hidden bg-muted">
                <CameraStream
                  name={camera.name}
                  url={camera.url}
                  protocol={camera.protocol}
                />
                <span className="camera-live-only absolute left-3 top-3">
                  <Badge className="rounded-full bg-primary">{camera.protocol}</Badge>
                </span>
                <span className="camera-offline-only absolute left-3 top-3">
                  <Badge className="rounded-full bg-destructive">Offline</Badge>
                </span>
                <CameraFullscreenButton cameraName={camera.name} />
              </div>
              <div className="flex flex-col gap-3 p-5">
                <div>
                  <h3 className="font-bold text-foreground">{camera.name}</h3>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3.5" />
                    {camera.location} · Cam {String(CAMERAS.length + index + 1).padStart(2, "0")}
                  </p>
                </div>
                <p className="truncate rounded-xl bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
                  {camera.url}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="self-end rounded-full bg-card text-destructive"
                  onClick={() => removeCamera(camera.id)}
                >
                  <Trash2 className="size-4" />
                  Hapus
                </Button>
              </div>
            </article>
          ))}
          {CAMERAS.map((camera) => (
            <article key={camera.cam} className="card-shadow overflow-hidden rounded-3xl bg-card">
              <div data-camera-frame className="relative overflow-hidden bg-muted">
                {camera.image ? (
                  <img
                    src={camera.image}
                    alt={`Feed kamera ${camera.name}`}
                    width={1280}
                    height={720}
                    loading="lazy"
                    className="camera-media aspect-video w-full object-cover"
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
                <CameraFullscreenButton cameraName={camera.name} />
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

        </section>
      </div>
    </AppShell>
  );
}
