---
title: Install a Docker Delegate
description: Install a Docker Delegate.
# sidebar_position: 2
helpdocs_topic_id: cya29w2b99
helpdocs_category_id: cybg19aoxt
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Delegate is a worker process that you run in your deployment target environment, such as your local network, VPC, or cluster. The delegate connects artifact, infrastructure, collaboration, verification and other providers with Harness Manager.

Most importantly, the delegate performs all deployment operations.

There are several types of delegates. This topic describes how to install Docker Delegate.

### Before you begin

* [Delegate Installation Overview](../delegate-installation-overview.md)
* [Projects and Organizations](../../1_Organizations-and-Projects/1-projects-and-organizations.md)

### Review: System Requirements

Docker Delegate has the following system requirements:

* Default 0.5 CPU.
* Default 768MB RAM. There is a cap of 768MB per delegate, but when the delegate is updating there might be two delegates running. Hence, the minimum is 1.5 GB. Ensure that you provide the minimum memory for the delegate and enough memory for the host/node system.

### Step 1: Download Docker Delegate

Docker Delegate can be installed at the Harness account, Organization, or Project level.

You can install Docker Delegate while setting up a connector or independent of another process.

After you select **New Delegate** on the Delegate page or while setting up a connector, the delegate selection page appears.

![](./static/install-a-docker-delegate-00.png)

Click **Docker** and then click **Continue**.

### Step 2: Name and tag the delegate

Enter a name for the delegate. This name will identify the delegate in Harness Manager.

**Do not run delegates with the same name in different clusters.** See [Troubleshooting](../../../troubleshooting/troubleshooting-nextgen.md). Add Tags to the Delegate. By default, Harness adds a tag using the name you enter. To add more, type them in and press **Enter**.

These tags are useful for selecting the delegate when creating a connector.

![](./static/install-a-docker-delegate-01.png)

Click **Continue**.

### Step 3: Run the Docker Delegate script

If you system already has a delegate image, Harness doesn't pull the latest image when you run `docker-compose`. Simply run `docker pull harness/delegate` to pull the latest. Now you can see the YAML file for the delegate:

![](./static/install-a-docker-delegate-02.png)
Click **Download YAML file** and copy the Docker compose file to a machine where you have Docker installed.

Run the following command to install the delegate in Docker:

```
docker-compose -f docker-compose.yaml up -d
```
The delegate installs. Type `docker ps` to see the container:


```
CONTAINER ID        IMAGE                     COMMAND                  CREATED             STATUS                          PORTS                    NAMES  
6b242707a57a        harness/delegate:latest   "/bin/sh -c './entry…"   3 days ago          Up 32 seconds                                            local-docker_harness-ng-del
```
#### Verification

For an overview of verification, see [Delegate Registration and Verification](../delegate-guide/delegate-registration.md).

In the delegate wizard, click **Verify** and Harness will verify that it is receiving heartbeats from the delegate.

Your delegate is installed.

The registered delegate appears in the delegate list.

