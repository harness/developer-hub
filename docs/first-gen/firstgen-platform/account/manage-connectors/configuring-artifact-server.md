---
title: Add Artifact Servers
description: Connect your artifact servers with Harness.
# sidebar_position: 2
helpdocs_topic_id: 7dghbx1dbl
helpdocs_category_id: ll7h8ktlwe
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness integrates with many different types of repositories and artifact providers. We call these Artifact Servers, and they help Harness you pull your artifacts during deployments.

In this topic:

* [Before You Begin](#before_you_begin)
* [Review: Artifact Sizes and Limitations](#review_artifact_sizes_and_limitations)
* [Review: Add AWS S3 and Google Cloud Storage Artifact Servers](#review_add_aws_s3_and_google_cloud_storage_artifact_servers)
* [Review: Anonymous Access](#review_anonymous_access)
* [Add Platform-Specific Artifact Servers](#add_platform_specific_artifact_servers)

### Before You Begin

* See [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts).

### Review: Artifact Sizes and Limitations

Most artifacts are set up in Harness Services using only their metadata, but in some cases, like traditional deployments using ZIP, JAR, or WAR files, the files are uploaded to the Harness cloud.

Harness has a limit of a 1GB file upload. However, Harness directly streams from the artifact server if the file size is larger (even larger than 25GB).

For artifacts larger than 1GB, use the **Metadata Only** option in the Harness Service **Artifact Source** settings.

![](https://files.helpdocs.io/kw8ldg1itf/articles/7dghbx1dbl/1642545039479/clean-shot-2022-01-18-at-14-30-26-2-x.png)### Review: Add AWS S3 and Google Cloud Storage Artifact Servers

Amazon AWS and Google Cloud Platform are added to Harness as **Cloud Providers**, but they may also be used as artifact servers in a Harness Service.

You simply add them as Cloud Providers, and then when you are adding an artifact in a Harness Service, the AWS S3 and Google Cloud Storage options will be available.

Here is what the Artifact Source list looks like in a Harness service when AWS S3 and Google Cloud Storage have been as added as Cloud Providers:

![](https://files.helpdocs.io/kw8ldg1itf/articles/7dghbx1dbl/1538674447613/image.png)For information on how to add AWS and GCP as Cloud Providers, see [Add Cloud Providers](/article/whwnovprrb-infrastructure-providers).

### Review: Anonymous Access

The following Artifact Servers support anonymous access for Docker images:

* Docker Registry
* Nexus
* Artifactory

If you are using anonymous access to obtain the artifact for your Service, you should ensure that host running the Harness Delegate has view and read permissions and that the container specification for the deployment platform you are using is set up for anonymous access. For example:

* **Kubernetes** - Ensure that `imagePullSecrets` is removed from the container specification. For more information, see [Pull an Image from a Private Registry for Kubernetes](/article/g3bw9z659p-pull-an-image-from-a-private-registry-for-kubernetes). For Harness version 1 implementation of Kubernetes, `imagePullSecrets` is added by default. For version 2, `imagePullSecrets` is not added by default.
* **ECS** - By default, ECS uses anonymous access. To use a private registry, you must use the RepositoryCredentials property type in the Container Specification. For more information, see [Using Private Docker Registry Authentication](https://docs.harness.io/article/riu73ehy2m-ecs-services#using_private_docker_registry_authentication).

### Add Platform-Specific Artifact Servers

See the following topics for platform-specific Artifact Servers:

* [Add Azure DevOps Artifact Servers](/article/s4vi1cpfla-add-azure-dev-ops-artifact-servers)
* [Add Jenkins Artifact Servers](/article/qa7lewndxq-add-jenkins-artifact-servers)
* [Add Bamboo Artifact Servers](/article/feks6co940-add-bamboo-artifact-servers)
* [Add Docker Registry Artifact Servers](/article/tdj2ghkqb0-add-docker-registry-artifact-servers)
* [Add Nexus Artifact Servers](/article/6y6b8pkm12-add-nexus-artifact-servers)
* [Add Artifactory Artifact Servers](/article/nj3p1t7v3x-add-artifactory-servers)
* [Add Samba Server Artifact Servers](/article/o1ck4eay7a-add-smb-artifact-servers)
* [Add SFTP Artifact Servers](/article/3d1awjkw57-add-sftp-artifact-servers)
* [Add Helm Repository Artifact Servers](/article/0hrzb1zkog-add-helm-repository-servers)

You can also use a custom artifact source in a Harness Service that queries your artifact server via its API. See [Using Custom Artifact Sources](/article/jizsp5tsms-custom-artifact-source).

