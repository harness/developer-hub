import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';

function parseReleaseNotes(filePath, daysBack = 30) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`[markdown-parser] File not found: ${filePath}`);
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content: markdownContent } = matter(content);

    const lastUpdated = frontmatter.date ? new Date(frontmatter.date) : null;

    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - daysBack * 2);

    const fileThreshold = new Date();
    fileThreshold.setDate(fileThreshold.getDate() - daysBack);
    const fileIsRecent = lastUpdated && lastUpdated >= fileThreshold;

    const sections = extractSections(markdownContent, dateThreshold, fileIsRecent);

    // Use the most recent content date if available, otherwise fall back to frontmatter date
    const finalLastUpdated = sections.mostRecentDate || lastUpdated;

    // Format date properly using local date components to avoid timezone issues
    let formattedDate = null;
    if (finalLastUpdated) {
      const year = finalLastUpdated.getFullYear();
      const month = String(finalLastUpdated.getMonth() + 1).padStart(2, '0');
      const day = String(finalLastUpdated.getDate()).padStart(2, '0');
      formattedDate = `${year}-${month}-${day}`;
    }

    return {
      title: frontmatter.title || path.basename(filePath, '.md'),
      lastUpdated: formattedDate,
      enhancements: sections.enhancements || [],
      fixes: sections.fixes || [],
    };
  } catch (error) {
    console.error(`[markdown-parser] Error parsing ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Map ### / #### headings under a month to enhancements vs fixes (landing-page summarizer).
 * Keeps list-only extraction simple: bullet lines under these headings are collected.
 */
function classifySubsectionHeading(rawHeading) {
  const heading = rawHeading.replace(/^[\s⚠️✅❗]+/u, '').trim();
  const h = heading.toLowerCase();
  if (!h) return null;

  if (
    h.includes('bug fix') ||
    h.includes('fixed issues') ||
    /^fixes(\s|$|&)/.test(h)
  ) {
    return 'fixes';
  }

  if (
    h.includes('new feature') ||
    h.includes('enhancement') ||
    h.includes('feature improvement') ||
    h.includes('deprecation') ||
    h.includes('breaking')
  ) {
    return 'enhancements';
  }

  return null;
}

function extractSections(content, dateThreshold, fileIsRecent = true) {
  const enhancements = [];
  const fixes = [];

  const lines = content.split('\n');

  let currentDateSection = null;
  let currentSubsection = null;
  let isInRecentSection = fileIsRecent;
  let mostRecentDate = null;

  let sectionCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (
      line.match(
        /^##\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}/,
      )
    ) {
      const dateMatch = line.match(/##\s+(\w+)\s+(\d{4})/);
      if (dateMatch) {
        const monthStr = dateMatch[1];
        const year = parseInt(dateMatch[2]);
        const month = getMonthNumber(monthStr);
        currentDateSection = new Date(year, month, 1);
        sectionCount++;
        currentSubsection = null;

        if (fileIsRecent && sectionCount <= 2) {
          isInRecentSection = true;
        } else {
          isInRecentSection = currentDateSection >= dateThreshold;
        }
      }
    }

    if (!isInRecentSection) continue;

    const headingMatch = line.match(/^#{3,4}\s+(.+)/);
    if (headingMatch) {
      const subsection = classifySubsectionHeading(headingMatch[1]);
      if (subsection) {
        currentSubsection = subsection;
      }
      continue;
    }

    if (line.match(/^[-*]\s+/) && currentSubsection) {
      const raw = line.replace(/^[-*]\s+/, '');
      const bullet = cleanBullet(raw);

      if (bullet && bullet.length > 10) {
        if (currentDateSection && (!mostRecentDate || currentDateSection > mostRecentDate)) {
          mostRecentDate = currentDateSection;
        }

        if (currentSubsection === 'enhancements') {
          enhancements.push(bullet);
        } else if (currentSubsection === 'fixes') {
          fixes.push(bullet);
        }
      }
    }
  }

  return {
    enhancements: enhancements.slice(0, 10),
    fixes: fixes.slice(0, 10),
    mostRecentDate: mostRecentDate,
  };
}

function cleanBullet(text) {
  let cleaned = text;

  // Remove ticket IDs with various formats
  cleaned = cleaned.replace(/\s*\(\*\*[A-Z]+-\d+\*\*(?:,\s*\*\*[A-Z]+-\d+\*\*)*\)/g, '');
  cleaned = cleaned.replace(/\s*\([A-Z]+-\d+(?:,\s*[A-Z]+-\d+)*\)/g, '');
  cleaned = cleaned.replace(/\s*\*\*[A-Z]+-\d+\*\*/g, '');
  cleaned = cleaned.replace(/\s*[A-Z]+-\d+/g, '');

  // Remove ZD references
  cleaned = cleaned.replace(/\s*,?\s*\*\*ZD-\d+\*\*/g, '');
  cleaned = cleaned.replace(/\s*,?\s*ZD-\d+/g, '');

  // Remove markdown bold/italic
  cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, '$1');
  cleaned = cleaned.replace(/\*(.*?)\*/g, '$1');

  // Remove code backticks
  cleaned = cleaned.replace(/`(.*?)`/g, '$1');

  // Remove empty brackets and parentheses (leftover from ticket ID removal)
  cleaned = cleaned.replace(/\s*\[\]\s*/g, ' ');
  cleaned = cleaned.replace(/\s*\(\)\s*/g, ' ');
  cleaned = cleaned.replace(/\s*\[\s*\]\s*/g, ' ');
  cleaned = cleaned.replace(/\s*\(\s*\)\s*/g, ' ');

  // Clean up extra spaces and punctuation
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  cleaned = cleaned.replace(/\s*,\s*$/, ''); // Remove trailing commas
  cleaned = cleaned.replace(/\s*\.\s*$/, '');

  if (cleaned.length > 0 && !cleaned.match(/[.!?…]$/)) {
    cleaned += '.';
  }

  return cleaned;
}

function getMonthNumber(monthName) {
  const months = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
  };
  return months[monthName.toLowerCase()] || 0;
}

export { parseReleaseNotes, extractSections, cleanBullet };
