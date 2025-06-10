---
title: Generate SBOM for Repositories
description: Generate SBOM for Repositories using Harness SCS
sidebar_position: 9
sidebar_label: Generate SBOM for Repositories
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A Software Bill of Materials (SBOM) is a comprehensive list of all components, libraries, and dependencies used in a software application. The **SBOM Orchestration** step in Harness Software Supply Chain (SCS) allows you to generate SBOMs for both code repositories and [software artifacts](/docs/software-supply-chain-assurance/open-source-management/generate-sbom-for-artifacts), providing visibility into the components that make up your software.


If you already possess an SBOM and wish to ingest it, please refer to the [Ingest SBOM](./ingest-sbom-data.md) section.

## SBOM Orchestration step configuration

<DocImage path={require('./static/sbom-for-repos.png')} width="50%" height="50%" />

You can use **SBOM Orchestration** step to generate an SBOM in either the **Build** or **Deploy** stage of a Harness pipeline.

* In a **Build** stage, add the **SBOM Orchestration** step after the artifact (image) has been pushed to an artifact repository.
* In a **Deploy** stage, add the **SBOM Orchestration** step before the deployment step.

:::info 

**SBOM Orchestration** step in deploy stage can only be used in the [Containerized Step Groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups.md)

:::

Using SBOM Orchestration step you can generate the SBOM for both Container images and and Repositories. Follow the steps to configure the fields for each supported type.

* **Name:** Enter a name for the step.

* **Step Mode:** Select **Generation**.

* **SBOM Tool:** Select **Syft** or **cdxgen**. For other SBOM tools, go to [Ingest SBOM](./ingest-sbom-data.md).

* **SBOM Format:** Select **SPDX** or **CycloneDX**.

  If you're using **Syft** to generate the SBOM and want to ensure it includes all component licenses with high accuracy, you'll need to set specific environment variables based on your project's programming language. Here are the relevant variables:

<details>
    <summary>Set variables for enhanced SBOM</summary>

      | Programming Language | Name of Variable | Value         | 
      |----------------------|----------------|-----------------|
      | Go          | `SYFT_GOLANG_SEARCH_REMOTE_LICENSES`             | true
      | Java                 | `SYFT_JAVA_USE_NETWORK`         | true    |
      | JavaScript                  | `SYFT_JAVASCRIPT_SEARCH_REMOTE_LICENSES`           | true     |

      To add a new environment variable, go to **Overview** section of your Build stage, and expand the **Advanced** section.

      <DocImage path={require('./static/syft-flags.png')} width="50%" height="50%" title="Click to view full size image" />

      By setting these variables, Syft can more effectively fetch and populate the licensing data for the components in your SBOM. This not only enhances the quality of the SBOM but also improves its overall SBOM score. If your SBOM contains `NOASSERTIONS`, it indicates that Syft was unable to retrieve necessary data.

</details>

 *  **Source**: Select the **Source** as a Repository to generate the SBOM for source code.

 * **Repository URL:** The Repository URL you've configured for cloning into the workspace.
 * **Source Path:** Leave blank or enter a path (in the repository) for which you want to generate SBOM. Use this setting to generate SBOM for a specific section of your code repo, rather than your entire repo. The path must start with `/`.
   For example, if your repository URL is `https://github.com/username/repo`, and you want to generate SBOM for `https://github.com/username/repo/service-core/source`, then enter `/service-core/source` for **Source Path**.
   To generate an SBOM for the entire repository, leave this field empty.
* **Git Branch:** The branch of the repository for which you want to generate the SBOM.
* **Workspace:** If you cloned the codebase to a different directory than the root workspace directory (`/harness`), enter the path to the subdirectory using the format `/harness/PATH/TO/SUBDIRECTORY`. Leave this field empty if you cloned your codebase into the default directory (`/harness`). Usually, your codebase is only cloned into a non-default directory if you are [cloning multiple codebases](/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline) into a pipeline.

:::info

    Make sure your repository is cloned into the stage workspace before the SBOM Orchestration step runs. There are several ways you can do this:
    * Clone the codebase by default, such as a [Build stage's default codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase).
    * Add a [Git Clone step](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/git-clone-step/) or [Run step](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/run-step/) to the Deploy stage.
    * Add a [Git Clone step or Run step to a Build stage](/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline).

:::

### Configure SBOM Drift


This feature allows you to track changes in SBOMs by comparing against the last generated SBOM. It provides a detailed analysis of addition or removal of components and licenses, helping you manage and oversee repositories more effectively. However, this is optional and not required for SBOM generation. If you prefer not to detect changes in SBOMs, leave this option unchecked.

<DocImage path={require('./static/sbom-drift.png')} width="70%" height="70%" />


:::info
After you run the SBOM Orchestration step, the generated SBOM file is uploaded to the `/harness/sbom/{sbom_<sbom_orchestration_step_execution_id>}.json` path. You can also download the SBOM using [Harness APIs](https://apidocs.harness.io/tag/SBOM#operation/downloadSbomForArtifact).
:::


## Run the pipeline

When the pipeline runs, the generated SBOMs for Code Repositories are accessible in the [Artifacts view](/docs/software-supply-chain-assurance/artifact-security/overview). Additionally, you can locate the SBOM for any artifact on the **Supply Chain** tab within the **Execution Details** page in Harness.


<DocImage path={require('./static/executions-tab.png')} width="100%" height="100%" />


<details>
<summary>Example Pipeline for SBOM generation</summary>

These example demonstrate how you could set up Build and Deploy stages to generate SBOM.

<Tabs>
<TabItem value="build" label="Build stage" default>

This example **Build** stage has three steps:

- **Run** step: Build and test an artifact (image).
- **Build and Push an image to Docker Registry** step: Build and push the image to a Docker registry.
- **SBOM Orchestration** step: Generate the SBOM.


<DocImage path={require('./static/sbom-gen-build-stage.png')} width="60%" height="60%" title="Click to view full size image" />


</TabItem>
<TabItem value="deploy" label="Deploy stage">

SBOM Orchestration in deploy stage can only be used in the [Containerized Step Groups](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups)
This example **Deploy** stage has two steps:

- **SBOM Orchestration** step: Generate the SBOM.
- **Rolling deployment** step: Deploy the image.

<DocImage path={require('./static/sbom-gen-deploy-stage.png')} width="60%" height="60%" title="Click to view full size image" />

</TabItem>
</Tabs>

</details>

## Next steps

After generating an SBOM, you can apply [SBOM Policy Enforcement](/docs/software-supply-chain-assurance/open-source-management/enforce-sbom-policies) to achieve open source governance.


