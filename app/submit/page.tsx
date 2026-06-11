"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const CATEGORIES = [
  "Food & Dining",
  "Beauty",
  "Health & Wellness",
  "Retail",
  "Auto",
  "Services",
  "Home Services",
  "Arts & Culture",
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface FormState {
  name: string;
  owner_name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  website: string;
  hours: Record<string, string>;
}

const INITIAL: FormState = {
  name: "",
  owner_name: "",
  category: "",
  description: "",
  address: "",
  city: "Augusta",
  state: "GA",
  phone: "",
  website: "",
  hours: {},
};

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold transition-colors ${
              n < step
                ? "bg-brand-gold text-white"
                : n === step
                ? "bg-brand-brown text-brand-light"
                : "bg-brand-card text-brand-muted"
            }`}
          >
            {n < step ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              n
            )}
          </div>
          {n < 3 && <div className={`w-8 h-0.5 ${n < step ? "bg-brand-gold" : "bg-brand-card"}`} />}
        </div>
      ))}
    </div>
  );
}

const STEP_LABELS = ["Business Info", "Contact & Location", "Review & Submit"];

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="text-xs font-bold text-brand-surface uppercase tracking-wide mb-1.5 block">
      {children}
      {required && <span className="text-brand-gold ml-1">*</span>}
    </label>
  );
}

const inputCls =
  "w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-[14px] text-brand-dark placeholder:text-brand-subtle focus:outline-none focus:border-brand-gold transition-colors";

export default function SubmitPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const setHour = (day: string, value: string) => {
    setForm((f) => ({ ...f, hours: { ...f.hours, [day]: value } }));
  };

  const validateStep1 = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Business name is required";
    if (!form.category) e.category = "Please select a category";
    if (!form.description.trim()) e.description = "Description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: typeof errors = {};
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: form.name.trim(),
      owner_name: form.owner_name.trim() || null,
      category: form.category,
      description: form.description.trim(),
      address: form.address.trim(),
      city: form.city.trim() || "Augusta",
      state: form.state.trim() || "GA",
      phone: form.phone.trim(),
      website: form.website.trim() || null,
      hours: Object.keys(form.hours).length > 0 ? form.hours : null,
      is_black_owned: true,
      status: "pending",
    };

    const { error } = await supabase.from("businesses").insert(payload);

    if (error) {
      setSubmitError(error.message);
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center px-5 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{ background: "#E4F1EA" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#1F8A5B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="font-serif text-2xl font-semibold text-brand-dark">You&apos;re Submitted!</h1>
        <p className="text-sm text-brand-muted mt-3 max-w-[280px] leading-relaxed">
          <b className="text-brand-dark">{form.name}</b> has been submitted for review. We&apos;ll
          verify and approve it within 1–3 business days.
        </p>
        <div className="mt-8 flex flex-col gap-3 w-full max-w-[280px]">
          <Link
            href="/"
            className="bg-brand-brown text-brand-light text-sm font-bold rounded-full py-3.5 text-center"
          >
            Back to Home
          </Link>
          <button
            onClick={() => {
              setForm(INITIAL);
              setStep(1);
              setSubmitted(false);
            }}
            className="bg-white border border-brand-border text-brand-brown text-sm font-bold rounded-full py-3.5"
          >
            Submit Another Business
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream pb-10">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-brand-cream/95 border-b border-brand-card px-5 py-4">
        <div className="max-w-[420px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            {step > 1 ? (
              <button onClick={() => setStep((s) => s - 1)} className="text-brand-brown">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : (
              <Link href="/" className="text-brand-brown">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            )}
            <div className="flex-1 text-center">
              <h1 className="text-sm font-extrabold text-brand-dark">List Your Business</h1>
              <p className="text-[11px] text-brand-muted">{STEP_LABELS[step - 1]}</p>
            </div>
            <div className="w-5" />
          </div>
          <StepIndicator step={step} />
        </div>
      </div>

      <div className="max-w-[420px] mx-auto px-5 pt-6">
        {/* ── STEP 1: Business Info ── */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <FieldLabel required>Business Name</FieldLabel>
              <input
                type="text"
                className={inputCls}
                placeholder="e.g. Mama's Southern Kitchen"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
              {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <FieldLabel>Owner Name</FieldLabel>
              <input
                type="text"
                className={inputCls}
                placeholder="Full name of the business owner"
                value={form.owner_name}
                onChange={(e) => set("owner_name", e.target.value)}
              />
            </div>

            <div>
              <FieldLabel required>Category</FieldLabel>
              <select
                className={inputCls}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                <option value="">Select a category…</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-[11px] text-red-500 mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <FieldLabel required>Description</FieldLabel>
              <textarea
                className={`${inputCls} resize-none`}
                rows={4}
                placeholder="Tell the community what makes your business special…"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
              <p className="text-[11px] text-brand-muted mt-1 text-right">
                {form.description.length}/500
              </p>
              {errors.description && (
                <p className="text-[11px] text-red-500">{errors.description}</p>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 2: Contact & Location ── */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div>
              <FieldLabel required>Street Address</FieldLabel>
              <input
                type="text"
                className={inputCls}
                placeholder="123 Main St"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
              />
              {errors.address && (
                <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel>City</FieldLabel>
                <input
                  type="text"
                  className={inputCls}
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                />
              </div>
              <div>
                <FieldLabel>State</FieldLabel>
                <input
                  type="text"
                  className={inputCls}
                  maxLength={2}
                  value={form.state}
                  onChange={(e) => set("state", e.target.value.toUpperCase())}
                />
              </div>
            </div>

            <div>
              <FieldLabel required>Phone Number</FieldLabel>
              <input
                type="tel"
                className={inputCls}
                placeholder="(706) 555-0100"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
              {errors.phone && (
                <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <FieldLabel>Website</FieldLabel>
              <input
                type="url"
                className={inputCls}
                placeholder="https://yourbusiness.com"
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
              />
            </div>

            <div>
              <FieldLabel>Business Hours</FieldLabel>
              <div className="flex flex-col gap-2">
                {DAYS.map((day) => (
                  <div key={day} className="flex items-center gap-3">
                    <span className="text-[12px] font-bold text-brand-surface w-8 flex-none">{day}</span>
                    <input
                      type="text"
                      className={`${inputCls} flex-1`}
                      placeholder="9am–5pm or Closed"
                      value={form.hours[day] || ""}
                      onChange={(e) => setHour(day, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Review & Submit ── */}
        {step === 3 && (
          <div className="flex flex-col gap-4">
            <div
              className="bg-white border border-brand-card rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 4px 16px -8px rgba(59,31,10,0.2)" }}
            >
              {/* Card header */}
              <div className="bg-brand-brown px-5 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-extrabold text-brand-light">{form.name}</h2>
                  <p className="text-[12px] text-brand-light/60 mt-0.5">{form.category}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-brand-light bg-white/15 rounded-full px-2.5 py-1">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#E0A93B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  BLACK-OWNED
                </span>
              </div>

              {/* Review rows */}
              <div className="divide-y divide-brand-card">
                {[
                  { label: "Owner", value: form.owner_name || "—" },
                  { label: "Description", value: form.description },
                  {
                    label: "Address",
                    value: `${form.address}, ${form.city}, ${form.state}`,
                  },
                  { label: "Phone", value: form.phone },
                  { label: "Website", value: form.website || "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="px-5 py-3">
                    <div className="text-[10px] font-bold text-brand-muted uppercase tracking-wide mb-0.5">
                      {label}
                    </div>
                    <div className="text-[13px] text-brand-dark">{value}</div>
                  </div>
                ))}

                {Object.keys(form.hours).filter((d) => form.hours[d]).length > 0 && (
                  <div className="px-5 py-3">
                    <div className="text-[10px] font-bold text-brand-muted uppercase tracking-wide mb-1.5">
                      Hours
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {DAYS.filter((d) => form.hours[d]).map((day) => (
                        <div key={day} className="text-[12px] text-brand-dark">
                          <span className="font-bold">{day}</span>{" "}
                          <span className="text-brand-muted">{form.hours[day]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="text-[12px] text-brand-muted text-center leading-relaxed">
              By submitting, you confirm this is a genuine Black-owned business and agree to our
              community guidelines.
            </p>

            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-[12px] text-red-600">
                {submitError}
              </div>
            )}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-8 flex flex-col gap-3">
          {step < 3 ? (
            <button
              onClick={next}
              className="w-full bg-brand-brown text-brand-light text-sm font-bold rounded-full py-4"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-brand-gold text-white text-sm font-bold rounded-full py-4 disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit for Review"}
            </button>
          )}
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="w-full bg-white border border-brand-border text-brand-brown text-sm font-bold rounded-full py-3.5"
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
