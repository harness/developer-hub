---
title: Run the Satellite container
description: Guide on how to download, install, and run the Ingestion Satellite container using Docker / Kuberenetes on any operating systems.
sidebar_position: 2
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Use Ingestion Satellites to integrate with on-premise tools and set up **Custom** integrations.

:::info

The recommended memory for one container is 4GB to 6GB.

:::


<Tabs>
  <TabItem value="k8s" label="Kubernetes" default>


1. Requirements:

   * A running Kubernetes cluster.
   * `kubectl` command-line tool configured to communicate with your cluster.
   * Access to the `levelops/ingestion-satellite` Docker image.

2. Use the following template to prepare the Kubernetes deployment.

    ```yaml
    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRoleBinding
    metadata:
      name: levelops-satellite
    subjects:
      - kind: ServiceAccount
        name: levelops-satellite
        namespace: default
        apiGroup: ""
    roleRef:
      kind: ClusterRole
      name: edit
      apiGroup: rbac.authorization.k8s.io
    ---
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: levelops-satellite
      namespace: default ## It is recommended to change this.
      labels:
        app: levelops
    ---
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: levelops-satellite
      namespace: default ## It is recommended to change this.
    spec:
      selector:
        matchLabels:
          app: levelops-satellite
      template:
        metadata:
          labels:
            app: levelops-satellite
        spec:
          serviceAccountName: levelops-satellite
          containers:
            - name: levelops-satellite
              image: levelops/ingestion-satellite
              imagePullPolicy: Always
              resources:
                limits:
                  memory: "5Gi"
                  cpu: "1000m"
              volumeMounts:
                - name: config-volume
                  mountPath: /levelops/config.yml
                  subPath: config.yml
          volumes:
          - name: config-volume
            configMap:
              name: levelops-satellite-config
    ---
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: levelops-satellite-config
      namespace: default ## It is recommended to change this.
    data: ## This section comes from satellite.yml. If you copy and paste this section, you must fix the indentation.
      config.yml: |
        satellite:
          tenant: <TENANT>
          api_key: <API_KEY>
          url: <URL>
        integrations:
          - id: '<ID>'
    ```

3. Apply the deployment to your cluster.

   ```bash
   kubectl apply --namespace=your-name-space -f satellite.yml
   ```

4. Make sure the satellite is running correctly. You should see heartbeats being sent.

   ```bash
   kubectl get pods --namespace=your-name-space ## Use this to find the pod.
   kubectl logs <satellite pod> -f --namespace=your-name-space
   ```

5. Because the template configured the deployment with `imagePullPolicy: Always`, you get the latest updates when the pod is restarted.

   ```bash
   kubectl rollout restart deployment levelops-satellite
   ```
   To force a pod restart and get the latest updates, use the following command:
   
   ```bash
   kubectl rollout restart deployment levelops-satellite
   ```
   
   This ensures that your Satellite container stays up to date with the latest changes. Make sure to monitor the logs regularly to ensure the proper functioning of the container.


</TabItem>
  <TabItem value="docker" label="Docker">


