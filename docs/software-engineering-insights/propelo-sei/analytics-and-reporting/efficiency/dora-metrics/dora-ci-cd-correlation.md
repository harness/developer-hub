---
title: DORA CI/CD Correlation
description: How SEI correlates data between CI and CD stages for measuring Lead Time
sidebar_position: 15
sidebar_label: CI/CD Correlation
redirect_from:
    - /docs/software-engineering-insights/sei-metrics-and-reports/dora-metrics/dora-ci-cd-correlation
---

SEI can connect to one or more CI/CD integrations. The jobs and executions are normalized and can be correlated across multiple sources. For example, you could be using Jenkins as your CI platform and Harness as the CD.

This topic explains how SEI correlates CI and CD stages in the Lead Time workflow for different tool combinations.

The correlation between CI & CD execution is built on **generated artifacts (by CI execution)** and **consumed artifacts (by CD execution)**. At this time, only container image-type artifacts are supported.

## Requirements

The CI/CD correlation on SEI completely depends upon the artifact information. It is important to ensure SEI receives the artifact data as part of the CI/CD pipeline executions in your software delivery lifecycle. SEI primarily supports correlation for container image-based artifacts. For other artifact types, ensure unique creation of artifact names.

To set up correct correlation between CI and CD stages in SEI when measuring Lead Time, the following information is needed:

* **Artifact Location ->** Where the artifact is stored (e.g., a Docker repository) (Repository Name)
* **Artifact Name ->** The name or path of the artifact (Artifact Path) 
* **Artifact Qualifier ->** A unique identifier for the artifact (often a tag or version number)

:::info
Note that for accurate correlation, every CI and CD execution must have a unique combination of artifact name and qualifier.
:::

## Supported integrations mapping

Please refer to the table below for the complete list of CI/CD mapping across different tools that are currently supported in the Lead Time workflow.

<table>
  <thead>
    <tr>
      <th width="300px">CI Tool</th>
      <th width="300px">CD Tool</th>
      <th width="300px">Effort Involved by User</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="300px">Jenkins</td>
      <td width="300px">Jenkins</td>
      <td width="300px">Requires Custom Scripts in all Jenkins Pipelines</td>
    </tr>
    <tr>
      <td width="300px">Jenkins</td>
      <td width="300px">Harness CD</td>
      <td width="300px">Requires Custom Scripts in all Jenkins Pipelines + Harness CD artifact configuration</td>
    </tr>
    <tr>
      <td width="300px">Harness CI</td>
      <td width="300px">Harness CD</td>
      <td width="300px">Harness CD artifact configuration</td>
    </tr>
    <tr>
      <td width="300px">Github Actions</td>
      <td width="300px">Harness CD</td>
      <td width="300px">GHA workflow configuration + Harness CD artifact configuration</td>
    </tr>
    <tr>
      <td width="300px">Custom CI</td>
      <td width="300px">Harness CD</td>
      <td width="300px">Requires the Custom CI tool to send artifact information using the custom CI/CD integration + Harness CD artifact configuration</td>
    </tr>
    <tr>
      <td width="300px">Custom CI</td>
      <td width="300px">Custom CD</td>
      <td width="300px">Requires the Custom CI tool to send artifact information using the custom CI/CD integration + Custom CD tool to send the same artifact information that is being deployed</td>
    </tr>
  </tbody>
</table>

## Jenkins CI with Jenkins CD

This section explains how SEI correlates CI and CD stages in the Lead Time workflow when both the CI and CD tool used is Jenkins.

SEI offers two primary methods for integrating Jenkins into your DORA CI/CD correlation workflow:

