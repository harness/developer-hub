---
title: Configure Gitspace Infrastructure in Harness UI
description: Learn more about how to configure your Gitspace Infrastructure via Harness UI.
sidebar_position: 2
sidebar_label: Configure Gitspace Infrastructure in Harness UI
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

This is your **first step** in configuring **Self Hosted Gitspaces**. You'll need to configure your infrastructure where your Gitspaces will be hosted through the Harness UI. Select your cloud provider to get started:

<DynamicMarkdownSelector
  options={{
    GCP: {
      path: "/cloud-development-environments/self-hosted-gitspaces/steps/content/gitspace-infra-ui-gcp.md",
      logo: "gcp-logo.svg",
      logoSize: 24
    },
    AWS: {
      path: "/cloud-development-environments/self-hosted-gitspaces/steps/content/gitspace-infra-ui-aws.md",
      logo: "aws-logo.svg",
      logoSize: 24
    }
  }}
/>
