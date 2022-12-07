---
title: Edit Harness Components as YAML
description: You can view or edit the code for any account or Application entity and its configuration. Before you can edit account and Application YAML, you must have the correct User Group Account and Applicati…
# sidebar_position: 2
helpdocs_topic_id: r5vya3dlt0
helpdocs_category_id: 2ea2y01kgz
helpdocs_is_private: false
helpdocs_is_published: true
---

You can view or edit the code for any account or Application entity and its configuration.

Before you can edit account and Application YAML, you must have the correct User Group Account and Application Permissions. See [Using RBAC for YAML Files](/article/htvzryeqjw-configuration-as-code#using_rbac_for_yaml_files).### Before You Begin

* [Configuration as Code](/article/htvzryeqjw-configuration-as-code)
* [Harness Account-Level Git Sync](/article/apiwdqngvz-harness-account-level-sync)
* [Harness Application-Level Git Sync](/article/6mr74fm55h-harness-application-level-sync)

### Step: Edit the Code

1. In **Setup,** click **Configuration As Code**.
2. Select the YAML file that you want to edit and click **Edit**.![](https://files.helpdocs.io/kw8ldg1itf/articles/r5vya3dlt0/1594747903401/screenshot-2020-07-14-at-11-00-35-pm.png)
3. Edit the YAML file and click **Save**.![](https://files.helpdocs.io/kw8ldg1itf/articles/r5vya3dlt0/1594748236599/screenshot-2020-07-14-at-11-04-22-pm.png)

You can configure any settings using YAML anywhere in Harness by clicking the **YAML** editor button.

### See Also

* [Harness YAML Code Reference](/article/21kgaw4h86-harness-yaml-code-reference)

### Notes

* **Do not change a variable type in YAML**—You are not prevented from changing a user variable type to `ENTITY` in YAML; however, this may lead problems as `ENTITY` is for internal settings, such as Application Environments, Workflows, etc.

