---
title: Add Targets
description: This topic describes how to add targets to your environment.
tags: 
   - helpDocs
   - feature flag
   - Target Users
# sidebar_position: 2
helpdocs_topic_id: dbk9uoaid3
helpdocs_category_id: xw2hz815l8
helpdocs_is_private: false
helpdocs_is_published: true
---

```mdx-code-block
import add_target_1 from './static/1-add-targets-00.png'
import add_target_2 from './static/1-add-targets-01.png'
```

Targets are used to control which users see which Variation of a Feature Flag, for example, if you want to do internal testing or a beta program before a broader roll out, you can enable the Flag for some users and not others. While we refer to targeting users, when you create a Target you give it a name and a unique identifier, so a Target can be anything that can be uniquely identified. For example, a Target can be a user, an application, a system, a machine, or any resource uniquely identified by an IP address, email ID, user ID, etc.


This topic describes how to add Targets to an Environment. After you’ve added the Target, you can add it to a [Target Group](2-add-target-groups.md) or to a [Feature Flag](3-targeting-users-with-flags.md). 



:::note
 You can add a Target using Harness UI. Alternatively, you can add a Target and define its attributes in your application's code directly [using a Feature Flag SDK](https://docs.harness.io/category/rtce97j1wu-ff-sdks). The Targets added in your code are discovered automatically and populated in the Harness UI.
:::


### Regex requirements for Target names and identifiers


A Target is identified by a name and an identifier. The name and identifier you enter must conform to the following regex:


##### **Name**


Regex: `[\\p{L}\\d .@_-]`


Must consist of only alphabetical characters, numbers, and the following symbols: 


* . (period)
* @ (at sign)
* - (dash)
* \_ (underscore)


The characters can be lowercase or uppercase and can include accented letters, for example `Café_123`.


##### **Identifier**


Regex: `[A-Za-z0-9.@_-]`


Must consist of only alphabetical characters, numbers, and the following symbols: 


* . (period)
* @ (at sign)
* - (dash)
* \_ (underscore)


The characters can be lowercase or uppercase but cannot include accented letters, for example `CF.789`.


### Add a Target


A Target is identified by a name and an identifier. Make sure your Target names and identifiers conform to the regex explained in [Review Regex Requirements for Target Names and Identifiers](1-add-targets.md#review-regex-requirements-for-target-names-and-identifiers).
To add a Target:


1. In **Feature Flags**, in **Target Management**, select **Targets**.
2. Click **+ Target**.
3. In **Add Target(s)**, select **Add a Target**.
4. In **Name**, enter the name that will appear in the Target Management page so you can identify this Target.
5. In **Identifier**, enter a unique identifier for your Target. When [Targeting Users with Flags](3-targeting-users-with-flags.md) or [Managing Target Groups](2-add-target-groups.md), the Targets are identified by the identifier you give them.
6. You can add multiple Targets. Click **+** to add more Targets.

```mdx-code-block
<img src={add_target_1} alt="Adding Targets" height="500" width="500" />
```

*Figure 1: Adding Targets*


7. When you’ve added all the Targets, Click **Add**.


### Upload a List of Targets


This option allows you to import a list of Targets in CSV format. To do this:


1. In **Feature Flags**, in **Target Management**, select **Targets**.
2. Click **+ Target**.
3. In **Add Target(s)**, select **Upload a list of Targets**.
4. Upload your CSV file as per the template below. The CSV file must have only the Name and Identifier; do not include any headings, for example:




| | | 
| --- | --- |
| Target\_4 | T4 |
| Target\_5 | T5 |
| Target\_6 | T6 |


5. Click **Add**.

```mdx-code-block
<img src={add_target_1} alt="A screenshot of the Add Target screen that highlights the radio button for uploading a list of Targets." height="500" width="500" />
``` 
*Figure 2: Adding Targets from a CSV file*


6. The list of Targets is added.


![A screenshot of the Target Management page with a list of all the Targets.](./static/1-add-targets-02.png)
*Figure 3: The list of Targets added to the Harness Platform*


### Next steps


After your have created a Target, you can:


* [Add them to Target Groups](2-add-target-groups.md)
* [Target Users with Flags](3-targeting-users-with-flags.md)


