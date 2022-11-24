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

![](https://files.helpdocs.io/i5nl071jo5/articles/jzklic4y2j/1654622380011/clean-shot-2022-06-07-at-10-19-25.png)You can contact your Harness account admin to resolve the issue or, if the Policy Set is in error, you can disable it by locating the Policy Set and toggling the **Enforced** setting to off:

![](https://files.helpdocs.io/i5nl071jo5/articles/jzklic4y2j/1654622856463/clean-shot-2022-06-07-at-10-27-13.png)### Before You Begin

* [Harness Policy As Code Overview](/article/1d3lmhv4jl-harness-governance-overview)
* [Harness Policy As Code Quickstart](/article/jws2znftay-harness-governance-quickstart)

### Step 1: Locate the Policy Set

In your Harness account/Org/Project, click **Policies**.

Click **Policy Sets**.

Toggle the **Enforced** setting to off.

![](https://files.helpdocs.io/i5nl071jo5/articles/6lxxd5j8j5/1654623141098/clean-shot-2022-06-07-at-10-31-41.png)### Notes

* To prevent issues with team members Pipelines and resources when creating a new Policy Set, a new Policy Set is disabled by default.

### See Also

* [Add a Policy Step to a Pipeline](/article/xy8zsn8fa3-add-a-governance-policy-step-to-a-pipeline)

