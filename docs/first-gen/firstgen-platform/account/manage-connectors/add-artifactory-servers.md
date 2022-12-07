---
title: Add Artifactory Servers
description: Connect your Artifactory artifact servers with Harness.
# sidebar_position: 2
helpdocs_topic_id: nj3p1t7v3x
helpdocs_category_id: ll7h8ktlwe
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness supports both cloud and on-prem versions of Artifactory. Connect your Artifactory artifact servers with Harness.

### Before You Begin

* See [Harness Key Concepts](/article/4o7oqwih6h-harness-key-concepts).

### Visual Summary

Here's an example of the Artifactory Sources configuration.

![](https://files.helpdocs.io/kw8ldg1itf/articles/7dghbx1dbl/1587761892279/image.png)### Review: Artifactory Permissions

Make sure the following permissions are granted to the user:

* Privileged User is required to access API, whether Anonymous or a specific username (username and passwords are not mandatory).
* Read permission to all Repositories.

If used as a Docker Repo, user needs:

* List images and tags
* Pull images

See [Managing Permissions: JFrog Artifactory User Guide](https://www.jfrog.com/confluence/display/RTF/Managing+Permissions)

### Review: Label Support

Docker labels are supported for Docker images in Artifactory.

You can reference a label using this expression in a [Shell Script](/article/1fjrjbau7x-capture-shell-script-step-output) step:

`${artifact.label.get("<label-key>")}`

See [Built-in Variables List (FirstGen)](/article/aza65y4af6-built-in-variables-list).

### Step 1: Select Artifactory Server

To connect to an artifact server, do the following:

1. Click **Setup**.
2. Click **Connectors**.
3. Click **Artifact Servers**.
4. Click **Add Artifact Server**.
5. In **Type**, select **Artifactory**.

### Step 2: Display Name

Enter a name for the Artifactory Server. This is the name you will use to identify this connection when adding an Artifact Source to a Harness Service.

### Step 3: Artifactory URL

In the **Artifactory URL** field, ensure that you enter in your base URL followed by your module name.

For most artifacts, use **https://mycompany.jfrog.io/*****module\_name***.

In some cases, you can use **https://*****server\_name*****/artifactory/*****module\_name***.

The URL really depends on how you have set up Artifactory, and whether it is local, virtual, remote, or behind a proxy.

To ensure you use the correct URL, copy it from your Artifactory settings.

See [Repository Management](https://www.jfrog.com/confluence/display/JFROG/Repository+Management) from JFrog.

### Step 4: Credentials and Usage Scope

Enter the credentials.

For secrets and other sensitive settings, select or create a new [Harness Encrypted Text secret](/article/ygyvp998mu-use-encrypted-text-secrets).

Usage Scope is determined by the secret you selected.

### Step 5: Delegate Selector

Select the Delegate Selector(s) of the Delegate(s) you want this Connector to use.

When Harness needs to run a task, it makes a connection to a resource via its Delegates. Harness selects the best Delegate according to its history or it round-robins between Delegates. See [How Does Harness Manager Pick Delegates?](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation#how_does_harness_manager_pick_delegates).

In a few cases, you might want Harness to select specific Delegates. In these cases, you can use Delegate Selectors.

See [Select Delegates with Selectors](/article/c3fvixpgsl-select-delegates-for-specific-tasks-with-selectors).

### Step 6: Skip Validation

Select **Skip Validation** to skip credential verification and creation or update process.

### See Also

* [Add a Docker Artifact Source](/article/gxv9gj6khz-add-a-docker-image-service)

