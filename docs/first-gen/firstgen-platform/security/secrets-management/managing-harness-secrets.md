---
title: View Secrets Usage
description: You can view a Secret's Setup Usage, Runtime Usage, and Change Logs. You can also delete a Secret.
# sidebar_position: 2
helpdocs_topic_id: 8bldcebkkf
helpdocs_category_id: o9x167at52
helpdocs_is_private: false
helpdocs_is_published: true
---

You can view a Secret's Setup Usage, Runtime Usage, and Change Logs. You can also delete a Secret.

In this topic:

* [Before You Begin](#before_you_begin)
* [Step 1: View a Secret's Setup Usage](#step_1_view_a_secret_s_setup_usage)
* [Step 2: View a Secret's Runtime Usage](#step_2_view_a_secret_s_runtime_usage)
* [Step 3: View a Secret's Change Log](#step_3_view_a_secret_s_change_log)
* [Option: Deleting Harness Secrets](#option_deleting_harness_secrets)

### Before You Begin

* See the overview of [Secrets Management](secret-management.md).

### Step 1: View a Secret's Setup Usage

1. In Harness, click **Security**, and then click **Secrets Management**.
2. In **Secrets Management**, click **Encrypted Text**. The list of Encrypted Texts appear.
3. In the **Setup Usage** column, click the number corresponding to the secret to view the usage of the secret.

The **Setup Usage** window appears and displays the following details:

* **Type** - The type of element, such as Connector or Cloud Provider.
* **Usage** - Where the secret has been used
	+ **Name** - Name of the Application
	+ **Field** - field where the secret has been used as part of the setup process

If the Secret has been used as a **Service Configuration Variable**, it displays the Service where the Secret has been used and the variable name.

For Encrypted Files, the **Setup Usage** displays the following details:

* **Type** - Service Configuration File
* **Usage** details
	+ **Service** - Name of the Service
	+ **Relative File Path** - The variable defining the relative file path

If the secret has not been used already, the number will be 0 and no details will be displayed.

Only Encrypted Text secrets used in Service Config Variables are counted in Setup Usage.

### Step 2: View a Secret's Runtime Usage

In the Run Time Usage column, click the number to view the run time usage details of the secret.

The Run Time Usage window displays a list of deployments where the secret has been used and the triggered time for each deployment. Click the Deployment Name to access the deployment.

If the secret has not been used for deployments already, the number will be 0 and no details will be displayed.

Only Encrypted Text secrets used in Service Config Variables are counted in Runtime Usage.

### Step 3: View a Secret's Change Log

In the **Change Log** column, click the number associated with the secret. The **Change Log** window appears. It shows the following details:

Name of the user who changed the Secret

Time when the Secret was changed

The specific details of the change, such as whether the password was created, changed, or modified.

### Option: Deleting Harness Secrets

In the row where the Secret appears, click **X** that appears in the last column to delete the Secret. The **Confirm Delete** window appears.

Click **Confirm** to delete the Secret.

When you delete an Encrypted Text secret, Harness only checks to see if it is used in Service Config Variables.