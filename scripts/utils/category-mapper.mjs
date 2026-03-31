import fs from 'fs-extra';

const MODULE_NAMES = {
  platform: 'Platform',
  delegate: 'Delegate',
  'delegate-v2': 'Delegate (Closed Beta)',
  'self-managed-enterprise-edition': 'Self-Managed Enterprise Edition',
  'harness-solutions-factory': 'Harness Solutions Factory',
  'continuous-delivery': 'Continuous Delivery & GitOps',
  'continuous-integration': 'Continuous Integration',
  'internal-developer-portal': 'Internal Developer Portal',
  'infrastructure-as-code-management': 'Infrastructure as Code Management',
  'database-devops': 'Database DevOps',
  'artifact-registry': 'Artifact Registry',
  'feature-management-experimentation': 'Feature Management & Experimentation',
  'feature-flags': 'Feature Flags',
  'chaos-engineering': 'Chaos Engineering',
  'ai-test-automation': 'AI Test Automation',
  'ai-sre': 'AI SRE',
  'security-testing-orchestration': 'Security Testing Orchestration',
  'software-supply-chain-assurance': 'Supply Chain Security',
  'sast-and-sca': 'SAST and SCA',
  'cloud-cost-management': 'Cloud Cost Management',
  'software-engineering-insights': 'Software Engineering Insights',
  'service-reliability-management': 'Service Reliability Management',
  'code-repository': 'Code Repository',
  'continuous-error-tracking': 'Continuous Error Tracking',
  'cloud-development-environments': 'Cloud Development Environments',
};

function loadCategoryMapping(sidebarPath) {
  try {
    if (!fs.existsSync(sidebarPath)) {
      console.warn(`[category-mapper] Sidebar file not found: ${sidebarPath}`);
      return getDefaultCategoryMapping();
    }

    const content = fs.readFileSync(sidebarPath, 'utf-8');
    return parseSidebarContent(content);
  } catch (error) {
    console.error(`[category-mapper] Error loading sidebar:`, error.message);
    return getDefaultCategoryMapping();
  }
}

