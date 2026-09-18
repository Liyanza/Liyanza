"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { apiListSocialAccounts, ApiError } from "@/lib/api/client";
import type { SocialAccountRecord, SocialPlatform } from "@/lib/api/types";

interface ChannelDefinition {
  platform: SocialPlatform | "WHATSAPP" | "TIKTOK" | "YOUTUBE";
  label: string;
  description: string;
  Icon: typeof FaFacebook;
  iconClassName: string;
  // Seuls Facebook/Instagram sont intégrés (liaison Meta OAuth,
  // SocialAccountsModule) — les autres n'ont aucune intégration prévue et
  // restent affichés à titre indicatif, désactivés.
  supported: boolean;
}

const CHANNEL_DEFINITIONS: ChannelDefinition[] = [
  {
    platform: "FACEBOOK",
    label: "Facebook",
    description: "Atteignez votre audience sur Facebook",
    Icon: FaFacebook,
    iconClassName: "text-[#1877f2]",
    supported: true,
  },
  {
    platform: "INSTAGRAM",
    label: "Instagram",
    description: "Touchez votre communauté",
    Icon: FaInstagram,
    iconClassName: "text-[#e1306c]",
    supported: true,
  },
  {
    platform: "WHATSAPP",
    label: "WhatsApp",
    description: "Communiquez directement",
    Icon: FaWhatsapp,
    iconClassName: "text-[#25d366]",
    supported: false,
  },
  {
    platform: "TIKTOK",
    label: "TikTok",
    description: "Captez une audience engagée",
    Icon: FaTiktok,
    iconClassName: "text-black",
    supported: false,
  },
  {
    platform: "YOUTUBE",
    label: "YouTube",
    description: "Vidéo et visibilité maximale",
    Icon: FaYoutube,
    iconClassName: "text-[#FF0000]",
    supported: false,
  },
];

function normalizeList(
  result: SocialAccountRecord[] | { items: SocialAccountRecord[] }
): SocialAccountRecord[] {
  return Array.isArray(result) ? result : result.items;
}

export function StepChannels({
  value,
  onToggle,
}: {
  value: SocialPlatform[];
  onToggle: (platform: SocialPlatform) => void;
}) {
  const [accounts, setAccounts] = useState<SocialAccountRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    apiListSocialAccounts().then(
      (result) => {
        setAccounts(normalizeList(result));
        setLoading(false);
      },
      (error) => {
        setLoadError(error instanceof ApiError ? error.message : "Impossible de charger les comptes liés.");
        setLoading(false);
      }
    );
  }, []);

  function linkedAccountFor(platform: SocialPlatform) {
    return accounts.find((a) => a.platform === platform && a.status === "ACTIVE");
  }

  return (
    <div>
      <div className="max-w-[768px]">
        <h1 className="text-[28px] font-semibold leading-9 tracking-[-0.7px] text-dash-heading sm:text-[32px]">
          Configurez vos canaux de diffusion
        </h1>
        <p className="mt-1 text-base leading-[26px] text-dash-body">Choisissez vos canaux !</p>
      </div>

      {loading ? (
        <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-border bg-white p-8 text-sm text-dash-muted">
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Chargement de vos comptes liés…
        </div>
      ) : (
        <>
          {loadError && (
            <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
              {loadError}
            </p>
          )}
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white">
            {CHANNEL_DEFINITIONS.map((channel, index) => {
              const { Icon } = channel;
              const isSupportedPlatform = channel.supported;
              const platform = channel.platform as SocialPlatform;
              const selected = isSupportedPlatform && value.includes(platform);
              const linkedAccount = isSupportedPlatform ? linkedAccountFor(platform) : undefined;

              return (
                <label
                  key={channel.platform}
                  className={`flex items-center gap-3 px-4 py-3.5 ${
                    index !== CHANNEL_DEFINITIONS.length - 1 ? "border-b border-border-light" : ""
                  } ${channel.supported ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                >
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded border-2 ${
                      selected ? "border-green-accent bg-green-accent" : "border-gray-300"
                    }`}
                  >
                    {selected && <Check className="size-3.5 text-white" aria-hidden="true" />}
                  </span>
                  <input
                    type="checkbox"
                    checked={selected}
                    disabled={!channel.supported}
                    onChange={() => channel.supported && onToggle(platform)}
                    className="sr-only"
                  />
                  <span className="flex size-10 shrink-0 items-center justify-center">
                    <Icon className={`size-6 ${channel.iconClassName}`} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-[#101828]">{channel.label}</span>
                    <span className="block truncate text-[11.5px] text-gray-text-light">
                      {isSupportedPlatform
                        ? (linkedAccount?.externalAccountName ?? "Aucun compte connecté — vous pourrez le lier depuis Mon entreprise")
                        : channel.description}
                    </span>
                  </span>
                  {!channel.supported && (
                    <span className="shrink-0 rounded-full bg-dash-pill-bg px-2.5 py-1 text-[11px] font-semibold text-dash-muted">
                      Bientôt disponible
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
