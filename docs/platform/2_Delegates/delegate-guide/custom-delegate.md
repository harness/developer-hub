---
title: Create a custom delegate that Includes custom tools
description: Create your own custom Delegate and include the tools needed for your builds and deployments.
# sidebar_position: 2
helpdocs_topic_id: nbi9uj9wm4
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

[Harness Delegates](../delegates-overview.md) are installed from the Harness Manager and typically contain the binaries you need for your CI/CD Pipelines.

In some cases, you might want to add more tools or even create your own custom Delegate and include the tools needed for your builds and deployments.

This topic explains the different ways to create a custom Delegate.

### Before you begin

* [Delegates Overview](../delegates-overview.md)
* [Supported Platforms and Technologies](../../../getting-started/supported-platforms-and-technologies.md)
* [Delegate Installation Overview](../delegate-installation-overview.md)

### Option: Use the INIT\_SCRIPT environment variable

In the Delegate config file, locate the `INIT_SCRIPT` environment variable.

For example, here it is in the Kubernetes Delegate harness-delegate.yaml file:


```
...  
apiVersion: apps/v1  
kind: StatefulSet  
...  
spec:  
...  
    spec:  
    ...  
        env:  
        ...  
        - name: INIT_SCRIPT  
          value: |-  
            echo install wget  
            apt-get install wget  
            echo wget installed  
...
```
In `value`, enter your script. For a list of common scripts, see [Common Delegate Initialization Scripts](../delegate-reference/common-delegate-profile-scripts.md).

For steps on using the `INIT_SCRIPT` environment variable, see [Run Scripts on Delegates](run-scripts-on-delegates.md).

You can see all of the environment variables for the Delegates in the following topics:

* [Install a Kubernetes Delegate](install-a-kubernetes-delegate.md)
* [Install a Docker Delegate](../delegate-install-docker/install-a-docker-delegate.md)

### Option: Add a delegate image

Harness Delegate Docker images are public and you can use them to compose your own Delegate image.

The Harness Delegate Docker images are located on [Docker Hub](https://hub.docker.com/r/harness/delegate/tags).

For example, you can curl and install all the tool libraries you want and then curl `delegate:latest` to add the latest Delegate image.

Or you can create your own image and simply include the Delegate image.

Here's and example that installs Node.JS on top of a Delegate image and sets an environment variable key:value pair.


```
...  
FROM harness/delegate:latest  
  
RUN apt-get update && apt-get -y install nodejs  
  
ENV key=value  
...
```
You can see all of the environment variables for the Delegates in the following topics:

* [Install a Kubernetes Delegate](install-a-kubernetes-delegate.md)
* [Install a Docker Delegate](../delegate-install-docker/install-a-docker-delegate.md)

### See also

* [Delegate How-tos](/docs/category/delegates).

