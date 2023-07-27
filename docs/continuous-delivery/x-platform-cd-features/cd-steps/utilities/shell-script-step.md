---
title: Shell Script step reference
description: Execute scripts in the shell session of the stage.
sidebar_position: 3
---

This topic provides settings and permissions for the Shell Script CD step.

For steps on using the step, go to [using shell scripts in CD pipelines](/docs/continuous-delivery/x-platform-cd-features/cd-steps/cd-general-steps/using-shell-scripts).

## Limitations

* Shell Script step names cannot contain dots. This is true for names entered in the Pipeline Studio UI or YAML.
* Shell Script step Output Variables have a maximum size of 512KB.

## Shell Script step overview

With the Shell Script step, you can execute scripts in the shell session of the stage in the following ways:

* Execute scripts on the host running a Harness delegate. You can use delegate selectors to identify which Harness delegate to use.
* Execute scripts on a remote target host in the deployment infrastructure definition.

When executing a script, you can also **dynamically capture** the execution output from the script, providing runtime variables based on the script execution context, and export those to another step in the same stage or another stage in the same pipeline.

For example, you could use the Shell Script step to capture instance IDs from the deployment environment and then pass those IDs downstream to future steps or stages in the same pipeline.

If you do not publish the output variables, you can still identify which ones you want to be displayed in the deployment details and logs.The Shell Script step uses Bash and PowerShell. This might cause an issue if your target operating system uses a different shell. For example, bash uses printenv while KornShell (ksh) has setenv. For other shells, like ksh, create command aliases.

### Shell Script steps and failures

A failed Shell Script step does not prevent a stage deployment from succeeding.

The Shell Script step succeeds or fails based on the exit value of the script. A failed command in a script does not fail the script, unless you call `set -e` at the top.

### What information is available to capture?

Any information in the particular shell session of the stage can be set, captured, and exported using one or more Shell Script steps in that stage. In addition, you can set and capture information available using the built-in Harness variables. For more information, go to [built-in variables list](/docs/platform/variables-and-expressions/harness-variables/).

## Step Settings

The following sections cover the step settings.

### Name

The name of the step.

### Script Type

Select Bash|Powershell.

When the script in the Shell Script step is run, Harness executes the script on the target host's or Delegate's operating system. Consequently, the behavior of the script depends on their system settings.

For this reason, you might wish to begin your script with a shebang line that identifies the shell language, such as `#!/bin/sh` (shell), `#!/bin/bash` (bash), or `#!/bin/dash` (dash). For more information, see the [Bash manual](https://www.gnu.org/software/bash/manual/html_node/index.html#SEC_Contents) from the GNU project.

In case of PowerShell, if the script executes on Delegate it requires the powershell binary to be installed as it is not shipped with delegate tools, see the [Install PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-linux?view=powershell-7.3) for installation instructions.

### Script

The Bash or Powershell script.

### Script input variables

While you can simply declare a variable in your script using a Harness expression or string for its value, using Input Variables provides some additional benefits:

* You can more easily identify and manage the Harness expressions used in your script.
* You can template your script.

For details, go to [using shell scripts in CD pipelines](/docs/continuous-delivery/x-platform-cd-features/cd-steps/cd-general-steps/using-shell-scripts).

### Script output variables

To export variables from the script to other steps in the stage, you use the **Script Output Variables** option.

For details, go to [using shell scripts in CD pipelines](/docs/continuous-delivery/x-platform-cd-features/cd-steps/cd-general-steps/using-shell-scripts).

Shell Script step output variables have a maximum size of 512KB.

### Execution target

You can specify where to run the script **Target Host** or **On Delegate**.

In you select On Delegate, the script is executed on whichever Delegate runs the step. You can use **Delegate Selector** in **Advanced** to pick the Delegate(s) if needed.

Go to [select delegates with selectors](/docs/platform/Delegates/manage-delegates/select-delegates-with-selectors) for more information.

If you select **Target Host**, depending on the script type, enter the following:

**Bash**
* **Target Host:** enter the IP address or hostname of the remote host where you want to execute the script. The target host must be in the **Infrastructure Definition** selected when you defined the stage **Infrastructure**, and the Harness Delegate must have network access to the target host. You can also enter the variable `<+instance.name>` and the script will execute on whichever target host is used during deployment.
* **SSH Connection Attribute:** select the execution credentials to use for the shell session. For information on setting up execution credentials, go to [add SSH keys](/docs/platform/Secrets/add-use-ssh-secrets/).
* **Working Directory** provide the working directory for the script to be executed, keep in mind that the directory path should be present on the host.

**PowerShell**
* **Target Host:** enter the IP address or hostname of the remote host where you want to execute the script. The target host must be in the **Infrastructure Definition** selected when you defined the stage **Infrastructure**, and the Harness Delegate must have network access to the target host. You can also enter the variable `<+instance.name>` and the script will execute on whichever target host is used during deployment.
* **WinRM Credential:** select the WinRM credentials to use for the PowerShell session. For information on setting up WinRM credentials, go to [add WinRM credential](/docs/platform/Secrets/add-winrm-keys).
* **Working Directory:** provide the working directory for the script to be executed. Keep in mind that the directory path should be present on the host.
  
## Advanced

In **Advanced**, you can use the following options:

* [Delegate Selector](https://developer.harness.io/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/)
* [Conditional Execution](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
* [Failure Strategy](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
* [Looping Strategy](https://developer.harness.io/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](https://developer.harness.io/docs/platform/Governance/Policy-as-code/harness-governance-overview)

## Shell scripts and security

Harness assumes that you trust your Harness users to add safe scripts to your Shell Script steps.

Ensure that users adding scripts, as well as executing deployments that run the scripts, are trusted.

## Reserved keywords

The word `var` is a reserved word for input and output Variable names in the Shell Script step.

If you must use `var`, you can use single quotes and `get()` when referencing the published output variable.

## Reserved symobls

**PowerShell**
* `|` `^` `&` `<` `>` `%` are reserved symbols in PowerShell and in case those are being used as a value of a Harness secret, please make sure it is escaped using `^` symbol.

Instead of using `<+test.var>` use `<+test.get('var')>`.

