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


Harness Artifact Registry provides a centralized solution for storing and managing digital artifacts across your development lifecycle. Whether you're working with Docker images, Helm charts, Maven packages, Python libraries, or other formats, Artifact Registry supports your workflow.

Getting started with Artifact Registry typically involves [creating a registry](/docs/artifact-registry/manage-registries/create-registry), optionally [configuring an upstream proxy](/docs/artifact-registry/manage-registries/upstream-proxy) for external dependencies, and [setting up your client](/docs/artifact-registry/manage-registries/client-setup) to connect to your registry.

Select your artifact format below to get started:

<DynamicMarkdownSelector
  options={{
    Docker: {
      path: "/artifact-registry/content/supported-formats/docker-quickstart.md",
      logo: "docker-logo.svg",
      logoSize: 24
    },
    Helm: {
      path: "/artifact-registry/content/supported-formats/helm-quickstart.md",
      logo: "helm-logo.svg",
      logoSize: 28
    },
    Generic: {
      path: "/artifact-registry/content/supported-formats/generic-quickstart.md",
      logo: "generic-logo.svg",
      logoSize: 20
    },
    Maven: {
      path: "/artifact-registry/content/supported-formats/maven-quickstart.md",
      logo: "maven-logo.svg",
      iconOnly: true,
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
    Nuget: {
      path: "/artifact-registry/content/supported-formats/nuget-quickstart.md",
      logo: "nuget-logo.svg",
      logoSize: 24
    },
    RPM: {
      path: "/artifact-registry/content/supported-formats/rpm-quickstart.md",
      logo: "rpm-logo.svg",
      iconOnly: true,
      logoWidth: 42,
      logoHeight: 28
    },
    Cargo: {
      path: "/artifact-registry/content/supported-formats/cargo-quickstart.md",
      logo: "rust-logo.png",
      logoSize: 24
    },
    Go: {
      path: "/artifact-registry/content/supported-formats/go-quickstart.md",
      logo: "go-logo.svg",
      iconOnly: true
    },
    "Hugging Face": {
      path: "/artifact-registry/content/supported-formats/hugging-face-quickstart.md",
      logo: "hugging-face-logo.svg",
      logoSize: 24
    },
    Conda: {
      path: "/artifact-registry/content/supported-formats/conda-quickstart.md",
      logo: "conda-logo.svg",
      logoSize: 24
    },
    Dart: {
      path: "/artifact-registry/content/supported-formats/dart-quickstart.md",
      logo: "dart-logo.svg",
      logoSize: 24
    }
  }}
  disableSort={true}
  toc = {toc}
  nextHeadingID='ar-next-steps'
/>

## Next Steps {#ar-next-steps}
Now, you should see the artifact appear in your docker registry as well as the **Artifacts** tab in the left navigation panel, and you can stream your artifact usage further with the following options

- [Integrate with your CD pipelines](/docs/artifact-registry/platform-integrations/cd-ar-integrations)
- [Learn about security integrations](/docs/artifact-registry/platform-integrations/security-integrations/ssd-ar-integrations)
- [Automate actions with Webhooks](/docs/artifact-registry/manage-registries/ar-webhooks)