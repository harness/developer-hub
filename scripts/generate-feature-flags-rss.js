const fs = require('fs-extra');
const path = require('path');
const { Feed } = require('feed');

const jsonPath = path.join(__dirname, '../release-notes/static/ff-ga-feed.json');
const outputPath = path.join(__dirname, '../build/release-notes/feature-flags-ga-timeline/rss.xml');
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
  id: siteUrl + baseUrl + '/release-notes/feature-flags-ga-timeline/rss.xml',
  link: siteUrl + baseUrl + '/release-notes/feature-flags-ga-timeline/rss.xml',
  updated: new Date(),
  feedLinks: {
    rss: siteUrl + baseUrl + '/release-notes/feature-flags-ga-timeline/rss.xml',
  },
});
data.forEach(item => {
  feed.addItem({
    title: item.flagKey,
    id: item.flagKey,
    link: siteUrl + baseUrl + '/release-notes/feature-flags-ga-timeline/',
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