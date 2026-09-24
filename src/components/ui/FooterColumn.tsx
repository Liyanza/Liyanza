import { Link } from "@/i18n/navigation";

type FooterLink = string | { label: string; href: string };

export function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.03em] text-white">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => {
          const label = typeof link === "string" ? link : link.label;
          const href = typeof link === "string" ? "#" : link.href;
          return (
            <li key={label}>
              {href.startsWith("mailto:") ? (
                <a href={href} className="text-xs text-[#6b8ab0] transition hover:text-white">
                  {label}
                </a>
              ) : (
                <Link href={href} className="text-xs text-[#6b8ab0] transition hover:text-white">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
