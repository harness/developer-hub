---
title: Define a MacOS Build Infrastructure and Anka Registry
description: This topic describes how to setu up a Harness MacOS build farm that uses an Anka registry and controller.
sidebar_position: 45
---

This topic describes the high-level workflow for setting up a Harness MacOS build farm that works with [Anka's virtualization platform for MacOS](https://docs.veertu.com/anka/what-is-anka/). Using this workflow, you can set up a highly scalable build farm with multiple VMs and nodes to run your MacOS builds with Harness CI. 

The following diagram shows how Harness CI and Anka work together. Once you set up the Harness and Anka components, you can easily scale up your build farm with additional templates, build nodes, and VMs. 

![](./static/macos-build-infra-with-anka-registry-mult-nodes.png)


The following steps describe the high-level workflow.


- [Set up the Anka controller and registry](#set-up-the-anka-controller-and-registry)
- [Add other Mac nodes and VM templates to the Anka registry](#add-other-mac-nodes-and-vm-templates-to-the-anka-registry)
- [Install the Harness delegate and runner](#install-the-harness-delegate-and-runner)
- [Update the Anka controller and Harness delegate](#update-the-anka-controller-and-harness-delegate)
  - [Stop the Anka controller](#stop-the-anka-controller)
  - [Set up authentication and port mapping on the Anka controller](#set-up-authentication-and-port-mapping-on-the-anka-controller)
  - [Set up the Harness runner to communicate with the Anka controller](#set-up-the-harness-runner-to-communicate-with-the-anka-controller)
  - [Restart the controller](#restart-the-controller)
- [Set up port forwarding on each VM template in the registry](#set-up-port-forwarding-on-each-vm-template-in-the-registry)
- [Set up the delegate in the Harness pipeline](#set-up-the-delegate-in-the-harness-pipeline)
- [YAML config examples](#yaml-config-examples)
  - [Anka controller `docker-compose.yml` example](#anka-controller-docker-composeyml-example)
  - [Harness runner `pool.yml` example](#harness-runner-poolyml-example)


###  Set up the Anka controller and registry
Set up the Anka registry and controller on a Linux host. For details, go to  [Setting up the Controller & Registry](https://docs.veertu.com/anka/anka-build-cloud/getting-started/setup-controller-and-registry/) in the Anka documentation. 

When you finish this workflow you will have:

* An running instance of the Anka controller and registry.

* A Mac node (such as a Mac Mini) in the Anka registry cluster. This node has Anka virtualization software installed. 

* A Mac VM template in the Anka registry. You can use this to create VMs on other nodes as you add them to the registry. 

:::note
Harness recommends that you also enable token authentication on the registry host. For details, go to [Configuring Token Authentication](https://docs.veertu.com/anka/anka-build-cloud/advanced-security-features/token-authentication) in the Anka documentation.
::: 


###  Add other Mac nodes and VM templates to the Anka registry

Now that you've gone through the workflow for setting up one node and VM template, you can add more nodes and templates as needed. AAfter you join a node to the cluster, it can pull templates from the registry and use them to create nodes.


### Install the Harness delegate and runner
Set up the Harness delegate and runner on the same node as your Anka controller and registry or on a separate node. 

You can run your delegate and runner on [Docker](define-a-docker-build-infrastructure.md), [MacOS](./define-macos-build-infra-with-anka-registry.md), [AWS](/./set-up-an-aws-vm-build-infrastructure.md), [Azure](./define-a-ci-build-infrastructure-in-azure.md), and [Google Cloud Platform](./define-a-ci-build-infrastructure-in-google-cloud-platform.md) build infrastructures.


### Update the Anka controller and Harness delegate

Do the following steps.


#### Stop the Anka controller

On the controller host, **`cd`** to the the `docker-compose.yml` folder and enter **`docker-compose down`**. 


#### Set up authentication and port mapping on the Anka controller

1. Enable authentication on the Anka controller. 

   This step assumes you have set up root token authentication as described in [Configuring Token Authentication](https://docs.veertu.com/anka/anka-build-cloud/advanced-security-features/token-authentication) (Anka docs).

   Set up these variables to the environment section in the docker-compose.yml file on the controller host:

   * `ANKA_ENABLE_AUTH : true`

   * `ANKA_ROOT_TOKEN` = The root token you specified on the Anka Controller host
 
   * `ANKA_QUEUE_ADDR : 0.0.0.0:9001`  
 
     <!-- TBD clarify -->

2. Add this mapping to the `ports` section of the  docker-compose.yml file:

   `5001:5001` 

  For an example, go to the [Anka controller `docker-compose.yml` example](#anka-controller-docker-composeyml-example) below.


#### Set up the Harness runner to communicate with the Anka controller

On the Harness runner host, update up your pool.env file as follows:

``` yaml
  spec: 
    account: 
      username     : $ANKA_CONTROLLER_USERNAME
      password     : $ANKA_CONTROLLER_PASSWORD_OR_TOKEN
    controller_url : $ANKA_CONTROLLER_URL
```

[Drone Runner config example](#harness-runner-poolyml-example)

#### Restart the controller 

Go back to the the docker-compose.yml folder and restart the controller: **`docker-compose -f docker-compose.yml up -d`**

### Set up port forwarding on each VM template in the registry
 
 This enables connectivity between the Harness runner and the VMs. For each template, run the following command:

`anka modify $VM_TEMPLATE_NAME add port-forwarding service -g 9079`

For more information, go to [Modifying your VM](https://docs.veertu.com/anka/anka-virtualization-cli/getting-started/modifying-your-vm/) in the Anka documentation.

### Set up the delegate in the Harness pipeline

In your Harness Project, go to a pipeline that includes a Build stage.

In the Infrastructure tab of the Build Stage, define your infrastructure as follows:

* Type = **VMs**
* Pool Name = The `name` field in your `pool.yml` file.
* OS = **MacOS**

Your MacOS build infrastructure is now set up. You can now run your Build stages in your build infrastructure. 

### YAML config examples

#### Anka controller `docker-compose.yml` example
``` yaml
version: "2"
services: 
   anka-controller:
     build:
       context: controller
     ports:
       - 80:80
       - 5001:5001
     depends_on:
       - etcd
       - anka-registry
     env_file:
       - controller/controller.env
     restart: always
     environment:
       ANKA_ENABLE_AUTH: "true"
       ANKA_ROOT_TOKEN: $TOKEN
       ANKA_QUEUE_ADDR: 0.0.0.0:9001
   anka-registry:
     build:
       context: registry
     env_file:
       - registry/registry.env
     ports:
       - 8089:8089
     restart: always
     volumes:
       - /var/registry:/mnt/vol
   etcd:
     build:
       context: etcd
     volumes:
       - /var/etcd-data:/etcd-data
     env_file:
       - etcd/etcd.env
     restart: always
  ```

#### Harness runner `pool.yml` example
``` yaml
 - name: anka-build
   default: true
   type: ankabuild
   pool: 1
   limit: 100
   platform:
     os: darwin
     arch: amd64
   spec:
     account:
       username: anka-user
       password: admin
     vm_id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx 
#    node_id: // create pool from specific node
     controller_url: https://anka-controller.myorg.com:8089 
     tag: 1.0.6
     auth_token: sometoken
```