1. Download and install Docker Desktop.

   * [Docker Desktop for Linux (Ubuntu)](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
   * [Docker Desktop for macOS](https://download.docker.com/mac/stable/Docker.dmg)
   * [Docker Desktop for Microsoft Windows](https://download.docker.com/win/stable/Docker%20Desktop%20Installer.exe)

:::tip

On Linux, add your user to the Docker group so that you can run Docker commands without `root` or `sudo`.

```bash
sudo usermod -aG docker $(whoami)
```

You need to log out and log back in for the change to take effect.

:::

2. Pull the latest version of the Ingestion Satellite container.

   ```bash
   docker pull levelops/ingestion-satellite
   ```

   If you aren't able to execute the `docker pull` command, you can manually [download the Ingestion Satellite image](https://hub.docker.com/r/levelops/ingestion-satellite) from Docker Hub and install it.

3. Run the Satellite container in the foreground.

   ```bash
   docker run \
     -v /absolute/path/to/satellite.yml:/levelops/config.yml \
     levelops/ingestion-satellite
   ```

<details>
<summary>Option: Encrypt satellite.yml</summary>

To avoid storing data at rest in the clear, you can encrypt `satellite.yml`. The Satellite can read AES-256 encrypted config files. You must provide an environment variable with the encryption password.

1. Use the following command to encrypt the configuration file. Edit the input path (`/absolute/path/to/input/satellite.yml`) and output path (`/path/to/output/satellite.yml.enc`) according to your environment.

   ```bash
   docker run -i --rm -v /absolute/path/to/input/satellite.yml:/levelops/input \
     --entrypoint /bin/bash levelops/ingestion-satellite \
     -c 'java -cp /levelops/satellite-agent.jar -Dloader.main=io.levelops.ingestion.agent.Encrypt org.springframework.boot.loader.PropertiesLauncher input' \
     > /path/to/output/satellite.yml.enc
   ```

2. There is no prompt, but you must enter your password in the terminal, and then press enter. When entering your password, it appears in plain text, but it isn't stored.
3. Run the `docker run` command with an encryption password environment variable.

   ```bash
   export ENCRYPTION_PASSWORD="<YOUR_PASSWORD>"; docker run -d --restart unless-stopped \
     -v /absolute/path/to/satellite.yml.enc:/levelops/config.yml \
     --env ENCRYPTION_PASSWORD \
     levelops/ingestion-satellite
   ```

If you need to make changes later on, you can use the following command to decrypt the configuration file. As before you must edit the input path and output path according to your environment. You'll also need to enter your password and press enter.

```bash
docker run -i --rm -v /absolute/path/to/input/satellite.yml.enc:/levelops/input \
  --entrypoint /bin/bash levelops/ingestion-satellite \
  -c 'java -cp /levelops/satellite-agent.jar -Dloader.main=io.levelops.ingestion.agent.Decrypt org.springframework.boot.loader.PropertiesLauncher input' \
  > /path/to/output/satellite.yml
```

</details>

<details>
<summary>Troubleshooting: Satellite can't find satellite.yml</summary>

Errors mentioning `${levelops.api_key}` indicate that the Satellite can't find the config file. This can happen with older versions of Docker that can experience issues when mounting single files. To resolve this issue:

1. Rename `satellite.yml` to `config.yml`, and then move the file into an empty folder.
2. On Linux, check that your user (not `root`) owns both the folder and file, and that permissions are not too restrictive (as with `chmod 755`).
3. Run the `docker run` command with the parent folder instead of the specific config file.

   ```bash
   docker run \
     -v /absolute/path/to/parent/folder:/levelops/config \
     -e CONFIG_FILE=/levelops/config/config.yml \
     levelops/ingestion-satellite
   ```

**For newer versions of Docker, make sure that you are using the full paths and not relative paths.**
For newer versions of Docker, it's essential to use full paths rather than relative paths when specifying file locations. Here's an example docker run command:

   ```bash
docker run \
  -v /absolute/path/to/parent/folder:/levelops/config \
  -e CONFIG_FILE=/levelops/config/config.yml \
  levelops/ingestion-satellite
   ```

</details>

4. If everything is working, run the container in the background by adding `-d --restart unless-stopped`.

   ```bash
   docker run -d --restart unless-stopped \
     -v /absolute/path/to/satellite.yml:/levelops/config.yml \
     levelops/ingestion-satellite
   ```

5. Optionally, add `--name sei` to give the container a name. Use a unique name per container if you are running more than one.

:::tip Manage background containers

These commands are helpful for managing background containers.

```bash
# list containers
docker container ls

# stop or restart container with ID
docker container stop <ID>
docker container restart <ID>

# delete container by ID
docker rm <ID>
```

:::


</TabItem>
</Tabs>