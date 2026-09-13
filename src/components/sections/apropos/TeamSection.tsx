import { FaLinkedinIn } from "react-icons/fa6";
import { Container } from "@/components/ui/Container";

const team = [
  "Cedric K.",
  "Leane N.",
  "Bauduoin B.",
  "Loic F.",
  "Djunette A.",
  "Thomas E.",
  "Aristide N.",
  "Ismael C.",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function TeamSection() {
  return (
    <section id="equipe" className="bg-white py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            L&apos;équipe
          </span>
          <h2 className="mt-5 text-4xl font-extrabold text-black sm:text-5xl">
            Les personnes derrière KIYANZA
          </h2>
          <p className="mt-3 text-base text-gray-text">
            Une équipe passionnée par la donnée, le marketing et l&apos;impact.
            Basés à Douala, avec une vision panafricaine.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((name) => (
            <div
              key={name}
              className="rounded-xl border border-border-light bg-white p-6"
            >
              <div className="flex size-14 items-center justify-center rounded-full border-2 border-orange-500 text-lg font-black text-orange-500">
                {initials(name)}
              </div>
              <h3 className="mt-4 text-base font-bold text-black">{name}</h3>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-orange-500">
                Équipe fondatrice
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-text">
                Membre de l&apos;équipe fondatrice de KIYANZA, engagé·e à
                rendre le marketing plus intelligent et accessible.
              </p>
              <a
                href="#"
                aria-label={`Profil LinkedIn de ${name}`}
                className="mt-4 flex size-10 items-center justify-center rounded-full bg-navy text-white transition hover:brightness-110"
              >
                <FaLinkedinIn className="size-4" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
