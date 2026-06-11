---
title: Initial Configuration for Integrations
sidebar_label: Initial Configuration
description: Configure the Kubernetes connector, namespace, and Docker settings required to run catalog discovery integrations in Harness IDP.
sidebar_position: 1
---

import DocImage from '@site/src/components/DocImage';

Before you create catalog discovery integrations (say GitHub, PagerDuty, SonarQube and many more), you need to configure the infrastructure that runs the data collection tasks.

This is a one-time setup done from the **Integrations** section of IDP, and can be updated at any time.

:::info Points to remember
* If you attempt to create an integration without completing this initial configuration, your integration will not be created. Additionally, you may see an **Infra configuration required** notification in the Integrations section.
* Platform integrations like **Harness CD** run directly and do not require this setup.
:::


## Access the configuration

1. In Harness IDP, go to **Configure** → **Integrations**.

2. Click the **Configuration** button at the top.

    <DocImage path={require('./static/integrations-config.png')} />

3. The **Infra Configuration** panel opens with two steps in the sidebar: [Kubernetes Configurations](#kubernetes-configurations) and [Docker Configurations](#docker-configurations)

    <DocImage path={require('./static/infra-config.png')} />

---

## Kubernetes Configurations

Data collection for each integration runs as pods inside your Kubernetes cluster. IDP sends collection tasks to a [delegate](/docs/platform/delegates/delegate-concepts/delegate-overview) running in your cluster, which executes them using credentials stored in your own environment. The Kubernetes Configurations tell IDP which cluster and namespace to use for these pods.

<DocImage path={require('./static/k8s-connector-required.png')} />

1. In the **K8s Connector** field, pick an existing connector from your account or click **+ New Connector** to create one. Go to [Add a Kubernetes Cluster Connector](/docs/platform/connectors/cloud-providers/add-a-kubernetes-cluster-connector) to create a Kubernetes connector.

2. After selecting the connector, enter the **Namespace** where data collection pods will be spun up. This is a Kubernetes namespace and must already exist in the cluster before you configure this. 

    :::info
    The Harness delegate you are using (the one you set up when you created your K8s connector in Harness) must have permissions on this namespace.
    :::

3. Click **Continue** to proceed to [Docker Configurations](#docker-configurations).

---

## Docker Configurations

Data collection pods run as containers that need images to start. By default, IDP pulls these images from the public Harness container registry. 


:::tip
All fields in this section are optional. Configure them if any of the following apply:

- **Rate limiting**: Without credentials, Docker Hub throttles unauthenticated pulls after a number of requests. A Docker connector with credentials bypasses this limit.
- **Private registry**: If your organization's security policy prohibits pulling from public Docker Hub, you can mirror the required images to your private registry and point IDP to it here.
:::

<DocImage path={require('./static/docker-configurations.png')} />

1. In the **Docker Connector** field, select an existing Docker Registry connector or click **+ New Connector** to create one. Go to [Add a Docker Registry Connector](/docs/platform/connectors/artifact-repositories/connect-to-an-artifact-repo#add-a-docker-registry) to create a Docker Registry connector.

2. Under **Connector images**, you can specify custom image pull paths for these components:

    * **Individual Connector Images** (Bitbucket Cloud, GCP, GitHub, Datadog, Dynatrace, PagerDuty, ServiceNow, SonarQube): Only specify image paths (sample format: `<your-registry-url>/<image-name>:<image-tag-version>`) for the integrations you actually use. Leave all others blank.

    * **Lite Engine and Addon**: These two components are a must for every data collection run. IDP pulls them from the [public Harness registry](https://hub.docker.com/u/harness). If you do not wish to use the public images or your environment cannot access public Docker Hub, you must provide your custom image paths for these two components.
    
      <DocImage path={require('./static/docker-connector-images.png')} />

3. Click **Save**. The initial configuration is now complete and you may create your integrations successfully.