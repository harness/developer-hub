---
title: Templates
sidebar_position: 8
redirect_from:
  - /docs/chaos-engineering/guides/templates
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';


:::note Linux and Windows Infrastructure
Experiment templates are now supported for Linux and Windows v2 infrastructure. You can create and manage experiment templates, create experiments from templates, and run those experiments. However, running Machine/Linux experiments from a pipeline and using step templates with machine experiment templates are currently not supported.
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
      path: "/resilience-testing/content/templates/fault-template.md"
    },
    "Probe Template": {
      path: "/resilience-testing/content/templates/probe-template.md"
    },
    "Action Template": {
      path: "/resilience-testing/content/templates/action-template.md"
    },
    "Experiment Template": {
      path: "/resilience-testing/content/templates/experiment-template.md"
    },
  }}
  toc={toc}
  disableSort={true}
/>

## Next Steps

- [Create your first experiment](./experiments)
- [Explore Fault Templates](/docs/chaos-engineering/faults/custom-faults/custom-fault-templates)
- [Understand Actions](./actions)

