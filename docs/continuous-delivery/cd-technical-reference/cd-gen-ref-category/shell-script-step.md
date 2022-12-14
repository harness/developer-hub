---
title: Shell Script Step Reference
description: Execute scripts in the shell session of the stage.
sidebar_position: 3
helpdocs_topic_id: o0gj1upg2p
helpdocs_category_id: y9ixzx2x5y
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings and permissions for the Shell Script CD step.

For steps on using the step, see [Using Shell Scripts in CD Pipelines](../../cd-execution/cd-general-steps/using-shell-scripts.md).

## Limitations

* Shell Script step names cannot contain dots. This is true for names entered in the Pipeline Studio UI or YAML.
* Shell Script step Output Variables have a maximum size of 512KB.

## Shell Script Step Overview

With the Shell Script step, you can execute scripts in the shell session of the stage in the following ways:

* Execute scripts on the host running a Harness Delegate. You can use Delegate Selectors to identify which Harness Delegate to use.
* Execute scripts on a remote target host in the deployment Infrastructure Definition.

When executing a script, you can also **dynamically capture** the execution output from the script, providing runtime variables based on the script execution context, and export those to another step in the same stage or another stage in the same Pipeline.

For example, you could use the Shell Script step to capture instance IDs from the deployment environment and then pass those IDs downstream to future steps or stages in the same pipeline.

If you do not publish the output variables, you can still identify which ones you want to be displayed in the deployment details and logs.The Shell Script step uses Bash. PowerShell will be coming soon. This might cause an issue if your target operating system uses a different shell. For example, bash uses printenv while KornShell (ksh) has setenv. For other shells, like ksh, create command aliases.

### Shell Script Steps and Failures

A failed Shell Script step does not prevent a stage deployment from succeeding.

The Shell Script step succeeds or fails based on the exit value of the script. A failed command in a script does not fail the script, unless you call `set -e` at the top.

### What Information is Available to Capture?

Any information in the particular shell session of the stage can be set, captured, and exported using one or more Shell Script steps in that stage. In addition, you can set and capture information available using the built-in Harness variables. For more information, see [Built-in Variables List](../../../platform/12_Variables-and-Expressions/harness-variables.md).

## Step Settings

The following sections cover the step settings.

### Name

The name of the step.

### Script Type

Select Bash. PowerShell is coming soon.

When the script in the Shell Script step is run, Harness executes the script on the target host's or Delegate's operating system. Consequently, the behavior of the script depends on their system settings.

For this reason, you might wish to begin your script with a shebang line that identifies the shell language, such as `#!/bin/sh` (shell), `#!/bin/bash` (bash), or `#!/bin/dash` (dash). For more information, see the [Bash manual](https://www.gnu.org/software/bash/manual/html_node/index.html#SEC_Contents) from the GNU project.

### Script

The Bash script. PowerShell is coming soon.

### Script Input Variables

While you can simply declare a variable in your script using a Harness expression or string for its value, using Input Variables provides some additional benefits:

* You can more easily identify and manage the Harness expressions used in your script.
* You can template your script.

For details, see [Using Shell Scripts in CD Pipelines](../../cd-execution/cd-general-steps/using-shell-scripts.md).

### Script Output Variables

To export variables from the script to other steps in the stage, you use the **Script Output Variables** option.

For details, see [Using Shell Scripts in CD Pipelines](../../cd-execution/cd-general-steps/using-shell-scripts.md).

Shell Script step Output Variables have a maximum size of 512KB.

### Execution Target

You can specify where to run the script **Target Host** or **On Delegate**.

In you select On Delegate, the script is executed on whichever Delegate runs the step. You can use **Delegate Selector** in **Advanced** to pick the Delegate(s) if needed.

See [Select Delegates with Selectors](../../../platform/2_Delegates/delegate-guide/select-delegates-with-selectors.md).

If you select **Target Host**, enter the following:

* **Target Host:** enter the IP address or hostname of the remote host where you want to execute the script. The target host must be in the **Infrastructure Definition** selected when you defined the stage **Infrastructure**, and the Harness Delegate must have network access to the target host. You can also enter the variable `<+instance.name>` and the script will execute on whichever target host is used during deployment.
* **SSH Connection Attribute:** select the execution credentials to use for the shell session. For information on setting up execution credentials, see [Add SSH Keys](../../../platform/6_Security/4-add-use-ssh-secrets.md).

## Advanced

See:

* [Step Skip Condition Settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy Settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)
* [Select Delegates with Selectors](../../../platform/2_Delegates/delegate-guide/select-delegates-with-selectors.md)

## Shell Scripts and Security

Harness assumes that you trust your Harness users to add safe scripts to your Shell Script steps.

Please ensure that users adding scripts, as well as executing deployments that run the scripts, are trusted.

## Reserved Keywords

The word `var` is a reserved word for Input and Output Variable names in the Shell Script step.

If you must use `var`, you can use single quotes and `get()` when referencing the published output variable.

Instead of using `<+test.var>` use `<+test.get('var')>`.

