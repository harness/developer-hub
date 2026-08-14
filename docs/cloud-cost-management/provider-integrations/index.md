---
title: Integrations
sidebar_label: Overview
description: Connect cloud providers, AI providers, Kubernetes clusters, and external cost sources to Cloud & AI Cost Management.
slug: /cloud-cost-management/integrations
redirect_from:
  - /docs/cloud-cost-management/provider-integrations
---

import DocCardList from '@theme/DocCardList';

Connect cloud providers, AI providers, Kubernetes clusters, and external cost sources to Cloud & AI Cost Management. Select an integration to configure.

<DocCardList
  items={[
    {
      type: 'link',
      label: 'AI providers',
      href: '/docs/cloud-cost-management/provider-integrations/ai-providers',
      description: 'Connect OpenAI and Anthropic to track AI provider spend in Cloud & AI Cost Management.',
    },
    {
      type: 'link',
      label: 'Cloud providers',
      href: '/docs/cloud-cost-management/provider-integrations/cloud-providers',
      description: 'Connect AWS, GCP, and Azure to track cloud spend in Cloud & AI Cost Management.',
    },
    {
      type: 'link',
      label: 'Kubernetes',
      href: '/docs/cloud-cost-management/provider-integrations/cloud-providers/kubernetes',
      docId: 'cloud-cost-management/provider-integrations/cloud-providers/kubernetes',
    },
    {
      type: 'link',
      label: 'Custom cost provider',
      href: '/docs/cloud-cost-management/provider-integrations/custom-cost-provider',
      docId: 'cloud-cost-management/provider-integrations/custom-cost-provider',
    },
    {
      type: 'link',
      label: 'SDK integrations',
      href: '/docs/cloud-cost-management/sdk-integrations',
      description: 'Instrument your application to send AI traces to Cloud & AI Cost Management.',
    },
  ]}
/>
