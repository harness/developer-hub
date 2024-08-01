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

### Is there a method available to implement a percentage-based repeat strategy for Shell Script Hosts similar to the functionality present in FirstGen?

For a rolling strategy, you specify the desired number of instances to deploy per phase. If you have multiple target hosts in a stage and wish to deploy a certain proportion of instances per phase, you can configure it accordingly. This allows for a flexible deployment approach where the number of instances per phase can be defined either as a count or a percentage.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng/#rolling)

### Does Harness support "Skip instances with the same artifact version already deployed" feature on NextGen?

Yes, this feature parity to FirstGen is now available ! Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng/#targetting-specific-hosts-for-deployment)

### Why am I getting the error "Host information is missing in Command Step"?

```
Invalid argument(s): Host information is missing in Command Step. Please make sure the looping strategy (repeat) is provided.
```

If you are using the Command step, the `Repeat` looping strategy is required. The above error indicates that the Command step was ran without a `Repeat` looping strategy. To fix this, set the `Repeat` looping strategy for the Command step. For more information on the Command step and the supported looping strategies, go to [SSH and WinRM](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/download-and-copy-artifacts-using-the-command-step/#ssh-and-winrm) documentation.


### Download artifact for winrm is not working while Nexus if Windows machine is behind proxy in Next Gen?
Nexus is supported for NG but not in CG, so you can use custom powershell script something like below:
Invoke-WebRequest -Uri "$\{URI}" -Headers $Headers -OutFile "$\{OUT_FILE}" -Proxy "$env:HTTP_PROXY"

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

