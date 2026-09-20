"use client";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { InstallationRecord } from "@/lib/api/types";

function colorFor(installation: InstallationRecord): string {
  if (!installation.proof) return "#94a3b8";
  return installation.locationMatch ? "#00a846" : "#f97316";
}

function makeIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:18px;height:18px;border-radius:9999px;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function ClickCapture({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(event) {
      onPick(event.latlng.lat, event.latlng.lng);
    },
  });
  return null;
}

export function TerrainMap({
  installations,
  pendingPoint,
  onMapClick,
  center,
}: {
  installations: InstallationRecord[];
  pendingPoint: { lat: number; lng: number } | null;
  onMapClick: (lat: number, lng: number) => void;
  center: [number, number];
}) {
  return (
    <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickCapture onPick={onMapClick} />
      {installations.map((installation) => (
        <Marker
          key={installation.id}
          position={[
            installation.proof?.latitude ?? installation.plannedLatitude,
            installation.proof?.longitude ?? installation.plannedLongitude,
          ]}
          icon={makeIcon(colorFor(installation))}
        >
          <Popup>
            <strong>{installation.location}</strong>
            <br />
            {installation.campaignName}
            <br />
            {installation.proof
              ? installation.locationMatch
                ? "✅ Emplacement confirmé"
                : `⚠️ Écart de ${installation.distanceMeters ?? "?"} m avec l'emplacement prévu`
              : "⏳ En attente de la preuve du prestataire"}
          </Popup>
        </Marker>
      ))}
      {pendingPoint && <Marker position={[pendingPoint.lat, pendingPoint.lng]} icon={makeIcon("#296bd6")} />}
    </MapContainer>
  );
}
