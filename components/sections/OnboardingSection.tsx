"use client";

import { useState } from "react";
import type { Locale } from "@/lib/dictionaries";

interface OnboardingProps {
  dict: {
    onboarding: {
      tag: string;
      sidebar_title: string;
      sidebar_body: string;
      steps: {
        labels: string[];
        step1: {
          title: string;
          subtitle: string;
          options: { value: string; label: string; desc: string }[];
        };
        step2: {
          title: string;
          options: { value: string; label: string }[];
        };
        step3: {
          title: string;
          fields: { business_name: string; business_desc: string; problem: string };
        };
        step4: {
          title: string;
          subtitle: string;
          options: string[];
        };
        step5: {
          title: string;
          budget_label: string;
          timeline_label: string;
          timelines: { value: string; label: string; desc: string }[];
        };
        step6: {
          title: string;
          fields: { name: string; email: string };
          contact_methods: { value: string; label: string }[];
        };
      };
      buttons: { next: string; back: string; submit: string };
      success: { title: string; subtitle: string; steps: string[] };
    };
  };
  lang: Locale;
}

const BUDGET_TIERS = [
  "< $300K", "$300K", "$500K", "$800K", "$1.2M",
  "$1.5M", "$2M", "$3M", "$4M", "$5M", "$6M", "$8M", "$10M+"
];

type FormData = {
  projectType: string[];
  currentSituation: string;
  businessName: string;
  businessDesc: string;
  problemSolving: string;
  features: string[];
  budget: string;
  timeline: string;
  contactName: string;
  contactEmail: string;
  contactMethod: string;
};

export default function OnboardingSection({ dict, lang }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<FormData>({
    projectType: [],
    currentSituation: "",
    businessName: "",
    businessDesc: "",
    problemSolving: "",
    features: [],
    budget: "$800K",
    timeline: "",
    contactName: "",
    contactEmail: "",
    contactMethod: "",
  });

  const { steps, buttons, success } = dict.onboarding;
  const TOTAL = 6;

  function toggleArray(arr: string[], val: string): string[] {
    return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
  }

  function canAdvance(): boolean {
    switch (step) {
      case 1: return data.projectType.length > 0;
      case 2: return !!data.currentSituation;
      case 3: return !!data.businessName && !!data.businessDesc && !!data.problemSolving;
      case 4: return data.features.length > 0;
      case 5: return !!data.budget && !!data.timeline;
      case 6: return !!data.contactName && !!data.contactEmail && !!data.contactMethod;
      default: return true;
    }
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale: lang }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setSubmitted(true);
    } catch {
      setError("Ocurrió un error. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="proyecto"
      style={{ background: "var(--bg)", padding: "7rem 2rem" }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "350px 1fr",
          gap: "4rem",
          alignItems: "start",
        }}
        className="onboarding-grid"
      >
        {/* Sidebar */}
        <div style={{ position: "sticky", top: "100px" }}>
          <span
            style={{
              display: "inline-block",
              fontFamily: "Outfit, sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--brand)",
              marginBottom: "1.5rem",
            }}
          >
            {dict.onboarding.tag}
          </span>
          <h2
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
              fontWeight: 400,
              letterSpacing: "0.06em",
              color: "var(--text-1)",
              lineHeight: 1.3,
              marginBottom: "1.25rem",
            }}
          >
            {dict.onboarding.sidebar_title}
          </h2>
          <p
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "14px",
              color: "var(--text-2)",
              lineHeight: 1.75,
            }}
          >
            {dict.onboarding.sidebar_body}
          </p>
        </div>

        {/* Form card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "2.5rem",
            boxShadow: "0 4px 32px rgba(91,33,182,0.06)",
          }}
        >
          {submitted ? (
            <SuccessScreen success={success} />
          ) : (
            <>
              {/* Progress */}
              <ProgressBar
                current={step}
                total={TOTAL}
                labels={steps.labels}
              />

              {/* Steps */}
              <div style={{ marginTop: "2rem" }}>
                {step === 1 && (
                  <Step1
                    stepData={steps.step1}
                    selected={data.projectType}
                    onChange={(v) =>
                      setData((d) => ({ ...d, projectType: toggleArray(d.projectType, v) }))
                    }
                  />
                )}
                {step === 2 && (
                  <Step2
                    stepData={steps.step2}
                    selected={data.currentSituation}
                    onChange={(v) => setData((d) => ({ ...d, currentSituation: v }))}
                  />
                )}
                {step === 3 && (
                  <Step3
                    stepData={steps.step3}
                    values={{ businessName: data.businessName, businessDesc: data.businessDesc, problemSolving: data.problemSolving }}
                    onChange={(key, val) => setData((d) => ({ ...d, [key]: val }))}
                  />
                )}
                {step === 4 && (
                  <Step4
                    stepData={steps.step4}
                    selected={data.features}
                    onChange={(v) =>
                      setData((d) => ({ ...d, features: toggleArray(d.features, v) }))
                    }
                  />
                )}
                {step === 5 && (
                  <Step5
                    stepData={steps.step5}
                    budget={data.budget}
                    timeline={data.timeline}
                    onBudget={(v) => setData((d) => ({ ...d, budget: v }))}
                    onTimeline={(v) => setData((d) => ({ ...d, timeline: v }))}
                  />
                )}
                {step === 6 && (
                  <Step6
                    stepData={steps.step6}
                    values={{ contactName: data.contactName, contactEmail: data.contactEmail, contactMethod: data.contactMethod }}
                    onChange={(key, val) => setData((d) => ({ ...d, [key]: val }))}
                  />
                )}
              </div>

              {error && (
                <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "1rem" }}>{error}</p>
              )}

              {/* Navigation */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "2.5rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid var(--border)",
                }}
              >
                {step > 1 ? (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontSize: "13px",
                      color: "var(--text-2)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      letterSpacing: "0.06em",
                    }}
                  >
                    ← {buttons.back}
                  </button>
                ) : (
                  <span />
                )}
                {step < TOTAL ? (
                  <button
                    onClick={() => canAdvance() && setStep((s) => s + 1)}
                    disabled={!canAdvance()}
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontSize: "13px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#fff",
                      background: canAdvance() ? "var(--brand)" : "var(--text-3)",
                      border: "none",
                      borderRadius: "6px",
                      padding: "10px 24px",
                      cursor: canAdvance() ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "background 0.2s",
                    }}
                  >
                    {buttons.next}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!canAdvance() || loading}
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontSize: "13px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#fff",
                      background: canAdvance() && !loading ? "var(--brand)" : "var(--text-3)",
                      border: "none",
                      borderRadius: "6px",
                      padding: "10px 24px",
                      cursor: canAdvance() && !loading ? "pointer" : "not-allowed",
                      transition: "background 0.2s",
                    }}
                  >
                    {loading ? "..." : buttons.submit}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .onboarding-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ── Progress Bar ─────────────────────────────────────── */
