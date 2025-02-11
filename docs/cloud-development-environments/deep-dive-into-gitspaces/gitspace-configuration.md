---
title: Understanding the Gitspace Configuration
description: Learn more about the underlying configuration of a Gitspace. 
sidebar_position: 1
sidebar_label: Gitspace Configuration
---

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

| **Argument**    | **Usage** |
| -------- | ------- |
| [```image```](https://containers.dev/implementors/json_reference/#image-specific)  | Image used to create the container    |
| [```forwardPorts``` ](/docs/cloud-development-environments/develop-using-cde/port-forwarding.md)   | Array of ports to be forwarded from the Gitspace to the local machine (including inside the web)    |
| [```features``` ](/docs/cloud-development-environments/develop-using-cde/features.md)   | An object of Dev Container Feature IDs and related options to be added into your Gitspace    |
| [```postCreateCommand```](https://containers.dev/implementors/json_reference/#lifecycle-scripts) | Command to be executed after the Gitspace is created |
| [```postStartCommand```](https://containers.dev/implementors/json_reference/#lifecycle-scripts)    | Command to be executed after the Gitspace is started    |
| [```runArgs```](/docs/cloud-development-environments/develop-using-cde/run-args.md)    | Array of Docker CLI arguments to be used when running the Gitspace     |
| [```containerEnv```](/docs/cloud-development-environments/develop-using-cde/env-variables.md)    | Name-value pairs that sets/overrides environment variables for the container    |
| [```containerUser```](/docs/cloud-development-environments/develop-using-cde/container-remote-user.md)    | Defines the user for all operations run as inside the container    |
| [```remoteUser```](/docs/cloud-development-environments/develop-using-cde/container-remote-user.md)    | Defines the user that devcontainer.json supporting services tools / runs as in the container (including lifecycle scripts and any remote editor/IDE server processes)   |
| [```extensions```](/docs/cloud-development-environments/develop-using-cde/extensions.md)    | Array of extension IDs that specifies which extensions should be installed when the Gitspace is created    |
| [```mounts```](https://containers.dev/implementors/json_reference/#general-properties)    |Allows the user to add additional mounts to a container. Each value is a string that accepts the same values as the [Docker CLI --mount flag](https://docs.docker.com/reference/cli/docker/container/run/#mount). **Defaults to unset**   |
| [```overrideFeatureInstallOrder```](https://containers.dev/implementors/json_reference/#general-properties)    |Allows the user to override the Feature install order when needed     |
| [```privileged```](https://containers.dev/implementors/json_reference/#general-properties)    |Allows the user to cause the container to run in privileged mode (--privileged). **Defaults to ```false```**|
| [```init```](https://containers.dev/implementors/json_reference/#general-properties)    |Allows the user to indicate whether the [tini init process](https://github.com/krallin/tini) should be used to help deal with zombie processes. **Defaults to ```false```**      |
| [```capAdd```](https://containers.dev/implementors/json_reference/#general-properties)    |Allows the user to add capabilities typically disabled for a container. Most often used to add the ``ptrace`` capability required to debug languages like C++, Go, and Rust. **Defaults to [ ]**   |
| [```securityOpt```](https://containers.dev/implementors/json_reference/#general-properties)    |Allows the user to set container security options. **Defaults to [ ]** |


The path for this configuration file is ```.devcontainer/devcontainer.json```

### Example devcontainer.json File
```
{
	"image": "mcr.microsoft.com/devcontainers/javascript-node:1-18-bullseye",
	"forwardPorts": [9000],
	"postCreateCommand": "yarn install",
	"postStartCommand": "npm install",
	"containerEnv": {
    		"MY_CONTAINER_VAR": "abcd",
    		"MY_CONTAINER_VAR2": "efgh"
	},
	"vscode": {
      "extensions": ["streetsidesoftware.code-spell-checker"]
    },
	"runArgs": ["--restart=no", "--security-opt", "seccomp=unconfined"],
	"containerUser": "root",
	"remoteUser": "vscode"
}
```

### Default Image
You can specify the image required to create the container in the ```devcontainer.json``` file. Any necessary application dependencies can be pre-installed in this image to save setup time.

If a repository does not have a ```devcontainer.json```, we will spin up the CDE with a default docker image at ```mcr.microsoft.com/devcontainers/base:dev-ubuntu-24.04```. 
The Dockerfile for this default image is available at [default image](https://github.com/devcontainers/images/tree/main/src/base-ubuntu).
