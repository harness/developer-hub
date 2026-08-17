---
title: Terraform provider
description: Use the official Harness Terraform provider to manage Harness FME resources as code, including feature flags, environments, segments, traffic types, flag sets, and API keys.
sidebar_label: Terraform provider
tags:
  - terraform
  - integrations
  - feature-management
---

Use the official [Harness Terraform provider](https://registry.terraform.io/providers/harness/harness/latest/docs) to manage Harness resources as code. The provider supports creating and managing environments, traffic types, segments, feature flags, flag sets, and API keys.

## Resources

The following Harness FME resources are available in the Harness Terraform provider.

### Feature flags

| Resource | Description |
|---|---|
| [harness_fme_feature_flag](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/fme_feature_flag) | Create and manage a feature flag. |
| [harness_fme_feature_flag_definition](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/fme_feature_flag_definition) | Create and manage a feature flag definition, including treatments and targeting rules. |
| [harness_fme_flag_set](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/fme_flag_set) | Create and manage a flag set for grouping related feature flags. |

### Environments

| Resource | Description |
|---|---|
| [harness_fme_environment](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/fme_environment) | Create and manage an environment within a project. |

### Segments

| Resource | Description |
|---|---|
| [harness_fme_segment](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/fme_segment) | Create and manage a standard segment. |
| [harness_fme_segment_environment_association](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/fme_segment_environment_association) | Associate a standard segment with an environment. |
| [harness_fme_environment_segment_keys](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/fme_environment_segment_keys) | Manage the list of keys within a segment for a specific environment. |
| [harness_fme_rule_based_segment](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/fme_rule_based_segment) | Create and manage a rule-based segment using attribute-based targeting rules. |
| [harness_fme_rule_based_segment_environment_association](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/fme_rule_based_segment_environment_association) | Associate a rule-based segment with an environment. |
| [harness_fme_large_segment](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/fme_large_segment) | Create and manage a large segment optimized for high-volume key lists. |
| [harness_fme_large_segment_environment_association](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/fme_large_segment_environment_association) | Associate a large segment with an environment. |

### Traffic types

| Resource | Description |
|---|---|
| [harness_fme_traffic_type](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/fme_traffic_type) | Create and manage a traffic type within a project. |
| [harness_fme_traffic_type_attribute](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/fme_traffic_type_attribute) | Manage custom attributes and suggested values for a traffic type. |

### API keys

| Resource | Description |
|---|---|
| [harness_fme_api_key](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/fme_api_key) | Create and manage API keys for authenticating with the Harness FME API. |

## Data sources

| Data source | Description |
|---|---|
| [harness_fme_workspace](https://registry.terraform.io/providers/harness/harness/latest/docs/data-sources/fme_workspace) | Look up a Harness FME project by the  workspace name, or by Harness organization and project identifiers. |

### Example usage

```terraform
# Look up by Harness organization and project identifiers
data "harness_fme_workspace" "by_project" {
  org_id     = "organization_id"
  project_id = "project_id"
}

# Look up by exact workspace name
data "harness_fme_workspace" "by_name" {
  name = "my-workspace-name"
}
```

## Use the Harness Terraform provider

Go to the [Harness provider on the Terraform Registry](https://registry.terraform.io/providers/harness/harness/latest/docs) to review full provider documentation, configuration options, and examples.