"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, Marker, Polyline, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { InstallationRecord } from "@/lib/api/types";
import { proofState, type ProofState } from "./proofState";

export const STATE_COLORS: Record<ProofState, string> = {
  awaiting: "#94a3b8",
  pending: "#296bd6",
  validated: "#00a846",
  rejected: "#dc2626",
};

const DOUALA: [number, number] = [4.0483, 9.7];

/** Emplacement affiché : la photo quand elle existe, sinon le point prévu. */
export function displayPosition(installation: InstallationRecord): [number, number] {
  return installation.proof
    ? [installation.proof.latitude, installation.proof.longitude]
    : [installation.plannedLatitude, installation.plannedLongitude];
}

function escapeAttr(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/** Repère : vignette de la photo de preuve, sinon pastille de couleur. */
function markerIcon(installation: InstallationRecord, selected: boolean) {
  const color = STATE_COLORS[proofState(installation)];
  const proof = installation.proof;
  if (proof) {
    const size = selected ? 64 : 44;
    return L.divIcon({
      className: "",
      html: `<div style="width:${size}px;height:${size}px;border-radius:14px;border:3px solid ${color};background:#fff center/cover no-repeat url(&quot;${escapeAttr(proof.photo)}&quot;);box-shadow:0 ${selected ? 6 : 2}px ${selected ? 18 : 8}px rgba(0,0,0,${selected ? 0.45 : 0.3});transition:all .2s"></div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  }
  const size = selected ? 26 : 18;
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:9999px;background:${color};border:3px solid white;box-shadow:0 0 0 ${selected ? 6 : 0}px ${color}40, 0 1px 4px rgba(0,0,0,0.4)"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

const plannedDot = L.divIcon({
  className: "",
  html: `<span style="display:block;width:12px;height:12px;border-radius:9999px;background:white;border:3px dashed #0f172a"></span>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const draftIcon = L.divIcon({
  className: "",
  html: `<span style="display:block;width:22px;height:22px;border-radius:9999px;background:#296bd6;border:3px solid white;box-shadow:0 0 0 8px rgba(41,107,214,0.25)"></span>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

function ClickCapture({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({ click: (event) => onPick(event.latlng.lat, event.latlng.lng) });
  return null;
}

/** Recadre sur l'ensemble des repères quand la liste affichée change. */
function FitBounds({ points, signature }: { points: [number, number][]; signature: string }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) map.setView(points[0], 15);
    else map.fitBounds(L.latLngBounds(points), { padding: [48, 48], maxZoom: 15 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- recadrage seulement quand la sélection de repères change
  }, [signature]);
  return null;
}

/** Vole jusqu'à la cible (repère sélectionné, adresse trouvée). */
function FlyTo({ target }: { target: { lat: number; lng: number; zoom: number; key: string } | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo([target.lat, target.lng], target.zoom, { duration: 0.8 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- un vol par nouvelle cible
  }, [target?.key]);
  return null;
}

/** Recalcule la taille quand le conteneur change (panneau latéral, mobile). */
function InvalidateOnResize() {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(container);
    return () => observer.disconnect();
  }, [map]);
  return null;
}

export interface MapFocus {
  lat: number;
  lng: number;
  zoom: number;
  key: string;
}

export function TerrainMap({
  installations,
  selectedId,
  onSelect,
  draftPoints = [],
  onMapClick,
  picking = false,
  focus = null,
}: {
  installations: InstallationRecord[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  /** Points en cours d'ajout (pas encore enregistrés). */
  draftPoints?: { lat: number; lng: number }[];
  onMapClick?: (lat: number, lng: number) => void;
  /** Mode « placer un point » : curseur en croix. */
  picking?: boolean;
  focus?: MapFocus | null;
}) {
  const points = useMemo(
    () => [...installations.map(displayPosition), ...draftPoints.map((p) => [p.lat, p.lng] as [number, number])],
    [installations, draftPoints]
  );
  const signature = installations.map((i) => i.id).join(",");
  const selected = installations.find((i) => i.id === selectedId);

  return (
    <MapContainer
      center={points[0] ?? DOUALA}
      zoom={12}
      style={{ height: "100%", width: "100%", cursor: picking ? "crosshair" : undefined }}
      className={picking ? "[&_.leaflet-grab]:!cursor-crosshair" : undefined}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <InvalidateOnResize />
      <FitBounds points={points} signature={signature} />
      <FlyTo target={focus} />
      {onMapClick && <ClickCapture onPick={onMapClick} />}

      {selected?.proof && (
        <>
          <Marker position={[selected.plannedLatitude, selected.plannedLongitude]} icon={plannedDot} interactive={false} />
          <Polyline
            positions={[
              [selected.plannedLatitude, selected.plannedLongitude],
              [selected.proof.latitude, selected.proof.longitude],
            ]}
            pathOptions={{ color: selected.locationMatch ? "#00a846" : "#ea580c", dashArray: "6 6", weight: 3 }}
          />
        </>
      )}

      {installations.map((installation) => (
        <Marker
          key={installation.id}
          position={displayPosition(installation)}
          icon={markerIcon(installation, installation.id === selectedId)}
          zIndexOffset={installation.id === selectedId ? 1000 : 0}
          title={installation.location}
          eventHandlers={onSelect ? { click: () => onSelect(installation.id) } : undefined}
        />
      ))}

      {draftPoints.map((point, index) => (
        <Marker key={`draft-${index}`} position={[point.lat, point.lng]} icon={draftIcon} />
      ))}
    </MapContainer>
  );
}
