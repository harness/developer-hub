---
title: Enable or Disable a Policy Set
description: Disable a Policy Set by locating the Policy Set and toggling the Enforced setting to off.
# sidebar_position: 2
helpdocs_topic_id: 6lxxd5j8j5
helpdocs_category_id: zoc8fpiifm
helpdocs_is_private: false
helpdocs_is_published: true
---

By default, a new Harness Policy Set is disabled. This default prevents someone from enforcing a Policy Set and accidentally impacting Pipelines and other Harness resources.

In some cases, you might have an enabled Policy Set and need to disable it. For example, if a Policy Set is enabled and an unintended Pipeline or other resource does not pass the Policy Set's evaluation, you will receive a failure, like this:

![](./static/disable-a-policy-set-53.png)
You can contact your Harness account admin to resolve the issue or, if the Policy Set is in error, you can disable it by locating the Policy Set and toggling the **Enforced** setting to off:

![](./static/disable-a-policy-set-54.png)
### Before you begin

* [Harness Policy As Code Overview](harness-governance-overview.md)
* [Harness Policy As Code Quickstart](harness-governance-quickstart.md)

### Step 1: Locate the Policy Set

In your Harness account/Org/Project, click **Policies**.

Click **Policy Sets**.

Toggle the **Enforced** setting to off.

![](./static/disable-a-policy-set-55.png)
### Notes

* To prevent issues with team members Pipelines and resources when creating a new Policy Set, a new Policy Set is disabled by default.

### See also

* [Add a Policy Step to a Pipeline](add-a-governance-policy-step-to-a-pipeline.md)

