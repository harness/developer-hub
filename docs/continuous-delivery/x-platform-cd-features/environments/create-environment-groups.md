---
title: Create environment groups
description: Learn how to group environments.
sidebar_position: 3
---

Environment groups are simple a way to group environments so you can assign permissions to multiple environments in a role.

1. From your project, select **Environments**.
2. Select **Environment Groups** on the top of the page.
3. Select **New Environment Group**.
   
![create environment groups](./static/services-and-environments-overview-23.png)

4. Enter a name for the environment group, and select the environments you want to add to this group. You can also create **New Environment** and add it to this group.

![environment groups](./static/environment-groups.png)

Here is a sample environment group YAML.

```
environmentGroup:
  name: My Env Group
  identifier: My_Env_Group
  description: ""
  tags: {}
  orgIdentifier: default
  projectIdentifier: CD_Docs
  envIdentifiers:
    - myenv
    - dev_1679347042451
```

5. Select **Submit**.