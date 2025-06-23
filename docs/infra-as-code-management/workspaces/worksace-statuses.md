---
title: Workspace Statuses
description: Learn about IaCM workspace status
sidebar_position: 70
---


This document provides an overview of workspace statuses, offering a quick glance at the number of workspaces in each status. It helps streamline workflow management by enabling users to filter and identify workspaces based on their current status.

**Workspace Statuses:**
- **Active:** Active workspaces are those with an active state file, provisioned from your OpenTofu/Terraform code.
- **Inactive:** Inactive workspaces are currently not in use and do not have an active state file.
- **Provisioning:** Workspaces with a provision pipeline running against them.
- **Destroying:** Workspaces undergoing the teardown process with a `destroy` pipeline actively running.
- **Drifted:** Workspaces where the actual infrastructure has drifted from the expected configuration. Go to [Drift Detection](/docs/infra-as-code-management/pipelines/operations/drift-detection) to find out more.
- **Apply_Needed:** An `apply` is required to bring the infrastructure in sync with the workspace configuration. 
    - This status appears when changes are detected but not yet applied—such as Terraform code updates, modified variables or files, or changes to the provisioner version. 
    - It is typically set after a plan step shows pending changes or when configuration is edited directly, helping users identify workspaces that are currently out-of-date.
- **Failed:** Workspaces where the last operation did not complete successfully, requiring attention.

<!-- Tango/Interactive guide -->
<DocVideo src="https://app.tango.us/app/embed/1b445b45-6085-4964-a8c4-ab5c883f0a98?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Harness IaCM Workspace Status'" />

:::tip enhanced usability
For enhanced usability, set [default pipelines](/docs/infra-as-code-management/pipelines/default-pipelines) in your workspace configuration, so you can run [provision](/docs/infra-as-code-management/workspaces/provision-workspace) and [destroy](/docs/infra-as-code-management/pipelines/operations/destroy-workspaces) pipelines directly against the workspace you are reviewing. 
:::