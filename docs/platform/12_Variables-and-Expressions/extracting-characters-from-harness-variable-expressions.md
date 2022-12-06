---
title: Extracting Characters from Harness Variable Expressions
description: You can return the character at a specified index in a Harness variable expression string. This can be helpful with built-in variable expressions such as <+artifact.tag> , <+artifact.image> , or vari…
# sidebar_position: 2
helpdocs_topic_id: 91bhqk7t4q
helpdocs_category_id: bp8t5hf922
helpdocs_is_private: false
helpdocs_is_published: true
---

You can return the character at a specified index in a Harness variable expression string.

This can be helpful with [built-in variable expressions](harness-variables.md) such as `<+artifact.tag>`, `<+artifact.image>`, or variables that contain version numbers or other important strings.

To return characters, you can use the `charAt()` method with your variable expression.

### Step 1: Use the charAt() Method

Let's look at an example where you have a variable named `<+version>`. that evaluates to `1234`.

To get the first character of the string, you would use `<+<+version>.charAt(0)>`. This would return `1`.

The `<+version>` references the variable, and the rest of the expression evaluates the string using the `charAt()` method.

### See also

* Java [String methods](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#method.summary)
* [JEXL reference](https://commons.apache.org/proper/commons-jexl/reference/syntax.html) from Apache.
* [Built-in Harness Variables Reference](harness-variables.md)

