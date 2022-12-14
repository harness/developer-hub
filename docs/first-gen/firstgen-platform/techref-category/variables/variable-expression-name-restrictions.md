---
title: Variable Expression Limitations and Restrictions
description: The following limitations and restrictions apply to Harness variable expressions. For general details about Harness variable expressions, see --  What is a Harness Variable Expression?. Built-in Variabl…
sidebar_position: 80
helpdocs_topic_id: 9ob3r6v9tg
helpdocs_category_id: 9lw749jubn
helpdocs_is_private: false
helpdocs_is_published: true
---

The following limitations and restrictions apply to Harness variable expressions.

For general details about Harness variable expressions, see:

* [What is a Harness Variable Expression?](variables.md)
* [Built-in Variables List](built-in-variables-list.md)

### Limitations

* Harness does not support the Ternary conditional `?:` operator from [JEXL](http://commons.apache.org/proper/commons-jexl/reference/syntax.html#Operators).
* Harness permits variables only within their scope. You will not see a variable available in a field where it cannot be used. For example, if you use a Service Config variable you cannot resolves its expression in the **Pre-deployment** section of a Workflow because the Service is not used in **Pre-deployment**.
* Do not use hyphens (dashes) in variable names, as some Linux distributions and deployment-related software do not allow them.
* A variable value (the evaluated expression) is limited to 256 KB.

### Variable Expression Name Restrictions

A variable name is the name in the variable expression, `${variable_name}`.

Variable names may only contain `a-z, A-Z, 0-9, _`. They cannot contain hyphens or dots.

Certain platforms and orchestration tools, like Kubernetes, have their own naming restrictions. For example, Kubernetes doesn't allow underscores. Make sure that whatever expressions you use resolve to the allowed values of your target platforms.The following keywords are reserved, and cannot be used as a variable name or property:

`or and eq ne lt gt le ge div mod not null true false new var return shellScriptProvisioner`

See [JEXL grammar details](https://people.apache.org/~henrib/jexl-3.0/reference/syntax.html).

