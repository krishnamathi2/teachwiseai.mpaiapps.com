export async function generateSlides({
  subject,
  grade,
  topic,
  slideCount,
  imageCount,
  useImages
}) {
  const slides = [];

  for (let index = 0; index < slideCount; index++) {
    slides.push({
      title: `${topic} – Slide ${index + 1}`,
      content: `This slide explains ${topic} for Grade ${grade} ${subject}.`,
      image: useImages
        ? `https://via.placeholder.com/600x400?text=Slide+${index + 1}`
        : null
    });
  }

  return { slides };
}
