import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-flash-latest';
const GEMINI_TIMEOUT_MS = 60000;

let genAI = null;
let model = null;

const verbose = process.env.VERBOSE === '1';
const log = (...args) => verbose && console.log(...args);

function initializeGemini() {
  if (!GEMINI_API_KEY) {
    console.warn('[gemini-client] No GEMINI_API_KEY environment variable found');
    return false;
  }

  try {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    log(`[gemini-client] Initialized with model: ${GEMINI_MODEL}`);
    return true;
  } catch (error) {
    console.error('[gemini-client] Failed to initialize:', error.message);
    return false;
  }
}

async function generateSummary(moduleTitle, enhancements, fixes) {
  if (!model) {
    const initialized = initializeGemini();
    if (!initialized) {
      return null;
    }
  }

  try {
    const prompt = buildPrompt(moduleTitle, enhancements, fixes);

    const result = await Promise.race([
      model.generateContent(prompt),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), GEMINI_TIMEOUT_MS)),
    ]);

    const response = await result.response;
    const text = response.text();

    const parsed = parseGeminiResponse(text);

    if (!parsed) {
      console.warn(`[gemini-client] Failed to parse response for ${moduleTitle}`);
      return null;
    }

    if (parsed.categories) {
      const totalItems = parsed.categories.reduce((sum, cat) => sum + cat.items.length, 0);
      log(
        `[gemini-client] Generated summary for ${moduleTitle} (${parsed.categories.length} categories, ${totalItems} items)`,
      );
    } else {
      log(`[gemini-client] Generated summary for ${moduleTitle}`);
    }
    return parsed;
  } catch (error) {
    if (error.message === 'Timeout') {
      console.warn(`[gemini-client] Timeout generating summary for ${moduleTitle}`);
    } else {
      console.error(`[gemini-client] Error generating summary for ${moduleTitle}:`, error.message);
    }
    return null;
  }
}

function buildPrompt(moduleTitle, enhancements, fixes) {
  return `You are an AI assistant helping to summarize software release notes for the Harness platform module: "${moduleTitle}".

I will provide you with a list of enhancements and fixes. Your task is to:
1. Analyze all items (both enhancements and fixes) and categorize them semantically
2. Create 3-7 categories based on the nature of changes (e.g., Security, Performance, UI/UX, API, etc.)
3. Group related items together regardless of whether they are enhancements or fixes
4. Rewrite each item to be clear, concise, and user-focused
5. Remove technical jargon, ticket IDs, version numbers, and internal references
6. Remove empty brackets [] or parentheses ()
7. Keep categories scannable with 2-8 items each
8. Name categories based on user concerns (what users care about), not technical implementation details

ENHANCEMENTS:
${enhancements.map((item, i) => `${i + 1}. ${item}`).join('\n')}

FIXES:
${fixes.map((item, i) => `${i + 1}. ${item}`).join('\n')}

Please respond with ONLY a JSON object in this exact format:
{
  "categories": [
    {
      "name": "Security & Dependencies",
      "items": [
        "Clear and concise description of a security-related change.",
        "Another security or dependency update."
      ]
    },
    {
      "name": "User Management & Access",
      "items": [
        "Clear description of a user management improvement.",
        "Another access control enhancement or fix."
      ]
    }
  ]
}

Guidelines for category names:
- Use clear, user-friendly language (avoid jargon)
- Focus on user-facing areas (Security, Performance, UI, APIs, Deployment, etc.)
- Keep names concise (2-5 words)
- Common category patterns: "X & Y", "X Improvements", "X Updates", "X Fixes"

Do not include any explanation or markdown formatting, just the raw JSON object.`;
}

function parseGeminiResponse(text) {
  try {
    let cleaned = text.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/```\n?/, '').replace(/\n?```$/, '');
    }

    const parsed = JSON.parse(cleaned);

    if (parsed.categories && Array.isArray(parsed.categories)) {
      // Validate categories structure
      const validCategories = parsed.categories.filter((cat) => {
        return (
          cat.name &&
          typeof cat.name === 'string' &&
          Array.isArray(cat.items) &&
          cat.items.length > 0
        );
      });

      if (validCategories.length === 0) {
        console.warn('[gemini-client] No valid categories in response');
        return null;
      }

      // Clean up items
      const cleanItem = (item) => {
        if (typeof item !== 'string') return '';
        let cleaned = item.replace(/\s*\[\]\s*/g, ' ').replace(/\s*\(\)\s*/g, ' ');
        cleaned = cleaned.replace(/\s+/g, ' ').trim();
        return cleaned;
      };

      return {
        categories: validCategories
          .map((cat) => ({
            name: cat.name.trim(),
            items: cat.items.map(cleanItem).filter((item) => item.length > 0),
          }))
          .filter((cat) => cat.items.length > 0), // Remove empty categories
      };
    }

    // Fallback: Check for old format (backwards compatibility during transition)
    if (parsed.enhancements && parsed.fixes) {
      console.warn('[gemini-client] Received old format, converting to categories');
      return convertLegacyFormat(parsed);
    }

    console.warn('[gemini-client] Response missing required fields');
    return null;
  } catch (error) {
    console.error('[gemini-client] Failed to parse JSON:', error.message);
    return null;
  }
}

// Helper function for backwards compatibility
function convertLegacyFormat(legacyData) {
  const cleanItem = (item) => {
    if (typeof item !== 'string') return '';
    let cleaned = item.replace(/\s*\[\]\s*/g, ' ').replace(/\s*\(\)\s*/g, ' ');
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    return cleaned;
  };

  const categories = [];

  if (legacyData.enhancements?.length > 0) {
    const cleanedEnhancements = legacyData.enhancements
      .map(cleanItem)
      .filter((item) => item.length > 0);
    if (cleanedEnhancements.length > 0) {
      categories.push({
        name: 'New Features & Enhancements',
        items: cleanedEnhancements,
      });
    }
  }

  if (legacyData.fixes?.length > 0) {
    const cleanedFixes = legacyData.fixes.map(cleanItem).filter((item) => item.length > 0);
    if (cleanedFixes.length > 0) {
      categories.push({
        name: 'Fixes',
        items: cleanedFixes,
      });
    }
  }

  return { categories };
}

function isAvailable() {
  return !!GEMINI_API_KEY;
}

export { generateSummary, isAvailable, initializeGemini };
