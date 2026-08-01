"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

export interface MapMarkerData {
  id: string;
  name: string;
  slug: string;
  category: string;
  lat: number;
  lng: number;
  address: string;
}

interface MapClientProps {
  markers: MapMarkerData[];
}

// Center of Desa Cibadak, Kecamatan Ciampea, Kabupaten Bogor
const CENTER_LAT = -6.5583;
const CENTER_LNG = 106.7031;

export default function MapClient({ markers }: MapClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[70vh] w-full bg-muted animate-pulse rounded-2xl border-2 border-border" />;
  }

  // Create Custom Neo-Brutalist Icon using L.divIcon
  const createCustomIcon = () => {
    return L.divIcon({
      className: "custom-leaflet-icon",
      html: `
        <div style="
          background-color: #f2bf48; 
          border: 2px solid #0e1743; 
          border-radius: 50%; 
          width: 32px; 
          height: 32px; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          box-shadow: 0 4px 0 0 #0e1743;
          transform: translateY(-4px);
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0e1743" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  const centerPosition: [number, number] = markers.length > 0 
    ? [markers[0].lat, markers[0].lng] 
    : [CENTER_LAT, CENTER_LNG];

  return (
    <div className="relative z-0 h-[70vh] w-full rounded-2xl border-2 border-border overflow-hidden shadow-sm">
      <MapContainer
        center={centerPosition}
        zoom={14}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={createCustomIcon()}
          >
            <Popup className="neo-brutalist-popup">
              <div className="flex flex-col gap-2 min-w-[200px]">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading uppercase font-bold text-lg text-foreground leading-tight m-0">
                    {marker.name}
                  </h3>
                </div>
                <span className="inline-block bg-primary text-primary-foreground px-2 py-0.5 text-[10px] font-bold uppercase rounded-full w-fit">
                  {marker.category}
                </span>
                <p className="font-sans text-xs text-foreground/70 m-0 line-clamp-2 mt-1">
                  {marker.address}
                </p>
                <div className="mt-2">
                  <Link
                    href={`/umkm/${marker.slug}`}
                    className="block w-full text-center bg-secondary text-secondary-foreground font-bold text-xs uppercase py-2 px-3 border-2 border-border rounded-xl active:scale-95 transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    Lihat Profil
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Global styles specifically for the popup to override leaflet defaults */}
      <style jsx global>{`
        .neo-brutalist-popup .leaflet-popup-content-wrapper {
          border-radius: 16px;
          border: 2px solid #0e1743;
          background: #ffffff;
          box-shadow: 0 4px 0 0 #0e1743;
          padding: 0;
        }
        .neo-brutalist-popup .leaflet-popup-content {
          margin: 12px;
          width: auto !important;
        }
        .neo-brutalist-popup .leaflet-popup-tip-container {
          display: none; /* Hide the default tip since we use block shadow */
        }
        .neo-brutalist-popup a.leaflet-popup-close-button {
          color: #0e1743;
          font-weight: bold;
          padding: 4px;
        }
      `}</style>
    </div>
  );
}
