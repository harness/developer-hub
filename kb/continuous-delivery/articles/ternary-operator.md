---
description: Use ternary operators with triggers
title: Use ternary operators with triggers
---

The ternary operator, also known as the conditional operator, is a shorthand notation for expressing conditional statements in various programming languages. It takes three operands and allows you to evaluate a condition and choose one of two expressions to execute based on the result of the condition.

The syntax of the ternary operator is generally as follows:

```
condition?expression1:expression2
```

Here's how it works:

1. The "condition" is an expression that evaluates to either true or false.
2. If the condition is true, the expression before the colon (" : ") is executed and becomes the value of the entire expression.
3. If the condition is false, the expression after the colon is executed and becomes the value of the entire expression.

## Example: Use a ternary operator to populate a tag based on how a pipeline started

For this example, assume you need to create a trigger for a CD pipeline that automatically takes the tag value from `<+trigger.payload.tag>` if pipeline is executed from a webhook trigger, or else it takes the tag from from `<+pipeline.variables.tag>` if the pipeline is executed manually.

Because you can ternary operators with [Harness expressions](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables), you can create a condition like:

`<+condition?IF_TRUE:IF_FALSE>`

For the true condition, `<+pipeline.triggerType>` should be `WEHOOK_CUSTOM`, and for the false condition you can use a runtime input (`<+input>`) or a pipeline variable.

The resulting ternary operator condition could be something like:

```
<+<+pipeline.triggerType>=="MANUAL"?<+pipeline.variables.tag>:<+trigger.payload.tag>>
```

## Example: Get a default value from the trigger payload

Suppose you have a trigger that provides runtime input for a pipeline from the trigger payload.

You could configure the trigger as follows, if the value is always available from the payload:

```
myVariable: <+trigger.payload.myVariable>
```

However, if you want to provide a default value for `myVariable` when the value is missing from the trigger payload, you can use a ternary operator with Harness expressions, such as:

```
<+<+trigger.payload>.contains("myVariable")?<+trigger.payload.myVariable>:"DEFAULT_VALUE">
```

This ensures that `myVariable` takes a default value of `"DEFAULT_VALUE"` if the variable is not present in the payload.

## Using isResolved and isUnresolved evaluation instead of null
Customers may be considering using a ternary evaluation that `== null` or `!= null` as the condition should consider using the `isResolved` and `isUnresolved` operators.  In a null evaluation, this may not evaluate properly because the condition of a variable existing versus having a null value is slightly different.

For more information, please visit [the following Harness Article about utilizing the evaluations](https://developer.harness.io/docs/platform/variables-and-expressions/harness-expressions-reference/#check-expression-isresolved-isunresolved-null-replacement).