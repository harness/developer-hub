---
title: Use the Command step to download or copy artifacts and configs or run scripts
description: This topic show you how to use the Command step in SSH and WinRM deployments to run commands on one or more target hosts.
sidebar_position: 4
helpdocs_topic_id: 4dot4qo5l4
helpdocs_category_id: y6gyszr0kl
helpdocs_is_private: false
helpdocs_is_published: true
---

The Command step can be used in SSH and WinRM deployments to run commands on all target hosts.

You can run a script on all hosts, download the deployment artifact, or copy the artifact or config.

You can also use the Command step on Deployment Template deployments. Since a Deployment Template can be used on any host type, the Command step can only be run on the Delegate.

## Command step summary

Let's review the details of the Command step.

### Deployment types

The Command step can be added to SSH, WinRM, and Deployment Template deployment types.

![](./static/download-and-copy-artifacts-using-the-command-step-05.png)

#### SSH and WinRM

For SSH and WinRM, the Command step(s) is added automatically when you select the deployment strategy.

Also, the Looping Strategy needed to run the Command step on each target host is set automatically to **Repeat**.

You can edit or add any automatically-added Command step.

For more information, go to:

* [Secure Shell (SSH) deployment tutorial](../../onboard-cd/cd-quickstarts/ssh-ng.md)
* [WinRM deployment tutorial](../../onboard-cd/cd-quickstarts/win-rm-tutorial.md)

#### Deployment Templates

For Deployment Templates, you can add a Command step to the template itself or anywhere in the Execution.

Since a Deployment Template can be used on any host type, the Command step can only be run on the Delegate. You must use the **Run on Delegate** option in the step.

To run the Command step on all the fetched hosts, you must put the Command step after the **Fetch Instances** step and use the Repeat Looping Strategy and expression `<+stage.output.hosts>`:

```yaml
repeat:  
  items: <+stage.output.hosts>
```

![](./static/download-and-copy-artifacts-using-the-command-step-06.png)

For the download artifact and copy artifact/config commands, you do not need the Looping Strategy. These commands should be run once on the Delegate. These commands will download the artifact and copy the artifact/config to the Delegate only, not the target hosts.

For a script command, you might want to run the script for each instance that was output from the Fetch instance step. In this case, using the Looping Strategy.

### Command types

The following command types are supported:

* Download Artifact
* Copy artifact or config
* Script

These are discussed in detail below.

### Artifact metadata only

Harness Services allows you to identify artifacts using their metadata. At deployment runtime, Harness uses the metadata to copy or download the artifact to the target hosts/containers.

### Copy vs download

Let's review the differences between the Copy Artifact/Config and Download commands.

**Download:** At deployment runtime, the Harness Delegate executes commands on the target host(s) to download the artifact directly to the target host(s).

The Delegate must have access to the target host(s) and the target host(s) must have network connectivity to the artifact server.**Copy:** During deployment runtime, Harness uses the metadata to download the artifact to the Harness Delegate. The Delegate then copies the artifact to the target host(s).

The Delegate must have network connectivity to the artifact server and target hosts.##### Copy vs Download

Here is the difference in how Harness performs a copy and download.

![](./static/download-and-copy-artifacts-using-the-command-step-07.png)

## Add the Command step

The Command step can be added to SSH, WinRM, and Deployment Template deployment types.

1. In the stage **Execution**, click **Add Step**.
2. Click **Command**.
3. In **Name**, enter a name for the command.
4. In **Timeout**, enter how long Harness should wait before failing this step and initiating the [Failure Strategy](../../../platform/8_Pipelines/define-a-failure-strategy-on-stages-and-steps.md).
5. In **Run the following commands**, click **Add Command**.

   ![](./static/download-and-copy-artifacts-using-the-command-step-08.png)

6. Name the command and then select the **Command Type**.

The settings for the different command types are described below.

## Download an artifact

The deployment artifact for the stage is set in the Service of the stage.

Using the **Download** command type, you can download the deployment artifact onto the target hosts of the deployment.

![](./static/download-and-copy-artifacts-using-the-command-step-09.png)

You simply set where you want to download the artifact in **Destination Path**.

For SSH/WinRM deployments, the path `$HOME/<+service.name>/<+env.name>` is added automatically when you select the Execution Strategy for the stage.

For example, a destination path for a stage that deploys **todolist.war** using a Service named **tutorial-service-ssh2** to an Environment named **ssh-tutorial-env** will look like this:

