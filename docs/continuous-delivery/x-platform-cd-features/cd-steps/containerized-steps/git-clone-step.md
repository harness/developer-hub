---
title: Git Clone step
description: Clone a repository into the CD stage's workspace.
sidebar_position: 3
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

:::note

Currently, the Git Clone step in Deploy stages is behind the feature flag `CDS_CONTAINER_STEP_GROUP`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

Add a Git Clone step to clone a repository into the CD stage's workspace.

By cloning the repository, you gain access to the necessary code, scripts, or configurations, enabling you to perform various actions and ensure a reliable and controlled deployment.

<details>
<summary>Example uses cases for cloning a repository in a CD stage</summary>

1. **Accessing deployment scripts or configuration files**:
   - Cloning a repository allows you to access deployment scripts, configuration files, or other resources needed for the deployment process. By cloning the repository, you can ensure that the latest versions of these files are used in the deployment, providing consistency and avoiding potential issues caused by outdated or mismatched files.
2. **Retrieving application or infrastructure definitions**:
   - In cases where the CD process involves deploying an application or provisioning infrastructure, cloning the repository enables you to retrieve the application's source code or the infrastructure-as-code (IaC) definitions. By having the codebase or infrastructure definitions locally, you can perform necessary tasks such as building the application image or running tests.
3. **Branch or commit specific deployments**:
   - Cloning the repository allows for branch or commit-specific deployments. For instance, you might have a CD pipeline that triggers deployments based on specific branches, such as staging or release branches. By cloning the repository, you can isolate the relevant code for the specific branch or commit and perform targeted deployments.
4. **Performing custom build or pre-deployment actions**:
   - Cloning a repository provides the opportunity to perform custom build or pre-deployment actions. These actions might involve running additional tests, compiling assets, generating documentation, or preparing the application or infrastructure for deployment. By cloning the repository, you have full control over the deployment process and can add any necessary steps before deploying.
5. **Verifying deployment artifacts**:
   - Cloning the repository allows you to verify the integrity and consistency of the deployment artifacts. By comparing the cloned repository with the expected state or predefined configurations, you can ensure that the correct files and versions are being deployed, reducing the risk of deploying incorrect or unauthorized code or configurations.

</details>

## Add the Git Clone step

The Git Clone step uses a containerized step group. For more information, go to [Containerize step groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups.md).


```mdx-code-block
<Tabs>
  <TabItem value="YAML" label="YAML" default>
```

```
- step:
   type: GitClone
   name: GitClone_1
   identifier: GitClone_1
   spec:
     connectorRef: account.GitConnectorBzGN8G1COj
     repoName: myrepo
     build:
       type: branch
       spec:
         branch: main
```

```mdx-code-block
  </TabItem>
  <TabItem value="Harness Manager" label="Harness Manager">
```

1. In your Harness Deploy stage, in **Execution**, select **Add Step**.
2. Select **Git Clone**.
3. Configure the steps using the settings described below.

```mdx-code-block
  </TabItem>
</Tabs>
```

## Connector

Select a connector for the source control provider hosting the code repository that you want the step to clone.

The following topics provide more information about creating code repo connectors:

* Azure Repos: [Connect to Azure Repos](https://developer.harness.io/docs/platform/Connectors/Code-Repositories/connect-to-a-azure-repo)
* Bitbucket: [Bitbucket connector settings reference](https://developer.harness.io/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/bitbucket-connector-settings-reference)
* GitHub: [GitHub connector settings reference](https://developer.harness.io/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference)
* GitLab: [GitLab Connector Settings reference](https://developer.harness.io/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-lab-connector-settings-reference)
* Other Git providers:
  * [Git connector settings reference](https://developer.harness.io/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-connector-settings-reference)
  * [Connect to an AWS CodeCommit Repo](https://developer.harness.io/docs/platform/Connectors/Code-Repositories/connect-to-code-repo)

## Repository Name

If the connector's [URL Type](https://developer.harness.io/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-connector-settings-reference#url-type) is **Repository**, then **Repository Name** is automatically populated based on the repository defined in the connector's configuration.

If the connector's URL Type is **Account**, then you must specify the name of the code repository that you want to clone into the stage workspace.

## Build Type, Branch Name, and Tag Name

For **Build Type**, select **Git Branch** if you want the step to clone code from a specific branch within the repository, or select **Git Tag** if you want the step to clone code from a specific commit tag. Based on your selection, specify a **Branch Name** or **Tag Name**.

:::tip

You can use [fixed values, runtime input, or variable expressions](https://developer.harness.io/docs/platform/references/runtime-inputs/) for the branch and tag names. For example, you can enter `<+input>` for the branch or tag name to supply a branch or tag name at runtime.

:::

## Clone directory

An optional target path in the stage workspace where you want to clone the repo.

## Depth

The number of commits to fetch when the step clones the repo.

The default depth is `0`, which fetches all commits from the relevant branch.

For more information, go to the [git clone documentation](https://git-scm.com/docs/git-clone).

## SSL Verify

If **True**, which is the default value, the pipeline verifies your Git SSL certificates. The stage fails if the certificate check fails. Set this to **False** only if you have a known issue with the certificate and you are willing to run your stages anyway.


## Set Container Resources

Maximum resource limits for containers that clone the codebase at runtime. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).


## Advanced settings

In **Advanced**, you can use the following options:

* [Conditional Execution](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
* [Failure Strategy](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
* [Looping Strategy](https://developer.harness.io/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](https://developer.harness.io/docs/platform/governance/policy-as-code/harness-governance-overview/)


