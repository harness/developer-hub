import { CardSections } from '@site/src/components/TutorialCard/TutorialCard';
import { MODULES } from '@site/src/constants';

/* Define the cards - start */

// Docs
export const docsCards: CardSections = [
  {
    name: 'Get Started',
    description: '',
    list: [
      {
        title: 'Overview',
        module: MODULES.ata,
        description: 'Learn more about Harness AI Test Automation',
        link: '/docs/ai-test-automation/get-started/overview',
      },
    ],
  },
];
