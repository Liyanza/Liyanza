import { Check } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { channelOptions, type ChannelOption } from "@/data/dashboard";

const icons: Record<ChannelOption["icon"], { Icon: typeof FaFacebook; className: string }> = {
  facebook: { Icon: FaFacebook, className: "text-[#1877f2]" },
  instagram: { Icon: FaInstagram, className: "text-[#E4405F]" },
  whatsapp: { Icon: FaWhatsapp, className: "text-[#25d366]" },
  tiktok: { Icon: FaTiktok, className: "text-black" },
  youtube: { Icon: FaYoutube, className: "text-[#FF0000]" },
};

export function StepChannels({
  value,
  onToggle,
}: {
  value: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div>
      <div className="max-w-[768px]">
        <h1 className="text-[28px] font-semibold leading-9 tracking-[-0.7px] text-dash-heading sm:text-[32px]">
          Configurez vos canaux de diffusion
        </h1>
        <p className="mt-1 text-base leading-[26px] text-dash-body">Choisissez vos canaux !</p>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white">
        {channelOptions.map((channel, index) => {
          const { Icon, className } = icons[channel.icon];
          const selected = value.includes(channel.id);
          return (
            <label
              key={channel.id}
              className={`flex cursor-pointer items-center gap-3 px-4 py-3.5 ${
                index !== channelOptions.length - 1 ? "border-b border-border-light" : ""
              }`}
            >
              <span
                className={`flex size-6 shrink-0 items-center justify-center rounded border-2 ${
                  selected ? "border-green-accent bg-green-accent" : "border-gray-300"
                }`}
              >
                {selected && <Check className="size-3.5 text-white" aria-hidden="true" />}
              </span>
              <input type="checkbox" checked={selected} onChange={() => onToggle(channel.id)} className="sr-only" />
              <span className="flex size-10 shrink-0 items-center justify-center">
                <Icon className={`size-6 ${className}`} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-[#101828]">{channel.label}</span>
                <span className="block text-[11.5px] text-gray-text-light">{channel.description}</span>
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
