---
title: Understanding the Gitspace Configuration
description: Learn more about the underlying configuration of a Gitspace. 
sidebar_position: 1
sidebar_label: Gitspace Configuration
redirect_from:
  - /docs/cloud-development-environments/deep-dive-into-gitspaces/gitspace-configuration
---

:::info

Harness CDE is now available in public beta. To enable it on your account, contact your sales representative or reach out to the team at cde-interest@harness.io

:::

This guide will walk you through the Gitspace configuration in detail. 

Each time a new Gitspace is created, a dedicated Development Container is provisioned on a separate Virtual Machine (VM), providing an isolated and secure development environment.

This Development Container allows you to work within a containerized version of a build environment. Simply put, it offers a pre-configured, ready-to-code setup directly within your IDE, allowing you to start coding instantly. 

<img width="900" alt="gitspace config" src="https://github.com/user-attachments/assets/0ca2d223-0cee-4ab6-aaa5-5752549eb263"/>


### Development Containers
Development Containers (also known as [Dev Containers](https://containers.dev/implementors/spec/)) are an open source specification for developing consistent and feature-rich development environments. 

This specification equips containers with all the tools, libraries and runtimes required to enable seamless development inside them. The development environment is configured based on metadata defined in this specification.
Each Development Container is defined by a ```devcontainer.json``` file, which configures the containerized development environment.

### devcontainer.json File
Gitspace configuration lives with your source code in the ```.devcontainer/devcontainer.json``` file within your project’s repository. This file contains all necessary metadata and settings to define your development environment.

The ```devcontainer.json``` specification includes various properties, allowing you to customize the environment. 

Currently, we support the following properties in a  ```devcontainer.json``` file: (additional properties coming soon, read more about the [devcontainer metadata reference](https://containers.dev/implementors/json_reference/) here)
- ```image```: Image used to create the container
- ```postCreateCommand```: Command to be executed after the Gitspace is created
- ```postStartCommand```: Command to be executed after the Gitspace is started
- ```containerEnv```: Name-value pairs that sets/overrides environment variables for the container

The path for this configuration file is ```.devcontainer/devcontainer.json```

### Example devcontainer.json File
```
{
	"image": "mcr.microsoft.com/devcontainers/javascript-node:1-18-bullseye",
	"postCreateCommand": "yarn install",
	"postStartCommand": "npm install",
	"containerEnv": {
    		"MY_CONTAINER_VAR": "abcd",
    		"MY_CONTAINER_VAR2": "efgh"
	}

}
```

### Default Image
You can specify the image required to create the container in the ```devcontainer.json``` file. Any necessary application dependencies can be pre-installed in this image to save setup time.

If a repository does not have a ```devcontainer.json```, we will spin up the CDE with a default docker image at ```mcr.microsoft.com/devcontainers/base:dev-ubuntu-24.04```. 
The Dockerfile for this default image is available at [default image](https://github.com/devcontainers/images/tree/main/src/base-ubuntu).
