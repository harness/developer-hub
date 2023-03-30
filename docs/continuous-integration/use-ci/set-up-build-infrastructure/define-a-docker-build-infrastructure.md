---
title: Set up a local runner build infrastructure
description: You can define a CI build infrastructure on any Linux or macOS host.
sidebar_position: 70
helpdocs_topic_id: xd8u17be5h
helpdocs_category_id: rg8mrhqm95
helpdocs_is_private: false
helpdocs_is_published: true
---

You can define a CI build infrastructure on a Linux, macOS, or Windows host by installing a Harness Delegate and local Drone Runner. When the pipeline runs, the Drone Runners runs the build actions in the environment where it is installed. The Delegate handles communication between Harness and the Drone Runner.

Local runner build infrastructure is recommended for small, limited builds, such as a one-off build on your local machine. Consider [other build infrastructure options](/docs/category/set-up-build-infrastructure) for builds-at-scale.

The Docker Delegate is limited by the total amount of memory and CPU on the local host. Builds can fail if the host runs out of CPU or memory when running multiple builds. The Docker Delegate has the following system requirements:

* Default 0.5 CPU.
* Default 1.5GB. Ensure that you provide the minimum memory for the Delegate and enough memory for the host/node system.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Linux" label="Linux" default>
```
## Install the Delegate

Use the following modifications along with the **Docker environment** instructions in [Install a Delegate](/docs/platform/Delegates/install-delegates/overview):

* Add `--net=host` to the first line.
* Add `-e DELEGATE_TAGS="<delegate-tag>"`. Use one of the following tags: `linux-amd64` or `linux-arm64`.

Here's an example of an install script for Linux amd64:

```
docker run --cpus=1 --memory=2g --net=host \
  -e DELEGATE_NAME=docker-delegate \
  -e NEXT_GEN="true" \
  -e DELEGATE_TYPE="DOCKER" \
  -e ACCOUNT_ID=H5W8iol5TNWc4G9h5A2MXg \
  -e DELEGATE_TOKEN=ZWYzMjFmMzNlN2YxMTExNzNmNjk0NDAxOTBhZTUyYzU= \
  -e DELEGATE_TAGS="linux-amd64" \
  -e MANAGER_HOST_AND_PORT=https://app.harness.io harness/delegate:23.02.78306
```

Make sure to create the Delegate at the appropriate scope, such as the project level or account level.

## Install the Drone Runner

The Drone Runner service performs the build work. The Delegate needs the Runner to run CI builds.

1. Download a [Drone Runner executable](https://github.com/harness/drone-docker-runner/releases).
2. To use self-signed certificates, export `CI_MOUNT_VOLUMES` along with a comma-separated list of source paths and destination paths formatted as `path/to/source:path/to/destination`, for example:

   ```
   export CI_MOUNT_VOLUMES="[path/to/local/cert]:/etc/ssl/certs/ca-certificates.crt,[path/to/local/cert2]:/etc/ssl/certs/cacerts.pem"
   ```

3. Enable execution permissions for the Runner. For example:

   ```
   sudo chmod +x drone-docker-runner-linux-arm64
   ```

4. Start the runner binary. For example:

   ```
   sudo ./drone-docker-runner-linux-arm64 server
   ```

Here is an example of the three commands to install the Linux arm64 Drone Runner with self-signed certificates:

```
export CI_MOUNT_VOLUMES="[path/to/local/cert]:/etc/ssl/certs/cacerts.pem"
sudo chmod +x drone-docker-runner-linux-arm64
./drone-docker-runner-linux-arm64 server
```

```mdx-code-block
  </TabItem>
  <TabItem value="macOS" label="macOS">
```
## Install the Delegate

Use the following modifications along with the **Docker environment** instructions in [Install a Delegate](/docs/platform/Delegates/install-delegates/install-a-delegate):

* Add `-e DELEGATE_TAGS="<delegate-tag>"`. Use one of the following tags: `macos-amd64` or `macos-arm64`.
* Add `-e RUNNER_URL=http://host.docker.internal:3000`.

Here's an example of an install script for macOS amd64:

```
docker run --cpus=1 --memory=2g \
  -e DELEGATE_NAME=docker-delegate \
  -e NEXT_GEN="true" \
  -e DELEGATE_TYPE="DOCKER" \
  -e ACCOUNT_ID=H5W8iol5TNWc4G9h5A2MXg \
  -e DELEGATE_TOKEN=ZWYzMjFmMzNlN2YxMTExNzNmNjk0NDAxOTBhZTUyYzU= \
  -e DELEGATE_TAGS="macos-amd64" \
  -e RUNNER_URL=http://host.docker.internal:3000 \
  -e MANAGER_HOST_AND_PORT=https://app.harness.io harness/delegate:23.02.78306
```

Make sure to create the Delegate at the appropriate scope, such as the project level or account level.

## Install the Drone Runner

The Drone Runner service performs the build work. The Delegate needs the Runner to run CI builds.

