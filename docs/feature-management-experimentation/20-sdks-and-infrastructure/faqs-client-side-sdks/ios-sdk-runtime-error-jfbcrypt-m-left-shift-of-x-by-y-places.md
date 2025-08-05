---
title: "iOS SDK runtime error: JFBCrypt.m left shift of [x] by [y] places cannot be represented in type 'SInt32'"
sidebar_label: "iOS SDK runtime error: JFBCrypt.m left shift of [x] by [y] places cannot be represented in type 'SInt32'"
sidebar_position: 13
---

## Issue

Using Objective-C project with iOS SDK, the following runtime error shows as soon as the SDK factory object is initialized:

```
.../Pods/Split/Split/Common/Utils/JFBCrypt/JFBCrypt.m:578:16: runtime error: left shift of 16488694 by 8 places cannot be represented in type 'SInt32' (aka 'int')
```

## Root Cause

If Undefined Behavior Sanitizer flag is turned on, it will cause the error above.

![](https://help.split.io/hc/article_attachments/360060917591/Screen_Shot_2020-06-30_at_08.46.33.png)

## Answer

To resolve the issue, follow steps below:

1. Turn off the Undefined Behavior Sanitizer flag located at the Diagnostics tab in your target's Edit Scheme option.
2. Clear the project.
3. Delete the derived data folder.
4. Rebuild.