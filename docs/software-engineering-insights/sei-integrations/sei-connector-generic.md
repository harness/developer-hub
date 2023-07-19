---
title: Generic SEI connector
description: Use the generic SEI connector when you can't use an application-specific SEI connector.
sidebar_position: 250
sidebar_label: Other integrations
---

Use the generic SEI connector for integrations that don't have an application-specific SEI connector or when your configuration doesn't support the application-specific SEI connector, including:

* On-premise tools and integrations that historically used *Ingestion Satellites*.
* The *Job Reporter Plugin* for Jenkins.
* Custom CI/CD integrations.
* Other tools that don't have an application-specific SEI connector.

## On-premise integrations (Ingestion Satellites)

For on-premise integrations, you need to use the generic SEI connector and install an Ingestion Satellite.

### Configure the connector

1. In your Harness project, go to the SEI module, select **Account**, and then select **SEI Connectors** under **Data Settings**.
2. Select **Available Connectors**, locate the generic SEI connector, and select **Install**.
3. Configure the connector.
4. When you reach the **Credentials** settings, select **Satellite integration**, and enter your credentials.

   These credentials are used to generate the Satellite configuration file.

   For on-prem Jira, you must use username and password credentials.

   For on-prem GitLab, you must use API key (personal access token) authentication.

5. Download the Satellite configuration file, `satellite.yml`.

### Run the Satellite container

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
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

### Update the Satellite

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

## Job Reporter plugin (Jenkins)

