"use client";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { InstallationRecord } from "@/lib/api/types";
import { useT } from "@/i18n/client";
import { proofState, type ProofState } from "./InstallationCard";

const COLORS: Record<ProofState, string> = {
  awaiting: "#94a3b8",
  pending: "#296bd6",
  validated: "#00a846",
  rejected: "#dc2626",
};

/**
 * Une preuve validée est placée là où la photo a été prise ; tant qu'elle
 * n'est pas validée, le point reste à l'emplacement prévu.
 */
function positionFor(installation: InstallationRecord): [number, number] {
  if (installation.proof && proofState(installation) === "validated") {
    return [installation.proof.latitude, installation.proof.longitude];
  }
  return [installation.plannedLatitude, installation.plannedLongitude];
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
  const t = useT("dashField").terrain;
  return (
    <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickCapture onPick={onMapClick} />
      {installations.map((installation) => {
        const state = proofState(installation);
        return (
          <Marker key={installation.id} position={positionFor(installation)} icon={makeIcon(COLORS[state])}>
            <Popup>
              <strong>{installation.location}</strong>
              <br />
              {installation.campaignName}
              <br />
              {state === "validated"
                ? t.popupValidated
                : state === "pending"
                  ? t.popupPending
                  : state === "rejected"
                    ? t.popupRejected
                    : t.popupAwaiting}
              {state === "validated" && installation.proof && (
                // eslint-disable-next-line @next/next/no-img-element -- photo en data URL ou URL externe
                <img
                  src={installation.proof.photo}
                  alt=""
                  style={{ display: "block", width: 200, maxHeight: 160, objectFit: "cover", borderRadius: 8, marginTop: 8 }}
                />
              )}
            </Popup>
          </Marker>
        );
      })}
      {pendingPoint && <Marker position={[pendingPoint.lat, pendingPoint.lng]} icon={makeIcon("#296bd6")} />}
    </MapContainer>
  );
}
