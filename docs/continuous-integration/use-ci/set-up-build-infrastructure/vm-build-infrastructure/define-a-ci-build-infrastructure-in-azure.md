---
title: Set up a Microsoft Azure VM build infrastructure
description: Set up a CI build infrastructure in Microsoft Azure.

sidebar_position: 20
helpdocs_topic_id: rhs0wi4l0q
helpdocs_category_id: rg8mrhqm95
helpdocs_is_private: false
helpdocs_is_published: true
---

:::note
Currently, this feature is behind the Feature Flag `CI_VM_INFRASTRUCTURE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

This topic describes how to set up a CI build infrastructure in Microsoft Azure. You will create a VM and install a CI Delegate and Drone Runner on it. The Delegate creates VMs dynamically in response to CI build requests.

For information on using Kubernetes as a build farm, see [Set up a Kubernetes cluster build infrastructure](../k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md).

The following diagram illustrates a build farm. The [Harness Delegate](/docs/platform/delegates/delegate-concepts/delegate-overview) communicates directly with your Harness instance. The [VM Runner](https://docs.drone.io/runner/vm/overview/) maintains a pool of VMs for running builds. When the Delegate receives a build request, it forwards the request to the Runner, which runs the build on an available VM.

![](../static/define-a-ci-build-infrastructure-in-azure-16.png)

## Requirements

* VM requirements:
	+ For the Delegate VM, use a machine type with 4 vCPU and 16 GB memory or more.
	+ Harness recommends the [Ubuntu Server 18.04 LTS](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/canonical.0001-com-ubuntu-pro-bionic?tab=overview) image and a [Microsoft Windows Server 2019 with Containers](https://az-vm-image.info/?cmd=--all+--publisher+microsoftwindowsserver+--sku+containers+--query+%22%5B%3Fcontains%28version%2C+%272019%27%29%5D%22) image. For additional details, go to [Azure](https://docs.drone.io/runner/vm/drivers/azure/) in the Drone docs.
	+ The VM must allow ingress access on ports 22 and 9079. Open port 3389 as well if you want to run Windows builds and be able to RDP into your build VMs.
* Azure requirements:
	+ You need permissions to create Azure Applications and VMs.
	+ An Azure Application that has the Owner role assigned to your VM. To assign a role to your VM, go to [Virtual Machines](https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Compute%2FVirtualMachines). Then select your VM and go to **Access Control (IAM)**.
	+ The Azure Application must be a Contributor on the subscription.
* To enable the runner to create new VMs, you need to specify the Application ID (`client_id`), `client_secret`, `subscription_id`, and Directory ID (`tenant_id`).
	+ `client_id`: To find the client ID, go to [App Registrations](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade) and then select your app.
	+ `tenant_id`: to find the tenant ID, go to [App Registrations](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade) and then select your app.
	+ `client_secret`: To create a client secret, go to your app and click **Certificates and Secrets**.
	+ `subscription_id`: To find the subscription ID, go to the [Virtual Machines page](https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Compute%2FVirtualMachines) and select your delegate VM.

## Step 1: Set Up the Delegate VM

1. Go to [Virtual Machines](https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Compute%2FVirtualMachines) and then launch the VM instance where the Harness Delegate will be installed.
2. [Install Docker](https://docs.docker.com/desktop/vm-vdi/) on the VM.
3. [Install Docker Compose](https://docs.docker.com/compose/install/) on the VM. You must have [Docker Compose version 3.7](https://docs.docker.com/compose/compose-file/compose-versioning/#version-37) or higher installed.
4. Create a `/runner` folder on your VM and `cd` into it:

   ```
   mkdir /runner
   cd /runner
   ```

## Step 2: Configure the Drone Pool

The `pool.yml` file defines the VM spec and pool size for the VM instances used to run the Pipeline. A pool is a group of instantiated VM that are immediately available to run CI Pipelines.

1. In the `/runner` folder, create a new `pool.yml` file.
2. Set up the file as shown in the following examples. For information about specific settings, go to the [Pool Settings Reference](#pool-settings-reference). You can also learn more in the Drone documentation about [Drone Pool](https://docs.drone.io/runner/vm/configuration/pool/) and [Azure](https://docs.drone.io/runner/vm/drivers/azure/).

<details>
<summary>Example: pool.yml for Ubuntu 18.04</summary>

```yaml
version: "1"  
instances:  
  - name: ubuntu-azure-pool  
    default: true  
    type: azure  
    pool: 1      
    limit: 4     
    platform:  
      os: linux  
      arch: amd64  
    spec:  
      account:  
        client_id: XXXXXXXXXXXXXXXXXXXX  
        client_secret: XXXXXXXXXXXXXXXXXXXX  
        subscription_id: XXXXXXXXXXXXXXXXXXXX  
        tenant_id: XXXXXXXXXXXXXXXXXXXX  
      location: eastus2  
      size : Standard_F2s  
      tags:  
        tagName: tag  
      image:  
        username: azureuser  
        password: XXXXXXXXXXXXXXXXXXXX  
        publisher: Canonical  
        offer: UbuntuServer  
        sku: 18.04-LTS  
        version: latest
