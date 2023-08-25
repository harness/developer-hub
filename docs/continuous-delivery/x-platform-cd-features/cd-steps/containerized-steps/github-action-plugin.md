---
title: GitHub Action Plugin step
description: Run GitHub Actions in CD stages.
sidebar_position: 4
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

:::note

Currently, the GitHub Action Plugin step in Deploy stages is behind the feature flag `CDS_CONTAINER_STEP_GROUP`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

[GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) is a GitHub feature that enables you to automate various event-driven activities in GitHub, such as cloning a repository, generating Docker images, and testing scripts. You can find over 10,000 GitHub Actions on the [GitHub Marketplace](https://github.com/marketplace?type=actions) or create your own Actions.

You can use the **GitHub Action Plugin** step to run GitHub Actions in your Harness CD pipeline stages.

A Harness CD stage already performs deployments, and so you will not use GitHub Actions for image pulling and deployment to the cloud. You can still leverage GitHub Actions as a step in your pipeline to enhance and automate various aspects of your software deployment process. 

Here are some use cases for GitHub Actions in a Harness CD stage:

<details>
<summary>Examples of GitHub Actions in a CD stage</summary>

- **Image tagging and versioning**:
   * *Example GitHub Action*: `docker/metadata-action`.
   * *Trigger*: New image build or release creation.
   * *Workflow Steps*:
     * Generate version numbers or tags for the images based on the codebase or release information.
     * Update manifest files (e.g., Kubernetes deployment files, Docker Compose files) with the newly generated image tags.
     * Commit the updated manifest files back to the repository.
     * Optionally, trigger subsequent actions or notifications based on the updated manifest files.
- **Image scanning and vulnerability assessment**:
   * *Example GitHub Action*: `aquasecurity/trivy-action`.
   * *Trigger*: New image build or image upload to a container registry.
   * *Workflow Steps*:
     * Pull the image from the registry or directly access the image.
     * Run security scanning tools or vulnerability assessment tools against the image.
     * Generate a report highlighting any security vulnerabilities or policy violations found in the image.
     * Optionally, fail the workflow or send notifications based on the severity of the vulnerabilities.
- **Cloud environment configuration validation**:
   * *Example GitHub Action*: `terraform-docs/terraform-docs-action`.
   * *Trigger*: Changes to cloud infrastructure configuration files (e.g., Terraform, CloudFormation).
   * *Workflow Steps*:
     * Validate the cloud infrastructure configuration files for syntax errors, proper formatting, or compliance with best practices.
     * Perform a dry run or plan phase to preview the changes that will be applied to the cloud environment.
     * Optionally, validate specific configuration settings or policies using cloud provider APIs or CLI commands.
     * Provide feedback on the configuration validation results as comments on the pull request or as part of the workflow execution.
- **Image promotion across environments**:
   * *Example GitHub Action*: `juliangruber/approve-pull-request-action`.
   * *Trigger*: Promotion request or manual trigger.
   * *Workflow Steps*:
     * Retrieve the desired image version or tag from a container registry.
     * Update manifest files for different environments (e.g., staging, production) with the selected image version.
     * Commit the updated manifest files back to the repository.
     * Optionally, trigger notifications or additional actions to initiate environment-specific processes (e.g., testing, configuration updates).

:::note

Harness provides built-in scanning and vulnerability assessment using [Security Testing Orchestration](/docs/security-testing-orchestration).

:::

</details>


## Add the GitHub Action Plugin step

The GitHub Action Plugin step uses a containerized step group. For more information, go to [Containerize step groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups.md).


```mdx-code-block
<Tabs>
  <TabItem value="YAML" label="YAML" default>
```

```
- step:
    type: Action
    name: Action_1
    identifier: Action_1
    spec:
      uses: terraform-docs/terraform-docs-action
```


```mdx-code-block
  </TabItem>
  <TabItem value="Harness Manager" label="Harness Manager">
```

1. In your Harness Deploy stage, in **Execution**, select **Add Step**.
2. Select **Github Action Plugin**.
3. Configure the steps using the settings described below.

```mdx-code-block
  </TabItem>
</Tabs>
```

## Uses

Enter the name of the plugin or source code repository. For example, `terraform-docs/terraform-docs-action`.

Refer to the GitHub Action's README for information about branches and tags.


## Settings

If required by the Action, add key-value pairs representing GitHub Action settings. 

For example, you would specify `go-version: '>=1.17.0'` by entering `go-version` as the key and `>=1.17.0` as the value.

Most Actions require settings. Refer to the GitHub Action's `with` usage specifications in the Action's README for details about specific settings available for the Action that you want to use.

### Output variables from GitHub Actions steps

Output variables are exposed values that can be used by other, subsequent steps or stages in the pipeline. For GitHub Actions steps, `with`/**Settings** values are automatically exported as output variables, and you can fetch those values in later steps or stages in the same pipeline.

To reference an output variable in another step in the same stage, use either of the following expressions:

```
<+steps.STEP_GROUP_ID.steps.STEP_ID.output.outputVariables.SETTING_KEYNAME>
<+execution.steps.STEP_GROUP_ID.steps.STEP_ID.output.outputVariables.SETTING_KEYNAME>
```

:::caution

Github Actions settings keys can include `-`, which is not supported by JEXL. Therefore, you must wrap these variable names in quotes when using them in Harness expressions.

:::

<details>
<summary>YAML example: GitHub Actions output variable</summary>

In the following YAML example, the `setup_go` step uses a `go-version` setting, which is automatically exported as an output variable. The `beta` step includes two expressions referencing the `go-version` output variable.

```yaml
              - step:
                  type: Action
                  name: setup golang
                  identifier: setup_go
                  spec:
                    uses: actions/setup-go@v3
                    with:
                      go-version: `1.17`
              - step:
                  type: Run
                  name: beta
                  identifier: beta
                  spec:
                    shell: Sh
                    command: |-
                      echo <+steps.setup_go.output.outputVariables."go-version">
                      echo <+execution.steps.setup_go.output.outputVariables."go-version">
```

</details>

## Environment variables

If required by the Action, add key-value pairs representing environment variables that you want to pass to the GitHub Action. 

For example, you would specify `GITHUB_TOKEN: <+secrets.getValue("github_pat")>` by entering `GITHUB_TOKEN` as the key and `<+secrets.getValue("github_pat")>` as the value.

### Private Action repositories

If you want to use an Action that is in a private repository, you must provide the `GITHUB_TOKEN` environment variable. You need a [GitHub personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) that has pull permissions to the target repository. Additional permissions may be necessary depending on the Action's purpose.

Additional permissions might be necessary depending on the Action's purpose. You can use a variable expression such as `<+secrets.getValue("[SECRET_NAME]")>` to call a token stored as a Harness secret.

Refer to the GitHub Action's `env` usage specifications for details about specific settings available for the Action that you want to use. Note that `env` specifies incoming environment variables, which are separate from outgoing environment variables that may be output by the Action.

## Set Container Resources

Maximum resource limits for containers that clone the codebase at runtime. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).


## Advanced settings

In **Advanced**, you can use the following options:

* [Conditional Execution](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
* [Failure Strategy](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
* [Looping Strategy](https://developer.harness.io/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](https://developer.harness.io/docs/platform/governance/policy-as-code/harness-governance-overview/)
