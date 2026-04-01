import React from 'react';
import { Redirect } from '@docusaurus/router';

export type DocPermalinkRedirectProps = {
  /** Site-relative permalink (e.g. `/docs/...`) */
  to: string;
};

/**
 * Client-side redirect for doc `redirect_from` paths so dev (`docusaurus start`)
 * and hard reloads match production Netlify `_redirects` behavior.
 * Uses the same React Router entry as Docusaurus (see `@docusaurus/router`).
 */
export default function DocPermalinkRedirect({ to }: DocPermalinkRedirectProps) {
  return <Redirect to={to} />;
}