```

</details>

<details>
<summary>Example: pool.yml for Windows Server 2019</summary>

```yaml
version: "1"  
instances:  
- name: ubuntu-azure  
  default: true  
  type: azure  
  platform:  
    os: windows  
  spec:  
    account:  
      client_id: XXXXXXX  
      client_secret: XXXXXXX  
      subscription_id: XXXXXXX  
      tenant_id: XXXXXXX  
    location: eastus2  
    size: Standard_F2s  
    tags:  
      tagName: tag  
    image:  
      username: XXXXXXX  
      password: XXXXXXX  
      publisher: MicrosoftWindowsServer  
      offer: WindowsServer  
      sku: 2019-Datacenter-with-Containers  
      version: latest
```

</details>

Later in this workflow, you'll reference the pool identifier in the Harness Manager to map the pool with a Stage Infrastructure in a CI Pipeline. This is described later in this topic.

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

   ![](../static/define-a-ci-build-infrastructure-in-azure-17.png)

The Delegate and Runner are now installed, registered, and connected.

## Step 5: Select pipeline build infrastructure

1. In your CI pipeline's **Build** stage, select the **Infrastructure** tab, and then select **VMs**.
2. In the **Pool ID**, enter the pool `name` from your [pool.yml](#step-2-configure-the-drone-pool).

   ![](../static/define-a-ci-build-infrastructure-in-azure-18.png)

3. Save your pipeline.

This pipeline's **Build** stage now uses your GCP VMs for its build infrastructure.

## Pool Settings Reference

See also [Drone Pool](https://docs.drone.io/runner/vm/configuration/pool/) and [Azure](https://docs.drone.io/runner/vm/drivers/azure/) in the Drone docs.

| **Subfield** | **Description** |
| -- | -- |
| `name` (String) | Unique identifier of the pool. You reference the pool name in the Harness Platform when setting up the stage's build infrastructure. |
| `pool` (Integer) | Minimum pool size number. Denotes the minimum number of cached VMs in ready state to be used by the Runner. |
| `limit` (Integer) | Maximum pool size number. Denotes the maximum number of cached VMs in ready state to be used by the Runner. |
| `platform` | Configure the details of your VM platform. |
| `spec` | Configure the settings of your build VMs: <ul><li>`account`: The azure account settings that the runner needs to create new VMs.</li><li>`client_id`: To find the client ID, go to **App Registrations**, then **Directory (tenant) ID**, and then select your app.</li><li>`tenant_id`: To find the tenant ID, go to **App Registrations**, then **Directory (tenant) ID**, and then select your app.</li><li>`client_secret`: To create a client secret, go to your app and click **Certificates and Secrets**.</li><li>`subscription_id`: To find the subscription ID, go to the [Virtual Machines page](https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Compute%2FVirtualMachines) and select your delegate VM.</li><li>`image`: The Azure region for the build VMs.</li><li>`location`: The Azure region for the build VMs. To reduce latency, Harness recommends you use the same region as the Delegate.</li><li>`size`: The Azure VM size.</li><li>`tag`: An optional tag to identify build VMs.</li></ul> |

## Troubleshooting

If you have problems running the delegate, runner, or VMs, you can collect debug and trace information in your container logs.

1. Create a `.env` file with the following options in your `/runner` folder:

   ```
   DRONE_DEBUG=true
   DRONE_TRACE=true
   ```

2. Shut down the delegate and runner: `docker-compose down`
3. In your `docker-compose.yml` file, update the `drone-runner-aws: entrypoint` to include the `.env` file:

   ```yaml
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

## See also

* [Set up a Kubernetes cluster build infrastructure](../k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md)
* For more details on VM Runner, go to the [AWS Drone Runner GitHub repo](https://github.com/drone-runners/drone-runner-aws).
* [Troubleshoot CI](/docs/continuous-integration/troubleshoot-ci/troubleshooting-ci.md)

