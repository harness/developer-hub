---
title: Windows Fault permissions
sidebar_position: 10
---

## Permission Requirements for Windows Chaos Experiments
This document outlines the permission requirements necessary for installing the Windows infrastructure and conducting chaos experiments. These requirements include administrator privileges, access to the file system, and the ability to manage security settings. Understanding and meeting these requirements are crucial for the successful execution of chaos experiments on Windows VMs.
    

<table border="1">
    <tr>
        <th>Component</th>
        <th>Requirement</th>
        <th>Description</th>
    </tr>
    <tr>
        <td rowspan="4">Installation Script</td>
        <td>Service Management</td>
        <td>The script creates and manages a Windows service, requiring administrator privileges to interact with the Service Control Manager (SCM).</td>
    </tr>
    <tr>
        <td>File System Access</td>
        <td>The script creates directories, downloads and extracts files, and modifies the system's PATH environment variable, requiring elevated permissions.</td>
    </tr>
    <tr>
        <td>Security and Credential Management</td>
        <td>The script handles sensitive information, such as administrator user credentials and security configurations, requiring elevated privileges.</td>
    </tr>
    <tr>
        <td>Administrator Privileges</td>
        <td>Overall, administrator privileges are essential for service management, file system access, network configuration, and security management.</td>
    </tr>
    <tr>
        <td rowspan="3">Windows CPU Stress Experiment</td>
        <td>Administrator Privileges</td>
        <td>The experiment requires Administrator privileges to access and manipulate system CPU resources effectively.</td>
    </tr>
    <tr>
        <td>WMI Access</td>
        <td>The experiment accesses system information using Windows Management Instrumentation (WMI), requiring appropriate permissions.</td>
    </tr>
    <tr>
        <td>PowerShell Execution Policy</td>
        <td>The system's PowerShell execution policy should be set to RemoteSigned to allow the execution of locally created scripts.</td>
    </tr>
    <tr>
        <td rowspan="4">Windows Memory Stress Experiment</td>
        <td>Administrator Privileges</td>
        <td>The experiment requires Administrator privileges to access and modify system resources, including executing the Testlimit executable for memory consumption.</td>
    </tr>
    <tr>
        <td>WMI Access</td>
        <td>The experiment accesses system information using Windows Management Instrumentation (WMI), requiring appropriate permissions.</td>
    </tr>
    <tr>
        <td>Permission to Run Executables</td>
        <td>The experiment uses the Testlimit executable to consume memory, requiring necessary permissions to execute the tool.</td>
    </tr>
    <tr>
        <td>PowerShell Execution Policy</td>
        <td>The system's PowerShell execution policy should be set to RemoteSigned to allow the execution of locally created scripts.</td>
    </tr>
    <tr>
        <td rowspan="4">Windows Blackhole Chaos Experiment</td>
        <td>Create and Manage Firewall Rules</td>
        <td>The experiment uses New-NetFirewallRule and Remove-NetFirewallRule cmdlets to add and remove firewall rules, requiring administrator privileges.</td>
    </tr>
    <tr>
        <td>Resolve DNS Names</td>
        <td>The experiment uses Resolve-DnsName to resolve domain names to IP addresses, which may require administrator privileges.</td>
    </tr>
    <tr>
        <td>Administrator Privileges</td>
        <td>Administrator privileges are needed to ensure that the script can perform its intended functions of creating and managing firewall rules and resolving DNS names.</td>
    </tr>
    <tr>
        <td>PowerShell Execution Policy</td>
        <td>The system's PowerShell execution policy should be set to RemoteSigned to allow the execution of locally created scripts.</td>
    </tr>
</table>
