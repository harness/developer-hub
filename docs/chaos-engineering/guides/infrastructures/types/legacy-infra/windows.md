---
title: Windows Chaos Infrastructure
sidebar_position: 30
redirect_from:
- /docs/chaos-engineering/guides/infrastructures/enable-disable#on-linux-infrastructure
---

This topic describes Windows Chaos Infrastructure, how you can enable and disable chaos on Windows Infrastructure.

Chaos experiments executed on Windows infrastructure inject chaos into Windows OS-based VM. This deteriorates the performance of the application for the duration of the chaos experiment. Depending on the type of instance the fault targets, Windows faults are categorized into various types.

Go to [Windows-based Chaos faults](/docs/chaos-engineering/faults/chaos-faults/windows/) to find the list of faults supported.

The diagram represents a high-level architecture of the interaction between the Windows execution plane and control plane components.

![](./static/detailed-architecture.png)

## Configure with Flags

The mandatory input required for the installation of the chaos infrastructure is the `name`.
You can tune the other flags of the infrastructure with the following flags:

1. **admin user**: Administrator used to execute commands on the terminal to install and manage the Windows chaos infrastructure. By default, the logs are stored at `C:\\HCE\logs`.

2. **task poll interval**: Interval between subsequent poll queries to the server for a new experiment. The default value is **5 seconds**.

3. **task update interval**: Duration between subsequent status updates of an active fault to the server. The default value is **5 seconds**.

4. **infrastructure liveness update interval**: Interval between the chaos infrastructure liveness heartbeats. The default value is **5**.

5. **update retries**: Number of retries before the service fails.

6. **update retries interval seconds**: Interval between the subsequent attempts to send a fault status or result, in case of a failure. The default value for it is **5 seconds**.

7. **log file max size**: Maximum size limit for the chaos infrastructure log file rotation. Upon breaching the size limit, a new log file is created to store the logs and the old log file is retired as a backup archive. The default value is **5 MB**.

8. **log file max backups**: Maximum number of backup archives to be retained at any given time. The oldest archive is deleted when a new log file is created. The default value is **2**.

9. **experiment log file max age**: Number of days after which the experiment log files will be deleted. The default value is **30**.

10. **http proxy**: HTTP proxy URL used to communicate with the control plane.

11. **http client timeout**: HTTP client timeout for communicating with the control plane. The default value is **30s**.

### Infrastructure service
The Windows chaos infrastructure is installed as an executable binary on your Windows VM. The service binary is present in `C:\\HCE\windows-chaos-infrastructure.exe` path. The config file is present in `C:\\HCE\config.yaml` path.

### Logs
Logs that are generated are stored in the `C:\\HCE\logs` directory by default.

There are two types of logs:
1. **Infrastructure logs:** Infrastructure logs are generated as a result of any infrastructure operation that is not directly related to the execution of an experiment. Every experiment run has a new log folder with all connectivity logs.

- The file is rotated based on its size; when the file size is a specified size, it is archived in a separate file with the timestamp of rotation suffixed to the file name. By default, this value is **5 MB**.
- Eventually, the old archives will be deleted. The maximum number of most recent archives that are retained at any given time can be specified. By default, this value is **2**.

2. **Experiment logs:** Experiment logs are stored in separate files, which are scoped to the faults of the experiment. It contains information about the various steps of the execution of that fault, including any errors caused during the execution of the fault. The files use the unique fault name mentioned in the experiment as their filename.

These files are rotated based on their age; where files older than a specific number of days are removed. By default, this value is **30 days**.


## Verify Windows infrastructure service status

To verify the status of the service, navigate to the command prompt on your Windows. Search for **Task Manager**, select **More details** and check the status of **WindowsChaosInfrastructure**.

1. If the status reads **Running**, it means the windows infrastructure is up and running.

![](./static/add-pwd-1.png)


2. If it reads **Stopped**, right click and select **Start**.

![](./static/start-service-2.png)

3. Any other status will be associated with logs which you can troubleshoot using our [troubleshooting guide](/docs/chaos-engineering/troubleshooting/)

## Prerequisites to Install Infrastructure
Ensure that you have fulfilled the [prerequisites](/docs/chaos-engineering/faults/chaos-faults/windows/prerequisites) before connecting to a Windows chaos infrastructure.


## Step 1: Create / Select Environment
1. Go to **Environments** and [create a new environment](/docs/chaos-engineering/guides/experiments/create-experiments#create-environment) or select an environment that already exists.

  ![new environment](./static/new-env.png)

## Step 2: Create Infrastructure

2. Select the **Infrastructure Type** as **Windows** and click **New Infrastructure**

    ![](./static/connect-1.png)

3. Provide a Name and other optional values based on your requirement. Select **Next**.

    ![](./static/name.png)

## Step 3: Deploy Infrastructure

4. Copy the command generated. The [prerequisites](/docs/chaos-engineering/faults/chaos-faults/windows/prerequisites) discusses how you can configure a password. If you have a password, replace it in the `<your-password>` placeholder. Execute this command on your terminal (remember to open the command prompt as an admin if you are not an admin by default). Click **Done** once you finish the execution.

    ![](./static/copy-command-3.png)

This displays the following updates about the installation on your terminal.

```
    Directory: C:\


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----          3/7/2024   7:48 AM                HCE
Downloading Testlimit...
Extracting Testlimit...
Accepting Testlimit EULA...
Testlimit EULA accepted.
Downloading windows-chaos-infrastructure binary...
Config file created at C:\\HCE\config.yaml


    Directory: C:\HCE\Logs


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----          3/7/2024   7:51 AM              0 windows-chaos-infrastructure.log
[SC] CreateService SUCCESS
Service created and started successfully.

```

## Upgrade Infrastructure

Go to [Upgrade Infrastructure for Windows](/docs/chaos-engineering/guides/infrastructures/upgrade-infra#upgrade-windows-infrastructure) to upgrade to the latest version of your Windows infrastructure.

## Validate Installation

After adding chaos infrastructure, Harness takes some time to set up all the chaos infrastructure resources. On the UI, if you navigate to **Environments** -> **Windows**, you can see the connection status is `CONNECTED`.

  ![](./static/confirm-3.png)

That's it! Now you have a Windows chaos infrastructure and you're all set to inject chaos into your infrastructure.

## Disable Infrastructure

1. To disable an infrastructure, go to **Environments**, select the **Infrastructure type** as **Windows**. 

2. Select the `⋮` icon against the chaos infrastructure name and select **Disable**.

    ![Delete Chaos Infra](./static/disable-1.png)

2. Copy the command displayed in the modal, and execute it in your Windows machine terminal to uninstall the chaos infrastructure components. Finally, select **Confirm**.

This disables your Windows infrastructure.

## Resilience probes for Windows

Harness CE allows you to create [HTTP](/docs/chaos-engineering/key-concepts/probes/http-probe) probe for Windows.