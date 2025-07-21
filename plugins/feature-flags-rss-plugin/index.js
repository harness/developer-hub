const fs = require('fs-extra');
const path = require('path');
const { Feed } = require('feed');

function filterAndSortLast3Months(entries) {
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);
  const filtered = entries.filter(entry => {
    const entryDate = new Date(entry.gaDate);
    return entryDate >= threeMonthsAgo;
  });
  filtered.sort((a, b) => new Date(b.gaDate) - new Date(a.gaDate));
  return filtered;
}

// WARNING: This plugin generates the RSS file in postBuild, so it will NOT be available in dev mode (docusaurus start),
// and links to /feature-flags/rss.xml will be flagged as broken unless onBrokenLinks is set to 'warn'.

async function featureFlagsRssPlugin(context, options) {
  return {
    name: 'feature-flags-rss-plugin',
    async postBuild({ outDir }) {
      const jsonPath = path.join(
        context.siteDir,
        'feature-flags/static/ff-ga-feed.json'
      );
      if (!fs.existsSync(jsonPath)) {
        console.warn('[feature-flags-rss-plugin] JSON file not found:', jsonPath);
        return;
      }
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      const filtered = filterAndSortLast3Months(data);
      if (!filtered || filtered.length === 0) {
        console.warn('[feature-flags-rss-plugin] No entries for RSS feed. Skipping RSS file generation.');
        return;
      }
      const siteUrl = context.siteConfig.url || '';
      const baseUrl = context.siteConfig.baseUrl || '/';
      const rssFeed = new Feed({
        title: 'Feature Flags GA RSS Feed',
        id: siteUrl + baseUrl + 'feature-flags/rss.xml',
        link: siteUrl + baseUrl + 'feature-flags/rss.xml',
        updated: new Date(),
        feedLinks: {
          rss: siteUrl + baseUrl + 'feature-flags/rss.xml',
        },
      });
      filtered.forEach(item => {
        rssFeed.addItem({
          title: item.flagKey,
          id: item.flagKey,
          link: siteUrl + baseUrl + 'feature-flags/',
          description: item.description,
          date: new Date(item.gaDate),
          category: [
            {
              name: item.module,
              term: item.module,
            },
          ],
        });
      });
      const outputPathRSS = path.join(outDir, 'feature-flags', 'rss.xml');
      fs.ensureDirSync(path.dirname(outputPathRSS));
      fs.writeFileSync(outputPathRSS, rssFeed.rss2());
      console.log('[feature-flags-rss-plugin] RSS feed generated at', outputPathRSS);
    },
  };
}

module.exports = featureFlagsRssPlugin; 