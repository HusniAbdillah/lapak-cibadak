"use client";

import dynamic from "next/dynamic";
import { Location01Icon } from "hugeicons-react";
import type { MapMarkerData } from "./MapClient";

// Dynamically import MapClient with ssr: false inside a Client Component wrapper
const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div className="h-[70vh] w-full bg-muted animate-pulse rounded-2xl border-2 border-border flex items-center justify-center shadow-sm">
      <div className="flex flex-col items-center gap-2 text-foreground/60">
        <Location01Icon className="w-8 h-8 animate-bounce text-primary" />
        <span className="font-bold text-sm uppercase">Memuat Peta Interaktif...</span>
      </div>
    </div>
  ),
});

interface MapWrapperProps {
  markers: MapMarkerData[];
}

export function MapWrapper({ markers }: MapWrapperProps) {
  return <MapClient markers={markers} />;
}
