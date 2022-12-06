---
title: Add Container Images for Tanzu Deployments
description: Once you set up an Artifact Server, Harness can pull artifacts and add them to the Harness Service you will deploy to PCF.
sidebar_position: 30
helpdocs_topic_id: jxsna1a0mi
helpdocs_category_id: emle05cclq
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness integrates with many different types of repositories and artifact providers. We call these Artifact Servers, and they help you pull your artifacts into your Harness Applications.

Once you set up an Artifact Server, Harness can pull artifacts and add them to the Harness Service you will deploy to Tanzu Application Service (TAS, formerly PCF).

### Before You Begin

* See [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts).
* See [Connect to Your Target Tanzu Account](connect-to-your-target-pcf-account.md).
* [Tanzu Application Service (TAS) Quickstart](https://docs.harness.io/article/hy819vmsux-pivotal-cloud-foundry-quickstart)

### Step 1: Add an Artifact Server

For steps on setting up an Artifact Server, [Add Artifact Servers](https://docs.harness.io/article/7dghbx1dbl-configuring-artifact-server).

1. In Harness, click **Setup,** and then click **Connectors**.
2. Click **Artifact Servers**, and then click **Add Artifact Server**. Enter the following settings.

### Step 2: Type

Depending on your Artifact Server, select from the drop down list.

For this example, select **Artifactory**.

### Step 3: Display Name

Enter a name to identify the Artifact Server.

For example, **Artifactory Public**.

### Step 4: Artifactory URL

Enter the URL for the artifact server. For example, **https://harness.jfrog.io/harness**.

Enter the Username/Password if the repo is not anonymous.

### Step 5: Test and Submit

Click **Test** and the **Submit**.

If the test fails, that means the [Delegate](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation) can't connect to the Artifact Server URL.

Make sure that the host running the Delegate can make outbound connections to the Artifact Server URL.

### Step 6: Create the Harness Service

In your Harness Application, in Services, create a new Service.

Enter a name for the Service. For details on how Harness manages Tanzu app names, see [Tanzu App Naming](tanzu-app-naming-with-harness.md).

For the Service **Deployment Type**, select **Tanzu Application Services**.

![](./static/add-container-images-for-pcf-deployments-00.png)

Click **Submit**.

The new Service is created. Now you can add your container images as an artifact source.

### Review: Enable CF CLI 7

Currently, this feature is behind the Feature Flag `CF_CLI7`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.Enable this option if you want to use CF CLI 7. By default, Harness uses CF CLI 6.

Certain CLI commands have been changed between the CLI versions. See [Upgrading to CF CLI 7](https://docs.cloudfoundry.org/cf-cli/v7.html#table) from Cloud Foundry.

If you enable **Enable CF CLI 7**, the Harness Delegate will use that CLI version to execute the correct set of commands.

### Step 7: Add the Artifact Source to the Harness Service

The artifact source for your Harness Service is taken from one of the Artifact Servers that are compatible with TAS. For example, an AWS S3 artifact source.

Harness supports the following TAS artifact servers/types.

Metadata-only Sources:

* Jenkins
* AWS S3
* Artifactory (includes Docker)
* Nexus
* Bamboo

File-based Sources:

* Docker Registry
* Artifactory (Tgz files)
* Nexus (Tgz files)
* Google Container Service (GCS)
* AWS Elastic Container Registry (ECR)
* SMB
* SFTP
* Custom Repository

Harness supports any single file (non-folder) deployed using `cf push`. TAR, WAR, JAR, ZIP, and Docker are supported.Is your artifact in an unsupported format? See [Preprocess Tanzu Artifacts to Match Supported Types](preprocess-artifacts-to-match-supported-types.md).To add an artifact to your Harness TAS Service, do the following:

1. In your Service, click **Add Artifact Source**, and select the artifact source.
2. Configure the settings for the Artifact Source.

    Harness uses artifact metadata only. During deployment runtime, Harness passes the metadata to the target host(s) where it is used to obtain the artifact.

    Ensure that the target host has network connectivity to the Artifact Server. For more information, see [Service Types and Artifact Sources](https://docs.harness.io/article/qluiky79j8-service-types-and-artifact-sources).

3. Click **Submit**. The artifact is added to the Service.

Next we will describe our application and TAS routes using the Service **Manifests** section.

### Review: Docker Support in Artifact Sources

The following Harness Artifact Sources support Docker:

* Artifactory
* Google Container Registry (GCR)
* Amazon Elastic Container Registry (Amazon ECR)
* Docker Registry

For Artifactory, ensure you select the Use Docker Format option:

![](./static/add-container-images-for-pcf-deployments-01.png)

TAS treats Artifactory as private registry. Harness supports no authentication and Basic authentication. You can use either in your Artifactory repos.

For more information on how TAS supports Docker, see [Push a Docker Image from a Registry](https://docs.cloudfoundry.org/devguide/deploy-apps/push-docker.html#registry) from TAS.

### Next Steps

* [Adding and Editing Inline Tanzu Manifest Files](adding-and-editing-inline-pcf-manifest-files.md)
* [Upload Local and Remote Tanzu Resource Files](upload-local-and-remote-pcf-resource-files.md)

