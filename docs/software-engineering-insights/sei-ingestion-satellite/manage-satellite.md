---
title: Manage Satellite
description: Guide on how to download, install, and run the Ingestion Satellite container using Docker on any operating systems.
sidebar_position: 4
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This topic outlines the steps to update and manage the versions of the Ingestion Satellite using Docker and Kubernetes.

## Update the Satellite

Use these commands if you need to update the Ingestion Satellite version.

```mdx-code-block
<Tabs>
  <TabItem value="Docker" label="Docker" default>
```

```bash
# Pull latest version
docker pull levelops/ingestion-satellite

# List containers and find the current satellite ID
docker container ls

# Stop and remove the old container. Replace <ID> accordingly.
docker container stop <ID>
docker rm <ID>>

# Run the container again. It uses the latest version. Replace the local path accordingly.
docker run -v   /local/path/to/satellite.yml:/levelops/config.yml   -d levelops/ingestion-satellite
```

If you aren't able to execute the `docker pull` command, you can manually [download the Ingestion Satellite image](https://hub.docker.com/r/levelops/ingestion-satellite) from Docker Hub and install it.

```mdx-code-block
  </TabItem>
  <TabItem value="k8s" label="Kubernetes">
```

```bash
# Find the name of the satellite deployment.
kubectl get deployments

# Restart the satellite deployment.
kubectl rollout restart deployment <deployment-name>
```

If you didn't change the default values in the template, the `deployment-name` is `levelops-satellite`, and you can use the following `restart` command:

```bash
kubectl rollout restart deployment levelops-satellite
```

```mdx-code-block
  </TabItem>
</Tabs>
```

Keeping the Ingestion Satellite up-to-date ensures that you benefit from the latest features, improvements, and security patches.