---
title: Linux chaos infrastructure advanced management
sidebar_position: 9
description: Guide to advanced setup with Linux chaos infrastructure
redirect_from:
    - /docs/chaos-engineering/chaos-infrastructure/linux-chaos-infrastructure-advanced-management
---

This section describes the [advanced setup](#advanced-setup), [infrastructure service](#infrastructure-service), [logs](#logs), and [resilience probes](#resilience-probes-for-linux) associated with the Linux chaos infrastructure (LCI).

HCE supports executing Linux faults similar to Kubernetes faults.

## Before you begin
* [Connect to Linux infrastructure](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures#step-2-add-a-chaos-infrastructure)
* [Disconnect from Linux infrastructure](/docs/chaos-engineering/features/chaos-infrastructure/disconnect-chaos-infrastructure#remove-infrastructure)
* [Linux execution plane](/docs/chaos-engineering/architecture-and-security/architecture/components#linux-execution-plane-components)

## Advanced setup
A set of mandatory input flags is required for the installation of the chaos infrastructure, including the `infra-id`, `access-key` and the `server-url`. However, certain aspects of the infrastructure can be tuned via the following flags:
1. **log-directory**: Custom log directory to store the log files. By default, the logs are stored at `/var/log/linux-chaos-infrastructure`.
2. **task-poll-interval-seconds**: Interval between subsequent poll queries to the server for a new experiment. The default value is **5 seconds**.
3. **task-update-interval-seconds**: Duration between subsequent status updates of an active fault to the server. The default value is **5 seconds**.
4. **update-retries**: Maximum number of retries in case of a failure while sending a fault status or result.

    * If the retry count is breached while sending the status, the active fault is aborted after logging the error during each attempts and the result is then attempted to be sent.

    * If the retry count is breached while sending the result, no result is sent by the infrastructure but the error during the attempts are logged.

    The default value is **5**.

5. **update-retry-interval-seconds**: Interval between the subsequent attempts to send a fault status or result, in case of a failure. The default value for it is **5 seconds**.
6. **chaos-infra-liveness-update-interval-seconds**: Interval between the chaos infrastructure liveness heartbeats. The default value is **5 seconds**.
7. **chaos-infra-log-file-max-size-mb**: Maximum size limit for the chaos infrastructure log file rotation. Upon breaching the size limit, a new log file is created to store the logs and the old log file is retired as a backup archive. The default value is **5 MB**.
8. **chaos-infra-log-file-max-backups**: Maximum number of backup archives to be retained at any given time. The oldest archive is deleted when a new log file is created. The default value is **2**.
9. **experiment-log-file-max-age-days**: Number of days after which the experiment log files will be deleted. The default value is **30**.
10. **custom-tls-certificate**: TLS certificate used to communicate with the control plane.
11. **http-proxy**: HTTP proxy URL used to communicate with the control plane.
12. **http-client-timeout**: HTTP client timeout for communicating with the control plane. The default value is **30s**.

:::info note
LCI does not currently support:
1. Cron schedules
2. [GameDays](/docs/chaos-engineering/features/gameday/introduction-to-gameday.md)
3. Executing [parallel faults](/docs/chaos-engineering/features/experiments/create-complex-chaos-experiments.md) in SaaS (the self-managed platform (SMP) supports executing parallel faults on LCI)
:::


## Infrastructure service
The Linux chaos infrastructure is installed as an executable binary on your Linux machine. This infrastructure is managed as a `Systemd` service.
- The service starts automatically when the system starts.
- If the service stops unexpectedly, it automatically attempts to restart after a cool down period of 5 seconds.
- By default, the service ensures that the chaos infrastructure process is owned by the root user.

To check if the infrastructure service is active and running, use the following command:
```
systemctl status linux-chaos-infrastructure.service
```
![Terminal](./static/linux-chaos-infrastructure-advanced-management/terminal.png)

Any status other than the `active` status would indicate an issue with the infrastructure.

## Logs
Logs that are generated are stored in the `/var/log/linux-chaos-infrastructure` directory by default. There are two types of logs:
1. **Infrastructure logs:** Infrastructure logs are generated as a result of any infrastructure operation that is not directly related to the execution of an experiment. For example:
    - Start of execution of an experiment
    - End of execution of an experiment
    - Error during the creation of an experiment log file
    - Error while querying for an experiment
    - Error while sending the experiment status or result, etc.

    By default, this log file is located at `/var/log/linux-chaos-infrastructure/linux-chaos-infrastructure.log` and can be used for troubleshooting the infrastructure.

:::info
- The file is rotated based on its size; when the file size is a specified size, it is archived in a separate file with the timestamp of rotation suffixed to the file name. By default, this value is **5 MB**.
- Eventually, the old archives will be deleted. The maximum number of most recent archives that are retained at any given time can be specified. By default, this value is **2**.
:::

2. **Experiment logs:** Experiment logs are stored in separate files, which are scoped to the faults of the experiment. It contains information about the various steps of the execution of that fault, including any errors caused during the execution of the fault. The files use the unique fault name mentioned in the experiment as their filename.

:::info
- These files are rotated based on their age; where files older than a specific number of days are removed. By default, this value is **30 days**.
:::

## Resilience probes for Linux

HCE allows you to create the below probes for Linux:

1. [HTTP](/docs/chaos-engineering/features/resilience-probes/http-probe)
2. [Command](/docs/chaos-engineering/features/resilience-probes/cmd-probe)
3. [Datadog](/docs/chaos-engineering/features/resilience-probes/datadog-probe)
4. [Dynatrace](/docs/chaos-engineering/features/resilience-probes/dynatrace-probe)

When you try to enable or disable a Linux probe, two mandatory fields `type` and `attempt` (with empty values) are added to the probe. Even if you edit these values, they will not reflect in the updated experiment manifest. This is because the final values for the earlier-mentioned mandatory fields are picked from the database associated with the specific probe. Go to [known issues](/docs/chaos-engineering/troubleshooting/known-issues) for more information.

