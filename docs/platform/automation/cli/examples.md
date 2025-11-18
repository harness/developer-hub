---
title: Harness CLI Examples
description: Examples of various use cases of Harness CLI.
sidebar_position: 2
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

:::info CLI Versions
Harness offers two versions of the CLI:
- **v0 (`harness`)**: This will be deprecated in the future. Use v1.0.0 (`hc`) instead.
- **v1.0.0 (`hc`)**: The new unified CLI with enhanced features and improved user experience

Select your preferred version below to get started.
:::
Select your CLI version to view relevant examples:

<DynamicMarkdownSelector
  options={{
    "v1.0.0 - hc": {
      path: "/platform/automation/cli/content/example/v1.md",
      label: "v1.0.0 - New CLI Examples"
    },
    "v0 - harness": {
      path: "/platform/automation/cli/content/example/v0.md",
      label: "v0 - Original CLI Examples"
    }
  }}
  disableSort={true}
  toc={toc}
/>
