The working directory for the [Command](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/download-and-copy-artifacts-using-the-command-step) and [Shell Script](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step) steps is where Harness stores the temporary script files used for running commands on the Harness Delegate and remote hosts. When the execution of the step is complete, the files are deleted.

The default location of the working directory depends on the deployment type of the pipeline stage where the step is run.

Here are the default locations:

- `%USERPROFILE%`: Command step in a WinRM deployment for the **Initialize** section of the deployment.
- `%TEMP%`: The PowerShell Shell Script step for the **Initialize** section of the deployment, run on the remote host.
- `/tmp`: PowerShell Shell Script step for the **Initialize** section of the deployment, run on the Harness Delegate.
- /`tmp`: Bash Shell Script step for the **Initialize** section of the deployment, run on the remote host.
- `/tmp`: Bash Shell Script step for the **Initialize** section of the deployment, run on the Harness Delegate.

If you specify a working directory in the script unit in the Command step or in the **Working Directory** of the Shell Script step, the temporary files with executable scripts will be stored there.

