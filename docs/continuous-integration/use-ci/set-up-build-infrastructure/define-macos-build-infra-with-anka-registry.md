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
- [Update the Harness delegate and runner](#update-the-harness-delegate-and-runner)
  - [Stop the Harness delegate](#stop-the-harness-delegate)
  - [Enable authentication on the Harness delegate](#enable-authentication-on-the-harness-delegate)
  - [Set up the Harness runner to communicate with the Anka controller](#set-up-the-harness-runner-to-communicate-with-the-anka-controller)
  - [Restart the delegate](#restart-the-delegate)
- [Set up port forwarding on each Mac node in the registry](#set-up-port-forwarding-on-each-mac-node-in-the-registry)
- [Set up the delegate in the Harness pipeline](#set-up-the-delegate-in-the-harness-pipeline)
- [YAML config examples](#yaml-config-examples)
  - [Harness delegate `docker-compose.yml` example](#harness-delegate-docker-composeyml-example)
  - [Drone Runner `pool.yml` example](#drone-runner-poolyml-example)


###  Set up the Anka controller and registry
Set up the Anka registry and controller on a Linux host as described in [Setting up the Controller & Registry](https://docs.veertu.com/anka/anka-build-cloud/getting-started/setup-controller-and-registry/) (Anka docs). 

When you finish this workflow you will have:

* An running instance of the Anka controller and registry.

* A Mac node (such as a Mac Mini) in the Anka registry cluster. This node has Anka virtualization software installed. 

* A Mac VM template in the Anka registry. You can use this to create VMs on other nodes as you add them to the registry. 

:::note
Harness recommends that you also enable token authentication on the registry host as described in [Configuring Token Authentication](https://docs.veertu.com/anka/anka-build-cloud/advanced-security-features/token-authentication) (Anka docs).
::: 


###  Add other Mac nodes and VM templates to the Anka registry

Now that you've gone through the workflow for setting up one node and VM template, you can add more nodes and templates as needed. After you join each node to the cluster, you can create VM instances by pushing templates from the registry to the node. 


### Install the Harness delegate and runner
Set up the Harness delegate and runner on the same node as your Anka controller and registry or on a separate node. 

You can run your delegate and runner on any Harness-supported platform. See [Set Up Build Infrastructure](/docs/category/set-up-build-infrastructure). 

** TBD What about k8s? Kubernetes clusters don't use runners and VMs, do they?**

### Update the Harness delegate and runner

Do the following steps.


#### Stop the Harness delegate

**`cd`** to the the docker-compose.yml folder and enter **`docker-compose down`**. 


#### Enable authentication on the Harness delegate

1. Enable authentication on the Harness delegate. 

   This step assumes you have set up root token authentication as described in [Configuring Token Authentication](https://docs.veertu.com/anka/anka-build-cloud/advanced-security-features/token-authentication) (Anka docs).

   Set up these variables to the environment section in the docker-compose.yml file on the delegate host:

   * `ANKA_ENABLE_AUTH : true`

   * `ANKA_ROOT_TOKEN` = The root token you specified on the Anka Controller host
 
   * `ANKA_QUEUE_ADDR : 0.0.0.0:9001`  
 
    **TBD This is how it's specified in [Eoin's google doc](https://docs.google.com/document/d/1nI9p8TuSdTpZjaby6IeE2hwGZxTaJFmTrWgoA5T429U/edit?usp=sharing). Do you specify this the same way on all hosts? **

2. Add this mapping to the `ports` section of the  docker-compose.yml file:

   `5001:5001` 
   
   **TBD This is how it's specified in [Eoin's google doc](https://docs.google.com/document/d/1nI9p8TuSdTpZjaby6IeE2hwGZxTaJFmTrWgoA5T429U/edit?usp=sharing). Do you specify this the same way on all hosts?**

  See the [Harness Delegate `docker-compose.yml` example](#harness-delegate-docker-composeyml-example) below.


#### Set up the Harness runner to communicate with the Anka controller

Update up your pool.env file as follows:

``` yaml
  spec: 
    account: 
      username     : $ANKA_CONTROLLER_USERNAME
      password     : $ANKA_CONTROLLER_PASSWORD_OR_TOKEN
    controller_url : $ANKA_CONTROLLER_URL
```

** TBD Port number required for controller URL? ** 
** TBD Has registry_url been updated to controller_url? **

See the [Drone Runner config example](#drone-runner-poolyml-example) below. 

#### Restart the delegate 

Go back to the the docker-compose.yml folder and restart the delegate: **`docker-compose -f docker-compose.yml up -d`**

### Set up port forwarding on each Mac node in the registry
 
 This enables connectivity between the Harness runner and the VMs. For each VM on each host, run the following command:

`anka modify $VM_NAME add port-forwarding service -g 9079`

Suppose you're setting up two MacOS nodes. One node has two VM instances and the other node has three. In this scenario, you would need to run this command five times. 

### Set up the delegate in the Harness pipeline

In your Harness Project, go to a pipeline that includes a Build stage.

In the Infrastructure tab of the Build Stage, define your infrastructure as follows:

* Type = **VMs**
* Pool Name = The `name` field in your `pool.yml` file.
* OS = **MacOS**

Your MacOS build infrastructure is set up. You can now run your Build stages in your build infrastructure. 

### YAML config examples

#### Harness delegate `docker-compose.yml` example
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

#### Drone Runner `pool.yml` example
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