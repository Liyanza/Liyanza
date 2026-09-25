"use client";

import { useEffect } from "react";
import { Check, Loader2 } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import type { SocialPlatform } from "@/lib/api/types";
import { SkeletonRows } from "@/components/dashboard/ui/Skeleton";
import { useAuth } from "@/context/AuthContext";
import { useT } from "@/i18n/client";
import { fill } from "@/i18n/format";
import {
  ENABLED_SOCIAL_PLATFORMS,
  linkStateFor,
  useSocialAccounts,
} from "@/components/social-accounts/useSocialAccounts";

interface ChannelDefinition {
  platform: SocialPlatform | "WHATSAPP" | "TIKTOK" | "YOUTUBE";
  label: string;
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
    Icon: FaFacebook,
    iconClassName: "text-[#1877f2]",
    supported: true,
  },
  {
    platform: "INSTAGRAM",
    label: "Instagram",
    Icon: FaInstagram,
    iconClassName: "text-[#e1306c]",
    supported: true,
  },
  {
    platform: "WHATSAPP",
    label: "WhatsApp",
    Icon: FaWhatsapp,
    iconClassName: "text-[#25d366]",
    supported: false,
  },
  {
    platform: "TIKTOK",
    label: "TikTok",
    Icon: FaTiktok,
    iconClassName: "text-black",
    supported: false,
  },
  {
    platform: "YOUTUBE",
    label: "YouTube",
    Icon: FaYoutube,
    iconClassName: "text-[#FF0000]",
    supported: false,
  },
];

// Plateformes Meta désactivées (voir ENABLED_SOCIAL_PLATFORMS) : masquées,
// pas seulement grisées. Les autres canaux restent affichés « Bientôt ».
const VISIBLE_CHANNELS = CHANNEL_DEFINITIONS.filter(
  (channel) => !channel.supported || ENABLED_SOCIAL_PLATFORMS.includes(channel.platform as SocialPlatform)
);

/**
 * Choix des canaux d'une campagne digitale. Chaque canal sélectionné doit
 * être lié à un compte actif (Page Facebook…) : sinon un bouton lie le
 * compte, ou le reconnecte si sa session Meta a expiré, sans quitter
 * l'assistant. `onReadyChange` indique à l'assistant si l'on peut continuer.
 */
export function StepChannels({
  value,
  onToggle,
  onReadyChange,
}: {
  value: SocialPlatform[];
  onToggle: (platform: SocialPlatform) => void;
  onReadyChange: (ready: boolean) => void;
}) {
  const t = useT("dashWizard").channels;
  const common = useT("dash").common;
  const { user } = useAuth();
  const canLink = user?.role === "ADMIN" || user?.role === "MARKETING_MANAGER";
  const { accounts, loading, loadError, connect, connectingPlatform, connectError } = useSocialAccounts(t);

  const allSelectedLinked = value.every((platform) => linkStateFor(accounts, platform).state === "linked");
  const ready = !loading && value.length > 0 && allSelectedLinked;

  useEffect(() => {
    onReadyChange(ready);
  }, [ready, onReadyChange]);

  return (
    <div>
      <div className="max-w-[768px]">
        <h1 className="text-[28px] font-semibold leading-9 tracking-[-0.7px] text-dash-heading sm:text-[32px]">
          {t.title}
        </h1>
        <p className="mt-1 text-base leading-[26px] text-dash-body">{t.subtitle}</p>
      </div>

      {loading ? (
        <div className="mt-6 rounded-2xl border border-border bg-white">
          <SkeletonRows rows={3} label={t.loading} />
        </div>
      ) : (
        <>
          {(loadError || connectError) && (
            <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
              {loadError ?? connectError}
            </p>
          )}
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white">
            {VISIBLE_CHANNELS.map((channel, index) => {
              const { Icon } = channel;
              const platform = channel.platform as SocialPlatform;
              const selected = channel.supported && value.includes(platform);
              const link = channel.supported ? linkStateFor(accounts, platform) : undefined;
              const needsLink = selected && link?.state !== "linked";
              const connecting = connectingPlatform === platform;

              let status: { text: string; className: string } | null = null;
              if (link?.state === "linked") {
                status = {
                  text: fill(t.linked, { name: link.account?.externalAccountName ?? channel.label }),
                  className: "text-green-accent-dark",
                };
              } else if (link?.state === "expired") {
                status = { text: t.expired, className: "text-orange-600" };
              } else if (link) {
                status = { text: selected ? t.missing : t.notLinked, className: "text-gray-text-light" };
              }

              return (
                <div
                  key={channel.platform}
                  className={`flex flex-wrap items-center gap-3 px-4 py-3.5 ${
                    index !== VISIBLE_CHANNELS.length - 1 ? "border-b border-border-light" : ""
                  } ${channel.supported ? "" : "opacity-50"}`}
                >
                  <label
                    className={`flex min-w-0 flex-1 items-center gap-3 ${
                      channel.supported ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
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
                      <span className={`block truncate text-[11.5px] ${status?.className ?? "text-gray-text-light"}`}>
                        {status?.text ?? t.descriptions[channel.platform]}
                      </span>
                    </span>
                  </label>
                  {!channel.supported && (
                    <span className="shrink-0 rounded-full bg-dash-pill-bg px-2.5 py-1 text-[11px] font-semibold text-dash-muted">
                      {common.comingSoon}
                    </span>
                  )}
                  {needsLink && canLink && (
                    <button
                      type="button"
                      onClick={() => void connect(platform)}
                      disabled={connectingPlatform !== null}
                      className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-dash-heading transition hover:bg-dash-canvas disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {connecting ? (
                        <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                      ) : (
                        <Icon className={`size-3.5 ${channel.iconClassName}`} aria-hidden="true" />
                      )}
                      {connecting
                        ? t.linking
                        : link?.state === "expired"
                          ? t.reconnectCta
                          : fill(t.linkCta, { platform: channel.label })}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          {value.length > 0 && !allSelectedLinked && (
            <p className="mt-3 text-xs font-medium text-orange-600">{canLink ? t.required : t.askManager}</p>
          )}
        </>
      )}
    </div>
  );
}
