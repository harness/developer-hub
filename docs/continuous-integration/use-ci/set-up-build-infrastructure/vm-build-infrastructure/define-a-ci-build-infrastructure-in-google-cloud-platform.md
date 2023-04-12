---
title: Set up a GCP VM build infrastructure
description: This topic describes how to set up a CI build infrastructure in Google Cloud Platform.

sidebar_position: 30
helpdocs_topic_id: k5rvvhw49i
helpdocs_category_id: rg8mrhqm95
helpdocs_is_private: true
helpdocs_is_published: true
---

:::note
Currently, this feature is behind the Feature Flag `CI_VM_INFRASTRUCTURE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

This topic describes how to set up a CI build infrastructure in Google Cloud Platform. You will create an Ubuntu VM and then install a CI Delegate and Drone Runner on it. The Delegate creates VMs dynamically in response to CI build requests.

For information on using Kubernetes as a build farm, see [Set up a Kubernetes cluster build infrastructure](../set-up-a-kubernetes-cluster-build-infrastructure.md).

The following diagram illustrates a build farm. The [Harness Delegate](/docs/platform/2_Delegates/install-delegates/overview.md) communicates directly with your Harness instance. The [VM Runner](https://docs.drone.io/runner/vm/overview/) maintains a pool of VMs for running builds. When the Delegate receives a build request, it forwards the request to the Runner, which runs the build on an available VM.

![CI build infrastructure in Google Cloud Platform](../static/define-a-ci-build-infrastructure-in-google-cloud-platform-29.png)

## Important Notes

* Google Cloud VM configuration:
	+ For the delegate VM, use a machine type with 4 vCPU and 16 GB memory or more.
	+ Harness recommends the [Ubuntu 18.04 LTS (Bionic)](https://console.cloud.google.com/marketplace/product/ubuntu-os-cloud/ubuntu-bionic?project=docs-play) machine image.
	+ The VM must allow ingress access on ports 22 and 9079.

To find images to use on Google Compute Engine, use the following command:

```
gcloud compute images list
```

A valid image reference looks like this: `projects/{PROJECT}/global/images/{IMAGE}`

For example: `projects/docs-test/global/images/ubuntu-pro-1804-bionic-v20220131`

## Step 1: Set up the delegate VM

1. Log into the [Google Cloud Console](https://console.cloud.google.com/) and launch the VM that will host your Harness delegate.
2. [Install Docker](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html#install_docker) on the VM.
3. [Install Docker Compose](https://docs.docker.com/compose/install/) on the VM. You must have [Docker Compose version 3.7](https://docs.docker.com/compose/compose-file/compose-versioning/#version-37) or higher installed.
4. Run this command on the VM:

   ```
   gcloud auth application-default login
   ```
   This creates the following credentials file:

   `/home/$(whoami)/.config/gcloud/application_default_credentials.json`

5. Create a `/runner` folder on your VM and `cd` into it:

   ```
   mkdir /runner
   cd /runner
   ```

## Step 2: Configure the Drone pool on the Google VM

The `pool.yml` file defines the VM spec and pool size for the VM instances used to run the pipeline. A pool is a group of instantiated VMs that are immediately available to run CI pipelines.

1. In the `/runner` folder, create a new `pool.yml` file.
2. Set up the file as described in the following example. Note the following:
   * To avoid latency issues between delegate and build VMs, specify the same zone where your delegate is running in the `spec: zone:` field.
   * Set up `spec: account:` with your Google project ID and your JSON credentials file.
   * For information about specific settings, go to the [Pool Settings Reference](#pool-settings-reference). You can also learn more in the Drone documentation for [Drone Pool](set-up-an-aws-vm-build-infrastructure.md#runner-settings-reference-advanced) and [Google](https://docs.drone.io/runner/vm/drivers/google/).

### Example pool.yml

```yaml
version: "1"
instances:
  - name: ubuntu-gcp
    default: true
    type: google
    pool: 1
    limit: 1
    platform:
      os: linux
      arch: amd64
    spec:
      account:
        project_id: ci-play
        json_path: /path/to/key.json
      image: projects/ubuntu-os-pro-cloud/global/images/ubuntu-pro-1804-bionic-v20220510
      machine_type: e2-small
      zone:
        - us-centra1-a
        - us-central1-b
        - us-central1-c
      disk:
        size: 100
        type: "pd-balanced"
