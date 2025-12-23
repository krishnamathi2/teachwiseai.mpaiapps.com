// public/script.js
document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generateDeck");

  if (!generateBtn) {
    console.error("Generate button not found");
    return;
  }

  generateBtn.addEventListener("click", async () => {
    try {
      // Read form values
      const subject = document.getElementById("subject")?.value;
      const grade = document.getElementById("grade")?.value;
      const topic = document.getElementById("topic")?.value;
      const slideCount = parseInt(document.getElementById("slideCount")?.value || 8);
      const imageCount = parseInt(document.getElementById("imageCount")?.value || 8);
      const useImages = document.getElementById("useImages")?.checked;

      if (!topic) {
        alert("Please enter a topic");
        return;
      }

      // Payload
      const payload = {
        subject,
        grade,
        topic,
        slideCount,
        imageCount,
        useImages
      };

      console.log("Sending payload:", payload);

      // Call backend
      const response = await fetch("/api/generate-deck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed to generate deck");
      }

      const data = await response.json();
      console.log("Response received:", data);

      // Render slides safely
      renderSlides(data.slides || []);
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    }
  });
});

/**
 * Renders slide previews safely
 * FIXES: index is properly defined
 */
function renderSlides(slides) {
  const container = document.getElementById("slidesContainer");
  if (!container) return;

  container.innerHTML = "";

  slides.forEach((slide, index) => {
    const slideDiv = document.createElement("div");
    slideDiv.className = "slide-preview";

    slideDiv.innerHTML = `
      <h3>Slide ${index + 1}: ${slide.title || ""}</h3>
      <p>${slide.content || ""}</p>
      ${
        slide.image
          ? `<img src="${slide.image}" alt="Slide Image ${index + 1}" />`
          : ""
      }
    `;

    container.appendChild(slideDiv);
  });
}
