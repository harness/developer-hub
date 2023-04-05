---
title: Create an Environment
description: Once you've created a Project, you need to create an Environment before you create a Feature Flag. Feature Flags can be used independently across multiple Environments within a single Project, for ex…
sidebar_position: 20
helpdocs_topic_id: nh1n5qtjmm
helpdocs_category_id: gjyyhm9f9h
helpdocs_is_private: false
helpdocs_is_published: true
---

```mdx-code-block
import create_env from './static/2-create-an-environment-04.png'
```

Once you've created a project, you need to create an environment before you create a Feature Flag. Feature Flags can be used independently across multiple environments within a single project, for example:

* In Project X you have two environments, `Environment_A` and `Environment_B`.
* You create `Flag_1`.
* In `Environment_A` you could have `Flag_1` toggled `on`, but in `Environment_B`, `Flag_1` is toggled `off`.


![A side by side screenshot that shows the same flag in two environments. One is toggled on and one is toggled off.  ](./static/2-create-an-environment-03.png)*Figure 1: Flag\_1 in different environments* 

This topic describes how to create an environment in the Harness platform. 

To read more about the Harness Platform, see [Harness Platform](https://harness.helpdocs.io/category/3fso53aw1u-howto-general).

## Before you begin

Before you create a Feature Flag, you must have:

1. [Created an Organization](../../../platform/organizations-and-projects/create-an-organization.md)
1. [Created a project](create-a-project.md)

## Create an environment

1. In your project, in **Environments**, click **Create an Environment**.
1. Enter a **Name** for your environment.

    Harness generates a unique identifier for names. For details and restrictions, go to [Entity Identifier Reference](/docs/platform/references/entity-identifier-reference).

1. Select the **Environment type** and click **Create**.

    ```mdx-code-block
    <img src={create_env} alt="A screenshot of the Create an Environment form. " height="500" width="350" />
    ```
    *Figure 2: Create an Environment form*

1. Your environment is created and you can find it listed in **Environments**.

## Next step

* [Create an SDK key](create-an-sdk-key.md) to authorize your application's access to the Feature Flag client.

