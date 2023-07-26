---
title: Run a step on multiple target instances
description: This topic show you how to run the same step on multiple target hosts.
sidebar_position: 4
---

When you are deploying to multiple hosts, such as with an SSH, WinRM, or deployment template stage, you can run the same step on all of the target hosts.

To run the step on all hosts, you use the **Repeat** [looping strategy](/docs/platform/Pipelines/looping-strategies-matrix-repeat-and-parallelism) and identify all the hosts for the stage as the target:


```yaml
repeat:  
  items: <+stage.output.hosts>
```

Here's an example with a Shell Script step:

![](./static/run-a-script-on-multiple-target-instances-00.png)

## Create your pipeline

You can use the repeat looping strategy with `<+stage.output.hosts>` to target multiple hosts in the following deployment types:

* [SSH (Traditional)](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng)
* [WinRM](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial)
* [Custom deployments using deployment templates](/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial)

All three types can deploy your artifacts to hosts located in Microsoft Azure, AWS, or any platform-agnostic Physical Data Center (PDC).

In the case of SSH and WinRM you can use the **Repeat** looping strategy with `<+stage.output.hosts>` on a step anywhere in execution because the hosts are fetched as part of the environment.

For **Deployment Templates**, any step using the repeat looping strategy with `<+stage.output.hosts>` must come after the **Fetch Instances** step.

## Add your step

1. In **Execution**, select **Add Step** and then select and configure the step you want to run on all hosts.
   
   Depending on the type of step you are adding, you might want to reference the host instances.
   
   For example, you might be running a Shell Script step on all hosts.

## Reference hosts in steps using expressions

You can use all of the `<+instance...>` expressions to reference your hosts.

For Microsoft Azure, AWS, or any platform-agnostic Physical Data Center (PDC):

* [<+instance.hostName>](/docs/platform/Variables-and-Expressions/harness-variables#instancehostname)
* [<+instance.host.instanceName>](/docs/platform/variables-and-expressions/harness-variables/#instancehostinstancename)
* [<+instance.name>](/docs/platform/variables-and-expressions/harness-variables/#instancename)

For Microsoft Azure or AWS:

* [<+instance.host.privateIp>](/docs/platform/variables-and-expressions/harness-variables/#instancehostprivateip)
* [<+instance.host.publicIp>](/docs/platform/variables-and-expressions/harness-variables/#instancehostpublicip)

`instance.name` has the same value as `instance.hostName`. Both are available for backward compatibility.

## Set looping strategy

The Repeat [looping strategy](/docs/platform/Pipelines/looping-strategies-matrix-repeat-and-parallelism) allows you to repeat the step for all target hosts. The strategy will iterate through the list of hosts. The list of hosts is identified with the expression `<+stage.output.hosts>`.

1. In your step, select **Advanced**.
2. Select **Looping Strategy**.
3. Select **Repeat** and enter the following:
  
  ```yaml
  repeat:  
    items: <+stage.output.hosts>
  ```
  Here's an example with a Shell Script step:

  ![](./static/run-a-script-on-multiple-target-instances-01.png)
1. Select **Apply Changes**.

## Run your pipeline

Once you run your pipeline you will see the step applied to multiple hosts.

For example, here is a custom deployment stage using a deployment template.

![](./static/run-a-script-on-multiple-target-instances-02.png)

The Fetch Instances step returned two instances and the Shell Script step was executed on both using the loop strategy.

Here is an SSH deployment example with a Command step that uses `<+stage.output.hosts>`:

![](./static/run-a-script-on-multiple-target-instances-03.png)

Once the pipeline is run, you can see each of the Deploy step run on each of the two target hosts:

![](./static/run-a-script-on-multiple-target-instances-04.png)

You can also add a Shell Script step to echo `<+stage.output.hosts>` to see the target hosts. The expression will resolve to a list like this SSH example that deploys to AWS EC2 instances:


```
[ec2-54-201-142-249.us-west-2.compute.amazonaws.com, ec2-54-190-26-183.us-west-2.compute.amazonaws.com]
```

## Supported deployment types

The ​`<+instance...>` expression is only supported in SSH, WinRM, and custom deployments using deployment templates.

