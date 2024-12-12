---
title: Terraform provider
sidebar_label: Terraform
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/6191463919885-Terraform-provider </button>
</p>

Use Terraform to create Split projects, environments, users, groups, traffic types, segments, feature flags, and feature flag definitions. The following is a list of available functionality:

* Resources
  * split_environment: Create an environment in a Split project
  * split_group: Create a group
  * split_segment: Create a segment
  * split_enviroment_segment_keys: Manage segment keys in an environment
  * split_definition: Create or manage a feature flag definition (targeting rules)
  * split_split: Create a feature flag
  * split_traffic_type: Create a traffic type
  * split_traffic_type_attribute: Manage custom attributes and suggested values
  * split_user: Create / manage a user
  * split_workspace: Create a Split project (previously called workspace)
* Data Sources
  * split_environment
  * split_traffic_type
  * split_workspace (now called Split project)

# Using the Split Terraform Provider

This is a third-party integration that has been tested by Split. Split does not own or maintain this integration. For more information, contact the [contributor](https://github.com/davidji99/terraform-provider-split/issues).

For more information or to start using the Split Terraform provider, refer to the [provider documentation](https://registry.terraform.io/providers/davidji99/split/latest/docs) on the Terraform Registry.