function ProgressBar({ current, total, labels }: { current: number; total: number; labels: string[] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <div key={n} style={{ display: "flex", alignItems: "center", flex: n < total ? 1 : "none" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                background: active ? "var(--accent)" : done ? "var(--brand)" : "var(--surface2)",
                border: `1px solid ${active ? "var(--brand)" : done ? "var(--brand)" : "var(--border)"}`,
                transition: "all 0.3s",
              }}
            >
              {done ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <span style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "11px",
                  color: active ? "var(--brand)" : "var(--text-3)",
                }}>
                  {n}
                </span>
              )}
            </div>
            {n < total && (
              <div style={{
                flex: 1,
                height: "1px",
                background: done ? "var(--brand)" : "var(--border)",
                transition: "background 0.3s",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Step 1 ───────────────────────────────────────────── */
function Step1({ stepData, selected, onChange }: {
  stepData: { title: string; subtitle: string; options: { value: string; label: string; desc: string }[] };
  selected: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "16px", fontWeight: 500, color: "var(--text-1)", marginBottom: "0.5rem", letterSpacing: "0.04em" }}>{stepData.title}</h3>
      <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "13px", color: "var(--text-3)", marginBottom: "1.5rem" }}>{stepData.subtitle}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        {stepData.options.map((opt) => {
          const active = selected.includes(opt.value);
          return (
            <div
              key={opt.value}
              onClick={() => onChange(opt.value)}
              style={{
                background: active ? "var(--accent)" : "var(--surface2)",
                border: `1px solid ${active ? "var(--brand)" : "var(--border)"}`,
                borderRadius: "8px",
                padding: "1.25rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", fontWeight: 500, color: active ? "var(--brand)" : "var(--text-1)", marginBottom: "4px" }}>{opt.label}</div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "12px", color: "var(--text-3)" }}>{opt.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Step 2 ───────────────────────────────────────────── */
function Step2({ stepData, selected, onChange }: {
  stepData: { title: string; options: { value: string; label: string }[] };
  selected: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "16px", fontWeight: 500, color: "var(--text-1)", marginBottom: "1.5rem", letterSpacing: "0.04em" }}>{stepData.title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {stepData.options.map((opt) => {
          const active = selected === opt.value;
          return (
            <div
              key={opt.value}
              onClick={() => onChange(opt.value)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                background: active ? "var(--accent)" : "var(--surface2)",
                border: `1px solid ${active ? "var(--brand)" : "var(--border)"}`,
                borderRadius: "8px",
                padding: "1rem 1.25rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <div style={{
                width: "16px", height: "16px", borderRadius: "50%", flexShrink: 0,
                border: `1px solid ${active ? "var(--brand)" : "var(--border-s)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {active && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--brand)" }} />}
              </div>
              <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: active ? "var(--brand)" : "var(--text-1)" }}>{opt.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Step 3 ───────────────────────────────────────────── */
function Step3({ stepData, values, onChange }: {
  stepData: { title: string; fields: { business_name: string; business_desc: string; problem: string } };
  values: { businessName: string; businessDesc: string; problemSolving: string };
  onChange: (key: string, val: string) => void;
}) {
  const inputStyle = {
    width: "100%",
    fontFamily: "Outfit, sans-serif",
    fontSize: "14px",
    color: "var(--text-1)",
    background: "var(--surface2)",
    border: "1px solid var(--border)",
    borderRadius: "6px",
    padding: "10px 14px",
    outline: "none",
    transition: "border-color 0.2s",
  };
  const labelStyle = {
    display: "block",
    fontFamily: "Outfit, sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "var(--text-3)",
    marginBottom: "6px",
  };

  return (
    <div>
      <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "16px", fontWeight: 500, color: "var(--text-1)", marginBottom: "1.5rem", letterSpacing: "0.04em" }}>{stepData.title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label style={labelStyle}>{stepData.fields.business_name}</label>
          <input style={inputStyle} value={values.businessName} onChange={(e) => onChange("businessName", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>{stepData.fields.business_desc}</label>
          <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={values.businessDesc} onChange={(e) => onChange("businessDesc", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>{stepData.fields.problem}</label>
          <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={values.problemSolving} onChange={(e) => onChange("problemSolving", e.target.value)} />
        </div>
      </div>
    </div>
  );
}

/* ── Step 4 ───────────────────────────────────────────── */
function Step4({ stepData, selected, onChange }: {
  stepData: { title: string; subtitle: string; options: string[] };
  selected: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "16px", fontWeight: 500, color: "var(--text-1)", marginBottom: "0.5rem", letterSpacing: "0.04em" }}>{stepData.title}</h3>
      <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "13px", color: "var(--text-3)", marginBottom: "1.5rem" }}>{stepData.subtitle}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
        {stepData.options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: "13px",
                color: active ? "var(--brand)" : "var(--text-2)",
                background: active ? "var(--accent)" : "var(--surface2)",
                border: `1px solid ${active ? "var(--brand)" : "var(--border)"}`,
                borderRadius: "20px",
                padding: "6px 14px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Step 5 ───────────────────────────────────────────── */
function Step5({ stepData, budget, timeline, onBudget, onTimeline }: {
  stepData: { title: string; budget_label: string; timeline_label: string; timelines: { value: string; label: string; desc: string }[] };
  budget: string;
  timeline: string;
  onBudget: (v: string) => void;
  onTimeline: (v: string) => void;
}) {
  const idx = BUDGET_TIERS.indexOf(budget);

  return (
    <div>
      <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "16px", fontWeight: 500, color: "var(--text-1)", marginBottom: "2rem", letterSpacing: "0.04em" }}>{stepData.title}</h3>

      <div style={{ marginBottom: "2rem" }}>
        <label style={{ fontFamily: "Outfit, sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", display: "block", marginBottom: "0.75rem" }}>
          {stepData.budget_label}
        </label>
        <div style={{ fontFamily: "Cinzel, serif", fontSize: "18px", color: "var(--brand)", marginBottom: "0.75rem", letterSpacing: "0.04em" }}>
          {budget}
        </div>
        <input
          type="range"
          min={0}
          max={BUDGET_TIERS.length - 1}
          value={idx === -1 ? 3 : idx}
          onChange={(e) => onBudget(BUDGET_TIERS[parseInt(e.target.value)])}
          style={{ width: "100%", accentColor: "var(--brand)" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Outfit, sans-serif", fontSize: "11px", color: "var(--text-3)", marginTop: "4px" }}>
          <span>{BUDGET_TIERS[0]}</span>
          <span>{BUDGET_TIERS[BUDGET_TIERS.length - 1]}</span>
        </div>
      </div>

      <div>
        <label style={{ fontFamily: "Outfit, sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", display: "block", marginBottom: "0.75rem" }}>
          {stepData.timeline_label}
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {stepData.timelines.map((t) => {
            const active = timeline === t.value;
            return (
              <div
                key={t.value}
                onClick={() => onTimeline(t.value)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: active ? "var(--accent)" : "var(--surface2)",
                  border: `1px solid ${active ? "var(--brand)" : "var(--border)"}`,
                  borderRadius: "8px", padding: "0.875rem 1.25rem", cursor: "pointer", transition: "all 0.2s",
                }}
              >
                <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: active ? "var(--brand)" : "var(--text-1)" }}>{t.label}</span>
                <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "12px", color: "var(--text-3)" }}>{t.desc}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Step 6 ───────────────────────────────────────────── */
function Step6({ stepData, values, onChange }: {
  stepData: { title: string; fields: { name: string; email: string }; contact_methods: { value: string; label: string }[] };
  values: { contactName: string; contactEmail: string; contactMethod: string };
  onChange: (key: string, val: string) => void;
}) {
  const inputStyle = {
    width: "100%",
    fontFamily: "Outfit, sans-serif",
    fontSize: "14px",
    color: "var(--text-1)",
    background: "var(--surface2)",
    border: "1px solid var(--border)",
    borderRadius: "6px",
    padding: "10px 14px",
    outline: "none",
  };
  const labelStyle = {
    display: "block",
    fontFamily: "Outfit, sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "var(--text-3)",
    marginBottom: "6px",
  };

  return (
    <div>
      <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "16px", fontWeight: 500, color: "var(--text-1)", marginBottom: "1.5rem", letterSpacing: "0.04em" }}>{stepData.title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "1.5rem" }}>
        <div>
          <label style={labelStyle}>{stepData.fields.name}</label>
          <input style={inputStyle} value={values.contactName} onChange={(e) => onChange("contactName", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>{stepData.fields.email}</label>
          <input type="email" style={inputStyle} value={values.contactEmail} onChange={(e) => onChange("contactEmail", e.target.value)} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {stepData.contact_methods.map((m) => {
          const active = values.contactMethod === m.value;
          return (
            <div
              key={m.value}
              onClick={() => onChange("contactMethod", m.value)}
              style={{
                display: "flex", alignItems: "center", gap: "1rem",
                background: active ? "var(--accent)" : "var(--surface2)",
                border: `1px solid ${active ? "var(--brand)" : "var(--border)"}`,
                borderRadius: "8px", padding: "0.875rem 1.25rem", cursor: "pointer", transition: "all 0.2s",
              }}
            >
              <div style={{ width: "16px", height: "16px", borderRadius: "50%", flexShrink: 0, border: `1px solid ${active ? "var(--brand)" : "var(--border-s)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {active && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--brand)" }} />}
              </div>
              <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: active ? "var(--brand)" : "var(--text-1)" }}>{m.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Success Screen ───────────────────────────────────── */
function SuccessScreen({ success }: { success: { title: string; subtitle: string; steps: string[] } }) {
  return (
    <div style={{ textAlign: "center", padding: "2rem 0" }}>
      <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "20px", fontWeight: 400, color: "var(--text-1)", marginBottom: "0.75rem", letterSpacing: "0.06em" }}>{success.title}</h3>
      <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: "var(--text-2)", marginBottom: "2rem" }}>{success.subtitle}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", textAlign: "left", maxWidth: "380px", margin: "0 auto" }}>
        {success.steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <span style={{ fontFamily: "Cinzel, serif", fontSize: "12px", color: "var(--brand)", flexShrink: 0, marginTop: "2px" }}>0{i + 1}</span>
            <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "13px", color: "var(--text-2)", lineHeight: 1.6 }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
