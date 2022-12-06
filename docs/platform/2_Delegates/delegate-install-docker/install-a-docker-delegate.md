---
title: Install a Docker Delegate
description: Install a Docker Delegate.
# sidebar_position: 2
helpdocs_topic_id: cya29w2b99
helpdocs_category_id: cybg19aoxt
helpdocs_is_private: false
helpdocs_is_published: true
---

The Harness Delegate is a worker process you run in your deployment target environment, such as your local network, VPC, or cluster. The Delegate connects all of your artifact, infrastructure, collaboration, verification and other providers with the Harness Manager.

Most importantly, the Delegate performs all deployment operations.

There are several types of Delegates. This topic describes how to install the Docker Delegate.

### Before you begin

* [Delegate Installation Overview](https://docs.harness.io/article/re8kk0ex4k-delegate-installation-overview)
* [Projects and Organizations](../../1_Organizations-and-Projects/1-projects-and-organizations.md)

### Review: System Requirements

The Docker Delegate has the following system requirements:

* Default 0.5 CPU.
* Default 768MB RAM: there is a cap of 768MB per Delegate, but when the Delegate is updating there might be two Delegates running. Hence, the minimum is 1.5GB. Ensure that you provide the minimum memory for the Delegate and enough memory for the host/node system.

### Step 1: Download the Docker Delegate

The Delegate can be installed at the Harness account, Organization, or Project level.

You can install a Delegate as part of setting up a Connector or independent of another process.

Once you have selected **New Delegate** on a Delegates page or as part of setting up a Connector, the Delegates selection page appears.

![](./static/install-a-docker-delegate-00.png)
Click **Docker** and then click **Continue**.

### Step 2: Name and Tag the Delegate

Enter a name for the Delegate. This is the name you will see when the Delegate is listed in Harness.

**Do not run Delegates with the same name in different clusters.** See [Troubleshooting](https://docs.harness.io/article/jzklic4y2j-troubleshooting).Add Tags to the Delegate. By default, Harness adds a Tag using the name you enter, but you can more. Simply type them in and press Enter.

These Tags are useful for selecting the Delegate when creating a Connector.

![](./static/install-a-docker-delegate-01.png)
Click **Continue**.

### Step 3: Run the Docker Delegate Script

If you system already has a Delegate image, then Harness doesn't pull the latest image when you run `docker-compose`. Simply run `docker pull harness/delegate` to pull the latest.Now you can see the YAML file for the Delegate:

![](./static/install-a-docker-delegate-02.png)
Click **Download YAML file** and copy the Docker compose file to a machine where you have Docker installed.

Run the following command to install the Delegate in Docker:


```
docker-compose -f docker-compose.yaml up -d
```
The Delegate installs. Type docker ps to see the container:


```
CONTAINER ID        IMAGE                     COMMAND                  CREATED             STATUS                          PORTS                    NAMES  
6b242707a57a        harness/delegate:latest   "/bin/sh -c './entry…"   3 days ago          Up 32 seconds                                            local-docker_harness-ng-del
```
#### Verification

For an overview of verification, see [Delegate Registration and Verification](../delegate-guide/delegate-registration.md).

In the Delegate wizard, click **Verify** and Harness will verify that it is receiving heartbeats from the Delegate.

Your Delegate is installed.

You can see the registered Delegate in the Delegate list.

![](./static/install-a-docker-delegate-03
Note the **Connected** status. If there is a connectivity error, you will see **Not Connected**. If there's an error, ensure the Docker host can connect to `https://app.harness.io`.

That's it. The Delegate is installed and registered and connected.

### Harness Docker Delegate Environment Variables

The following table lists each of the environment variables in the Harness Docker Delegate YAML.



|  |  |  |
| --- | --- | --- |
| **Name** | **Description** | **Example** |
| `ACCOUNT_ID` | The Harness account Id for the account where this Delegate will attempt to register. | ```- ACCOUNT_ID=H5W8i2828282828Xg```|
| `DELEGATE_TOKEN` | The Harness account token used to register the Delegate. | ```- DELEGATE_TOKEN=d229ee88bf7bbxxxx6ea```|
| `MANAGER_HOST_AND_PORT` | The Harness SaaS manager URL. `https` indicates port 443. |```- MANAGER_HOST_AND_PORT=https://app.harness.io```|
| `WATCHER_STORAGE_URL` | The URL for the Watcher versions.See [Delegate Installation Overview](https://docs.harness.io/article/re8kk0ex4k-delegate-installation-overview). | ```- WATCHER_STORAGE_URL=https://app.harness.io/public/prod/premium/watchers```|
| `WATCHER_CHECK_LOCATION` | The Delegate version location for the Watcher to check for. | ```- name: WATCHER_CHECK_LOCATION  value: current.version```|
| `REMOTE_WATCHER_URL_CDN` | The CDN URL for Watcher builds. | ```- name: REMOTE_WATCHER_URL_CDN  value: https://app.harness.io/public/shared/watchers/builds```|
| `DELEGATE_STORAGE_URL` | The URL where published Delegate jars are stored. | ```- name: DELEGATE_STORAGE_URL  value: https://app.harness.io```|
| `DELEGATE_CHECK_LOCATION` | The storage location hosting the published Delegate versions. | ```- name: DELEGATE_CHECK_LOCATION  value: delegateprod.txt```|
| `DEPLOY_MODE` | Deployment mode: Kubernetes, Docker, etc. | ```- name: DEPLOY_MODE  value: DOCKER```|
| `DELEGATE_NAME` | The name of the Delegate. This is the name that will appear in Harness when the Delegate is registered.You can automate Delegate creation by omitting the name, and then have a script copying the Delegate YAML file and add a unique name to `value` for each new Delegate you want to register.See [Automate Delegate Installation](../delegate-guide/automate-delegate-installation.md). | ```- name: DELEGATE_NAME  value: qa```|
| `NEXT_GEN` | Indicates that this Delegate will register in [Harness NextGen](https://docs.harness.io/article/ra3nqcdbaf-compare-first-gen-and-next-gen).If it set to `false`, the Delegate will attempt to register in Harness FirstGen. | ```- name: NEXT_GEN  value: "true"```|
| `DELEGATE_DESCRIPTION` | The description added to the Delegate in the Harness Manager or YAML before registering.It appears in the Delegate details page in the Harness Manager. | ```- name: DELEGATE_DESCRIPTION  value: ""```|
| `DELEGATE_TYPE` | The type of Delegate. | ```- name: DELEGATE_TYPE  value: "DOCKER"```|
| `DELEGATE_TAGS` | The Tags added to the Delegate in the Harness Manager or YAML before registering.Tags are generated by Harness using the Delegate name but you can also add your own Tags.Tags appear in the Delegate details page in the Harness Manager.See [Tags Reference](../../20_References/tags-reference.md) and [Select Delegates with Tags](../delegate-guide/select-delegates-with-selectors.md). | ```- name: DELEGATE_TAGS  value: ""```|
| `DELEGATE_TASK_LIMIT` | The maximum number of tasks the Delegate can perform at once.All of the operations performed by the Delegate are categorized as different types of tasks. | ```- name: DELEGATE_TASK_LIMIT  value: "50"```|
| `DELEGATE_ORG_IDENTIFIER` | The Harness Organization [Identifier](../../20_References/entity-identifier-reference.md) where the Delegate will register.Delegates at the account-level do not have a value for this variable. | ```- name: DELEGATE_ORG_IDENTIFIER  value: "engg"```|
| `DELEGATE_PROJECT_IDENTIFIER` | The Harness Project [Identifier](../../20_References/entity-identifier-reference.md) where the Delegate will register.Delegates at the account or Org-level do not have a value for this variable. | ```-name: DELEGATE_PROJECT_IDENTIFIER  value: "myproject"```|
| `PROXY_MANAGER` | Indicates whether to use the Harness Manager or a proxy. If you use `true` (the default) you are indicating that you proxy outbound traffic to Harness. | ```- PROXY_MANAGER=true```|
| `INIT_SCRIPT` | You can run scripts on the Delegate using `INIT_SCRIPT`.For example, if you wanted to install software on the Delegate pod, you can enter the script in `INIT_SCRIPT` and then apply the Delegate YAML.A multiline script must follow the YAML spec for [literal scalar style](https://yaml.org/spec/1.2-old/spec.html#id2795688).See [Run Scripts on Delegates](../delegate-guide/run-scripts-on-delegates.md). | ```- INIT_SCRIPT=  echo hello world!```|
| `USE_CDN` | Makes the Delegate use a CDN for new versions. | ```- name: USE_CDN  value: "true"```|
| `CDN_URL` | The CDN URL for Delegate versions. | ```- name: CDN_URL  value: https://app.harness.io```|
| `VERSION_CHECK_DISABLED` | By default, the Delegate always checks for new versions (via the Watcher). | ```- name: VERSION_CHECK_DISABLED  value: "false"```|

### See also

* [Automate Delegate Installation](../delegate-guide/automate-delegate-installation.md)

