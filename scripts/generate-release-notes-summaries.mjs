import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { loadCategoryMapping } from './utils/category-mapper.mjs';
import { parseReleaseNotes } from './utils/markdown-parser.mjs';
import { generateSummary, isAvailable as isGeminiAvailable } from './utils/gemini-client.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RELEASE_NOTES_DIR = path.join(__dirname, '../release-notes');
const SIDEBAR_PATH = path.join(__dirname, '../sidebars-release-notes.ts');
const OUTPUT_DIR = path.join(__dirname, '../release-notes/generated');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'ai-summaries.json');
const DAYS_BACK = parseInt(process.env.AI_SUMMARY_DAYS || '30', 10);

const ROOT_DIR = path.join(__dirname, '..');

/** If the file is recent but the parser found no bullets, still surface the module on /release-notes. */
function stubEnhancementIfRecentFile(parsedData, daysBack) {
  if (
    (parsedData.enhancements && parsedData.enhancements.length > 0) ||
    (parsedData.fixes && parsedData.fixes.length > 0)
  ) {
    return null;
  }
  if (!parsedData?.lastUpdated) return null;
  const d = new Date(`${parsedData.lastUpdated}T12:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  const threshold = new Date();
  threshold.setDate(threshold.getDate() - daysBack * 2);
  if (d < threshold) return null;
  return `Updates for this period are documented on the ${parsedData.title} page.`;
}

// Check for --skip-if-exists flag
const skipIfExists = process.argv.includes('--skip-if-exists');

// Skip if output file exists and flag is set
if (skipIfExists && fs.existsSync(OUTPUT_FILE)) {
  console.log('[rn-summaries] Output file exists, skipping generation...');
  process.exit(0);
}

function getGitLastUpdated(filePath) {
  try {
    const output = execSync(`git log --format="%aI" -1 -- "${filePath}"`, {
      cwd: ROOT_DIR,
      encoding: 'utf-8',
      timeout: 30000,
    }).trim();
    if (output) {
      const date = new Date(output);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  } catch {
    // ignore git errors
  }
  return null;
}

function createFallbackCategories(enhancements, fixes) {
  const categories = [];

  if (enhancements && enhancements.length > 0) {
    categories.push({
      name: 'New Features & Enhancements',
      items: enhancements,
    });
  }

  if (fixes && fixes.length > 0) {
    categories.push({
      name: 'Fixes',
      items: fixes,
    });
  }

  return { categories };
}

async function main() {
  try {
    console.log('[rn-summaries] Loading category mapping from sidebar...');
    const categoryMapping = loadCategoryMapping(SIDEBAR_PATH);

    if (!categoryMapping || !categoryMapping.categories) {
      console.warn('[rn-summaries] No categories found, exiting');
      process.exit(0);
    }

    const useGemini = isGeminiAvailable();
    if (useGemini) {
      console.log('[rn-summaries] Gemini API is available, will use AI summarization');
    } else {
      console.log('[rn-summaries] Gemini API not available, will use fallback parser');
    }

    const summariesData = {
      generated_at: new Date().toISOString(),
      generation_method: useGemini ? 'gemini-api' : 'fallback-parser',
      days_included: DAYS_BACK,
      categories: [],
    };

    let totalModulesProcessed = 0;
    let totalModulesWithContent = 0;
    let totalGeminiSuccess = 0;
    let totalGeminiFallback = 0;

    // Parse all modules and collect tasks for Gemini
    const geminiTasks = [];
    const moduleEntries = []; // { categoryName, module, parsedData, markdownPath }

    for (const category of categoryMapping.categories) {
      console.log(`[rn-summaries] Processing category: ${category.name}`);

      for (const module of category.modules) {
        totalModulesProcessed++;

        const markdownPath = path.join(RELEASE_NOTES_DIR, `${module.id}.md`);

        if (!fs.existsSync(markdownPath)) {
          console.warn(`[rn-summaries]   - ${module.id}: file not found, skipping`);
          continue;
        }

        console.log(`[rn-summaries]   - ${module.id}: parsing...`);
        let parsedData = parseReleaseNotes(markdownPath, DAYS_BACK);

        if (!parsedData) {
          console.warn(`[rn-summaries]   - ${module.id}: parsing failed, skipping`);
          continue;
        }

        if (
          (!parsedData.enhancements || parsedData.enhancements.length === 0) &&
          (!parsedData.fixes || parsedData.fixes.length === 0)
        ) {
          const stub = stubEnhancementIfRecentFile(parsedData, DAYS_BACK);
          if (stub) {
            parsedData = { ...parsedData, enhancements: [stub] };
            console.log(`[rn-summaries]   - ${module.id}: using frontmatter stub for landing list`);
          } else {
            console.log(`[rn-summaries]   - ${module.id}: no recent content`);
            continue;
          }
        }

        const entry = { categoryName: category.name, module, parsedData, markdownPath };
        moduleEntries.push(entry);

        if (useGemini && (parsedData.enhancements?.length > 0 || parsedData.fixes?.length > 0)) {
          console.log(`[rn-summaries]   - ${module.id}: queued for AI categorization`);
          geminiTasks.push({
            entry,
            promise: generateSummary(
              module.title,
              parsedData.enhancements || [],
              parsedData.fixes || [],
            ),
          });
        }
      }
    }

    //  Await all Gemini API calls in parallel
    const geminiResults = new Map();
    if (geminiTasks.length > 0) {
      console.log(
        `[rn-summaries] Calling Gemini API for ${geminiTasks.length} modules in parallel...`,
      );
      const results = await Promise.allSettled(geminiTasks.map((t) => t.promise));
      for (let i = 0; i < geminiTasks.length; i++) {
        const { entry } = geminiTasks[i];
        const result = results[i];
        if (result.status === 'fulfilled') {
          geminiResults.set(entry.module.id, result.value);
        } else {
          console.warn(
            `[rn-summaries]   - ${entry.module.id}: Gemini call rejected: ${result.reason?.message || result.reason}`,
          );
          geminiResults.set(entry.module.id, null);
        }
      }
    }

    // Assemble results into category structure
    const categoryDataMap = new Map();

    for (const entry of moduleEntries) {
      const { categoryName, module, parsedData, markdownPath } = entry;
      let finalData = null;

      if (useGemini && geminiResults.has(module.id)) {
        const aiSummary = geminiResults.get(module.id);
        if (aiSummary && aiSummary.categories) {
          finalData = { categories: aiSummary.categories };
          totalGeminiSuccess++;
          console.log(
            `[rn-summaries]   - ${module.id}: AI categorization successful (${aiSummary.categories.length} categories)`,
          );
        } else {
          totalGeminiFallback++;
          console.log(`[rn-summaries]   - ${module.id}: AI failed, using fallback categorization`);
          finalData = createFallbackCategories(
            parsedData.enhancements || [],
            parsedData.fixes || [],
          );
        }
      } else {
        finalData = createFallbackCategories(parsedData.enhancements || [], parsedData.fixes || []);
      }

      if (!finalData || !finalData.categories || finalData.categories.length === 0) {
        console.log(`[rn-summaries]   - ${module.id}: no categorized content`);
        continue;
      }

      totalModulesWithContent++;
      const gitDate = getGitLastUpdated(markdownPath);

      if (!categoryDataMap.has(categoryName)) {
        categoryDataMap.set(categoryName, { name: categoryName, modules: [] });
      }
      categoryDataMap.get(categoryName).modules.push({
        id: module.id,
        title: module.title,
        last_updated: gitDate || parsedData.lastUpdated || 'N/A',
        link: module.link,
        categories: finalData.categories,
      });

      const totalItems = finalData.categories.reduce((sum, cat) => sum + cat.items.length, 0);
      console.log(
        `[rn-summaries]   - ${module.id}: ${finalData.categories.length} categories, ${totalItems} total items`,
      );
    }

    // Preserve original category ordering from sidebar
    for (const category of categoryMapping.categories) {
      const categoryData = categoryDataMap.get(category.name);
      if (categoryData && categoryData.modules.length > 0) {
        summariesData.categories.push(categoryData);
      }
    }

    fs.ensureDirSync(OUTPUT_DIR);

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(summariesData, null, 2));

    console.log(`[rn-summaries] ✓ Successfully generated summaries:`);
    console.log(`[rn-summaries]   - Method: ${summariesData.generation_method}`);
    console.log(`[rn-summaries]   - Processed: ${totalModulesProcessed} modules`);
    console.log(`[rn-summaries]   - With content: ${totalModulesWithContent} modules`);
    if (useGemini) {
      console.log(`[rn-summaries]   - AI success: ${totalGeminiSuccess} modules`);
      console.log(`[rn-summaries]   - AI fallback: ${totalGeminiFallback} modules`);
    }
    console.log(`[rn-summaries]   - Categories: ${summariesData.categories.length}`);
    console.log(`[rn-summaries]   - Output: ${OUTPUT_FILE}`);

    process.exit(0);
  } catch (error) {
    console.error('[rn-summaries] Error generating summaries:', error.message);
    console.error('[rn-summaries] Stack trace:', error.stack);

    console.warn('[rn-summaries] Exiting with success code (build will continue)');
    process.exit(0);
  }
}

main();
