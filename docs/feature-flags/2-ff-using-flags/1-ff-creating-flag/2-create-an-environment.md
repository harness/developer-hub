---
title: Create an Environment
description: Once you've created a Project, you need to create an Environment before you create a Feature Flag. Feature Flags can be used independently across multiple Environments within a single Project, for ex…
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: nh1n5qtjmm
helpdocs_category_id: gjyyhm9f9h
helpdocs_is_private: false
helpdocs_is_published: true
---

Once you've created a Project, you need to create an Environment before you create a Feature Flag. Feature Flags can be used independently across multiple Environments within a single Project, for example:

* In Project X you have two Environments, `Environment_A` and `Environment_B`.
* You create `Flag_1`.
* In `Environment_A` you could have `Flag_1` toggled `on`, but in `Environment_B`, `Flag_1` is toggled `off`.

![A side by side screenshot that shows the same Flag in two environments. One is toggled on and one is toggled off.  ](./static/2-create-an-environment-03.png)*Figure 1: Flag\_1 in different Environments* 

This topic describes how to create an Environment in the Harness platform. 

To read more about the Harness Platform, see [Harness Platform](https://harness.helpdocs.io/category/3fso53aw1u-howto-general).

## Before you begin

Before you create a Feature Flag, you must have:

1. [Created an Organization](https://docs.harness.io/article/36fw2u92i4-create-an-organization)
2. [Created a Project](1-create-a-project.md)

## Create an Environment

1. In your Project, in **Environments**, click **Create an Environment**.
2. Enter a **Name** for your Environment.
3. Select the **Environment type** and click **Create**.

![A screenshot of the Create an Environment form. ](./static/2-create-an-environment-04.png)*Figure 2: Create an Environment form*

4. Your environment is created and you can find it listed in **Environments**.

## Next step

* [Create an SDK Key](3-create-an-sdk-key.md) to authorize your application's access to the Feature Flag client.

