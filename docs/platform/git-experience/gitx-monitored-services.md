---
title: Store monitored services in Git
description: Use GitX to store and manage monitored service definitions in Git repositories.
sidebar_position: 3
keywords:
  - monitored service
  - GitX
  - git experience
  - continuous verification
tags:
  - git-experience
  - continuous-verification
---

:::note
This feature is behind the feature flag `CDS_CV_MS_GITX`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

Harness Continuous Verification monitored services can be stored as YAML files in your Git repositories using GitX. This enables version control, code review workflows, and branch-based development for your verification configurations. You can manage monitored services as code alongside your pipelines and services, making it easier to maintain consistency across environments and collaborate with your team through standard Git workflows.

## Before you begin

Before using GitX for monitored services, ensure you have the following:

- **Git connector:** A Harness Git connector configured for your repository. Go to [Code repo connectors](/docs/category/code-repo-connectors) to set up a connector.

- **Repository setup:** A Git repository with branch permissions and webhook configuration enabled for Harness.

- **Access permissions:** RBAC permissions to create and manage monitored services in Harness at the target scope.

---

## Store a new monitored service in Git

When creating a monitored service, you can choose to store it in Git instead of storing it inline in Harness.

1. In your Harness project, go to **Project Settings** (or **Organization Settings** or **Account Settings** depending on your scope), and select **Monitored Services**.

2. Select **New Monitored Service**.

3. In the **Overview** tab, enter the monitored service name, service, and environment details.

4. Under **Store Type**, select **Remote**. This indicates that the monitored service definition will be stored in Git.

5. Configure the Git repository settings:

   - **Git Connector:** Select the Harness Git connector that has access to your repository.
   - **Repository:** Enter the repository name where the monitored service YAML will be stored.
   - **File Path:** Specify the path within the repository where the monitored service YAML file will be created (for example, `.harness/monitored-services/prod-webapp.yaml`).
   - **Branch:** Enter the Git branch where the monitored service will be stored (typically `main` or `master`).

6. Configure your health sources and change sources as needed in the subsequent tabs.

7. Select **Save**.

Harness creates the monitored service in the specified Git repository at the file path you provided. The monitored service YAML file is committed to the branch with a commit message indicating the creation.

---

## Import an existing monitored service from Git

If you have monitored service YAML files already stored in your Git repository, you can import them into Harness.

1. In your Harness project, go to **Project Settings** (or **Organization Settings** or **Account Settings** depending on your scope), and select **Monitored Services**.

2. Select the dropdown arrow next to **New Monitored Service** and choose **Import From Git**.

3. In the **Import From Git** dialog, configure the Git repository settings:

   - **Git Connector:** Select the Git connector that has access to your repository.
   - **Repository:** Enter the repository name where the monitored service YAML is stored.
   - **Git Branch:** Enter the branch containing the monitored service YAML file.
   - **File Path:** Specify the path to the monitored service YAML file in the repository (for example, `.harness/monitored-services/prod-webapp.yaml`).

4. Select **Import**.

Harness reads the monitored service YAML from the specified Git location and creates the monitored service entity in Harness. The monitored service is registered as a remote (Git-stored) entity.

---

## Use monitored services from feature branches

When you store monitored services in Git, the Verify step in your pipelines can resolve monitored services from feature branches. This allows you to test verification configuration changes without merging them to the main branch.

When a pipeline executes from a feature branch using GitX, the Verify step can resolve the monitored service from the same branch. This ensures that your verification tests use the correct configuration for the code being deployed.

To use a monitored service from a feature branch:

1. Create or import a monitored service stored in Git as described in the previous sections.

2. Create a new branch in your Git repository (for example, `feature1`).

3. Update the monitored service YAML file in the feature branch with your changes.

4. Commit and push the changes to the feature branch.

5. When configuring the Verify step in your pipeline, you can select the branch from which to resolve the monitored service.

6. When you run the pipeline, the Verify step uses the monitored service configuration from the selected branch.

This workflow enables you to validate verification configuration changes in a feature branch environment before merging them to the main branch. You can test different thresholds, add new health sources, or experiment with verification settings without affecting production verification.

---

## View monitored service Git details

For Git-stored monitored services, you can view the Git repository details in the monitored services listing.

1. In your Harness project, go to **Project Settings** (or **Organization Settings** or **Account Settings** depending on your scope), and select **Monitored Services**.

2. The **Code Source** column in the monitored services listing shows whether each monitored service is stored **Inline** or **Repository** (Git).

Git-stored monitored services display a repository icon in the **Code Source** column, indicating that the monitored service configuration is stored in Git rather than inline in Harness.

---

## Next steps

After setting up GitX for monitored services, you can:

- Use monitored service templates stored in Git to standardize verification across services. Go to [Monitored service templates](/docs/continuous-delivery/verify/cv-concepts/templates) to create and manage templates.
- Configure continuous verification for your deployments. Go to [Verify deployments](/docs/continuous-delivery/verify/configure-cv/verify-deployments) to set up the Verify step in your pipelines.
- Review verification results and insights. Go to [Interpret verification results](/docs/continuous-delivery/verify/cv-results/interpret-metric-results) to understand how to analyze verification data.
