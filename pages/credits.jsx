import { useRouter } from "next/router";
import { useMemo, useState } from "react";

const SUPPORT_EMAIL = "support@teachwiseai.mpaiapps.com";

const PLAN_OPTIONS = [
  { id: "starter", name: "Starter", credits: 100, price: "₹499" },
  { id: "teacher", name: "Teacher", credits: 250, price: "₹999" },
  { id: "school", name: "School", credits: 600, price: "₹1,999" },
];

export default function CreditsPage() {
  const router = useRouter();
  const [selectedPlanId, setSelectedPlanId] = useState(PLAN_OPTIONS[0].id);

  const selectedPlan = useMemo(() => {
    return PLAN_OPTIONS.find((plan) => plan.id === selectedPlanId) ?? PLAN_OPTIONS[0];
  }, [selectedPlanId]);
  const steps = [
    {
      id: 1,
      title: "Select the credit pack that fits your usage.",
    },
    {
      id: 2,
      title: "Send the payment via UPI to 9629677059@ybl (include your email in the notes).",
    },
    {
      id: 3,
      title: `Email ${SUPPORT_EMAIL} with the payment receipt attached (PDF or screenshot).`,
    },
    {
      id: 4,
      title: "We verify the transfer and update your credits within 1 hour.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "80px 16px 40px",
        background: "#0f172a",
        color: "#e2e8f0",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          background: "#111827",
          borderRadius: "24px",
          padding: "32px",
          border: "1px solid #1e293b",
          boxShadow: "0 40px 80px rgba(15, 23, 42, 0.55)",
        }}
      >
        <header style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ color: "#38bdf8", fontWeight: 600, letterSpacing: "0.08em" }}>
            TEACHWISE AI
          </span>
          <h1 style={{ margin: 0, fontSize: "2rem" }}>Add credits</h1>
        </header>

        <div
          style={{
            marginTop: "32px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {PLAN_OPTIONS.map((plan) => {
            const isSelected = plan.id === selectedPlanId;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlanId(plan.id)}
                style={{
                  borderRadius: "18px",
                  border: isSelected ? "2px solid #38bdf8" : "1px solid #1e293b",
                  padding: "20px",
                  background: isSelected ? "rgba(56, 189, 248, 0.12)" : "rgba(15, 23, 42, 0.65)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  cursor: "pointer",
                  textAlign: "left",
                  color: "inherit",
                }}
              >
                <h2 style={{ margin: 0, fontSize: "1.3rem" }}>{plan.name}</h2>
                <span style={{ fontSize: "0.95rem", color: "#94a3b8" }}>
                  {plan.credits} credits
                </span>
                <strong style={{ fontSize: "1.4rem" }}>{plan.price}</strong>
                <span
                  style={{
                    marginTop: "auto",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: isSelected ? "#38bdf8" : "#cbd5f5",
                  }}
                >
                  {isSelected ? "Selected" : "Select this plan"}
                </span>
              </button>
            );
          })}
        </div>

        

        <section style={{ marginTop: "32px" }}>
          <h3 style={{ marginBottom: "12px" }}>How it works</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {steps.map((step) => (
              <div
                key={step.id}
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  borderRadius: "16px",
                  padding: "16px",
                  background: "rgba(15, 23, 42, 0.65)",
                  border: "1px solid rgba(148,163,184,0.2)",
                }}
              >
                <span
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "9999px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0f172a",
                    border: "2px solid #38bdf8",
                    color: "#38bdf8",
                    fontWeight: 700,
                  }}
                >
                  {step.id}
                </span>
                <p style={{ margin: 0, lineHeight: 1.5, color: "#cbd5f5" }}>{step.title}</p>
              </div>
            ))}
          </div>
        </section>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <button
            type="button"
            onClick={() => router.push("/")}
            style={{
              padding: "10px 18px",
              borderRadius: "9999px",
              border: "1px solid #1e293b",
              background: "transparent",
              color: "#e2e8f0",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Back to dashboard
          </button>
          <button
            type="button"
            onClick={() => router.push("/login")}
            style={{
              padding: "10px 18px",
              borderRadius: "9999px",
              border: "none",
              background: "#38bdf8",
              color: "#0b1120",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Switch account
          </button>
        </div>
      </div>
    </div>
  );
}