The [Job Reporter plugin](https://plugins.jenkins.io/propelo-job-reporter/) is a tool, written in Java, that sends reports about Jenkins builds to SEI. It monitors all job runs, and, when a job run completes (successfully or not), it sends information about job run (including any failure logs) to SEI. This plugin **doesn't** do periodic pushes.

The plugin gathers information about job stages and steps depending on the outcome and structure of the job:

* If a job run fails, and the job has no stages, then the plugin captures the job's failure logs.
* If a job run fails, and the job has stages but no steps, then the plugin captures failure logs for the failed stages.
* If a job run fails, and hte job has steps, then the plugin captures failure logs for the failed steps.
* The plugin doesn't capture logs for any successful jobs, stages, or steps.

To use this plugin, you need to use the generic SEI connector and install the plugin in Jenkins.

1. In Jenkins, select **Manage Jenkins**.
2. Select **Manage Plugins**.
3. Select the **Available plugins** tab, and search for `Job Reporter`.
4. Locate and install the **SEI Job Reporter** plugin. Select **Install without restart**.

   When plugin installation is complete, the status changes to success. If it doesn't change to success, you might need to restart.

5. In your Harness project, go to the SEI module, select **Account**, and then select **SEI Connectors** under **Data Settings**.
6. Select **Available Connectors**, locate the generic SEI connector, and select **Install**.
7. Configure the connector for Jenkins.

<details>
<summary>Plugin dependencies</summary>

The following table lists other Jenkins plugins for which the Job Reporter plugin has dependencies. It includes links to the plugins on the Jenkins plugins marketplace. These are in addition to required and implied dependencies listed on the [Job Reporter plugin's Jenkins plugin marketplace page](https://plugins.jenkins.io/propelo-job-reporter/dependencies/).


| Dependency name | Direct/Indirect dependency | Version |
| --------------- | -------------------------- | ------- |
| [Favorite](https://plugins.jenkins.io/favorite)| Indirect | 2.3.2 |
| [Variant](https://plugins.jenkins.io/variant)  | Indirect | 1.3   |
| [REST Implementation for Blue Ocean](https://plugins.jenkins.io/blueocean-rest-impl) | Direct | 1.23.2 |
| [Common API for Blue Ocean](https://plugins.jenkins.io/blueocean-commons) | Indirect | 1.23.2 |
| [REST API for Blue Ocean](https://plugins.jenkins.io/blueocean-rest) | Indirect | 1.23.2 |
| [Design Language](https://plugins.jenkins.io/jenkins-design-language) | Indirect | 1.23.2 |
| [Blue Ocean Core JS](https://plugins.jenkins.io/blueocean-core-js) | Indirect | 1.23.2 |
| [Web for Blue Ocean](https://plugins.jenkins.io/blueocean-web) | Indirect | 1.23.2 |
| [JWT for Blue Ocean](https://plugins.jenkins.io/blueocean-jwt) | Indirect | 1.23.2 |
| [Pipeline implementation for Blue Ocean](https://plugins.jenkins.io/blueocean-pipeline-api-impl) | Direct | 1.23.2 |
| [Pipeline SCM API for Blue Ocean](https://plugins.jenkins.io/blueocean-pipeline-scm-api) | Indirect | 1.23.2 |
| [HTML Publisher](https://plugins.jenkins.io/htmlpublisher) | Indirect | 1.23 |
| [Dashboard for Blue Ocean](https://plugins.jenkins.io/blueocean-dashboard) | Direct | 1.23.2 |
| [Pub-Sub "light" Bus](https://plugins.jenkins.io/pubsub-light)  | Indirect | 1.13 |

</details>

## Custom CI/CI integrations

SEI supports custom CI/CD integrations through webhooks.

1. Create a [Harness API key](/docs/platform/user-management/add-and-manage-api-keys/) to use for authorization.
2. Contact [Harness Support](mailto:support@harness.io) to get a UUID to identify your CI/CD system.
3. In your Harness project, go to the SEI module, select **Account**, and then select **SEI Connectors** under **Data Settings**.
4. Select **Available Connectors**, locate the generic SEI connector, and select **Install**.
5. Configure the connector for a custom CI/CD integration. Configure the webhook API call according to the [webhook specification](#webhook-specification).

### Webhook specification

* Summary: Post CI/CD data to SEI
* Method: POST
* Base URL: `https://api.levelops.io/v1/generic-requests`
* Header: Requires API key authorization. The content type is `application/json`
* Body: Contains a `data` object with `request_type` and `payload`.

<details>
<summary>Request example</summary>

```
// POST CICD data to Propelo
curl --location 'https://api.propelo.ai/v1/generic-requests' \
--header 'Authorization: Apikey <apikey> ' \
--header 'Content-Type: application/json' \
--data '{
    "request_type": "JenkinsPluginJobRunComplete",
    "payload": "{
        "pipeline":"Node.js CI",
        "triggered_by":"SCMTrigger",
        "execution_parameters":
            [{"type":"StringParameterValue","name":"version","value":1},
            {"type":"StringParameterValue","name":"revision","value":1}],
        "repo_url":"https://api.github.com/users/rajpropelo",
        "start_time":1680006843000,
        "result":"success",
        "duration":26000,
        "build_number":4543097378,
        "instance_guid":"24575de4-0baa-4575-8c94-9975c737008a",
        "instance_name":"Jenkins Instance",
        "instance_url":"https://jenkins.dev.levelops.io/",
        "job_run":null,
        "job_full_name":"Node.js CI--github action",
        "qualified_name":"Node.js CI--github action",
        "branch_name":"main",
        "module_name":null,
        "scm_commit_ids":["6ce2cfec186fbf9ae9429ad22e32e7770f1eb1fb"],
        "ci":true,
        "cd":false,
        "artifacts":
            [{"input":false,"output":true,"type":"container","location":"http://generated/image/location","name":"image1","qualifier":"1"}],
        "trigger_chain":[{"id":"SCMTrigger","type":"SCMTriggerCause"}]
        }"
}'
```

</details>

#### Payload fields

`payload` is an object with required and optional fields.

Required fields:

* `pipeline`: The name of the CI/CD job.
* `job_full_name`: Same as `pipeline`.
* `qualified_name`: Same as `pipeline`.
* `instance_name`: The CI/CD instance identifier (not the UUID).
* `instance_guid`: Your CI/CD instance UUID.
* `start_time`: Job start time in epoch milliseconds.
* `duration`: Job duration in seconds.
* `result`: Either `success` or `failure`.


Optional fields:

* `execution_parameters`: An array of key/value objects that can be used to send additional information about the pipeline or deployment.
* `scm_commit_ids`: An array of commit ids related to the deployment
* `triggered_by`
* `repo_url`
* `build_number`
* `instance_url`
* `job_run`
* `module_name`
* `ci` and `cd`: One is `true` and the other is `false`, depending on whether this is for a CI or a CD job.
* `artifacts`
* `trigger_chain`

<details>
<summary>Payload example</summary>

```json
'{
    "pipeline":"Node.js CI",
    "triggered_by":"SCMTrigger",
    "execution_parameters":[
        {"type":"StringParameterValue","name":"version","value":1},
        {"type":"StringParameterValue","name":"revision","value":1}
        ],
    "repo_url":"https://api.github.com/users/rajpropelo",
    "start_time":1680006843000,
    "result":"success",
    "duration":26000,
    "build_number":4543097378,
    "instance_guid":"24575de4-0baa-4575-8c94-9975c737008a",
    "instance_name":"Jenkins Instance",
    "instance_url":"https://jenkins.dev.levelops.io/",
    "job_run":null,
    "job_full_name":"Node.js CI--github action",
    "qualified_name":"Node.js CI--github action",
    "branch_name":"main",
    "module_name":null,
    "scm_commit_ids":["6ce2cfec186fbf9ae9429ad22e32e7770f1eb1fb"],
    "ci":true,
    "cd":false,
    "artifacts":[
        {"input":false,"output":true,"type":"container","location":"http://generated/image/location","name":"image1","qualifier":"1"}
        ],
    "trigger_chain":[
        {"id":"SCMTrigger","type":"SCMTriggerCause"}
        ]
}'
```

</details>
