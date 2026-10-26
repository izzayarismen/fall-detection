import { useEffect, useState } from "react";

export type CameraProtocol = "HTTP" | "RTSP";

export type SavedCamera = {
  id: string;
  name: string;
  location: string;
  url: string;
  protocol: CameraProtocol;
};

const STORAGE_KEY = "rumi-cameras";
const CAMERAS_CHANGED_EVENT = "rumi:cameras-changed";

export function normalizeCameraUrl(url: string) {
  const trimmedUrl = url.trim();
  if (!/^https?:\/\//i.test(trimmedUrl)) return trimmedUrl;

  try {
    const parsedUrl = new URL(trimmedUrl);
    if (parsedUrl.pathname === "/") parsedUrl.pathname = "/video";
    return parsedUrl.toString();
  } catch {
    return trimmedUrl;
  }
}

function readCameras(): SavedCamera[] {
  if (typeof window === "undefined") return [];

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    const cameras = value ? (JSON.parse(value) as SavedCamera[]) : [];
    return cameras.map((camera) => ({
      ...camera,
      url: normalizeCameraUrl(camera.url),
    }));
  } catch {
    return [];
  }
}

function writeCameras(cameras: SavedCamera[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cameras));
  window.dispatchEvent(new Event(CAMERAS_CHANGED_EVENT));
}

export function getCameraProtocol(url: string): CameraProtocol | null {
  if (/^rtsp:\/\//i.test(url)) return "RTSP";
  if (/^https?:\/\//i.test(url)) return "HTTP";
  return null;
}

export function addCamera(camera: Omit<SavedCamera, "id" | "protocol">) {
  const normalizedUrl = normalizeCameraUrl(camera.url);
  const protocol = getCameraProtocol(normalizedUrl);
  if (!protocol) throw new Error("URL harus diawali http://, https://, atau rtsp://");

  const savedCamera: SavedCamera = {
    ...camera,
    url: normalizedUrl,
    id: crypto.randomUUID(),
    protocol,
  };
  writeCameras([...readCameras(), savedCamera]);
  return savedCamera;
}

export function removeCamera(id: string) {
  writeCameras(readCameras().filter((camera) => camera.id !== id));
}

export function useSavedCameras() {
  const [cameras, setCameras] = useState<SavedCamera[]>([]);

  useEffect(() => {
    const sync = () => setCameras(readCameras());
    sync();
    window.addEventListener(CAMERAS_CHANGED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CAMERAS_CHANGED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return cameras;
}