`$HOME/tutorial-service-ssh2/ssh-tutorial-env/todolist.war`

You can use any path on the target hosts you want. Harness will not create the path if it does not exist.

Here's an example of the results of a Download command:

![](./static/download-and-copy-artifacts-using-the-command-step-10.png)

**Deployment Templates:** to run the Download command on the target hosts, add the command after the **Fetch Instances** step. See [Looping Strategy and target hosts](download-and-copy-artifacts-using-the-command-step.md#looping-strategy-and-target-hosts) below.

## Copy an artifact or config

The deployment artifact for the stage is set in the Service Definition **Artifacts** section.

Using the **Copy** command type, you can copy the deployment artifact onto the target hosts of the deployment.

The deployment config file(s) for the stage is set in the Service Definition **Config Files** section.

![](./static/download-and-copy-artifacts-using-the-command-step-11.png)

1. In **Select file type to copy**, click **Artifact** or **Config**.

![](./static/download-and-copy-artifacts-using-the-command-step-12.png)

You simply set where you want to download the artifact in **Destination Path**.

For SSH/WinRM deployments, the path `$HOME/<+service.name>/<+env.name>` is added automatically when you select the Execution Strategy for the stage.

For example, a destination path for a stage that deploys **todolist.war** using a Service named **tutorial-service-ssh2** to an Environment named **ssh-tutorial-env** will look like this:

`$HOME/tutorial-service-ssh2/ssh-tutorial-env/todolist.war`

You can use any path on the target hosts you want. Harness will not create the path if it does not exist.

Here's an example of the results of a Copy Artifact command:

![](./static/download-and-copy-artifacts-using-the-command-step-13.png)

Here's an example of the results of a Copy Config command:

![](./static/download-and-copy-artifacts-using-the-command-step-14.png)

**Deployment Templates:** to run the Copy command on the target hosts, add the command after the **Fetch Instances** step. See [Looping Strategy and target hosts](download-and-copy-artifacts-using-the-command-step.md#looping-strategy-and-target-hosts) below.

## Use a Script

You can run a script on all of the target hosts. This is the same as the [Shell Script](using-shell-scripts.md) step.

1. In **Working Directory**, enter the working directory on the target host(s) from which the Harness Delegate will run the script, such as **/tmp** on Linux and **%TEMP%** on Windows. By default, if **Working Directory** is left empty, the script is executed in the home directory.
2. In **Select script location**, select [Harness File Store](../../cd-services/cd-services-general/add-inline-manifests-using-file-store.md) or **Inline**.
3. In **Command**, enter your script. For example, this script echoes artifact information using Harness expressions:

	```
	echo "artifacts.primary.tag" <+artifacts.primary.tag>  
	echo "artifacts.primary.tagRegex" <+artifacts.primary.tagRegex>  
	echo "artifacts.primary.identifier" <+artifacts.primary.identifier>  
	echo "artifacts.primary.type" <+artifacts.primary.type>  
	echo "artifacts.primary.primaryArtifact" <+artifacts.primary.primaryArtifact>  
	echo "artifacts.primary.image" <+artifacts.primary.image>  
	echo "artifacts.primary.imagePullSecret" <+artifacts.primary.imagePullSecret>  
	echo "artifacts.primary.label" <+artifacts.primary.label>  
	echo "artifacts.primary.connectorRef" <+artifacts.primary.connectorRef>  
	echo "artifacts.primary.imagePath" <+artifacts.primary.imagePath>
	```

	Here's an example of an executed script command:

	![](./static/download-and-copy-artifacts-using-the-command-step-15.png)
1. Use **Files and Patterns** to tail files and use the results in your script. For example, check logs and see if a process started successfully and, if so, exit the script.  
You specify the file to tail, such as `auth.log`, and the pattern to search (grep filter), such as `198.51.100.1` and then in your script you perform an action when the tail output is matched.
1. For **File to Tail**, enter the name of a file in the Working Directory to tail, such as a log file.
2. For **Pattern to search**, enter the pattern to search for in the file. Harness uses grep on the pattern.

**Deployment Templates:** to run the Script command on the target hosts, add the command after the Fetch Instances step. See [Looping Strategy and target hosts](download-and-copy-artifacts-using-the-command-step.md#looping-strategy-and-target-hosts) below.

## Input variables

While you can simply declare a variable in your command script using a Harness expression or string for its value, using Input Variables provides some additional benefits:

* You can more easily identify and manage the Harness expressions used in your script.
* You can template your script.

You can declare the variable using **Name** and **Value** in **Script Input Variables** and then reference the variable in the script just as you would any other variable: `$var_name`.

You can also use expressions in **Value**. For example, if you have an Output Variable from a previous Shell Script step, you can copy it from the executed step **Outputs**.

In **Script Input Variables**, you simply select **Expression** and paste the expression in **Value**.

In your script, you declare the variable using the **Name** value.

At deployment runtime, Harness will evaluate the expression and the variable will contain its output.

## Output variables

Output Variables have a maximum size of 512KB.To export variables from the script to other steps in the stage, you use the **Script Output Variables** option.

Let's look at a simple example of a script with the variable **name**:


```
name=123
```

The `name` variable cannot be used outside the script unless you use **Script Output Variables**.

You do not need to use `export` for the variables to use them with **Script Output Variables**. You can simply declare them, like `name="123"`. Export is for using the variables in child processes within the script.In **Script Output Variables**, in **Value**, you enter the name of the script variable you want to output (`name`).

In **Name**, enter a name to use in other steps that will reference this variable. This is the output variable name that will be used in a Harness expression for referencing the output variable.

The format to reference the output variable can be one of the following:

* Within the stage:
	+ Referencing the step output:
		- `<+steps.[step_id].output.outputVariables.[output_variable_name]>`.
	+ Referencing the step output execution:
		- `<+execution.steps.[step_id].output.outputVariables.[output_variable_name]>`
* Anywhere in the Pipeline:
	+ `<+pipeline.stages.[stage_Id].spec.execution.steps.[step_id].output.outputVariables.[output_variable_name]>`

For example, it could be `<+steps.Shell_Script.output.outputVariables.newname>`.

## Run on Delegate

Use this option to run the command on the Delegate instead of the target hosts.

Download and copy commands aren't typically run on the Delegate, but a script is not uncommon.

If you do run the step on the Delegate, ensure the **Destination Path** exists on the Delegate. 

### Deployment Templates

For Deployment Templates, use **Run on Delegate**.

Since a Deployment Template can be used on any host type, the Command step can only be run on the Delegate. You must use the **Run on Delegate** option in the step.

## Looping Strategy and target hosts

To run the Command step on all the target hosts, you must use the Repeat [Looping Strategy](../../../platform/8_Pipelines/looping-strategies-matrix-repeat-and-parallelism.md) and expression `<+stage.output.hosts>`:


```
repeat:  
  items: <+stage.output.hosts>
```

![](./static/download-and-copy-artifacts-using-the-command-step-16.png)

When you run the Pipeline, you will see the Command step run on each host. For example, here is an SSH deployment where download, copy artifact, and copy config Command steps are run using the Looping Strategy:

![](./static/download-and-copy-artifacts-using-the-command-step-17.png)

The suffix \`_N` is used to identify each host.

### Deployment Templates

Since a Deployment Template can be used on any host type, the Command step can only be run on the Delegate. You must use the **Run on Delegate** option in the step.

Consequently, there is no reason to use a Looping Strategy when using the Command step with Deployment Templates.

## Copy and Download Artifact Provider Support

The following table lists the providers supported by the Copy and Download commands in a Command step.

Legend:

* Y: Yes
* N: No
* N/A: Not Applicable



| **Provider** | **Repository/Package Types** | **Download Artifact****(WinRM or SSH deployment types only)** | **Copy Artifact****(SSH deployment type only)** |
| --- | --- | --- | --- |
| AWS S3 | All | Y | Y |
| Artifactory (JFrog) | Non-Docker | Y | Y |
|  | Docker | N/A | N/A |
| SMB | IIS related | Y | N/A |
| SFTP | IIS related | Y | N/A |
| Jenkins | All | Y | Y |
| Docker Registry | Docker | N/A | N/A |
| AWS ECR | Docker | N/A | N/A |
| Google Cloud Storage | All | N/A | N/A |
| Google Container Registry | Docker | N/A | N/A |
| Nexus 2.x/ 3.x | Maven 2.0 | Y | Y |
|  | NPM | Y | Y |
|  | NuGet | Y | Y |
|  | Docker | N/A | N/A |
| Nexus 2.x/ 3.x | Maven 2.0 | Y | Y |
|  | NPM | Y | Y |
|  | NuGet | Y | Y |
|  | Docker | N/A | N/A |
| Azure Artifacts | Maven 2.0, NuGet | Y | Y |
| Custom Repository | All | N/A | N (use the Exec script to use the metadata to copy artifact to target host) |

