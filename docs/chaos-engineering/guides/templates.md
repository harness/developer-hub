---
title: Templates
sidebar_position: 8
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

:::info New Chaos Studio Feature
**Templates** are part of the enhanced **New Chaos Studio** experience. If you're an existing customer and want access to new features, contact your Harness support representative. For more details, see [New Chaos Studio Features](/docs/chaos-engineering#new-chaos-studio-features).
:::

**Templates** are reusable, pre-configured components that help you standardize and accelerate your chaos engineering practices. Templates provide a foundation for creating consistent experiments across your organization while maintaining flexibility for customization.

You can create experiments, faults, probes, and actions in two ways:
- **Direct Creation**: Create them directly through their specific sections for one-time use
- **Template-Based Creation**: Create them from templates when you need reusable, standardized configurations across multiple experiments

Templates allow you to:
- Standardize chaos engineering practices across teams
- Reduce experiment creation time with pre-built components
- Ensure best practices and consistent configurations
- Share proven patterns across projects and environments
- Maintain version control for your chaos engineering assets

## Template Scopes

Templates can be managed at different organizational levels:
- **Account Level**: Highest scope - accessible across all accounts, organizations, and projects
- **Organization Level**: Available across organizations and their projects
- **Project Level**: Available within a specific project only

<DynamicMarkdownSelector
  options={{
    "Fault Template": {
      path: "/chaos-engineering/content/templates/fault-template.md"
    },
    "Probe Template": {
      path: "/chaos-engineering/content/templates/probe-template.md"
    },
    "Action Template": {
      path: "/chaos-engineering/content/templates/action-template.md"
    },
    "Experiment Template": {
      path: "/chaos-engineering/content/templates/experiment-template.md"
    },
  }}
  toc={toc}
  disableSort={true}
/>

## Next Steps

- [Create your first experiment using](/docs/chaos-engineering/guides/experiments#newchaosstudio)
- [Learn about ChaosHubs](/docs/chaos-engineering/guides/chaoshub)
- [Explore Fault Templates](/docs/chaos-engineering/faults/custom-faults/custom-fault-templates)
- [Understand Actions](/docs/chaos-engineering/guides/actions/)
