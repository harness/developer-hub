---
title: Module Registry Overview
description: Module structure, root and submodule usage, registered module settings, and governance for the Harness IaCM Module Registry.
sidebar_position: 5
sidebar_label: Overview
redirect_from:
  - /docs/infra-as-code-management/registry/module-registry/module-registry-code-structure
  - /docs/infra-as-code-management/registry/module-registry/root-sub-module-usage
  - /docs/infra-as-code-management/registry/module-registry/module-registry-tabs
  - /docs/infra-as-code-management/registry/module-registry/iacm-module-governance
  - /docs/infra-as-code-management/iacm-features/module-registry/module-registry-code-structure
  - /docs/infra-as-code-management/iacm-features/module-registry/root-sub-module-usage
  - /docs/infra-as-code-management/iacm-features/module-registry/module-registry-tabs
  - /kb/reference-architectures/iacm/iacm-module-governance
  - /docs/infra-as-code-management/registry/module-registry/content/root-submodule-usage
---

This page gives an overview of the Harness IaCM Module Registry. Use the selector below to switch between topics: **Module Structure and Usage**, **Registered Module Settings**, and **Module Governance**.

## Overview topics {#overview-topics}

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

<DynamicMarkdownSelector
  options={{
    "Module Structure and Usage": {
      path: "/infra-as-code-management/registry/module-registry/content/module-structure.md",
    },
    "Registered Module Settings": {
      path: "/infra-as-code-management/registry/module-registry/content/registered-module-settings.md",
    },
    "Module Governance": {
      path: "/infra-as-code-management/registry/module-registry/content/module-governance.md",
    },
  }}
  toc={toc}
  precedingHeadingID="overview-topics"
  nextHeadingID="next-steps"
  defaultSelection="Module Structure and Usage"
  disableSort={true}
/>

## Next steps {#next-steps}

- [Register a module](/docs/infra-as-code-management/registry/module-registry)
- [Add a module using artifact storage](/docs/infra-as-code-management/registry/module-registry/module-registry-artifacts)
- [Test module versions](/docs/infra-as-code-management/registry/module-registry/module-registry-testing)
