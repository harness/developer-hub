---
title: Get started with Artifact Registry
description: Build a Registry with Harness
sidebar_position: 20
sidebar_label: Get Started
redirect_from:
  - /docs/artifact-registry/supported-formats
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

The Harness Artifact Registry module allows you to quickly and easily store your digital artifacts. 

Learn how to set up and manage all supported Artifact Registry formats within Harness, streamlining your container image workflows. Select the format you want to learn more about:

<DynamicMarkdownSelector
  options={{
    Docker: {
      path: "/artifact-registry/content/supported-formats/docker-quickstart.md",
      logo: "docker-logo.svg",
      logoSize: 24
    },
    Maven: {
      path: "/artifact-registry/content/supported-formats/maven-quickstart.md",
      logo: "maven-logo.svg",
      iconOnly: true,
    },
    Generic: {
      path: "/artifact-registry/content/supported-formats/generic-quickstart.md",
      logo: "generic-logo.svg",
      logoSize: 20
    },
    Python: {
      path: "/artifact-registry/content/supported-formats/python-quickstart.md",
      logo: "python-logo.svg",
      logoSize: 24
    },
    NPM: {
      path: "/artifact-registry/content/supported-formats/npm-quickstart.md",
      logo: "npm-logo.svg",
      iconOnly: true,
    },
    RPM: {
      path: "/artifact-registry/content/supported-formats/rpm-quickstart.md",
      logo: "rpm-logo.svg",
      iconOnly: true,
      logoWidth: 42,
      logoHeight: 28
    },
    Helm: {
      path: "/artifact-registry/content/supported-formats/helm-quickstart.md",
      logo: "helm-logo.svg",
      logoSize: 28
    },
    Nuget: {
      path: "/artifact-registry/content/supported-formats/nuget-quickstart.md",
      logo: "nuget-logo.svg",
      logoSize: 24
    },
    Cargo: {
      path: "/artifact-registry/content/supported-formats/cargo-quickstart.md",
      logo: "rust-logo.png",
      logoSize: 24
    },
    "Hugging Face": {
      path: "/artifact-registry/content/supported-formats/hugging-face-quickstart.md",
      logo: "hugging-face-logo.svg",
      logoSize: 24
    }
  }}
  toc = {toc}
  nextHeadingID='ar-next-steps'
/>

## Next Steps {#ar-next-steps}
Now, you should see the artifact appear in your docker registry as well as the **Artifacts** tab in the left navigation panel, and you can stream your artifact usage further with the following options

- [Integrate with your CD pipelines](/docs/artifact-registry/platform-integrations/cd-ar-integrations)
- [Learn about security integrations](/docs/artifact-registry/platform-integrations/security-integrations/ssd-ar-integrations)
- [Automate actions with Webhooks](/docs/artifact-registry/ar-webhooks)