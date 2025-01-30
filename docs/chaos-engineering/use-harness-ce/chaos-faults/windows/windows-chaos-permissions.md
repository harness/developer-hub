---
title: Requirements and security considerations
sidebar_position: 1
description: Requirements to fulfill and security considerations to execute Windows chaos experiments.
redirect_from:
- /docs/chaos-engineering/chaos-faults/windows/security-considerations/windows-chaos-permissions
- /docs/chaos-engineering/chaos-faults/vmware/permissions
- /docs/chaos-engineering/chaos-faults/windows/prerequisites
---

## On-premise VMs (VMware VMs)

This section outlines the permissions required for installing the Windows infrastructure and executing chaos experiments. These requirements include administrator privileges, file system access, and managing security settings. Understanding and meeting these requirements are crucial for the successful execution of chaos experiments on Windows VMs.

### Windows OS

<table>
<tr>
    <th> Chaos agent deployment model </th>
    <td><b>Native Chaos Agent on Each VM (systemd service within target Windows machine) </b></td>
</tr>
<tr>
    <th> Connectivity requirements from agent </th>
    <td><ul><li>Outbound over port 443 to Harness from VM. </li>
	<li> Outbound to application health endpoints (ones which will be used for resilience validation) from VM </li></ul></td>
</tr>
<tr>
    <th> Connectivity requirements from VM/cluster/app </th>
    <td> <ul><li>Application and chaos agent co-exist on the same VM. </li></ul></td>
</tr>
<tr>
	<th> Access requirements for agent install </th>
	<td><ul><li> Install agent as an administrator user. </li></ul></td>
</tr>

<tr>
	<th> Access requirements for basic chaos experiments </th>
	<td><ul><li> Run experiments with non-administrator user. </li></ul> </td>
</tr>
<tr>
	<th> Access requirements for advanced chaos experiments </th>
	<td><ul><li> Run experiments with administrator user </li></ul></td>
</tr>
<tr>
		<th> Supported chaos faults	</th>
		<td><ul><li><a href="https://github.com/hce-docs/platform-wise-chaos-info/blob/main/VMware/WindowsOS/basic-faults-supported-by-native-windows-infra-running-as-non-administrator.md">Basic faults with non-administrator </a></li>
		<li> <a href="https://github.com/hce-docs/platform-wise-chaos-info/blob/main/VMware/WindowsOS/all-supported-faults-by-native-windows-infra-running-as-administrator.md"> Basic and advanced faults with administrator </a></li></ul></td>
</tr>
</table>

## Security considerations

The table below describes the security considerations, that is, the component, its requirement in the scope of the experiment and how the component is used.

For example, the first entry can be interpreted as follows: The **Installation script** component is required for **Service Management*** which **helps create and manage a service that needs admin permissions to interact with the Service Control Manager**. 

<table border="1">
    <tr>
        <th>Component</th>
        <th>Requirement</th>
        <th>Description</th>
    </tr>
    <tr>
        <td rowspan="4">Installation Script</td>
        <td>Service management</td>
        <td>The script that creates and manages a Windows service, which requires administrator privileges to interact with the Service Control Manager (SCM).</td>
    </tr>
    <tr>
        <td>File system access</td>
        <td>The script that creates directories, downloads and extracts files, and modifies the system's PATH environment variable, requiring elevated permissions.</td>
    </tr>
    <tr>
        <td>Security and credential management</td>
        <td>The script that handles sensitive information, such as administrator user credentials and security configurations, requiring elevated privileges.</td>
    </tr>
    <tr>
        <td>Administrator privileges</td>
        <td>Overall, administrator privileges that are essential for service management, file system access, network configuration, and security management.</td>
    </tr>
    <tr>
        <td rowspan="3">Windows CPU Stress Experiment</td>
        <td>Administrator privileges</td>
        <td>The experiment that requires Administrator privileges to access and manipulate system CPU resources effectively.</td>
    </tr>
    <tr>
        <td>WMI access</td>
        <td>The experiment that accesses system information using Windows Management Instrumentation (WMI), requiring appropriate permissions.</td>
    </tr>
    <tr>
        <td>PowerShell execution policy</td>
        <td>The system's PowerShell execution policy which should be set to RemoteSigned to allow the execution of locally created scripts.</td>
    </tr>
    <tr>
        <td rowspan="4">Windows Memory Stress Experiment</td>
        <td>Administrator privileges</td>
        <td>The experiment that requires Administrator privileges to access and modify system resources, including executing the Testlimit executable for memory consumption.</td>
    </tr>
    <tr>
        <td>WMI access</td>
        <td>The experiment that accesses system information using Windows Management Instrumentation (WMI), requiring appropriate permissions.</td>
    </tr>
    <tr>
        <td>Permission to run executables</td>
        <td>The experiment that uses the Testlimit executable to consume memory, requiring necessary permissions to execute the tool.</td>
    </tr>
    <tr>
        <td>PowerShell execution policy</td>
        <td>The system's PowerShell execution policy which should be set to RemoteSigned to allow the execution of locally created scripts.</td>
    </tr>
    <tr>
        <td rowspan="4">Windows blackhole chaos experiment</td>
        <td>Create and manage firewall rules</td>
        <td>The experiment that uses New-NetFirewallRule and Remove-NetFirewallRule cmdlets to add and remove firewall rules, requiring administrator privileges.</td>
    </tr>
    <tr>
        <td>Resolve DNS names</td>
        <td>The experiment that uses Resolve-DnsName to resolve domain names to IP addresses, which may require administrator privileges.</td>
    </tr>
    <tr>
        <td>Administrator privileges</td>
        <td>Administrator privileges that are needed to ensure that the script can perform its intended functions of creating and managing firewall rules and resolving DNS names.</td>
    </tr>
    <tr>
        <td>PowerShell execution policy</td>
        <td>The system's PowerShell execution policy which should be set to "RemoteSigned" to allow the execution of locally created scripts.</td>
    </tr>
</table>
