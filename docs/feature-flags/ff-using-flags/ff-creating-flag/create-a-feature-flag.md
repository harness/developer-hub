---
title: Create a Feature Flag
description: This topic describes how to create a feature flag in Harness.
sidebar_position: 40
helpdocs_topic_id: 1j7pdkqh7j
helpdocs_category_id: gjyyhm9f9h
helpdocs_is_private: false
helpdocs_is_published: true
---
```mdx-code-block
import var_settings from './static/4-create-a-feature-flag-07.png'
import multivar_settings from './static/4-create-a-feature-flag-09.png'
```

Feature Flags allow you to toggle features in your code on or off, which allows you to progressively roll out features to particular users or groups. By using Feature Flags, you can manage continuous delivery and control who sees which features and when.

This topic describes how to create a Feature Flag in the Harness platform. 

A Feature Flag is available only for the project the flag is created in, so you’ll need to create any relevant flags you want to use in each project you want to use them for.  
  
You can use the same flags across multiple environments within a single project, but the flag status in each environment is independent.

## Before you begin

Before you create a Feature Flag, you must have:

1. [Created a project](create-a-project.md)
2. [Created an environment](create-an-environment.md)
3. [Created an SDK key](create-an-sdk-key.md)

## How Feature Flag variations work

When you create a Feature Flag, you also create different options to label the logic of that flag. These are called flag variations. For example, a simple boolean flag has only two variations, `true` and `false`. 

There are two different types of Feature Flags you can create:

* **Boolean**: Has only two variations; true and false.

    ![Diagram showing the on and off variation of a boolean feature flag.](./static/4-create-a-feature-flag-05.png)*Figure 1: Variations of a boolean flag*

* **Multivariate**: Has multiple variations, you can add as many custom variations as you like.

    ![Diagram showing three variations (a 30 variation, 60 variation, and 90 variation) of a multivariate Feature Flag.](./static/4-create-a-feature-flag-06.png)*Figure 2: Variations of a multivariate flag*

## Create a boolean flag

1. In **Feature Flags**, click **+ New Flag**.
2. Select **Boolean**.
3. In **About the Flag**, in **Name**, enter a name for your flag and click **Next**.

    :::info
     When you name a flag, Harness automatically generates its identifier. You can edit the identifier when you are creating the flag, but not after it is saved. If you rename the flag, the identifier remains the same. For more information, go to [Entity Identifier Reference](../../../platform/20_References/entity-identifier-reference.md).
    :::
4. To make the Feature Flag permanent, select the **This is a permanent flag** checkbox. Permanent flags are flags you intend to stay in your system indefinitely, so we will never mark them as potentially stale.
5. Click **Next**.
6. In **Variation settings**, in **Flag Type**, select **Boolean**.
7. In the **Name** fields, enter the name for the true and false variations, for example, **True** and **False**.
8. In **Default rules for the flag**, select which variation of the flag to serve when the flag is ON or OFF, for example, True when the flag is ON and False when the flag is OFF.

    ```mdx-code-block
    <img src={var_settings} alt="A screenshot of the Variation Settings form when creating a Feature Flag." height="500" width="700" />
    ```

    *Figure 3: Variation settings*

9. Click **Save and Close**. The Feature Flag is created and is set to **OFF** by default.

    ![A screenshot of the Feature Flags page with the new flag added.](./static/4-create-a-feature-flag-08.png)*Figure 4: A boolean flag*

After you have created your Boolean flag, you can:

* [Manage the variations of the Feature Flag](../update-feature-flags/manage-variations.md)
* [Add flag prerequisites](../add-prerequisites-to-feature-flag.md)
* [Target users with flags](../ff-target-management/targeting-users-with-flags.md)

## Create a multivariate flag

Multivariate Feature Flags allow you to serve a different variation of a flag to multiple user groups at one time.  For example, a multivariate flag could have the following variations:

* Variation 1 set to OFF
* Variation 2 set to ON
* Variation 3 set to be served only when a user has a certain email address

There is no limit to the number of variations that you can add to a multivariate flag, and you can use strings, numbers, or JSON to define the different Variants. 

To create a multivariate flag:

1. In **Feature Flags**, click **+ New Flag**.
2. Select **Multivariate**.
3. In **About the Flag**, in **Name**, enter a name for your flag and click **Next**.

    :::info
     When you name a flag, Harness automatically generates its identifier. You can edit the identifier when you are creating the flag, but not after it is saved. If you rename the flag, the identifier remains the same. For more information, go to [Entity Identifier Reference](../../../platform/20_References/entity-identifier-reference.md).
    :::

4. To make the Feature Flag permanent, select the **This is a permanent flag** checkbox. Permanent flags are flags you intend to stay in your system indefinitely, so we will never mark them as potentially stale. For example, if you are offering a premium feature to some of your customers but not others, you can use a permanent flag to manage who sees this feature indefinitely.
5. In **Variation settings**, in **Flag Type**, select **Multivariate** and then select the **Data Type**. You can select, **String**, **JSON**, or **Number**.
6. Enter a **Name** and **Value** for each variation you want to use.

7. In **Default rules for the flag**, define which variation you will see by default when the flag is ON or OFF.

    ```mdx-code-block
    <img src={multivar_settings} alt="A screenshot of the Variation Settings form when creating a Feature Flag." height="500" width="700" />
    ```

    *Figure 5: Variation settings of a multivariate flag*

After you have created your multivariate flag, you can then:

* [Manage the Variations of the Feature Flag](../update-feature-flags/manage-variations.md)
* [Add Flag Prerequisites](../add-prerequisites-to-feature-flag.md)
* [Target Users with Flags](../ff-target-management/targeting-users-with-flags.md)

