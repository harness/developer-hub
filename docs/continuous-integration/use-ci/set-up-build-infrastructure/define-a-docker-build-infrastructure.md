---
title: Set up a local runner build infrastructure
description: You can define a CI build infrastructure on any Linux or macOS host.
sidebar_position: 70
helpdocs_topic_id: xd8u17be5h
helpdocs_category_id: rg8mrhqm95
helpdocs_is_private: false
helpdocs_is_published: true
---

You can define a CI build infrastructure on any Linux or macOS host by installing a Harness Delegate and local runner. This is recommended for small, limited builds, such as a one-off build on your local machine. Consider [other build infrastructure options](/docs/category/set-up-build-infrastructure) for builds-at-scale.

The Docker Delegate is limited by the total amount of memory and CPU on the local host. Builds can fail if the host runs out of CPU or memory when running multiple builds. The Docker Delegate has the following system requirements:

* Default 0.5 CPU.
* Default 1.5GB. Ensure that you provide the minimum memory for the Delegate and enough memory for the host/node system.

## Install the Delegate

Use the following modifications along with the **Docker environment** instructions in [Install a Delegate](/docs/platform/Delegates/install-delegates/install-a-delegate):

* Add `-e DELEGATE_TAGS="<delegate-tag>"`. Use one of the following tags: `macos-amd64`, `macos-arm64`, `windows-amd64`, `linux-amd64`, `linux-arm64`.
* For macOS, add `-e RUNNER_URL=http://host.docker.internal:3000`.
* For Linux, add `--net=host` to the first line.
* For Windows, add `-e RUNNER_URL=http://<windows-machine-hostname-or-ip>:3000`. For Windows, the Drone Runner must run on a separate machine than the one that your Delegate runs on. This variable must point to the Drone Runner's machine.

Here's an example of an install script for Linux:

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

Make sure to create the delegate at the appropriate scope, such as the project level or account level.

## Install the Drone Runner

The Drone Runner service performs the build work. The Delegate needs the Runner to run CI builds.

1. Download a [Drone Runner executable](https://github.com/harness/drone-docker-runner/releases).
2. Enable execution permissions for the Runner. For example, on macOS you can run the following command:

   ```
   sudo chmod +x drone-docker-runner-darwin-amd64
   ```

3. Start the runner binary according to the OS:

   * On macOS, run `./drone-docker-runner-darwin-amd64 server`. You might have modify **Security and Privacy** settings to allow this app to run.
   * On Linux, run as `sudo`: `sudo ./drone-docker-runner-darwin-amd64 server`
   * On Windows, run `drone-docker-runner-windows-amd64.exe server`. You must run the Drone Runner `.exe` from a separate machine than the one that your Delegate is running on. Make sure to run this command on the appropriate machine.

## Set the pipeline's build infrastructure

Update the pipeline where you want to use the Docker delegate. You can use either the Visual or YAML pipeline editor.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual" default>
```

1. In the pipeline's **Build** stage, select the **Infrastructure** tab.
2. Select **Local** for the **Infrastructure**.
3. Select the relevant **Operating System** and **Architecture**.
4. Save your pipeline.

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML">
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
  </TabItem>
</Tabs>
```

## Troubleshooting

The delegate should connect to your instance after you finish the installation workflow above. If the delegate does not connect after a few minutes, run the following commands to check the status:

```
docker ps
docker logs --follow <docker-delegate-container-id>
```

The container ID should be the container with image name `harness/delegate:latest`.

Successful setup is indicated by a message such as `Finished downloading delegate jar version 1.0.77221-000 in 168 seconds`.
