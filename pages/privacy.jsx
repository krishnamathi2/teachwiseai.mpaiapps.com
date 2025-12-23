import { useRouter } from "next/router";

export default function PrivacyPolicy() {
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

        <h1 style={{ fontSize: "2.5rem", marginBottom: "12px", color: "#1e293b" }}>Privacy Policy</h1>
        <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "0.95rem" }}>
          Last Updated: December 8, 2025
        </p>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>1. Introduction</h2>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            Welcome to TeachWise.AI (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are committed to protecting your privacy and personal data. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
            educational content generation platform.
          </p>
          <p style={{ lineHeight: 1.7, color: "#475569" }}>
            By using TeachWise.AI, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>2. Information We Collect</h2>
          
          <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "#475569", fontWeight: 600 }}>
            2.1 Personal Information
          </h3>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px", marginBottom: "16px" }}>
            <li><strong>Email Address:</strong> Collected during registration for authentication via magic link</li>
            <li><strong>Account Credits:</strong> Information about your usage credits and account balance</li>
            <li><strong>Authentication Tokens:</strong> Session tokens from Supabase for secure authentication</li>
          </ul>

          <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "#475569", fontWeight: 600 }}>
            2.2 Usage Information
          </h3>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px", marginBottom: "16px" }}>
            <li><strong>Content Generation Requests:</strong> Topics, subjects, grades, and boards you select</li>
            <li><strong>API Usage:</strong> Number and type of content generations (lesson plans, MCQs, PDFs, etc.)</li>
            <li><strong>Guest Usage:</strong> IP addresses and usage patterns for rate limiting (guest mode only)</li>
          </ul>

          <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "#475569", fontWeight: 600 }}>
            2.3 Technical Information
          </h3>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px" }}>
            <li><strong>Browser Storage:</strong> Local storage and session storage data for authentication and preferences</li>
            <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers</li>
            <li><strong>Log Data:</strong> IP addresses, access times, and pages viewed</li>
          </ul>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>3. How We Use Your Information</h2>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            We use the collected information for the following purposes:
          </p>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px" }}>
            <li>To provide and maintain our AI-powered educational content generation services</li>
            <li>To authenticate users and manage account access</li>
            <li>To track and manage usage credits and prevent abuse</li>
            <li>To implement rate limiting and prevent unauthorized API usage</li>
            <li>To generate personalized educational content based on your selections</li>
            <li>To improve our services and develop new features</li>
            <li>To communicate with you about service updates and support</li>
            <li>To comply with legal obligations and enforce our Terms of Service</li>
          </ul>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>4. Data Storage and Security</h2>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            We implement industry-standard security measures to protect your personal information:
          </p>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px", marginBottom: "12px" }}>
            <li><strong>Encryption:</strong> All data transmission uses HTTPS encryption</li>
            <li><strong>Authentication:</strong> Secure JWT token-based authentication via Supabase</li>
            <li><strong>Local Storage:</strong> Certain data is stored locally in your browser for functionality</li>
            <li><strong>Access Controls:</strong> Rate limiting and authentication middleware protect API endpoints</li>
          </ul>
          <p style={{ lineHeight: 1.7, color: "#475569", background: "#fef3c7", padding: "12px", borderRadius: "8px", border: "1px solid #fbbf24" }}>
            ⚠️ <strong>Important:</strong> Some data (email, credits, session tokens) is stored in your browser&rsquo;s local storage. 
            Clearing your browser data will remove this information. Do not use public/shared computers for sensitive data.
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>5. Third-Party Services</h2>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            We use the following third-party services that may collect your information:
          </p>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px" }}>
            <li><strong>Supabase:</strong> Authentication and database services (privacy policy: <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#6366f1" }}>supabase.com/privacy</a>)</li>
            <li><strong>OpenAI:</strong> AI content generation via GPT-4 API (privacy policy: <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#6366f1" }}>openai.com/policies/privacy-policy</a>)</li>
            <li><strong>Vercel:</strong> Hosting and deployment services (privacy policy: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#6366f1" }}>vercel.com/legal/privacy-policy</a>)</li>
          </ul>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>6. Your Rights (GDPR & CCPA)</h2>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            You have the following rights regarding your personal data:
          </p>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px" }}>
            <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
            <li><strong>Right to Data Portability:</strong> Request your data in a machine-readable format</li>
            <li><strong>Right to Withdraw Consent:</strong> Opt-out of data collection at any time</li>
            <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
          </ul>
          <p style={{ lineHeight: 1.7, color: "#475569", marginTop: "12px" }}>
            To exercise these rights, contact us at: <a href="mailto:privacy@teachwiseai.mpaiapps.com" style={{ color: "#6366f1", fontWeight: 600 }}>privacy@teachwiseai.mpaiapps.com</a>
          </p>
          
          <div id="do-not-sell" style={{ marginTop: "24px", padding: "20px", background: "#fef3c7", borderRadius: "12px", border: "2px solid #fbbf24" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "#92400e", fontWeight: 600 }}>
              🇺🇸 California Residents (CCPA/CPRA)
            </h3>
            <p style={{ lineHeight: 1.7, color: "#78350f", marginBottom: "12px" }}>
              <strong>&ldquo;Do Not Sell My Personal Information&rdquo;</strong>
            </p>
            <p style={{ lineHeight: 1.7, color: "#78350f" }}>
              We do not sell your personal information to third parties. However, California residents have the right to 
              opt-out of any future sale of personal information. You also have the right to know what personal information 
              we collect, use, and disclose, and the right to request deletion of your personal information.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>7. Children&rsquo;s Privacy (COPPA)</h2>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            TeachWise.AI is intended for users aged 13 and above. We do not knowingly collect personal information from 
            children under 13 without parental consent. If we discover that a child under 13 has provided us with personal 
            information, we will delete it immediately.
          </p>
          <p style={{ lineHeight: 1.7, color: "#475569" }}>
            Parents or guardians who believe their child has provided personal information should contact us at: 
            <a href="mailto:support@teachwiseai.mpaiapps.com" style={{ color: "#6366f1", fontWeight: 600 }}> support@teachwiseai.mpaiapps.com</a>
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>8. Cookies and Tracking</h2>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            We use browser local storage and session storage (similar to cookies) to:
          </p>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px" }}>
            <li>Maintain your authentication session</li>
            <li>Remember your preferences and settings</li>
            <li>Track usage credits and quota</li>
            <li>Prevent abuse through rate limiting</li>
          </ul>
          <p style={{ lineHeight: 1.7, color: "#475569", marginTop: "12px" }}>
            You can clear this data by clearing your browser&rsquo;s local storage or using incognito/private browsing mode.
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>9. Data Retention</h2>
          <p style={{ lineHeight: 1.7, color: "#475569" }}>
            We retain your personal information only as long as necessary to provide our services and comply with legal obligations. 
            Session data stored in your browser is removed when you clear your browser data or log out. Account data is retained 
            until you request deletion.
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>10. International Data Transfers</h2>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            Your information may be transferred to and processed in countries other than your country of residence. 
            We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy 
            and applicable data protection laws.
          </p>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            <strong>Data Processing Locations:</strong>
          </p>
          <ul style={{ lineHeight: 1.8, color: "#475569", marginLeft: "24px", marginBottom: "12px" }}>
            <li>Vercel (Hosting): United States and global edge locations</li>
            <li>Supabase (Database): Depends on configuration, uses AWS regions</li>
            <li>OpenAI (AI Processing): United States</li>
          </ul>
          <p style={{ lineHeight: 1.7, color: "#475569" }}>
            For EU users, we rely on Standard Contractual Clauses (SCCs) and adequacy decisions where applicable to 
            ensure GDPR compliance for international transfers.
          </p>
          <div style={{ marginTop: "16px", padding: "16px", background: "#fee2e2", borderRadius: "8px", border: "1px solid #ef4444" }}>
            <p style={{ lineHeight: 1.7, color: "#991b1b", margin: 0 }}>
              <strong>⚠️ Service Restrictions:</strong> Due to export control regulations and sanctions, our service may not be 
              available in certain countries including North Korea, Iran, Syria, and regions subject to comprehensive sanctions.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>11. Changes to This Policy</h2>
          <p style={{ lineHeight: 1.7, color: "#475569" }}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the &ldquo;Last Updated&rdquo; date. You are advised to review this Privacy 
            Policy periodically for any changes.
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#334155" }}>12. Contact Us</h2>
          <p style={{ lineHeight: 1.7, color: "#475569", marginBottom: "12px" }}>
            If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
          </p>
          <div style={{ background: "#f1f5f9", padding: "20px", borderRadius: "8px", lineHeight: 1.8 }}>
            <p style={{ margin: "0 0 8px 0" }}><strong>Email:</strong> <a href="mailto:privacy@teachwiseai.mpaiapps.com" style={{ color: "#6366f1" }}>privacy@teachwiseai.mpaiapps.com</a></p>
            <p style={{ margin: "0 0 8px 0" }}><strong>Support:</strong> <a href="mailto:support@teachwiseai.mpaiapps.com" style={{ color: "#6366f1" }}>support@teachwiseai.mpaiapps.com</a></p>
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
            <strong>Grievance Officer:</strong> For complaints or concerns related to content or data privacy, 
            contact our Grievance Officer at <a href="mailto:grievance@teachwiseai.mpaiapps.com" style={{ color: "#6366f1", fontWeight: 600 }}>grievance@teachwiseai.mpaiapps.com</a>. 
            We will acknowledge your complaint within 24 hours and resolve it within 15 days.
          </p>
        </section>
      </div>
    </div>
  );
}
