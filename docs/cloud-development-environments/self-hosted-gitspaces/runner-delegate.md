---
title: Setup Runner and Install Delegate
description: Get Started with Harness CDE (Gitspaces)
sidebar_position: 4
sidebar_label: Setup Runner and Install Delegate
---

To configure self hosted Gitspaces in your own infrastructure, you need to host and setup **Harness Delegate** and **Runner** in your own infrastructure. Both Harness Delegate and Runner are required to be hosted in your GCP infrastructure to establish a seamless connection between the Harness Control Plane and your GCP infrastructure. 

Once you have the [Harness Gitspaces Terraform Module configured and setup](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-terraform.md), you'll have a **GCP VM instance active** and running in your GCP project which will be used to host your Harness Delegate and Runner. 

## Prerequisites
- Ensure you've read through the **fundamentals and prerequisites** of self hosted gitspaces [here](/docs/cloud-development-environments/self-hosted-gitspaces/fundamentals.md). This helps you get a deeper understanding of all the basic concepts and steps involved with self hosted gitspaces. 
- Please make sure you have completed the steps mentioned in [configuring the Harness Gitspaces terraform module](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-terraform.md). This step is a mandatory prerequisite as this step **sets up the GCP infrastructure**, **creates a GCP VM instance in your infra** and **generates the ``pool.yaml`` file** which is required to host and setup the Runner. 
- Ensure you have the GCP VM instance active and running in your GCP project. (This VM instance is created while your terraform configuration is configured and setup.) Please refer to this [documentation](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-terraform.md) to understand more about configuring this Terraform Module. 

## Functions of Runner and Delegate
### Delegate 
Harness Delegate is a service that you install in your infrastructure to establish and maintain a connection between Harness Control Plane and your infrastructure. Self Hosted Gitspaces run in your own infrastructure, but are managed by Harness Control Plane. Thus to establish and maintain communication between the Harness Control Plane and Customer's infrastructure, customer need to install Harness Delegate in their infrastructure. Read more about [Harness Delegate Overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/).

### VM Runner
The Runner is responsible for managing the VM lifecycle. The VM Runner maintains a pool of VMs for executing the tasks. When the Delegate receives any Task Request from the Harness Control Plane, it forwards the request to the Runner, which executes the task on the available VM and manages the VM lifecycle according to the request. Read more about [VM Runner](https://docs.drone.io/runner/vm/overview/).

## Setting up Runner and Delegate 
You can follow this detailed guide (as described below) to setup Runner and install Harness Delegate in your infrastructure:  

### SSH into the VM Instance 
:::info
To connect to a VM with SSH, you'll need your SSH Key to propogate into your VM. Make sure you have a fully functioning SSH Key added into your GCP Console. Refer to this guide to learn more on [how to add a SSH Key to VMs](https://cloud.google.com/compute/docs/connect/add-ssh-keys). 
:::

You'll have to [SSH into your GCP VM instance](https://cloud.google.com/compute/docs/connect/standard-ssh) to host your Runner and Delegate there. In order to do that, you can follow the given steps: 
1. Go to your **GCP Console** and go to **VM Instances**. You can find your specific VM instance created as per the details you entered while configuring your infrastructure in the Harness UI. Click on that instance and head over to the **Details** page. 
2. Click on **SSH** and select **View gcloud command**. This is your command to SSH into the instance from your machine. Run this command in your local terminal. 

Once you are into the VM Instance, you can continue and complete the following steps. 

### Install Docker 
You'll need **Docker** installed in your GCP VM instance to configure self hosted Gitspaces. Refer to this [installation guide](https://docs.docker.com/engine/install/) on how to install Docker in your VM instance. 

### Start the Runner 
Now that you're into the VM instance and you've installed Docker, follow the given steps to start the **Runner**: 
1. Create a new file called ``pool.yaml`` in your instance and copy the same YAML file content as you had when you configured the Terraform Module. Refer to [Setup Terraform Module](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-terraform.md#download-the-pool-yaml-file) to learn more about the same. 
2. Run the following command to create a new network: 
```
docker network create harness
```
3. Run the following command to start a Runner in your VM instance, make sure you have changed the ``pool.yaml`` file name as the same name you have saved the file with: 
```
docker run -d \
  --network harness \
  --hostname vm-runner \
  -v /runner:/runner \
  -p 3000:3000 \
  --platform linux/amd64 \
  drone/drone-runner-aws:latest \
  delegate \
  --pool /runner/pool.yml

```
This starts a Runner in your VM which will interact with the Harness Delegate to complete all the various tasks involved in connecting the Harness Control Plane to your self hosted Infrastructure. 

### Install the Delegate 
Now that you have the Runner setup and started, you can continue and install **Harness Docker Delegate** in your VM instance to be able to establish a seamless connection between the Harness Control Plane and your GCP infrastructure. Please refer to the detailed steps below to install the Delegate: 
:::info
Please ensure you are installing the **Docker Delegate** in your VM instance. For now, Self Hosted Gitspaces will only work with Delegates created at the **Account level**. 
:::

1. In Harness, go to **Account Settings**, select **Account Resources**, and then select **Delegates**.

2. Select **New Delegate** or **Install Delegate**.

3. Select **Docker**.

4. Enter a **Delegate Name**.

5. Copy the **Delegate install command** and run it in your GCP VM. Add this snippet into your delegate install command: ``-e RUNNER_URL="http://vm-runner:3000/" \`` to ensure the delegate has the runner url. Your final install command will look something like this: 

```
docker run -d \
  --network harness \
  --cpus=1 \
  --memory=2g \
  -e DELEGATE_NAME=docker-delegate \
  -e DEPLOY_MODE=KUBERNETES_ONPREM \
  -e NEXT_GEN="true" \
  -e DELEGATE_TYPE="DOCKER" \
  -e ACCOUNT_ID=XxRn14tYSUKILSe3XU0R8w \
  -e DELEGATE_TOKEN=<>= \
  -e DELEGATE_TAGS="" \
  -e RUNNER_URL="http://vm-runner:3000/" \
  -e MANAGER_HOST_AND_PORT=https://app.harness.io \
  us-west1-docker.pkg.dev/gar-setup/docker/delegate:25.03.85504
```

To learn more about delegates and delegate installation, go to [Delegate installation overview](https://developer.harness.io/docs/platform/delegates/install-delegates/overview).

Once your Delegate is up and running, you have successfully setup the infrastructure and established a successful connection between the Harness Control Plane and your infrastructure. 

## Next Steps

