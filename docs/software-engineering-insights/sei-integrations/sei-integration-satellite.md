---
title: Ingestion Satellites
description: Use Ingestion Satellites for on-prem SEI integrations.
sidebar_position: 260
sidebar_label: Ingestion Satellites
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Use Ingestion Satellites to integrate with on-premise tools and set up **Custom** integrations.

:::tip

In addition to Ingestion Satellites and other [integrations](./sei-integrations-overview.md), you can [import CSV files](../sei-propels-scripts/tables.md) and display the data in [Table reports](../sei-propels-scripts/table-reports.md).

:::

## Configure the integration

1. In your Harness project, go to the SEI module, select **Account**, and then select **SEI Integrations** under **Data Settings**.
2. Select **Available Integrations** and install the relevant integration.

   * For tools with a dedicated SEI integration, install that integration. Note that GitHub, GitLab, and Bitbucket have both **Cloud** and **Enterprise** options. The **Enterprise** option is for on-prem.
   * For tools without a dedicated integration, use the **Custom** integration. Support may be limited.

3. Configure the integration.

```mdx-code-block
<Tabs>
  <TabItem value="specific" label="Application-specific integrations" default>
```

For application-specific integrations, select **Satellite Integration** or **Use Satellite** when installing the integration. For details about a specific integration, refer to the integration's documentation. You can find a list of application-specific integrations on the [SEI integrations overview](./sei-integrations-overview.md).

Credentials specified in the integration configuration are used to generate the Satellite configuration file, `satellite.yml`.

* For on-prem Jira, you must use username and password credentials.
* For on-prem GitLab, you must use API key (personal access token) authentication.

After configuring the integration, download the Satellite configuration file, `satellite.yml`.

```mdx-code-block
  </TabItem>
  <TabItem value="custom" label="Custom integrations">
```

For the **Custom** integration, enter a **Name**, and then select **Install**. The Satellite configuration file, `satellite.yml`, is automatically downloaded.

```mdx-code-block
  </TabItem>
</Tabs>
```

<details>
<summary>Option: Use a proxy</summary>

The satellite can send its traffic to a proxy, with or without authentication.

Add the following `proxy` settings to the `levelops` section of the `satellite.yml` config file:

```yaml
levelops:
  ...
  proxy:
    host: YOUR_PROXY_IP_OR_DOMAIN ## Don't include schemes in `host` (such as https://), just domains.
    port: YOUR_PROXY_PORT
```

To use authentication, include the `username` and `password`:

```yaml
levelops:
  ...
  proxy:
    host: YOUR_PROXY_IP_OR_DOMAIN
    port: YOUR_PROXY_PORT
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

By default, only traffic to SEI is sent to the proxy. This means that connections to your internal integrations don't use the proxy. If you want to proxy all traffic, include `all_traffic: true`.

```yaml
levelops:
  ...
  proxy:
    host: YOUR_PROXY_IP_OR_DOMAIN
    port: YOUR_PROXY_PORT
    all_traffic: true
```

If the proxy uses `https`, then the connection only works with a valid SSL certificate. If you're using a self-signed certificate, you must supply the certificate to the satellite.

</details>

## Run the Satellite container

```mdx-code-block
<Tabs>
  <TabItem value="docker" label="Docker" default>
```

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

Do avoid storing data at rest in the clear, you can encrypt `satellite.yml`. The Satellite can read AES-256 encrypted config files. You must provide an environment variable with the encryption password.

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
   export ENCRYPTION_PASSWORD="<YOUR PASSWORD>"; docker run -d --restart unless-stopped \
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

</details>

4. If everything is working, run the container in the background by adding `-d --restart unless-stopped`.

   ```bash
   docker run -d --restart unless-stopped \
     -v /absolute/path/to/satellite.yml:/levelops/config.yml \
     levelops/ingestion-satellite
   ```

5. Optionally, add `--name levelops` to give the container a name. Use a unique name per container if you are running more than one.

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

```mdx-code-block
  </TabItem>
  <TabItem value="k8s" label="Kubernetes">
```

1. Use the following template to prepare the Kubernetes deployment.

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
```

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: levelops-satellite
  namespace: default ## It is recommended to change this.
  labels:
    app: levelops
```

```yaml
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
          memory: "512Mi"
          cpu: "1000m"
        volumeMounts:
          - name: config-volume
            mountPath: /levelops/config.yml
            subPath: config.yml
      volumes:
      - name: config-volume
      configMap:name: levelops-satellite-config
```

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: levelops-satellite-config
  namespace: default ## It is recommended to change this.
data: ## This section comes from satellite.yml. If you copy and paste this section, you must fix the indentation.
  config.yml: |
    levelops:
      tenant: <TENANT>
      api_key: <API_KEY>
    integrations:
      - id: '<ID>'
      application: custom
```

2. Apply the deployment to your cluster.

   ```bash
   kubectl apply --namespace=your-name-space -f deployment.yml
   ```

3. Make sure the satellite is running correctly. You should see heartbeats being sent.

   ```bash
   kubectl get pods --namespace=your-name-space ## Use this to find the pod.
   kubectl logs <satellite pod> -f --namespace=your-name-space
   ```

4. Because the template configured the deployment with `imagePullPolicy: Always`, you get the latest updates when the pod is restarted.

   ```bash
   kubectl rollout restart deployment levelops-satellite
   ```

```mdx-code-block
  </TabItem>
</Tabs>
```

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
