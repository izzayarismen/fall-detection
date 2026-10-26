import { Cctv, RadioTower, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

import { normalizeCameraUrl, type CameraProtocol } from "@/lib/cameras";

type CameraStreamProps = {
  name: string;
  url: string;
  protocol: CameraProtocol;
  className?: string;
};

export function CameraStream({ name, url, protocol, className }: CameraStreamProps) {
  const [failed, setFailed] = useState(false);
  const playbackUrl = normalizeCameraUrl(url);

  useEffect(() => {
    if (!failed) return;
    const retryTimer = window.setTimeout(() => setFailed(false), 5000);
    return () => window.clearTimeout(retryTimer);
  }, [failed, playbackUrl]);

  if (protocol === "RTSP") {
    return (
      <div className={`flex aspect-video w-full flex-col items-center justify-center gap-2 bg-muted p-6 text-center ${className ?? ""}`}>
        <RadioTower className="size-8 text-primary" />
        <p className="text-sm font-bold text-foreground">Stream RTSP tersimpan</p>
        <p className="max-w-sm text-xs text-muted-foreground">
          Browser memerlukan gateway RTSP ke HLS, WebRTC, atau HTTP untuk menampilkan video.
        </p>
      </div>
    );
  }

  if (failed) {
    return (
      <div className={`camera-stream-offline flex aspect-video w-full flex-col items-center justify-center gap-2 bg-muted p-6 text-center ${className ?? ""}`}>
        <Cctv className="size-8 text-muted-foreground/60" />
        <p className="text-sm font-bold text-muted-foreground">Kamera Offline</p>
        <p className="text-xs text-muted-foreground/70">
          {name} · mencoba tersambung ulang
        </p>
        <RefreshCw className="size-4 text-muted-foreground/60" />
      </div>
    );
  }

  return (
    <img
      src={playbackUrl}
      alt={`Live feed kamera ${name}`}
      className={`camera-media aspect-video w-full object-cover ${className ?? ""}`}
      onError={() => setFailed(true)}
    />
  );
}
