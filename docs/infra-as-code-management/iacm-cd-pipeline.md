---
title: Create a single pipeline to provision resources during deployment
description: Learn how to create a single pipeline to provision or update resources used during deployment.
sidebar_position: 30
---

You may want to have a single pipeline that provisions or updates resources used during deployment. To do this, you need to create a pipeline with the following stages:

*  An IaCM stage to provision or update resources.

* A CD stage to perform deployments.

However, you can pass variables from an IaCM pipeline to CD. For example, you might want to pass the Kubernetes namespace as a value. 

If you select a pipeline and select the **Apply** step, you will see that all the Terraform outputs are available as output parameters. You can paste the path and use it in any additional stage that you have.

![Output](./static/output.png)

Here’s an example of how to pass a variable from an IaCM stage to an another stage:

`<+pipeline.stages.iacstage.spec.execution.steps.apply.output.outputVariables.bucket_name>`

![Example of how to pass a variable](./static/shell-script.png)