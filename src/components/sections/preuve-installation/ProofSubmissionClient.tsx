"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, CheckCircle2, MapPin, AlertTriangle, Loader2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { apiConsultProofLink, apiSubmitProofViaLink, ApiError } from "@/lib/api/client";
import type { ProofLinkConsultation, SubmitProofViaLinkResult } from "@/lib/api/types";

const MAX_DIMENSION = 1280;
const JPEG_QUALITY = 0.7;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

// Redimensionne/compresse côté client avant envoi — la photo part en base64
// dans le corps JSON (pas d'upload S3 pour ce flux sans compte, voir
// PrestationsService.soumettrePreuveViaLien) : sans compression, une photo
// de smartphone (souvent 3-5 Mo) gonflerait inutilement la requête et la
// ligne en base.
function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Impossible de lire le fichier."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Image invalide."));
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > MAX_DIMENSION) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        } else if (height > MAX_DIMENSION) {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Compression impossible sur cet appareil."));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("La géolocalisation n'est pas disponible sur cet appareil."));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 15_000,
    });
  });
}

type Stage = "loading" | "invalid" | "already-submitted" | "ready" | "capturing" | "preview" | "submitting" | "done" | "error";

export function ProofSubmissionClient({ token }: { token: string }) {
  const [stage, setStage] = useState<Stage>("loading");
  const [info, setInfo] = useState<ProofLinkConsultation | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [result, setResult] = useState<SubmitProofViaLinkResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    apiConsultProofLink(token).then(
      (consultation) => {
        setInfo(consultation);
        setStage(consultation.alreadySubmitted ? "already-submitted" : "ready");
      },
      () => {
        setStage("invalid");
      }
    );
  }, [token]);

  async function handleFileSelected(file: File) {
    setStage("capturing");
    setErrorMessage(null);
    try {
      const [dataUrl, position] = await Promise.all([compressImage(file), getPosition()]);
      setPreview(dataUrl);
      setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      setStage("preview");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible de capturer la photo et la position. Autorisez la caméra et la localisation, puis réessayez."
      );
      setStage("ready");
    }
  }

  function handleSubmit() {
    if (!preview || !coords) return;
    setStage("submitting");
    setErrorMessage(null);
    apiSubmitProofViaLink(token, {
      photo: preview,
      latitude: coords.latitude,
      longitude: coords.longitude,
      takenAt: new Date().toISOString(),
    }).then(
      (submitted) => {
        setResult(submitted);
        setStage("done");
      },
      (error: unknown) => {
        setErrorMessage(error instanceof ApiError ? error.message : "Impossible d'envoyer la preuve. Réessayez.");
        setStage("preview");
      }
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-dash-canvas px-4 py-8">
      <Logo className="h-8" />

      <div className="mt-8 w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        {stage === "loading" && (
          <div className="flex flex-col items-center gap-2 py-10 text-sm text-dash-muted">
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            Chargement...
          </div>
        )}

        {stage === "invalid" && (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="size-6 text-red-600" aria-hidden="true" />
            </span>
            <h1 className="text-base font-bold text-dash-heading">Lien invalide ou expiré</h1>
            <p className="text-sm text-dash-muted">
              Ce lien de preuve n&apos;est plus valide. Demandez-en un nouveau à la personne qui vous l&apos;a envoyé.
            </p>
          </div>
        )}

        {stage === "already-submitted" && info && (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-green-accent-dark/10">
              <CheckCircle2 className="size-6 text-green-accent-dark" aria-hidden="true" />
            </span>
            <h1 className="text-base font-bold text-dash-heading">Preuve déjà envoyée</h1>
            <p className="text-sm text-dash-muted">
              Une preuve a déjà été soumise pour l&apos;emplacement &quot;{info.location}&quot;. Merci !
            </p>
          </div>
        )}

        {(stage === "ready" || stage === "capturing") && info && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div>
              <h1 className="text-lg font-bold text-dash-heading">Preuve d&apos;installation</h1>
              <p className="mt-1 text-sm text-dash-muted">{info.campaignName}</p>
            </div>

            <div className="w-full rounded-xl bg-dash-canvas p-4 text-left text-sm">
              <p className="flex items-center gap-2 font-semibold text-dash-heading">
                <MapPin className="size-4 shrink-0 text-green-accent-dark" aria-hidden="true" />
                {info.location}
              </p>
              <p className="mt-1 text-xs text-dash-muted">
                Pose prévue le {formatDate(info.plannedInstallationDate)}
              </p>
            </div>

            <p className="text-xs leading-relaxed text-dash-muted">
              Prenez une photo de l&apos;affiche installée. Votre position sera enregistrée automatiquement pour
              confirmer l&apos;emplacement.
            </p>

            {errorMessage && (
              <p role="alert" className="rounded-lg bg-red-50 px-4 py-2.5 text-xs font-medium text-red-600">
                {errorMessage}
              </p>
            )}

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void handleFileSelected(file);
              }}
            />
            <button
              type="button"
              disabled={stage === "capturing"}
              onClick={() => inputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-green-accent px-6 py-3.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {stage === "capturing" ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Camera className="size-4" aria-hidden="true" />
              )}
              {stage === "capturing" ? "Localisation en cours..." : "Prendre la photo"}
            </button>
          </div>
        )}

        {(stage === "preview" || stage === "submitting") && preview && (
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-lg font-bold text-dash-heading">Vérifiez avant d&apos;envoyer</h1>
            {/* eslint-disable-next-line @next/next/no-img-element -- data URL locale, jamais une image distante optimisable */}
            <img src={preview} alt="Photo de l'affiche installée" className="w-full rounded-xl object-cover" />
            <p className="flex items-center gap-1.5 text-xs text-dash-muted">
              <MapPin className="size-3.5 text-green-accent-dark" aria-hidden="true" />
              Position capturée avec la photo
            </p>

            {errorMessage && (
              <p role="alert" className="rounded-lg bg-red-50 px-4 py-2.5 text-xs font-medium text-red-600">
                {errorMessage}
              </p>
            )}

            <button
              type="button"
              disabled={stage === "submitting"}
              onClick={handleSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-green-accent px-6 py-3.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {stage === "submitting" && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              {stage === "submitting" ? "Envoi..." : "Envoyer la preuve"}
            </button>
            <button
              type="button"
              disabled={stage === "submitting"}
              onClick={() => {
                setPreview(null);
                setStage("ready");
              }}
              className="text-xs font-semibold text-dash-muted"
            >
              Reprendre la photo
            </button>
          </div>
        )}

        {stage === "done" && result && (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <span
              className={`flex size-12 items-center justify-center rounded-full ${
                result.locationMatch ? "bg-green-accent-dark/10" : "bg-orange-500/10"
              }`}
            >
              {result.locationMatch ? (
                <CheckCircle2 className="size-6 text-green-accent-dark" aria-hidden="true" />
              ) : (
                <AlertTriangle className="size-6 text-orange-500" aria-hidden="true" />
              )}
            </span>
            <h1 className="text-base font-bold text-dash-heading">Preuve envoyée</h1>
            <p className="text-sm text-dash-muted">
              {result.locationMatch
                ? "Merci ! L'emplacement correspond bien à celui demandé."
                : "Merci ! La preuve a été enregistrée, mais l'emplacement détecté diffère de celui demandé — l'entreprise va vérifier."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