```

Later in this workflow, you'll reference the pool identifier in Harness Manager to map the pool with a Stage Infrastructure in a CI Pipeline. This is described later in this topic.

## Step 3: Configure the docker-compose.yaml file

1. In your Harness account, organization, or project, select **Delegates** under **Project Setup**.
2. Click **New Delegate** and select **Switch back to old delegate install experience**.
3. Select **Docker** and then select **Continue**.
4. Enter a **Delegate Name**. Optionally, you can add **Tags** or **Delegate Tokens**. Then, select **Continue**.
5. Select **Download YAML file** to download the `docker-compose.yaml` file to your local machine.

Next, you'll add the Runner spec to the new Delegate definition. The Harness Delegate and Runner run on the same VM. The Runner communicates with the Harness Delegate on `localhost` and port `3000` of your VM.

1. Copy your local `docker-compose.yaml` file to the `/runner` folder on the VM. This folder should now have both `docker-compose.yaml` and `pool.yml`.
2. Open `docker-compose.yaml` in a text editor.
3. Append the following to the end of the `docker-compose.yaml` file:

   ```yaml
   drone-runner-aws:  
       restart: unless-stopped  
       image: drone/drone-runner-aws:latest  
       volumes:  
         - /runner:/runner  
         - /path/to/google/credentials/file/:/key  
           # example: /home/jsmith/.config/gcloud/:/key  
       entrypoint: ["/bin/drone-runner-aws", "delegate", "--pool", "pool.yml"]  
       working_dir: /runner  
       ports:  
         - "3000:3000"
   ```

4. Under `services: harness-ng-delegate: restart: unless-stopped`, add the following line:

   ```yaml
   network_mode: "host"
   ```

5. Save `docker-compose.yaml`.

<details>
<summary>Example: docker-compose.yaml with Runner spec</summary>

```yaml
version: "3.7"  
services:  
  harness-ng-delegate:  
    restart: unless-stopped  
    network_mode: "host"  
    deploy:  
      resources:  
        limits:  
          cpus: "0.5"  
          memory: 2048M  
    image: harness/delegate:latest  
    environment:  
      - ACCOUNT_ID=XXXXXXXXXXXXXXXX  
      - ACCOUNT_SECRET=XXXXXXXXXXXXXXXX  
      - MANAGER_HOST_AND_PORT=https://app.harness.io  
      - WATCHER_STORAGE_URL=https://app.harness.io/public/qa/premium/watchers  
      - WATCHER_CHECK_LOCATION=current.version  
      - REMOTE_WATCHER_URL_CDN=https://app.harness.io/public/shared/watchers/builds  
      - DELEGATE_STORAGE_URL=https://app.harness.io  
      - DELEGATE_CHECK_LOCATION=delegateqa.txt  
      - USE_CDN=true  
      - CDN_URL=https://app.harness.io  
      - DEPLOY_MODE=KUBERNETES  
      - DELEGATE_NAME=qwerty  
      - NEXT_GEN=true  
      - DELEGATE_DESCRIPTION=  
      - DELEGATE_TYPE=DOCKER  
      - DELEGATE_TAGS=  
      - DELEGATE_TASK_LIMIT=50  
      - DELEGATE_ORG_IDENTIFIER=  
      - DELEGATE_PROJECT_IDENTIFIER=  
      - PROXY_MANAGER=true  
      - VERSION_CHECK_DISABLED=false  
      - INIT_SCRIPT=echo "Docker delegate init script executed."  
  drone-runner-aws:  
    restart: unless-stopped  
    image: drone/drone-runner-aws:latest  
    volumes:  
      - /runner:/runner  
      - /home/jsmith/.config/gcloud/:/key  
    entrypoint: ["/bin/drone-runner-aws", "delegate", "--pool", "pool.yml"]  
    working_dir: /runner  
    ports:  
      - "3000:3000"
