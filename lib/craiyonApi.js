/**
 * Craiyon API integration for AI image generation
 */

export async function generateCraiyonImage(prompt) {
  try {
    const response = await fetch('https://api.craiyon.com/v3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    
    if (!response.ok) {
      throw new Error(`Craiyon API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Return the first generated image (base64 encoded)
    if (data.images && data.images.length > 0) {
      return data.images[0];
    }
    
    throw new Error('No images returned from Craiyon API');
  } catch (error) {
    console.error('Craiyon API error:', error);
    throw new Error(`Failed to generate Craiyon image: ${error.message}`);
  }
}

/**
 * Generate an image for a presentation slide using Craiyon
 * @param {string} topic - The slide topic (e.g., "chloroplast", "photosynthesis")
 * @param {string} subject - The subject (e.g., "Chemistry", "Biology")
 * @param {string} slideTitle - Specific slide title for variation
 * @returns {Promise<string>} Base64 encoded image
 */
export async function generateSlideImage(topic, subject, slideTitle = '') {
  // Create focused prompt similar to: "CBSE biology chloroplast"
  // Use slideTitle for variation if provided, otherwise use main topic
  const focusTerm = slideTitle || topic;
  const prompt = `CBSE ${subject.toLowerCase()} ${focusTerm}`;
  
  console.log('Generating Craiyon image with prompt:', prompt);
  return generateCraiyonImage(prompt);
}