function parseSidebarContent(content) {
  const categories = [];
  let currentCategory = {
    name: 'Platform Release Notes',
    modules: [],
  };

  const itemsMatch = content.match(/items:\s*\[([\s\S]*?)\],\s*\}/);
  if (!itemsMatch) {
    console.warn('[category-mapper] Could not extract items array from sidebar');
    return getDefaultCategoryMapping();
  }

  const itemsContent = itemsMatch[1];

  // Split into lines and process sequentially
  const lines = itemsContent.split('\n');
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    /* Multi-line `{ type: 'doc' | "html", ... }` blocks (e.g. delegate-v2, section dividers) */
    if (line === '{') {
      let braceDepth =
        (rawLine.match(/{/g) || []).length - (rawLine.match(/}/g) || []).length;
      let j = i + 1;
      const blockLines = [rawLine];
      while (j < lines.length && braceDepth > 0) {
        const l = lines[j];
        braceDepth += (l.match(/{/g) || []).length - (l.match(/}/g) || []).length;
        blockLines.push(l);
        j++;
      }
      const block = blockLines.join('\n');

      if (/type:\s*['"]html['"]/.test(block) && block.includes('horizontal-bar')) {
        const valueMatch = block.match(/value:\s*["']([^"']+)["']/);
        const categoryName = valueMatch?.[1];
        if (categoryName) {
          if (currentCategory.modules.length > 0) {
            categories.push(currentCategory);
          }
          currentCategory = {
            name: categoryName,
            modules: [],
          };
        }
        i = j;
        continue;
      }

      if (/type:\s*['"]doc['"]/.test(block)) {
        const idMatch = block.match(/id:\s*['"]([^'"]+)['"]/);
        if (idMatch) {
          const moduleId = idMatch[1];
          if (moduleId !== 'index' && moduleId !== 'all-modules') {
            currentCategory.modules.push({
              id: moduleId,
              title: MODULE_NAMES[moduleId] || moduleId,
              link: `/release-notes/${moduleId}`,
            });
          }
        }
        i = j;
        continue;
      }

      i = j;
      continue;
    }

    // Check if this is the start of an HTML divider object
    if (line.includes('type:') && line.includes('"html"')) {
      // Look ahead for the value and className
      let categoryName = null;
      let isHorizontalBar = false;

      for (let j = i; j < Math.min(i + 5, lines.length); j++) {
        const nextLine = lines[j].trim();
        const valueMatch = nextLine.match(/value:\s*["']([^"']+)["']/);
        if (valueMatch) {
          categoryName = valueMatch[1];
        }
        if (nextLine.includes('horizontal-bar')) {
          isHorizontalBar = true;
        }
        if (nextLine.includes('}')) {
          break;
        }
      }

      // If we found a category divider, start a new category
      if (categoryName && isHorizontalBar) {
        if (currentCategory.modules.length > 0) {
          categories.push(currentCategory);
        }
        currentCategory = {
          name: categoryName,
          modules: [],
        };
      }
      i++;
      continue;
    }

    // Check if this is a module ID (standalone string, not a property value)
    const moduleMatch = line.match(/^["']([a-z][a-z0-9-]*)["'],?$/);
    if (moduleMatch) {
      const moduleId = moduleMatch[1];

      // Skip special items
      if (moduleId === 'all-modules' || moduleId === 'html' || moduleId === 'horizontal-bar') {
        i++;
        continue;
      }

      currentCategory.modules.push({
        id: moduleId,
        title: MODULE_NAMES[moduleId] || moduleId,
        link: `/release-notes/${moduleId}`,
      });
    }

    i++;
  }

  // Push the last category if it has modules
  if (currentCategory.modules.length > 0) {
    categories.push(currentCategory);
  }

  console.log(
    `[category-mapper] Loaded ${categories.length} categories with ${categories.reduce((sum, cat) => sum + cat.modules.length, 0)} modules`,
  );

  return { categories };
}

function getDefaultCategoryMapping() {
  return {
    categories: [
      {
        name: 'Platform Release Notes',
        modules: [
          { id: 'platform', title: 'Platform', link: '/release-notes/platform' },
          { id: 'delegate', title: 'Delegate', link: '/release-notes/delegate' },
          {
            id: 'self-managed-enterprise-edition',
            title: 'Self-Managed Enterprise Edition',
            link: '/release-notes/self-managed-enterprise-edition',
          },
          {
            id: 'harness-solutions-factory',
            title: 'Harness Solutions Factory',
            link: '/release-notes/harness-solutions-factory',
          },
        ],
      },
      {
        name: 'AI for DevOps & Automation',
        modules: [
          {
            id: 'continuous-delivery',
            title: 'Continuous Delivery & GitOps',
            link: '/release-notes/continuous-delivery',
          },
          {
            id: 'continuous-integration',
            title: 'Continuous Integration',
            link: '/release-notes/continuous-integration',
          },
          {
            id: 'internal-developer-portal',
            title: 'Internal Developer Portal',
            link: '/release-notes/internal-developer-portal',
          },
          {
            id: 'infrastructure-as-code-management',
            title: 'Infrastructure as Code Management',
            link: '/release-notes/infrastructure-as-code-management',
          },
          {
            id: 'database-devops',
            title: 'Database DevOps',
            link: '/release-notes/database-devops',
          },
          {
            id: 'artifact-registry',
            title: 'Artifact Registry',
            link: '/release-notes/artifact-registry',
          },
        ],
      },
      {
        name: 'AI for Testing & Resilience',
        modules: [
          {
            id: 'feature-management-experimentation',
            title: 'Feature Management & Experimentation',
            link: '/release-notes/feature-management-experimentation',
          },
          { id: 'feature-flags', title: 'Feature Flags', link: '/release-notes/feature-flags' },
          {
            id: 'chaos-engineering',
            title: 'Chaos Engineering',
            link: '/release-notes/chaos-engineering',
          },
          {
            id: 'ai-test-automation',
            title: 'AI Test Automation',
            link: '/release-notes/ai-test-automation',
          },
        ],
      },
      {
        name: 'AI for Security & Compliance',
        modules: [
          {
            id: 'security-testing-orchestration',
            title: 'Security Testing Orchestration',
            link: '/release-notes/security-testing-orchestration',
          },
          {
            id: 'software-supply-chain-assurance',
            title: 'Supply Chain Security',
            link: '/release-notes/software-supply-chain-assurance',
          },
        ],
      },
      {
        name: 'AI for Cost & Optimization',
        modules: [
          {
            id: 'cloud-cost-management',
            title: 'Cloud Cost Management',
            link: '/release-notes/cloud-cost-management',
          },
          {
            id: 'software-engineering-insights',
            title: 'Software Engineering Insights',
            link: '/release-notes/software-engineering-insights',
          },
        ],
      },
    ],
  };
}

export { getDefaultCategoryMapping, loadCategoryMapping, MODULE_NAMES };
