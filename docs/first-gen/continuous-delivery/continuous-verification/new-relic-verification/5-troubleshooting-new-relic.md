---
title: Troubleshooting New Relic
description: Resolutions to common configuration problems with New Relic.
sidebar_position: 50
helpdocs_topic_id: 3d5sv5p9pf
helpdocs_category_id: 1nci5420c8
helpdocs_is_private: false
helpdocs_is_published: true
---

The following are resolutions to common configuration problems.

### Workflow Step Test Error

When you click **TEST** in the **New Relic** workflow dialog **Expression for Host Name** popover, you should get provider information:

![](./static/5-troubleshooting-new-relic-31.png)

The following error message can occur when testing the New Relic verification step in your workflow:


```
NEWRELIC_CONFIGURATION_ERROR: Error while saving New Relic configuration. No node with name ${hostName} found reporting to new relic
```
Here is the error in the Expression for Host Name popover:

![](./static/5-troubleshooting-new-relic-32.png)

#### Cause

The expression in the **Expression for Host/Container name** field is incorrect. Typically, this occurs when the wrong hostName label is selected to create the expression in the **Expression for Host/Container name** field.

#### Solution

Following the steps in [Guide From Example](#guide_from_example) again to select the correct expression. Ensure that the **hostName** label selected is under the **host** section of the YAML.

![](./static/5-troubleshooting-new-relic-33.png)

### Next Steps

* [Configuration as Code](https://docs.harness.io/article/htvzryeqjw-configuration-as-code)
* [Managing Users and Groups (RBAC)](https://docs.harness.io/article/ven0bvulsj-users-and-permissions)

