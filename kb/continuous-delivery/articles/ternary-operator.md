---
description: KB - An example for Using Ternary Operators with triggers
title: Using Ternary Operators with triggers.
---
# Introduction

The ternary operator, also known as the conditional operator, is a shorthand notation for expressing conditional statements in various programming languages. It takes three operands and allows you to evaluate a condition and choose one of two expressions to execute based on the result of the condition.

The syntax of the ternary operator is generally as follows:
```
condition ? expression1 : expression2
```

Here's how it works:

1. The "condition" is an expression that evaluates to either true or false.

2. If the condition is true, the expression before the colon (" : ") is executed and becomes the value of the entire expression.

3. If the condition is false, the expression after the colon is executed and becomes the value of the entire expression.


## Problem Statement

Let's take an example for ternary operators:  

Create a trigger for a CD pipeline and it should automatically pick the tag value <+trigger.payload.tag> when pipeline is executed via trigger and it should pick <+pipeline.variables.tag> when the pipeline is executed manually.


## Resolution

For the above usecase we should use Ternary operators https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#ternary-operators 

You can give a condition :
```
<+condition?<value_if_true>:<value_if_false>>
```
 

For the true condition <+pipeline.triggerType> should be WEHOOK_CUSTOM https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#pipelinetriggertype 
and for the false condition you can put a runtime input <+input> or a pipeline varibale

Finally the ternary operator condition should look like: 

```
<+<+pipeline.triggerType>=="MANUAL"?<+pipeline.variables.tag>:<+trigger.payload.tag>>
```
 
 
