---
title: Helm Delete Step
description: Reference for the Helm Delete step
sidebar_position: 60
---

## Overview

The **Harness Helm Delete Step** allows users to **uninstall Helm releases** within a pipeline execution. This step does not require a service but must be executed in an **environment/infrastructure that supports Helm natively**. It provides flexibility by allowing users to manually specify the release name or retrieve it from the selected infrastructure.

This step is useful in scenarios where Helm-based applications need to be removed as part of **cleanup processes**, **rollback strategies**, or **custom pipeline workflows**.

:::note
Currently, this feature is behind the feature flag `CDS_HELM_DELETE_STEP`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::


## When to Use This Step

- Uninstalling Helm releases as part of a **deployment rollback**.
- Cleaning up resources in **custom pipeline workflows**.
- Removing specific Helm deployments without requiring a full service definition.

## How to Configure the Helm Delete Step

1. **Navigate to your Pipeline** and add a new **Deploy Stage**.
2. Under **Deployment Type**, select **Native Helm**.
3. For **Service**, use the same service that was used for the Helm deployment.
4. For **Environment**, use the same environment that was used for the Helm deployment.
5. In **Execution**, choose any execution strategy. Since the **Helm Delete Step** must be added separately:
   - Click on **Add Step**.
   - Select **Helm Delete**.
6. **Save and Execute** the pipeline.

<div align="center">
  <DocImage path={require('../static/helm-delete-step.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

## Step Configuration Options

- **Name**: The name for the deploy step.

- **Timeout**: The timeout duration for this step. You can specify:
  - `w` for weeks  
  - `d` for days  
  - `h` for hours  
  - `m` for minutes  
  - `s` for seconds  
  - `ms` for milliseconds  

- **Dry-Run**: A **`--dry-run`** checkbox is available for safer execution of destructive operations, allowing users to preview the changes before applying them.

- **Release Name**: The name of the Helm release to be deleted. Users can provide this manually or fetch it dynamically from the selected infrastructure. The release name also supports runtime input and expressions.

### Optional Configuration

- **Command Flags**: Users can **add or remove Helm flags** as needed within the step configuration. For a complete list of supported command flags, refer to the [Helm Documentation](https://helm.sh/docs/helm/helm_uninstall/#options).

- **Environment Variables**: Add any environment variables here.

## Limitations

- **Helm v2 is not supported**.
- The Helm delete command behavior depends on **Helm v3 flags**, which vary based on the release.
- Users must have an **environment/infrastructure that natively supports Helm**.

## Conclusion

The **Harness Helm Delete Step** provides a structured way to **uninstall Helm releases** within pipelines, offering flexibility in execution and customization. With support for **runtime inputs, flags, and dry-run execution**, this step helps teams safely manage their Helm-based deployments.
