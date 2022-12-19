---
title: Extracting Characters from Harness Variable Expressions
description: You can return the character at a specified index in a Harness variable expression string. This can be helpful with built-in variable expressions such as ${artifact.buildNo} , ${artifact.revision} ,…
sidebar_position: 70
helpdocs_topic_id: myk24wycif
helpdocs_category_id: 9lw749jubn
helpdocs_is_private: false
helpdocs_is_published: true
---

You can return the character at a specified index in a Harness variable expression string.

This can be helpful with [built-in variable expressions](built-in-variables-list.md) such as `${artifact.buildNo}`, `${artifact.revision}`, or [Service](../../../continuous-delivery/model-cd-pipeline/setup-services/add-service-level-config-variables.md) and [Workflow](../../../continuous-delivery/model-cd-pipeline/workflows/add-workflow-variables-new-template.md) variables you have created that contain version numbers or other important strings.

To return characters, you can use the `charAt()` method with your variable expression.

### Step 1: Use the charAt() Method

Let's look at an example where you have a variable named `${version}`. that evaluates to `1234`.

To get the first character of the string, you would use `${${version}.charAt(0)}`. This would return `1`.

The `${version}` references the variable, and the rest of the expression evaluates the string using the `charAt()` method.

### See Also

* Java [String methods](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#method.summary)
* [JEXL reference](https://commons.apache.org/proper/commons-jexl/reference/syntax.html) from Apache.
* [What is a Harness Variable Expression?](variables.md)
* [Built-in Variables List](built-in-variables-list.md)