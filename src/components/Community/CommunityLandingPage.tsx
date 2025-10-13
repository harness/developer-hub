import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './communitylandingpage.module.scss';

// Community items with static SVG icons stored under static/provider-logos
type CommunityItem = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
  icon: string; // path to SVG in static folder
};

const items: CommunityItem[] = [
  {
    label: 'Community Slack',
    href: 'https://join-community-slack.harness.io/',
    description: 'Join real-time conversations with engineers and the community.',
    external: true,
    icon: '/provider-logos/slack-logo.svg',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@Harnesscommunity/videos',
    description: 'Watch how-tos, walkthroughs, and event replays.',
    external: true,
    icon: '/provider-logos/youtube-logo.svg',
  },
  {
    label: 'Reddit',
    href: 'https://www.reddit.com/r/Harnessio/',
    description: 'Discuss Harness topics and share your experience.',
    external: true,
    icon: '/provider-logos/reddit-logo.svg',
  },
  {
    label: 'Contribute to Docs',
    href: 'https://github.com/harness/developer-hub',
    description: 'Help improve our documentation and examples.',
    icon: '/provider-logos/harness-community-logo.svg',
  },
  {
    label: 'Harness University',
    href: 'https://university.harness.io/',
    description: 'Learn and get certified with Harness modules.',
    external: true,
    icon: '/img/university-icon.svg',
    }
];

function CardLink({ item }: { item: CommunityItem }) {
  const externalProps = item.external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Link
      to={item.href}
      {...externalProps}
      className={clsx('card', 'padding--md', 'community-card')} // styled in CSS module
      aria-label={`${item.label}${item.external ? ' (opens in a new tab)' : ''}`}
    >
      <div className="card__body">
        {/* Logo centered */}
        <div className={styles.iconWrap}>
          <img src={item.icon} alt="" className={styles.icon} />
        </div>

        {/* Text block left aligned, constrained under logo */}
        <div className={styles.textBlock}>
          <h4 className={styles.cardTitle}>{item.label}</h4>
          {item.description && <p className={styles.cardDesc}>{item.description}</p>}
        </div>
      </div>
    </Link>
  );
}

export default function CommunityLandingPage(): JSX.Element {
  return (
    <section className={clsx('container', 'margin-vert--lg', styles.wrapper)}>
      <header className={styles.header}>
        <h2 className={styles.title}>Community</h2>
        <p className={styles.subTitle}>
          Join the conversation, get help, and contribute to the Harness ecosystem.
        </p>
      </header>

      <div className={clsx('row', styles.grid)}>
        {items.map((item) => (
          <div
          key={item.label}
          className={clsx('col', 'margin-bottom--md', styles.col)}  // removed 'col--3'
        >
          <CardLink item={item} />
        </div>
        ))}
      </div>
    </section>
  );
}