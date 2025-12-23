import Link from "next/link";
import { useRouter } from "next/router";

export default function TermsOfService() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px",
    }}>
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        background: "white",
        borderRadius: "16px",
        padding: "48px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <button
          onClick={() => router.push("/")}
          style={{
            marginBottom: "24px",
            padding: "10px 20px",
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.95rem",
            fontWeight: 600,
          }}
        >
          ← Back to Home
        </button>

        <h1 style={{ fontSize: "2.5rem", marginBottom: "12px", color: "#1e293b" }}>Terms of Service</h1>
        <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "0.95rem" }}>
          Last Updated: December 8, 2025
        </p>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>1. Acceptance of Terms</h2>
          <p style={{ lineHeight: 1.7, color: "#475569" }}>
            By accessing or using TeachWise.AI (&ldquo;Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). 
            If you do not agree to these Terms, please do not use our Service. These Terms apply to all users, including 
            educators, students, and guests.
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>2. Description of Service</h2>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            TeachWise.AI is an AI-powered educational content generation platform that provides:
          </p>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px" }}>
            <li>AI-generated lesson plans and printable classroom resources</li>
            <li>Lesson plans aligned with various educational boards (CBSE, ICSE, IB, State Boards)</li>
            <li>Multiple-choice questions (MCQs) for assessments</li>
            <li>Concept maps and web pages for learning materials</li>
            <li>Content customized for grades 6-12 across multiple subjects</li>
          </ul>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>3. User Eligibility</h2>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            You must be at least 13 years old to use this Service. Users under 18 should use this Service with parental 
            or guardian supervision. By using this Service, you represent and warrant that:
          </p>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px", marginBottom: "16px" }}>
            <li>You are at least 13 years of age</li>
            <li>You have parental/guardian consent if under 18</li>
            <li>You have the legal capacity to enter into these Terms</li>
            <li>All information you provide is accurate and truthful</li>
            <li>You are not located in a country subject to comprehensive sanctions or export restrictions</li>
          </ul>
          
          <div style={{ padding: "16px", background: "#fee2e2", borderRadius: "8px", border: "2px solid #ef4444" }}>
            <p style={{ lineHeight: 1.7, color: "#991b1b", fontWeight: 600, marginBottom: "8px" }}>
              🌍 Regional Restrictions
            </p>
            <p style={{ lineHeight: 1.7, color: "#991b1b", margin: 0 }}>
              Due to applicable export control laws and economic sanctions, this Service is not available to users in 
              certain countries including but not limited to: North Korea, Iran, Syria, and regions under comprehensive 
              sanctions. We reserve the right to restrict access from additional locations as required by law.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>4. Account Registration</h2>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            To access certain features, you must register for an account:
          </p>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px" }}>
            <li>You must provide a valid email address</li>
            <li>You are responsible for maintaining the confidentiality of your account</li>
            <li>You are responsible for all activities that occur under your account</li>
            <li>You must notify us immediately of any unauthorized use</li>
            <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
          </ul>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>5. Credits and Usage</h2>
          
          <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "#475569", fontWeight: 600 }}>
            5.1 Credit System
          </h3>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            Our Service operates on a credit-based system:
          </p>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px", marginBottom: "16px" }}>
            <li>New users receive 100 initial credits upon registration</li>
            <li>Each content generation request costs 10 credits</li>
            <li>Credits are non-transferable and non-refundable</li>
            <li>Additional credits can be purchased through our billing system</li>
          </ul>

          <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "#475569", fontWeight: 600 }}>
            5.2 Rate Limiting
          </h3>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            To ensure fair usage and prevent abuse:
          </p>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px" }}>
            <li>Users are limited to 10 requests per minute</li>
            <li>Guest users have restricted access and lower quotas</li>
            <li>Excessive usage may result in temporary account suspension</li>
          </ul>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>6. AI-Generated Content Disclaimer</h2>
          <div style={{ background: "#fef3c7", padding: "20px", borderRadius: "8px", border: "2px solid #fbbf24", marginBottom: "12px" }}>
            <p style={{ lineHeight: 1.7, color: "#78350f", fontWeight: 600, marginBottom: "8px" }}>
              ⚠️ IMPORTANT: AI-Generated Content Notice
            </p>
            <p style={{ lineHeight: 1.7, color: "#78350f", margin: 0 }}>
              All content generated by TeachWise.AI is created using artificial intelligence (OpenAI GPT-4). 
              While we strive for accuracy, AI-generated content may contain errors, inaccuracies, or outdated information.
            </p>
          </div>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            By using this Service, you acknowledge and agree that:
          </p>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px" }}>
            <li><strong>Content Review Required:</strong> You must review and verify all AI-generated content before use</li>
            <li><strong>No Guarantee of Accuracy:</strong> We do not guarantee the accuracy, completeness, or reliability of generated content</li>
            <li><strong>Educational Tool Only:</strong> Content is intended as a teaching aid, not as definitive educational material</li>
            <li><strong>Teacher Responsibility:</strong> Educators are responsible for ensuring content accuracy and appropriateness</li>
            <li><strong>No Liability:</strong> We are not liable for any errors or consequences arising from using generated content</li>
          </ul>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>7. Intellectual Property Rights</h2>
          
          <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "#475569", fontWeight: 600 }}>
            7.1 Service IP
          </h3>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            The Service, including its design, code, algorithms, and branding, is owned by TeachWise.AI and protected by 
            intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of the Service.
          </p>

          <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "#475569", fontWeight: 600 }}>
            7.2 Generated Content
          </h3>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            Content generated through our Service:
          </p>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px" }}>
            <li>You retain ownership of content you generate using your credits</li>
            <li>You may use generated content for personal or educational purposes</li>
            <li>You may not sell or commercially redistribute generated content without permission</li>
            <li>We reserve the right to use anonymized data to improve our AI models</li>
          </ul>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>8. Prohibited Uses</h2>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            You agree not to use the Service for any unlawful purpose or in any way that:
          </p>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px" }}>
            <li>Violates any applicable laws or regulations</li>
            <li>Infringes on the rights of others</li>
            <li>Contains harmful, offensive, or inappropriate content</li>
            <li>Attempts to bypass authentication, rate limiting, or security measures</li>
            <li>Uses automated scripts or bots to abuse the Service</li>
            <li>Shares account credentials or credits with others</li>
            <li>Reverse engineers or attempts to extract our AI models</li>
            <li>Generates content for commercial resale without authorization</li>
            <li>Overloads or disrupts our servers or infrastructure</li>
          </ul>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>9. Privacy and Data Protection</h2>
          <p style={{ lineHeight: 1.7, color: "#475569" }}>
            Your use of the Service is also governed by our <Link href="/privacy" style={{ color: "#6366f1", fontWeight: 600 }}>Privacy Policy</Link>, 
            which explains how we collect, use, and protect your personal information. By using the Service, you consent to 
            our data practices as described in the Privacy Policy.
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>10. Payment and Billing</h2>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            If you purchase additional credits:
          </p>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px" }}>
            <li>All prices are in Indian Rupees (INR) or US Dollars (USD) as specified</li>
            <li>Payments are processed through secure third-party payment processors</li>
            <li>Credits are non-refundable once purchased</li>
            <li>We reserve the right to change pricing with 30 days notice</li>
            <li>Failed payments may result in service suspension</li>
          </ul>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>11. Service Availability</h2>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            We strive to provide reliable service, but:
          </p>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px" }}>
            <li>We do not guarantee uninterrupted or error-free service</li>
            <li>The Service may be temporarily unavailable for maintenance</li>
            <li>We may modify or discontinue features with notice</li>
            <li>Third-party dependencies (OpenAI, Supabase) may affect availability</li>
            <li>We are not liable for service interruptions or data loss</li>
          </ul>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>12. Limitation of Liability</h2>
          <div style={{ background: "#fee2e2", padding: "20px", borderRadius: "8px", border: "2px solid #ef4444", marginBottom: "12px" }}>
            <p style={{ lineHeight: 1.7, color: "#991b1b", fontWeight: 600, marginBottom: "8px" }}>
              IMPORTANT LEGAL NOTICE
            </p>
            <p style={{ lineHeight: 1.7, color: "#991b1b", margin: 0 }}>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, TEACHWISE.AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, 
              OR OTHER INTANGIBLE LOSSES ARISING FROM YOUR USE OF THE SERVICE.
            </p>
          </div>
          <p style={{ lineHeight: 1.7, color: "#475569" }}>
            Our total liability to you for any claims arising from these Terms or the Service shall not exceed the amount 
            you paid for credits in the last 12 months, or ₹1,000 (whichever is greater).
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>13. Indemnification</h2>
          <p style={{ lineHeight: 1.7, color: "#475569" }}>
            You agree to indemnify and hold harmless TeachWise.AI, its affiliates, and its employees from any claims, 
            damages, losses, or expenses (including legal fees) arising from: (a) your use of the Service; (b) your 
            violation of these Terms; (c) your use of generated content; or (d) your violation of any third-party rights.
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>14. Termination</h2>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            We reserve the right to suspend or terminate your account:
          </p>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px" }}>
            <li>For violation of these Terms</li>
            <li>For abusive or fraudulent behavior</li>
            <li>For non-payment of fees</li>
            <li>At our discretion with or without notice</li>
          </ul>
          <p style={{ lineHeight: 1.7, color: "#475569", marginTop: "12px" }}>
            You may terminate your account at any time by contacting support. Upon termination, unused credits will be forfeited.
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>15. Modifications to Terms</h2>
          <p style={{ lineHeight: 1.7, color: "#475569" }}>
            We reserve the right to modify these Terms at any time. We will notify users of material changes via email 
            or through the Service. Your continued use of the Service after changes constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>16. Governing Law and Jurisdiction</h2>
          <p style={{ lineHeight: 1.7, color: "#475569" }}>
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from 
            these Terms or the Service shall be subject to the exclusive jurisdiction of the courts in [Your City], India.
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>17. Severability</h2>
          <p style={{ lineHeight: 1.7, color: "#475569" }}>
            If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or 
            eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>18. Contact Information</h2>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            For questions about these Terms, please contact us:
          </p>
          <div style={{ background: "#f1f5f9", padding: "20px", borderRadius: "8px", lineHeight: 1.8 }}>
            <p style={{ margin: "0 0 8px 0" }}><strong>Legal Inquiries:</strong> <a href="mailto:legal@teachwiseai.mpaiapps.com" style={{ color: "#6366f1" }}>legal@teachwiseai.mpaiapps.com</a></p>
            <p style={{ margin: "0 0 8px 0" }}><strong>General Support:</strong> <a href="mailto:support@teachwiseai.mpaiapps.com" style={{ color: "#6366f1" }}>support@teachwiseai.mpaiapps.com</a></p>
            <p style={{ margin: 0 }}><strong>Website:</strong> <a href="https://teachwiseai.mpaiapps.com" style={{ color: "#6366f1" }}>teachwiseai.mpaiapps.com</a></p>
          </div>
        </section>

        <section style={{ 
          marginTop: "48px", 
          paddingTop: "24px", 
          borderTop: "2px solid #e2e8f0",
          background: "#fef3c7",
          padding: "20px",
          borderRadius: "8px",
        }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "12px", color: "#92400e" }}>
            🇮🇳 For Users in India (IT Rules 2021)
          </h3>
          <p style={{ lineHeight: 1.7, color: "#78350f", margin: 0 }}>
            <strong>Grievance Officer:</strong> For complaints or disputes, contact our Grievance Officer at 
            <a href="mailto:grievance@teachwiseai.mpaiapps.com" style={{ color: "#6366f1", fontWeight: 600 }}> grievance@teachwiseai.mpaiapps.com</a>. 
            We will acknowledge within 24 hours and resolve within 15 days as per IT Rules 2021.
          </p>
        </section>

        <div style={{ 
          marginTop: "32px", 
          padding: "16px", 
          background: "#f1f5f9", 
          borderRadius: "8px",
          textAlign: "center",
          fontSize: "0.875rem",
          color: "#64748b",
        }}>
          By clicking &ldquo;Sign In&rdquo; or using TeachWise.AI, you acknowledge that you have read, understood, 
          and agree to be bound by these Terms of Service and our Privacy Policy.
        </div>
      </div>
    </div>
  );
}
