"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Briefcase, Building2, Loader2, MapPin } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { useAuth } from "@/context/AuthContext";
import { apiCreateEntreprise, ApiError } from "@/lib/api/client";
import { useT } from "@/i18n/client";

export function CreateCompanyForm() {
  const router = useRouter();
  const t = useT("dashAccount");
  const tc = t.createCompany;
  const dash = useT("dash");
  const { refresh } = useAuth();
  const [name, setName] = useState("");
  const [businessSector, setBusinessSector] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = name.trim().length > 0 && businessSector.trim().length > 0 && address.trim().length > 0;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);
    try {
      await apiCreateEntreprise({
        name: name.trim(),
        businessSector: businessSector.trim(),
        address: address.trim(),
      });
      // /auth/me relit toujours le rôle/companyId en base (jamais depuis un
      // token en cache) : ce refresh suffit à faire apparaître le nouveau
      // statut ADMIN sans nécessiter de nouvelle connexion.
      await refresh();
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : tc.error);
      setSubmitting(false);
    }
  }

  return (
    <>
      <TopBar title={dash.titles.createCompany} searchPlaceholder={t.search} />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="mx-auto flex max-w-[640px] flex-col gap-6 px-8 py-8">
          <div>
            <h1 className="text-2xl font-bold text-dash-heading">{tc.welcome}</h1>
            <p className="mt-1 text-sm text-dash-body">
              {tc.intro}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 rounded-xl bg-white p-8 shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
          >
            <div>
              <label htmlFor="company-name" className="text-sm font-semibold text-dash-heading">
                {tc.name} <span className="text-green-accent-dark">*</span>
              </label>
              <div className="relative mt-1">
                <Building2
                  className="pointer-events-none absolute left-4 top-1/2 size-3.5 -translate-y-1/2 text-green-accent-dark"
                  aria-hidden="true"
                />
                <input
                  id="company-name"
                  type="text"
                  maxLength={200}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={tc.namePlaceholder}
                  className="w-full rounded-lg border-2 border-green-accent bg-dash-canvas py-3 pl-11 pr-4 text-sm text-black outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company-sector" className="text-sm font-semibold text-dash-heading">
                {tc.sector} <span className="text-green-accent-dark">*</span>
              </label>
              <div className="relative mt-1">
                <Briefcase
                  className="pointer-events-none absolute left-4 top-1/2 size-3.5 -translate-y-1/2 text-green-accent-dark"
                  aria-hidden="true"
                />
                <input
                  id="company-sector"
                  type="text"
                  maxLength={200}
                  value={businessSector}
                  onChange={(event) => setBusinessSector(event.target.value)}
                  placeholder={tc.sectorPlaceholder}
                  className="w-full rounded-lg border-2 border-green-accent bg-dash-canvas py-3 pl-11 pr-4 text-sm text-black outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company-address" className="text-sm font-semibold text-dash-heading">
                {tc.address} <span className="text-green-accent-dark">*</span>
              </label>
              <div className="relative mt-1">
                <MapPin
                  className="pointer-events-none absolute left-4 top-1/2 size-3.5 -translate-y-1/2 text-green-accent-dark"
                  aria-hidden="true"
                />
                <input
                  id="company-address"
                  type="text"
                  maxLength={300}
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder={tc.addressPlaceholder}
                  className="w-full rounded-lg border-2 border-green-accent bg-dash-canvas py-3 pl-11 pr-4 text-sm text-black outline-none"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className="flex items-center justify-center gap-2 self-start rounded-full bg-green-accent px-8 py-3 text-sm font-semibold text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-opacity hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              {tc.submit}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
