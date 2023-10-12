---
title: Connect to the Harness container image registry
description: There are multiple ways to pull required Harness images.
sidebar_position: 4
helpdocs_topic_id: my8n93rxnw
helpdocs_category_id: o1zhrfo8n5
helpdocs_is_private: false
helpdocs_is_published: true
---

When you run a Harness CI pipeline, the Harness Delegate makes an anonymous outbound connection, through a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference.md), to pull the required CI images from the public registry where they are stored. The [Harness CI images](/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci.md) are used for backend processes only.

The default behavior uses anonymous access and pulls images from a public container registry. This topic describes three ways you can modify the default behavior for pulling Harness images:

<!-- no toc -->
* [Always use credentials instead of anonymous access](#configure-harness-to-always-use-credentials-to-pull-harness-images)
* [Use credentials for specific stages](#use-credentials-to-pull-harness-images-for-specific-stages)
* [Pull images from a private registry](#pull-harness-images-from-a-private-registry)

:::tip Rate Limiting

To prevent rate limiting or throttling issues when pulling images, using credentials, instead of anonymous access, and configure the default Harness Docker connector to pull images from GRC. For instructions, go to [Configure Harness to always use credentials to pull Harness images](#configure-harness-to-always-use-credentials-to-pull-harness-images).

:::

## Configure Harness to always use credentials to pull Harness images

If you don't want to connect anonymously, you can configure Harness to always use credentials, instead of anonymous access, to pull the Harness images. This option changes the behavior for your entire account by editing the credentials of the built-in **Harness Docker Connector**. This is useful if your organization's security policies don't allow anonymous connections to public image repos.

If you don't want to change the behavior for your entire account, you can [Use credentials to pull Harness images for specific stages](#use-credentials-to-pull-harness-images-for-specific-stages).

This option requires [permissions](../../role-based-access-control/permissions-reference) to create, edit, and view connectors at the account [scope](/docs/platform/role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

1. Go to **Account Settings**, select **Account Resources**, and then select **Connectors**.
2. Select the **Harness Docker Connector** (Id: `harnessImage`).

   If there is no connector with the `harnessImage` identifier in your Account, you need to [create a Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) with the exact **Id** of `harnessImage`. Harness gives precedence to the connector with the `harnessImage` identifier and uses it to pull the images.

3. Select **Edit Details**.
4. Select **Continue** to go to the **Details** settings.
5. **Recommended:** To pull images from the [Harness project on GCR](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness) instead of Docker Hub, do the following:

   * For **Provider Type**, select **Other (Docker V2 compliant)**.
   * For **Docker Registry URL**, enter `gcr.io/gcr-prod`.

6. For **Authentication**, select **Username and Password**, and provide a username and token to access Docker Hub or GCR,depending on the **Docker Registry URL**. The token needs **Read, Write, Delete** permissions.
7. Select **Continue** to go to **Select Connectivity Mode**, and then configure the connector to connect through a Harness Delegate or the Harness Platform.

   * If you plan to use this connector with [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md), you must select **Connect through Harness Platform**.
   * If you select **Connect through a Harness Delegate**, you can allow Harness to use any available delegate or specify delegates based on tags. For more information about how Harness selects delegates, go to [Delegate overview](/docs/platform/delegates/delegate-concepts/delegate-overview.md) and [Use delegates selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors.md).
   * For delegate installation instructions, go to [Delegate installation overview](../../delegates/install-delegates/overview).

8. Select **Save and Continue**, wait for the connectivity test to run, and then select **Finish**.

   If the connectivity test fails, make sure your connector's credentials are configured correctly and that the token has the necessary permissions.

   ![](../../connectors/static/connect-to-harness-container-image-registry-using-docker-connector-48.png)

## Use credentials to pull Harness images for specific stages

If you don't want to connect anonymously, you can configure Harness to use credentials, instead of anonymous access, to pull the Harness images for specific stages in your pipelines. This option lets you override the Harness image pull behavior in individual [Build stages](/docs/continuous-integration/use-ci/prep-ci-pipeline-components.md#stages) by creating a dedicated [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) you can use for these specific use cases. This is useful when the delegate for that stage's build infrastructure can't anonymously access the public repo. For example, if the build infrastructure is running in a private cloud.

If you want to change the behavior for your entire account, you can [configure Harness to always use credentials to pull Harness images](#configure-harness-to-always-use-credentials-to-pull-harness-images).

This option requires [permissions](../../role-based-access-control/permissions-reference) to create, edit, and view connectors at the account [scope](/docs/platform/role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

1. Go to **Account Settings**, select **Account Resources**, and then select **Connectors**.

   Although you will select the connector at the stage scope, you must create the Docker connector at the account scope.

2. Select **New Connector**, and, under **Artifact Repositories**, select the **Docker Registry** connector.

   ![](../../connectors/static/connect-to-harness-container-image-registry-using-docker-connector-46.png)

3. Enter a **Name** for the connector. The **Description** and **Tags** are optional.

   Harness automatically generates the corresponding Id ([entity identifier](../../references/entity-identifier-reference.md)).
   If you want to override the account-level connector, modify the Id and set it to `harnessImage`. You must use the Id `harnessImage`.
   Harness gives precedence to the connector with the `harnessImage` identifier, and uses it to pull from the Harness Container Image Registry, as opposed to pulling from Docker Hub directly.

import Nameidlimit from '/docs/platform/shared/name-id-limit.md';

<Nameidlimit />

4. Click **Continue**.
   
   Harness automatically creates an **Id** ([entity identifier](../../references/entity-identifier-reference.md)) based on the **Name**. You can edit the **Id** while creating the connector only. After saving the connector, the **Id** can't be changed.

   ![](../../connectors/static/connect-to-harness-container-image-registry-using-docker-connector-47.png)

4. Select **Continue**.
5. For **Provider Type**, select **Other (Docker V2 compliant)**.
6. For **Docker Registry URL**, enter `gcr.io/gcr-prod`.
7. For **Authentication**, select **Username and Password**, and provide a username and token to access GCR. The token needs **Read, Write, Delete** permissions.
8. Select **Continue** to go to **Select Connectivity Mode**, and then configure the connector to connect through a Harness Delegate or the Harness Platform.

   * If you plan to use this connector with [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md), you must select **Connect through Harness Platform**.
   * If you select **Connect through a Harness Delegate**, you can allow Harness to use any available delegate or specify delegates based on tags. For more information about how Harness selects delegates, go to [Delegate overview](/docs/platform/delegates/delegate-concepts/delegate-overview.md) and [Use delegates selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors.md).
   * For delegate installation instructions, go to [Delegate installation overview](../../delegates/install-delegates/overview).

9. Select **Save and Continue**, wait for the connectivity test to run, and then select **Finish**.

   If the connectivity test fails, make sure your connector's credentials are configured correctly and that the token has the necessary permissions.

   ![](../../connectors/static/connect-to-harness-container-image-registry-using-docker-connector-48.png)

10. In the **Build** stage where you want to use your Docker connector, go to the [Infrastructure settings](/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings.md#infrastructure), and select your Docker connector in the **Override Image Connector** field.

   When the pipeline runs, Harness will use the specified connector to download images from the Harness project on GCR.

   ![](../../connectors/static/connect-to-harness-container-image-registry-using-docker-connector-49.png)

## Pull Harness images from a private registry

Harness CI images are stored in a public container registry. If you don't want to pull the images directly from the public registry, you can download the images to your own private registry, [specify the images that you want Harness to use](/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci.md#specify-the-harness-ci-images-used-in-your-pipelines), and then configure a Docker connector to pull the images from your private registry. For an example demonstrating how to do this, go to [Configure STO to download images from a private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry).