```

</details>

For more information on Harness Docker Delegate environment variables, go to the [Harness Docker Delegate environment variables reference](/docs/platform/2_Delegates/delegate-reference/docker-delegate-environment-variables.md).

## Step 4: Install the Delegate and Runner

1. [SSH](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html) into the Delegate VM and `cd` to `/runner`.
2. Confirm that the folder has both setup files, for example:

	 ```
	 $ ls -a
	 . .. docker-compose.yml pool.yml
	 ```

3. Run the following command to install the Delegate and Runner:

	 ```
	 $ docker-compose -f docker-compose.yml up -d
	 ```

4. Verify that both containers are running correctly. You might need to wait a few minutes for both processes to start. You can run the following commands to check the process status:

	 ```
	 $ docker ps  
	 $ docker logs <delegate-container-id>  
	 $ docker logs <runner-container-id>
	 ```

5. In the Harness UI, verify that the Delegate appears in the Delegates list. It might take two or three minutes for the Delegates list to update. Make sure the **Connectivity Status** is **Connected**. If the **Connectivity Status** is **Not Connected**, make sure the Docker host can connect to `https://app.harness.io`.

   ![](../static/define-a-ci-build-infrastructure-in-google-cloud-platform-30.png)

The Delegate and Runner are now installed, registered, and connected.

## Step 5: Select pipeline build infrastructure

1. In your CI pipeline's **Build** stage, select the **Infrastructure** tab, and then select **VMs**.
2. In the **Pool ID**, enter the pool `name` from your [pool.yml](#step-2-configure-the-drone-pool-on-the-google-vm).

   ![](../static/define-a-ci-build-infrastructure-in-google-cloud-platform-31.png)

This pipeline's **Build** stage now uses your GCP VMs for its build infrastructure.

## Pool Settings Reference

You can configure the following settings in your `pool.yml` file.

|  |  |  |
| --- | --- | --- |
| **Subfields** | **Examples** | **Description** |
| `name` (String) | NA | `name: windows_pool` | Unique identifier of the pool. You will need to specify this pool name in the Harness Manager when you set up the CI Stage Infrastructure. |
| `pool` (Integer) | NA | `pool: 1` | Minimum pool size number. Denotes the minimum number of cached VMs in ready state to be used by the Runner. |
| `limit` (Integer) | NA | `limit: 3` | Maximum pool size number. Denotes the maximum number of cached VMs in ready state to be used by the Runner. |
| `platform` | os (String) | `platform: os: windows`arch (String) |`platform: arch:` variant (String) |`platform: variant:` version (String) |`platform: version:` | Configure the details of your VM platform.  |
| `spec` |  | Configure the settings of your build VMs as described in [Build VM Settings](#build-vm-settings). |

### Build VM Settings

* `account`: Specify your GCP project Id and the full path and filename of your local Google credentials file.
* `image`: The image type to use for the build VM.
* `machine_type`: The google machine type. See [About Machine Families](https://cloud.google.com/compute/docs/machine-types) in the Google Cloud docs.
* `zone`: To minimize latency, specify the zone where the Delegate is running.

## Troubleshooting (Advanced)

If you have problems running the delegate, runner, or VMs, you can collect debug and trace information in your container logs.

1. Create a `.env` file with the following options in your `/runner` folder:
   ```
   DRONE_DEBUG=true  
   DRONE_TRACE=true
   ```
2. Shut down the delegate and runner: `docker-compose down`
3. In your `docker-compose.yml` file, update the `drone-runner-aws: entrypoint` to include the `.env` file:
   ```
    drone-runner-aws:  
    restart: unless-stopped  
    image: drone/drone-runner-aws:1.0.0-rc.9  
    volumes:  
      - /runner:/runner  
      - /home/jsmith/.config/gcloud/:/key  
    entrypoint: ["/bin/drone-runner-aws", "delegate", "--envfile", ".env", "--pool", "pool.yml"]  
    working_dir: /runner  
    ports:  
      - "3000:3000"      
   ```
4. Restart the delegate and runner: `docker-compose up`

## See Also

* [Set up a Kubernetes cluster build infrastructure](../set-up-a-kubernetes-cluster-build-infrastructure.md)
* For more details on VM Runner, go to this [GitHub](https://github.com/drone-runners/drone-runner-aws) page.

