---
title: Use Java string methods
description: You can use any Java string method on Harness expressions.
sidebar_position: 30
helpdocs_topic_id: 91bhqk7t4q
helpdocs_category_id: bp8t5hf922
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/platform/variables-and-expressions/extracting-characters-from-harness-variable-expressions
---

You can use almost any [Java string method](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#method.summary) to extract characters or manipulate [expression](./harness-variables.md) strings.

## Format

The correct format for using a Java method with an expression is to wrap both the source expression and the method in the expression delimiter (`<+...>`), resulting in nested delimiters. For example:

```
<+<+expression>.methodName()>
```

The `<+expression>` calls the variable that you want to use the method on. Then you append the method and any parameters after the expression. The entire statement is wrapped in an expression delimiter (`<+...>`) so that Harness knows to evaluate the entire statement as one expression returning one, resolved value.

The content between the expression delimiter (`<+...>`) is passed to [JEXL](http://commons.apache.org/proper/commons-jexl/) where it is evaluated. Using JEXL, you can build complex variable expressions that use JEXL methods. For example, here is an expression that uses Webhook Trigger payload information:

```
<+<+trigger.payload.pull_request.diff_url>.contains("triggerNgDemo")> || <+trigger.payload.repository.owner.name> == "harness-software"
```

### Escaping

If the method takes multiple, comma-separated arguments, and the method expects the parameters to be strings, you must wrap the expression in double quotes, except if it is a `<+secrets.getValue()>` expression.

Here is an example where an expression supplied as an argument for the `replace()` method. Because the parameter must be a string, the expression is wrapped in quotation marks.

```
<+<+pipeline.variables.var2>.replace("a", "<+pipeline.variables.var1>")>
```

## Java string method examples

Here are some examples of Java string methods with expressions.

### contains()

Use `contains()` to check if a value contains a certain string. Make sure to wrap the expression and the method within the expressions delimiter and wrap the target string in double quotes, such as `<+<+EXPRESSION.TO.SEARCH>.contains("TARGET STRING")>`.

For example, this expression uses `contains()` to check if a trigger payload field contains the string `triggerDemo`:

```
<+<+trigger.payload.pull_request.diff_url>.contains("triggerDemo")>
```

As another example, assume you have a variable `deployEnv` and you want to check if it contains the string `prod`. You can use `contains()` like this:

```
<+<+pipeline.variables.deployEnv>.contains("prod")>
```

You can also nest an expression in the `contains()` method to check if one expression contains the entire value of another expression, for example:

```
<+<+pipeline.variables.someVar>.contains(<+pipeline.variables.otherVar>)>
```

### split()

You might use `split()` if you want to extract certain details from a string or create an assertion expression based on a variable.

In this example, assume you have a pipeline variable called `abc` with value `def:ghi`. You might use `split()` like this:

```
<+pipeline.variables.abc.split(':')[1]>
```

This expression evaluates to `ghi`.

For this example, assume you have a pipeline variable called `abc` with value `5.6.0`. You could use `split()` like this:

```
<+pipeline.variables.abc.split('\\.')[1]>
```

This expression resolves to `6`.

To create an assertion expression from a variable, assume you have a variable `someVar` with the value `prod-environment-variable`. To extract `prod` from this value, you would use `split()` like this:

```
<+pipeline.variables.someVar.split('-')[0]>
```

### charAt()

Use `charAt()` to return the character at a specified index in a Harness variable expression string.

This can be useful, for example, with an expression such as `<+artifact.tag>` that contains a version number that you want to pull out.

To demonstrate this method, assume you have the expression `<+version>` with the value `1.2.3`.

To get the first character of the string, you would use `charAt()` like this:

```
<+<+version>.charAt(0)>
```

This expression evaluates to `1`.

### substring()

To demonstrate the `substring()` method, assume you have a variable `someVar` with the value `prod-environment-variable`. To extract `prod` from this value, you would use `substring()` like this:

```
<+<+pipeline.variables.someVar>.substring(0,3)>
```

## Use multiple methods

You can also use multiple, nested methods. For example, assume you have a variable called `myvar` with a value `hello`, and you use the methods `substring` and `indexOf`. You could use these methods like this:

```
<+<+stage.variables.myvar>.substring(<+<+stage.variables.myvar>.indexOf("e")>)>
```

This expression evaluates to `ello`.

## Unsupported methods

The `getClass()` method is not supported in expressions and it is not evaluated.
