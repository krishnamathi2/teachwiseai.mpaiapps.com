import OpenAI from "openai";

let cachedClient = null;

const getClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  if (!cachedClient) {
    cachedClient = new OpenAI({ apiKey });
  }
  return cachedClient;
};

/**
 * Generate an image using GPT-4o (DALL-E 3)
 * @param {string} prompt - The image generation prompt
 * @returns {Promise<string>} Base64 encoded image
 */
export async function generateGPT4oImage(prompt) {
  try {
    const client = getClient();
    
    const response = await client.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "b64_json"
    });
    
    if (response.data && response.data.length > 0 && response.data[0].b64_json) {
      return response.data[0].b64_json;
    }
    
    throw new Error('No image data returned from GPT-4o');
  } catch (error) {
    console.error('GPT-4o image generation error:', error);
    throw new Error(`Failed to generate GPT-4o image: ${error.message}`);
  }
}

/**
 * Generate Physics-specific DALL-E prompt based on slide index
 * @param {string} topic - The Physics topic
 * @param {string} slideTitle - The slide title
 * @param {number} slideIndex - The slide number (0-based)
 * @returns {string} Specialized prompt for Physics diagrams
 */
function buildPhysicsPrompt(topic, slideTitle, slideIndex) {
  const slideType = slideIndex % 6; // 6-slide template cycle
  
  switch(slideType) {
    case 0: // Title Hook - 3 connected icons
      return `Educational Physics diagram showing 3 connected icons illustrating ${topic} progression: resting object → accelerating object → final state. Clean scientific illustration with arrows connecting the stages, labeled clearly. CBSE Grade 12 Physics style.`;
    
    case 1: // Core Concept - Equation pyramid
      return `Physics concept diagram for ${topic} showing equation hierarchy and relationships. Display key formulas in pyramid or flowchart format with clear connections. Include mathematical notation, arrows showing relationships, clean scientific style. Labels for all variables.`;
    
    case 2: // Law/Principle 1 - Before/after states
      return `Physics diagram showing before and after states for ${slideTitle}. Split view with initial equilibrium state on left and force-applied state on right. Include force vectors (red arrows), labeled clearly. Clean technical illustration style.`;
    
    case 3: // Law/Principle 2 - Vector diagram
      return `Vector diagram for ${slideTitle} showing force (F), mass (m), and acceleration (a) with labeled arrows. Include equation triangle, color-coded vectors (force=red, motion=blue), and proper units (N, kg, m/s²). Scientific illustration style.`;
    
    case 4: // Law/Principle 3 - Paired forces
      return `Physics diagram showing action-reaction pairs for ${slideTitle}. Two objects with equal and opposite force arrows between them, clearly labeled with magnitudes. Color-coded arrows, professional scientific illustration.`;
    
    case 5: // Real-World Applications - Split scenes
      return `Real-world applications of ${topic} showing 3 split scenes: practical example with labeled forces, acceleration graph, and another application. Clean technical illustration with annotations, units, and clear labels. CBSE Grade 12 level.`;
    
    default:
      return `Professional Physics educational diagram for ${slideTitle} related to ${topic}. Include labeled vectors, equations, units, and clear scientific illustrations suitable for CBSE Grade 12.`;
  }
}

/**
 * Generate an educational slide image using GPT-4o
 * @param {string} topic - The slide topic (e.g., "chloroplast", "photosynthesis")
 * @param {string} subject - The subject (e.g., "Chemistry", "Biology", "Physics")
 * @param {string} slideTitle - Specific slide title for variation
 * @param {number} slideIndex - The slide index (0-based) for template-based generation
 * @returns {Promise<string>} Base64 encoded image
 */
export async function generateSlideImageGPT4o(topic, subject, slideTitle = '', slideIndex = 0) {
  let prompt;
  
  // Use specialized Physics template for Physics subjects
  if (subject.toLowerCase().includes('physics')) {
    prompt = buildPhysicsPrompt(topic, slideTitle || topic, slideIndex);
  } else {
    // Default prompt for other subjects
    const focusTerm = slideTitle || topic;
    prompt = `Create a professional educational diagram for ${subject} showing ${focusTerm}. The image should be clear, colorful, well-labeled, and suitable for a classroom presentation. Style: scientific illustration, clean design, educational focus.`;
  }
  
  console.log('Generating GPT-4o image with prompt:', prompt);
  return generateGPT4oImage(prompt);
}
