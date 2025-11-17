---
title: Install and Configure Harness CLI
description: This topic shows how to get started with the Harness CLI.
sidebar_position: 1
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

**Harness CLI** serves as your gateway to frictionless interaction with the intelligent Harness Platform directly through the command-line interface, providing you with a powerful and efficient means to manage Harness and its diverse set of resources.

This documentation section will serve as your compass, guiding you through the installation, configuration, and upgrade of the Harness CLI utility.

:::info CLI Versions
Harness offers two versions of the CLI:
- **v0 (`harness`)**: This will be deprecated in the future. Use v1 (`hc`) instead.
- **v1 (`hc`)**: The new unified CLI with enhanced features and improved user experience

Select your preferred version below to get started.
:::

<DynamicMarkdownSelector
  options={{
    "v1 - hc": {
      path: "/platform/automation/cli/content/versions/v1.md",
      label: "v1 - New CLI"
    },  "v0 - harness": {
      path: "/platform/automation/cli/content/versions/v0.md",
      label: "v0 - Original CLI"
    },
  }} disableSort={true}
  toc = {toc}
/>
