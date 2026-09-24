"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, UserX } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { useAuth } from "@/context/AuthContext";
import {
  apiCreateSubAccount,
  apiDeactivateUser,
  apiListUsers,
  apiUpdateUserRole,
  ApiError,
} from "@/lib/api/client";
import type { CompanyMember, Role } from "@/lib/api/types";
import { useT } from "@/i18n/client";
import { fill } from "@/i18n/format";
import { SkeletonRows } from "@/components/dashboard/ui/Skeleton";

const ROLE_OPTIONS: Role[] = ["ADMIN", "MARKETING_MANAGER", "COMMUNITY_MANAGER", "PROVIDER"];

const EMPTY_FORM = { email: "", firstName: "", lastName: "", phone: "", role: "COMMUNITY_MANAGER" as Role };

export function EquipesClient() {
  const t = useT("dashAccount");
  const tt = t.teams;
  const dash = useT("dash");
  const { user } = useAuth();
  const [members, setMembers] = useState<CompanyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [pendingId, setPendingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchMembers = useCallback(() => {
    return apiListUsers().then(
      (result) => {
        setMembers(result);
        setLoading(false);
      },
      (error: unknown) => {
        setLoadError(error instanceof ApiError ? error.message : tt.loadError);
        setLoading(false);
      }
    );
  }, [tt]);

  useEffect(() => {
    void fetchMembers();
  }, [fetchMembers]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setFormError(null);
    apiCreateSubAccount(form).then(
      (created) => {
        setMembers((prev) => [...prev, created]);
        setForm(EMPTY_FORM);
        setShowForm(false);
        setSubmitting(false);
      },
      (error: unknown) => {
        setFormError(error instanceof ApiError ? error.message : tt.createError);
        setSubmitting(false);
      }
    );
  }

  function handleRoleChange(id: string, role: Role) {
    setPendingId(id);
    setActionError(null);
    apiUpdateUserRole(id, role).then(
      (updated) => {
        setMembers((prev) => prev.map((member) => (member.id === id ? updated : member)));
        setPendingId(null);
      },
      (error: unknown) => {
        setActionError(error instanceof ApiError ? error.message : tt.roleError);
        setPendingId(null);
      }
    );
  }

  function handleDeactivate(member: CompanyMember) {
    // Pas d'endpoint de réactivation côté backend : cette action est
    // irréversible depuis l'app, d'où la confirmation explicite.
    const confirmed = window.confirm(
      fill(tt.confirmDeactivate, { name: `${member.firstName} ${member.lastName}` })
    );
    if (!confirmed) return;

    setPendingId(member.id);
    setActionError(null);
    apiDeactivateUser(member.id).then(
      () => {
        setMembers((prev) =>
          prev.map((item) =>
            item.id === member.id ? { ...item, deactivatedAt: new Date().toISOString() } : item
          )
        );
        setPendingId(null);
      },
      (error: unknown) => {
        setActionError(error instanceof ApiError ? error.message : tt.deactivateError);
        setPendingId(null);
      }
    );
  }

  return (
    <>
      <TopBar title={dash.titles.teams} />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="flex flex-col gap-6 px-8 py-6">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowForm((value) => !value)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-accent to-green-accent-dark px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-green-accent/40 hover:brightness-105"
            >
              <Plus className="size-4" aria-hidden="true" />
              {tt.invite}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="rounded-[5px] border border-border bg-white p-5">
              <h2 className="text-sm font-bold text-black">{tt.inviteTitle}</h2>
              <p className="mt-0.5 text-[11px] text-gray-text">
                {tt.inviteText}
              </p>
              {formError && <p className="mt-3 text-sm text-red-600">{formError}</p>}
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  required
                  type="text"
                  placeholder={tt.firstName}
                  value={form.firstName}
                  onChange={(event) => setForm((prev) => ({ ...prev, firstName: event.target.value }))}
                  className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-green-accent-dark"
                />
                <input
                  required
                  type="text"
                  placeholder={tt.lastName}
                  value={form.lastName}
                  onChange={(event) => setForm((prev) => ({ ...prev, lastName: event.target.value }))}
                  className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-green-accent-dark"
                />
                <input
                  required
                  type="email"
                  placeholder={tt.email}
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-green-accent-dark"
                />
                <input
                  required
                  type="tel"
                  placeholder={tt.phone}
                  value={form.phone}
                  onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                  className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-green-accent-dark"
                />
                <select
                  value={form.role}
                  onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value as Role }))}
                  className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-green-accent-dark sm:col-span-2"
                >
                  {ROLE_OPTIONS.map((role) => (
                    <option key={role} value={role}>
                      {dash.roles[role]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-green-accent-dark px-5 py-2 text-sm font-semibold text-white hover:bg-green-600 disabled:opacity-50"
                >
                  {submitting ? t.sending : tt.sendInvite}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-dash-body hover:bg-slate-50"
                >
                  {dash.common.cancel}
                </button>
              </div>
            </form>
          )}

          {loadError && <p className="text-sm text-red-600">{loadError}</p>}
          {actionError && <p className="text-sm text-red-600">{actionError}</p>}

          <div className="overflow-hidden rounded-[5px] border border-border bg-white">
            {loading ? (
              <SkeletonRows rows={4} label={tt.loading} />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-semibold text-gray-text">
                      <th className="px-5 py-2.5">{tt.headers.member}</th>
                      <th className="px-5 py-2.5">{tt.headers.phone}</th>
                      <th className="px-5 py-2.5">{tt.headers.role}</th>
                      <th className="px-5 py-2.5">{tt.headers.status}</th>
                      <th className="px-5 py-2.5">{tt.headers.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => {
                      const isSelf = member.id === user?.userId;
                      const isDeactivated = Boolean(member.deactivatedAt);
                      return (
                        <tr key={member.id} className="border-t border-border-light">
                          <td className="px-5 py-3">
                            <p className="text-xs font-semibold text-black">
                              {member.firstName} {member.lastName}{" "}
                              {isSelf && <span className="font-normal text-gray-text-light">{tt.you}</span>}
                            </p>
                            <p className="text-[10px] text-gray-text-light">{member.email}</p>
                          </td>
                          <td className="px-5 py-3 text-xs text-gray-700">{member.phone}</td>
                          <td className="px-5 py-3">
                            <select
                              value={member.role}
                              disabled={isSelf || pendingId === member.id}
                              onChange={(event) => handleRoleChange(member.id, event.target.value as Role)}
                              className="rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-dash-body disabled:opacity-50"
                            >
                              {ROLE_OPTIONS.map((role) => (
                                <option key={role} value={role}>
                                  {dash.roles[role]}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-5 py-3">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                isDeactivated ? "bg-slate-100 text-slate-500" : "bg-[#ecfdf5] text-[#059669]"
                              }`}
                            >
                              {isDeactivated ? tt.deactivated : tt.active}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <button
                              type="button"
                              disabled={isSelf || isDeactivated || pendingId === member.id}
                              onClick={() => handleDeactivate(member)}
                              className="inline-flex items-center gap-1.5 rounded-full border border-red-600/30 px-3 py-1.5 text-[11px] font-semibold text-red-600 hover:bg-red-50 disabled:opacity-40"
                            >
                              <UserX className="size-3.5" aria-hidden="true" />
                              {tt.deactivate}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
