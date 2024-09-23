---
title: Docker Connector Settings Reference
description: This topic provides settings and permissions for the Docker Connector.
# sidebar_position: 2
helpdocs_topic_id: u9bsd77g5a
helpdocs_category_id: 1ehb4tcksy
helpdocs_is_private: false
helpdocs_is_published: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This topic provides settings and permissions for the Docker connector. You can use this connector to connect to DockerHub, Harbor, Quay, and other Docker V2 compliant container registries, such as [GitHub Container Registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-ghcr.md).

:::info

* **Docker registry rate limits:** Harness is restricted by the limits of the Docker repo, such as [Docker Hub limits](https://docs.docker.com/docker-hub/download-rate-limit/) for pulling Docker images from Docker repos.
* **Docker Registries in Cloud Platforms:** The Docker connector is platform-agnostic and can be used to connect to any Docker container registry. Harness also provides first class support for registries in AWS and GAR through [AWS connectors](../add-aws-connector.md) and [Google Cloud Platform (GCP) connectors](../connect-to-google-cloud-platform-gcp.md).

:::

## Create a Docker connector

<Tabs>
  <TabItem value="Visual" label="Visual editor" default>

1. In Harness, go to **Account Settings**, **Organization Settings**, or **Project Settings**, depending on the [scope](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#permissions-hierarchy-scopes) at which you want to create the connector.
2. Select **Connectors**, select **New Connector**, and then select the **Docker Registry** connector.
3. Configure the Docker connector settings using the guidance provided in the sections below.
4. Select **Save and Continue**, wait for the connectivity test to run, and then select **Finish**.
5. In the list of connectors, make a note of your Docker connector's ID. When you need to reference this connector, use this ID in your pipeline YAML, such as `connectorRef: docker_connector_ID`.

</TabItem>
  <TabItem value="YAML" label="YAML editor">

You can create Docker connectors in the YAML editor. For example:

```yaml
connector:
  name: My Docker Connector
  identifier: mydockerconnector
  description: ""
  orgIdentifier: default
  projectIdentifier: default
  type: DockerRegistry
  spec:
    dockerRegistryUrl: https://docker.dev.harness.io/v2/
    providerType: DockerHub
    auth:
      type: Anonymous
    executeOnDelegate: true
```

</TabItem>
</Tabs>

## Connector metadata settings

* **Name:** Enter a name for this connector. Harness creates an [ID](/docs/platform//references/entity-identifier-reference.md) based on the name.
* **Description:** Optional text string.
* **Tags:** Optional [tags](/docs/platform/references/tags-reference.md).

## Provider type

Select the Docker registry platform: **DockerHub**, **Harbor**, **Quay** or **Other**.

If you select **Other**, the registry must be Docker V2 compliant.

## Docker Registry URL

The URL of the Docker registry. This is usually the URL used for your [docker login](https://docs.docker.com/engine/reference/commandline/login/) credentials.

* To connect to a public Docker Hub registry, use `https://index.docker.io/v2/`.
* To connect to a private Docker Hub registry, use `https://index.docker.io/v1/`. Learn [why](/kb/continuous-integration/continuous-integration-faqs#why-build-and-push-steps-dont-support-v2-api-urls).
* For other Docker registries, provide the relevant URL for your container registry provider. For example:
   * For GitHub Container Registry, provide the GHCR hostname and namespace, such as `https://ghcr.io/NAMESPACE`. The namespace is the name of a GitHub personal account or organization.
   * For JFrog Artifactory Docker registries, provide your JFrog instance URL, such as `https://mycompany.jfrog.io`. You can get this URL from the `docker-login` command on your repo's **Set Me Up** page.
   * For Sonatype Nexus Docker registries, provide the Nexus instance URL, such as `<nexus-hostname>:<repository-port>` or `<subdomain>.<nexus-hostname>`. For more information, see the Sonatype Nexus [Docker Authentication](https://help.sonatype.com/en/docker-authentication.html) documentation.

## Authentication

You can authenticate anonymously or by username and password.

<Tabs>
  <TabItem value="unpw" label="Username and password" default>

* **Username:** Enter the username for your Docker registry account.
* **Password:** Provide a [Harness encrypted text secret](/docs/platform/secrets/add-use-text-secrets) containing the password or token corresponding with the **Username**.
  * For Docker Hub and GHCR, use a personal access token with **Read, Write, Delete** permissions.
  * For JFrog Docker registries, provide a password.

:::info Docker registry permissions

Make sure the connected user account has *read permission for all repositories* as well as access and permissions to *pull images* and *list images and tags*.

For more information, go to the Docker documentation on [Docker Permissions](https://docs.docker.com/datacenter/dtr/2.0/user-management/permission-levels/).

:::

</TabItem>
  <TabItem value="anonymous" label="Anonymous">

Select **Anonymous** to pull images from public Docker registries with anonymous access. This option can encounter issues with limits, such as Docker Hub rate limiting.

If you use anonymous access with a Kubernetes deployment, make sure `imagePullSecrets` is removed from the container specification. This is standard Kubernetes behavior and not related to Harness specifically.

</TabItem>
</Tabs>

## Select connectivity mode

You can connect through a Harness Delegate or the Harness Platform. If you plan to use this connector with [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure), you must select **Connect through Harness Platform**.

:::tip

The **Secure Connect** option is for [Secure Connect with Harness Cloud](/docs/continuous-integration/secure-ci/secure-connect).

:::
