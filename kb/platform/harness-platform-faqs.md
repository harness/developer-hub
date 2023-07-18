---
title: Harness Platform FAQs
description: Frequently asked questions about Harness Platform.
# sidebar_position: 2
---
# FAQ


### What RBAC permissions do users executing pipeline tasks using API need? 

The simple answer is that a user executing pipeline tasks either it is to modify or execute pipeline, will need the same permissions when running via API as if they were running the same tasks through the Harness UI. 

### How can I resolve environment variables in JEXL conditions?

Unfortunately, JEXL conditions do not support the direct usage of environment variables. The conditions in JEXL only allow the use of variable expressions that can be resolved before the stage is executed. Since environment variables are resolved during runtime, it is not possible to utilize variable expressions that cannot be resolved until the stage is run.