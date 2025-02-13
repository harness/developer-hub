---
title: FME object architecture diagram
sidebar_label: FME object architecture diagram
helpdocs_is_private: false
helpdocs_is_published: true
description: Visualization of object relationships for FME engineers and administrators
---

The diagram below shows FME objects and object relationships.

#### For feature management and experimentation engineers:

In FME, traffic types and environments organize and provide context for feature flag evaluations, metrics, and events. The diagram can give you insight into the structure and scopes of the FME objects that you work with and help you architect your feature rollout plans.

#### For FME administrators:

The diagram shows the Harness users and access settings that you use for permissions and approval flows within FME.

import FMEArchitectureObjectsImage from '@site/docs/feature-management-experimentation/10-getting-started/docs/FMEArchitectureObjectsImage.js';

:::info[Split Legacy settings locations]
Post migration to app.harness.io, Split legacy Project permissions,  Change permissions and Data export permissions (marked in purple below) will move out of their current locations and into Harness RBAC management.

New Admin API Key creation and management will move to Harness Service Accounts.  Existing Split legacy Admin API Keys will continue to operate until revoked in the Split legacy location.
:::

<FMEArchitectureObjectsImage />