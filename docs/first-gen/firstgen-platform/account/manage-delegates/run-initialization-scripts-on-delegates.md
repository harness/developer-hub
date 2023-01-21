---
title: Run Initialization Scripts on Delegates
description: The Delegate setup files enable you to run startup scripts on the host/container/pod for a Harness Delegate when the Delegate is installed. You can also add script after the Delegate is installed, an…
sidebar_position: 100
helpdocs_topic_id: ul6qktixip
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---

The Delegate setup files enable you to run startup scripts on the host/container/pod for a Harness Delegate when the Delegate is installed.

You can also add script after the Delegate is installed, and then simply restart the Delegate.

This topic describes how to set up the Delegate config files for running scripts.

## Before You Begin

* [Delegate Installation Overview](delegate-installation-overview.md)
* [Install the Harness Kubernetes Delegate](install-kubernetes-delegate.md)
* [Install the Harness Docker Delegate](install-docker-delegate.md)

## Limitations

* When editing or deleting scripts, any binaries installed as part of the earlier scripts are not removed automatically. If you need to remove them, then restart or clean up the pod/VM.
* You cannot use Harness secrets in scripts since there is no connectivity to Harness at the time when the script is run (before the Delegate registers with Harness).

## Review: What Can I Run In a Script?

You can add any commands supported on the host/container/pod running the Delegate. Linux shell commands are most common. If kubectl, Helm, or Docker is running on the host/container/pod where you install the Delegate, then you can use their commands. The Kubernetes and Docker Delegates include Helm.

The base image for the Delegate is Ubuntu 18.04 or later, and so any default Ubuntu packages may be used in the Delegate script.

All Delegates include cURL and unzip as part of their installation package, and so you may use cURL and unzip in your Delegate scripts without installing them. The following script will work without having to install any packages:

```
apt-get install -y python  
curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"  
unzip awscli-bundle.zip  
./awscli-bundle/install -b ~/bin/aws
```

### When is the Script Executed?

Delegate scripts are applied under the following conditions:

* **New Delegate** - If you add a Delegate script when you create the Delegate, the commands are executed before the Delegate is started.
* **Running Delegate** - If you apply a Delegate script to a running Delegate, either by applying it as a new script or by switching the Delegate’s current script, the script commands are executed when the Delegate is restarted, but before the Delegate comes up.

## Step 1: Download the Delegate Config File

When you install a Delegate, you are prompted to download its config file. For Kubernetes and Docker Delegates, this is a YAML file.

Download the file and open it in a text editor.

## Step 2: Add a Script to the Delegate INIT\_SCRIPT Environment Variable

In the Delegate config file, locate the `INIT_SCRIPT` environment variable.

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
In `value`, enter your script. For a list of common scripts, see [Common Delegate Scripts](../../techref-category/account-ref/delegate-ref/common-delegate-profile-scripts.md).

:::tip
A multiline script must follow the YAML spec for [literal scalar style](https://yaml.org/spec/1.2-old/spec.html#id2795688).
:::

:::note
The script should not be in quotes.
:::

For the Docker Delegate, Harness uses a Docker compose file, so you add your script like this:


```
...  
      - |  
        INIT_SCRIPT=  
        echo Init Script Example  
        echo Done!!  
...
```
A Docker compose file doesn't use the exact same YAML formatting as Kubernetes manifests and so the script formatting is slightly different.

## Step 3: Install the Delegate

Follow the remaining Delegate installation steps.

See:

* [Install the Harness Kubernetes Delegate](install-kubernetes-delegate.md)
* [Install the Harness Docker Delegate](install-docker-delegate.md)

## Step 4: Verify the Script

Check the Delegate pod/host/container to see if the script ran correctly.

For example, here is a simple hello world script in a Docker Delegate:


```
...  
      - |  
        INIT_SCRIPT=  
        echo hello world!  
...
```
The Docker Delegate file is a Docker compose file so it uses YAML formatting different from Kubernetes manifest YAML.Once the Delegate in installed, run `docker ps` to get the container Id, and then run `docker logs <contain Id>`.

In the logs, you will see that your script has run before the Delegate is installed.

The script is run between `Starting initialization script for Delegate` and `Completed executing initialization script`:


```
% docker logs 9d405639948f  
Watcher not running  
Delegate not running  
  
Starting initialization script for Delegate  
hello world!  
Completed executing initialization script  
Checking Watcher latest version...  
The current version 1.0.72500 is not the same as the expected remote version 1.0.72702  
Downloading Watcher 1.0.72702 ...  
######################################################################## 100.0%  
Checking Delegate latest version...  
Downloading Delegate  ...  
#=#=#                                                                           
Watcher started  

```
## See Also

* [Automate Harness Kubernetes Delegate Setup](automate-harness-kubernetes-delegate-setup.md)

