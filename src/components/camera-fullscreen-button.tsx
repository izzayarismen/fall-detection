import { Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type CameraFullscreenButtonProps = {
  cameraName: string;
};

export function CameraFullscreenButton({ cameraName }: CameraFullscreenButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const syncFullscreenState = () => {
      const frame = buttonRef.current?.closest("[data-camera-frame]");
      setIsFullscreen(document.fullscreenElement === frame);
    };

    document.addEventListener("fullscreenchange", syncFullscreenState);
    return () => document.removeEventListener("fullscreenchange", syncFullscreenState);
  }, []);

  async function toggleFullscreen() {
    const frame = buttonRef.current?.closest<HTMLElement>("[data-camera-frame]");
    if (!frame) return;

    try {
      if (document.fullscreenElement === frame) {
        await document.exitFullscreen();
      } else {
        await frame.requestFullscreen();
      }
    } catch {
      // Fullscreen can be rejected by browser or device policy.
    }
  }

  const Icon = isFullscreen ? Minimize2 : Maximize2;

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={`${isFullscreen ? "Keluar dari fullscreen" : "Tampilkan fullscreen"} ${cameraName}`}
      onClick={toggleFullscreen}
      className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-card/95 text-foreground shadow-md transition-transform hover:scale-105 hover:bg-card"
    >
      <Icon className="size-4.5" />
    </button>
  );
}
