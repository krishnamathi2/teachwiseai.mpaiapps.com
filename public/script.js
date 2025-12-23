document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("generateDeck").addEventListener("click", generateDeck);
});

async function generateDeck() {
  const payload = {
    subject: document.getElementById("subject").value,
    grade: document.getElementById("grade").value,
    topic: document.getElementById("topic").value,
    slideCount: Number(document.getElementById("slideCount").value),
    imageCount: Number(document.getElementById("imageCount").value),
    useImages: document.getElementById("useImages").checked
  };

  const res = await fetch("/api/generate-deck", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  renderSlides(data.slides);
}

function renderSlides(slides) {
  const container = document.getElementById("slidesContainer");
  container.innerHTML = "";

  slides.forEach((slide, index) => {
    const div = document.createElement("div");
    div.className = "slide-preview";
    div.innerHTML = `
      <h3>Slide ${index + 1}</h3>
      <strong>${slide.title}</strong>
      <p>${slide.content}</p>
      ${slide.image ? `<img src="${slide.image}" />` : ""}
    `;
    container.appendChild(div);
  });
}
