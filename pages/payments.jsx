import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import AuthControls from "../components/AuthControls";
import { AUTH_SESSION_STORAGE_KEY } from "../lib/guestUsage";

const PRICE_PER_CREDIT = 1;
const MIN_PURCHASE_CREDITS = 400;
const DISCOUNT_RATE = 0;
const TAX_RATE = 0;
const UPI_PAYMENT_ADDRESS = "9629677059@ybl";
const UPI_ACCOUNT_NAME = "Teachwise AI";

const UPI_METHOD = {
  id: "upi",
  label: "UPI",
  description: "Use Google Pay, PhonePe, Paytm, or any UPI app to complete payment.",
};

export default function PaymentsPage() {
  const router = useRouter();
  const [upiId, setUpiId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const credits = useMemo(() => {
    const value = router.query?.credits;
    const parsed = Number.parseInt(Array.isArray(value) ? value[0] : value ?? "0", 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return null;
    }
    return parsed;
  }, [router.query?.credits]);
  const billingEmail = useMemo(() => {
    return process.env.NEXT_PUBLIC_BILLING_EMAIL || "support@teachwiseai.com";
  }, []);
  const creditsValid = useMemo(() => credits !== null && credits >= MIN_PURCHASE_CREDITS, [credits]);
  const invoice = useMemo(() => {
    if (!creditsValid || !credits) {
      return {
        subtotal: 0,
        discountAmount: 0,
        taxableAmount: 0,
        taxAmount: 0,
        total: 0,
      };
    }

    const subtotal = credits * PRICE_PER_CREDIT;
    const discountAmount = subtotal * DISCOUNT_RATE;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = taxableAmount * TAX_RATE;
    const total = taxableAmount + taxAmount;

    return { subtotal, discountAmount, taxableAmount, taxAmount, total };
  }, [credits, creditsValid]);

  const formatAmount = (value) => `INR ${value.toFixed(2)}`;

  const handleSendReceipt = () => {
    if (!creditsValid) {
      window.alert(`Select at least ${MIN_PURCHASE_CREDITS} credits on the dashboard to proceed.`);
      return;
    }

    const subject = encodeURIComponent(`Payment receipt - ${credits} credits`);
    const lines = [
      `Credits requested: ${credits}`,
      `Amount paid: ${formatAmount(invoice.total)}`,
      `Payment sent to: ${UPI_PAYMENT_ADDRESS}`,
      "UPI transaction reference: <add your reference number>",
      "Contact phone number: <add the phone number we can reach you at>",
      `User email: ${userEmail || "Not provided"}`,
    ];

    if (upiId.trim()) {
      lines.push(`UPI ID used: ${upiId.trim()}`);
    }

    lines.push("Attach your payment receipt or screenshot to this email.");
    lines.push("We will update your credits shortly after verification.");

    const body = encodeURIComponent(lines.join("\n"));
    const mailtoUrl = `mailto:${billingEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const raw = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw);
      const email = parsed?.user?.email;
      if (email) {
        setUserEmail(email);
      }
    } catch (error) {
      // Ignore malformed storage values
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b1120",
        color: "#e2e8f0",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        padding: "32px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "#111827",
          border: "1px solid #1f2937",
          borderRadius: "18px",
          padding: "32px",
          boxShadow: "0 24px 48px rgba(15, 23, 42, 0.55)",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <AuthControls
          appearance={{
            text: "#e2e8f0",
            accent: "#38bdf8",
            border: "#1f2937",
            subduedText: "#94a3b8",
            surface: "#0f172a",
            isDark: true,
          }}
          containerStyle={{ alignSelf: "flex-end" }}
        />
        <header style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ color: "#38bdf8", fontWeight: 600, letterSpacing: "0.12em" }}>
            TEACHWISE AI
          </span>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 700, margin: 0 }}>Complete your purchase</h1>
        </header>

        {creditsValid ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <p style={{ margin: 0, lineHeight: 1.6, fontSize: "1rem" }}>
              You asked to add <strong>{credits}</strong> credit{credits === 1 ? "" : "s"}. Once payment succeeds we will
              apply the credits to your account.
            </p>
            <p style={{ margin: 0, lineHeight: 1.6, fontSize: "0.95rem", color: "#38bdf8" }}>
              Reminder: each generate action consumes 10 credits.
            </p>
          </div>
        ) : credits !== null ? (
          <p style={{ margin: 0, lineHeight: 1.6, fontSize: "1rem", color: "#f97316" }}>
            The minimum purchase is {MIN_PURCHASE_CREDITS} credits. Please return to the dashboard and enter at least
            {" "}
            {MIN_PURCHASE_CREDITS} credits to continue.
          </p>
        ) : (
          <p style={{ margin: 0, lineHeight: 1.6, fontSize: "1rem" }}>
            Select the number of credits you need from the dashboard to start a purchase.
          </p>
        )}

        {creditsValid ? (
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "20px",
              borderRadius: "14px",
              border: "1px solid #1f2937",
              background: "#0f172a",
            }}
          >
            <h2 style={{ fontSize: "1.1rem", margin: 0 }}>Invoice summary</h2>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
              <span>Credits x price</span>
              <span>
                {credits} × {formatAmount(PRICE_PER_CREDIT)}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
              <span>Subtotal</span>
              <span>{formatAmount(invoice.subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
              <span>Discount</span>
              <span>-{formatAmount(invoice.discountAmount)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
              <span>Tax</span>
              <span>{formatAmount(invoice.taxAmount)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.05rem",
                fontWeight: 600,
                paddingTop: "6px",
                borderTop: "1px solid #1f2937",
              }}
            >
              <span>Total payable</span>
              <span>{formatAmount(invoice.total)}</span>
            </div>
          </section>
        ) : null}

        <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h2 style={{ fontSize: "1.1rem", margin: "12px 0 0" }}>Payment method</h2>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #38bdf8",
              background: "rgba(56, 189, 248, 0.12)",
            }}
          >
            <span>
              <span style={{ display: "block", fontWeight: 600, fontSize: "1rem", marginBottom: "4px" }}>
                {UPI_METHOD.label}
              </span>
              <span style={{ color: "#cbd5f5", fontSize: "0.9rem", lineHeight: 1.5 }}>
                {UPI_METHOD.description}
              </span>
            </span>
          </div>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>
              Your UPI ID <span style={{ color: "#64748b" }}>(optional)</span>
            </span>
            <input
              type="text"
              value={upiId}
              onChange={(event) => setUpiId(event.target.value)}
              placeholder="name@upi"
              style={{
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #1f2937",
                background: "#0b1120",
                color: "#e2e8f0",
                fontSize: "0.95rem",
              }}
            />
          </label>
        </section>

        {creditsValid ? (
          <div
            style={{
              background: "rgba(148, 163, 184, 0.12)",
              border: "1px solid #1f2937",
              borderRadius: "12px",
              padding: "16px",
              fontSize: "0.9rem",
              color: "#cbd5f5",
            }}
          >
            Send {formatAmount(invoice.total)} to <strong>{UPI_PAYMENT_ADDRESS}</strong> ({UPI_ACCOUNT_NAME}) using any UPI
            app. After payment, email your receipt with your phone number to <strong>{billingEmail}</strong>. Once payment
            is received, credits will be updated shortly.
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleSendReceipt}
          disabled={!creditsValid}
          style={{
            padding: "10px 18px",
            borderRadius: "9999px",
            border: "1px solid #38bdf8",
            background: "transparent",
            color: creditsValid ? "#38bdf8" : "#1e293b",
            fontWeight: 600,
            cursor: creditsValid ? "pointer" : "not-allowed",
          }}
        >
          Email payment receipt
        </button>

        <button
          type="button"
          onClick={() => router.push("/")}
          style={{
            padding: "10px 18px",
            borderRadius: "9999px",
            border: "1px solid #1f2937",
            background: "transparent",
            color: "#cbd5f5",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Back to dashboard
        </button>
      </div>
    </div>
  );
}