1. Download a [Drone Runner executable](https://github.com/harness/drone-docker-runner/releases).
2. To use self-signed certificates, export `CI_MOUNT_VOLUMES` along with a comma-separated list of source paths and destination paths formatted as `path/to/source:path/to/destination`, for example:

   ```
   export CI_MOUNT_VOLUMES="[path/to/local/cert]:/etc/ssl/certs/ca-certificates.crt,[path/to/local/cert2]:/etc/ssl/certs/cacerts.pem"
   ```

3. Enable execution permissions for the Runner. For example:

   ```
   sudo chmod +x drone-docker-runner-darwin-amd64
   ```

4. To start the runner binary. For example:

   ```
   ./drone-docker-runner-darwin-amd64 server
   ```

   You might have modify **Security and Privacy** settings to allow this app to run.

Here is an example of the three commands to install the Darwin amd64 Drone Runner with self-signed certificates:

```
export CI_MOUNT_VOLUMES="[path/to/local/cert]:/etc/ssl/certs/cacerts.pem"
sudo chmod +x drone-docker-runner-darwin-arm64
./drone-docker-runner-darwin-arm64 server
```

```mdx-code-block
  </TabItem>
  <TabItem value="windows" label="Windows">
```

## Prepare machines

To configure a local runner build infrastructure for Windows, you need two machines:

* A Windows machine where the Drone Runner will run.
* A Linux machine where the Delegate will run.

## Install the Delegate

On the Linux machine where you want to run the Delegate, use the following modifications along with the **Docker environment** instructions in [Install a Delegate](/docs/platform/Delegates/install-delegates/install-a-delegate):

* Add `-e DELEGATE_TAGS="windows-amd64"`.
* Add `-e RUNNER_URL=http://[windows_machine_hostname_or_ip]:3000`.

:::caution

The `RUNNER_URL` must point to the Windows machine where the Drone Runner will run.

:::

Here's an example of the Delegate install script for a local runner Windows build infrastructure:

```
docker run --cpus=1 --memory=2g \
  -e DELEGATE_NAME=docker-delegate \
  -e NEXT_GEN="true" \
  -e DELEGATE_TYPE="DOCKER" \
  -e ACCOUNT_ID=H5W8iol5TNWc4G9h5A2MXg \
  -e DELEGATE_TOKEN=ZWYzMjFmMzNlN2YxMTExNzNmNjk0NDAxOTBhZTUyYzU= \
  -e DELEGATE_TAGS="windows-amd64" \
  `-e RUNNER_URL=http://[windows_machine_hostname_or_ip]:3000` \
  -e MANAGER_HOST_AND_PORT=https://app.harness.io harness/delegate:23.02.78306
```

Make sure to create the Delegate at the appropriate scope, such as the project level or account level.

## Install the Drone Runner

The Drone Runner service performs the build work. The Delegate needs the Runner to run CI builds.

:::caution

Run the Drone Runner executable on the Windows machine that you specified in the Delegate's `RUNNER_URL`.

:::

1. On the target Windows machine where you want to run the Drone Runner, download a [Drone Runner executable](https://github.com/harness/drone-docker-runner/releases).
2. Open a terminal with Administrator privileges.
3. To use self-signed certificates, set `CI_MOUNT_VOLUMES` along with a comma-separated list of source paths and destination paths formatted as `path/to/source:path/to/destination`, for example:

   ```
   SET CI_MOUNT_VOLUMES="[path/to/local/cert]:/etc/ssl/certs/ca-certificates.crt,[path/to/local/cert2]:/etc/ssl/certs/cacerts.pem"
   ```

4. Run the following command to start the runner binary:

   ```
   drone-docker-runner-windows-amd64.exe server
   ```

Here is an example of the two commands to install the Windows amd64 Drone Runner with self-signed certificates:

```
SET CI_MOUNT_VOLUMES="[path/to/local/cert]:/etc/ssl/certs/cacerts.pem"
./drone-docker-runner-windows-amd64 server
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Set the pipeline's build infrastructure

Update the pipeline where you want to use the Docker Delegate. You can use either the Visual or YAML pipeline editor.

```mdx-code-block
import Tabs2 from '@theme/Tabs';
import TabItem2 from '@theme/TabItem';
```
```mdx-code-block
<Tabs2>
  <TabItem2 value="Visual" label="Visual" default>
```

1. In the pipeline's **Build** stage, select the **Infrastructure** tab.
2. Select **Local** for the **Infrastructure**.
3. Select the relevant **Operating System** and **Architecture**.
4. Save your pipeline.

```mdx-code-block
  </TabItem2>
  <TabItem2 value="YAML" label="YAML">
```

In the pipeline's `Build` (`type: CI`) stage, replace the `infrastructure` line with specifications for `platform` and `runtime`, for example:

```yaml
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Docker
            spec: {}
```

* `platform`:
  * `os`: Specify `Linux`, `MacOS`, or `Windows`
  * `arch`: Specify `Amd64` or `Arm64`
* `runtime`:
  * `type`: `Docker`
  * `spec`: `{}`

```mdx-code-block
  </TabItem2>
</Tabs2>
```

## Troubleshooting

The Delegate should connect to your instance after you finish the installation workflow above. If the Delegate does not connect after a few minutes, run the following commands to check the status:

```
docker ps
docker logs --follow <docker-delegate-container-id>
```

The container ID should be the container with image name `harness/delegate:latest`.

Successful setup is indicated by a message such as `Finished downloading delegate jar version 1.0.77221-000 in 168 seconds`.
