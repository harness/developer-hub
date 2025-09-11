const fs = require('fs-extra');
const path = require('path');
const { Feed } = require('feed');

const jsonPath = path.join(__dirname, '../feature-flags/static/ff-ga-feed.json');
const outputPath = path.join(__dirname, '../build/feature-flags/rss.xml');
const siteUrl = 'https://developer.harness.io';
const baseUrl = '/';

if (!fs.existsSync(jsonPath)) {
  console.warn('[ff-ga-rss] JSON file not found:', jsonPath);
  process.exit(0);
}
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
if (!Array.isArray(data) || data.length === 0) {
  console.warn('[ff-ga-rss] No entries for RSS feed. Skipping RSS file generation.');
  process.exit(0);
}
const feed = new Feed({
  title: 'Feature Flags GA RSS Feed',
  id: siteUrl + baseUrl + 'feature-flags/rss.xml',
  link: siteUrl + baseUrl + 'feature-flags/rss.xml',
  updated: new Date(),
  feedLinks: {
    rss: siteUrl + baseUrl + 'feature-flags/rss.xml',
  },
});
data.forEach(item => {
  feed.addItem({
    title: item.flagKey,
    id: item.flagKey,
    link: siteUrl + baseUrl + 'feature-flags/',
    description: item.description,
    date: new Date(item.gaStartDate),
    category: [
      {
        name: item.module,
        term: item.module,
      },
    ],
  });
});
fs.ensureDirSync(path.dirname(outputPath));
fs.writeFileSync(outputPath, feed.rss2());
console.log('[ff-ga-rss] RSS feed generated at', outputPath); 