* [SEI Jenkins Plugin](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/jenkins/jenkins-plugin) 
* [Jenkins plugin with a Custom CI/CD API](#jenkins-ci-with-harness-cd)

Understanding when and how to use each method is crucial for effective implementation of DORA metrics in your development process.

### SEI Jenkins Plugin

The SEI Jenkins Plugin is designed for straightforward integration when Jenkins serves as your primary CI/CD tool. It supports Lead Time, Deployment Frequency and Change Failure Rate configuration. It's ideal for teams who are comfortable with a single-stage configuration for both CI and CD processes and don't require separate metrics for these stages.

To use the plugin, simply install it from the [Jenkins plugin store](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/jenkins/jenkins-plugin) and configure it within your Jenkins environment. Once set up, the plugin automatically sends pipeline execution data for all CI/CD pipelines to SEI. In your SEI workflow profile, you'll need to configure a single stage that represents both CI and CD.

While the plugin offers ease of use, it comes with limitations.

* It doesn't differentiate between CI and CD stages, which may not fit all workflow needs.
* It's best suited for setups where Jenkins handles both CI and CD and where granular separation of these stages in the Lead Time metric isn't a priority.

### Custom CI/CD API

The Jenkins plugin does not natively capture data for CI and CD executions, which means that artifact information—used as the correlation pointer for Lead Time—is not automatically sent to SEI.

To measure CI and CD data separately for Lead Time, it's recommended to configure your Jenkins pipelines to send artifact details for both CI and CD stages using the [Custom CI/CD API endpoint](#using-custom-cicd-api).

For detailed instructions on how to use this endpoint, refer to [Using Custom CI/CD API](#using-custom-cicd-api).

## Jenkins CI with Harness CD

This section explains how SEI correlates CI and CD stages in the Lead Time workflow when the CI tool is Jenkins and CD tool used is Harness CD.

### Jenkins with Custom CI/CD API

For more complex setups, particularly those involving multiple tools or requiring distinct CI and CD metrics, the custom integration approach is the way to go. This approach is especially useful when you're using Jenkins for CI but a different tool, such as Harness, for CD.

Implementing this involves creating a [Custom CI/CD integration](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/custom-cicd/sei-custom-cicd-integration) in SEI and adding custom script logic to your Jenkins pipeline. This script sends build artifact information to SEI via a POST request.

We suggest a standardized, maintainable approach:

* Use Jenkins environment variables (e.g. `env.JOB_NAME`, `env.BUILD_NUMBER`) to dynamically construct payloads
* Follow a reusable script pattern that can be copied across jobs or teams
* Ensure all required fields are captured, to enable proper correlation across CI, CD, and SCM in SEI
* Ensure unique build execution i.e. `job_full_name + build_number` must be globally unique across Jenkins instances.

:::info
Note that if you have multiple jenkins instances, connect with [Harness Engineering](/docs/software-engineering-insights/sei-support) to get unique instance IDs for each instance.
:::

To ensure accurate mapping in SEI, your payload must include the following fields:

| Field            | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `pipeline`       | Name of your Jenkins job. Note that if your pipeline/job names are dynamic, use `env.JOB_NAME` |
| `job_full_name`  | Full Jenkins job path (use `env.JOB_NAME`)                                 |
| `qualified_name` | Same as `job_full_name`                                                     |
| `build_number`   | Jenkins build number (`env.BUILD_NUMBER`)                                  |
| `user_id`        | Committer or trigger user                                                   |
| `instance_name`  | Name of the Jenkins instance                                                |
| `instance_guid`  | Unique ID assigned by Harness for the instance                             |
| `instance_url`   | Jenkins base URL                                                            |
| `start_time`     | Epoch (milliseconds) of job start                                           |
| `duration`       | Duration in milliseconds                                                    |
| `result`         | Job result: `"success"`, `"failure"`, etc.                                  |
| `scm_commit_ids` | List of Git SHAs                                                            |
| `ci` / `cd`      | Set flags appropriately (boolean)                                           |
| `artifacts`      | Metadata about deployed or built artifacts                                  |

#### Artifact Metadata

```json
{
  "input": boolean,
  "output": boolean,
  "type": "artifact_type",
  "location": "<ARTIFACT_LOCATION>",
  "name": "<ARTIFACT_NAME>",
  "qualifier": "<ARTIFACT_QUALIFIER>"
}
```

After setting this up, you'll need to configure Harness CD to consume the artifact information you've sent to SEI. The following details are required to be met in order to set the correlation between Jenkins and Harness CD.

* In your pipeline ensure that you’re using the **Deploy Stage** in Harness CD for artifact deployment.

![](./static/deploy-stage.jpeg)

* Configure the correct [**Artifact Source**](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources) for the service.

![](./static/artifact-source.png)

* Refer to the same **Artifact Source** that is configured in the pipeline service while deploying the artifact. Deploying an artifact for which the Artifact Source is not configured will result in failure while correlating the CI/CD stage in SEI

Note that SEI natively supports correlation for container image based artifacts. For other artifact types some changes might be required in the Jenkins shell script to ensure unique creation of artifact names.

In your [SEI workflow profile](/docs/software-engineering-insights/propelo-sei/setup-sei/sei-profiles/workflow-profiles/dora-profile), you can then set up separate stages for CI and CD, ensuring correct correlation between the two.

The primary advantage of this approach is flexibility. It allows for distinct CI and CD stages to be configured in the workflow profile allowing you to measure CI and CD lead time separately. However, it does require more setup and maintenance compared to the plugin approach.

:::info
Note that for correct correlation of CI and CD it is important to for every CI and CD execution to have unique combination of artifact name and qualifier.
:::

## Harness CI with Harness CD

This section explains how SEI correlates CI and CD stages in the Lead Time workflow when the CI tool is Harness CI and CD tool used is Harness CD.

In this scenario it is important to ensure both pipelines are using the same artifact source. The following details are required to be met in order to set the correlation between Harness CI and Harness CD.

* In your pipeline ensure that you’re using the **Deploy Stage** in Harness CD for artifact deployment.

![](./static/deploy-stage.jpeg)

* Configure the correct [**Artifact Source**](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources) for the service.

![](./static/artifact-source.png)

* Refer to the same **Artifact Source** that is configured in the pipeline service while deploying the artifact. Deploying an artifact for which the Artifact Source is not configured will result in failure while correlating the CI/CD stage in SEI

:::info
Note that SEI natively supports correlation for container image based artifacts. For other artifact types some changes might be required to ensure unique creation of artifact names.
:::

## Github Actions with Harness CD

This section explains how SEI correlates CI and CD stages in the Lead Time workflow when the CI tool is Github Actions and CD tool used is Harness CD.

You can set up a [GitHub Actions workflow](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/github-actions/sei-github-actions#ingest-artifacts-and-environment-variable-data)to allow SEI to ingest the data for the artifacts and environment variables from GitHub Actions. To learn more, go to [Github Actions integration](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/github-actions/sei-github-actions).

In this scenario it is important to ensure both pipelines are using the same artifact source. The following details are required to be met in order to set the correlation between Harness CI and Harness CD.

* In your pipeline ensure that you’re using the **Deploy Stage** in Harness CD for artifact deployment.

![](./static/deploy-stage.jpeg)

* Configure the correct [**Artifact Source**](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources) for the service.

![](./static/artifact-source.png)

* Refer to the same **Artifact Source** that is configured in the pipeline service while deploying the artifact. Deploying an artifact for which the Artifact Source is not configured will result in failure while correlating the CI/CD stage in SEI

:::note
Note that SEI natively supports correlation for container image based artifacts. For other artifact types some changes might be required to ensure unique creation of artifact names.
:::

## Using Custom CI/CD API

If you use custom CI/CD tools or Jenkins as both your CI and CD tool but want to track CI and CD metrics separately, you can use the Custom CI/CD API. This API allows you to send detailed artifact and pipeline execution data to SEI, allowing accurate correlation between CI and CD stages. This is particularly useful when you're using tools that are not natively supported by SEI.

This API can be used to send information related to the artifacts generated during the CI process and those deployed during the CD process. Artifacts act as the mandatory reference point to correlate CI and CD stages when measuring Lead Time.

### Payload

We suggest a standardized, maintainable approach:

* Use Jenkins environment variables (e.g. `env.JOB_NAME`, `env.BUILD_NUMBER`) to dynamically construct payloads
* Follow a reusable script pattern that can be copied across jobs or teams
* Ensure all required fields are captured, to enable proper correlation across CI, CD, and SCM in SEI
* Ensure unique build execution i.e. `job_full_name + build_number` must be globally unique across Jenkins instances.

:::info
Note that if you have multiple jenkins instances, connect with [Harness Engineering](/docs/software-engineering-insights/sei-support) to get unique instance IDs for each instance.
:::

To ensure accurate mapping in SEI, your payload must include the following fields:

| Field            | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `pipeline`       | Name of your Jenkins job. Note that if your pipeline/job names are dynamic, use `env.JOB_NAME` |
| `job_full_name`  | Full Jenkins job path (use `env.JOB_NAME`)                                 |
| `qualified_name` | Same as `job_full_name`                                                     |
| `build_number`   | Jenkins build number (`env.BUILD_NUMBER`)                                  |
| `user_id`        | Committer or trigger user                                                   |
| `instance_name`  | Name of the Jenkins instance                                                |
| `instance_guid`  | Unique ID assigned by Harness for the instance                             |
| `instance_url`   | Jenkins base URL                                                            |
| `start_time`     | Epoch (milliseconds) of job start                                           |
| `duration`       | Duration in milliseconds                                                    |
| `result`         | Job result: `"success"`, `"failure"`, etc.                                  |
| `scm_commit_ids` | List of Git SHAs                                                            |
| `ci` / `cd`      | Set flags based on the pipeline type (boolean)                                           |
| `artifacts`      | Metadata about deployed or built artifacts                                  |

#### Artifact Metadata

```json
{
  "input": boolean,
  "output": boolean,
  "type": "artifact_type",
  "location": "<ARTIFACT_LOCATION>",
  "name": "<ARTIFACT_NAME>",
  "qualifier": "<ARTIFACT_QUALIFIER>"
}
```

For more information refer to the documentation on setting up [Custom CI/CD integration](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/custom-cicd/sei-custom-cicd-integration). It is recommended to configure the custom CI/CD integration with assistance from [Harness Support](mailto:support@harness.io) to ensure the configuration meets the requirements for CI/CD correlation in lead time.

:::info IMPORTANT NOTE
* SEI natively supports correlation for container image-based artifacts. For other artifact types, modifications may be necessary to ensure unique creation of artifact names.
* For correct correlation of CI and CD, it is crucial that every CI and CD execution has a unique combination of artifact name and qualifier.
:::
