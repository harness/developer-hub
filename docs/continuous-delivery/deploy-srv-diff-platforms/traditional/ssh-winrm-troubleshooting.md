---
title: SSH and WinRM Troubleshooting
description: Troubleshooting Methods SSH and WinRM Swimlanes
sidebar_position: 100
---

This article outlines troubleshooting methods for SSH and WinRM deployments in Harness.

### PowerShell script fail with an "Access is denied" error during execution in a WinRM session?

A PowerShell script that includes commands such as New-Item fails with "Access is denied" when executed during a WinRM session. This typically occurs while writing to a network path due to insufficient permissions or session-related restrictions.

Resolution:

Grant Necessary Permissions: Use Access Control List (ACL) commands to grant full control to the user on the shared folder:

```shell
$acl = Get-ACL -Path ShareFolderPath
$AccessRule = New-Object System.Security.AccessControl.FileSystemAccessRule("USERNAME", "FullControl", "Allow")
$acl.SetAccessRule($AccessRule)
$acl | Set-Acl -Path ShareFolderPath
```

Establish Network Path Connection: Use NET USE to establish a connection to the shared resource:

```
NET USE "ShareFolderPath" /user:USERNAME PASSWORD
```

### Shell script step in Harness succeed even though the script reports an error

The shell script step in Harness succeeds despite the script encountering an error and returning a non-zero exit code

Non-Terminating Errors: PowerShell treats some errors as non-terminating by default. These do not trigger failure in the script unless explicitly converted to terminating errors.
Exit Code Handling: Without proper handling, the script may not propagate the correct exit code to Harness, causing the step to succeed.

Resolution:

- Force Termination on Errors:
  Add the following line at the beginning of the script to turn non-terminating errors into terminating ones:

  ```shell
  $ErrorActionPreference = [System.Management.Automation.ActionPreference]::Stop
  ```

- Use $LASTEXITCODE:
  Append the following line to propagate the exit code from subcommands:

  ```
  exit $LASTEXITCODE
  ```


- Invoke Commands with -ErrorAction Stop:
  Add -ErrorAction Stop to commands that might generate non-terminating errors to ensure they trigger catch 
  
  ```
  Invoke-Command -ScriptBlock { # Your command } -ErrorAction Stop
  ```

### WinRM setup failing with an "Authorization loop detected" error

A WinRM connection to a remote machine fails with the error:
`Authorization loop detected on Conduit "{http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd}WinRmPort.http-conduit" on URL "http://<host>:5985/wsman" with realm "WSMAN"`

Resolution:

Validate Group Policy Settings:

1. Open the Group Policy Editor (gpedit.msc).
2. Navigate to the following path:
  - Computer Configuration > Administrative Templates > Windows Components > Windows Remote Management > WinRM Service.
3. Enable Allow remote server management through WinRM.
4. Set the IPv4/IPv6 filter to *.
5. Ensure the Windows Remote Management predefined rule is enabled under:
  - Windows Firewall with Advanced Security > Inbound Rules.
6. Enable Windows Remote Shell.

Test Connectivity: Run these commands to verify connectivity:

```shell
Test-WsMan <remote_host>
Test-NetConnection -ComputerName <remote_host> -Port 5985
```

### PowerShell Command Does Not Capture Exit Code in Harness

When running a script in Harness using PowerShell, the script executes and completes successfully both manually and locally on the destination server. However, in the Harness pipeline, the script finishes execution, but Harness does not recognize the exit and eventually times out.

Resolution:

Modify the Gradle Command

Disable the Gradle Daemon to ensure the script provides a proper exit code.
Use `$LASTEXITCODE` in PowerShell to explicitly exit the script with the correct status.
Updated Script:

```
$ErrorActionPreference = [System.Management.Automation.ActionPreference]::Stop

cd F:\GetPaidPerf\src\gp-qa-performance\jmeter\
gradle createDist -PchecksumIgnore --stacktrace --no-daemon

exit $LASTEXITCODE
```
- `--no-daemon`: Prevents Gradle from running in daemon mode, ensuring a proper exit code is returned.
- `exit $LASTEXITCODE`: Propagates the exit code from the gradle command to Harness.

### Output Variables Not Displayed in PowerShell Scripts

Output variables in PowerShell scripts are not being displayed properly, particularly when using the WinRM protocol in a Windows environment. This issue may arise if the environment variables are not correctly set in the PowerShell script.

Resolution:
To ensure output variables are properly captured and displayed, set environment variables explicitly within your PowerShell script using the following syntax:

```
$env:var_name = "var_value"
```

### Curl Command Not Working Due to Carriage Return Characters

The curl command was failing in Shell and Bash scripts with errors such as:
`sh: : not found` or `bash: $'\r': command not found`.

This was caused by the presence of carriage return (\r) characters in the script, likely introduced by the editor used for copying the script content.

Resolution:

1. Inspect the script in the YAML file for unwanted carriage return characters (`\r`).
2. Remove the `\r` characters from the script manually.
3. Re-run the pipeline.

### Long-Running Step Execution on Remote Host Stuck and Not Finishing

A pipeline step may get stuck and fail to progress even after the script has completed execution. Ideally, the step should finish once the script completes.

One possible cause for this issue is unclosed driver processes during Maven Selenium tests run via WinRM. If these processes are not properly terminated by the unit tests themselves, issues can arise. 

**Resolution:**

To address this, you can have a script incorporated into Harness Shell Script or Command step PowerShell scripts to effectively terminate any leftover driver processes.

```shell
# Put Maven arguments here
$mvnArguments = @()
# Example of Maven arguments
# $mvnArguments = @(
#     "-B",
#     "clean", 
#     "install",
#     "test"
# )
try {
    # Start the Maven process
    $mvnProcess = Start-Process -FilePath "mvn" -ArgumentList $mvnArguments -NoNewWindow -PassThru

    # Add or update browser processes to terminate based on the specific Selenium drivers in use in tests        
    $browserProcessesToTerminate = "chrome|chromedriver|msedge"
    # Initialize process collections
    $javaSubProcesses = @{}
    $nonJavaSubProcesses = @{}

    # Monitor Maven process and classify subprocesses as Java or non-Java
    while ($mvnProcess.HasExited -eq $false) {
        try {
            # Collect current Maven subprocesses
            $currentSubProcesses = Get-AllDescendantProcesses -ParentProcessId $mvnProcess.Id
            foreach ($subProcess in $currentSubProcesses) {
                if ($subProcess.CommandLine -match "java") {
                    if (-not $javaSubProcesses.ContainsKey($subProcess.ProcessId)) {
                        $javaSubProcesses[$subProcess.ProcessId] = $subProcess
                    }
                }
                else {
                    if (-not $nonJavaSubProcesses.ContainsKey($subProcess.ProcessId)) {
                        $nonJavaSubProcesses[$subProcess.ProcessId] = $subProcess
                    }
                }
            }
        } catch {
            Write-Error "An error occurred while monitoring subprocesses: $_"
        }

        Start-Sleep -Seconds 5
    }
} catch {
    Write-Error "An error occurred while running the Maven process: $_"
}
```