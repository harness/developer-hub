---
title: Install a Docker delegate
description: This topic explains how to install a Docker delegate.
# sidebar_position: 2
helpdocs_topic_id: cya29w2b99
helpdocs_category_id: cybg19aoxt
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Delegate is a worker process that you run in your deployment target environment, for example, your local network, VPC, or cluster. The delegate connects artifact, infrastructure, collaboration, verification, and other providers with Harness Manager. The delegate performs all deployment operations.

There are several types of delegates. This topic describes how to install the Docker delegate.

### Before you begin

* [Delegate installation overview](/docs/platform/2_Delegates/get-started-with-delegates/delegate-installation-overview.md)
* [Projects and organizations](/docs/platform/organizations-and-projects/projects-and-organizations.md)

### Review: System requirements

The Docker delegate has the following system requirements:

* Default 0.5 CPU.
* Default 768MB RAM. There is a cap of 768 MB per delegate, but when the delegate is updating there might be two delegates running. Hence, the minimum is 1.5 GB. 
 
You must allocate resources to meet the minimum requirements of the delegate *in addition* to the allocation you make to meet the requirements of the host/node system. 

### Step 1: Download the Docker delegate

The delegate can be installed at the Harness account, organization, or project level.

You can install the Docker delegate when you set up a connector or independent of another process.

After you select **New Delegate** on the Delegate page, or when you set up a connector, the **Delegates** selection page appears.

![](./static/install-a-docker-delegate-00.png)

Click **Docker** and then click **Continue**.

### Step 2: Name and tag the delegate

Enter a name for the delegate. This name identifies the delegate in Harness Manager.

**Do not run delegates with the same name in different clusters.** See [Troubleshooting](/docs/troubleshooting/troubleshooting-nextgen.md).

Add tags to the delegate. By default, Harness adds a tag using the name you enter. To add more, type them in and press **Enter**.

You can use tags to select the delegate you want to run when you create a connector.

![](./static/install-a-docker-delegate-01.png)

Click **Continue**.

### Step 3: Run the Docker delegate script

If your system already has a delegate image, Harness doesn't pull the latest image when you run `docker-compose`. To pull the latest, run `docker pull harness/delegate`. Then you can review the delegate YAML file:

![](./static/install-a-docker-delegate-02.png)

Click **Download YAML file** and copy the Docker compose file to a machine where you have Docker installed.

Run the following command to install the Delegate in Docker:

```
docker-compose -f docker-compose.yaml up -d
```

The delegate installs. Type `docker ps` to see the container:


```
CONTAINER ID        IMAGE                     COMMAND                  CREATED             STATUS                          PORTS                    NAMES  
6b242707a57a        harness/delegate:latest   "/bin/sh -c './entry…"   3 days ago          Up 32 seconds                                            local-docker_harness-ng-del
```

#### Verification

For an overview of verification, see [Delegate Registration and Verification](/docs/platform/2_Delegates/get-started-with-delegates/delegate-registration.md).

In the delegate installer, click **Verify**. Harness will verify the receipt of heartbeats from the delegate.

Your delegate is installed.

You registered delegate appears in the delegate list.

![](./static/install-a-docker-delegate-03.png)

Note the **Connected** status. If there is a connectivity error, the status is **Not Connected**. If there's an error, ensure the Docker host can connect to `https://app.harness.io`.

For a list of the environment variables you can use with the Docker delegate, see [Docker delegate environment variables](/docs/platform/2_Delegates/delegate-reference/docker-delegate-environment-variables).

### See also

* [Automate delegate installation](/docs/platform/2_Delegates/advanced-installation/automate-delegate-installation.md)

