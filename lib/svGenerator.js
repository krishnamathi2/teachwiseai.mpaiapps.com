/**
 * SVG Generator for TeachWiseAI
 * Simple, safe, CBSE-friendly diagrams
 */

export function generateTopicSpecificSvg(
  topic,
  diagramPrompt,
  subject,
  slideIndex,
  title,
  type
) {
  const safeTitle = title || topic || "Concept";
  const safeType = type ? type.replace(/_/g, " ") : "Concept";

  return `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="900"
  height="500"
  viewBox="0 0 900 500"
>

  <!-- Background -->
  <rect width="900" height="500" fill="#F8FAFC" />

  <!-- Title -->
  <text
    x="450"
    y="42"
    text-anchor="middle"
    font-size="28"
    font-family="Arial, Helvetica, sans-serif"
    fill="#1E293B"
    font-weight="bold"
  >
    ${escapeXml(safeTitle)}
  </text>

  <!-- Subtitle -->
  <text
    x="450"
    y="78"
    text-anchor="middle"
    font-size="16"
    font-family="Arial, Helvetica, sans-serif"
    fill="#475569"
  >
    ${escapeXml(diagramPrompt)}
  </text>

  <!-- Diagram box -->
  <rect
    x="120"
    y="120"
    width="660"
    height="260"
    rx="18"
    ry="18"
    fill="#E0F2FE"
    stroke="#38BDF8"
    stroke-width="2"
  />

  <!-- Center label -->
  <text
    x="450"
    y="260"
    text-anchor="middle"
    font-size="20"
    font-family="Arial, Helvetica, sans-serif"
    fill="#0369A1"
  >
    ${escapeXml(subject)} – ${escapeXml(safeType)}
  </text>

  <!-- Footer -->
  <text
    x="450"
    y="470"
    text-anchor="middle"
    font-size="12"
    font-family="Arial, Helvetica, sans-serif"
    fill="#64748B"
  >
    Slide ${slideIndex + 1}
  </text>

</svg>
`;
}

function escapeXml(text = "") {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
