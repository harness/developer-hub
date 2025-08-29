---
title: SSH and WinRM FAQs
description: Frequently asked questions about Harness Continuous Delivery & GitOps, specifically for SSH and WinRM swimlanes.
sidebar_position: 100
---

This article addresses some frequently asked questions about SSH and WinRM deployments in Harness.

### How are Harness secrets tied to connector, and what to watch for. 

Customers should be mindful of the fact that connectors are often tied to a secret (password or sshkey) that may expire. This is often a common cause of execution failures with connector errors. 

### Is it possible to use eddsa keys with Harness Git?

Yes we support ed25519 key, Command we used to generate key :

```
ssh-keygen -t ed25519 -b 256 -f /Users/test/Documents/temp/edd -m pem
```

### How to deploy Azure SpringApps JAR via Harness CD?

You can take advantage of our ssh deployment and include a step to download the JAR.


### How do we detect service licenses for SSH deployments?

Please consider the following [Documentation](https://developer.harness.io/docs/continuous-delivery/get-started/service-licensing-for-cd/#ssh-and-winrm).
Feel free to reach out to us in case of issues.

### Does Harness support SSH deployments using the GCP connector like AWS and Azure?

No, this feature is yet to be supported. We suggest to use ssh key or user and password as data center as an alternative at the moment.

### Can we use command step for custom stage

No this is not supported as of now, as currently command step is only applicable in ssh/winrm type deployment

### Is there a method available to implement a percentage-based repeat strategy for Shell Script Hosts?

For a rolling strategy, you specify the desired number of instances to deploy per phase. If you have multiple target hosts in a stage and wish to deploy a certain proportion of instances per phase, you can configure it accordingly. This allows for a flexible deployment approach where the number of instances per phase can be defined either as a count or a percentage.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng/#rolling)

### Why am I getting the error "Host information is missing in Command Step"?

```
Invalid argument(s): Host information is missing in Command Step. Please make sure the looping strategy (repeat) is provided.
```

If you are using the Command step, the `Repeat` looping strategy is required. The above error indicates that the Command step was ran without a `Repeat` looping strategy. To fix this, set the `Repeat` looping strategy for the Command step. For more information on the Command step and the supported looping strategies, go to [SSH and WinRM](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/download-and-copy-artifacts-using-the-command-step/#ssh-and-winrm) documentation.


### Download artifact for winrm is not working while Nexus if Windows machine is behind proxy?
Nexus is supported, so you can use custom powershell script something like below:
```
Invoke-WebRequest -Uri "$\{URI}" -Headers $Headers -OutFile "$\{OUT_FILE}" -Proxy "$env:HTTP_PROXY"
```

### How to give the user access to WinRM resources?
Run command winrm configSDDL default and it should open the the dialogue, check if user configured for login already present in the last otherwise add the user

### How to enable certificate authentication while using WinRM?
Its disabled by default and need to run below command to enable
Set-Item -Path WSMan:\localhost\Service\Auth\Certificate -Value $true

### How to fix error: "Socket Connection Failed for url windowshost on port 5985"?
Check if port 5985 is opened and test the communication for WinRM.

### Create WinRM Credential using Terraform?

You can automate creating winrm credential/secret key via our existing API as listed [here](https://apidocs.harness.io/tag/Account-Secret#operation/create-account-scoped-secret).

### How to install artifacts on IIS on a Windows VM?
You can use the Copy/Download command option by creating a WinRM connection and deploy the artifact to a Windows VM.

### Is it possible to add multiple realms when configuring WinRM using Kerberos?

Currently, you can provide only one realm per WinRM credential. To add more realms, you must create more WinRM credentials. 

### Winrm execution is failing with the below error:
```
Command execution failed. Error: HTTP response '403: URLBlocked' when communicating with <<host>>
```

Need to check if the Windows machine is behind proxy and the same needs to be configured on the delegate host

### Do we create the target directory for config file copy or artifact download if they do not exist?
We do not create the directory if they do not exist, hence we need to ensure the path that we provide do exist on the target host.

### Does Harness support automatic rollback for SSH/WINRM deployment types?
No, you need to write a custom script where you can get the previous version and create a new forward deployment with the required version of the artifact and the manifest.

### How do I reference privateIp for an EC2 instance while using a ssh type deployment?
You can make use of ```<+instance.properties.privateIp>``` for all available variables under instance properties. You can print  ```<+instance.properties.*>``` and confirm this list. 
### How does Harness handle rollback for SSH deployments?
Harness does not provide automatic or built-in rollback mechanisms for SSH deployments. Unlike some other deployment types, SSH-based deployments require users to configure rollback behavior manually. This means you must define custom script steps in the rollback section of your SSH deployment to specify exactly how rollback should be executed.

### How can I implement rollback for SSH deployments in Harness?
To achieve rollback, follow these practices:

Define custom scripts in the rollback section to restore the desired state (such as re-deploying an earlier artifact or reverting config changes).

You can retrieve the previous artifact or manifest version and trigger a deployment of that version as part of your rollback logic.

If using the Rollback step with the "Copy Artifact" command unit, Harness will copy the last successfully deployed artifact to the target host, facilitating restoration of the previous state.

### Can Harness automatically identify and redeploy a previous artifact for SSH rollback?
Harness does offer some convenience if you configure the "Copy Artifact" command unit within your rollback steps. With this approach, Harness will automatically copy the last successfully deployed artifact to the remote server, effectively rolling back to the last known good version. However, the orchestration and logic for triggering this rollback still need to be explicitly set up by the user within the deployment workflow; it is not fully automatic or managed out-of-the-box.

### What is the primary method for copying files from a Harness Linux Delegate to a Windows Remote Host when SSHD is not enabled?

The recommended method is to use Harness's built-in Windows VM deployment type, which leverages Windows Remote Management (WinRM) for communication and file transfers.

### Why can't I use SSH for file transfers if SSHD is not enabled on the Windows host?

SSH (Secure Shell) requires an SSH daemon (SSHD) running on the target machine to accept incoming connections and execute commands, including file transfers (like SCP or SFTP). Without SSHD, SSH-based methods will fail.

### What is WinRM?

WinRM (Windows Remote Management) is Microsoft's implementation of the WS-Management protocol. It allows for secure remote management of Windows servers and clients, enabling command execution and file transfers over HTTP or HTTPS.

### What are the main prerequisites on the Windows Remote Host for WinRM to work with Harness?

WinRM must be enabled and configured to allow remote connections.

Appropriate network firewall rules (on the Windows host and any intermediary firewalls) must allow WinRM traffic (ports 5985 for HTTP, 5986 for HTTPS).

A user account with sufficient permissions to perform the desired operations (e.g., file copying, command execution).

### Do I need to install anything special on the Harness Linux Delegate for WinRM to work?

No, Harness Delegates come with the necessary capabilities to communicate via WinRM. You don't need to install additional WinRM client tools on the delegate itself.

### Which Harness deployment type should I select for Windows remote hosts without SSHD?

You should select the "Windows VM" deployment type in Harness.

### How do I specify the target Windows host(s) in Harness?

In your Harness Infrastructure Definition, you would typically specify the IP addresses or hostnames of your Windows VMs. You'll also configure the WinRM connection details (username, password/key).

### How do I securely provide credentials for WinRM in Harness?

You should use Harness Secrets to store your Windows username and password. These secrets are then referenced in your Infrastructure Definition or WinRM Connector.

### What is the "Copy Configs" command, and how do I use it in a Harness pipeline step?

The "Copy Configs" command is a feature within a Harness Command step specifically designed for copying configuration files. You set sourceType to Config and specify the destinationPath on the remote host.

### Can I use the "Copy Configs" command to copy any file, or just configuration files?

While named "Copy Configs," it's generally used for any static files you define as "config files" within your Harness File Store or Git repositories and want to transfer to the target. The sourceType: Config refers to this source location.

### Where does Harness store the files specified as sourceType: Config?

These files are usually managed in Harness's File Store or sourced from a Git repository integrated with Harness as "Config Files."

### What is the destinationPath in the "Copy" command spec, and how should I define it for Windows?

The destinationPath is the absolute path on the remote Windows host where the files will be copied. For Windows, use Windows-style paths, e.g., ```C:\Program Files\MyApplication\Config\ or D:\temp\```.

### The example YAML shows destinationPath: /. Is this valid for Windows?

No, ```destinationPath: /``` is typically for Linux/Unix systems. For Windows, you must provide a valid Windows path ```(e.g., C:\, C:\temp, or a specific directory)```. The example provided seems to be a generic placeholder.

### Can I copy multiple config files in a single "Copy Configs" step?

Yes, if you've grouped multiple files as a single "Config File" artifact or path, the Copy command can transfer them all.

### What common issues might I face when setting up WinRM connections?

Firewall: Windows Firewall blocking WinRM ports (5985/5986).

Network ACLs/Security Groups: Cloud provider network rules blocking traffic.

Authentication: Incorrect username/password, or domain/workgroup issues.

WinRM Configuration: WinRM not enabled, or not configured for non-HTTPS (if using HTTP), or not allowing remote unencrypted traffic (if not using HTTPS).

Self-signed certificates: If using HTTPS, ensure the delegate trusts the certificate (though Harness often handles common scenarios).

### Is it secure to use WinRM over HTTP (port 5985)?

For production, it's highly recommended to use WinRM over HTTPS (port 5986) to encrypt communication. This requires an SSL certificate on the Windows host. If HTTPS is not feasible, ensure strict network segmentation.

### Can I use WinRM to execute PowerShell scripts on the remote host in addition to copying files?

Yes, WinRM is designed for executing PowerShell commands. After copying files, you can use "Shell Script" steps (with the "Windows VM" deployment type) to run PowerShell scripts that process or use the copied files.

### What is the purpose of ```<+stage.output.hosts>``` in the example YAML strategy.repeat.items?

This is a Harness expression that indicates the "Copy" step will repeat for each host defined in the current stage's output. This is typical for deploying to multiple target hosts identified by your Infrastructure Definition.

### My file is a .zip or .tar file. Does Harness automatically extract it on the Windows host after copying?

No, the "Copy Configs" command just copies the file as-is. If you need to extract an archive ```(like a .zip file)```, you'll need a subsequent Shell Script (PowerShell) step in your pipeline to perform the extraction using PowerShell commands like Expand-Archive.

### How does the Copy step work in a pipeline?
The Copy step fetches a file from the Harness Delegate (Linux-based) and sends it to the Windows target using WinRM, assuming onDelegate: false is configured.

### What happens if the file already exists at the destination?
Harness will overwrite the file unless additional PowerShell logic is added to check and prevent overwrites.
