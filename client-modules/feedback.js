import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { FeedbackDocPage } from '@site/src/components/Feedback';
import React from 'react';
import { createRoot } from 'react-dom/client';

const AppendFeedbackToPage = () => {
  const root = document.getElementsByClassName(
    'theme-doc-footer docusaurus-mt-lg'
  )[0];

  if (root && !document.getElementById('feedback-container')) {
    const feedbackContainer = document.createElement('div');
    feedbackContainer.id = 'feedback-container';
    root.appendChild(feedbackContainer);

    const rootContainer = createRoot(feedbackContainer);
    rootContainer.render(<FeedbackDocPage />);
  }
};

if (ExecutionEnvironment.canUseDOM) {
  window.addEventListener('load', () => {
    let interval = setInterval(AppendFeedbackToPage, 500);
    setTimeout(() => {
      clearInterval(interval);
      interval = 0;
    }, 5000);
  });
}
