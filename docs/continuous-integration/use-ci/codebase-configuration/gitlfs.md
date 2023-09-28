---
title: Git Large File Storage
description: Use Run steps to install Git LFS and run git lfs commands.
sidebar_position: 40
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

The [Git Large File Storage (LFS)](https://git-lfs.com/) client is an extension for versioning large files, such as audio, video, datasets, and graphics.

To run `git lfs` commands, such as `git lfs clone`, in Harness CI, use **Run** steps to install the Git LFS client and run commands.

## Requirements

* You are familiar with Git LFS and you have already configured your repos for LFS.
* You have a CI pipeline with a **Build** stage. If you haven't created a pipeline before, try one of the [CI pipeline tutorials](../../ci-quickstarts/ci-pipeline-quickstart.md) or review [CI pipeline creation overview](../prep-ci-pipeline-components.md).

## Install the Git LFS client

You can use a **Run** step to install the Git LFS client into the build workspace.

With self-hosted build infrastructures, if the client is already installed on your host machine, skip to [Run git lfs commands](#run-git-lfs-commands).

With Harness Cloud build infrastructure, a version of Git LFS is already installed on Harness Cloud runners. For Harness Cloud image specs, go to [Use Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure). You can use a **Run** step to install a different version of the Git LFS client if you do not want to use the pre-installed version. Otherwise, skip to [Run git lfs commands](#run-git-lfs-commands).

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

1. In your pipeline's **Build** stage, add a **Run** step.
2. Enter a **Name** and optional **Description**.
3. Depending on the build infrastructure, you might need to specify a **Container Registry** connector, such as a Docker connector, and an **Image**, such as `curlimages/curl:latest`. For information about when these settings are required and how to specify images, go to [Use Run steps](../run-ci-scripts/run-step-settings.md).
4. For **Shell**, select **Sh**.
5. In the **Command** field, enter commands to get the [Git LFS Package Cloud repo](https://packagecloud.io/github/git-lfs) and install the package for your platform. For example, these commands install Git LFS 3.3.0 on Debian:

   ```sh
   curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
   sudo apt-get install git-lfs=3.3.0
   ```

   For information about these commands, select **Install** next to the relevant package on the [Git LFS Package Cloud repo](https://packagecloud.io/github/git-lfs), or go to the Git LFS documentation on [Installing Git LFS](https://github.com/git-lfs/git-lfs#installing).

6. Select **Apply Changes** to save the step, and then select **Save** to save the pipeline.

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

In your `CI` stage, add a `Run` step with the following settings:

* `type: Run`
* `name`: Enter a name for the step, such as `install gitlfs`.
* `identifier`: Enter an ID for the step, such as `install_gitlfs`.
* `connectorRef` and `image`: Depending on the build infrastructure, you might need to specify a `connectorRef`, such as a Docker connector, and an `image`, such as `curlimages/curl:7.73.0`. For information about when these settings are required and how to specify images, go to [Use Run steps](../run-ci-scripts/run-step-settings.md).
* `shell: Sh`
* `command`: Enter commands to get the [Git LFS Package Cloud repo](https://packagecloud.io/github/git-lfs) and install the package for your platform. For information about these commands, select **Install** next to the relevant package on the [Git LFS Package Cloud repo](https://packagecloud.io/github/git-lfs), or go to the Git LFS documentation on [Installing Git LFS](https://github.com/git-lfs/git-lfs#installing).

For example, this step installs Git LFS 3.3.0 on Debian:

```yaml
              - step:
                  type: Run
                  name: install gitlfs
                  identifier: install_gitlfs
                  spec:
                    connectorRef: account.harnessImage ## Specify a container registry connector, if required.
                    image: curlimages/curl:latest ## Specify an image, if required.
                    shell: Sh
                    command: |- ## Use commands for your platform.
                      curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
                      sudo apt-get install git-lfs=3.3.0
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Run git lfs commands

These examples show how to use a **Run** step to run `git lfs clone`.

`git lfs clone` commands are formatted as `git lfs clone [git clone options] <repository> [<directory>]`. It supports the same options as `git clone`.

For more information about `git lfs` commands, including `git lfs clone`, go to the [Git LFS documentation](https://github.com/git-lfs/git-lfs/tree/main/docs).

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

1. In your pipeline's **Build** stage, add a **Run** step.
2. Enter a **Name** and optional **Description**.
3. Depending on the build infrastructure, you might need to specify a **Container Registry** connector, such as a Docker connector, and an **Image**, such as `alpine:latest`. For information about when these settings are required and how to specify images, go to [Use Run steps](../run-ci-scripts/run-step-settings.md).
4. For **Shell**, select **Sh**.
5. In the **Command** field, enter your `git lfs` command as you would on the command line.

   ```sh
   curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
   sudo apt-get install git-lfs=3.3.0
   ```

   For information about these commands, select **Install** next to the relevant package on the [Git LFS Package Cloud repo](https://packagecloud.io/github/git-lfs), or go to the Git LFS documentation on [Installing Git LFS](https://github.com/git-lfs/git-lfs#installing).

6. Select **Apply Changes** to save the step, and then select **Save** to save the pipeline.

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

In your `CI` stage, add a `Run` step with the following settings:

* `type: Run`
* `name`: Enter a name for the step, such as `install gitlfs`.
* `identifier`: Enter an ID for the step, such as `install_gitlfs`.
* `connectorRef` and `image`: Depending on the build infrastructure, you might need to specify a `connectorRef`, such as a Docker connector, and an `image`, such as `alpine:latest`. For information about when these settings are required and how to specify images, go to [Use Run steps](../run-ci-scripts/run-step-settings.md).
* `shell: Sh`
* `command`: Enter your `git lfs` command as you would on the command line.

For example, this step runs `git lfs clone`. The `connectorRef` and `image` are omitted because they are not required by the build infrastructure.

```yaml
              - step:
                  type: Run
                  name: git lfs clone
                  identifier: git_lfs_clone
                  spec:
                    shell: Sh
                    command: |-
                      git lfs clone harness/developer-hub
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Run the Pipeline

Save and run your pipeline. While the build runs, you can observe the step logs on the [Build details page](../viewing-builds.md).
