#### Download artifact for winrm is not working while Nexus if windows machine is behind proxy in CG
Nexus is supported for NG but not in CG, so you can use custom powershell script something like below:
Invoke-WebRequest -Uri "$\{URI}" -Headers $Headers -OutFile "$\{OUT_FILE}" -Proxy "$env:HTTP_PROXY"


#### How do we detect service licenses for SSH deployments ?

Please consider the following [Documentation](https://developer.harness.io/docs/continuous-delivery/get-started/service-licensing-for-cd/#ssh-and-winrm).
Feel free to reach out to us in case of issues.


#### How to give the user access to WinRM resources:
Run command winrm configSDDL default and it should open the the dialogue, check if user configured for login already present in the last otherwise add the user


#### How to enable certificate authentication while using winrm
Its disabled by default and need to run below command to enable
Set-Item -Path WSMan:\localhost\Service\Auth\Certificate -Value $true


#### How to fix error Socket Connection Failed for url windowshost on port 5985
Check if port 5985 is opened and test the communication for winrm 


####  Can we use command step for custom stage

No this is not supported as of now, as currently command step is only applicable in ssh/winrm type deployment


#### Create WinRM Credential using terraform.

You can automate creating winrm credential/secret key via our existing API as listed here https://apidocs.harness.io/tag/Account-Secret#operation/create-account-scoped-secret


#### Why am I getting the error "Host information is missing in Command Step"?

```
Invalid argument(s): Host information is missing in Command Step. Please make sure the looping strategy (repeat) is provided.
```

If you are using the Command step, the `Repeat` looping strategy is required. The above error indicates that the Command step was ran without a `Repeat` looping strategy. To fix this, set the `Repeat` looping strategy for the Command step. For more information on the Command step and the supported looping strategies, go to [SSH and WinRM](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/download-and-copy-artifacts-using-the-command-step/#ssh-and-winrm) documentation.


