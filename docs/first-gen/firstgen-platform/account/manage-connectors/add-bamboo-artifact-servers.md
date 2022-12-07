---
title: Add Bamboo Artifact Servers
description: Connect your Bamboo artifact servers with Harness.
# sidebar_position: 2
helpdocs_topic_id: feks6co940
helpdocs_category_id: ll7h8ktlwe
helpdocs_is_private: false
helpdocs_is_published: true
---

Connect your Bamboo artifact servers with Harness.

In this topic:

* [Before You Begin](#before_you_begin)
* [Review: Build Plan Permissions](#review_build_plan_permissions)
* [Step 1: Select the Bamboo Artifact Server](#step_1_select_the_bamboo_artifact_server)
* [Step 2: Display Name](#step_2_display_name)
* [Step 3: Bamboo URL](#step_3_bamboo_url)
* [Step 4: Enter the Credentials](#step_4_enter_the_credentials)

### Before You Begin

* See [Harness Key Concepts](/article/4o7oqwih6h-harness-key-concepts).

### Review: Build Plan Permissions

Make sure the connected user account has the following required permissions to the Bamboo Server.

* View plan.
* Build plan (if you plan to trigger a build as part of your workflow).

For more information, see [Bamboo Permissions](https://confluence.atlassian.com/bamboo/bamboo-permissions-369296034.html).

### Step 1: Select the Bamboo Artifact Server

To connect to an artifact server, do the following:

1. Click **Setup**.
2. Click **Connectors**.
3. Click **Artifact Servers**.
4. Click **Add Artifact Server**.
5. In **Type**, click **Bamboo**.

### Step 2: Display Name

Enter a name for the Bamboo Server. This is the name you will use to identify this connection when adding an Artifact Source to a Harness Service.

### Step 3: Bamboo URL

Enter the URL of the Bamboo server.

### Step 4: Enter the Credentials

Enter the username and the secret.

For secrets and other sensitive settings, select or create a new [Harness Encrypted Text secret](/article/ygyvp998mu-use-encrypted-text-secrets).

Usage Scope is determined by the secret you selected.

Click **Submit**.

