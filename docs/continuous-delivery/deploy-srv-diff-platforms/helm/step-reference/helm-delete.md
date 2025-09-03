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

- **Release Name**: The name of the Helm release to be deleted. You can specify this manually or leave it blank to automatically retrieve the release name from the selected infrastructure.

  * When the **Helm Delete Step** is used in a **Deploy stage**, the release name can be fetched from the selected **service and infrastructure configuration**.  
  * If used in a **Custom stage**, you must manually provide the release name, as there is no service context available in that stage.

  The release name supports **Runtime input** and **expressions**.

### Optional Configuration

- **Command Flags**: Users can **add or remove Helm flags** as needed within the step configuration. For a complete list of supported command flags, refer to the [Helm Documentation](https://helm.sh/docs/helm/helm_uninstall/#options).

  **Adding Command Flags at the Service**

  You can also configure command flags at the **service level**, which will be applied during Helm uninstallation. To do this:

  - Navigate to the **Service Configuration**.
  - Go to the **Manifests** tab.
  - In the **Advanced** section, select the **Command Type** as `Uninstall` for Helm v3 or `Delete` for Helm v2.
  - Add the required Helm flags under **Flags**.

    When the **Helm Delete Step** is used in a **Deploy stage**, both **service-level** and **step-level** command flags are supported. However, **step-level flags take precedence** over service-level flags during execution.

    If the **Helm Delete Step** is used in a **Custom stage**, only the flags defined in the step itself will be considered. The step will **not inherit flags or configurations** from the service in this case.

- **Environment Variables**: Add any environment variables here.

### Advanced Options

See the following:

* [Delegate Selector](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors)
* [Conditional Execution](/docs/platform/pipelines/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)
* [Command Flags](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/native-helm-quickstart#configure-command-flags-at-step-level)


## Limitations

- **Helm v2 is not supported**.
- The Helm delete command behavior depends on **Helm v3 flags**, which vary based on the release.
- Users must have an **environment/infrastructure that natively supports Helm**.

## Conclusion

The **Harness Helm Delete Step** provides a structured way to **uninstall Helm releases** within pipelines, offering flexibility in execution and customization. With support for **runtime inputs, flags, and dry-run execution**, this step helps teams safely manage their Helm-based deployments.