![](./static/install-a-docker-delegate-03

Note the **Connected** status. If there is a connectivity error, you will see **Not Connected**. If there's an error, ensure the Docker host can connect to `https://app.harness.io`.

That's it. The delegate is installed and registered and connected.

### Harness Docker Delegate Environment Variables

The following table lists each of the environment variables in the application manifest of the Docker Delegate.

| **Name** | **Description** | **Example** |
| --- | --- | --- |
| `ACCOUNT_ID` | The Harness account ID for the account where this Delegate will attempt to register. | ```- ACCOUNT_ID=H5W8i2828282828Xg```|
| `DELEGATE_TOKEN` | The Harness account token used to register the Delegate. | ```- DELEGATE_TOKEN=d229ee88bf7bbxxxx6ea```|
| `MANAGER_HOST_AND_PORT` | The Harness SaaS manager URL. `https` indicates port 443. |```- MANAGER_HOST_AND_PORT=https://app.harness.io```|
| `WATCHER_STORAGE_URL` | The URL for the Watcher versions. See [Delegate Installation Overview](../delegate-installation-overview.md). | ```- WATCHER_STORAGE_URL=https://app.harness.io/public/prod/premium/watchers```|
| `WATCHER_CHECK_LOCATION` | The Delegate version location for the Watcher to check for. | ```- name: WATCHER_CHECK_LOCATION  value: current.version```|
| `REMOTE_WATCHER_URL_CDN` | The CDN URL for Watcher builds. | ```- name: REMOTE_WATCHER_URL_CDN  value: https://app.harness.io/public/shared/watchers/builds```|
| `DELEGATE_STORAGE_URL` | The URL where published delegate jars are stored. | ```- name: DELEGATE_STORAGE_URL  value: https://app.harness.io```|
| `DELEGATE_CHECK_LOCATION` | The storage location hosting the published delegate versions. | ```- name: DELEGATE_CHECK_LOCATION  value: delegateprod.txt```|
| `DEPLOY_MODE` | Deployment mode: Kubernetes, Docker, and so on | ```- name: DEPLOY_MODE  value: DOCKER```|
| `DELEGATE_NAME` | The name of the delegate. This is the name that appears in Harness when the delegate is registered. You can automate delegate creation by omitting the name, and then have a script copying the delegate YAML file and add a unique name to `value` for each new delegate you want to register. See [Automate Delegate Installation](../delegate-guide/automate-delegate-installation.md). | ```- name: DELEGATE_NAME  value: qa```|
| `NEXT_GEN` | Indicates that this delegate will register in Harness NextGen(`true`) or FirstGen(`false`). | ```- name: NEXT_GEN  value: "true"```|
| `DELEGATE_DESCRIPTION` | The description added to the delegate in Harness Manager or YAML before registering. It appears in the delegate details page in the Harness Manager. | ```- name: DELEGATE_DESCRIPTION  value: ""```|
| `DELEGATE_TYPE` | The type of delegate. | ```- name: DELEGATE_TYPE  value: "DOCKER"```|
| `DELEGATE_TAGS` | The tags added to the delegate in Harness Manager or YAML before registering. Tags are generated by Harness using the delegate name but you can also add your own tags. Tags appear in the delegate details page in Harness Manager. See [Tags Reference](../../20_References/tags-reference.md) and [Select Delegates with Tags](../delegate-guide/select-delegates-with-selectors.md). | ```- name: DELEGATE_TAGS  value: ""```|
| `DELEGATE_TASK_LIMIT` | The maximum number of tasks the delegate can perform at once. All of the operations performed by the delegate are categorized as different types of tasks. | ```- name: DELEGATE_TASK_LIMIT  value: "50"```|
| `DELEGATE_ORG_IDENTIFIER` | The Harness Organization [Identifier](../../20_References/entity-identifier-reference.md) where the delegate will register. Delegates at the account level do not have a value for this variable. | ```- name: DELEGATE_ORG_IDENTIFIER  value: "engg"```|
| `DELEGATE_PROJECT_IDENTIFIER` | The Harness project [identifier](../../20_References/entity-identifier-reference.md) where the delegate will register. Delegates at the account or Org-level do not have a value for this variable. | ```-name: DELEGATE_PROJECT_IDENTIFIER  value: "myproject"```|
| `PROXY_MANAGER` | Indicates whether to use the Harness Manager or a proxy. If you use `true` (the default) you are indicating that you proxy outbound traffic to Harness. | ```- PROXY_MANAGER=true```|
| `INIT_SCRIPT` | You can run scripts on the delegate using `INIT_SCRIPT`. For example, if you wanted to install software on the delegate pod, you can enter the script in `INIT_SCRIPT` and then apply the delegate YAML. A multiline script must follow the YAML `spec` for [literal scalar style](https://yaml.org/spec/1.2-old/spec.html#id2795688). See [Run Scripts on Delegates](../delegate-guide/run-scripts-on-delegates.md). | ```- INIT_SCRIPT=  echo hello world!```|
| `USE_CDN` | Makes the delegate use a CDN for new versions. | ```- name: USE_CDN  value: "true"```|
| `CDN_URL` | The CDN URL for delegate versions. | ```- name: CDN_URL  value: https://app.harness.io```|
| `VERSION_CHECK_DISABLED` | By default, the delegate always checks for new versions (via the Watcher). | ```- name: VERSION_CHECK_DISABLED  value: "false"```|

### See also

* [Automate Delegate Installation](../delegate-guide/automate-delegate-installation.md)

